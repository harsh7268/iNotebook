import React, { useContext, useEffect,useRef ,useState} from 'react'
import NoteContext from '../context/NoteContext'
import { Link,useLocation,useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const location = useLocation();
  const navigate =  useNavigate();
  const context = useContext(NoteContext);
  const {userName,setUserName} = context;
  const logOut = () =>{
    localStorage.clear();
    setUserName('');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">iNotebook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <Link className={`nav-link ${location.pathname==='/'?'active':''} `} to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
      </li>
      {!localStorage.getItem('token') ?
      <div className="form-inline my-2 my-lg-0">
      <li className="nav-item">
        <Link  className={`nav-link ${location.pathname==='/login'?'active':''}  `} to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==='/signup'?'active':''} `}to="/signup">Signup</Link>
      </li></div>:
      <li className="nav-item">
        <button onClick={logOut} className="btn btn-primary">Logout</button>
      </li>
}
</ul>
      <div className="nav-item">
        <Link className={`nav-link ${location.pathname==='/#'?'active':''}`} to="/#">{userName}</Link>
      </div>
      
  
   
  </div>
</nav>
    </div>
  )
}
