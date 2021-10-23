import React from "react";
import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import Modal from "../comps/Modal";
import EditImage from "./EditImage";
import ReplaceImage from "./ReplaceImage";
import DeleteImage from "./DeleteImage";
import LabelImage from "./LabelImage";

const Manage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [editImage, seteditImage] = useState(null);
  const [replaceImg, setreplaceImg] = useState(null);
  const [deleteImg, setdeleteImg] = useState(null);
  const [labelImg, setlabelImg] = useState(null);
  const { docs } = useFirestore("Picture");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="card border-info mb-3" style={{ maxWidth: 288 }}>
            <motion.div
              className="img-wrap"
              key={doc.id}
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setSelectedImg(doc.imageURL)}
            >
              <motion.img
                src={doc.imageURL}
                alt="uploaded-pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
            <div className="card-body">
              <h5 className="card-title">
                Photographer's Name: <strong>{doc.photographerName}</strong>
              </h5>
              <h6 className="card-text">
                Category: <b>{doc.label}</b>
              </h6>
              <br />
              <h6 className="card-text">
                Location: <b>{doc.location}</b>
              </h6>
              <h6 className="card-text">
                Date: <b>{doc.imageDate}</b>
              </h6>
              <button className="card-button" onClick={() => seteditImage(doc)}>
                Edit
              </button>
              <button className="card-button" onClick={() => setdeleteImg(doc)}>
                Delete
              </button>
              <button
                className="card-button"
                onClick={() => setreplaceImg(doc)}
              >
                Replace
              </button>
              <button
                className="card-button-2"
                onClick={() => setlabelImg(doc)}
              >
                Change Category
              </button>
            </div>
          </div>
        ))}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {editImage && (
        <EditImage editImage={editImage} seteditImage={seteditImage} />
      )}
      {replaceImg && (
        <ReplaceImage replaceImg={replaceImg} setreplaceImg={setreplaceImg} />
      )}
      {deleteImg && (
        <DeleteImage deleteImg={deleteImg} setdeleteImg={setdeleteImg} />
      )}
      {labelImg && <LabelImage labelImg={labelImg} setlabelImg={setlabelImg} />}
    </div>
  );
};

export default Manage;
