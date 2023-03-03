import { Box, Button, Skeleton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import url from '../../serverUrl';
const TokenGraph = ({ id, pool, currentValue, symbol }) => {
  const [chartBtn, setChartBtn] = useState(2);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState('daily');

  const getChatData = (target) => {
    setFilter(target);
    if (id) {
      axios
        .get(`${url}/wallet/get_change_token_${target}?symbol=${symbol}`)
        .then((res) => {
          setChartData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getChatData('hourly');
  }, [symbol]);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'inline-block', sm: 'flex' },
          justifyContent: 'space-between',
          width: '100%',
          height: 30
        }}
      >
        <div>{/* <p className="pool-page-t1">{date}</p> */}</div>
        <div
          style={{
            backgroundColor: 'rgb(44, 47, 54)',
            borderRadius: '12px',
            textAlign: 'center'
          }}
          className="dsparound"
        >
          <p
            className={`${chartBtn === 1 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(1)}
            style={{ fontSize: '10px' }}
          >
            Volume
          </p>
          <p
            className={`${chartBtn === 2 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(2)}
            style={{ fontSize: '10px' }}
          >
            TVL
          </p>
          <p
            className={`${chartBtn === 3 && 'chart_btn_selected'} chart_btn`}
            onClick={() => setChartBtn(3)}
            style={{ fontSize: '10px' }}
          >
            Price
          </p>
        </div>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          minWidth: '100%'
        }}
      >
        <Button
          className={`${
            filter === 'hourly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('hourly');
          }}
        >
          1D
        </Button>
        <Button
          className={`${
            filter === 'weekly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          sx={{ display: { xs: 'none', md: 'block' } }}
          onClick={() => {
            getChatData('weekly');
          }}
        >
          1W
        </Button>
        <Button
          className={`${
            filter === 'monthly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('monthly');
          }}
        >
          1M
        </Button>
        <Button
          className={`${
            filter === 'quaterly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('quaterly');
          }}
        >
          3M
        </Button>
        <Button
          className={`${
            filter === 'yearly'
              ? 'header-link chart-button activeButton'
              : 'header-link chart-button'
          }`}
          onClick={() => {
            getChatData('yearly');
          }}
        >
          1Y
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          marginTop: '1rem'
        }}
      >
        {/* <ResponsiveContainer width={'100%'} height={300}>
          <LineChart height={'100%'} data={chartData}>
            <Line
              type="monotone"
              dataKey="today_value"
              stroke="#01402b"
              strokeWidth={2}
            />
            <XAxis dataKey="date_time" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer> */}
        {chartData.length > 0 ? (
          <ResponsiveContainer
            width={'100%'}
            // height={window.screen.availHeight / 2.2}
            aspect={3}
          >
            <AreaChart
              data={chartData}
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
                dataKey="Price"
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
        ) : (
          <Skeleton
            sx={{ bgcolor: '#21242b', mt: 1 }}
            variant="rectangular"
            margin={'1rem'}
            height={250}
          />
        )}
      </div>
    </>
  );
};

export default TokenGraph;
