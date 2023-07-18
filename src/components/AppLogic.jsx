import { useState } from "react";
import { SideBar } from "./sidebar/SideBar";
import { ChessTree } from "./chess-tree/ChessTree";
import "../styles/AppLogic.css";

export const AppLogic = () => {
  const [pgnFormData, setPgnFormData] = useState("");

  const handlePgnFormSubmit = (data) => {
    setPgnFormData(data);
  };

  return (
    <div className="app-logic-container">
      <SideBar onSubmit={handlePgnFormSubmit} />
      <ChessTree pgnFormData={pgnFormData} />
    </div>
  );
};
