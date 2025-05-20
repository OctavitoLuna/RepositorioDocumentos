const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');
const { Server } = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const commentRoutes = require('./routes/commentRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const logRoutes = require('./routes/logRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

// Importar modelos individualmente (sin índice)
const Document = require('./models/Document');
const Comment = require('./models/Comment');
const User = require('./models/User');
const Log = require('./models/Log');
const Permission = require('./models/Permission');

dotenv.config();

const app = express();

// Configurar puertos desde .env o usar valores por defecto
const expressPort = process.env.PORT || 3001;
const apolloPort = process.env.APOLLO_PORT || 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Crear servidor HTTP para Express y WebSocket
const server = http.createServer(app);

// Configurar Socket.io con CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }
});

// Definir esquema GraphQL
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

// Resolver GraphQL
const resolvers = {
  Query: {
    getDocumentStatsByYear: async () => {
      try {
        const documents = await Document.aggregate([
          { $group: { _id: { $year: "$fecha_subida" }, count: { $sum: 1 } } },
          { $sort: { "_id": 1 } }
        ]);
        return documents;
      } catch (error) {
        console.error("Error en GraphQL:", error);
        throw new Error('Error al obtener las estadísticas');
      }
    }
  }
};

const serverGraphQL = new ApolloServer({ typeDefs, resolvers });

// WebSocket: manejo de conexiones
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
  socket.on('requestDocumentStats', async () => {
    try {
      const documents = await Document.find();
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

// Conectar a MongoDB con URI de .env
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 500000,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => {
  console.error("Error conectando a MongoDB:", err);
  process.exit(1);
});

// Rutas protegidas y públicas
app.use('/api/usuarios', userRoutes);
app.use('/api/documentos', verifyToken, documentRoutes);
app.use('/api/comentarios', commentRoutes);
app.use('/api/permisos', permissionRoutes);
app.use('/api/logs', logRoutes);

// Endpoints adicionales como antes
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
  } catch (err) {
    res.status(500).send("Error obteniendo el análisis anual");
  }
});

app.get("/documents/analysis/monthly", async (req, res) => {
  try {
    const documents = await Document.aggregate([
      { $group: { 
          _id: { year: { $year: "$fecha_subida" }, month: { $month: "$fecha_subida" } },
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

// Iniciar Apollo Server GraphQL
const startApolloServer = async () => {
  await serverGraphQL.start();
  serverGraphQL.applyMiddleware({ app });

  http.createServer(app).listen(apolloPort, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${apolloPort}${serverGraphQL.graphqlPath}`);
  });
};
startApolloServer();

// Iniciar servidor Express y WebSocket
server.listen(expressPort, () => {
  console.log(`Servidor Express y WebSocket corriendo en http://localhost:${expressPort}`);
});
