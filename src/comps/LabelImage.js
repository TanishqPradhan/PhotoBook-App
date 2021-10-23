import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const LabelImage = ({ labelImg, setlabelImg }) => {
  const [newLabel, setnewLabel] = useState(labelImg.label);
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setlabelImg(null);
    }
  };

  const handleClick2 = (e) => {
    setlabelImg(null);
  };
  const editLabel = async (id, e) => {
    e.preventDefault();
    const userDoc = doc(projectFirestore, "Picture", id);

    await updateDoc(userDoc, {
      label: newLabel,
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
        onSubmit={(e) => editLabel(labelImg.id, e)}
        className="form"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <label for="floatingInput">Category of Image </label>
        <input
          type="text"
          autoComplete="off"
          className="form-control"
          id="floatingInput"
          name="label"
          placeholder="Category"
          value={newLabel}
          onChange={(e) => setnewLabel(e.target.value)}
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

export default LabelImage;
