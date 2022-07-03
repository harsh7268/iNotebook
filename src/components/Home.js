import React from 'react'
import AddNotes from './AddNotes'
import Notes from './Notes'


export default function Home() {

  return (
    <div>

      <div className='container my-3'>
      <h3>Add Notes </h3>
      <AddNotes />
      </div>
     
     <div className="container my-4">
      <h3>Your Notes</h3>
     <Notes />
     </div>

    </div>
  )
}
