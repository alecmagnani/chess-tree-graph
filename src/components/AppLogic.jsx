import { useState } from "react";
import { Form } from "./PGNForm";
import { MoveTree } from "./MoveTree";

export const AppLogic = () => {
  const [formValue, setFormValue] = useState("");

  const handleFormSubmit = (value) => {
    setFormValue(value);
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
      <MoveTree formValue={formValue} />
    </div>
  );
};
