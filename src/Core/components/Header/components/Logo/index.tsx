import plusnew, { component } from 'plusnew';
import Puzzle, { puzzleSide } from 'shared/Puzzle';
import { fill } from 'util/array';

const COLUMNS = 8;
const ROWS = 5;
const SIZE = 50;

function isFirst(index: number) {
  return index === 0;
}

function isLast(amount: number, index: number) {
  return index + 1 === amount;
}

function isOdd(index: number) {
  return index % 2 !== 0;
}

export default component(
  __dirname,
  () => {

    return (
      <svg width={COLUMNS * SIZE + 2} height={ROWS * SIZE + 2}>
        {fill(ROWS, (rowIndex) =>
          fill(COLUMNS, columnIndex =>
            <Puzzle
              x={columnIndex * SIZE + 1}
              y={rowIndex * SIZE + 1}
              size={SIZE}

              top={
                isFirst(rowIndex) ?
                  puzzleSide.flat
                :
                  isOdd(rowIndex) ?
                    puzzleSide.hole
                  :
                    puzzleSide.bulged
              }
              right={
                isLast(COLUMNS, columnIndex) ?
                  puzzleSide.flat
                :
                  isOdd(columnIndex) ?
                    puzzleSide.bulged
                  :
                    puzzleSide.hole
              }
              bottom={
                isLast(ROWS, rowIndex) ?
                  puzzleSide.flat
                :
                  isOdd(rowIndex) ?
                    puzzleSide.hole
                  :
                    puzzleSide.bulged
              }
              left={
                isFirst(columnIndex) ?
                  puzzleSide.flat
                :
                  isOdd(columnIndex) ?
                    puzzleSide.bulged
                  :
                    puzzleSide.hole
              }
            />
          )
        )}
      </svg>
    );
  },
);
