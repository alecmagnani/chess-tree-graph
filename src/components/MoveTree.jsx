import { Tree } from 'react-d3-tree';
import { Chess } from 'chess.js';
import { parse } from '@mliebelt/pgn-parser';
import { ChessPosition } from "./ChessPosition";
import '../styles/MoveTree.css';

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  customNodeChessboardProps,
  customNodeLabelProps
}) => {
  return (
    <g className="customChessboardNode">
      <circle r={15}></circle>
      <ChessPosition 
        nodeDatum={nodeDatum}
        customNodeChessboardProps={customNodeChessboardProps}
        customNodeLabelProps={customNodeLabelProps}
      />
    </g>
)};

export const MoveTree = ({ formValue }) => {
  const pgn = parse(formValue, {startRule: 'games'});

  const moves = pgn[0] ? pgn[0].moves : [];
  const treeData = buildTree(moves);

  const customNodeChessboardProps = { width: 140, height: 140, x: -70, y: -70 };
  const customNodeLabelProps = { width: 140, height: 20, x: -70, y: 70 };

  return (
    <>
      <div className="move-tree-container" >
        <Tree 
          data={treeData}
          dimensions={{ height: 600, width: 600 }}
          depthFactor={220}
          separation={{ nonSiblings: 2, siblings: 1.25}}
          rootNodeClassName='node__root'
          branchNodeClassName='node__branch'
          leafNodeClassName='node__leaf'
          renderCustomNodeElement={(rd3tProps) => 
            renderForeignObjectNode({...rd3tProps, customNodeChessboardProps, customNodeLabelProps})
          }
        />
      </div>
    </>
  );
};

function buildTree(moves) {
  const root = {
    name: 'Start',
    children: [],
    attributes: {}
  };

  if (moves[0]) {
    parseMove(moves, 0, root);
  }

  return root;
}

function parseMove(moves, index, parent) {
  if (!moves || !moves[index]) {
    return {}
  }

  const currMove = moves[index];
  const currMoveNode = getNode(currMove, parent);

  parseMove(moves, index+1, currMoveNode);
  parent.children.push(currMoveNode);

  // TODO build full tree for each variation
  // FOR EACH VARIATION:
  // 1. Make altNode for the firsts move of the line, 'altMove'
  // 2. Build tree for variation using altNode as parent
  // 3. Add altNode to parent's children

  currMove.variations.forEach((variation) => {
    const altMove = variation[0];
    const altNode = getNode(altMove, parent);
    parseMove(variation, 1, altNode);
    parent.children.push(altNode);
  });
};

function getNode(move, parent) {
  const moveString = move.notation.notation
  const game = new Chess(parent.attributes.fen);
  try {
    game.move(moveString);
  } catch (error) {
    console.error(error);
  }

  return {
    name: moveString,
    children: [],
    attributes: {
      fen: game.fen()
    }
  }

}
