import { sub } from "date-fns";

export type MenuItem = {
  href: string;
  label: string;
  subItems?: MenuItem[];
};
export const menuItems = [
  { href: "/", label: "Home" },
  {
    href: "/committee",
    label: "Committee",
    subItems: [
      { href: "/state-committee", label: "State Committee" },
      { href: "/district-committee", label: "District Committee" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  {
    href: "/downloads",
    label: "Downloads",
    subItems: [
      { href: "/technical-writing", label: "Technical Writing" },
      { href: "/circulars-and-orders", label: "Circulars and Orders" },
      { href: "/election-nomination", label: "Election Nomination" },
      { href: "/is-code", label: "IS Code" },
      { href: "/irc-code", label: "IRC Code" },
      { href: "/handbooks", label: "Handbooks" },
      { href: "/others", label: "Others" },
    ],
  },
  { href: "/news-letter", label: "News Letter" },
  {
    href: "/account",
    label: "Account",
    subItems: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ],
  },
];
