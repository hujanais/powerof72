import React, { useEffect } from 'react';
import { SAResponse } from '../../Models/data-model';
import './GraphComponent.scss';

import { Chart as ChartJS, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'month',
        },
        position: 'bottom',
        gridLines: {
          color: '#9E9E9E',
        },
        ticks: {
          fontColor: '#DEDEDE',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontColor: '#DEDEDE',
          fontSize: 16,
        },
      },
    ],
    yAxes: [
      {
        position: 'left',
        gridLines: {
          color: '#9E9E9E',
        },
        ticks: {
          fontColor: '#DEDEDE',
        },
        scaleLabel: {
          display: true,
          labelString: 'Balance',
          fontColor: '#DEDEDE',
          fontSize: 16,
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
      <div className='center-me'>
        {
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                xAxis: {
                  type: 'time',
                  time: {
                    displayFormats: {
                      month: 'MMM yyyy',
                    },
                  },
                },
                yAxis: {},
              },
            }}
          />
        }
      </div>
    </div>
  );
}

export default GraphComponent;
