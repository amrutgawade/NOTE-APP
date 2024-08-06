import axios from "axios";
import { toast } from "react-hot-toast";
import React from "react";

function Notes({ data, user }) {
  const userId = user._id

  const deleteNote = (noteId) => {
    axios.delete(`/${userId}/${noteId}/notes`).then(res => {
      if(res.status === 200)
        toast.error("Note deleted successfully!")
    })
  }

  return (
    <div className="col-8">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Note Title</th>
            <th scope="col">Note Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td><button className="btn btn-outline-danger" onClick={()=> deleteNote(item._id)}>Delete</button></td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default Notes;
