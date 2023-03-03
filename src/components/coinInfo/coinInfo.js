import axios from 'axios';
import { useEffect, useState } from 'react';
import { HistoricalChart } from './api';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import SelectButton from './selectedButton';
import { chartDays, chartDays2 } from './chartDays';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import url from '../../serverUrl';
ChartJS.register(...registerables);
const CoinInfo = ({ coin, firstData }) => {
  const [historicData, setHistoricData] = useState([]);
  const symbol = coin?.symbol;
  const [days, setDays] = useState(1);
  const currency = 'USD';
  const [flag, setflag] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(firstData, 'firstData');
  const getChatData = (target) => {
    setLoading(true);
    setHistoricData([]);
    axios
      .get(`${url}/wallet/get_change_token_${target}?symbol=${symbol}`)
      .then((res) => {
        setflag(true);
        let hoursData = timeMappers();
        if (target === 'hourly') {
          res.data.forEach((e, i) => {
            setHistoricData((old) => [
              ...old,
              { ...e, chart_date: hoursData[i] }
            ]);
          });
        } else {
          res.data.forEach((e, i) => {
            setHistoricData((old) => [...old, e]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((e) => setLoading(false));
  };

  const fetchHistoricData = async () => {
    if (coin && coin.id) {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );

      setflag(true);
      setHistoricData(data.prices);
    }
  };

  // useEffect(() => {
  //   let hoursData = timeMappers();
  //   if (firstData && firstData.length > 0) {
  //     firstData.forEach((e, i) => {
  //       setHistoricData((old) => [...old, { ...e, chart_date: hoursData[i] }]);
  //     });
  //   }
  // }, [firstData]);

  useEffect(() => {
    if (coin && coin.id) {
      fetchHistoricData();
    } else {
      getChatData('hourly');
    }
  }, [symbol]);

  useEffect(() => {
    if (coin && coin.id) {
      fetchHistoricData();
    }
  }, [days]);

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

  return (
    <div>
      {
        <>
          {coin.id ? (
            <>
              {' '}
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
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
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-around',
                  width: '100%'
                }}
              >
                {chartDays.map((day) => (
                  <button
                    className="header-link chart-button"
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setflag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {' '}
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    return days == 1
                      ? tConvert(coin?.chart_date)
                      : coin?.chart_date;
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin.Price),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
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
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  justifyContent: 'space-around',
                  width: '100%'
                }}
              >
                {coin && coin.id
                  ? chartDays.map((day) => (
                      <button
                        className="header-link chart-button"
                        key={day.value}
                        onClick={() => {
                          if (coin.id) {
                            setDays(day.value);
                            setflag(false);
                          } else {
                            setDays(day.value);
                            setflag(false);
                            updateChart(day.value);
                          }
                        }}
                        selected={day.value === days}
                      >
                        {day.label}
                      </button>
                    ))
                  : chartDays2.map((day) => (
                      <button
                        className="header-link chart-button"
                        key={day.value}
                        onClick={() => {
                          if (coin.id) {
                            setDays(day.value);
                            setflag(false);
                          } else {
                            setDays(day.value);
                            setflag(false);
                            updateChart(day.value);
                          }
                        }}
                        selected={day.value === days}
                      >
                        {day.label}
                      </button>
                    ))}
              </div>
            </>
          )}
        </>
      }
    </div>
  );
};

export default CoinInfo;
