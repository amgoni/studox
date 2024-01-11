/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./result.scss";
import { db } from "../config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const Result = ({ searchCriteria }) => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        let queryRef = collection(db, "materials");

        // Apply filters based on search criteria
        if (searchCriteria.faculty) {
          queryRef = query(
            queryRef,
            where("faculty", "==", searchCriteria.faculty)
          );
        }

        if (searchCriteria.department) {
          queryRef = query(
            queryRef,
            where("department", "==", searchCriteria.department)
          );
        }

        if (searchCriteria.level) {
          queryRef = query(
            queryRef,
            where("level", "==", searchCriteria.level)
          );
        }

        if (searchCriteria.course) {
          queryRef = query(
            queryRef,
            where("course", "==", searchCriteria.course)
          );
        }

        const materialsCollection = await getDocs(queryRef);

        const materialsArray = materialsCollection.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setMaterials(materialsArray);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setError("Error fetching materials. Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchCriteria) {
      fetchMaterials();
    } else {
      // Reset materials when there's no search criteria
      setMaterials([]);
    }
  }, [searchCriteria]);

  // useEffect(() => {
  //   const fetchMaterials = async () => {
  //     setIsLoading(true);

  //     try {
  //       const materialsCollection = await getDocs(collection(db, "materials")); // Replace with your Firestore collection name
  //       const materialsArray = materialsCollection.docs.map((doc) => {
  //         return { ...doc.data(), id: doc.id };
  //       });
  //       setMaterials(materialsArray);
  //     } catch (error) {
  //       console.error("Error fetching materials:", error);
  //       setError("Error fetching materials. Please try again");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (searchCriteria) {
  //     fetchMaterials();
  //   } else {
  //     // Reset materials when there's no search criteria
  //     setMaterials([]);
  //   }
  // }, [searchCriteria]); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  console.log(searchCriteria);

  return searchCriteria ? (
    <section id="result">
      <h1>Results:</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && materials.length > 0 && (
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
      )}

      {!isLoading && !error && materials.length === 0 && (
        <div>No materials found.</div>
      )}
    </section>
  ) : (
    <div className=""></div>
  );
};

export default Result;
