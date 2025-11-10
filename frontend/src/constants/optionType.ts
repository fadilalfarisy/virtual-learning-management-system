const semester = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
];

const role = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Contributor",
    value: "CONTRIBUTOR",
  },
];

const status = [
  {
    label: "Active",
    value: true,
  },
  {
    label: "Inactive",
    value: false,
  },
];

const sort = [
  { label: "Ascending (A-Z)", value: 1 },
  { label: "Descending (Z-A)", value: -1 },
];

export const option = {
  semester,
  role,
  status,
  sort,
};
