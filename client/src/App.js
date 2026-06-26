import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import Layout from './Layout';
import About from './pages/About';
import Mission from './pages/Mission';
import Animals from './pages/OurAnimals';
import AnimalPage from './pages/AnimalPage';
import Help from './pages/Help';
import { ScrollToTop } from "./pages/NavBar";

function App() {

  const apiCall = () =>{
    axios.get('http://localhost:8080').then(() => {
      console.log('working')
    })
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* All pages use Layout, which includes the Navbar */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="results" element={<Results />} />
          <Route path="about" element={<About />} />
          <Route path="mission" element={<Mission />} />
          <Route path="animals" element={<Animals />} />
          <Route path="/animals/:animalKey" element={<AnimalPage />} />
          <Route path="helpNow" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
