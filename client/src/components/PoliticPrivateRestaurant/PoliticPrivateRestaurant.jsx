import styles from "./PoliticPrivateRestaurant.module.css";

export default function PoliticPrivateRestaurant() {
  return (
    <div className={styles.policy_container}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Política de Reservas en Restaurantes
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Bienvenido a nuestra Política de Reservas. <br />
          Sus Reservas en la Plataforma se encuentran sujetas a los lineamientos
          indicados en el siguiente documento. Los términos en mayúscula que no
          se encuentren aquí definidos tendrán el significado que se les
          atribuya en los Términos de Uso.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        1. PROCESO DE RESERVA
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Para realizar una Reserva en un Restaurante a través de nuestra Plataforma debe estar previamente registrado como usuario de la Plataforma y tramitar su Reserva en www.enunaapp.com, ingresando la información que se requiera, tal como, a modo de referencia más no limitativo, la fecha, hora y, número de comensales beneficiarios de la Reserva. Luego de ingresada la información, se le brindará la carta para realizar el pedido de lo que desee comer. Verificaremos la disponibilidad del Restaurante y, se enviará una confirmación de la Reserva a la dirección de correo electrónico que hubiese ingresado al momento de crear su cuenta en la Plataforma. Al realizar una Reserva a través de nuestra Plataforma, usted se compromete a asistir a dicha Reserva en la fecha y hora seleccionada, pues, es su pedido el que estará ya cancelado, de no concurrir en el horario indicado, pasados 10 minutos, su pedido estará para recojo en tienda pues usted ya lo canceló.
<br />
Usted es el único responsable de verificar, aceptar y confirmar previamente a la Reserva los términos y condiciones de la misma, y que la información ingresada en la Plataforma sea la correcta, debiendo incluir: sus datos personales, sus datos de contacto (incluyendo un teléfono de contacto válido y un correo electrónico válido) y todos los datos referidos a la Reserva de la mesa y de los alimentos previamente seleccionados; cualquier error en la información ingresada que genere alguna inconsistencia para acreditar la reserva nos exime de responsabilidad sobre dichos extremos.

        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        2. ¿A QUIÉN LE RESERVAS?

        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Nosotros solo somos intermediarios entre usted y los Restaurantes, ya que solo brindamos la gestión de Reservas en los Restaurantes a través de nuestra Plataforma. No determinamos los costos, ni verificamos la calidad de los productos que los restaurantes expenden, ni las condiciones en que ellos brindan sus servicios, todo reclamo por estos extremos y todos aquellos relacionados con la prestación del servicio del restaurante podrán ser reclamados directamente a ellos por sus propios canales de atención.
<br />
En el caso de no concurrir en la fecha y hora programadas para la reserva, usted podrá comunicarse directamente con el restaurante para coordinar y gestionar el recojo de los alimentos que ha pagado, según los plazos que el restaurante pueda establecer para que los alimentos mantengan la posibilidad de su ingesta.

        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        3. MODIFICACIÓN, CANCELACIÓN E INASISTENCIA A LA RESERVA
        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        A través de nuestra Plataforma, usted podrá realizar cualquier modificación en su Reserva sobre la fecha, hora y número de comensales con una anticipación sujeta a las políticas de cada Restaurante, quedando la confirmación de la Reserva sujeta a que haya espacios disponibles en el Restaurante. En el más breve plazo le comunicaremos la confirmación de la modificación de su Reserva. Si no puede modificar su Reserva a través de la Plataforma, por favor comuníquese directamente con el Restaurante con una anticipación no menor de tres (3) horas al horario fijado en la Reserva, mencionando (i) que la Reserva que desea modificar fue gestionada a través de nuestra Plataforma, (ii) su nombre completo y (iii) los datos de la Reserva que desea modificar.
        <br />
        
Si desea cancelar su Reserva, deberá hacerlo con una anticipación no menor a 1 día al fijado en la Reserva. La cancelación se podrá realizar llamando a los teléfonos del Restaurante, dado que dicha gestión ya se coordina directamente con ellos. Si no pudo asistir a su Reserva y no hizo previamente la cancelación, le enviaremos un correo electrónico para informarle que se ha registrado en nuestro sistema la inasistencia a dicha Reserva, pues su pedido si estará listo para recojo en la fecha y horario que se reservó.

        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
        4. DATOS DE USUARIO Y DE LA RESERVA

        </h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Los datos que usted proporciona al registrarse como usuario y/o al realizar una reserva deben ser verídicos. Su cuenta de usuario en nuestra Plataforma se dará de baja si detectamos que alguno de los siguientes datos proporcionados es falso: 1) Sus datos personales, ya sea su primer nombre o su apellido; 2) Sus datos de contacto, ya sea su número de teléfono de contacto o dirección de correo electrónico; 3) En el caso de reservas para otros, los datos personales y/o de contacto de las personas por las cuales está reservando; 4) En el caso de nuestro programa de recomendados, si detectamos que alguna de las cuentas creadas es falsa.
        </p>
        
      </div>
    </div>
  );
}
