import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'June',
        Income: 4000,
        Expense: 2400,
        amt: 2400,
    },
    {
        name: 'July',
        Income: 3000,
        Expense: 1398,
        amt: 2210,
    },
    {
        name: 'Aug',
        Income: 2000,
        Expense: 9800,
        amt: 2290,
    },
    {
        name: 'Sep',
        Income: 2780,
        Expense: 3908,
        amt: 2000,
    },
    {
        name: 'Oct',
        Income: 1890,
        Expense: 4800,
        amt: 2181,
    },
    {
        name: 'Nov',
        Income: 2390,
        Expense: 3800,
        amt: 2500,
    },
    {
        name: 'Dec',
        Income: 3490,
        Expense: 4300,
        amt: 2100,
    },
];

const CustomizedLabel = ({ x, y, stroke, value }) => {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {value}
        </text>
    );
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                {payload.value}
            </text>
        </g>
    );
};

const LineCharts = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Income" stroke="#8884d8" label={<CustomizedLabel />} />
                <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineCharts;
