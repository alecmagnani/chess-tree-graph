import React, { useState } from "react";

export function Form(props) {
  const [formInput, setFormInput] = useState("");

  const handleInputChange = (event) => {
    setFormInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={formInput}
          onChange={handleInputChange}
          style={{ width: "90%" }}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
