import React, { useEffect } from 'react';
import { SAResponse } from '../../Models/data-model';
import './GraphComponent.scss';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: [],
  datasets: [
    {
      label: 'no-div',
      data: [],
      pointRadius: 0,
      borderWidth: 1,
      borderColor: '#9e9e9e',
    },
    {
      label: 'div',
      data: [],
      pointRadius: 0,
      borderWidth: 1,
      borderColor: '#4caf50',
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
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
      ],
    },
  },
};

export type GraphComponentProps = {
  jsonArr: SAResponse[];
};

function GraphComponent(props: GraphComponentProps) {
  useEffect(() => {
    for (const row of props.jsonArr) {
      (data.labels as number[]).push(row.Date);
      (data.datasets[0].data as number[]).push(row.BalanceNoDivs);
      (data.datasets[1].data as number[]).push(row.Balance);
    }
  });

  return (
    <div className='chart-container'>
      <div className='center-me'>{<Line data={data} />}</div>
    </div>
  );
}

export default GraphComponent;
