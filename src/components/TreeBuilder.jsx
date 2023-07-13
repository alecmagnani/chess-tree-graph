
import { Chess } from "chess.js";
import { v4 as uuidv4 } from "uuid";
import {
  START_NODE_NAME,
  MOVE_COLOR_DEFAULT,
  MOVE_COLOR_SELECTED,
  MOVE_COLOR_SEARCHMATCH,
  MOVE_COLOR_1_GREAT,
  MOVE_COLOR_2_MISTAKE,
  MOVE_COLOR_3_BRILLIANT,
  MOVE_COLOR_4_INTERESTING,
  MOVE_COLOR_5_DUBIOUS,
  MOVE_COLOR_6_BLUNDER,
  ANNOTATION_1_GREAT,
  ANNOTATION_2_MISTAKE,
  ANNOTATION_3_BRILLIANT,
  ANNOTAITON_4_INTERESTING,
  ANNOTAITON_5_DUBIOUS,
  ANNOTATION_6_BLUNDER
} from "../constants"

export function buildTree(moves) {
  const root = {
    name: START_NODE_NAME,
    children: [],
    attributes: {
      isSelected: false,
      isSearchMatch: false
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
      annotation: move.nag?.map(nag => getAnnotationFromNag(nag)).join(' '),
      isSelected: false,
      isSearchMatch: false,
      borderColor: getBorderColor(false, false, move.nag)
    },
  }
}

function getBorderColor(isSelected, isSearchMatch, nag) {
  if (isSelected) {
    return MOVE_COLOR_SELECTED;
  } else if (isSearchMatch) {
    return MOVE_COLOR_SEARCHMATCH;
  } else if (nag && nag[0]) {
    return getColorFromNag(nag[0]);
  } else {
    return MOVE_COLOR_DEFAULT;
  }
};

function getAnnotationFromNag(nag) {
  switch (nag) {
    case '$1': return ANNOTATION_1_GREAT;
    case '$2': return ANNOTATION_2_MISTAKE;
    case '$3': return ANNOTATION_3_BRILLIANT;
    case '$4': return ANNOTAITON_4_INTERESTING;
    case '$5': return ANNOTAITON_5_DUBIOUS;
    case '$6': return ANNOTATION_6_BLUNDER;
    default: '';
  }
}

function getColorFromNag(nag) {
  switch (nag) {
    case '$1': return MOVE_COLOR_1_GREAT;
    case '$2': return MOVE_COLOR_2_MISTAKE;
    case '$3': return MOVE_COLOR_3_BRILLIANT;
    case '$4': return MOVE_COLOR_4_INTERESTING;
    case '$5': return MOVE_COLOR_5_DUBIOUS;
    case '$6': return MOVE_COLOR_6_BLUNDER;
    default: return MOVE_COLOR_DEFAULT;
  }
}

export function findNodeById(node, id) {
  if (node.attributes?.id === id) {
    return node;
  }

  if (node.children) {
    for (let i=0; i < node.children.length; i++) {
      const childNode = findNodeById(node.children[i], id)
      if (childNode) {
        return childNode;
      }
    }
  }
}

export function searchTreeAndHighlightMoves(node, term) {
  node.attributes.isSearchMatch = node.name === term;

  if (node.children) {
    for (let i=0; i < node.children.length; i++) {
      searchTreeAndHighlightMoves(node.children[i], term)
    }
  }
}