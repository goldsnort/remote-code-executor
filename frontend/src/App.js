import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeExecution from "./pages/CodeExecution/CodeExecution";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CodeExecution />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
