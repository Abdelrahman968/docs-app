export const heading: readonly {
  label: string;
  value: number;
  fontSize: string;
}[] = [
  {
    label: "Normal Text",
    value: 0,
    fontSize: "1rem",
  },
  {
    label: "Heading 1",
    value: 1,
    fontSize: "2rem",
  },
  {
    label: "Heading 2",
    value: 2,
    fontSize: "1.5rem",
  },
  {
    label: "Heading 3",
    value: 3,
    fontSize: "1.25rem",
  },
  {
    label: "Heading 4",
    value: 4,
    fontSize: "1.125rem",
  },
] as const;
