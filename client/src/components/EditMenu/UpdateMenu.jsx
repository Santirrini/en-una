import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PutMenu, dataPersonal } from "../../redux/action";
import { useDropzone } from "react-dropzone";
import styles from "./MenuFood.module.css";
import { Button, message, Space, Upload } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link } from "react-router-dom";

export default function UpdateMenu({
  selectedMenuId,
  selectedDetails,
  selectedName,
  selectedImages,
  selectedPrices,
  selectedCategory,
  handleClose,
}) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal.Restaurant);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    imageFile: [],
    category: [],
    name: "",
    details: "",
    price: "",
  });
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Publicación creada correctamente",
    });
  };

  React.useEffect(() => {
    setData({
      imageFile: selectedImages || [],
      category: selectedCategory || [],
      name: selectedName || "",
      details: selectedDetails || "",
      price: selectedPrices || "",
    });
  }, []);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.imageFile.length === 0) {
      alert("Por favor, sube al menos una imagen del menu.");
      return;
    }

    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("details", data.details);
        formData.append("price", data.price);
        formData.append("category", JSON.stringify(data.category));

        data.imageFile.forEach((image) => {
          formData.append("imageFile", image);
        });

        await dispatch(PutMenu(token, formData, selectedMenuId));
        success();
      } catch (error) {
        console.error("Error al crear el post:", error);
        // Manejo de error, muestra un mensaje de error, etc.
      } finally {
        handleClose();
        setLoading(false);
        window.location.reload();
      }
    }, 2000);
  };

  const handleImage = useCallback((acceptedFiles) => {
    setData((prevState) => ({
      ...prevState,
      imageFile: [...prevState.imageFile, ...acceptedFiles],
    }));
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleImage(acceptedFiles);
    },
    [handleImage]
  );

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setData((prevState) => {
      const updatedCategories = checked
        ? [...prevState.category, name]
        : prevState.category.filter((category) => category !== name);

      return {
        ...prevState,
        category: updatedCategories,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
        <div className={styles.title}>
          <h1>Mi carta/Menú</h1>
        </div>
        <div className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta las imágenes aquí...</p>
          ) : (
            <div className={styles.icons_text}>
              <div>
                <CollectionsIcon className={styles.icons} />
              </div>
              <div>
                <p>
                  Arrastra y suelta las imágenes aquí o haz clic para
                  seleccionar.
                </p>
                <span>Puedes subir hasta 100 imágenes.</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.prev_mini}>
            {data.imageFile &&
              data.imageFile.map((file, index) => (
                <div key={index}>
                  <div className={styles.btn_x}>
                    <button type="button" onClick={() => handleRemove(index)}>
                      <strong>X</strong>
                    </button>
                  </div>
                  <Upload listType="picture-card" disabled>
                    {file instanceof Blob || file instanceof File ? (
                      <img
                        alt={`Preview ${index}`}
                        src={URL.createObjectURL(file)}
                        accept=".jpg, .jpeg, .png"
                      />
                    ) : (
                      <img
                        alt={`Preview ${index}`}
                        src={file}
                        accept=".jpg, .jpeg, .png"
                      />
                    )}
                  </Upload>
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
                Nombre del producto
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  className="block outline-none w-full rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">S/</span>
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                  value={data.price}
                  placeholder="0.00"
                  className="block outline-none w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="details"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Detalles del menu
              </label>
              <div className="mt-2.5">
                <textarea
                  name="details"
                  id="details"
                  rows={4}
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <div className={styles.check_container}>
            <strong>Categoria</strong>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Destacados"
                  checked={data.category.includes("Destacados")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Destacados</div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Piqueos"
                  checked={data.category.includes("Piqueos")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Piqueos</div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Entradas/Sopas"
                  checked={data.category.includes("Entradas/Sopas")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Entradas/Sopas</div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Segundos"
                  checked={data.category.includes("Segundos")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Segundos</div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Postres"
                  checked={data.category.includes("Postres")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Postres</div>
            </div>
            <div className={styles.checkbox}>
              <div>
                <input
                  type="checkbox"
                  name="Bebidas"
                  checked={data.category.includes("Bebidas")}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>Bebidas</div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.bg_btn}`}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                />
              ) : (
                "Guardar y salir"
              )}
            </button>
            {contextHolder}
          </div>
          <div className="mt-2">
            <button
              type="button"
              className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_cancel}`}
              onClick={() => handleClose()}
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
      {contextHolder}
    </form>
  );
}
