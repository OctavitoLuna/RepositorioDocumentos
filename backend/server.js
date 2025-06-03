require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");
const { Server } = require("socket.io");

// Importa rutas
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const logRoutes = require("./routes/logRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Ruta login
const collectionRoutes = require('./routes/collectionRoutes');
const forumRoutes = require('./routes/forumRoutes');

// Importa modelos (si los necesitas aquí)
const { Document, Comment, User, Log } = require("./models/models");

const app = express();
const PORT_EXPRESS = 3001; // Express y REST
const PORT_APOLLO = 3002;  // Apollo GraphQL

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());

// Registrar rutas REST
app.use("/documents", documentRoutes);
app.use("/comments", commentRoutes);
app.use("/logs", logRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes); // Ruta login
app.use('/collections', collectionRoutes);
app.use('/forums', forumRoutes);

// Endpoints REST adicionales (puedes mover a rutas si quieres)
app.get("/documents", (req, res) => {
  Document.find({}, (err, documents) => {
    if (err) return res.status(500).send("Error obteniendo documentos");
    res.json(documents);
  });
});

app.get("/documents/:id/comments", (req, res) => {
  Comment.find({ documento_id: req.params.id }, (err, comments) => {
    if (err) return res.status(500).send("Error obteniendo comentarios");
    res.json(comments);
  });
});

app.get("/documents/analysis/annual", async (req, res) => {
  try {
    const documents = await Document.aggregate([
      { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(documents);
  } catch {
    res.status(500).send("Error obteniendo el análisis anual");
  }
});

app.get("/documents/analysis/monthly", async (req, res) => {
  try {
    const documents = await Document.aggregate([
      { $group: {
          _id: {
            year: { $year: "$fecha_subida" },
            month: { $month: "$fecha_subida" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(documents);
  } catch {
    res.status(500).send("Error obteniendo el análisis mensual");
  }
});

// Schema GraphQL
const typeDefs = gql`
  type Document {
    _id: String
    titulo: String
    fecha_subida: String
  }

  type DocumentStats {
    year: Int
    count: Int
  }

  type Query {
    getDocumentStatsByYear: [DocumentStats]
  }
`;
// Resolvers GraphQL
const resolvers = {
  Query: {
    getDocumentStatsByYear: async () => {
      try {
        const documents = await Document.aggregate([
          { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
          { $sort: { "_id": 1 } }
        ]);
        return documents.map(d => ({ year: d._id, count: d.count }));
      } catch (error) {
        throw new Error("Error al obtener las estadísticas");
      }
    }
  }
};

async function start() {
  // Conectar MongoDB usando URI de .env
  await mongoose.connect(process.env.MONGODB_URI, {
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 500000,
  });
  console.log("Conectado a MongoDB");

  // Crear servidor HTTP (Express + WebSocket)
  const serverHttp = http.createServer(app);

  // Iniciar Apollo Server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Socket.io
  const io = new Server(serverHttp, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('requestDocumentStats', async () => {
      try {
        const documents = await Document.find();
        const data = documents.map(doc => doc.fecha_subida);
        socket.emit('documentStats', data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  // Escuchar servidor HTTP con Express y WebSocket
  serverHttp.listen(PORT_EXPRESS, () => {
    console.log(`Servidor Express y WebSocket corriendo en http://localhost:${PORT_EXPRESS}`); // Corregido
    console.log(`GraphQL listo en http://localhost:${PORT_EXPRESS}${apolloServer.graphqlPath}`); // Corregido
  });
}

start().catch(err => {
  console.error("Error iniciando servidor:", err);
});