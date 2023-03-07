import axios from "axios";
import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart ,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartGraph = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const getChatData = (filter) => {
    // let localData = [];

    setLoading(true);
    setFilter(filter);
    setChartData([]);
    axios
      .get(`https://api.pecunovus.net/wallet/get_change_tvl_${filter}`)
      .then((res) => {
        // res.data.forEach((e) => {
        //   setChartData((old) => [...old, e]);
        // });
        let hoursData = timeMappers();
        if (filter === 'hourly') {
          res.data.forEach((e, i) => {
            setChartData((old) => [...old, { ...e, chart_date: hoursData[i] }]);
          });
        } else {
          res.data.forEach((e, i) => {
            setChartData((old) => [...old, e]);
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        getChatData(filter);
        setLoading(false);
      });
  };
  const timeMappers = () => {
    let hoursData = [
      12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23
    ];

    let currentHour = new Date().getHours() + 1;
    let thisD = [];
    for (let i = 0; i < currentHour; i++) {
      thisD.push(hoursData[i]);
    }
    for (let i = 23; i > currentHour; i--) {
      thisD = [hoursData[i], ...thisD];
    }

    return thisD;
    //new data =[-12,-11,-10,-9,-8,-7,6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9]
  };

  useEffect(() => {
    getChatData('daily');
  }, []);
  return (
    <div>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart
          width={500}
          height={380}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            connectNulls
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
