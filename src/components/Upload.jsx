import { useState, useContext } from "react";
import "./Upload.scss";
import { db, storage } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Faculties, Levels } from "../Data";
import Button from "./Button";
import AuthContext from "../store/auth-context";

// eslint-disable-next-line react/prop-types
const Upload = ({ closeModal }) => {
  const [selectedFaculty, setSelectedFaculty] = useState("none");
  const [submitMessage, setSubmitMessage] = useState(""); // Message to show after submission
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    faculty: "",
    semester: "",
    level: "",
    session: "",
    type: "assignment",
    files: [],
    fileURLs: [],
  });

  const authCtx = useContext(AuthContext);

  // const handleFacultyChange = (event) => {
  //   setSelectedFaculty(event.target.value);
  // };

  const getDepartmentsByFaculty = () => {
    const faculty = Faculties.find((f) => f.value === selectedFaculty);
    return faculty ? faculty.departments : [];
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        files: [...formData.files, ...files], // Add the files to the existing array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "faculty") {
      setSelectedFaculty(value);
    }
  };

  const uploadFiles = async (files, folder) => {
    const promises = files.map(async (file) => {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      try {
        const uploadTask = uploadBytes(storageRef, file);
        const snapshot = await uploadTask;
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.error(`Error uploading file:`, error);
        return null;
      }
    });

    const fileURLs = await Promise.all(promises);
    return fileURLs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const fileURLs = await uploadFiles(formData.files, "uploads");

    if (fileURLs.some((url) => url === null)) {
      setIsSubmitSuccess(false);
      setSubmitMessage("File upload failed. Data will not be saved.");
      setIsProcessing(false);
      return;
    }

    try {
      const materialData = {
        courseCode: formData.courseCode,
        courseName: formData.courseName,
        department: formData.department,
        faculty: formData.faculty,
        semester: formData.semester,
        level: formData.level,
        session: formData.session,
        type: formData.type,
        uploader: authCtx.userId,
        fileURLs, // Save all file URLs in a single field
      };

      const docRef = await addDoc(collection(db, "materials"), materialData);
      setIsSubmitSuccess(true);
      setSubmitMessage("Upload successful!");

      setFormData({
        courseCode: "",
        courseName: "",
        department: "",
        faculty: "",
        semester: "",
        level: "",
        session: "",
        type: "assignment",
        files: [], // Reset the files array
        fileURLs: [],
      });

      setTimeout(() => {
        closeModal();
      }, 2000);

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      setIsSubmitSuccess(false);
      setSubmitMessage("Error adding document.");
      console.error("Error adding document:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="upload">
      <div className="upload-container">
        <div className="upload-heading">
          <h1>Upload Material(s)</h1>
        </div>

        <div className="upload-form">
          <form onSubmit={handleSubmit} action="">
            <div className="form-inputs">
              <div className="form-group">
                <label htmlFor="course-code">Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  id="course-code"
                  placeholder="Enter course code"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="course-name">
                  Course Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="courseName"
                  id="course-name"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="faculty">
                  Faculty <span className="required">*</span>
                </label>
                <select
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  required
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
              <div className="form-group">
                <label htmlFor="department">
                  Department <span className="required">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="none">Select department...</option>
                  {/* Options for departments go here */}
                  {selectedFaculty !== "none" &&
                    getDepartmentsByFaculty().map((department) => (
                      <option key={department.id} value={department.value}>
                        {department.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="semester">
                  Semester <span className="required">*</span>
                </label>
                <select
                  id="semester"
                  name="semester"
                  onChange={handleInputChange}
                  value={formData.semester}
                  required
                >
                  {/* Options for semesters go here */}
                  <option value="none">Select semester...</option>
                  <option value="first">First</option>
                  <option value="second">Second</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="level">
                  Level <span className="required">*</span>
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                >
                  {/* Options for years go here */}
                  {Levels.map((level) => (
                    <option key={level.id} value={level.value}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="session">
                  Session <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="session"
                  id="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">
                  Type <span className="required">*</span>
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="assignment">Assignment</option>
                  <option value="test">Test</option>
                  <option value="exams">Exams</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="files">Upload Files (Images and PDFs)</label>
              <input
                className="file-input"
                type="file"
                name="files"
                id="files"
                onChange={handleInputChange}
                accept="image/*,application/pdf"
                multiple
                required
              />
            </div>

            <Button
              title={isProcessing ? "Processing..." : "Submit"}
              color="dark"
              type="submit"
            />
          </form>
          {submitMessage && (
            <div
              className={`submit-message ${
                isSubmitSuccess ? "success" : "error"
              }`}
            >
              <h3>Upload successful!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
