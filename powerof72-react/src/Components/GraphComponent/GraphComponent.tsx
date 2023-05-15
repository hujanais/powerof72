import React, { useEffect } from 'react';
import { SAResponse } from '../../Models/data-model';
import './GraphComponent.scss';

import { Chart as ChartJS, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        ticks: {
          maxTicksLimit: 20,
        },
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
        },
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    ],
  },
};

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
      <div className='center-me'>{<Line data={data} options={options} />}</div>
    </div>
  );
}

export default GraphComponent;
