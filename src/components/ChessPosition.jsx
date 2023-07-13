import { Chessboard } from "react-chessboard";
import { MOVE_COLOR_DEFAULT } from "../constants";
import "../styles/ChessPosition.css";

export const ChessPosition = ({
  nodeDatum,
  customNodeChessboardProps,
  handleNodeClick,
}) => {
  return (
    <>
      <foreignObject {...customNodeChessboardProps}>
        <div
          className={"chess-pos-container"}
          onClick={() => handleNodeClick(nodeDatum)}
          style={{
            border: nodeDatum.attributes.borderColor || MOVE_COLOR_DEFAULT,
          }}
        >
          <Chessboard
            id="BasicBoard"
            boardWidth={132}
            position={nodeDatum.attributes?.fen || "start"}
            arePiecesDraggable={false}
          />
        </div>

        {/* TODO add move number etc */}
        <div className="chess-pos-label">
          {nodeDatum.name}
          {nodeDatum.attributes.annotation}
        </div>

        {/* TODO position comments, collapsible */}
        <div className="chess-pos-comments">
          {nodeDatum.attributes.comments}
        </div>
      </foreignObject>
    </>
  );
};
