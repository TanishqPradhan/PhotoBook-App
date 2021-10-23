import React from "react";
import { motion } from "framer-motion";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { projectFirestore } from "../firebase/config";

const DeleteImage = ({ deleteImg, setdeleteImg }) => {
  const storage = getStorage();
  const desertRef = ref(storage, `images/${deleteImg.id}`);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setdeleteImg(null);
    }
  };

  const handleClick2 = (e) => {
    setdeleteImg(null);
  };
  const deleteImages = async (id, e) => {
    e.preventDefault();
    const userDoc = doc(projectFirestore, "Picture", id);
    await deleteDoc(userDoc);
    deleteObject(desertRef)
      .then(() => {
        console.log("File Deleted");
        setdeleteImg(null);
      })
      .catch((error) => {
        console.log(error);
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
        className="form"
        onSubmit={(e) => deleteImages(deleteImg.id, e)}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <h1>Are you sure you want to delete this image?</h1>
        <button type="submit" className="submit-button">
          Yes
        </button>
        <button type="button" className="submit-button" onClick={handleClick2}>
          No
        </button>
      </motion.form>
    </motion.div>
  );
};

export default DeleteImage;
