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

  const moveString = moves[index].notation?.notation || 'error';
  
  const game = new Chess(parent.attributes.fen);
  try {
    game.move(moveString);
  } catch (error) {
    console.error(error);
    console.log(`${parent.name} --> ${moveString}`)
    console.log(game.ascii())
  }

  const node = {
    name: moveString,
    children: [],
    attributes: {
      fen: game.fen()
    }
  }

  parseMove(moves, index+1, node);
  parent.children.push(node);

  // TODO build full tree for each variation
  moves[index].variations.forEach((variation, i) => {
    const variationTree = parseMove(variation, 0, node)

    parent.children.push({
      name: variation[0]?.notation?.notation || 'nnf',
      children: [],
      attributes: {}
    })
  });
}
