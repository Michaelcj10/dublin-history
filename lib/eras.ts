export type EraName =
  | "industrial"
  | "gilded"
  | "victorian"
  | "artdeco"
  | "depression"
  | "wartime"
  | "postwar"
  | "mod"
  | "magazine"
  | "neon"
  | "geocities"
  | "webportal"
  | "flat"
  | "modern";

export interface EraConfig {
  name: EraName;
  label: string;
  cssClass: string;
  range: [number, number];
  // Which layout component family to use
  layout: "newspaper" | "magazine" | "earlyweb" | "webportal" | "modern";
}

export const ERAS: EraConfig[] = [
  {
    name: "industrial",
    label: "Industrial Age",
    cssClass: "era-victorian",
    range: [1800, 1849],
    layout: "newspaper",
  },
  {
    name: "gilded",
    label: "Victorian / Gilded Age",
    cssClass: "era-victorian",
    range: [1850, 1899],
    layout: "newspaper",
  },
  {
    name: "victorian",
    label: "Victorian / Edwardian",
    cssClass: "era-victorian",
    range: [1900, 1920],
    layout: "newspaper",
  },
  {
    name: "artdeco",
    label: "Art Deco",
    cssClass: "era-artdeco",
    range: [1921, 1929],
    layout: "newspaper",
  },
  {
    name: "depression",
    label: "The Depression",
    cssClass: "era-depression",
    range: [1930, 1940],
    layout: "newspaper",
  },
  {
    name: "wartime",
    label: "World War II",
    cssClass: "era-wartime",
    range: [1941, 1945],
    layout: "newspaper",
  },
  {
    name: "postwar",
    label: "Post-War",
    cssClass: "era-postwar",
    range: [1946, 1959],
    layout: "newspaper",
  },
  {
    name: "mod",
    label: "The Sixties",
    cssClass: "era-mod",
    range: [1960, 1969],
    layout: "magazine",
  },
  {
    name: "magazine",
    label: "The Seventies",
    cssClass: "era-magazine",
    range: [1970, 1979],
    layout: "magazine",
  },
  {
    name: "neon",
    label: "The Eighties",
    cssClass: "era-neon",
    range: [1980, 1989],
    layout: "earlyweb",
  },
  {
    name: "geocities",
    label: "The Nineties",
    cssClass: "era-geocities",
    range: [1990, 1999],
    layout: "earlyweb",
  },
  {
    name: "webportal",
    label: "The 2000s",
    cssClass: "era-webportal",
    range: [2000, 2009],
    layout: "webportal",
  },
  {
    name: "flat",
    label: "The 2010s",
    cssClass: "era-flat",
    range: [2010, 2019],
    layout: "modern",
  },
  {
    name: "modern",
    label: "The 2020s",
    cssClass: "era-modern",
    range: [2020, 2026],
    layout: "modern",
  },
];

export function getEra(year: number): EraConfig {
  return (
    ERAS.find((e) => year >= e.range[0] && year <= e.range[1]) ??
    ERAS[ERAS.length - 1]
  );
}

export const DECADE_JUMPS = [
  1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910, 1920,
  1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020,
];
