import React, { useContext, useEffect,useRef ,useState} from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem'
import { useNavigate } from "react-router-dom";



export default function Notes() {
  const navigate = useNavigate();
  const refOpen = useRef(null);
  const refClose = useRef(null);
  const context = useContext(NoteContext);
  const {notes,getNotes,updateNotes,userData} = context;
  useEffect(() =>{
    if(localStorage.getItem('token')){
     getNotes();
     userData();
    }
    else{
      navigate('/login');
    }
  },[]);

  const [note,setNote] = useState({id:"",title:"",description:"",tag:""});
const update = (id,title,description,tag) =>{
  refOpen.current.click();
  setNote({id:id,title:title,description:description,tag:tag});
 
}

const handleClick = (e) =>{
  e.preventDefault();
  refClose.current.click();
updateNotes(note.id,note.title,note.description,note.tag);
}
const onChange = (e) =>{
  setNote({...note,[e.target.name]:e.target.value});
  
}

  return (
    <div>


<button  ref={refOpen} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input onChange={onChange} value={note.title}  type="text" className="form-control" id="title" name="title"   aria-describedby="emailHelp" />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input onChange={onChange} value={note.description} type="text" className="form-control" id="description" name="description" />
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input onChange={onChange} value={note.tag}  type="text" className="form-control" id="tag" name="tag"  />
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose}  type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  onClick={handleClick}  type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

    <div className='row'>
     {
   notes.map((c) => {
  return <NoteItem key={c._id} title={c.title} description={c.description} tag={c.tag} update={update} id={c._id}/>
})  
  }
    </div>
    </div>
  )
}
