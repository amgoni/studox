import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./courseForm.scss";
import Button from "./Button";
import { Faculties } from "./Form Options/Faculties";
import { Levels } from "./Form Options/Levels";

const CourseForm = () => {
  return (
    <div className="form">
      <form id="searchForm">
        <div className="searchForm__fields">
          <label for="faculty">Faculty:</label>
          <select id="faculty" name="faculty">
            {/* <!-- Options for faculties go here --> */}
            {Faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.value}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label for="department">Department:</label>
          <select id="department" name="department">
            {/* <!-- Options for departments go here --> */}
            <option value="">Electrical and Electronics</option>
          </select>
        </div>
        <div className="searchForm__fields">
          <label for="level">Level:</label>
          <select id="level" name="level">
            {/* <!-- Options for years go here --> */}
            {Levels.map((level) => (
              <option key={level.id} value={level.value}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="searchForm__fields">
          <label for="course">Course:</label>
          <select id="course" name="course">
            {/* <!-- Options for courses go here --> */}
            <option value="EE502">EE502</option>
          </select>
        </div>
        <div className="searchForm__fields">
          <label for="courseCode">Course Code:</label>
          <div className="searchForm__field-search">
            <input type="text" id="courseCode" name="courseCode" />
            <Button
              title={
                <FontAwesomeIcon
                  icon="fas fa-search"
                  className="search__form-button-icon"
                />
              }
              color="dark"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
