import { Chessboard } from "react-chessboard";

export const ChessPosition = ({nodeDatum, customNodeChessboardProps, customNodeLabelProps}) => {
   return (
    <>
      <foreignObject {...customNodeChessboardProps}>
        <div className='chessboardContainer'>
          { nodeDatum.name !== 'Start' && <Chessboard id="BasicBoard" 
                                                      boardWidth={140} 
                                                      position={ nodeDatum.attributes.fen || 'Start'}
                                                      />}
        </div>
      </foreignObject>

      <foreignObject {...customNodeLabelProps} >
        <div className='nodeLabelContainer'>
          <code>{ nodeDatum.name }</code>
        </div>
      </foreignObject>
    </>
   ) 
}