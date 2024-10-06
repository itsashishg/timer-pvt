import './App.css';
import Time from './components/time';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Pomodoro from './components/pomodoro';
import Timer from './components/timer';
import Stopwatch from './components/stopwatch';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Time />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
