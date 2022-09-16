import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crash from "./pages/Crash";
import Double from "./pages/Double";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          <Route path="crash" element={<Crash />}></Route>
          <Route path="double" element={<Double />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
