const Faculties = [
  { id: 0, value: "none", name: "Select faculty..." },
  {
    id: 1,
    value: "engineering",
    name: "Engineering",
    departments: [
      "Department of Mechanical Engineering",
      "Department of Electrical and Electronics Engineering",
      "Department of Civil Engineering",
      "Department of Chemical Engineering",
      "Department of Architecture",
    ],
  },
  {
    id: 2,
    value: "science",
    name: "Science",
    departments: [
      "Department of Biochemistry",
      "Department of Biological Science",
      "Department of Chemistry",
      "Department of Geology",
      "Department of Industrial Chemistry",
      "Department of Industrial Mathematics",
      "Department of Industrial Physics",
      "Department of Microbiology",
      "Department of Mathematics",
      "Department of Physics",
      "Department of Statistics",
    ],
  },
  {
    id: 3,
    value: "education",
    name: "Education",
    departments: [
      "Department of Education and Biology",
      "Department of Education and Chemistry",
      "Department of Education and Integrated Science",
      "Department of Education and Mathematics",
      "Department of Education and Physics",
      "Department of Technical Education",
    ],
  },
  {
    id: 4,
    value: "environmental",
    name: "Environmental",
    departments: [
      "Department of Architecture",
      "Department of Building",
      "Department of Environmental Management Technology",
      "Department of Estate Management",
      "Department of Industrial Design",
      "Department of Quantity Surveying",
      "Department of Surveying and Geoinformatics",
      "Department of Urban and Regional Planning",
    ],
  },
  {
    id: 5,
    value: "management",
    name: "Management",
    departments: [
      "Department of Accounting",
      "Department of Business Management",
      "Department of Management Technology",
      "Department of Marketing",
      "Department of Banking and Finance",
      "Department of Technology Education",
    ],
  },
  {
    id: 6,
    value: "agriculture",
    name: "Agriculture",
    departments: [
      "Department of Agricultural Economics and Extension",
      "Department of Animal Production",
      "Department of Crop Protection",
      "Department of Horticulture",
      "Department of Soil Science",
      "Department of Crop Production",
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
