import React, { memo, useEffect, useState } from "react";
import { ResponsiveContainer, Tooltip, XAxis, AreaChart, Area } from "recharts";
import axios from "axios";
import { Skeleton, Button, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { chartDays } from "../components/coinInfo/chartDays";
import url from "../serverUrl";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

export default memo(function Chart() {
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const getChatData = (filter) => {
    // let localData = [];

    setLoading(true);
    setFilter(filter);
    setChartData([]);
    axios
      .get(`${url}/wallet/get_change_tvl_${filter}`)
      .then((res) => {
        // res.data.forEach((e) => {
        //   setChartData((old) => [...old, e]);
        // });
        let hoursData = timeMappers();
        if (filter === "hourly") {
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
      21, 22, 23,
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
  function tConvert(time) {
    if (time) {
      time = parseInt(time);
      // If time format correct
      // Remove full string match value

      time =
        time < 12
          ? time + " : 00 " + "AM"
          : time > 12
          ? (time % 12) + " : 00 " + "PM"
          : 12 + " : 00  "; // Set AM/PM

      //time = time % 12 || 12; // Adjust hours
    }
    return time; // return adjusted time or original string
  }

  useEffect(() => {
    getChatData("hourly");
  }, []);
  const updateChart = (value) => {
    if (value == 1) {
      getChatData("hourly");
    } else if (value == 7) {
      getChatData("weekly");
    } else if (value == 30) {
      getChatData("monthly");
    } else if (value == 90) {
      getChatData("quaterly");
    } else if (value == 365) {
      getChatData("yearly");
    }
  };

  return (
    <>
      <ResponsiveContainer
        width={"100%"}
        height={300}
        // height={window.screen.availHeight / 2.2}
        aspect={3}
      >
        <Line
          style={{
            height: 200,
            // background: " rgb(185,195,34)",
          }}
          data={{
            labels: chartData.map((coin) => {
              return days === 1 ? tConvert(coin?.chart_date) : coin?.chart_date;
            }),

            datasets: [
              {
                data: chartData.map((coin) => coin.TVL),
                label: `Price ( Past ${days} Days ) in ${"USD"}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      </ResponsiveContainer>
      {/* {chartDays.map((day) => (
        <Button
          className={`${
            filter === "yearly"
              ? "header-link chart-button "
              : "header-link chart-button"
          }`}
          key={day.value}
          onClick={() => {
            setDays(day.value);

            updateChart(day.value);
          }}
          selected={day.value === days}
        >
          {day.label}
        </Button>
      ))} */}
    </>
  );
});
