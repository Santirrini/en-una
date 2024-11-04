import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import styles from "./FrequentQuestions.module.css";

export default function FrequentQuestions() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={styles.frequentquestions_container}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        Preguntas Frecuentes
        </h2>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">

        ¿Qué es Enuna?

        </h3>
        <p className="mt-4 text-lg leading-8 text-gray-600">
        Enuna es un servicio gratuito para realizar reservas en restaurantes. Nuestro compromiso es ayudarte a reservar una mesa en los restaurantes más prestigiosos de la ciudad a la vez que disfrutar de un sinfín de promociones.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        ¿El servicio de Enuna es gratis?

        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Si, realizar una reserva en ENUNA es totalmente gratis; sólo tienes que registrarte.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        ¿Cómo puedo acceder a ENUNA?


        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Puedes ingresar a través de nuestra página web www.enunaapp.com y próximamente descargando desde tu Smartphone nuestras aplicaciones para iPhone y Android.

        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        ¿Cómo funciona ENUNA?

        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Es muy simple, son sólo 3 pasos 
        <br />
        1) Regístrate: Coloca tus datos para crear una cuenta de usuario a través de nuestra página web.
        <br />
        2) Reserva: Busca en ENUNA el restaurante perfecto para ti, selecciona el horario que más te convenga y confirma tu reserva, incluyendo tu pedido.
        <br />
        3) Comenta: Luego de haber disfrutado tu reserva en el restaurante, podrás valorar, compartir y recomendar tu experiencia para que más personas como tú puedan disfrutar de nuestro servicio.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
    
¿Cómo puedo acceder a mi cuenta?


        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
      
Para acceder a tu cuenta, sólo tienes que visitar www.enunaapp.com e introducir el usuario y contraseña con el que te registraste.

        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
    
        ¿Qué tengo que hacer si olvido mi contraseña?

    
    
            </h3>

            <p className="mt-2 text-lg leading-8 text-gray-600">
      
            Si no recuerdas tu contraseña, simplemente haz clic en el enlace de "¿Olvidaste tu contraseña?". Ten en cuenta que tu cuenta no se activará hasta que hayas verificado tu dirección de correo electrónico. Si no has recibido el correo electrónico de verificación, revisa la carpeta de Spam. Si no puedes encontrar el correo electrónico de verificación, por favor, comunícate con nosotros y reactivaremos tu cuenta enseguida.
        </p>

        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
    
        ¿Qué tipo de restaurantes están afiliados a ENUNA?




        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600">
      
        ENUNA es un servicio de reservas online para todos los restaurantes del país. Nuestros restaurantes afiliados aparecen en las principales guías gastronómicas y contamos con una variedad con cocinas de todo tipo y para todo tipo de ocasión.
  </p>
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Cómo puedo hacer una reserva?

  </h3>
  <p className="mt-2 text-lg leading-8 text-gray-600">
  Para hacer una reserva a través de ENUNA debes estar registrado. Sólo tienes que buscar el restaurante de tu preferencia o utilizar los criterios de búsqueda que te ofrece ENUNA. Una vez elegido el restaurante deberás indicar la fecha, la hora y la cantidad de personas con las que asistirás. Una vez confirmado ello, pasas a la carta del restaurante, eligiendo lo que deseas comer ese día. Por último, recibirás un correo de confirmación que te permitirá acceder a los datos de tu reserva.
  </p>
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Cómo puedo confirmar que mi reserva en el restaurante está bien hecha?
  </h3>
  <p className="mt-2 text-lg leading-8 text-gray-600">
    
Cuando realizas una reserva a través de ENUNA, la disponibilidad del restaurante es verificada en tiempo real y te enviamos automáticamente un correo electrónico; a partir de ese momento te espera una mesa en el restaurante.

  </p>
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Debo llamar al restaurante para confirmar mi reserva?
  </h3>
  <p className="mt-2 text-lg leading-8 text-gray-600">
  No es necesario que llames al restaurante; cuando realizas una reserva, el restaurante es avisado automáticamente de tu reserva online.
  </p>
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Si yo tengo alguna petición especial (terraza, una mesa íntima, especificar alergias u otra petición) como puedo transmitirla?
    </h3> 
    <p className="mt-2 text-lg leading-8 text-gray-600">
    En el momento en que realices tu reserva a través de ENUNA podrás especificar las peticiones respecto a tu reserva; así el restaurante podrá conocer, evaluar y atender tu petición si fuera el caso.
    </p>

  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  No he recibido el correo de confirmación de la reserva ¿Qué puedo hacer?

  </h3>

  <p className="mt-2 text-lg leading-8 text-gray-600">
    
Comprueba que no está en la carpeta de Spam. Con el fin de que no tengas problemas a la hora de recibir nuestros correos, por favor agrega contacto@enunaapp.com a tu libreta de direcciones de correo.

  </p>
  
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
    
¿Quién puede dejar su comentario en ENUNA?

  </h3>

  <p className="mt-2 text-lg leading-8 text-gray-600">
  Sólo los usuarios que hayan reservado a través de ENUNA y su reserva haya sido utilizada pueden dejar su opinión. Esto se hace con el propósito que los comentarios sean 100% fiables.

  </p>

  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Cómo dejar un comentario?

  </h3>
  <p className="mt-2 text-lg leading-8 text-gray-600">
    
Después de haber utilizado tu reserva, recibirás un correo electrónico invitándote a compartir tu experiencia; así el restaurante tendrá feedback para seguir mejorando su servicio y otros usuarios de ENUNA podrán utilizarla como referencia cuando elijan un restaurante.

  </p>
  <h3 className="mt-6 text-2xl font-semibold text-gray-900">
  ¿Por qué mi comentario no ha sido publicado?

  </h3>

  <p className="mt-2 text-lg leading-8 text-gray-600">
  Una vez que hayas dejado el comentario acerca de tu experiencia, será revisado por nuestro equipo antes de publicarse en ENUNA. Todos los comentarios son publicados, excepto aquellos que contengan insultos o resulten ofensivos; si el comentario es aprobado será publicado automáticamente para que el resto de nuestros usuarios puedan verlo. De todas formas, aunque tu comentario no sea publicado, el restaurante quedará informado.
  </p>
      </div>
    </div>
  );
}
