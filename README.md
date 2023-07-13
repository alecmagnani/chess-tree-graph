# chess-tree-graph
React project experimenting with visualizing chess opening studies

# Installation
```
git clone https://github.com/alecmagnani/chess-tree-graph
cd chess-tree-graph
npm i
npm run dev
```

Open [localhost:5173](http://localhost:5173/)

## Libraries Used
* [mliebelt/pgn-parser](https://github.com/mliebelt/pgn-parser)
* [Clariity/react-chessboard](https://github.com/Clariity/react-chessboard)
* [bkrem/react-d3-tree](https://github.com/bkrem/react-d3-tree)

## Goal Features
1. Search move in study
2. Find/highlight line in study / compare game pgn to study pgn
3. Select node for comments, interactivity(?), etc
4. Make collapsible, write recursive expand
5. Find good defaults for depth etc given complex pgn
6. Styling etc

### Sample PGN for testing
```
[Event "short study: Chapter 1"]
[Site "https://lichess.org/study/LKbBDz6U/Ujk6f1FF"]
[Result "*"]
[UTCDate "2023.07.04"]
[UTCTime "01:46:43"]
[Variant "Standard"]
[ECO "B12"]
[Opening "Caro-Kann Defense: Advance Variation"]
[Annotator "https://lichess.org/@/alecmag"]

1. e4 c6 2. d4 d5 3. e5 (3. exd5 cxd5 4. Bb5+ Nc6 5. Bxc6+ (5. Nf3) 5... bxc6) 3... Bf5 (3... c5 4. dxc5 e6 5. Be3 Qc7) 4. Bd3 *
```