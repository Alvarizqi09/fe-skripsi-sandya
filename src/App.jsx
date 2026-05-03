import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import DiseaseDetail from "./pages/DiseaseDetail";
import Predict from "./pages/Predict";
import MachineLearning from "./pages/MachineLearning";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/disease/:id" element={<DiseaseDetail />} />
          <Route path="/machinelearning" element={<MachineLearning />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
