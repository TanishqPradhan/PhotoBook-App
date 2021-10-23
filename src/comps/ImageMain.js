import React from "react";
import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import Modal from "../comps/Modal";

const ImageMain = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { docs } = useFirestore("Picture");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
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
        ))}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default ImageMain;
