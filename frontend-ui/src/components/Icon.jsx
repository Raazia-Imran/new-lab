import React from "react";
const paths = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  upRight: "M6 18 18 6M6 6h12v12",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "m6 6 12 12M6 18 18 6",
  search: "m16 16 5 5",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
  file: "M14 3H5v18h14V8zM14 3v5h5M8 13h8M8 17h5",
  mail: "M3 6h18v13H3zm0 0 9 7 9-7",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0",
  layers: "m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5",
  grid: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
  check: "m5 12 4 4L19 6",
  chevron: "m6 9 6 6 6-6",
  plus: "M12 4v16M4 12h16",
  link: "m10 13 4-4m-6 8-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2-1 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0",
  book: "M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15",
  filter: "M4 6h16M7 12h10M10 18h4",
  atom: "",
};
export default function Icon({ name = "arrow", size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {name === "atom" ? (
        <>
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(120 12 12)"
          />
          <circle cx="12" cy="12" r="1" />
        </>
      ) : (
        <path d={paths[name] || paths.arrow} />
      )}
      {name === "search" && <circle cx="10" cy="10" r="6" />}
      {name === "pin" && <circle cx="12" cy="10" r="2" />}
    </svg>
  );
}
