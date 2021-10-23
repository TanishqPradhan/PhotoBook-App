import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const ReplaceImage = ({ replaceImg, setreplaceImg }) => {
  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const [url, setUrl] = useState(null);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setreplaceImg(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${replaceImg.id}`);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      customMetadata: {
        photographerName: replaceImg.photographerName,
        location: replaceImg.location,
        imageDate: replaceImg.imageDate,
      },
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
        console.log(error);
      },
      () => {
        console.log("Success");
        setUrl(url);
        setreplaceImg(null);
      }
    );
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
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <div className="output">
          {error && <div className="error">{error}</div>}

          {file && (
            <ProgressBar
              file={file}
              setFile={setFile}
              url={url}
              setUrl={setUrl}
              progress={progress}
            />
          )}
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ReplaceImage;
