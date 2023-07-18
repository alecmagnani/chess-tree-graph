import {
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
  ANNOTATION_6_BLUNDER,
} from "./constants";

export const getAnnotationFromNag = (nag) => {
  switch (nag) {
    case "$1":
      return ANNOTATION_1_GREAT;
    case "$2":
      return ANNOTATION_2_MISTAKE;
    case "$3":
      return ANNOTATION_3_BRILLIANT;
    case "$4":
      return ANNOTAITON_4_INTERESTING;
    case "$5":
      return ANNOTAITON_5_DUBIOUS;
    case "$6":
      return ANNOTATION_6_BLUNDER;
    default:
      "";
  }
};

export const getColorFromNag = (nag) => {
  switch (nag) {
    case "$1":
      return MOVE_COLOR_1_GREAT;
    case "$2":
      return MOVE_COLOR_2_MISTAKE;
    case "$3":
      return MOVE_COLOR_3_BRILLIANT;
    case "$4":
      return MOVE_COLOR_4_INTERESTING;
    case "$5":
      return MOVE_COLOR_5_DUBIOUS;
    case "$6":
      return MOVE_COLOR_6_BLUNDER;
    default:
      return MOVE_COLOR_DEFAULT;
  }
};

export const getBorderColor = (attributes) => {
  if (attributes.isSelected) {
    return MOVE_COLOR_SELECTED;
  } else if (attributes.isSearchMatch) {
    return MOVE_COLOR_SEARCHMATCH;
  } else {
    return getColorFromNag(attributes.nag);
  }
};
