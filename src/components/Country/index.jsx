import React from "react";
import "./index.css";

function Country({ id, title, image, code, click, active }) {
  return (
    <div
      className={`country-card ${active ? 'active' : ''}`}
      onClick={() => click(id)}
      data-id={id}
    >
      <img src={image} alt={title} />
      <div className="country-details">
        <h2>{title}</h2>
        <p>{code}</p>
      </div>
    </div>
  );
}


export default Country;
