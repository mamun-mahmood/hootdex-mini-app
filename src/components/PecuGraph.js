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

export default memo(function PechuGraph() {
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
      .get(`${url}/wallet/get_change_tvl_${filter}`)
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
  function tConvert(time) {
    if (time) {
      time = parseInt(time);
      // If time format correct
      // Remove full string match value

      time =
        time < 12
          ? time + ' : 00 ' + 'AM'
          : time > 12
          ? (time % 12) + ' : 00 ' + 'PM'
          : 12 + ' : 00  '; // Set AM/PM

      //time = time % 12 || 12; // Adjust hours
    }
    return time; // return adjusted time or original string
  }

  useEffect(() => {
    getChatData('hourly');
  }, []);
  const updateChart = (value) => {
    if (value == 1) {
      getChatData('hourly');
    } else if (value == 7) {
      getChatData('weekly');
    } else if (value == 30) {
      getChatData('monthly');
    } else if (value == 90) {
      getChatData('quaterly');
    } else if (value == 365) {
      getChatData('yearly');
    }
  };

  return (
    <div className="graph-container">
      <Box
        sx={{
          backgroundColor: '#1a1b1f',
          borderRadius: '1rem',
          width: '100%',
          textAlign: 'center',
          mt: '1rem'
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: 'rgb(195, 197, 203)',
              fontSize: '15px',
              fontWeight: '600',
              textAlign: 'center',
              backgroundColor: '#21242b',
              padding: '0.5rem 0 0.5rem 0',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem'
            }}
          >
            VOLUME
          </p>
          {true ? (
            <>
              <ResponsiveContainer
                width={'100%'}
                // height={window.screen.availHeight / 2.2}
                aspect={3}
              >
                <AreaChart
                  data={[]}
                  style={{ width: '100%' }}
                  // margin={{ top: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="rgb(255, 145, 0)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgb(255, 145, 0)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="rgb(255, 145, 0)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgb(255, 145, 0)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="chart_date" />
                  {/* <YAxis /> */}
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="today_value"
                    stroke="rgb(255, 145, 0)"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    style={{
                      position: 'absolute',
                      zIndex: '100',
                      width: '100%'
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {chartDays.map((day) => (
                // <button className="header-link chart-button" key={day.value}>
                //   {day.label}
                // </button>
                <Button
                  className={`${
                    filter === 'yearly'
                      ? 'header-link chart-button '
                      : 'header-link chart-button'
                  }`}
                  key={day.value}
                >
                  {day.label}
                </Button>
              ))}
            </>
          ) : (
            <Skeleton
              sx={{ bgcolor: '#21242b', mt: 1 }}
              variant="rectangular"
              margin={'1rem'}
              height={250}
            />
          )}
        </div>
      </Box>
      <Box
        sx={{
          borderRadius: '1rem',
          width: '100%',
          textAlign: 'center',
          mt: '1rem',
          background:
            'linear-gradient(0deg, rgba(185,195,34,0.09348476890756305) 0%, rgba(253,187,45,0.09793855042016806) 100%)'
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: 'rgb(195, 197, 203)',
              fontSize: '15px',
              fontWeight: '600',
              textAlign: 'center',
              backgroundColor: '#21242b',
              padding: '0.5rem 0 0.5rem 0',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem'
            }}
          >
            TVL
          </p>

          {true ? (
            <>
              {/* <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  marginTop: '1rem',
                  minWidth: '100%',
                  padding: '1rem'
                }}
              >
                <Button
                  className={`${
                    filter === 'yearly'
                      ? 'header-link chart-button activeButton'
                      : 'header-link chart-button'
                  }`}
                  // onClick={() => {
                  //   getChatData('yearly');
                  // }}
                >
                  12M
                </Button>
                <Button
                  className={`${
                    filter === 'quaterly'
                      ? 'header-link chart-button activeButton'
                      : 'header-link chart-button'
                  }`}
                  sx={{ display: { xs: 'none', md: 'block' } }}
                  // onClick={() => {
                  //   getChatData('quaterly');
                  // }}
                >
                  3M
                </Button>
                <Button
                  className={`${
                    filter === 'monthly'
                      ? 'header-link chart-button activeButton'
                      : 'header-link chart-button'
                  }`}
                  // onClick={() => {
                  //   getChatData('monthly');
                  // }}
                >
                  1M
                </Button>
                <Button
                  className={`${
                    filter === 'weekly'
                      ? 'header-link chart-button activeButton'
                      : 'header-link chart-button'
                  }`}
                  // onClick={() => {
                  //   getChatData('weekly');
                  // }}
                >
                  7D
                </Button>
                <Button
                  className={`${
                    filter === 'hourly'
                      ? 'header-link chart-button activeButton'
                      : 'header-link chart-button'
                  }`}
                  // onClick={() => {
                  //   getChatData('hourly');
                  // }}
                >
                  1D
                </Button>
              </div> */}
              <ResponsiveContainer
                width={'100%'}
                // height={window.screen.availHeight / 2.2}
                aspect={3}
              >
                <Line
                  style={{
                    background: ' rgb(185,195,34)',
                    background:
                      'linear-gradient(0deg, rgba(185,195,34,0.06348476890756305) 0%, rgba(253,187,45,0.19793855042016806) 100%)'
                  }}
                  data={{
                    labels: chartData.map((coin) => {
                      return days === 1
                        ? tConvert(coin?.chart_date)
                        : coin?.chart_date;
                    }),

                    datasets: [
                      {
                        data: chartData.map((coin) => coin.TVL),
                        label: `Price ( Past ${days} Days ) in ${'USD'}`,
                        borderColor: '#EEBC1D'
                      }
                    ]
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1
                      }
                    }
                  }}
                />
              </ResponsiveContainer>
              {chartDays.map((day) => (
                <Button
                  className={`${
                    filter === 'yearly'
                      ? 'header-link chart-button '
                      : 'header-link chart-button'
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
              ))}
            </>
          ) : (
            <Skeleton
              sx={{ bgcolor: '#21242b', mt: 1 }}
              variant="rectangular"
              margin={'1rem'}
              height={250}
            />
          )}
        </div>
      </Box>
    </div>
  );
});
