import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./FrequentQuestions.module.css";

export default function FrequentQuestions() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={styles.frequentquestions_container} data-oid=".n.w_zo">
      <div className="mx-auto max-w-2xl" data-oid="u5_.djt">
        <h2
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center"
          data-oid="w-frkwy"
        >
          Preguntas Frecuentes
        </h2>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="oztf_s4"
        >
          ¿Qué es Enuna?
        </h3>
        <p className="mt-4 text-lg leading-8 text-gray-600" data-oid="4tbm-l:">
          Enuna es un servicio gratuito para realizar reservas en restaurantes.
          Nuestro compromiso es ayudarte a reservar una mesa en los restaurantes
          más prestigiosos de la ciudad a la vez que disfrutar de un sinfín de
          promociones.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="3kvjv89"
        >
          ¿El servicio de Enuna es gratis?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="glo4b4.">
          Si, realizar una reserva en ENUNA es totalmente gratis; sólo tienes
          que registrarte.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="6.bp7e:"
        >
          ¿Cómo puedo acceder a ENUNA?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="-g71_cp">
          Puedes ingresar a través de nuestra página web www.enunaapp.com y
          próximamente descargando desde tu Smartphone nuestras aplicaciones
          para iPhone y Android.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="oy:k6ak"
        >
          ¿Cómo funciona ENUNA?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="by34b:r">
          Es muy simple, son sólo 3 pasos
          <br data-oid="r:t9_3f" />
          1) Regístrate: Coloca tus datos para crear una cuenta de usuario a
          través de nuestra página web.
          <br data-oid="9j1s:9j" />
          2) Reserva: Busca en ENUNA el restaurante perfecto para ti, selecciona
          el horario que más te convenga y confirma tu reserva, incluyendo tu
          pedido.
          <br data-oid="rinnsaz" />
          3) Comenta: Luego de haber disfrutado tu reserva en el restaurante,
          podrás valorar, compartir y recomendar tu experiencia para que más
          personas como tú puedan disfrutar de nuestro servicio.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="sxik4fs"
        >
          ¿Cómo puedo acceder a mi cuenta?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid=":s02frj">
          Para acceder a tu cuenta, sólo tienes que visitar www.enunaapp.com e
          introducir el usuario y contraseña con el que te registraste.
        </p>

        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="v8_l3kh"
        >
          ¿Qué tengo que hacer si olvido mi contraseña?
        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="q19a--a">
          Si no recuerdas tu contraseña, simplemente haz clic en el enlace de
          "¿Olvidaste tu contraseña?". Ten en cuenta que tu cuenta no se
          activará hasta que hayas verificado tu dirección de correo
          electrónico. Si no has recibido el correo electrónico de verificación,
          revisa la carpeta de Spam. Si no puedes encontrar el correo
          electrónico de verificación, por favor, comunícate con nosotros y
          reactivaremos tu cuenta enseguida.
        </p>

        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="3q1-zld"
        >
          ¿Qué tipo de restaurantes están afiliados a ENUNA?
        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="bdf0kfz">
          ENUNA es un servicio de reservas online para todos los restaurantes
          del país. Nuestros restaurantes afiliados aparecen en las principales
          guías gastronómicas y contamos con una variedad con cocinas de todo
          tipo y para todo tipo de ocasión.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="ine4e5x"
        >
          ¿Cómo puedo hacer una reserva?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="zr7hggr">
          Para hacer una reserva a través de ENUNA debes estar registrado. Sólo
          tienes que buscar el restaurante de tu preferencia o utilizar los
          criterios de búsqueda que te ofrece ENUNA. Una vez elegido el
          restaurante deberás indicar la fecha, la hora y la cantidad de
          personas con las que asistirás. Una vez confirmado ello, pasas a la
          carta del restaurante, eligiendo lo que deseas comer ese día. Por
          último, recibirás un correo de confirmación que te permitirá acceder a
          los datos de tu reserva.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="1j7kgo5"
        >
          ¿Cómo puedo confirmar que mi reserva en el restaurante está bien
          hecha?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="w3.jbhz">
          Cuando realizas una reserva a través de ENUNA, la disponibilidad del
          restaurante es verificada en tiempo real y te enviamos automáticamente
          un correo electrónico; a partir de ese momento te espera una mesa en
          el restaurante.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="eja8-mo"
        >
          ¿Debo llamar al restaurante para confirmar mi reserva?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="uwhw8ba">
          No es necesario que llames al restaurante; cuando realizas una
          reserva, el restaurante es avisado automáticamente de tu reserva
          online.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="lpb6mtp"
        >
          ¿Si yo tengo alguna petición especial (terraza, una mesa íntima,
          especificar alergias u otra petición) como puedo transmitirla?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="v0r8zfk">
          En el momento en que realices tu reserva a través de ENUNA podrás
          especificar las peticiones respecto a tu reserva; así el restaurante
          podrá conocer, evaluar y atender tu petición si fuera el caso.
        </p>

        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="y33mzg7"
        >
          No he recibido el correo de confirmación de la reserva ¿Qué puedo
          hacer?
        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="wi4u2mj">
          Comprueba que no está en la carpeta de Spam. Con el fin de que no
          tengas problemas a la hora de recibir nuestros correos, por favor
          agrega contacto@enunaapp.com a tu libreta de direcciones de correo.
        </p>

        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="8rggrdr"
        >
          ¿Quién puede dejar su comentario en ENUNA?
        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="ob:l84b">
          Sólo los usuarios que hayan reservado a través de ENUNA y su reserva
          haya sido utilizada pueden dejar su opinión. Esto se hace con el
          propósito que los comentarios sean 100% fiables.
        </p>

        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="ec0_.7o"
        >
          ¿Cómo dejar un comentario?
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="v9xt2sy">
          Después de haber utilizado tu reserva, recibirás un correo electrónico
          invitándote a compartir tu experiencia; así el restaurante tendrá
          feedback para seguir mejorando su servicio y otros usuarios de ENUNA
          podrán utilizarla como referencia cuando elijan un restaurante.
        </p>
        <h3
          className="mt-6 text-2xl font-semibold text-gray-900"
          data-oid="8l97vr6"
        >
          ¿Por qué mi comentario no ha sido publicado?
        </h3>

        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="s5rc386">
          Una vez que hayas dejado el comentario acerca de tu experiencia, será
          revisado por nuestro equipo antes de publicarse en ENUNA. Todos los
          comentarios son publicados, excepto aquellos que contengan insultos o
          resulten ofensivos; si el comentario es aprobado será publicado
          automáticamente para que el resto de nuestros usuarios puedan verlo.
          De todas formas, aunque tu comentario no sea publicado, el restaurante
          quedará informado.
        </p>
      </div>
    </div>
  );
}
