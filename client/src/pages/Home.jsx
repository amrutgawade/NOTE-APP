import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Notes from "../components/Notes";
import { toast } from "react-hot-toast";
import axios from "axios";

function Home() {
  const [notes, setNotes] = useState([]);
  const location = useLocation();
  const user = location.state;
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/home/${user._id}/notes`, note)
        .then((res) => {
          if (res.status === 200) {
            setNotes(res.data.notes)
            toast.success("Note Added Successfully..!");
            setNote({
              title: "",
              description: "",
            });
          } else {
            toast.error("Internal server Error..!");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error)
    }
  };

  const getAllNotes = () => {
    axios.get(`/${user._id}/notes`).then(res => {
      if (res.status === 200) {
        setNotes(res.data.notes)
      } 
    })
  }

  useEffect(() => {
    getAllNotes()
  }, [getAllNotes])
  

  return (
    <div className="container">
      <>
        <h3 className="text-center mt-3">
          Welcome {localStorage.getItem("name")}
          <span>
            <Link className="btn btn-outline-primary ms-3" to="/">
              Logout
            </Link>
          </span>
        </h3>

        <div className="row">
          <hr className="mb-5" />
          <div className="col-3">
            <form onSubmit={addNote}>
              <label htmlFor="noteTitle">Note Title:</label>
              <input
                className="form-control mb-3"
                id="noteTitle"
                type="text"
                placeholder="Enter Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <label htmlFor="note">Note:</label>
              <textarea
                className="form-control mb-3"
                name="note"
                id="note"
                cols="30"
                rows="5"
                placeholder="Enter Note"
                value={note.description}
                onChange={(e) =>
                  setNote({ ...note, description: e.target.value })
                }
              />
              <div className="d-grid">
                <button className="btn btn-outline-secondary" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <Notes data={notes} user={user} />
        </div>
      </>
    </div>
  );
}

export default Home;
