import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import styles from "./AdminComplete.module.css";

// Estilos para el contenedor del formulario
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Estilos para el botón de subir
const UploadButton = styled.button`
  background-color: #500075;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background-color: #6b019dff;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Estilos para el input de archivo
const FileInput = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

// Estilos para la vista previa de la imagen
const ImagePreview = styled.img`
  margin-top: 1rem;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const PostCarousel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [Carrusels, setCarrusels] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Por favor selecciona una imagen antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("carrusel", selectedImage);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/post-carrusel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Imagen subida:", response.data);
      setUploadSuccess(true);
      allCarrusel(); // Actualizar lista de imágenes después de subir una nueva
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen.");
    } finally {
      setUploading(false);
      setUploadSuccess(false);
      setSelectedImage(false);
      setPreviewImage(false);
    }
  };

  const allCarrusel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/carousels"
      );
      setCarrusels(response.data.data);
    } catch (error) {
      console.error("Error al obtener carruseles:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/carousels/${id}`
      );
      setCarrusels(Carrusels.filter((carousel) => carousel.id !== id));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert("Hubo un error al eliminar la imagen.");
    }
  };

  React.useEffect(() => {
    allCarrusel();
  }, []);

  return (
    <div>
      <FormContainer>
        <Title>Subir Imagen al carrusel</Title>
        <form onSubmit={handleSubmit}>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {previewImage && (
            <ImagePreview src={previewImage} alt="Vista previa de la imagen" />
          )}

          <UploadButton type="submit" disabled={uploading}>
            {uploading ? "Subiendo..." : "Subir Imagen"}
          </UploadButton>
        </form>

        {uploadSuccess && <p>¡Imagen subida con éxito!</p>}
      </FormContainer>
      <div className={styles.carruselData}>
        {Carrusels && Carrusels.map((data) => (
          <div key={data.id} className={styles.imgContainer}>
            <img src={data.imageCarousel} alt={`Imagen ${data.id}`} />
            <button
              className={styles.btnCarousel}
              onClick={() => handleDelete(data.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCarousel;
