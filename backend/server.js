const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const expressPort = 3001; // Puerto para el servidor Express
const apolloPort = 3002; // Puerto para el servidor Apollo (GraphQL)

// Middleware de Express
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes solo desde este origen
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeceras permitidas
}));
app.use(express.json()); // Middleware para analizar las solicitudes JSON

// Crear servidor HTTP para Express y WebSocket
const server = http.createServer(app);

// Crear servidor de WebSocket (Socket.io)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  // Permite solo este origen
    methods: ['GET', 'POST'],  // Métodos permitidos
  }
});

// Definir el esquema de GraphQL
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

// Resolver la consulta de GraphQL
const resolvers = {
  Query: {
    getDocumentStatsByYear: async () => {
      try {
        console.log("Iniciando la consulta de estadísticas...");
        const documents = await mongoose.model("Document").aggregate([
          { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } }, // Agrupar por año
          { $sort: { "_id": 1 } } // Ordenar por año ascendente
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

// Crear servidor de Apollo
const serverGraphQL = new ApolloServer({ typeDefs, resolvers });

// WebSocket: Manejo de las conexiones
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
  socket.on('requestDocumentStats', async () => {
    try {
      const documents = await mongoose.model("Document").find();
      const data = documents.map(doc => doc.fecha_subida);
      socket.emit('documentStats', data); // Emitir los datos al cliente
    } catch (error) {
      console.error("Error al obtener estadísticas de documentos:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Conectar a MongoDB
mongoose.connect("mongodb+srv://leoibarralopez:admin@repositoriodocumentos.xtfqiad.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,  
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 500000,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error conectando a MongoDB:", err));

// Importar las rutas de documentos, comentarios, logs y usuarios
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const logRoutes = require("./routes/logRoutes");
const userRoutes = require("./routes/userRoutes");

// Importar los modelos desde models.js (ya definidos en models.js)
const { Document, Comment, User, Log } = require("./models/models");

// Usar las rutas
app.use("/documents", documentRoutes);
app.use("/comments", commentRoutes);
app.use("/logs", logRoutes);
app.use("/users", userRoutes);

// Endpoint para obtener todos los documentos
app.get("/documents", (req, res) => {
  Document.find({}, (err, documents) => {
    if (err) {
      res.status(500).send("Error obteniendo documentos");
      return;
    }
    res.json(documents); 
  });
});

// Endpoint para obtener los comentarios de un documento
app.get("/documents/:id/comments", (req, res) => {
  Comment.find({ documento_id: req.params.id }, (err, comments) => {
    if (err) {
      res.status(500).send("Error obteniendo comentarios");
      return;
    }
    res.json(comments); 
  });
});

// Endpoint para obtener el análisis de documentos por año
app.get("/documents/analysis/annual", async (req, res) => {
  try {
    const documents = await Document.aggregate([
      { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json(documents); // Devuelve los documentos analizados por año
  } catch (err) {
    res.status(500).send("Error obteniendo el análisis anual");
  }
});

// Endpoint para obtener el análisis de documentos por mes
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

    res.json(documents); // Devuelve los documentos analizados por mes
  } catch (err) {
    res.status(500).send("Error obteniendo el análisis mensual");
  }
});

// Iniciar el servidor de Apollo
const startApolloServer = async () => {
  await serverGraphQL.start();
  serverGraphQL.applyMiddleware({ app });

  // Iniciar el servidor HTTP de Apollo en el puerto 3002
  http.createServer(app).listen(apolloPort, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${apolloPort}${serverGraphQL.graphqlPath}`);
  });
};

startApolloServer();

// Iniciar el servidor Express y WebSocket en el puerto 3001
server.listen(expressPort, () => {
  console.log(`Servidor Express y WebSocket ejecutándose en http://localhost:${expressPort}`);
});
