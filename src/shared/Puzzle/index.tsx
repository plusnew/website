import plusnew, { component, Props } from 'plusnew';

export enum puzzleSide {
  hole,
  bulged,
  flat
}

enum linePosition {
  top,
  right,
  bottom,
  left
}

type props = {
  x: number;
  y: number;
  size: number;
  top: puzzleSide,
  right: puzzleSide,
  bottom: puzzleSide,
  left: puzzleSide,
};


export default component(
  __dirname,
  (Props: Props<props>) =>
    <Props>{props => {
      const offset = props.size / 3;

      function getOrigin(position: linePosition) {
        switch (position) {
          case linePosition.top:
            return { x: props.x, y: props.y };
          case linePosition.right:
            return { x: props.x + props.size, y: props.y };
          case linePosition.bottom:
            return { x: props.x + props.size, y: props.y + props.size };
          case linePosition.left:
            return { x: props.x, y: props.y + props.size };
        }
      }

      function getDestination(position: linePosition) {
        switch (position) {
          case linePosition.top:
            return { x: props.x + props.size, y: props.y };
          case linePosition.right:
            return { x: props.x + props.size, y: props.y + props.size };
          case linePosition.bottom:
            return { x: props.x, y: props.y + props.size };
          case linePosition.left:
            return { x: props.x, y: props.y };
        }
      }

      function draw(position: linePosition, lineType: puzzleSide, ) {

        const origin = getOrigin(position);
        const destination = getDestination(position);
        const halfX = Math.abs((destination.x - origin.x) / 2) + props.x;
        const halfY = (destination.y - origin.y) / 2 + props.y;

        console.log(halfX)
        switch (lineType) {
          // Border of the puzzle
          case puzzleSide.flat: {
            const destination = getDestination(position);
            return `L ${destination.x} ${destination.y}`
          }

          // bulged puzzle piece
          case puzzleSide.bulged: {

            switch (position) {
              case linePosition.top:
                return [
                  // Go a 1/3 right to the middle
                  `L ${origin.x + offset} ${origin.y}`,
                  // cubic curve to top
                  `Q ${origin.x} ${origin.y - offset} ${halfX} ${origin.y - offset}`,
                  // same curve to the 2/3 of the middle
                  `T ${destination.x - offset} ${destination.y}`,
                  // Go to the right corner
                  `L ${destination.x} ${destination.y}`,
                ].join(' ');
              case linePosition.right:
                return ``;
              case linePosition.bottom:
                return [
                  // Go a 1/3 left to the middle
                  `L ${origin.x - offset} ${origin.y}`,
                  // cubic curve to top
                  `Q ${origin.x} ${origin.y + offset} ${halfX} ${origin.y + offset}`,
                  // same curve to the 2/3 of the middle
                  `T ${destination.x + offset} ${destination.y}`,
                  // Go to the left corner
                  `L ${destination.x} ${destination.y}`,
                ].join(' ');
              case linePosition.left:
                return ``;
              default: throw new Error('no such position known');
            }
          }

          // inverted bulge puzzle piece
          case puzzleSide.hole: {
            switch (position) {
              case linePosition.top:
                return [
                  // Go a 1/3 right to the middle
                  `L ${origin.x + offset} ${origin.y}`,
                  // cubic curve to top
                  `Q ${origin.x} ${origin.y + offset} ${halfX} ${origin.y + offset}`,
                  // same curve to the 2/3 of the middle
                  `T ${destination.x - offset} ${destination.y}`,
                  // Go to the right corner
                  `L ${destination.x} ${destination.y}`,
                ].join(' ');
              case linePosition.right:
                return ``;
              case linePosition.bottom:
                return [
                  // Go a 1/3 left to the middle
                  `L ${origin.x - offset} ${origin.y}`,
                  // cubic curve to top
                  `Q ${origin.x} ${origin.y - offset} ${halfX} ${origin.y - offset}`,
                  // same curve to the 2/3 of the middle
                  `T ${destination.x + offset} ${destination.y}`,
                  // Go to the left corner
                  `L ${destination.x} ${destination.y}`,
                ].join(' ');
              case linePosition.left:
                return ``;
              default: throw new Error('no such position known');
            }
          }
        }
      }

      return (
        <path
          fill="transparent"
          stroke="black"

          d={[
            // Start position
            `M ${props.x} ${props.y}`,

            // Top Line
            draw(linePosition.top, props.top),

            // right Line
            draw(linePosition.right, props.right),

            // bottom Line
            draw(linePosition.bottom, props.bottom),

            // left Line
            draw(linePosition.left, props.left),
          ].join(' ')}
        />
      );
    }
    }</Props>,
);
