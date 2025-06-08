import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRestaurant, dataPersonal } from "../../redux/action";
import { useDropzone } from "react-dropzone";
import styles from "./Index.module.css";
import { Button, message, Space, Upload } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import CollectionsIcon from "@mui/icons-material/Collections";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
// Estilos para el contenedor del mapa
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Coordenadas iniciales centradas en Perú
const defaultCenter = {
  lat: -12.0464,
  lng: -77.0428,
};
export default function PostRestaurant() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const datapersonal = useSelector((state) => state.datapersonal);
  const [disabled, setDisabled] = useState(false);
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
  const [center, setCenter] = useState(defaultCenter); // Coordenadas del mapa
  const [currentLocation, setCurrentLocation] = useState(null); // Para guardar la ubicación actual del usuario
  const autocompleteRef = useRef(null); // Referencia para el Autocomplete
  const [area, setArea] = useState([]);
  const [additional_services, setAdditional_services] = useState([]);
  const [messages, setMessages] = useState(""); // Mensaje que se muestra cuando se hace clic
  console.log(datapersonal);
  // Maneja el clic en el botón, desactiva el botón por un tiempo y cambia el mensaje
  const handleDisabled = () => {
    setDisabled(true); // Deshabilita el botón
    setMessages("La información se puede editar ahora"); // Muestra el mensaje
  };
  // Maneja los cambios en los checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Actualiza el estado de áreas seleccionadas
    setArea((prevSelectedAreas) => {
      if (checked) {
        // Agrega el nombre al array si está seleccionado
        return [...prevSelectedAreas, name];
      } else {
        // Elimina el nombre del array si está deseleccionado
        return prevSelectedAreas.filter((area) => area !== name);
      }
    });
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          setCenter(userLocation); // Centramos el mapa en la ubicación del usuario
        },
        (error) => {
          console.error("Error al obtener la ubicación", error);
        },
      );
    } else {
      console.error("El navegador no soporta Geolocalización");
    }
  }, []);
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });

        // Extraer los componentes de la dirección
        const addressComponents = place.address_components;

        // Buscar el distrito (administrative_area_level_2) y localidad (locality)
        const district = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_2"),
        );
        const locality = addressComponents.find((component) =>
          component.types.includes("locality"),
        );

        // Actualizar el estado con la dirección, distrito y localidad
        setData({
          ...data,
          address: place.formatted_address,
          district: district ? district.long_name : "",
          local: locality ? locality.long_name : "", // Asegúrate de usar `long_name` para localidad
        });
      } else {
        console.error("No se pudo obtener la información de la dirección.");
      }
    }
  };

  // Maneja los cambios en los checkboxes
  const handleCheckboxChangeAditional = (event) => {
    const { name, checked } = event.target;

    // Actualiza el estado de áreas seleccionadas
    setAdditional_services((prevSelectedAreas) => {
      if (checked) {
        // Agrega el nombre al array si está seleccionado
        return [...prevSelectedAreas, name];
      } else {
        // Elimina el nombre del array si está deseleccionado
        return prevSelectedAreas.filter((area) => area !== name);
      }
    });
  };

  const [data, setData] = useState({
    imageFile: [],
    logo: "",
    name: "",
    address: "",
    district: "",
    phone: "",
    email: "",
    details: "",
    local: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    maximum_per_table: "",
    maximum_person_per_table: "",
    minimum_consumption: "",
    type_of_meals: "",
    average_price: "",
    codeId: datapersonal?.codeId || "",
  });
  console.log(data.local);
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
      formData.append("maximum_per_table", data.maximum_per_table);
      formData.append(
        "maximum_person_per_table",
        data.maximum_person_per_table,
      );
      formData.append("minimum_consumption", data.minimum_consumption);

      formData.append("type_of_meals", data.type_of_meals);
      formData.append("average_price", data.average_price);
      formData.append("logoUrl", data.logo);
      formData.append("facebook", data.facebook);
      formData.append("instagram", data.instagram);
      formData.append("tiktok", data.tiktok);
      formData.append("youtube", data.youtube);
      formData.append("district", data.district);
      formData.append("codeId", data.codeId);

      // Convertir el array de horarios a una cadena JSON
      formData.append("horarios", JSON.stringify(horarios));
      formData.append("area", JSON.stringify(area));
      formData.append(
        "additional_services",
        JSON.stringify(additional_services),
      );

      data.imageFile.forEach((image) => {
        formData.append("imageFile", image);
      });

      await dispatch(postRestaurant(token, formData));
      success();
      setDisabled(false);
    } catch (error) {
      console.error("Error al crear el post:", error);
      // Manejo de error, muestra un mensaje de error, etc.
    } finally {
      setDisabled(false);
      setLoading(false);
      window.location.reload();
    }
  };

  const handleImage = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        /*    if (img.width < 1280  || img.height < 720) {
          alert('La imagen debe tener al menos 1280x720 píxeles.');
        } else { */
        // Si la imagen es válida, la añadimos al estado
        setData((prevState) => ({
          ...prevState,
          imageFile: Array.isArray(prevState.imageFile)
            ? [...prevState.imageFile, file]
            : [file],
        }));
        /*   } */
        URL.revokeObjectURL(objectUrl); // Liberar la URL creada
      };

      img.src = objectUrl;
    });
  }, []);

  const handleLogo = useCallback((acceptedFiles) => {
    setData((prevState) => ({
      ...prevState,
      logo: acceptedFiles[0],
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
  const handleRemoveLogo = (index) => {
    setData((prevState) => ({
      ...prevState,
      logo: "",
    }));
  };
  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token, dispatch]);

  useEffect(() => {
    setData({
      ...data,
      imageFile: datapersonal?.Restaurant?.imageFile || [],
      logo: datapersonal?.Restaurant?.logo || "",
      name: datapersonal?.Restaurant?.name || "",
      address: datapersonal?.Restaurant?.address || "",
      phone: datapersonal?.Restaurant?.phone || "",
      email: datapersonal?.Restaurant?.email || "",
      details: datapersonal?.Restaurant?.details || "",
      local: datapersonal?.Restaurant?.local || "",
      facebook: datapersonal?.Restaurant?.facebook || "",
      instagram: datapersonal?.Restaurant?.instagram || "",
      tiktok: datapersonal?.Restaurant?.tiktok || "",
      youtube: datapersonal?.Restaurant?.youtube || "",
      district: datapersonal?.Restaurant?.district || "",

      maximum_per_table: datapersonal?.Restaurant?.maximum_per_table || "",
      maximum_person_per_table:
        datapersonal?.Restaurant?.maximum_person_per_table || "",
      minimum_consumption: datapersonal?.Restaurant?.minimum_consumption || "",
      type_of_meals: datapersonal?.Restaurant?.type_of_meals || "",
      average_price: datapersonal?.Restaurant?.average_price || "",
      codeId: datapersonal?.codeId || "",
    });
    setHorarios(
      datapersonal?.Restaurant?.horarios || [
        { dia: "Lunes", inicio: "", fin: "", cerrado: false },
        { dia: "Martes", inicio: "", fin: "", cerrado: false },
        { dia: "Miércoles", inicio: "", fin: "", cerrado: false },
        { dia: "Jueves", inicio: "", fin: "", cerrado: false },
        { dia: "Viernes", inicio: "", fin: "", cerrado: false },
        { dia: "Sábado", inicio: "", fin: "", cerrado: false },
        { dia: "Domingo", inicio: "", fin: "", cerrado: false },
      ],
    );
    setAdditional_services(datapersonal?.Restaurant?.additional_services || "");
    setArea(datapersonal?.Restaurant?.area || "");
  }, [datapersonal]);
  const createObjectURL = (file) => {
    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <>
      <div className={styles.bg_btn_disabled_container} data-oid="hf36sku">
        <button
          className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
    ${disabled ? `bg-[#c501e2] cursor-not-allowed ${styles.bg_btn_disabled} ` : `bg-[#500075] hover:bg-[#c501e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.bg_btn_disabled} `}
  `}
          onClick={handleDisabled}
          disabled={disabled}
          data-oid="2.o7i1b"
        >
          Editar información
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.container_form}
        data-oid="0u:ca8o"
      >
        <div data-oid="qh1zp8i">
          {messages && (
            <div className={styles.message} data-oid="6x4lxb2">
              {messages}
            </div>
          )}
        </div>
        <div
          className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8"
          data-oid="m1r8w_."
        >
          <div className={styles.title} data-oid="2fp6jd4">
            <h1 data-oid="_vc5qii">Mi restaurante</h1>
          </div>
          <div
            className={styles.dropzone}
            {...getLogoRootProps()}
            data-oid="a3t2ut:"
          >
            <input
              {...getLogoInputProps()}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
              data-oid="abk_063"
            />

            {isLogoDragActive ? (
              <p
                disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                data-oid="_b4q8oo"
              >
                Suelta el logo aquí...
              </p>
            ) : (
              <div
                disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                data-oid="j.a4p5e"
              >
                <CollectionsIcon className={styles.icons} data-oid="l682idm" />
              </div>
            )}
          </div>
          <div
            className={styles.text}
            disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
            data-oid="wv7qusb"
          >
            <p data-oid="fb2iu3.">
              Arrastra y suelta el logo aquí o haz clic para seleccionar.
            </p>
            <span data-oid="cu9pn2-">Puedes subir un logo.</span>
          </div>
          {data.logo && (
            <div
              className={styles.prev_mini}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
              data-oid="pqkr1t2"
            >
              <img
                src={createObjectURL(data.logo) || data.logo}
                alt="Logo"
                className={styles.logoPreview}
                data-oid="ljw.pre"
              />

              <div className={styles.btn_x} data-oid="kjdc3ee">
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  disabled={
                    datapersonal?.Restaurant?.name ? !disabled : disabled
                  }
                  data-oid="fe3br8s"
                >
                  <strong data-oid="v-q.a0:">X</strong>
                </button>
              </div>
            </div>
          )}

          <div
            className={styles.dropzone}
            {...getRootProps()}
            data-oid="vmr_113"
          >
            <input
              {...getInputProps()}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
              data-oid="pf-e9yj"
            />

            {isDragActive ? (
              <p data-oid="qhtj3wi">Suelta las imágenes aquí...</p>
            ) : (
              <div className={styles.postRestaurant} data-oid="kicjwrg">
                <div data-oid="o_ocg8m">
                  <CollectionsIcon
                    className={styles.icons}
                    data-oid="b9e9re-"
                  />
                </div>
                <div data-oid="rvs:irm">
                  <p data-oid="-zb2y6p">
                    Arrastra y suelta las imágenes aquí o haz clic para
                    seleccionar.
                  </p>
                  <span data-oid="1n:l1yy">
                    Puedes subir hasta 100 imágenes.
                  </span>
                  <span data-oid="ubrsnmn">
                    Las imagenes tienen que tener un minimo de 1280x720 pixeles.
                  </span>
                </div>
              </div>
            )}
          </div>
          <div data-oid="ix426c8">
            <div className={styles.prev_mini} data-oid="v-ckgta">
              {data.imageFile &&
                data.imageFile.map((file, index) => (
                  <div key={index} data-oid="jgvdkun">
                    <div className={styles.btn_x} data-oid="5a0n9ju">
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        disabled={
                          datapersonal?.Restaurant?.name ? !disabled : disabled
                        }
                        data-oid="tpv:sd7"
                      >
                        <strong data-oid="7k-gtch">X</strong>
                      </button>
                    </div>

                    <img
                      src={createObjectURL(file) || file}
                      alt={`Preview ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      data-oid="rnmb5w_"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl sm:mt-20" data-oid="y6pz5bl">
            <div
              className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
              data-oid="_iv8a_."
            >
              <div data-oid=":a7hvh4">
                <label
                  htmlFor="name"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="bg0rrtb"
                >
                  Nombre del restaurante
                </label>
                <div className="mt-2.5" data-oid=".n7b8.:">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="p6uk8kr"
                  />
                </div>
              </div>
              <div data-oid=".zdhxud">
                <label
                  htmlFor="local"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="1jh:b2w"
                >
                  Local
                </label>

                <div className="mt-2.5" data-oid="xgt1psd">
                  <input
                    type="text"
                    name="local"
                    id="local"
                    onChange={(e) =>
                      setData({ ...data, local: e.target.value })
                    }
                    value={data.local}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.local ? !disabled : disabled
                    }
                    data-oid="t:.dqef"
                  />
                </div>
              </div>
              <div className="sm:col-span-2" data-oid="_qv.bed">
                <label
                  htmlFor="address"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid=":701:1x"
                >
                  Dirección
                </label>
                <div className="mt-2.5" data-oid="_h3h.mj">
                  <LoadScript
                    googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                    libraries={["places"]} // Necesario para usar Autocomplete
                    data-oid="o059sup"
                  >
                    {/* Input de autocompletado para direcciones */}
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (autocompleteRef.current = autocomplete)
                      }
                      onPlaceChanged={onPlaceChanged}
                      data-oid="deijvjf"
                    >
                      <input
                        type="text"
                        placeholder="Escribe una dirección"
                        value={data.address}
                        name="address"
                        className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        id="address"
                        onChange={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                        disabled={
                          datapersonal?.Restaurant?.address
                            ? !disabled
                            : disabled
                        }
                        data-oid="ji4wt5s"
                      />
                    </Autocomplete>
                  </LoadScript>
                </div>
              </div>
              <div data-oid="_ioj51d"></div>
              <div className="sm:col-span-2" data-oid="auj-56:">
                <label
                  htmlFor="district"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="6r9_-ap"
                >
                  Distrito
                </label>
                <div className="mt-2.5" data-oid="3z8x-v-">
                  <input
                    type="text"
                    name="district"
                    id="district"
                    onChange={(e) =>
                      setData({ ...data, district: e.target.value })
                    }
                    value={data.district}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="3-34g8k"
                  />
                </div>
              </div>
              <div data-oid="gre_y_t">
                <label
                  htmlFor="phone"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="_y06sdr"
                >
                  Teléfono de contacto
                </label>
                <div className="mt-2.5" data-oid="xp7crj3">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    value={data.phone}
                    className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={
                      datapersonal?.Restaurant?.phone ? !disabled : disabled
                    }
                    data-oid="1wzc7ri"
                  />
                </div>
              </div>
              <div data-oid="yjo2.56">
                <label
                  htmlFor="email"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="bu_3u6b"
                >
                  Email de contacto
                </label>
                <div className="mt-2.5" data-oid="gfwfyw6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.email ? !disabled : disabled
                    }
                    data-oid="4_c_j.5"
                  />
                </div>
              </div>
              <div data-oid="bsokx:o">
                <label
                  htmlFor="facebook"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="nyje73b"
                >
                  Enlace de facebook
                </label>
                <div className="mt-2.5" data-oid="ppbn64g">
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    onChange={(e) =>
                      setData({ ...data, facebook: e.target.value })
                    }
                    value={data.facebook}
                    className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="vgy320h"
                  />
                </div>
              </div>

              <div data-oid="6c70-rs">
                <label
                  htmlFor="instagram"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="6dl0pfs"
                >
                  Enlace de Instagram
                </label>
                <div className="mt-2.5" data-oid="f75dqks">
                  <input
                    type="instagram"
                    name="instagram"
                    id="instagram"
                    onChange={(e) =>
                      setData({ ...data, instagram: e.target.value })
                    }
                    value={data.instagram}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="m8wf57a"
                  />
                </div>
              </div>
              <div data-oid="o5tyamc">
                <label
                  htmlFor="tiktok"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="gyfbdln"
                >
                  Enlace de tiktok
                </label>
                <div className="mt-2.5" data-oid="xfop_v.">
                  <input
                    type="text"
                    name="tiktok"
                    id="tiktok"
                    onChange={(e) =>
                      setData({ ...data, tiktok: e.target.value })
                    }
                    value={data.tiktok}
                    className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="5ovcfjw"
                  />
                </div>
              </div>
              <div data-oid="s57e4_q">
                <label
                  htmlFor="youtube"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="d2-zj-q"
                >
                  Enlace de youtube
                </label>
                <div className="mt-2.5" data-oid=":cvxob_">
                  <input
                    type="youtube"
                    name="youtube"
                    id="youtube"
                    onChange={(e) =>
                      setData({ ...data, youtube: e.target.value })
                    }
                    value={data.youtube}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="aebj-qi"
                  />
                </div>
              </div>

              <div className="sm:col-span-2" data-oid="c.zpbp1">
                <label
                  htmlFor="details"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="524-py4"
                >
                  Descripción del restaurante
                </label>
                <div className="mt-2.5" data-oid="3hhcjct">
                  <textarea
                    name="details"
                    id="details"
                    onChange={(e) =>
                      setData({ ...data, details: e.target.value })
                    }
                    value={data.details}
                    rows="4"
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.details ? !disabled : disabled
                    }
                    required
                    data-oid="3fu9vzl"
                  ></textarea>
                </div>
              </div>

              <div className={styles.checkbox} data-oid="g4hu2y_">
                <div data-oid="3ognzr0">
                  <h3 className={styles.color_text} data-oid="34lh6oh">
                    Horario de atención{" "}
                  </h3>
                  <h3 className={styles.color_text} data-oid="g.rwqsn">
                    (turno cada 30 min){" "}
                  </h3>

                  {horarios.map((horario, index) => (
                    <div
                      key={index}
                      className={styles.formGroup}
                      data-oid="g-44_nn"
                    >
                      <label className={styles.label} data-oid="ysexrch">
                        {horario.dia}
                      </label>
                      {horario.cerrado ? (
                        <span className={styles.cerradoText} data-oid="2v2:a7u">
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
                            disabled={
                              datapersonal?.Restaurant?.horarios
                                ? !disabled
                                : disabled
                            }
                            data-oid=".7iwg4w"
                          />

                          <span data-oid="7zl7y1.">-</span>
                          <input
                            type="time"
                            value={horario.fin}
                            onChange={(e) =>
                              handleInputChange(index, "fin", e.target.value)
                            }
                            className={styles.inputTime}
                            disabled={
                              datapersonal?.Restaurant?.horarios
                                ? !disabled
                                : disabled
                            }
                            data-oid="6dawfq9"
                          />
                        </>
                      )}
                      <input
                        type="checkbox"
                        checked={!horario.cerrado}
                        onChange={() => toggleCerrado(index)}
                        disabled={
                          datapersonal?.Restaurant?.horarios
                            ? !disabled
                            : disabled
                        }
                        data-oid="0p6:gla"
                      />
                    </div>
                  ))}
                </div>
                <div data-oid="n6a1v8c">
                  <div data-oid="io2vy5o">
                    <h3 className={styles.color_text} data-oid="araqky2">
                      Zona
                    </h3>

                    <div className={styles.formGroup} data-oid="r_2f90e">
                      <label className={styles.label_check} data-oid="naee0o:">
                        Salón
                      </label>
                      <input
                        type="checkbox"
                        name="Salón"
                        checked={area.includes("Salón")}
                        onChange={handleCheckboxChange}
                        disabled={
                          datapersonal?.Restaurant?.area ? !disabled : disabled
                        }
                        data-oid="t.6h2a7"
                      />
                    </div>

                    <div className={styles.formGroup} data-oid="nljr5je">
                      <label className={styles.label_check} data-oid="ut37e1c">
                        Exteriores
                      </label>
                      <input
                        type="checkbox"
                        name="Exteriores"
                        checked={area.includes("Exteriores")}
                        onChange={handleCheckboxChange}
                        disabled={
                          datapersonal?.Restaurant?.area ? !disabled : disabled
                        }
                        data-oid="xv9yky5"
                      />
                    </div>

                    <div className={styles.formGroup} data-oid="4q0pgii">
                      <label className={styles.label_check} data-oid="hjvwgxj">
                        Privado
                      </label>
                      <input
                        type="checkbox"
                        name="Privado"
                        checked={area.includes("Privado")}
                        onChange={handleCheckboxChange}
                        disabled={
                          datapersonal?.Restaurant?.area ? !disabled : disabled
                        }
                        data-oid="9do_.9w"
                      />
                    </div>

                    <div className={styles.formGroup} data-oid="b9ppbcl">
                      <label className={styles.label_check} data-oid="h0o8ox3">
                        Barra
                      </label>
                      <input
                        type="checkbox"
                        name="Barra"
                        checked={area.includes("Barra")}
                        onChange={handleCheckboxChange}
                        disabled={
                          datapersonal?.Restaurant?.area ? !disabled : disabled
                        }
                        data-oid="f526i3-"
                      />
                    </div>
                  </div>

                  <div data-oid="q.evpok">
                    <h3 className={styles.color_text} data-oid="fh5m_ta">
                      Servicios adicionales
                    </h3>

                    <div className={styles.formGroup} data-oid="9uv1ljk">
                      <label className={styles.label_check} data-oid="8h5viut">
                        Wifi
                      </label>
                      <input
                        type="checkbox"
                        name="Wifi"
                        checked={additional_services.includes("Wifi")}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="afzjr9b"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid="5pwv2ua">
                      <label className={styles.label_check} data-oid="yx9rfpk">
                        Pet friendly
                      </label>
                      <input
                        type="checkbox"
                        name="Pet friendly"
                        checked={additional_services.includes("Pet friendly")}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="a97gtc7"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid="cop7l8e">
                      <label className={styles.label_check} data-oid="tyf35to">
                        Estacionamiento
                      </label>

                      <input
                        type="checkbox"
                        name="Estacionamiento"
                        checked={additional_services.includes(
                          "Estacionamiento",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="hhv_icb"
                      />
                    </div>

                    <div className={styles.formGroup} data-oid="o__9:4z">
                      <label className={styles.label_check} data-oid="5xciy8a">
                        Rampa discapacitados
                      </label>

                      <input
                        type="checkbox"
                        name="Rampa discapacitados"
                        checked={additional_services.includes(
                          "Rampa discapacitados",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="x.gyz9:"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid=".-r8m1p">
                      <label className={styles.label_check} data-oid="::db_di">
                        Aire acondicionado
                      </label>

                      <input
                        type="checkbox"
                        name="Aire acondicionado"
                        checked={additional_services.includes(
                          "Aire acondicionado",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="o5vbzcj"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid="ykj2ob3">
                      <label className={styles.label_check} data-oid="h10t490">
                        Silla para bebés
                      </label>

                      <input
                        type="checkbox"
                        name="Silla para bebés"
                        checked={additional_services.includes(
                          "Silla para bebés",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="f8d1304"
                      />
                    </div>

                    <div className={styles.formGroup} data-oid="gu1hn2b">
                      <label className={styles.label_check} data-oid="0:ubeax">
                        Cambiador para bebés
                      </label>

                      <input
                        type="checkbox"
                        name="Cambiador para bebés"
                        checked={additional_services.includes(
                          "Cambiador para bebés",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="lo2nb76"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid="hz7h:o.">
                      <label className={styles.label_check} data-oid="ubbic49">
                        Comida vegetariana
                      </label>

                      <input
                        type="checkbox"
                        name="Comida vegetariana"
                        checked={additional_services.includes(
                          "Comida vegetariana",
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="bi.kp0p"
                      />
                    </div>
                    <div className={styles.formGroup} data-oid="zdt0w-:">
                      <label className={styles.label_check} data-oid="9vb57zy">
                        Valet Parking
                      </label>

                      <input
                        type="checkbox"
                        name="Valet Parking"
                        checked={additional_services.includes("Valet Parking")}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                        data-oid="vv_w.g1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.input_label} data-oid="5op0:2e">
              <label
                htmlFor="maximum_per_table"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                data-oid="qq3hku9"
              >
                Máximo de mesas por turno
              </label>
              <div className="mt-2.5" data-oid="bbbxa0_">
                <input
                  type="number"
                  name="maximum_per_table"
                  id="maximum_per_table"
                  onChange={(e) =>
                    setData({ ...data, maximum_per_table: e.target.value })
                  }
                  value={data.maximum_per_table}
                  className="block w-full outline-none rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={1}
                  required
                  disabled={
                    datapersonal?.Restaurant?.maximum_per_table
                      ? !disabled
                      : disabled
                  }
                  data-oid="aa:m66u"
                />
              </div>
            </div>
            <div className={styles.input_label} data-oid="3xm_w:h">
              <label
                htmlFor="maximum_person_per_table"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                data-oid="ng_nabi"
              >
                Máximo de personas por mesa
              </label>
              <div className="mt-2.5" data-oid="asoy1s1">
                <input
                  type="number"
                  name="maximum_person_per_table"
                  id="maximum_person_per_table"
                  onChange={(e) =>
                    setData({
                      ...data,
                      maximum_person_per_table: e.target.value,
                    })
                  }
                  value={data.maximum_person_per_table}
                  className="block w-full outline-none rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  min={1}
                  required
                  disabled={
                    datapersonal?.Restaurant?.maximum_person_per_table
                      ? !disabled
                      : disabled
                  }
                  data-oid=":j-p3g6"
                />
              </div>
            </div>

            <div className={styles.input_label} data-oid="kkzjyk9">
              <label
                htmlFor="minimum_consumption"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                data-oid="sx-_6kv"
              >
                Consumo minimo por persona
              </label>

              <div
                className="relative mt-2 rounded-md shadow-sm"
                data-oid="_s4bd08"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  data-oid="a:g0gpb"
                >
                  <span className="text-gray-500 sm:text-sm" data-oid="4:99utr">
                    S/
                  </span>
                </div>
                <input
                  name="minimum_consumption"
                  id="minimum_consumption"
                  type="number"
                  onChange={(e) =>
                    setData({ ...data, minimum_consumption: e.target.value })
                  }
                  value={data.minimum_consumption}
                  min={1}
                  placeholder="0.00"
                  className="block w-full outline-none rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={
                    datapersonal?.Restaurant?.minimum_consumption
                      ? !disabled
                      : disabled
                  }
                  data-oid="ty0r6g7"
                />
              </div>
            </div>
            <div
              className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ${styles.input_bottom}`}
              data-oid="togf503"
            >
              <div data-oid="ssexuho">
                <label
                  htmlFor="type_of_meals"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="qo_aw-:"
                >
                  Tipo de comidas (Categoria)
                </label>

                <select
                  name="type_of_meals"
                  value={data.type_of_meals}
                  onChange={(e) =>
                    setData({ ...data, type_of_meals: e.target.value })
                  }
                  className={`h-[2.5rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.type_food}`}
                  required
                  disabled={
                    datapersonal?.Restaurant?.type_of_meals
                      ? !disabled
                      : disabled
                  }
                  data-oid="qph4anf"
                >
                  <option value="" data-oid="zfge1br">
                    Seleccionar tipo de comida
                  </option>
                  <option value="Pollo a la brasa" data-oid="-thp89c">
                    Pollo a la brasa
                  </option>
                  <option value="Peruana Criolla" data-oid="m.5dupm">
                    Peruana Criolla
                  </option>
                  <option value="Peruana Andina" data-oid="9xr5bv8">
                    Peruana Andina
                  </option>
                  <option value="Peruana Amazónica" data-oid="k.-x-.0">
                    Peruana Amazónica
                  </option>
                  <option value="Pescados y Mariscos" data-oid=".ek25ee">
                    Pescados y Mariscos
                  </option>
                  <option value="Chifa" data-oid="_ww_fg3">
                    Chifa
                  </option>
                  <option value="Japonesa / Nikkei" data-oid="s2j86qi">
                    Japonesa / Nikkei
                  </option>
                  <option value="Carnes y Parrillas" data-oid="ip46znu">
                    Carnes y Parrillas
                  </option>
                  <option value="Argentina" data-oid="sptjzxm">
                    Argentina
                  </option>
                  <option value="Pizzería" data-oid="55eociu">
                    Pizzería
                  </option>
                  <option value="Italiana" data-oid="21q4l0s">
                    Italiana
                  </option>
                  <option value="Española" data-oid="w.z13z5">
                    Española
                  </option>
                  <option value="India" data-oid="bscyrtu">
                    India
                  </option>
                  <option value="Internacional" data-oid="hprajri">
                    Internacional
                  </option>
                  <option value="Fusión" data-oid=".2.xts0">
                    Fusión
                  </option>
                  <option value="Vegetariana / Orgánica" data-oid="1wqrygr">
                    Vegetariana / Orgánica
                  </option>
                  <option value="Sándwiches / Hamburguesas" data-oid="6u7oyr:">
                    Sándwiches / Hamburguesas
                  </option>
                  <option value="Pastelería" data-oid="lxpezsr">
                    Pastelería
                  </option>
                  <option value="Cafetería" data-oid="0hjdv.4">
                    Cafetería
                  </option>
                  <option value="Heladería" data-oid="1x3t08r">
                    Heladería
                  </option>
                  <option value="Fast Food" data-oid="fqkh3c_">
                    Fast Food
                  </option>
                  <option value="Buffet" data-oid="hp3p5g0">
                    Buffet
                  </option>
                  <option value="Bar" data-oid="pzpwz7v">
                    Bar
                  </option>
                </select>
              </div>
              <div data-oid="3gw0:dy">
                <label
                  htmlFor="average_price"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  data-oid="qzrhv7v"
                >
                  Precio promedio (opcional)
                </label>
                <div
                  className="relative mt-2 rounded-md shadow-sm"
                  data-oid="o.k5.x."
                >
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    data-oid="mejfrox"
                  >
                    <span
                      className="text-gray-500 sm:text-sm"
                      data-oid="xw_efhk"
                    >
                      S/
                    </span>
                  </div>
                  <input
                    name="average_price"
                    id="average_price"
                    type="number"
                    onChange={(e) =>
                      setData({ ...data, average_price: e.target.value })
                    }
                    value={data.average_price}
                    min={1}
                    placeholder="0.00"
                    className="block w-full outline-none rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={
                      datapersonal?.Restaurant?.name ? !disabled : disabled
                    }
                    data-oid="xga1uwz"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10" data-oid="7habz_w">
              <button
                type="submit"
                className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  ${styles.bg_btn}`}
                disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                data-oid="stw8-ns"
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                    data-oid="xlfjc:r"
                  />
                ) : (
                  "Guardar y salir"
                )}
              </button>
              {contextHolder}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
