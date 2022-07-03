
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/NoteState';
import {useState} from 'react';

function App() {

  

  return (
    <NoteState >
    <BrowserRouter>
    <Navbar  />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/login"  element={<Login />}/>
    <Route path="/signup"  element={<Signup />}/>
   </Routes>
  </BrowserRouter>
  </NoteState>
  );
}

export default App;
