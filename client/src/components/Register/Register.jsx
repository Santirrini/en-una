import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { RegisterUser } from "../../redux/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    lastName: "",
    razon_social: "",
    ruc: "",
    contact_person: "",
    position: "",
    address: "",
  
    genre: "",
    date: "",
    country: "",
    province: "",
    district: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiError, contextHolderError] = message.useMessage();

  const Success = () => {
    messageApi.open({
      type: "success",
      content: "Registrado correctamente",
    });
  };
  const Error = () => {
    messageApiError.open({
      type: "error",
      content: "El email ya esta registrado",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true);
    try {
      const registers = await dispatch(RegisterUser(data));
      if (registers) {
        Success();
        setTimeout(async () => {
          navigate("/iniciar-sesión");
        }, 2000);
      }
    } catch (error) {
      Error();
      console.log(error);
    } finally {
      setLoadingSuccess(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.register_container}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Avatar alt="Remy Sharp" className={styles.logo} />
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ${styles.textTitle}`}
          >
            Crear usuario
          </h2>
          <h2
            className={`mt-10 text-center  font-bold leading-9 tracking-tight text-gray-900 ${styles.textSubTitle}`}
          >
            Bienvenido a EnUna
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tipo de cuenta
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  type="text"
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                >
                  <option value="">Seleccione un tipo de cuenta</option>

                  <option value="personal">personal</option>
                  <option value="restaurante">restaurante</option>
                </select>
              </div>
            </div>
            {data.role === "personal" || data.role === "" ? (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Escribe tu nombre"
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Apellidos
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Escribe tu apellido"
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="genre"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Género
                  </label>
                  <div className="mt-2">
                    <select
                      id="genre"
                      name="genre"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    >
                      <option value="">Seleccione tu genero</option>

                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Prefiero no contestar">Prefiero no contestar</option>

                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de nacimiento
                  </label>
                  <div className="mt-2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Correo
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Correo electrónico"
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    País
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="país"
                      id="country"
                      name="country"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Provincia
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="provincia"
                      id="province"
                      name="province"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Distrito
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Distrito"
                      id="district"
                      name="district"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Telefóno
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {/* Forgot password? */}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      placeholder="Ingresa tu número de telefóno"
                      autoComplete="phone"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
           
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {/* Forgot password? */}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="**********"
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                  <div style={{display: 'flex', gap: "1em", marginTop: "1em"}}>
                    <input type="checkbox"  name="" id=""
                      onChange={handleChange}
                      className={styles.input}
                    required
                    />
                    <label htmlFor="">

                    Aceptar terminos y condiciones
                    </label>
                  </div>
                </div>
              </>
            ) : null}

            {data.role === "restaurante" ? (
              <>
                <div>
                  <label
                    htmlFor="razon_social"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Razón Social
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Escribe tu razón social"
                      id="razon_social"
                      name="razon_social"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre comercial
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Escribe tu nombre comercial"
                      id="name"
                      name="name"
                      type="name"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="ruc"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      RUC
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {/* Forgot password? */}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="ruc"
                      name="ruc"
                      type="ruc"
                      placeholder="Ingresa tu RUC"
                      autoComplete="ruc"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
              {/*   <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dirección
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Correo electrónico"
                      id="address"
                      name="address"
                      type="emaaddressil"
                      onChange={handleChange}
                      autoComplete="address"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div> */}

             
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Correo
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Correo electrónico"
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Telefóno
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {/* Forgot password? */}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      placeholder="Ingresa tu número de telefóno"
                      autoComplete="phone"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact_person"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Persona de contacto
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Persona de contacto"
                      id="contact_person"
                      name="contact_person"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cargo
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Cargo"
                      id="position"
                      name="position"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    País
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="País"
                      id="country"
                      name="country"
                      type="country"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Provincia
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Provincia"
                      id="province"
                      name="province"
                      type="province"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Distrito
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Distrito"
                      id="district"
                      name="district"
                      type="text"
                      onChange={handleChange}
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div>
          
             
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {/* Forgot password? */}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="**********"
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>

                  <div style={{display: 'flex', gap: "1em", marginTop: "1em"}}>
                    <input type="checkbox"  name="" id=""
                      onChange={handleChange}
                      className={styles.input}
                    required
                    />
                    <label htmlFor="">

                    Aceptar terminos y condiciones
                    </label>
                  </div>
                </div>
              </>
            ) : null}
            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_success}`}
              >
                {loadingSuccess ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  "Registrarse"
                )}
              </button>
            </div>
            {contextHolder}
            {contextHolderError}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Si tiene una cuenta, haga click{" "}
            <Link
              to="/iniciar-sesión"
              className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 `}
            >
              aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
