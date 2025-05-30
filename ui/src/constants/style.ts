// cannot be named neutral because tailwindcss uses 'neutral' already
const neutrals = {
  0: "#ffffff",
  10: "#fafafa",
  20: "#d4d4d8",
  30: "#a1a1aa",
  40: "#787883",
  50: "#555562",
  60: "#353541",
  70: "#27272f",
  80: "#19191f",
  90: "#121217",
  100: "#0d0d12",
  110: "#000000",
};

const purple = {
  0: "#f1e8ff",
  10: "#e2d2ff",
  20: "#d4bbff",
  30: "#c6a5ff",
  40: "#b58aff",
  50: "#9162f6",
  60: "#711eff",
  70: "#5a18cc",
  80: "#441299",
  90: "#2d0c66",
  100: "#22094c",
  110: "#160433",
  120: "#3B265F",
};

const darkBlue = {
  0: "#c8d8ec",
  10: "#97b1d2",
  20: "#6683a7",
  30: "#4b6586",
  40: "#2e4665",
  50: "#152a44",
  60: "#132236",
  70: "#111d2e",
  80: "#101a27",
  90: "#0b141f",
  100: "#080f18",
  110: "#030a13",
};
const lightBlue = {
  0: "#f5f9fd",
  10: "#e9f1f9",
  20: "#cfddef",
  30: "#93abce",
  40: "#6b8bb7",
  50: "#436aa1",
  60: "#1b498b",
  70: "#163a6f",
  80: "#102c53",
  90: "#0b1d38",
  100: "#08162a",
  110: "#050f1c",
};
const blueGrey = {
  0: "#f3f5f7",
  10: "#dae0e7",
  20: "#c1ccd7",
  30: "#a8b7c7",
  40: "#8fa2b7",
  50: "#768da7",
  60: "#5f7895",
  70: "#50647c",
  80: "#405064",
  90: "#303c4b",
  100: "#202832",
  110: "#101419",
};
const green = {
  0: "#d6f5e7",
  10: "#c2efdb",
  20: "#a5e3c8",
  30: "#85e0b8",
  40: "#5dd5a0",
  50: "#34cb88",
  60: "#29b577",
  70: "#209d66",
  80: "#1f7a52",
  90: "#155136",
  100: "#11352e",
  110: "#0a291b",
};
const red = {
  0: "#ffe7e5",
  10: "#ffdbd9",
  20: "#ffb8b2",
  30: "#ffa099",
  40: "#ff887f",
  50: "#ff615c",
  60: "#e54d48",
  70: "#c94641",
  80: "#a13c39",
  90: "#742e2b",
  100: "#502523",
  110: "#3d2624",
};
const yellow = {
  0: "#fff6d9",
  10: "#fff1c5",
  20: "#ffecb2",
  30: "#ffe38c",
  40: "#ffdd75",
  50: "#f2c94c",
  60: "#e3bb42",
  70: "#b99b3f",
  80: "#9a7f2e",
  90: "#6d5a20",
  100: "#413511",
  110: "#2b2209",
};

const orange = {
  0: "#ffeed6",
  10: "#ffe6c2",
  20: "#ffddad",
  30: "#ffd599",
  40: "#ffc370",
  50: "#ffb347",
  60: "#eca23e",
  70: "#dd932a",
  80: "#c17d1c",
  90: "#935f18",
  100: "#5f3e10",
  110: "#452f10",
};

const aqua = {
  0: "#ebfcff",
  10: "#e0faff",
  20: "#d6faff",
  30: "#c5f7ff",
  40: "#b2f5ff",
  50: "#79e5f6",
  60: "#3fe5ff",
  70: "#58d1e4",
  80: "#33bbd1",
  90: "#2691a2",
  100: "#196773",
  110: "#13525c",
};

const pink = {
  0: "#ffebf1",
  10: "#ffd7e3",
  20: "#ffc3d5",
  30: "#ffafc7",
  40: "#ff88ab",
  50: "#f76490",
  60: "#ff3873",
  70: "#cf2d5d",
  80: "#9f2247",
  90: "#6f1631",
  100: "#571126",
  110: "#3f0b1b",
};

export const allColors = {
  neutrals,
  darkBlue,
  lightBlue,
  blueGrey,
  green,
  red,
  yellow,
  purple,
  orange,
  aqua,
  pink,
};

export const SEMANTIC_CLASSES = {
  "main-bg": "var(--main-bg)",
  "default-blue": "var(--default-blue)",
  "text-default": "var(--text-default)",
  "text-secondary": "var(--text-secondary)",
  "text-emphasis": "var(--text-emphasis)",
  "text-secondary-btn": "var(--text-secondary-btn)",
  "text-label": "var(--text-label)",
  "text-disabled": "var(--text-disabled)",
  "container-bg": "var(--container-bg)",
  "button-secondary": "var(--button-secondary)",
  "button-secondary-hover": "var(--button-secondary-hover)",
  "hover-overlay": "var(--hover-overlay)",
  "default-border": "var(--default-border)",
};

export const POSITIVE_GREEN_COLOR = "var(--positive-green)";
export const NEGATIVE_RED_COLOR = "var(--negative-red)";
export const CHART_AREA_NEUTRAL_COLOR = "var(--chart-area-neutral)";