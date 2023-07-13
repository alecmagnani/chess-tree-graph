import { useState } from "react";
import { Tree } from "react-d3-tree";
import { parse } from "@mliebelt/pgn-parser";
import { ChessPosition } from "./ChessPosition";
import {
  buildTree,
  findNodeById,
  searchTreeAndHighlightMoves,
} from "./TreeBuilder";
import { SEARCH_BUTTON_TEXT, START_NODE_NAME } from "../constants";
import clone from "clone";
import "../styles/MoveTree.css";

const customNodeChessboardProps = { width: 140, height: 180, x: -70, y: -70 };

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  customNodeChessboardProps,
  handleNodeClick,
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

// TODO
// * Restructure custom node to be board + decorated border + label + comments
// * Make comments handle long strings, be collapsible
// * Tune sizing for readability
// * Set initial depth, write collapse/expand logic
// * Implement centering on click
// * Restructure main site elements, look into css templates etc?
// * Learn about SVGs to make pretty paths
// * Pull from lichess for eval, opening book
// * Combine long stretches w/out varirations e.g. * * * * * --> [*****]
// * Make submit button trigger re-render

export const MoveTree = ({ formValue }) => {
  const pgn = parse(formValue, { startRule: "games" });
  const moves = pgn[0] ? pgn[0].moves : [];
  const [data, setData] = useState(buildTree(moves));
  const [searchTerm, setSearchTerm] = useState("");

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
  };

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
              handleNodeClick,
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
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button type="submit">{SEARCH_BUTTON_TEXT}</button>
      </form>
    </>
  );
};
