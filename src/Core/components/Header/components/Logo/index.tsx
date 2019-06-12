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
      <svg width={COLUMNS * SIZE} height={ROWS * SIZE}>
        <Puzzle
          x={50}
          y={50}
          size={SIZE}
          top={puzzleSide.hole}
          right={puzzleSide.flat}
          bottom={puzzleSide.bulged}
          left={puzzleSide.flat}
        />
      </svg>
    );


    return (
      <svg width={COLUMNS * SIZE} height={ROWS * SIZE}>
        {fill(ROWS, (rowIndex) =>
          fill(COLUMNS, columnIndex =>
            <Puzzle
              x={columnIndex * SIZE}
              y={rowIndex * SIZE}
              size={SIZE}

              top={
                isFirst(rowIndex) ?
                  puzzleSide.flat
                :
                  isOdd(rowIndex) ?
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
              right={
                isFirst(columnIndex) ?
                  puzzleSide.flat
                :
                  isOdd(columnIndex) ?
                    puzzleSide.bulged
                  :
                    puzzleSide.hole
              }
              left={
                isLast(COLUMNS, columnIndex) ?
                  puzzleSide.flat
                :
                  isOdd(columnIndex) ?
                    puzzleSide.hole
                  :
                    puzzleSide.bulged
              }
            />
          )
        )}
      </svg>
    );
  },
);
