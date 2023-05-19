import React, { useEffect, useRef } from 'react';
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
    x: {
      type: 'time',
      time: {
        unit: 'month',
      },
      grid: {
        color: () => '#282828',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Total $',
      },
      suggestedMin: 0,
      ticks: {
        callback: (value: number, index: number, values: number[]) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
      },
      grid: {
        color: () => '#282828',
      },
    },
  },
};

const data = {
  labels: [],
  datasets: [
    {
      label: 'principal',
      data: [],
      pointRadius: 0,
      borderWidth: 1,
      borderColor: 'blue',
    },
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
  const lineRef = useRef(null); // create a reference to the Line component

  useEffect(() => {
    (data.labels as number[]).length = 0;
    (data.datasets[0].data as number[]).length = 0;
    (data.datasets[1].data as number[]).length = 0;
    (data.datasets[2].data as number[]).length = 0;

    for (const row of props.jsonArr) {
      (data.labels as number[]).push(row.Date);
      (data.datasets[0].data as number[]).push(row.Investment);
      (data.datasets[1].data as number[]).push(row.BalanceNoDivs);
      (data.datasets[2].data as number[]).push(row.Balance);
    }

    if (lineRef.current) {
      (lineRef.current as any).data = data; // update the Chart.js instance's data
      (lineRef.current as any).update(); // redraw the chart
    }
  });

  return (
    <div className='chart-container'>
      <div className='center-me'>{<Line ref={lineRef} data={data} options={options} />}</div>
    </div>
  );
}

export default GraphComponent;
