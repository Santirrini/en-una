import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../../redux/action";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./Login.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Importa tanto el proveedor como el login

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  const { pathname } = useLocation();
  const [errorGoogle, setErrorGoogle] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const setError = (error) => {
    messageApi.open({
      type: "error",
      content:error,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  
  useEffect(() => {
    
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingError(false);
  
    try {
      if (email && password) {
        console.log("Intentando iniciar sesión...");
        
        // Realiza la solicitud de inicio de sesión
        const authResult = await dispatch(login(email, password));
  
        if (authResult && authResult.userId) {
          localStorage.setItem("userId", authResult.userId);
          await mergeCarts(authResult.userId);
          navigate("/");
        }
      } else {
        throw new Error("Por favor, ingresa email y contraseña");
      }
    } catch (err) {
      console.error("Error capturado en handleSubmit:", err);
  
    
  
        if (err.response.status === 403) {
          setError("El usuario está en pendiente");
        } else if (err.response.status  === 404) {
          setError( "Usuario no encontrado");
        } else if (err.response.status  === 400) {
          setError("Contraseña incorrecta");
        } else {
          setError( "Error del servidor, por favor intenta más tarde");
        }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoginSuccess = async (response) => {
    try {
      // Llamamos a la acción redux para manejar el login
      const data = await dispatch(loginGoogle(response));

      if (data) {
        console.log("Login exitoso:", data);
        navigate("/");
      } else {
        setErrorGoogle("Error al autenticar el usuario");
      }
    } catch (error) {
      setErrorGoogle("Error al autenticar el usuario");
      console.error("Login failed:", error);
    }
  };
  const handleLoginError = (error) => {
    setErrorGoogle("Error en la autenticación");
    console.error(error);
  };
  const mergeCarts = async (userId) => {
    // Obtener el carrito del usuario autenticado
    const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Fusionar los carritos
    const mergedCart = [...userCart];

    // Guardar el carrito fusionado en localStorage bajo la clave del usuario
    localStorage.setItem(`cart_${userId}`, JSON.stringify(mergedCart));

    // Eliminar el carrito anónimo
    localStorage.removeItem("cart");
  };
  return (
    <>
      <div
        className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${styles.login_container}`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ${styles.text}`}
          >
            Iniciar sesión
          </h2>
          <h2
            className={`mt-10 text-center font-bold leading-9 tracking-tight text-gray-900 ${styles.text}`}
          >
            Bienvenido a EnUna
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
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
                  <Link
                    to="/recuperar-cuenta"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado la contraseña?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeTwoTone style={{ color: "#500075" }} />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_success}`}
              >
                {loading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  "Iniciar sesión"
                )}
              </button>
                <div className={styles.btnGoogle}>

              <GoogleOAuthProvider clientId="962025699097-20o18d8bj0tf8gj0qj3q96acrmvtr720.apps.googleusercontent.com" >
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                    styles={{width: "100%"}}
                    />
              </GoogleOAuthProvider>
                    </div>

            </div>
            {contextHolder}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Si no tiene una cuenta, haga click{" "}
            <Link
              to="/registrarse"
              className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500`}
            >
              aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
