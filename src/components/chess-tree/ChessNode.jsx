import { Chessboard } from "react-chessboard";

export const ChessNode = ({ nodeDatum, foreignObjectProps }) => {
  const displayName = `${nodeDatum.name}${
    nodeDatum.attributes?.annotation || ""
  }`;
  const comments = nodeDatum.attributes?.comments;
  const position = nodeDatum.attributes?.fen || "start";

  return (
    <>
      <foreignObject {...foreignObjectProps}>
        <div
          className="chess-node-board"
          style={{
            border: `8px solid ${nodeDatum.attributes?.borderColor}`,
            borderTopLeftRadius: "9px",
            borderTopRightRadius: "9px",
          }}
        >
          <Chessboard id="BasicBoard" position={position} />
        </div>

        <div
          className="chess-node-position-info"
          style={{
            backgroundColor: nodeDatum.attributes?.borderColor,
            borderBottomLeftRadius: "9px",
            borderBottomRightRadius: "9px",
            paddingLeft: "6px",
            paddingRight: "6px",
          }}
        >
          <p
            className="chess-node-label"
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "1.2em",
              color: "#F8F8F2",
            }}
          >
            {displayName}
          </p>

          {comments && (
            <p
              className="chess-node-comments"
              style={{
                color: "#F8F8F2",
              }}
            >
              {comments}
            </p>
          )}
        </div>
      </foreignObject>
    </>
  );
};
