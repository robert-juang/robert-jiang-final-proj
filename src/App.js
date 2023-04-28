import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'; 
import './App.css';
import { Login } from './pages/Login'; 
import { Register } from "./pages/Register"; 
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import Account from './pages/Account';
import BuyStock from './pages/Buystock';
import Home from './pages';
import News from './pages/News';
import Simulator from './pages/Simulator';



function App() {

  const [currentForm, setCurrentForm] = useState('login'); 
  const [authenticated, setauthenticated] = useState(true); 

  const toggleForm = (formName) => {
    setCurrentForm(formName); 
  }

  return (
    <Router>
    {authenticated && <Navbar />}
    <Routes>
        <Route exact path='/'  element = {currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm} />} />
        <Route path='/Simulator' element={<Simulator/>} />
        {/* <Route path='/Buystock' element={<BuyStock/>} /> */}
        <Route path='/News' element={<News/>} />
        <Route path='/Account' element={<Account/>} />
    </Routes>
    </Router>
  ); 
}

export default App;


