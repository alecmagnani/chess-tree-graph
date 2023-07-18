import "../../styles/ChessTree.css";
import { useEffect, useState } from "react";
import { Tree } from "react-d3-tree";
import { Chess } from "chess.js";
import { parse } from "@mliebelt/pgn-parser";
import { v4 as uuidv4 } from "uuid";
import { getAnnotationFromNag, getColorFromNag } from "../../helpers";
import { ChessNode } from "./ChessNode";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => {
  return (
    <g>
      <circle r={15} />
      <ChessNode
        nodeDatum={nodeDatum}
        foreignObjectProps={foreignObjectProps}
      />
    </g>
  );
};

export const ChessTree = ({ pgnFormData }) => {
  const [data, setData] = useState({});
  const nodeSize = { x: 200, y: 250 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: nodeSize.x * -0.5,
    y: nodeSize.y * -0.5,
  };

  useEffect(() => {
    const pgn = parse(pgnFormData, { startRule: "games" });
    const moves = pgn[0] ? pgn[0].moves : [];
    setData(buildTree(moves));
  }, [pgnFormData]);

  return (
    <>
      <div className="chess-tree-container">
        <Tree
          data={data}
          nodeSize={nodeSize}
          depthFactor={350}
          separation={{ nonSiblings: 2, siblings: 2 }}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          pathClassFunc={() => "chess-tree-path"}
          orientation="horizontal"
        />
      </div>
    </>
  );
};

function buildTree(moves) {
  const root = {
    name: "Start",
    children: [],
    attributes: {
      isSelected: false,
      isSearchMatch: false,
      borderColor: getColorFromNag(""),
    },
  };

  if (moves[0]) {
    parseMove(moves, 0, root);
  }

  return root;
}

function parseMove(moves, index, parent) {
  if (!moves || !moves[index]) {
    return {};
  }

  const currMove = moves[index];
  const currMoveNode = getNode(currMove, parent);

  parseMove(moves, index + 1, currMoveNode);
  parent.children.push(currMoveNode);

  currMove.variations.forEach((variation) => {
    const altMove = variation[0];
    const altNode = getNode(altMove, parent);
    parseMove(variation, 1, altNode);
    parent.children.push(altNode);
  });
}

function getNode(move, parent) {
  const moveString = move.notation.notation;
  const game = new Chess(parent.attributes.fen);
  const moveNag = move.nag ? move.nag[0] : "";

  try {
    game.move(moveString);
  } catch (error) {
    console.error(error);
  }

  return {
    name: moveString,
    children: [],
    attributes: {
      id: uuidv4(),
      fen: game.fen(),
      comments: move.commentAfter,
      nag: moveNag,
      annotation: getAnnotationFromNag(moveNag),
      isSelected: false,
      isSearchMatch: false,
      borderColor: getColorFromNag(moveNag),
    },
  };
}
