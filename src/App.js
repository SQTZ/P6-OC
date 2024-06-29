import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Photographers from './pages/photographers';
import Photographer from './pages/photographer';


function App() {
  
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Photographers />} />
            <Route path="/photographer/:id" element={<Photographer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
