import { useState } from 'react';
import './App.css';
import Navbar from './pages/navbar/Navbar';
import Myroute from './routes/Myroute';
function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <div>
      {showNavbar && <Navbar />}
      <Myroute setShowNavbar = {setShowNavbar}/>
    </div>  
  );
}

export default App;
