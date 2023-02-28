import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter } from "react-router-dom";
import BottomNavbar from "./components/nav/BottomNavbar";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", zIndex: 1 }}>
        <BottomNavbar />
        <div style={{ padding: 10, paddingBottom: 70 }}>
          <Home />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
