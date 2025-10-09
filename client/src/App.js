import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';

function App() {

  const apiCall = () =>{
    axios.get('http://localhost:8080').then(() => {
      console.log('working')
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
