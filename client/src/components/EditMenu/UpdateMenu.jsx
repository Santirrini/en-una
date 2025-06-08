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
  selectedStock,
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
    stock: false,
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
      stock: selectedStock || false,
    });
  }, []);
  console.log(data.stock);

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
        formData.append("stock", data.stock);

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
    acceptedFiles.forEach((file) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width < 1280 || img.height < 720) {
          alert("La imagen debe tener al menos 1280x720 píxeles.");
        } else {
          // Si la imagen es válida, la añadimos al estado
          setData((prevState) => ({
            ...prevState,
            imageFile: [...prevState.imageFile, file],
          }));
        }
        URL.revokeObjectURL(objectUrl); // Liberar la URL creada
      };

      img.src = objectUrl;
    });
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      handleImage(acceptedFiles);
    },
    [handleImage],
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
    <form onSubmit={handleSubmit} data-oid="ikth94a">
      <div
        className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8"
        data-oid="l17u6b7"
      >
        <div className={styles.title} data-oid="6w70mc8">
          <h1 data-oid="r7kud24">Mi carta/Menú</h1>
        </div>
        <div className={styles.dropzone} {...getRootProps()} data-oid="md7ltmd">
          <input {...getInputProps()} data-oid="orc8f4n" />
          {isDragActive ? (
            <p data-oid="6oi..ub">Suelta las imágenes aquí...</p>
          ) : (
            <div className={styles.icons_text} data-oid="g-f7h0n">
              <div data-oid=".1yqvjp">
                <CollectionsIcon className={styles.icons} data-oid="gzrslq4" />
              </div>
              <div data-oid="c.rlw55">
                <p data-oid="q4cal1d">
                  Arrastra y suelta las imágenes aquí o haz clic para
                  seleccionar.
                </p>
                <span data-oid="h7jbim5">Puedes subir hasta 100 imágenes.</span>
                <span data-oid="mz4yl8b">
                  Las imagenes tienen que tener un minimo de 1280x720 pixeles.
                </span>
              </div>
            </div>
          )}
        </div>
        <div data-oid="x6kmxq_">
          <div className={styles.prev_mini} data-oid="obdaslo">
            {data.imageFile &&
              data.imageFile.map((file, index) => (
                <div key={index} data-oid="8chg_k.">
                  <div className={styles.btn_x} data-oid=".jsq3p3">
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      data-oid="dks1bno"
                    >
                      <strong data-oid=".6mjxb8">X</strong>
                    </button>
                  </div>
                  <Upload listType="picture-card" disabled data-oid="fg8nrpx">
                    {file instanceof Blob || file instanceof File ? (
                      <img
                        alt={`Preview ${index}`}
                        src={URL.createObjectURL(file)}
                        accept=".jpg, .jpeg, .png"
                        data-oid="8dvceug"
                      />
                    ) : (
                      <img
                        alt={`Preview ${index}`}
                        src={file}
                        accept=".jpg, .jpeg, .png"
                        data-oid="75ky.a4"
                      />
                    )}
                  </Upload>
                </div>
              ))}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20" data-oid="hgjvmx2">
          <div
            className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
            data-oid="nlilg.c"
          >
            <div data-oid="c18bpnv">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="slvqyhf"
              >
                Nombre del producto
              </label>
              <div className="mt-2.5" data-oid="m:dz9yd">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  className="block outline-none w-full rounded-md border-0 py-1.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="lcbfur2"
                />
              </div>
            </div>

            <div data-oid="jg:4.8q">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
                data-oid="1-i_qmy"
              >
                Precio
              </label>
              <div
                className="relative mt-2 rounded-md shadow-sm"
                data-oid="mocg:ba"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  data-oid="2glhqxm"
                >
                  <span className="text-gray-500 sm:text-sm" data-oid="mvy:kom">
                    S/
                  </span>
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                  value={data.price}
                  placeholder="0.00"
                  className="block outline-none w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  data-oid="urj9_c1"
                />
              </div>
            </div>

            <div className="sm:col-span-2" data-oid="e:ub1gi">
              <label
                htmlFor="details"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="pf:gn49"
              >
                Detalle del producto
              </label>
              <div className="mt-2.5" data-oid="lfio3j_">
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
                  data-oid="gjv.upa"
                />
              </div>
            </div>
          </div>
          <div className={styles.stock_container} data-oid="81rzpnr">
            <div className={styles.check_container} data-oid="65tjrjc">
              <strong data-oid="wq:55rx">Categoria</strong>
              <div className={styles.checkbox} data-oid="1yq0pgk">
                <div data-oid=":9f41ta">
                  <input
                    type="checkbox"
                    name="Destacados"
                    checked={data.category.includes("Destacados")}
                    onChange={handleCheckboxChange}
                    data-oid="921-uum"
                  />
                </div>
                <div data-oid="y525jkv">Destacados</div>
              </div>
              <div className={styles.checkbox} data-oid="uxegj3.">
                <div data-oid="wfvjx50">
                  <input
                    type="checkbox"
                    name="Promociones"
                    checked={data.category.includes("Promociones")}
                    onChange={handleCheckboxChange}
                    data-oid="d_fh1dh"
                  />
                </div>
                <div data-oid="d26a_8y">Promociones</div>
              </div>
              <div className={styles.checkbox} data-oid=".yol:j3">
                <div data-oid=":4a3a7j">
                  <input
                    type="checkbox"
                    name="Piqueos"
                    checked={data.category.includes("Piqueos")}
                    onChange={handleCheckboxChange}
                    data-oid="sisb_e_"
                  />
                </div>
                <div data-oid="4oxjy_p">Piqueos</div>
              </div>
              <div className={styles.checkbox} data-oid="jznwomn">
                <div data-oid="f14hqhl">
                  <input
                    type="checkbox"
                    name="Ensaladas"
                    checked={data.category.includes("Ensaladas")}
                    onChange={handleCheckboxChange}
                    data-oid="1czk0vz"
                  />
                </div>
                <div data-oid="ohd:9nr">Ensaladas</div>
              </div>
              <div className={styles.checkbox} data-oid="ls4_yw1">
                <div data-oid="b7yy--e">
                  <input
                    type="checkbox"
                    name="Entradas/Sopas"
                    checked={data.category.includes("Entradas/Sopas")}
                    onChange={handleCheckboxChange}
                    data-oid="jxup:-l"
                  />
                </div>
                <div data-oid="-2g.1dk">Entradas/Sopas</div>
              </div>
              <div className={styles.checkbox} data-oid="c9s9:b4">
                <div data-oid="c56tby1">
                  <input
                    type="checkbox"
                    name="Segundos"
                    checked={data.category.includes("Segundos")}
                    onChange={handleCheckboxChange}
                    data-oid=":vbj9ad"
                  />
                </div>
                <div data-oid="_3n9coa">Segundos</div>
              </div>
              <div className={styles.checkbox} data-oid="mclhfnx">
                <div data-oid="ukwd2.t">
                  <input
                    type="checkbox"
                    name="Postres"
                    checked={data.category.includes("Postres")}
                    onChange={handleCheckboxChange}
                    data-oid="1vj55_r"
                  />
                </div>
                <div data-oid="40nr_2l">Postres</div>
              </div>
              <div className={styles.checkbox} data-oid="471pdv8">
                <div data-oid="pb..4x-">
                  <input
                    type="checkbox"
                    name="Bebidas"
                    checked={data.category.includes("Bebidas")}
                    onChange={handleCheckboxChange}
                    data-oid="5absh7m"
                  />
                </div>
                <div data-oid="i.d0l..">Bebidas</div>
              </div>
            </div>
            <div className={styles.checkbox} data-oid="cuzy13h">
              <div data-oid="sa_68k9">
                <input
                  type="checkbox"
                  name="stock"
                  checked={data.stock}
                  onChange={(e) =>
                    setData({ ...data, stock: e.target.checked })
                  }
                  className={styles.stock_input}
                  data-oid="mgq7jsj"
                />
              </div>
              <div data-oid="vp8toyf">Stock</div>
            </div>
          </div>

          <div className="mt-10" data-oid="154z5g5">
            <button
              type="submit"
              className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.bg_btn}`}
              data-oid="p-23t-o"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                  data-oid="9l:gj98"
                />
              ) : (
                "Guardar y salir"
              )}
            </button>
            {contextHolder}
          </div>
          <div className="mt-2" data-oid="65y9htu">
            <button
              type="button"
              className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_cancel}`}
              onClick={() => handleClose()}
              data-oid="52w5ig9"
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
