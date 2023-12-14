const Faculties = [
  { id: 0, value: "none", name: "Select faculty..." },
  {
    id: 1,
    value: "engineering",
    name: "Engineering",
    departments: [
      "Mechanical Engineering",
      "Electrical and Electronics Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Architecture",
    ],
  },
  {
    id: 2,
    value: "science",
    name: "Science",
    departments: [
      "Biochemistry",
      "Biological Science",
      "Chemistry",
      "Geology",
      "Industrial Chemistry",
      "Industrial Mathematics",
      "Industrial Physics",
      "Microbiology",
      "Mathematics",
      "Physics",
      "Statistics",
    ],
  },
  {
    id: 3,
    value: "education",
    name: "Education",
    departments: [
      "Education and Biology",
      "Education and Chemistry",
      "Education and Integrated Science",
      "Education and Mathematics",
      "Education and Physics",
      "Technical Education",
    ],
  },
  {
    id: 4,
    value: "environmental",
    name: "Environmental",
    departments: [
      "Architecture",
      "Building",
      "Environmental Management Technology",
      "Estate Management",
      "Industrial Design",
      "Quantity Surveying",
      "Surveying and Geoinformatics",
      "Urban and Regional Planning",
    ],
  },
  {
    id: 5,
    value: "management",
    name: "Management",
    departments: [
      "Accounting",
      "Business Management",
      "Management Technology",
      "Marketing",
      "Banking and Finance",
      "Technology Education",
    ],
  },
  {
    id: 6,
    value: "agriculture",
    name: "Agriculture",
    departments: [
      "Agricultural Economics and Extension",
      "Animal Production",
      "Crop Protection",
      "Horticulture",
      "Soil Science",
      "Crop Production",
    ],
  },
];

export { Faculties };

const Levels = [
  { id: 0, value: "none", name: "Select level..." },
  { id: 1, value: "100", name: "100" },
  { id: 2, value: "200", name: "200" },
  { id: 3, value: "300", name: "300" },
  { id: 4, value: "400", name: "400" },
  { id: 5, value: "500", name: "500" },
];

export { Levels };
