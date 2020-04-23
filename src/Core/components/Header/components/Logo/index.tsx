import plusnew, { component } from "@plusnew/core";
import style from "./logo.scss";

const WIDTH = 200;
const HEIGHT = 200;
const TOP_BAR_WIDTH = 15;
const BAR_MARGIN = 2;

function getBar({
  topX,
  leftBottomX,
  rightBottomX,
}: {
  topX: number;
  leftBottomX: number;
  rightBottomX: number;
}) {
  const leftX = topX - TOP_BAR_WIDTH / 2;
  const rightX = topX + TOP_BAR_WIDTH / 2;
  const EDGE = HEIGHT * (2 / 3);

  return (
    <path
      class={style.bar}
      d={[
        `M${leftX}, 0`,
        `L${leftX}, 0`,
        `L${leftX}, 0`,
        `L${rightX}, 0`,
        `L${rightX}, 0`,
        `L${rightX}, 0`,
      ].join(" ")}
    >
      <animate
        dur="1s"
        repeatCount="indefinite"
        attributeName="d"
        values={[
          `M${leftX}, 0`,
          `L${leftX}, ${EDGE}`,
          `L${leftX}, ${EDGE}`,
          `L${rightX}, ${EDGE}`,
          `L${rightX}, ${EDGE}`,
          `L${rightX}, 0`,
        ].join(" ")}
      />

      <animate
        begin="1s"
        dur="1s"
        attributeName="d"
        repeatCount="indefinite"
        values={[
          `M${leftX}, 0`,
          `L${leftX}, ${EDGE}`,
          `L${leftBottomX}, ${HEIGHT}`,
          `L${rightBottomX}, ${HEIGHT}`,
          `L${rightX}, ${EDGE}`,
          `L${rightX}, 0`,
        ].join(" ")}
      />
    </path>
  );
}

export default component(__dirname, () => {
  return (
    <svg width={WIDTH} height={HEIGHT}>
      {getBar({
        topX: WIDTH / 2 - BAR_MARGIN * (3 / 2) - (TOP_BAR_WIDTH * 3) / 2,
        leftBottomX: 0,
        rightBottomX: WIDTH / 4 - BAR_MARGIN / 2,
      })}
      {getBar({
        topX: WIDTH / 2 - BAR_MARGIN / 2 - TOP_BAR_WIDTH / 2,
        leftBottomX: WIDTH / 4 + BAR_MARGIN / 2,
        rightBottomX: WIDTH / 2 - BAR_MARGIN / 2,
      })}
      {getBar({
        topX: WIDTH / 2 + BAR_MARGIN / 2 + TOP_BAR_WIDTH / 2,
        leftBottomX: WIDTH / 2 + BAR_MARGIN / 2,
        rightBottomX: WIDTH * (3 / 4) - BAR_MARGIN / 2,
      })}
      {getBar({
        topX: WIDTH / 2 + BAR_MARGIN * (3 / 2) + (TOP_BAR_WIDTH * 3) / 2,
        leftBottomX: WIDTH * (3 / 4) + BAR_MARGIN / 2,
        rightBottomX: WIDTH,
      })}
    </svg>
  );
});
