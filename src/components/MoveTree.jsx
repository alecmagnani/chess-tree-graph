import { useState } from "react";
import { Tree } from "react-d3-tree";
import { ChessPosition } from "./ChessPosition";
import { buildTree, findNodeById, searchTreeAndHighlightMoves } from "./TreeBuilder";
import { parse } from "@mliebelt/pgn-parser";
import clone from "clone";
import "../styles/MoveTree.css";
import { SEARCH_BUTTON_TEXT, START_NODE_NAME } from "../constants";

const customNodeChessboardProps = { width: 140, height: 180, x: -70, y: -70 };

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  customNodeChessboardProps,
  handleNodeClick
}) => {
  return (
    <g>
      <circle r={15} />
      {nodeDatum.name !== START_NODE_NAME && (
        <ChessPosition
          nodeDatum={nodeDatum}
          customNodeChessboardProps={customNodeChessboardProps}
          handleNodeClick={handleNodeClick}
        />
      )}
    </g>
  );
};

export const MoveTree = ({ formValue }) => {
  const pgn = parse(formValue, { startRule: "games" });
  const moves = pgn[0] ? pgn[0].moves : [];
  const [data, setData] = useState(buildTree(moves));
  const [searchTerm, setSearchTerm] = useState('');

  const handleNodeClick = (nodeDatum) => {
    const copyData = clone(data);
    const updateNode = findNodeById(copyData, nodeDatum.attributes.id);
    updateNode.attributes.isSelected = !updateNode.attributes.isSelected;
    setData(copyData);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const copyData = clone(data);
    searchTreeAndHighlightMoves(copyData, searchTerm);
    setData(copyData);
  }

  return (
    <>
      <div className="move-tree-container">
        <Tree
          data={data}
          dimensions={{ height: 600, width: 600 }}
          depthFactor={220}
          separation={{ nonSiblings: 2, siblings: 1.25 }}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({
              ...rd3tProps,
              customNodeChessboardProps,
              handleNodeClick
            })
          }
          onNodeClick={handleNodeClick}
          pathClassFunc={() => "custom-link"}
        />
      </div>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => { setSearchTerm(event.target.value) }}
        />
        <button type="submit">{ SEARCH_BUTTON_TEXT }</button>
      </form>
    </>
  );
};