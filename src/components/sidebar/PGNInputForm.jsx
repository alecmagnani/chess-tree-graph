import { useState } from "react";
import "../../styles/PGNInputForm.css";

export const PGNInputForm = ({ onSubmit }) => {
  const [formText, setFormText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formText);
    // setFormText("");
  };

  const handleChange = (e) => {
    setFormText(e.target.value);
  };

  return (
    <>
      <div className="pgn-input-form">
        <form onSubmit={handleSubmit}>
          <input type="text" value={formText} onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
