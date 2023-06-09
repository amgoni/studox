import React from "react";
import "./result.scss";

const Result = () => {
  return (
    <section id="result">
      <h1>Search results...</h1>
      <div className="result-container">
        <div className="result-item">
          <h3>
            <a href="../assets/sample.png">
              1. EE502 Assignment 1st Semester 2023/24
            </a>
          </h3>
        </div>
        <div className="result-item">
          <h3>
            <a href="../assets/sample.png">
              2. EE502 Test 2nd Semester 2018/19
            </a>
          </h3>
        </div>
        <div className="result-item">
          <h3>
            <a href="../assets/sample.png">
              3. EE502 Exams 1st Semester 2021/22
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Result;
