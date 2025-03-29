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
console.log(datapersonal)
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
        }
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
        const district = addressComponents.find(component =>
          component.types.includes("administrative_area_level_2")
        );
        const locality = addressComponents.find(component =>
          component.types.includes("locality")
        );
  
        // Actualizar el estado con la dirección, distrito y localidad
        setData({
          ...data,
          address: place.formatted_address,
          district: district ? district.long_name : '',
          local: locality ? locality.long_name : '', // Asegúrate de usar `long_name` para localidad
        });
  
      } else {
        console.error('No se pudo obtener la información de la dirección.');
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
    codeId: datapersonal?.codeId || ""
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
        data.maximum_person_per_table
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
        JSON.stringify(additional_services)
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
      maximum_person_per_table: datapersonal?.Restaurant?.maximum_person_per_table || "",
      minimum_consumption: datapersonal?.Restaurant?.minimum_consumption || "",
      type_of_meals: datapersonal?.Restaurant?.type_of_meals || "",
      average_price: datapersonal?.Restaurant?.average_price || "",
      codeId: datapersonal?.codeId || ""

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
      ]
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
      <div className={styles.bg_btn_disabled_container}>

      <button

  className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
    ${disabled ? `bg-[#c501e2] cursor-not-allowed ${styles.bg_btn_disabled} ` : `bg-[#500075] hover:bg-[#c501e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.bg_btn_disabled} `}
  `}
  onClick={handleDisabled}
  disabled={disabled}
>
  Editar información
</button>

    

    
      </div>
      <form onSubmit={handleSubmit} className={styles.container_form}>
      <div>


{messages && (
  <div className={styles.message}>
    {messages}
  </div>
)}
</div>
        <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
          <div className={styles.title}>
            <h1>Mi restaurante</h1>
          </div>
          <div className={styles.dropzone} {...getLogoRootProps()}>
            <input
              {...getLogoInputProps()}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
            />
            {isLogoDragActive ? (
              <p disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}>
                Suelta el logo aquí...
              </p>
            ) : (
              <div disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}>
                <CollectionsIcon className={styles.icons} />
              </div>
            )}
          </div>
          <div
            className={styles.text}
            disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
          >
            <p>Arrastra y suelta el logo aquí o haz clic para seleccionar.</p>
            <span>Puedes subir un logo.</span>
          </div>
          {data.logo && (
            <div
              className={styles.prev_mini}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
            >
              <img
                src={createObjectURL(data.logo) || data.logo}
                alt="Logo"
                className={styles.logoPreview}
              />
              <div className={styles.btn_x}>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                >
                  <strong>X</strong>
                </button>
              </div>
            </div>
          )}

          <div className={styles.dropzone} {...getRootProps()}>
            <input
              {...getInputProps()}
              disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
            />
            {isDragActive ? (
              <p>Suelta las imágenes aquí...</p>
            ) : (
              <div className={styles.postRestaurant}>
                <div>
                  <CollectionsIcon className={styles.icons} />
                </div>
                <div>
                  <p>
                    Arrastra y suelta las imágenes aquí o haz clic para
                    seleccionar.
                  </p>
                  <span>Puedes subir hasta 100 imágenes.</span>
                  <span>
                    Las imagenes tienen que tener un minimo de 1280x720 pixeles.
                  </span>
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
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                      >
                        <strong>X</strong>
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
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
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
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="local"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Local
                </label>

                <div className="mt-2.5">
                  <input 
                  type="text"
                  name="local"
                  id="local"
                  onChange={(e) =>
                    setData({ ...data, local: e.target.value })
                  }
                  value={data.local}
                
                  className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                  disabled={datapersonal?.Restaurant?.local ? !disabled : disabled}
                   />
                 
               
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Dirección
                </label>
                <div className="mt-2.5">
               

                  <LoadScript
                    googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                    libraries={["places"]} // Necesario para usar Autocomplete
                  >
                    {/* Input de autocompletado para direcciones */}
                    <Autocomplete
                      onLoad={(autocomplete) =>
                        (autocompleteRef.current = autocomplete)
                      }
                      onPlaceChanged={onPlaceChanged}
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
                        disabled={datapersonal?.Restaurant?.address ? !disabled : disabled}
                      />
                    </Autocomplete>
                  </LoadScript>
                </div>
              </div>
              <div></div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="district"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Distrito
                </label>
                <div className="mt-2.5">
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
                    disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Teléfono de contacto
                </label>
                <div className="mt-2.5">
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
                    disabled={datapersonal?.Restaurant?.phone ? !disabled : disabled}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Email de contacto
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={datapersonal?.Restaurant?.email ? !disabled : disabled}
                  />
                </div>
              </div>
                <div>
                  <label
                    htmlFor="facebook"
                    className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  >
                    Enlace de facebook
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      onChange={(e) =>
                        setData({ ...data, facebook: e.target.value })
                      }
                      value={data.facebook}
                      className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="instagram"
                    className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  >
                    Enlace de Instagram
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="instagram"
                      name="instagram"
                      id="instagram"
                      onChange={(e) =>
                        setData({ ...data, instagram: e.target.value })
                      }
                      value={data.instagram}
                      className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="tiktok"
                    className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  >
                    Enlace de tiktok
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="tiktok"
                      id="tiktok"
                      onChange={(e) =>
                        setData({ ...data, tiktok: e.target.value })
                      }
                      value={data.tiktok}
                      className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="youtube"
                    className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                  >
                    Enlace de youtube
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="youtube"
                      name="youtube"
                      id="youtube"
                      onChange={(e) =>
                        setData({ ...data, youtube: e.target.value })
                      }
                      value={data.youtube}
                      className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
                    />
                  </div>
                </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="details"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Descripción del restaurante
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="details"
                    id="details"
                    onChange={(e) =>
                      setData({ ...data, details: e.target.value })
                    }
                    value={data.details}
                    rows="4"
                    className="block w-full outline-none rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled={datapersonal?.Restaurant?.details ? !disabled : disabled}
                    required
                  ></textarea>
                </div>
              </div>

              <div className={styles.checkbox}>
                <div>
                  <h3 className={styles.color_text}>Horario de atención </h3>
                  <h3 className={styles.color_text}>(turno cada 30 min) </h3>

                  {horarios.map((horario, index) => (
                    <div key={index} className={styles.formGroup}>
                      <label className={styles.label}>{horario.dia}</label>
                      {horario.cerrado ? (
                        <span className={styles.cerradoText}>Cerrado</span>
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
                              datapersonal?.Restaurant?.horarios ? !disabled : disabled
                            }
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={horario.fin}
                            onChange={(e) =>
                              handleInputChange(index, "fin", e.target.value)
                            }
                            className={styles.inputTime}
                            disabled={
                              datapersonal?.Restaurant?.horarios ? !disabled : disabled
                            }
                          />
                        </>
                      )}
                      <input
                        type="checkbox"
                        checked={!horario.cerrado}
                        onChange={() => toggleCerrado(index)}
                        disabled={datapersonal?.Restaurant?.horarios ? !disabled : disabled}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div>
                    <h3 className={styles.color_text}>Zona</h3>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Salón</label>
                      <input
                        type="checkbox"
                        name="Salón"
                        checked={area.includes("Salón")}
                        onChange={handleCheckboxChange}
                        disabled={datapersonal?.Restaurant?.area ? !disabled : disabled}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Exteriores</label>
                      <input
                        type="checkbox"
                        name="Exteriores"
                        checked={area.includes("Exteriores")}
                        onChange={handleCheckboxChange}
                        disabled={datapersonal?.Restaurant?.area ? !disabled : disabled}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Privado</label>
                      <input
                        type="checkbox"
                        name="Privado"
                        checked={area.includes("Privado")}
                        onChange={handleCheckboxChange}
                        disabled={datapersonal?.Restaurant?.area ? !disabled : disabled}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Barra</label>
                      <input
                        type="checkbox"
                        name="Barra"
                        checked={area.includes("Barra")}
                        onChange={handleCheckboxChange}
                        disabled={datapersonal?.Restaurant?.area ? !disabled : disabled}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className={styles.color_text}>Servicios adicionales</h3>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Wifi</label>
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
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>Pet friendly</label>
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
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Estacionamiento
                      </label>

                      <input
                        type="checkbox"
                        name="Estacionamiento"
                        checked={additional_services.includes(
                          "Estacionamiento"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Rampa discapacitados
                      </label>

                      <input
                        type="checkbox"
                        name="Rampa discapacitados"
                        checked={additional_services.includes(
                          "Rampa discapacitados"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Aire acondicionado
                      </label>

                      <input
                        type="checkbox"
                        name="Aire acondicionado"
                        checked={additional_services.includes(
                          "Aire acondicionado"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Silla para bebés
                      </label>

                      <input
                        type="checkbox"
                        name="Silla para bebés"
                        checked={additional_services.includes(
                          "Silla para bebés"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Cambiador para bebés
                      </label>

                      <input
                        type="checkbox"
                        name="Cambiador para bebés"
                        checked={additional_services.includes(
                          "Cambiador para bebés"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
                        Comida vegetariana
                      </label>

                      <input
                        type="checkbox"
                        name="Comida vegetariana"
                        checked={additional_services.includes(
                          "Comida vegetariana"
                        )}
                        onChange={handleCheckboxChangeAditional}
                        disabled={
                          datapersonal?.Restaurant?.additional_services
                            ? !disabled
                            : disabled
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label_check}>
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.input_label}>
              <label
                htmlFor="maximum_per_table"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
              >
                Máximo de mesas por turno
              </label>
              <div className="mt-2.5">
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
                    datapersonal?.Restaurant?.maximum_per_table ? !disabled : disabled
                  }
                />
              </div>
            </div>
            <div className={styles.input_label}>
              <label
                htmlFor="maximum_person_per_table"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
              >
                Máximo de personas por mesa
              </label>
              <div className="mt-2.5">
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
                />
              </div>
            </div>

            <div className={styles.input_label}>
              <label
                htmlFor="minimum_consumption"
                className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
              >
                Consumo minimo por persona
              </label>

              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">S/</span>
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
                    datapersonal?.Restaurant?.minimum_consumption ? !disabled : disabled
                  }
                />
              </div>
            </div>
            <div
              className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ${styles.input_bottom}`}
            >
              <div>
                <label
                  htmlFor="type_of_meals"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
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
                  disabled={datapersonal?.Restaurant?.type_of_meals ? !disabled : disabled}
                >
                  <option value="">Seleccionar tipo de comida</option>
                  <option value="Pollo a la brasa">Pollo a la brasa</option>
                  <option value="Peruana Criolla">Peruana Criolla</option>
                  <option value="Peruana Andina">Peruana Andina</option>
                  <option value="Peruana Amazónica">Peruana Amazónica</option>
                  <option value="Pescados y Mariscos">
                    Pescados y Mariscos
                  </option>
                  <option value="Chifa">Chifa</option>
                  <option value="Japonesa / Nikkei">Japonesa / Nikkei</option>
                  <option value="Carnes y Parrillas">Carnes y Parrillas</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Pizzería">Pizzería</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Española">Española</option>
                  <option value="India">India</option>
                  <option value="Internacional">Internacional</option>
                  <option value="Fusión">Fusión</option>
                  <option value="Vegetariana / Orgánica">
                    Vegetariana / Orgánica
                  </option>
                  <option value="Sándwiches / Hamburguesas">
                    Sándwiches / Hamburguesas
                  </option>
                  <option value="Pastelería">Pastelería</option>
                  <option value="Cafetería">Cafetería</option>
                  <option value="Heladería">Heladería</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Bar">Bar</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="average_price"
                  className={`block text-sm font-semibold leading-6  ${styles.color_text}`}
                >
                  Precio promedio (opcional)
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">S/</span>
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
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  ${styles.bg_btn}`}
                disabled={datapersonal?.Restaurant?.name ? !disabled : disabled}
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
          </div>
        </div>
      </form>
    </>
  );
}
