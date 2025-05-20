const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");
const { Server } = require("socket.io");

// Middlewares y variables de entorno
dotenv.config();

const app = express();

// Puertos (puedes configurar con env o usar default)
const expressPort = process.env.PORT_EXPRESS || 3001; // Para Express y WebSocket
const apolloPort = process.env.PORT_APOLLO || 3002;   // Para Apollo (GraphQL)

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solo este origen
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Crear servidor HTTP para Express y WebSocket
const server = http.createServer(app);

// Crear servidor de WebSocket (Socket.io)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});

// Definir esquema y resolvers GraphQL (igual que antes)
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

const resolvers = {
  Query: {
    getDocumentStatsByYear: async () => {
      try {
        console.log("Iniciando la consulta de estadísticas...");
        const documents = await mongoose.model("Document").aggregate([
          { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
          { $sort: { "_id": 1 } }
        ]);
        console.log("Estadísticas obtenidas:", documents);
        return documents;
      } catch (error) {
        console.error("Error en la consulta de GraphQL:", error);
        throw new Error('Error al obtener las estadísticas');
      }
    }
  }
};

// Crear servidor Apollo
const serverGraphQL = new ApolloServer({ typeDefs, resolvers });

// WebSocket: manejo de conexiones
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
  socket.on('requestDocumentStats', async () => {
    try {
      const documents = await mongoose.model("Document").find();
      const data = documents.map(doc => doc.fecha_subida);
      socket.emit('documentStats', data);
    } catch (error) {
      console.error("Error al obtener estadísticas de documentos:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Conexión a MongoDB usando variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
  // no necesitas useNewUrlParser y useUnifiedTopology en versiones recientes
  serverSelectionTimeoutMS: 500000,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => {
  console.error("Error conectando a MongoDB:", err);
  process.exit(1);
});

// Importar rutas y middleware verifyToken del segundo
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const logRoutes = require("./routes/logRoutes");
const userRoutes = require("./routes/userRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const { verifyToken } = require('./middlewares/authMiddleware');  // Middleware para proteger rutas

// Usar rutas, protegiendo las que corresponda (igual que segundo server.js)
app.use("/api/usuarios", userRoutes);
app.use("/api/documentos", verifyToken, documentRoutes);
app.use("/api/comentarios", commentRoutes);
app.use("/api/permisos", permissionRoutes);
app.use("/api/logs", logRoutes);

// Mantener endpoints específicos del primero para documentos y comentarios
app.get("/documents", (req, res) => {
  mongoose.model("Document").find({}, (err, documents) => {
    if (err) {
      res.status(500).send("Error obteniendo documentos");
      return;
    }
    res.json(documents); 
  });
});

app.get("/documents/:id/comments", (req, res) => {
  mongoose.model("Comment").find({ documento_id: req.params.id }, (err, comments) => {
    if (err) {
      res.status(500).send("Error obteniendo comentarios");
      return;
    }
    res.json(comments); 
  });
});

// Endpoints análisis anual y mensual (igual que primero)
app.get("/documents/analysis/annual", async (req, res) => {
  try {
    const documents = await mongoose.model("Document").aggregate([
      { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(documents);
  } catch (err) {
    res.status(500).send("Error obteniendo el análisis anual");
  }
});

app.get("/documents/analysis/monthly", async (req, res) => {
  try {
    const documents = await mongoose.model("Document").aggregate([
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
  } catch (err) {
    res.status(500).send("Error obteniendo el análisis mensual");
  }
});

// Iniciar servidor Apollo (GraphQL)
const startApolloServer = async () => {
  await serverGraphQL.start();
  serverGraphQL.applyMiddleware({ app });

  // Apollo en puerto apolloPort
  http.createServer(app).listen(apolloPort, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${apolloPort}${serverGraphQL.graphqlPath}`);
  });
};

startApolloServer();

// Iniciar servidor Express y WebSocket en puerto expressPort
server.listen(expressPort, () => {
  console.log(`Servidor Express y WebSocket ejecutándose en http://localhost:${expressPort}`);
});
