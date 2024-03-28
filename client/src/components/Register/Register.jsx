import { Link } from 'react-router-dom'
import styles from './Register.module.css'
export default function Register() {
    return (
      <>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
                        <img
              className={styles.logo_login}
              src={require("../../Images/Logo.png")}
              alt="Your Company"
              /> 
              </Link>
            <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ${styles.text}`}>
            Ingreso de usuario
            </h2>
            <h2 className={`mt-10 text-center  font-bold leading-9 tracking-tight text-gray-900 ${styles.text}`}>
            Bienvenido a EnUna
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre Completo
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Correo
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {/* Forgot password? */}
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Telefóno
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {/* Forgot password? */}
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    required
                    className="outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                  />
                </div>
              </div>
  
              <div >
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_success}`}
                >
                Ingresar
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
            Si  tiene una cuenta, haga click{' '}
            <Link to="/auth/login" className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 `}>
              aquí
            </Link>
          </p>
          </div>
        </div>
      </>
    )
  }
  