import { useState, useEffect } from "react";
import "./result.scss";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Result = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsCollection = await getDocs(collection(db, "materials")); // Replace with your Firestore collection name
        const materialsArray = materialsCollection.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setMaterials(materialsArray);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  return (
    <section id="result">
      <h1>All Documents</h1>
      <div className="result-container">
        {materials.map((material, index) => (
          <div className="result-item" key={index}>
            <p>
              <a href={material.imageURLs[0]}>
                {" "}
                {/* Assuming the first image URL is the link */}
                {index + 1}.{" "}
                <span className="course-code">{material.courseCode}</span>{" "}
                <span className="material-type">{material.type}</span>{" "}
                <span className="material-semester">{material.semester}</span>{" "}
                <span className="material-session">{material.session}</span>
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Result;
