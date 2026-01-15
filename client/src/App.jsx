import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the new Navbar
import CreatePoll from './pages/CreatePoll';
import ViewPoll from './pages/ViewPoll';
import MyPolls from './pages/MyPolls'; // We will create this next
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="container">
          {/* Navbar sits inside the container or above it */}
          <Navbar /> 
          
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:id" element={<ViewPoll />} />
            <Route path="/mypolls" element={<MyPolls />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;