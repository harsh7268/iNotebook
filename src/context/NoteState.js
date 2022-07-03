import React, { useState } from 'react'
import NoteContext from './NoteContext'


const NoteState = (props) =>{

  const initialNotes =[];
const [notes,setNotes] = useState(initialNotes);
const [userName,setUserName] = useState('');

// get Notes

const getNotes = async () =>{
    const response = await fetch(`http://localhost:5000/api/notes/getNote`,{
        method:'GET',
        headers:{
          'Content-Type':"application/json",
          'auth-token' : localStorage.getItem('token')
        }
        
});
    const json = await response.json();
    setNotes(json);
}

// Add Notes

const addNotes = async (title,description,tag) =>{
    const response = await fetch(`http://localhost:5000/api/notes/createNote`,{
        method:'POST',
        headers:{
          'Content-Type':"application/json",
          'auth-token' : localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
});
    const json = await response.json();
    setNotes(notes.concat(json));
        

}

// update note

const updateNotes =async (id,title,description,tag) =>{
    const response = await fetch(`http://localhost:5000/api/notes/updateNote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':"application/json",
          'auth-token' : localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
});
    const json = await response.json();
   
    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic  to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
       
      }
      setNotes(newNotes);
}

// deleteNotes
const deleteNotes =async (id) =>{
    const response = await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':"application/json",
          'auth-token' : localStorage.getItem('token')
        }
});
    const json = await response.json();
   
    // logic  to edit in client
      const newNotes = notes.filter((e) => {return e._id!==id});
      setNotes(newNotes);
}


  const userData = async () =>{
    const response = await fetch(`http://localhost:5000/api/auth/getUser`,{
      method:'GET',
      headers:{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem('token')
      }
});
  const json = await response.json();
  setUserName(json.name);
  }

    return (
        <NoteContext.Provider value={{notes,getNotes,addNotes,updateNotes,deleteNotes,userData,userName,setUserName}}>
            {props.children}
        </NoteContext.Provider>    
    )
}


export default NoteState
