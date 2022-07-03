import React, { useState,useContext } from 'react';
import NoteContext from '../context/NoteContext'


export default function AddNotes() {
  const context = useContext(NoteContext);
  const {addNotes} = context;

   const handleClick = (e) =>{
    e.preventDefault();
     addNotes(note.title,note.description,note.tag);
     setNote({...note,title:"",description:"",tag:""});
   }

  const [note,setNote] =  useState({title:"",description:"",tag:""});
const onChange = (e) =>{
    setNote({...note,[e.target.name]:e.target.value});
}
  return (
    <div className='my-3'>
    <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input onChange={onChange} type="text" className="form-control" id="title" name="title" value={note.title}  aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input onChange={onChange} type="text" className="form-control" id="description" name="description" value={note.description}/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input onChange={onChange} type="text" className="form-control" id="tag" name="tag" value={note.tag} />
  </div>

  <button onClick={handleClick} type="submit" className="btn btn-primary">Add Note</button>
</form>
    </div>
  )
}
