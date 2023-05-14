import React from 'react';
import { Line } from 'react-chartjs-2';
import { SAResponse } from '../../Models/data-model';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: [],
  datasets: [
    {
      label: 'no-div',
      data: [],
      backgroundColor: ['rgba(255, 0, 0, 0.6)'],
      borderWidth: 1,
    },
    {
      label: 'div',
      data: [],
      backgroundColor: ['rgba(0, 0, 255, 0.6)'],
      borderWidth: 1,
    },
  ],
  options: {
    scales: {
      //   xAxes: [
      //     {
      //       ticks: {
      //         callback: (val: number) => val, // or a different way to convert timestamp to date
      //       },
      //       display: true,
      //       scaleLabel: {
      //         labelString: 'Date',
      //       },
      //     },
      //   ],
      yAxes: [
        {
          id: 'A',
          type: 'linear',
          position: 'left',
        },
        {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 1,
            min: 0,
          },
        },
      ],
    },
  },
};

export type GraphComponentProps = {
  jsonArr: SAResponse[];
};

function GraphComponent(props: GraphComponentProps) {
  for (const row of props.jsonArr) {
    (data.labels as number[]).push(row.Date);
    (data.datasets[0].data as number[]).push(row.BalanceNoDivs);
    (data.datasets[1].data as number[]).push(row.Balance);
  }

  return (
    <div className='chart-container'>
      <h2 style={{ textAlign: 'center' }}>Line Chart</h2>
      <Line data={data} />
    </div>
  );
}

export default GraphComponent;
