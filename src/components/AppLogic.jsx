import { useState } from "react";
import { Form } from "./PGNForm";
import { MoveTree } from "./MoveTree";

export const AppLogic = () => {
  const [showMoveTree, setShowMoveTree] = useState(false);
  const [formValue, setFormValue] = useState("");

  const handleFormSubmit = (value) => {
    setFormValue(value);
    setShowMoveTree(true);
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
      {showMoveTree && <MoveTree formValue={formValue} />}
    </div>
  );
};
