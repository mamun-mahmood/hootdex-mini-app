import React, { useEffect, useState } from "react";
import {
  Avatar,
  LinearProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { convertToInternationalCurrencySystem } from "../utils";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import url from "../serverUrl";
import { useSelector } from "react-redux";
const TopToken = () => {
  const loading = false;
  const {
    PecuPrice,
    projectTokens,
    wrapTokens,
    holdingTokens,
    liquidityPools,
    derivatives,
    synthetics,
  } = useSelector((state) => state);
  const [trendHourly, setTrendHourly] = useState({});
  const [coinVolume, setCoinVolume] = useState(114826.00453596);
  const [trend, setTrend] = useState({});
  const get_change_index_coin_hourly = () => {
    axios.get(`${url}/wallet/get_change_index_coin_hourly`).then((res) => {
      setTrendHourly(res.data);
    });
  };
  const get_change_index_coin = () => {
    axios.get(`${url}/wallet/get_change_index_coin`).then((res) => {
      setTrend(res.data);
    });
  };

  const calculate_daily_volume = () => {
    axios.get(`${url}/wallet/calculate_daily_volume`).then((res) => {
      setCoinVolume(res.data.total_volume);
    });
  };
  useEffect(() => {
    get_change_index_coin_hourly();
    get_change_index_coin();
    calculate_daily_volume();
  }, []);
  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: "#1a1b1f",
          borderRadius: "1rem",
          color: "#fff",
        }}
        component={Paper}
      >
        {loading && <LinearProgress color="inherit" />}
        {!loading ? (
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: " 1px solid #1e2128",
              },
            }}
          >
            <TableHead className="">
              <TableRow className="">
                <TableCell className="twhite">Name</TableCell>
                <TableCell className="twhite" align="left">
                  Price (USD)
                </TableCell>
{/* 
                <TableCell className="twhite" align="left">
                  1hr %
                </TableCell>
                <TableCell className="twhite" align="left">
                  24hr %
                </TableCell>
                <TableCell className="twhite" align="left">
                  7d %
                </TableCell>
                <TableCell className="twhite" align="left">
                  Volume 24H
                </TableCell>

                <TableCell className="twhite" align="left">
                  TVL (USD)
                </TableCell> */}
                <TableCell className="twhite" align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="twhite" align="left">
                  <Link
                    to={`/pecu`}
                    state={{
                      price: PecuPrice,
                      symbol: "PECU",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        className="rounded"
                        src={`https://pecunovus.net/static/media/icon.25c8ec299d961b9dd524.ico`}
                        alt="token logo"
                        style={{
                          height: "35px",
                          width: "35px",
                          fontSize: "18px",
                        }}
                      />

                      <span
                        style={{
                          marginLeft: "1rem",
                          fontSize: "14px",
                          color: "grey",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {" "}
                        <small
                          style={{
                            fontSize: "13px",
                            color: "orange",
                          }}
                        >
                          {"PECU"}
                        </small>
                        {/* <small
                            style={{
                              fontSize: '13px',
                              color: 'palegreen'
                            }}
                          >
                            {each.symbol}
                          </small> */}
                        <small
                          style={{
                            fontSize: "14px",
                            marginRight: "4px",
                            fontWeight: 400,
                          }}
                        >{`${"Pecu Novus"}`}</small>
                      </span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className={"twhite"} align="left">
                  {" "}
                  {PecuPrice >= 1
                    ? PecuPrice.toFixed(5).toLocaleString("en-US")
                    : PecuPrice.toFixed(5)}
                </TableCell>
                {/* <TableCell
                  className={
                    trendHourly.trend == "1" ? `twhite green` : `twhite red`
                  }
                  align="left"
                >
                  {trendHourly.trend == "1" ? (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  ) : trendHourly.trend == "-1" ? (
                    <ArrowDownward sx={{ fontSize: "13px" }} />
                  ) : (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  )}
                  {parseFloat(trendHourly.value).toFixed(2)}%
                </TableCell>
                <TableCell
                  className={trend.trend == "1" ? `twhite green` : `twhite red`}
                  align="left"
                >
                  {trend.trend == "1" ? (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  ) : trend.trend == "-1" ? (
                    <ArrowDownward sx={{ fontSize: "13px" }} />
                  ) : (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  )}
                  {trend.value} %
                </TableCell>

                <TableCell
                  className={
                    trendHourly.trend == "1" ? `twhite green` : `twhite red`
                  }
                  align="left"
                >
                  {trendHourly.trend == "1" ? (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  ) : trendHourly.trend == "-1" ? (
                    <ArrowDownward sx={{ fontSize: "13px" }} />
                  ) : (
                    <ArrowUpward sx={{ fontSize: "13px" }} />
                  )}
                  {trend.value} %
                </TableCell>
                <TableCell className="twhite pink" align="left">
                  <span>
                    {" "}
                    {convertToInternationalCurrencySystem(
                      coinVolume * PecuPrice
                    )}
                  </span>
                </TableCell>
                <TableCell className="twhite pink" align="left">
                  {" "}
                  <span>-</span>
                </TableCell>
                <TableCell
                  className={"twhite"}
                  align="left"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ fontSize: "12px", fontWeight: 300 }}></p>
                  <p style={{ fontSize: "12px", fontWeight: 300 }}></p>
                </TableCell> */}
              </TableRow>
              {synthetics?.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" align="left">
                    <Link
                      to={`/synthetics/${each?.symbol}`}
                      state={{
                        price: each.currentPrice,
                        symbol: each?.symbol,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`${each?.logo}`}
                          alt="token logo"
                          style={{
                            height: "35px",
                            width: "35px",
                            fontSize: "18px",
                          }}
                        />

                        <span
                          style={{
                            marginLeft: "1rem",
                            fontSize: "14px",
                            color: "grey",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {" "}
                          <small
                            style={{
                              fontSize: "13px",
                              color: "orange",
                            }}
                          >
                            {each.identitySymbol}
                          </small>
                          {/* <small
                            style={{
                              fontSize: '13px',
                              color: 'palegreen'
                            }}
                          >
                            {each.symbol}
                          </small> */}
                          <small
                            style={{
                              fontSize: "14px",
                              marginRight: "4px",
                              fontWeight: 400,
                            }}
                          >{`${each?.name}`}</small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell
                    className={
                      each.currentPrice - each.price1hour >= 0
                        ? `twhite `
                        : `twhite `
                    }
                    align="left"
                  >
                    {" "}
                    {each.currentPrice >= 1
                      ? each.currentPrice.toFixed(5).toLocaleString("en-US")
                      : each.currentPrice.toFixed(5)}
                  </TableCell>
                  {/* <TableCell
                    className={
                      each.currentPrice - each.price1hour >= 0
                        ? `twhite green`
                        : `twhite red`
                    }
                    align="left"
                  >
                    {each.currentPrice - each.price1hour > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.price1hour < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {(
                      (each.currentPrice - each.price1hour) /
                      (3 * each.currentPrice)
                    )
                      .toFixed(4)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell
                    className={
                      each.currentPrice - each.price1hour >= 0
                        ? `twhite green`
                        : `twhite red`
                    }
                    align="left"
                  >
                    {each.currentPrice - each.price1hour > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.price1hour < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {(
                      (each.currentPrice - each.price1hour) /
                      2 /
                      each.currentPrice
                    )
                      .toFixed(4)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>

                  <TableCell
                    className={
                      each.currentPrice - each.price1hour >= 0
                        ? `twhite green`
                        : `twhite red`
                    }
                    align="left"
                  >
                    {each.currentPrice - each.price1hour > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.price1hour < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {((each.currentPrice - each.price1hour) / each.currentPrice)
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {each.volume
                      ? convertToInternationalCurrencySystem()
                      : "0.00"}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    className={"twhite"}
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleTimeString()}
                    </p>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
            <TableBody>
              {wrapTokens?.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" align="left">
                    <Link to={`/tokens/${each.symbol}`} state={each}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={each?.logo}
                          alt={each.symbol.slice(1)}
                          style={{
                            height: "35px",
                            width: "35px",
                            fontSize: "18px",
                          }}
                        />
                        <span
                          style={{
                            marginLeft: "1rem",
                            fontSize: "14px",
                            color: "grey",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {" "}
                          <small style={{ fontSize: "13px", color: "orange" }}>
                            {each.symbol
                              .split("")
                              .map((e, i) => (i == 0 ? e.toLowerCase() : e))
                              .join("")}
                          </small>
                          <small
                            style={{
                              fontSize: "14px",
                              marginRight: "4px",
                              fontWeight: 400,
                            }}
                          >
                            {each.name}
                          </small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="twhite" align="left">
                    {" "}
                    {each?.currentPrice >= 1
                      ? (each?.currentPrice).toFixed(5).toLocaleString("en-US")
                      : (each?.currentPrice).toFixed(5)}
                  </TableCell>
                  {/* <TableCell
                    className={
                      each.currentPrice - each.price1hour > 0
                        ? `twhite green`
                        : each.currentPrice - each.price1hour < 0
                        ? `twhite red`
                        : "twhite"
                    }
                    align="left"
                  >
                    {each.currentPrice - each.price1hour > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.price1hour < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : null}
                    {(
                      ((each.currentPrice - each.price1hour) /
                        each.currentPrice) *
                      100
                    )
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>

                  <TableCell
                    className={
                      each.currentPrice - each.firstPrice > 0
                        ? `twhite green`
                        : each.currentPrice - each.firstPrice < 0
                        ? `twhite red`
                        : "twhite"
                    }
                    align="left"
                  >
                    {each.currentPrice - each.firstPrice > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.firstPrice < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : null}
                    {(
                      ((each.currentPrice - each.firstPrice) /
                        each.currentPrice) *
                      100
                    )
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell
                    className={
                      each.currentPrice - each.price7days > 0
                        ? `twhite green`
                        : each.currentPrice - each.price7days < 0
                        ? `twhite red`
                        : "twhite"
                    }
                    align="left"
                  >
                    {each.currentPrice - each.price7days > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.currentPrice - each.price7days < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : null}
                    {(
                      ((each.currentPrice - each.price7days) /
                        each.currentPrice) *
                      100
                    )
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {convertToInternationalCurrencySystem()}
                  </TableCell>
                  <TableCell className="twhite blue" align="left">
                    {" "}
                    {convertToInternationalCurrencySystem(
                      each.currentPrice *
                        liquidityPools
                          ?.filter((e) => e.wrap_token_symbol === each.symbol)
                          ?.reduce((a, b) => a + b.wrap_token_amount, 0)
                    )}
                  </TableCell>
                  <TableCell
                    className={"twhite"}
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleTimeString()}
                    </p>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
            <TableBody>
              {projectTokens?.map((each, index) => (
                <TableRow key={each.id}>
                  <TableCell className="twhite" align="left">
                    <Link
                      to={`/project-token/${each?.token_symbol}`}
                      pecuCoins={PecuPrice}
                      state={{
                        token_price: each.token_price,
                        symbol: each?.token_symbol,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="rounded"
                          src={`${each?.image}`}
                          alt="token logo"
                          style={{
                            height: "35px",
                            width: "35px",
                            fontSize: "18px",
                          }}
                        />

                        <span
                          style={{
                            marginLeft: "1rem",
                            fontSize: "14px",
                            color: "grey",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {" "}
                          <small
                            style={{
                              fontSize: "13px",
                              color: "orange",
                            }}
                          >
                            {each.token_symbol}
                          </small>
                          <small
                            style={{
                              fontSize: "14px",
                              marginRight: "4px",
                              fontWeight: 400,
                            }}
                          >{`${each?.token_name}`}</small>
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell
                    className={each.priceChange >= 0 ? `twhite ` : `twhite `}
                    align="left"
                  >
                    {" "}
                    {each?.token_price >= 1
                      ? (each?.token_price).toFixed(5).toLocaleString("en-US")
                      : (each?.token_price).toFixed(5)}
                  </TableCell>

                  {/* <TableCell
                    className={
                      each.priceChange >= 0 ? `twhite green` : `twhite red`
                    }
                    align="left"
                  >
                    {each.priceChange > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.priceChange < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {(each.priceChange / (3 * each.token_price))
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell
                    className={
                      each.priceChange >= 0 ? `twhite green` : `twhite red`
                    }
                    align="left"
                  >
                    {each.priceChange > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.priceChange < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {((each.priceChange / 2) * each.token_price)
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell
                    className={
                      each.priceChange >= 0 ? `twhite green` : `twhite red`
                    }
                    align="left"
                  >
                    {each.priceChange > 0 ? (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    ) : each.priceChange < 0 ? (
                      <ArrowDownward sx={{ fontSize: "13px" }} />
                    ) : (
                      <ArrowUpward sx={{ fontSize: "13px" }} />
                    )}
                    {(each.priceChange / each.token_price)
                      .toFixed(2)
                      .toLocaleString("en-US")}{" "}
                    %
                  </TableCell>
                  <TableCell className="twhite pink" align="left">
                    {each.volume
                      ? convertToInternationalCurrencySystem()
                      : "0.00"}
                  </TableCell>

                  <TableCell className="twhite blue" align="left">
                    {" "}
                    {convertToInternationalCurrencySystem(
                      each.token_price * each.amount_issued
                    )}
                  </TableCell>
                  <TableCell
                    className={"twhite"}
                    align="left"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: "12px", fontWeight: 300 }}>
                      {new Date(each.timestamp).toLocaleTimeString()}
                    </p>
                  </TableCell> */}
                </TableRow>
              ))}
              {holdingTokens?.map((each, index) => {
                each.symbol = each.token_symbol;
                each.tokenName = each.token_name;

                return (
                  <TableRow key={each.id}>
                    <TableCell className="twhite" align="left">
                      <Link to={`/holding-token/${each.symbol}`} state={each}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            className="rounded"
                            src={each?.image}
                            alt={each.symbol.slice(1)}
                            style={{
                              height: "35px",
                              width: "35px",
                              fontSize: "18px",
                            }}
                          />
                          <span
                            style={{
                              marginLeft: "1rem",
                              fontSize: "14px",
                              color: "grey",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {" "}
                            <small
                              style={{ fontSize: "13px", color: "orange" }}
                            >
                              {each.symbol}
                            </small>
                            <small
                              style={{
                                fontSize: "14px",
                                marginRight: "4px",
                                fontWeight: 400,
                              }}
                            >
                              {each.token_name}
                            </small>
                          </span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell
                      className={
                        Math.ceil(each.priceChange) >= 0 ? `twhite ` : `twhite `
                      }
                      align="left"
                    >
                      {" "}
                      {each?.token_price >= 1
                        ? (each?.token_price).toFixed(5).toLocaleString("en-US")
                        : (each?.token_price).toFixed(5)}
                    </TableCell>
                    {/* <TableCell
                      className={
                        each.priceChange >= 0 ? `twhite green` : `twhite red`
                      }
                      align="left"
                    >
                      {each.priceChange >= 0 ? (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      ) : each.priceChange < 0 ? (
                        <ArrowDownward sx={{ fontSize: "13px" }} />
                      ) : (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      )}
                      {(each.priceChange / (3 * each.token_price))
                        ?.toFixed(2)
                        .toLocaleString("en-US")}{" "}
                      %
                    </TableCell>
                    <TableCell
                      className={
                        each.priceChange >= 0 ? `twhite green` : `twhite red`
                      }
                      align="left"
                    >
                      {each.priceChange > 0 ? (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      ) : each.priceChange < 0 ? (
                        <ArrowDownward sx={{ fontSize: "13px" }} />
                      ) : (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      )}
                      {((each.priceChange / 2) * each.token_price)
                        ?.toFixed(2)
                        .toLocaleString("en-US")}{" "}
                      %
                    </TableCell>
                    <TableCell
                      className={
                        each.priceChange >= 0 ? `twhite green` : `twhite red`
                      }
                      align="left"
                    >
                      {each.priceChange > 0 ? (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      ) : each.priceChange < 0 ? (
                        <ArrowDownward sx={{ fontSize: "13px" }} />
                      ) : (
                        <ArrowUpward sx={{ fontSize: "13px" }} />
                      )}
                      {(each.priceChange / each.token_price)
                        ?.toFixed(2)
                        .toLocaleString("en-US")}{" "}
                      %
                    </TableCell>

                    <TableCell className="twhite pink" align="left">
                      {convertToInternationalCurrencySystem()}
                    </TableCell>
                    <TableCell className="twhite blue" align="left">
                      {" "}
                      {convertToInternationalCurrencySystem(
                        each?.token_price * each?.amount_issued
                      )}
                    </TableCell>
                    <TableCell
                      className={"twhite"}
                      align="left"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <p style={{ fontSize: "12px", fontWeight: 300 }}>
                        {new Date(each.timestamp).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: "12px", fontWeight: 300 }}>
                        {new Date(each.timestamp).toLocaleTimeString()}
                      </p>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Skeleton
            sx={{ bgcolor: "#21242b", mt: 1 }}
            variant="rectangular"
            margin={"1rem"}
            height={100}
          />
        )}
      </TableContainer>
    </>
  );
};

export default React.memo(TopToken);
