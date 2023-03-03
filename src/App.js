import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import { Route, Routes } from "react-router-dom/dist";
import TokenPage from "./screens/TokenPage";
import hootdexLogo from "./assets/images/logov.png";
function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", zIndex: 1 }}>
        <img 
          src={hootdexLogo}
          alt="hootdex logo"
          width="50%"
          height="30px"
          style={{ marginLeft: "25%" }}
        />
        <BottomNavbar />
        <div style={{ padding: 10, paddingBottom: 70 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/t/:tokenSymbol" element={<TokenPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
