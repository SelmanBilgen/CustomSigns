export const FONT_OPTIONS = [
  { label: "Hello Honey", value: "Hello Honey" },
  { label: "Hello Spring", value: "Hello Spring" },
  { label: "Madina", value: "Madina" },
  { label: "Ostrich Sans Inline", value: "Ostrich Sans Inline" },
];

export const COLOR_OPTIONS = [
  { label: "Black", value: "#222" },
  { label: "White", value: "#fff" },
  { label: "Orange", value: "#E85A29" },
];

export const FONT_WIDTH_OPTIONS = Array.from({ length: 9 }, (_, i) => {
    const inch = 12 + i * 6;
    return { label: `${inch}”`, value: inch };
});