import plusnew, { component } from "@plusnew/core";

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;
const BAR_WIDTH_TOP = 15;
const BAR_MARGIN = 2;
const EDGE = Math.round(CANVAS_HEIGHT * (3 / 4));
const BANNER_WIDTH = Math.round(CANVAS_WIDTH * 0.7);
const BANNER_HEIGHT = Math.round(CANVAS_HEIGHT * 0.15);
const BANNER_BACKGROUND_WIDTH = Math.round(CANVAS_WIDTH * 0.2);
const BANNER_BACKGROUND_OFFSET = -0.6;
const BANNER_BACKGROUND_EDGE = CANVAS_WIDTH * 0.05;
const PRIMARY_COLOR = "#3f9bb2";
const SECONDARY_COLOR = "#F7ECD0";

function getBar({
  topX,
  leftBottomX,
  rightBottomX,
}: {
  topX: number;
  leftBottomX: number;
  rightBottomX: number;
}) {
  const leftX = Math.round(topX - BAR_WIDTH_TOP / 2);
  const rightX = Math.round(topX + BAR_WIDTH_TOP / 2);

  // Very top of the logo, no bars visible
  const from = [
    `M${leftX},0`,
    `L${leftX},0`,
    `L${leftX},0`,
    `L${rightX},0`,
    `L${rightX},0`,
    `L${rightX},0`,
    "Z",
  ];

  // Top-To middle of the logo
  const middle = [
    `M${leftX},0`,
    `L${leftX},${EDGE}`,
    `L${leftX},${EDGE}`,
    `L${rightX},${EDGE}`,
    `L${rightX},${EDGE}`,
    `L${rightX},0`,
    "Z",
  ];

  // The whole thing
  const to = [
    `M${leftX},0`,
    `L${leftX},${EDGE}`,
    `L${Math.round(leftBottomX)},${CANVAS_HEIGHT}`,
    `L${Math.round(rightBottomX)},${CANVAS_HEIGHT}`,
    `L${rightX},${EDGE}`,
    `L${rightX},0`,
    "Z",
  ];

  return (
    <path>
      <animate
        dur="500ms"
        attributeName="d"
        attributeType="XML"
        repeatCount={1}
        fill="freeze" // This makes the path stay as is after the animation
        values={[
          from.join(""),
          ";",
          middle.join(""),
          ";",
          to.join(""),
          ";",
        ].join("")}
      />
    </path>
  );
}

function getBanner() {
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const bannerLeft = centerX - BANNER_WIDTH / 2;
  const bannerRight = centerX + BANNER_WIDTH / 2;
  const bannerTop = centerY - BANNER_HEIGHT / 2;
  const bannerBackgroundTop =
    bannerTop + BANNER_HEIGHT * BANNER_BACKGROUND_OFFSET;
  const bannerBackgroundBottom = bannerBackgroundTop + BANNER_HEIGHT;
  const bannerBackgroundLeft = bannerLeft - BANNER_BACKGROUND_WIDTH / 2;
  const bannerBackgroundRight = bannerRight + BANNER_BACKGROUND_WIDTH / 2;

  return (
    <>
      {/* Foreground */}
      <rect
        fill={PRIMARY_COLOR}
        x={bannerLeft}
        width={BANNER_WIDTH}
        y={bannerTop}
        height={BANNER_HEIGHT}
      />
      <text
        fill={SECONDARY_COLOR}
        x={centerX}
        y={centerY}
        text-anchor="middle"
        alignment-baseline="central"
      >
        PLUSNEW
      </text>

      {/* Background */}

      {/* left background */}
      <polygon
        fill={PRIMARY_COLOR}
        points={[
          // Top right corner
          `${bannerLeft + BANNER_BACKGROUND_WIDTH / 2},${bannerBackgroundTop}`,

          // top left corner
          `${bannerBackgroundLeft},${bannerBackgroundTop}`,

          // left edge
          `${bannerBackgroundLeft + BANNER_BACKGROUND_EDGE},${
            bannerBackgroundTop + BANNER_HEIGHT / 2
          }`,

          // bottom left corner
          `${bannerBackgroundLeft},${bannerBackgroundBottom}`,

          // bottom right corner
          `${
            bannerBackgroundLeft + BANNER_BACKGROUND_WIDTH
          },${bannerBackgroundBottom}`,
        ].join(" ")}
      />
      {/* Shade of left background */}
      <polygon
        points={`${bannerLeft},${bannerTop} ${
          bannerLeft + BANNER_BACKGROUND_WIDTH / 2
        },${bannerBackgroundTop} ${
          bannerLeft + BANNER_BACKGROUND_WIDTH / 2
        },${bannerTop}`}
      />

      {/* right background */}
      <polygon
        fill={PRIMARY_COLOR}
        points={[
          // Top left corner
          `${bannerRight - BANNER_BACKGROUND_WIDTH / 2},${bannerBackgroundTop}`,

          // top right corner
          `${bannerBackgroundRight},${bannerBackgroundTop}`,

          // right edge
          `${bannerBackgroundRight - BANNER_BACKGROUND_EDGE},${
            bannerBackgroundTop + BANNER_HEIGHT / 2
          }`,

          // bottom left corner
          `${bannerBackgroundRight},${bannerBackgroundBottom}`,

          // bottom left corner
          `${
            bannerBackgroundRight - BANNER_BACKGROUND_WIDTH
          },${bannerBackgroundBottom}`,
        ].join(" ")}
      />

      {/* Shade of right background */}
      <polygon
        points={`${bannerRight},${bannerTop} ${
          bannerRight - BANNER_BACKGROUND_WIDTH / 2
        },${bannerBackgroundTop} ${
          bannerRight - BANNER_BACKGROUND_WIDTH / 2
        },${bannerTop}`}
      />
    </>
  );
}

export default component(__dirname, () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
    >
      <g>
        {getBar({
          topX:
            CANVAS_WIDTH / 2 - BAR_MARGIN * (3 / 2) - (BAR_WIDTH_TOP * 3) / 2,
          leftBottomX: 0,
          rightBottomX: CANVAS_WIDTH / 4 - BAR_MARGIN / 2,
        })}
        {getBar({
          topX: CANVAS_WIDTH / 2 - BAR_MARGIN / 2 - BAR_WIDTH_TOP / 2,
          leftBottomX: CANVAS_WIDTH / 4 + BAR_MARGIN / 2,
          rightBottomX: CANVAS_WIDTH / 2 - BAR_MARGIN / 2,
        })}
        {getBar({
          topX: CANVAS_WIDTH / 2 + BAR_MARGIN / 2 + BAR_WIDTH_TOP / 2,
          leftBottomX: CANVAS_WIDTH / 2 + BAR_MARGIN / 2,
          rightBottomX: CANVAS_WIDTH * (3 / 4) - BAR_MARGIN / 2,
        })}
        {getBar({
          topX:
            CANVAS_WIDTH / 2 + BAR_MARGIN * (3 / 2) + (BAR_WIDTH_TOP * 3) / 2,
          leftBottomX: CANVAS_WIDTH * (3 / 4) + BAR_MARGIN / 2,
          rightBottomX: CANVAS_WIDTH,
        })}
      </g>
      <g>{getBanner()}</g>
    </svg>
  );
});
