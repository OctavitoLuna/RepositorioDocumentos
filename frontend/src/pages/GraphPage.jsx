import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { io } from 'socket.io-client'; // Importar socket.io-client
import Chart from 'chart.js/auto'; // Importar Chart.js

// Conexión al WebSocket
const socket = io('http://localhost:3001');

// Consulta de GraphQL
const GET_DOCUMENT_STATS = gql`
  query {
    getDocumentStatsByYear {
      year
      count
    }
  }
`;

const GraphPage = () => {
    const { loading, error, data } = useQuery(GET_DOCUMENT_STATS);
  
    useEffect(() => {
      if (error) {
        console.error('Error en la consulta GraphQL:', error.message);  // Imprime el error en consola.
      }
    }, [error]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;  // Muestra el error si ocurre.
  
    // Si la consulta fue exitosa, crea el gráfico con los datos.
    if (data) {
      const years = data.getDocumentStatsByYear.map((item) => item.year);
      const counts = data.getDocumentStatsByYear.map((item) => item.count);
      const chartConfig = {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Document Count by Year',
              data: counts,
              borderColor: 'rgba(0, 123, 255, 0.7)',
              backgroundColor: 'rgba(0, 123, 255, 0.3)',
              fill: true,
            }
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      };
  
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, chartConfig);
    }
  
    return (
      <div>
        <h1>Document Stats - Graph</h1>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    );
  };
  

export default GraphPage;
