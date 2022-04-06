import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";

// main page --> route component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
