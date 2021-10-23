import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const EditImage = ({ editImage, seteditImage }) => {
  const [editname, seteditName] = useState(editImage.photographerName);

  const [editlocation, seteditLocation] = useState(editImage.location);

  const [editdate, seteditDate] = useState(editImage.imageDate);

  /*  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const [url, setUrl] = useState(null); */

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      seteditImage(null);
    }
  };
  const handleClick2 = (e) => {
    seteditImage(null);
  };

  const editData = async (id, e) => {
    e.preventDefault();
    const userDoc = doc(projectFirestore, "Picture", id);

    await updateDoc(userDoc, {
      photographerName: editname,
      location: editlocation,
      imageDate: editdate,
    });
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={(e) => editData(editImage.id, e)}
        className="form"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <label for="floatingInput">Photographer's Name</label>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="floatingInput"
          name="name"
          placeholder="Name"
          value={editname}
          onChange={(e) => seteditName(e.target.value)}
          required
        />

        <label for="floatingInput">Location of Image</label>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="floatingInput"
          name="location"
          value={editlocation}
          placeholder="Location"
          onChange={(e) => seteditLocation(e.target.value)}
          required
        />

        <label for="floatingInput">Date of Image </label>
        <input
          type="date"
          autoComplete="off"
          className="form-control"
          id="floatingInput"
          name="date"
          placeholder="Date"
          value={editdate}
          onChange={(e) => seteditDate(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Confirm
        </button>
        <button type="button" className="submit-button" onClick={handleClick2}>
          Done
        </button>
      </motion.form>
    </motion.div>
  );
};

export default EditImage;
