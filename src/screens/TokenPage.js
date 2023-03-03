import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "../serverUrl";
import LineChartGraph from "../components/LineChart";

const TokenPage = () => {
  const { tokenSymbol } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [poolInfo, SetPoolInfo] = React.useState([]);
  // const { name, price, volume, logo } = data && data;
  useEffect(() => {
    setLoading(true);
    const get_crypto_Data = () => {
      // let symbol = tokenSymbol?.slice(1);
      axios
        .get(`${url}/crypto/coin?symbol=${tokenSymbol}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    get_crypto_Data();
  }, []);
  return (
    <>
      <div className="d-flex-j-between">
        <div>
          <small>{data?.name || "Token name"}</small>
          <Typography>${data?.price || "Token price"}</Typography>
          <Typography>${data?.price * data?.volume || "0000"}</Typography>
        </div>
        <IconButton>
          <MonetizationOnOutlinedIcon
            fontSize="large"
            style={{ color: "#01402b" }}
          />
        </IconButton>
      </div>
      <div className="mt-mb-10" >
        {/* <PecuGraph /> */}
        <LineChartGraph />
      </div>
      <div className="d-flex-j-between box-shadow border-radius-10 padding-5">
        <div className="d-flex-j-between">
          <Avatar src={data?.logo} alt={data?.name + "logo"} />
          <Typography style={{marginLeft: 5}}>{data?.name || "Token wallet"}</Typography>
        </div>
        <div>
          <Typography>{data?.price || "00000"}</Typography>
          <Typography>{data?.volume || "0000"}</Typography>
        </div>
      </div>
    </>
  );
};

export default TokenPage;
