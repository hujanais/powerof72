import React from "react";
import { Line } from "react-chartjs-2";
import { SAResponse } from "../../Models/data-model";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export type GraphComponentProps = {
    jsonArr: SAResponse[];
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: ['1', '2', '3'],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: ['1', '2', '3'],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function GraphComponent(props: GraphComponentProps) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}

export default GraphComponent;
