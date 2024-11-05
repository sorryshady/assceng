import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toCamelCase(str: string) {
    return str.replace(/-./g, match => match[1].toUpperCase());
}

export function heading(title: string) {
    const titleArray = title.split("-");
    titleArray.map((word, index) => {
      if (word === "is" || word === "irc") {
        titleArray[index] = titleArray[index].toUpperCase();
      } else {
        titleArray[index] = word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
    return titleArray.join(" ");
  };
