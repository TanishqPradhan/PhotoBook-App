import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const UploadImageForm = () => {
  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [date, setDate] = useState("");

  const [file, setFile] = useState(null);

  const [progress, setProgress] = useState(0);

  const [error, setError] = useState(null);

  const [url, setUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      customMetadata: {
        photographerName: name,
        location: location,
        imageDate: date,
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
      }
    );
  };
  return (
    <form className="form">
      <label for="floatingInput">Photographer's Name</label>
      <input
        type="text"
        autoComplete="off"
        className="form-control"
        id="floatingInput"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <br />
      <label for="floatingInput">Location of Image</label>
      <input
        type="text"
        autoComplete="off"
        className="form-control"
        id="floatingInput"
        name="location"
        value={location}
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <br />
      <br />
      <label for="floatingInput">Date of Image </label>
      <input
        type="date"
        autoComplete="off"
        className="form-control"
        id="floatingInput"
        name="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br />
      <br />
      <br />
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
    </form>
  );
};

export default UploadImageForm;
