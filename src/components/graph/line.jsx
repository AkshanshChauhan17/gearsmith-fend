import React from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
import { Line } from 'react-chartjs-2';
const Graph = ({dt, lb}) => {
  const data = {
    labels: lb,
    datasets: [
      {
        label: 'Rating Products',
        data: dt,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
export default Graph;