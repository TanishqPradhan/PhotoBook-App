import React from "react";
import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import Modal from "../comps/Modal";

const ImageGrid = () => {
  const [selectedImg, setSelectedImg] = useState(null);

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
                Phtographer's Name: <strong>{doc.photographerName}</strong>
              </h5>
              <h6 className="card-text">
                Category: <b>{doc.label}</b>
              </h6>
              <br />
              <br />
              <br />
              <h6 className="card-text">
                Location: <b>{doc.location}</b>
              </h6>

              <h6 className="card-text">
                Date <b>{doc.imageDate}</b>
              </h6>
            </div>
          </div>
        ))}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default ImageGrid;
