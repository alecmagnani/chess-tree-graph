import { Chessboard } from "react-chessboard";
import "../styles/ChessPosition.css";

export const ChessPosition = ({ nodeDatum, customNodeChessboardProps }) => {
  const handleNodeClick = (nodeDatum) => {
    console.log(`Clicked ${nodeDatum.name}`);
  };

  return (
    <>
      <foreignObject {...customNodeChessboardProps}>
        <div
          className={"chess-pos-container"}
          onClick={() => handleNodeClick(nodeDatum)}
        >
          <Chessboard
            id="BasicBoard"
            boardWidth={132}
            position={nodeDatum.attributes?.fen || "start"}
            arePiecesDraggable={false}
          />
        </div>

        {/* TODO add move number etc */}
        <div className="chess-pos-label">{nodeDatum.name}</div>

        {/* TODO position comments, collapsible */}
        {/* <div className="chess-pos-comments"></div> */}
      </foreignObject>
    </>
  );
};
