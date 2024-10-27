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
      { href: "/committee/state-committee", label: "State Committee" },
      { href: "/committee/district-committee", label: "District Committee" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  {
    href: "/downloads",
    label: "Downloads",
    subItems: [
      { href: "/downloads/technical-writing", label: "Technical Writing" },
      { href: "/downloads/circulars-and-orders", label: "Circulars and Orders" },
      { href: "/downloads/election-nomination", label: "Election Nomination" },
      { href: "/downloads/is-code", label: "IS Code" },
      { href: "/downloads/irc-code", label: "IRC Code" },
      { href: "/downloads/handbooks", label: "Handbooks" },
      { href: "/downloads/others", label: "Others" },
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
