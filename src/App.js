import './App.css';
import Time from './components/time';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Pomodoro from './components/pomodoro';
import Timer from './components/timer';
import Stopwatch from './components/stopwatch';
import Planner from './components/planner';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/timely/" element={<Time />} />
          <Route path="/timely/pomodoro" element={<Pomodoro />} />
          <Route path="/timely/timer" element={<Timer />} />
          <Route path="/timely/stopwatch" element={<Stopwatch />} />
          <Route path="/timely/planner" element={<Planner />} />
          <Route path="*" element={<Time />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
