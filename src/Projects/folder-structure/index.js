import React, { useState } from "react";
import folders from "./data";

function FolderStructure() {
  return (
    <div>
      {folders.map((folder, index) => (
        <Folder key={index} item={folder} />
      ))}
    </div>
  );
}

const Folder = ({ item }) => {
  const { title, children } = item;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      style={{
        marginLeft: "20px",
      }}>
      <h3>{title}</h3>
      {isOpen && children.map((child, index) => <Folder key={index} item={child} />)}
    </div>
  );
};

export default FolderStructure;
