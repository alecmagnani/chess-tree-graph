import { Tree } from 'react-d3-tree';
import { parse } from '@mliebelt/pgn-parser';
import { Chessboard } from "react-chessboard";
import '../styles/MoveTree.css';

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  customNodeChessboardProps,
  customNodeLabelProps
}) => {
  console.log(nodeDatum)
  return (
  <g className="customChessboardNode">
    <circle r={15}></circle>

    <foreignObject {...customNodeChessboardProps}>
      <div className='chessboardContainer'>
        <Chessboard id="BasicBoard" boardWidth={140} />
      </div>
    </foreignObject>

    <foreignObject {...customNodeLabelProps} >
      <div className='nodeLabelContainer'>
        <code>{ nodeDatum.name }</code>
      </div>
    </foreignObject>

  </g>
)};

export const MoveTree = ({ formValue }) => {
  const game = parse(formValue, {startRule: 'games'});
  const gameMoves = game[0] ? game[0].moves : [];
  const moveTreeData = buildTree(gameMoves);

  const customNodeChessboardProps = { width: 140, height: 140, x: -70, y: -70 };
  const customNodeLabelProps = { width: 140, height: 20, x: -70, y: 70 };

  return (
    <>
      <div className="move-tree-container" >
        <Tree 
          data={moveTreeData}
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
    children: []
  };

  parseMove(moves, 0, root)
  return root;
}

function parseMove(moves, index, parent) {
  if (!moves || !moves[index]) {
    return {}
  }

  const node = {
    name: moves[index].notation?.notation || 'name not found',
    children: []
  }

  parseMove(moves, index+1, node);
  parent.children.push(node);

  // TODO build full tree for each variation
  moves[index].variations.forEach((variation, i) => {
    const variationTree = parseMove(variation, 0, node)

    parent.children.push({
      name: variation[0]?.notation?.notation || 'nnf',
      children: []
    })
  });
}
