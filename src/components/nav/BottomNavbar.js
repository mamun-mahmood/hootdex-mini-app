import { IconButton } from "@mui/material";
import React from "react";
import PieChartIcon from "@mui/icons-material/PieChart";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Person3Icon from "@mui/icons-material/Person3";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom/dist";

const BottomNavbar = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#1a1b1f",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        boxShadow: "0px -1px 0px 0px #01402b",
        height: 56,
        padding: 4,
      }}
    >
      <IconButton style={{ flex: 1 }} onClick={() => navigate("/")} >
        <HomeOutlinedIcon fontSize="large" style={{ color: "#01402b" }} />
      </IconButton>
      <IconButton style={{ flex: 1 }}>
        <PieChartIcon fontSize="large" style={{ color: "#01402b" }} />
      </IconButton>
      <IconButton style={{ flex: 1 }}>
        <SwapHorizontalCircleIcon style={{ color: "", fontSize: 56 }} />
      </IconButton>
      <IconButton style={{ flex: 1 }}>
        <SignalCellularAltIcon fontSize="large" style={{ color: "#01402b" }} />
      </IconButton>
      <IconButton style={{ flex: 1 }}>
        <Person3Icon fontSize="large" style={{ color: "#01402b" }} />
      </IconButton>
    </div>
  );
};

export default BottomNavbar;
