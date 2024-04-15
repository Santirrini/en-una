import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRestaurant } from "../../redux/action";
import { useDropzone } from "react-dropzone";
import styles from "./PostRestaurant.module.css";
import { Button, message, Space, Upload } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

export default function PostProducts() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
const token = useSelector(state => state.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    imageFile: [],
    name: "",
    address: "",
    address_optional: "",
    phone: "",
    email: "",
    details: "",
  });
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Publicación creada correctamente",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("address_optional", data.address_optional);

      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("details", data.details);

      data.imageFile.forEach((image, index) => {
        formData.append("imageFile", image);
      });

      await dispatch(postRestaurant(token, formData));
      success();
      
    } catch (error) {
      console.error("Error al crear el post:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    } finally {
      setData({
        imageFile: [],
        name: "",
        address: "",
        address_optional: "",
        phone: "",
        email: "",
        details: "",
      });
      setLoading(false);
    }
  }, 2000);

  };



  const handleImage = useCallback((acceptedFiles) => {
    setData((prevState) => ({
      ...prevState,
      imageFile: Array.isArray(prevState.imageFile)
        ? [...prevState.imageFile, ...acceptedFiles]
        : acceptedFiles,
    }));
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    handleImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleRemove = (index) => {
    const newFilesArray = [...data.imageFile];
    newFilesArray.splice(index, 1);
    setData((prevState) => ({
      ...prevState,
      imageFile: newFilesArray,
    }));
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className={styles.title}>
        <h1>Publicar mi restaurante</h1>
      </div>
        <div className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta las imágenes aquí...</p>
          ) : (
            <div>
              <p>
                Arrastra y suelta las imágenes aquí o haz clic para seleccionar.
              </p>
              <span>Puedes subir hasta 100 imágenes.</span>
            </div>
          )}
        </div>
        <div>
          {data.imageFile &&
            data.imageFile.map((photo) => <img src={photo} alt="" />)}
          <div className={styles.prev_mini}>
            {data.imageFile &&
              data.imageFile.map((file, index) => (
                <div key={index}>
                  <div className="btn-x">
                    <button type="button" onClick={() => handleRemove(index)}>
                      <strong>X</strong>
                    </button>
                  </div>
                  {file && (
                    <Upload listType="picture-card" disabled>
                      <img
                        alt={`Preview ${index}`}
                        src={URL.createObjectURL(file)}
                        accept=".jpg, .jpeg, .png"
                      />
                    </Upload>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Nombre del restaurante
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Dirección
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  value={data.address}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address_optional"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Dirección(opcional)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="address_optional"
                  id="address_optional"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setData({ ...data, address_optional: e.target.value })
                  }
                  value={data.address_optional}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Telefóno
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">+51</span>
                </div>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  value={data.phone}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                  value={data.email}
                />
              </div>
            </div>

        
            <div className="sm:col-span-2">
              <label
                htmlFor="details"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Detalles del Restaurante
              </label>
              <div className="mt-2.5">
                <textarea
                  name="details"
                  id="details"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  value={data.details}
                  onChange={(e) =>
                    setData({ ...data, details: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                      {loading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  "Publicar"
                )}
            </button>
            {contextHolder}
          </div>
        </div>
      </div>
    </form>
  );
}
