import { useState } from "react";
import "./courseForm.scss";
import { Faculties } from "../Data";
import { Levels } from "../Data";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
const CourseForm = ({ updateResults }) => {
  const [selectedFaculty, setSelectedFaculty] = useState("none");
  const [formData, setFormData] = useState({
    institution: "ATBU",
    faculty: "",
    department: "",
    level: "",
    courseCode: "",
  });

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setFormData({
      ...formData,
      faculty: event.target.value,
    });
  };

  const handleDepartmentChange = (event) => {
    setFormData({ ...formData, department: event.target.value });
  };

  const handleLevelChange = (event) => {
    setFormData({ ...formData, level: event.target.value });
  };

  const handleCourseChange = (event) => {
    setFormData({ ...formData, course: event.target.value });
  };

  const getDepartmentsByFaculty = () => {
    const faculty = Faculties.find((f) => f.value === selectedFaculty);
    return faculty ? faculty.departments : [];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateResults(formData);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} id="searchForm">
        <div className="searchForm__fields">
          <label htmlFor="faculty">Institution:</label>
          <select id="institution" name="institution">
            <option value="ATBU">ATBU</option>
          </select>
        </div>
        <div className="searchForm__fields">
          <label htmlFor="faculty">Faculty:</label>
          <select id="faculty" name="faculty" onChange={handleFacultyChange}>
            <option value="">Select faculty...</option>
            {/* Options for faculties go here */}
            {Faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.value}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            onChange={handleDepartmentChange}
          >
            <option value="">Select department...</option>
            {/* Options for departments go here */}
            {selectedFaculty !== "none" &&
              getDepartmentsByFaculty().map((department) => (
                <option key={department.id} value={department.value}>
                  {department.name}
                </option>
              ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label htmlFor="level">Level:</label>
          <select id="level" name="level" onChange={handleLevelChange}>
            {/* Options for years go here */}
            {Levels.map((level) => (
              <option key={level.id} value={level.value}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label htmlFor="course">Course:</label>
          <select id="course" name="courseCode" onChange={handleCourseChange}>
            {/* Options for courses go here */}
            <option value="">Select Course Code</option>
          </select>
        </div>
        <Button type="submit" title="Search" color="dark" />
      </form>
    </div>
  );
};

export default CourseForm;
