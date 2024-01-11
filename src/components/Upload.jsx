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
    images: [], // Store an array of selected images
    imageURLs: [], // Store an array of image URLs
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
      // Handle file input for multiple images
      setFormData({
        ...formData,
        [name]: [...formData.images, ...files], // Append selected files
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

  const uploadImages = async () => {
    const promises = formData.images.map(async (image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        // Upload each image and get the download URL
        const uploadTask = uploadBytes(storageRef, image);
        const snapshot = await uploadTask;
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    // Wait for all upload promises to complete
    const imageURLs = await Promise.all(promises);
    return imageURLs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const imageURLs = await uploadImages();

    if (imageURLs.some((url) => url === null)) {
      // If any image upload failed, display an error message
      console.error("Image upload failed. Data will not be saved.");
      setIsSubmitSuccess(false); // Submission failed
      setSubmitMessage("Image upload failed. Data will not be saved.");
      setIsProcessing(false); // Reset processing flag
      return; // Exit early and don't save the data
    }

    try {
      // Create a new object with the image URLs and other fields
      const materialData = {
        courseCode: formData.courseCode, // Access courseCode from formData
        courseName: formData.courseName,
        department: formData.department,
        faculty: formData.faculty,
        semester: formData.semester,
        level: formData.level,
        session: formData.session,
        type: formData.type,
        uploader: authCtx.userId,
        imageURLs, // Add the image URLs
      };

      const docRef = await addDoc(collection(db, "materials"), materialData);
      setIsSubmitSuccess(true); // Submission successful
      setSubmitMessage("Upload successful!");

      // Reset form data
      setFormData({
        courseCode: "",
        courseName: "",
        department: "",
        faculty: "",
        semester: "",
        level: "",
        session: "",
        type: "assignment",
        images: [], // Store an array of selected images
        imageURLs: [], // Store an array of image URLs
      });

      // Close the upload modal
      setTimeout(() => {
        closeModal();
      }, 2000);

      setSubmitMessage(""); // Reset submit message

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      setIsSubmitSuccess(false); // Submission failed
      setSubmitMessage("Error adding document.");
      console.error("Error adding document:", error);
    } finally {
      setIsProcessing(false); // Reset processing flag
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
              <label htmlFor="image">
                Images <span className="required">*</span>
              </label>
              <input
                className="file-input"
                type="file"
                name="images"
                id="image"
                onChange={handleInputChange}
                accept="image/*"
                required
                multiple
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
