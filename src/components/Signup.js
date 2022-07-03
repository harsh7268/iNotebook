import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"


export default function Signup() {
  const history = useNavigate();
  const [user,setUser] = useState({name:"",email:"",password:""});

    const handleSubmit = async (e) =>{
     e.preventDefault();
     const {name,email,password} = user
     const response = await fetch(`http://localhost:5000/api/auth/createUser`,{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({name,email,password})
});
  const json = await response.json();
  localStorage.setItem('token',json.authToken);
  console.log(json);
   history('/');

}


    const onChange = (e) =>{

    
        setUser({...user,[e.target.name]:e.target.value});
        
    }
  return (
    <div className="container my-5" style={{width:'30rem'}} >
   <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Title</label>
    <input onChange={onChange} type="text" className="form-control" id="name" name="name" value={user.name}  aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="email">Description</label>
    <input onChange={onChange} type="email" className="form-control" id="email" name="email" value={user.email}/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Tag</label>
    <input onChange={onChange} type="password" className="form-control" id="password" name="password" value={user.password} />
  </div>

  <button  type="submit" className="btn btn-primary">Add user</button>
</form>
     </div>
  )
}
