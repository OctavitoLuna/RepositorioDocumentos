import { ApolloClient, InMemoryCache } from '@apollo/client';

// Configuración del cliente Apollo
const client = new ApolloClient({
  uri: 'http://localhost:3002/graphql',  // Asegúrate de que el puerto sea correcto para el servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;
