import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/login';
import { QuizPage } from './Components/QuizPage/quizpage';
import { Result } from './Components/Result/result';
import { Report } from './Components/Report/report';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Login />}></Route>
          <Route exact path='/quizpage' element={< QuizPage />}></Route>
          <Route exact path='/result' element={< Result />}></Route>
          <Route exact path='/report' element={< Report />}></Route>
       </Routes>
      </div>
    </Router>
  );
}

export default App;
