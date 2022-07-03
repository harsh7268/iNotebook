import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"


export default function Login(props) {
  const history = useNavigate();
  const [user,setUser] = useState({email:"",password:""});

    const handleSubmit = async (e) =>{
     e.preventDefault();
     const {email,password} = user
     const response = await fetch(`http://localhost:5000/api/auth/loginUser`,{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({email,password})
});
  const json = await response.json();
  
   if(json.success){
    //redirect
    localStorage.setItem('token',json.authToken);
   history("/");
  
  }
  else{
    alert(json.errors);
  }

}


    const onChange = (e) =>{

    
        setUser({...user,[e.target.name]:e.target.value});
        
    }

  return (
   <div className="container my-5" style={{width:'30rem'}} >
  <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input onChange={onChange} type="email" className="form-control" id="email" name='email' value={user.email} aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input onChange={onChange} type="password" className="form-control" id="password" name='password' value={user.password}/>
  </div>
 
  <button  type="submit" className="btn btn-primary">Login</button>
</form>
   </div>
  )
}
