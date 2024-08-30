/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Material.scss";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Material = () => {
  const { id: materialId } = useParams();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      setIsLoading(true);
      try {
        const materialDocRef = doc(db, "materials", materialId);
        const materialDocSnapshot = await getDoc(materialDocRef);
        if (materialDocSnapshot.exists()) {
          const materialData = materialDocSnapshot.data();
          setMaterial(materialData);
        } else {
          setError("Material not found");
        }
      } catch (error) {
        console.error("Error fetching material:", error);
        setError("Error fetching material. Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterial();
  }, [materialId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const isImage = (url) => {
    const fileExtension = url.split("?")[0].split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
  };

  return (
    <div className="material">
      {material && (
        <h1 className="material-heading">
          {material.courseCode} - {material.courseName}
        </h1>
      )}

      {isLoading && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && material && (
        <div className="material-details">
          <p>Type: {material.type}</p>
          <p>Semester: {material.semester}</p>
          <p>Session: {material.session}</p>

          <div className="material-images">
            <Slider {...settings}>
              {material.fileURLs.map((url, index) => (
                <div key={index} className="material-file">
                  {isImage(url) ? (
                    <img src={url} alt={`Document ${index + 1}`} />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      View PDF {index + 1}
                    </a>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;
