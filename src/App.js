import './App.css';
import Time from './components/time';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Time />} />
          <Route path="/search" element={<Time />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
