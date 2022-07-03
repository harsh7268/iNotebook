import React, {useContext} from 'react'
import NoteContext from '../context/NoteContext'

export default function NoteItem(props) {
  const {title,description,tag,update,id} = props;
  const context = useContext(NoteContext);
  const {deleteNotes} = context;
  return (
    <>


    <div className="mx-1 my-2">

  <div className="card my-3 mx-2 my-2 d-flex" style={{width: '18rem'}}>
  <div className="card-body">
    <div className='row align-items-center'>
    <h5 className="card-title">{title}</h5>
    <div className='mx-5'>
    <i onClick={()=> deleteNotes(id)} className="fa-solid fa-trash-can mx-3 "></i>
    <i onClick={() => { return update(id,title,description,tag)}} className="fa-solid fa-pen-to-square"></i>
    </div>
    </div>
    <p className="card-text">{description}</p>
    <p className="card-text">{tag}</p>
   
  </div>
 
</div>
    </div>
</>
  )
}
