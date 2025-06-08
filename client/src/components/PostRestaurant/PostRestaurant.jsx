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
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState([
    { dia: "Lunes", inicio: "", fin: "", cerrado: false },
    { dia: "Martes", inicio: "", fin: "", cerrado: false },
    { dia: "Miércoles", inicio: "", fin: "", cerrado: false },
    { dia: "Jueves", inicio: "", fin: "", cerrado: false },
    { dia: "Viernes", inicio: "", fin: "", cerrado: false },
    { dia: "Sábado", inicio: "", fin: "", cerrado: false },
    { dia: "Domingo", inicio: "", fin: "", cerrado: false },
  ]);

  const [data, setData] = useState({
    imageFile: [],
    logo: "",
    name: "",
    address: "",
    address_optional: "",
    phone: "",
    email: "",
    details: "",
    local: "",
  });

  const handleInputChange = (index, campo, valor) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index][campo] = valor;
    setHorarios(nuevosHorarios);
  };

  const toggleCerrado = (index) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index].cerrado = !nuevosHorarios[index].cerrado;
    setHorarios(nuevosHorarios);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Publicación creada correctamente",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.imageFile.length === 0) {
      alert("Por favor, sube al menos una imagen.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("address_optional", data.address_optional);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("details", data.details);
      formData.append("local", data.local);

      // Convertir el array de horarios a una cadena JSON
      formData.append("horarios", JSON.stringify(horarios));

      data.imageFile.forEach((image) => {
        formData.append("imageFile", image);
      });

      if (data.logoFile) {
        formData.append("logoUrl", data.logoFile);
      }

      await dispatch(postRestaurant(token, formData));
      success();
    } catch (error) {
      console.error("Error al crear el post:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    } finally {
      setData({
        imageFile: [],
        logoFile: "",
        name: "",
        address: "",
        address_optional: "",
        phone: "",
        email: "",
        details: "",
        local: "",
      });
      setHorarios([
        { dia: "Lunes", inicio: "", fin: "", cerrado: false },
        { dia: "Martes", inicio: "", fin: "", cerrado: false },
        { dia: "Miércoles", inicio: "", fin: "", cerrado: false },
        { dia: "Jueves", inicio: "", fin: "", cerrado: false },
        { dia: "Viernes", inicio: "", fin: "", cerrado: false },
        { dia: "Sábado", inicio: "", fin: "", cerrado: false },
        { dia: "Domingo", inicio: "", fin: "", cerrado: false },
      ]);
      setLoading(false);
    }
  };

  const handleImage = useCallback((acceptedFiles) => {
    setData((prevState) => ({
      ...prevState,
      imageFile: Array.isArray(prevState.imageFile)
        ? [...prevState.imageFile, ...acceptedFiles]
        : acceptedFiles,
    }));
  }, []);

  const handleLogo = useCallback((acceptedFiles) => {
    setData((prevState) => ({
      ...prevState,
      logoFile: acceptedFiles[0],
    }));
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    handleImage(acceptedFiles);
  }, []);

  const onLogoDrop = useCallback((acceptedFiles) => {
    handleLogo(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    onDrop: onLogoDrop,
    maxFiles: 1,
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
    <form onSubmit={handleSubmit} data-oid="3qt6fi2">
      <div
        className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
        data-oid="e5h9ji8"
      >
        <div className={styles.title} data-oid="ey7.omb">
          <h1 data-oid="j5c.t7y">Publicar mi restaurante</h1>
        </div>
        <div className={styles.dropzone} {...getRootProps()} data-oid="1yfhyn:">
          <input {...getInputProps()} data-oid="mz7f6-k" />
          {isDragActive ? (
            <p data-oid="1smgbt:">Suelta las imágenes aquí...</p>
          ) : (
            <div data-oid="3eqelxy">
              <p data-oid="5:qzxm0">
                Arrastra y suelta las imágenes aquí o haz clic para seleccionar.
              </p>
              <span data-oid="l900xyx">Puedes subir hasta 100 imágenes.</span>
            </div>
          )}
        </div>
        <div data-oid="bta5uol">
          {data.imageFile &&
            data.imageFile.map((photo) => (
              <img src={photo} alt="" data-oid="j27w2uo" />
            ))}
          <div className={styles.prev_mini} data-oid="rmy98b3">
            {data.imageFile &&
              data.imageFile.map((file, index) => (
                <div key={index} data-oid="6n.:ckp">
                  <div className="btn-x" data-oid="fegh15l">
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      data-oid="qimbg03"
                    >
                      <strong data-oid="vlf:16k">X</strong>
                    </button>
                  </div>
                  {file && (
                    <Upload listType="picture-card" disabled data-oid="-48ak5p">
                      <img
                        alt={`Preview ${index}`}
                        src={URL.createObjectURL(file)}
                        accept=".jpg, .jpeg, .png"
                        data-oid="yr72vjr"
                      />
                    </Upload>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div
          className={styles.dropzone}
          {...getLogoRootProps()}
          data-oid="b98ssn1"
        >
          <input {...getLogoInputProps()} data-oid="1j2..98" />
          {isLogoDragActive ? (
            <p data-oid="26s419b">Suelta el logo aquí...</p>
          ) : (
            <div data-oid=".5-wfg3">
              <p data-oid="akmwod5">
                Arrastra y suelta el logo aquí o haz clic para seleccionar.
              </p>
              <span data-oid="g5nn9ks">Puedes subir un logo.</span>
            </div>
          )}
        </div>
        {data.logoFile && (
          <div className={styles.prev_mini} data-oid="f:rrfdb">
            <Upload listType="picture-card" disabled data-oid="80vzd06">
              <img
                alt="Logo preview"
                src={URL.createObjectURL(data.logoFile)}
                accept=".jpg, .jpeg, .png"
                data-oid="u3vtmth"
              />
            </Upload>
          </div>
        )}

        <div className="mx-auto mt-16 max-w-xl sm:mt-20" data-oid="fbee33b">
          <div
            className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
            data-oid="2sgea:d"
          >
            <div data-oid="rce:74u">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="jrr06so"
              >
                Nombre del restaurante
              </label>
              <div className="mt-2.5" data-oid="wbgjzko">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="zz2.6_:"
                />
              </div>
            </div>
            <div data-oid=":2z5t4f">
              <label
                htmlFor="local"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="mhtrhhi"
              >
                Local
              </label>
              <div className="mt-2.5" data-oid="z0q9bfq">
                <input
                  type="text"
                  name="local"
                  id="local"
                  onChange={(e) => setData({ ...data, local: e.target.value })}
                  value={data.local}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="s9mhrx2"
                />
              </div>
            </div>
            <div className="sm:col-span-2" data-oid="uop02s-">
              <label
                htmlFor="address"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="a9me_9_"
              >
                Dirección
              </label>
              <div className="mt-2.5" data-oid="we::p-d">
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
                  data-oid="1diofgr"
                />
              </div>
            </div>
            <div className="sm:col-span-2" data-oid="9cbc1cn">
              <label
                htmlFor="address_optional"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="60kj-01"
              >
                Dirección opcional
              </label>
              <div className="mt-2.5" data-oid="wb9ag:e">
                <input
                  type="text"
                  name="address_optional"
                  id="address_optional"
                  onChange={(e) =>
                    setData({ ...data, address_optional: e.target.value })
                  }
                  value={data.address_optional}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  data-oid="khw82i2"
                />
              </div>
            </div>
            <div data-oid="rg4cmxa">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="obhk5vp"
              >
                Teléfono
              </label>
              <div className="mt-2.5" data-oid="zx20rzv">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  value={data.phone}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="xm7kls6"
                />
              </div>
            </div>
            <div data-oid="amybdy3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="bn7y8uj"
              >
                Email
              </label>
              <div className="mt-2.5" data-oid="jnglyym">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="1:_dp6i"
                />
              </div>
            </div>
            <div data-oid="6fiq-4g">
              <h3 data-oid="dxh39m0">Horarios de apertura </h3>

              {horarios.map((horario, index) => (
                <div
                  key={index}
                  className={styles.formGroup}
                  data-oid="9kg5_gi"
                >
                  <label className={styles.label} data-oid="9jcq0tr">
                    {horario.dia}
                  </label>
                  {horario.cerrado ? (
                    <span className={styles.cerradoText} data-oid="3vd8-tn">
                      Cerrado
                    </span>
                  ) : (
                    <>
                      <input
                        type="time"
                        value={horario.inicio}
                        onChange={(e) =>
                          handleInputChange(index, "inicio", e.target.value)
                        }
                        className={styles.inputTime}
                        data-oid="ibak25o"
                      />

                      <span data-oid="h88.k:9">-</span>
                      <input
                        type="time"
                        value={horario.fin}
                        onChange={(e) =>
                          handleInputChange(index, "fin", e.target.value)
                        }
                        className={styles.inputTime}
                        data-oid="ol77q64"
                      />
                    </>
                  )}
                  <input
                    type="checkbox"
                    checked={horario.cerrado}
                    onChange={() => toggleCerrado(index)}
                    data-oid="lx_hplc"
                  />
                </div>
              ))}
            </div>
            <div className="sm:col-span-2" data-oid="wn556cq">
              <label
                htmlFor="details"
                className="block text-sm font-semibold leading-6 text-gray-900"
                data-oid="di.bwsp"
              >
                Detalles
              </label>
              <div className="mt-2.5" data-oid="-hu8hi:">
                <textarea
                  name="details"
                  id="details"
                  onChange={(e) =>
                    setData({ ...data, details: e.target.value })
                  }
                  value={data.details}
                  rows="4"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  data-oid="8966o8y"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-10" data-oid="s42m:.f">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              data-oid="x4g-ya1"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                  data-oid="o..z1qe"
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
