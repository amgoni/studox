import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./courseForm.scss";
import Button from "./Button";
import { Faculties } from "../Data";
import { Levels } from "../Data";

const CourseForm = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("none");

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const getDepartmentsByFaculty = () => {
    const faculty = Faculties.find((f) => f.value === selectedFaculty);
    return faculty ? faculty.departments : [];
  };

  return (
    <div className="form">
      <form id="searchForm">
        <div className="searchForm__fields">
          <label htmlFor="faculty">Faculty:</label>
          <select
            id="faculty"
            name="faculty"
            value={selectedFaculty}
            onChange={handleFacultyChange}
          >
            <option value="none">Select faculty...</option>
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
          <select id="department" name="department">
            {/* Options for departments go here */}
            {selectedFaculty !== "none" &&
              getDepartmentsByFaculty().map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label htmlFor="level">Level:</label>
          <select id="level" name="level">
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
          <select id="course" name="course">
            {/* Options for courses go here */}
            <option value="EE502">EE502</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
