import { IconButton } from "@mui/material";
import React, { useState } from "react";
import PieChartIcon from "@mui/icons-material/PieChart";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Person3Icon from "@mui/icons-material/Person3";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom/dist";
import ConnectWallet from "./Modal/ConnectWallet";

const BottomNavbar = ({ fetchWallet, wallet }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  async function requestAccount() {
    console.log("Requesting account...");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error Connecting..");
      }
    } else {
      console.log("Not detected");
    }
  }
  return (
    <>
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
        <IconButton style={{ flex: 1 }} onClick={() => navigate("/")}>
          <HomeOutlinedIcon fontSize="large" style={{ color: "#01402b" }} />
        </IconButton>
        <IconButton style={{ flex: 1 }}>
          <PieChartIcon fontSize="large" style={{ color: "#01402b" }} />
        </IconButton>
        <IconButton style={{ flex: 1 }} onClick={() => setOpen((e) => !e)}>
          <SwapHorizontalCircleIcon style={{ color: "", fontSize: 56 }} />
        </IconButton>
        <IconButton style={{ flex: 1 }}>
          <SignalCellularAltIcon
            fontSize="large"
            style={{ color: "#01402b" }}
          />
        </IconButton>
        <IconButton style={{ flex: 1 }}>
          <Person3Icon fontSize="large" style={{ color: "#01402b" }} />
        </IconButton>
      </div>
      <ConnectWallet
        setOpen={setOpen}
        open={open}
        fetchWallet={fetchWallet}
        wallet={wallet}
        setWalletAddress={setWalletAddress}
        requestAccount={requestAccount}
        walletAddress={walletAddress}
      />
    </>
  );
};

export default BottomNavbar;
