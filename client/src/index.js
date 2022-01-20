import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Welcome from './pages/Welcome'
import CreateQuiz from './pages/CreateQuiz'
import Questions from './pages/Questions'
import ResultsPage from './pages/ResultsPage'
import Leaderboard from './pages/Leaderboard'
import './index.css'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />}>
               <Route index element={<Welcome />} />
               <Route  path="/create_quiz" element={<CreateQuiz  />} />
               <Route path="/questions_page" element={<Questions />} />
               <Route path="/results_page" element={<ResultsPage />} />
               <Route className="LeaderBoardButton" path="/leaderboard" element={<Leaderboard />} />
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

