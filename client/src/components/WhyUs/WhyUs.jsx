import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={styles.contact_container}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          ¿Quienes somos?
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Enuna es una plataforma tecnológica que fue creada para mejorar la experiencia en restaurantes, desde la reserva hasta el día que visitas el local.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Nuestro principal objetivo es renovar y potenciar la manera en la que los  comensales viven su visita a un restaurante, de manera cómoda, segura, dinámica, buscando siempre brindar el mejor servicio al cliente.
          <br />
          Nuestros usuarios podrán buscar y hacer una reserva, no solo de su mesa sino de sus alimentos, en muchos restaurantes de manera fácil y rápida. Los restaurantes podrán conocer y viabilizar la atención de la mejor manera para sus clientes.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Hoy en día, somos un equipo conformado por 10 personas. Juntos, hemos creado un sistema único para la gestión de reservas de todo el proceso para la mejor experiencia gastronómica. Apostamos por un concepto nuevo que facilite y agilice nuestra experiencia, desde el inicio hasta el día de la visita, para beneficio de nuestros comensales. 
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Hemos llegado para dar una nueva vista a la experiencia de visitar los mejores restaurantes del Perú.
          </p>

        </div>

       
    </div>
  );
}
