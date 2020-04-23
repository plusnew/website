import plusnew, { component } from "@plusnew/core";

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
    <polyline
      points={[
        `${leftX}, 0`,
        `${leftX}, ${EDGE}`,
        `${leftBottomX}, ${HEIGHT}`,
        `${rightBottomX}, ${HEIGHT}`,
        `${rightX}, ${EDGE}`,
        `${rightX}, 0`,
      ].join(" ")}
    ></polyline>
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
