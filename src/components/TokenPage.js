import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TokenGraph from "./TokenGraph";
import PecuGraph from "./PecuGraph";

const TokenPage = ({ name, symbol, price, volume, logo }) => {
  return (
    <>
      <div>
        <div>
          <small>{name} price</small>
          <Typography>${price}</Typography>
          <Typography>${price * volume}</Typography>
        </div>
        <IconButton>
          <MonetizationOnOutlinedIcon
            fontSize="large"
            style={{ color: "#01402b" }}
          />
        </IconButton>
      </div>
      <div>
        <PecuGraph/>
      </div>
      <div>
        <Avatar src={logo} alt={name + "logo"} />
      </div>
    </>
  );
};

export default TokenPage;
