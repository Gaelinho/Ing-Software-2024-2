import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login';

function App() {
  return (
      <Router>
              <main>
                  <Routes>
                      <Route path="/login" element={<Login/>}/>
                  </Routes>
              </main>
          </Router>
  );
}

export default App;
