import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <div className={styles.contact_container}>
      <div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¿Quiénes somos?
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            En [Nombre de la Empresa], nos dedicamos a conectar a los amantes de
            la buena comida con los mejores restaurantes de la ciudad. Nuestra misión
            es facilitar la búsqueda y reserva de experiencias gastronómicas únicas,
            brindando a nuestros usuarios acceso a una amplia variedad de opciones culinarias.
          </p>
        </div>
   <br />

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contáctanos
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Estamos aquí para ayudarte a encontrar tu próxima gran experiencia gastronómica.
            Si tienes alguna pregunta, sugerencia o simplemente quieres saber más sobre
            nosotros, no dudes en [métodos de contacto, por ejemplo, "contactarnos a través
            de nuestro formulario en línea, enviarnos un correo electrónico a
            contacto@empresa.com o llamarnos al (123) 456-7890"].
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Gracias por confiar en [Nombre de la Empresa]. ¡Esperamos ayudarte a descubrir y
            disfrutar de los mejores restaurantes de la ciudad!
          </p>
        </div>
      </div>
    </div>
  );
}
