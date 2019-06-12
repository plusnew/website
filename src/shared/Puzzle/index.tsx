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
      const curveBeginningOffset = props.size / 3;
      const curveSize = props.size / 5;

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

      function getFirstThird(position: linePosition) {
        switch (position) {
          case linePosition.top:
            return { x: props.x + curveBeginningOffset, y: props.y };
          case linePosition.right:
            return { x: props.x + props.size, y: props.y + curveBeginningOffset };
          case linePosition.bottom:
            return { x: props.x + props.size - curveBeginningOffset, y: props.y + props.size };
          case linePosition.left:
            return { x: props.x, y: props.y + props.size - curveBeginningOffset };
        }
      }


      function getSecondThird(position: linePosition) {
        switch (position) {
          case linePosition.top:
            return { x: props.x + props.size - curveBeginningOffset, y: props.y };
          case linePosition.right:
            return { x: props.x + props.size, y: props.y + props.size - curveBeginningOffset };
          case linePosition.bottom:
            return { x: props.x + curveBeginningOffset, y: props.y + props.size };
          case linePosition.left:
            return { x: props.x, y: props.y + curveBeginningOffset };
        }
      }

      function draw(position: linePosition, lineType: puzzleSide, ) {

        const origin = getOrigin(position);
        const destination = getDestination(position);
        const firstThird = getFirstThird(position);
        const secondThird = getSecondThird(position);
        const halfX = Math.abs((destination.x - origin.x) / 2) + props.x;
        const halfY = Math.abs((destination.y - origin.y) / 2) + props.y;

        switch (lineType) {
          // Border of the puzzle
          case puzzleSide.flat: {
            const destination = getDestination(position);
            return `L ${destination.x} ${destination.y}`
          }

          // bulged puzzle piece
          case puzzleSide.bulged:
          case puzzleSide.hole:

            return [
              // Go a 1/3 right to the middle
              `L ${firstThird.x} ${firstThird.y}`,
              // cubic curve to top
              (() => {
                switch (position) {
                  case linePosition.top:
                    if (lineType === puzzleSide.bulged) {
                      return `Q ${origin.x} ${origin.y - curveSize} ${halfX} ${origin.y - curveSize}`;
                    } else {
                      return `Q ${origin.x} ${origin.y + curveSize} ${halfX} ${origin.y + curveSize}`;
                    }
                  case linePosition.right:
                    if (lineType === puzzleSide.bulged) {
                      return `Q ${origin.x + curveSize} ${origin.y} ${origin.x + curveSize} ${halfY}`;
                    } else {
                      return `Q ${origin.x - curveSize} ${origin.y} ${origin.x - curveSize} ${halfY}`;
                    }
                  case linePosition.bottom:
                    if (lineType === puzzleSide.bulged) {
                      return `Q ${origin.x} ${origin.y + curveSize} ${halfX} ${origin.y + curveSize}`;
                    } else {
                      return `Q ${origin.x} ${origin.y - curveSize} ${halfX} ${origin.y - curveSize}`;
                    }
                  case linePosition.left:
                  if (lineType === puzzleSide.bulged) {
                    return `Q ${origin.x - curveSize} ${origin.y} ${origin.x - curveSize} ${halfY}`;
                  } else {
                    return `Q ${origin.x + curveSize} ${origin.y} ${origin.x + curveSize} ${halfY}`;
                    
                  }
                }
              })(),
              // same curve to the 2/3 of the middle
              `T ${secondThird.x} ${secondThird.y}`,
              // Go to the right corner
              `L ${destination.x} ${destination.y}`,
            ].join(' ');
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
