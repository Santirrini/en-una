import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/action";
import { useDropzone } from "react-dropzone";
import styles from "./PostProducts.module.css";
import { Button, message, Space, Upload } from 'antd';


export default function PostProducts() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    product: "",
    price: "",
    price_send:"",
    imageFile: [],
    size: [],
    category: "",
    backgroundColor: "",
    details: "",
  });
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Publicación creada correctamente',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("product", data.product);
      formData.append("price", data.price);
      formData.append("price_send", data.price_send);

      formData.append("category", data.category);
      formData.append("backgroundColor", data.backgroundColor);
      formData.append("details", data.details);
      
      formData.append("size", JSON.stringify(data.size));

      data.imageFile.forEach((image, index) => {
        formData.append("imageFile", image);
      });

      await dispatch(postProduct(formData));
      // Limpiar el formulario después de la publicación exitosa
      setLoading(false)

      setData({
        product: "",
        price: "",
        price_send: "",
        imageFile: [],
        size: [],
        category: "",
        backgroundColor: "",
        details: "",
      });
      success()
    } catch (error) {
      console.error("Error al crear el post:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    }
  };

  const handleSizeChange = (e) => {
    const selectedSizes = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setData((prevData) => ({
      ...prevData,
      size: [...prevData.size, ...selectedSizes],
    }));
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
  const handleRemoveSize = (sizeToRemove) => {
    // Filtrar las tallas seleccionadas para mantener todas menos la que se quiere eliminar
    const updatedSizes = data.size.filter((size) => size !== sizeToRemove);
    // Actualizar el estado con las tallas restantes
    setData((prevData) => ({
      ...prevData,
      size: updatedSizes,
    }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
         <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">

        <div  className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta las imágenes aquí...</p>
          ) : (
            <div>
              <p>Arrastra y suelta las imágenes aquí o haz clic para seleccionar.</p>
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
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}

                          >
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
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Nombre del producto
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="product"
                    id="product"
                    onChange={(e) =>
                      setData({ ...data, product: e.target.value })
                    }
                    value={data.product}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                 />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Categoria
                </label>
                <div className="mt-2.5">
                  <select
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                    value={data.category}
                    name=""
                    id=""
                  >
                    <option value="">seleccionar categoria</option>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones ">Pantalones </option>
                    <option value="Sudaderas">Sudaderas</option>
                    <option value="Body bebé">Body bebé</option>
                    <option value="Camisetas de niño ">
                      Camisetas de niño 
                    </option>
                    <option value="Gorras">Gorras</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Precio
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
  type="number"
  step="0.01" // Esto permite números con dos decimales
  name="price"
  id="price"
  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  placeholder="0.00"
  onChange={(e) =>
    setData({ ...data, price: e.target.value })
  }
  value={data.price}
  required
/>
                </div>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Precio de envio
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">€</span>
                  </div>
                  <input
  type="number"
  step="0.01" // Esto permite números con dos decimales
  name="price_send"
  id="price_send"
  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  placeholder="0.00"
  onChange={(e) =>
    setData({ ...data, price_send: e.target.value })
  }
  value={data.price_send}
  required
/>
                </div>
              </div>

              <div>
  <label
    htmlFor="size"
    className="block text-sm font-semibold leading-6 text-gray-900"
  >
    Tallas disponibles
  </label>
  <div className="mt-2.5">
    <select
      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      onChange={handleSizeChange}
      value={data.size}
      name=""
      id=""
    >
      <option value="">Seleccionar talles disponibles</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
      <option value="XXL">XXL</option>
    </select>
  </div>
  {data.size.length > 0 && (
    <div className="mt-2.5">
      <p className="text-sm font-semibold leading-6 text-gray-900">Talles Seleccionados:</p>
      <ul>
        {data.size.map((selectedSize, index) => (
          <li key={index}>
            {selectedSize}{" "}
            <button
              onClick={() => handleRemoveSize(selectedSize)}
              className="text-red-500 ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

              
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Fondo
                </label>
                <div className="mt-2.5">
                  <select
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setData({ ...data, backgroundColor: e.target.value })
                    }
                    value={data.backgroundColor}
                    name=""
                    id=""
                  >
                    <option value="">seleccionar el color del fondo</option>
                    <option value="#000">Negro</option>
                    <option value="#fff">Blanco </option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="details"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Detalles del producto
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
               {loading ? "Publicando.." : "Publicar"}
              </button>
              {contextHolder}
            </div>
          </div>
      </div>
    </form>
  );
}
