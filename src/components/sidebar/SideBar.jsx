import { PGNInputForm } from "./PGNInputForm";
import { PositionSearchForm } from "./PositionSearchForm";
import "../../styles/SideBar.css";

export const SideBar = ({ onSubmit }) => {
  return (
    <>
      <div className="app-sidebar">
        <PGNInputForm onSubmit={onSubmit} />
        <PositionSearchForm />
      </div>
    </>
  );
};
