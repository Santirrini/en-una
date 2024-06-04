import styles from "./PoliticPrivate.module.css";

export default function PoliticPrivate() {
  return (
    <div className={styles.policy_container}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Política de Privacidad
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          En Tu Empresa, nos comprometemos a proteger y respetar su privacidad.
          Esta Política de Privacidad explica cómo recopilamos, usamos,
          compartimos y protegemos la información personal que nos proporciona
          a través de nuestro sitio web.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Información que recopilamos</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Recopilamos información personal que usted nos proporciona
          directamente cuando utiliza nuestro sitio web, incluyendo su nombre,
          dirección de correo electrónico, número de teléfono y cualquier otro
          dato que elija proporcionarnos.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Uso de la información</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Utilizamos su información personal para los siguientes propósitos:
          <ul className="list-disc list-inside mt-2">
            <li>Proveerle nuestros servicios y productos.</li>
            <li>Responder a sus consultas y solicitudes.</li>
            <li>Enviar comunicaciones y actualizaciones relacionadas con su cuenta.</li>
            <li>Mejorar nuestro sitio web y servicios.</li>
            <li>Cumplir con nuestras obligaciones legales y regulatorias.</li>
          </ul>
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Compartir información</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          No compartimos su información personal con terceros, excepto en los
          siguientes casos:
          <ul className="list-disc list-inside mt-2">
            <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio web y negocio.</li>
            <li>Cuando lo requiera la ley o sea necesario para proteger nuestros derechos.</li>
            <li>Con su consentimiento explícito.</li>
          </ul>
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Seguridad de la información</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Implementamos medidas de seguridad técnicas y organizativas
          razonables para proteger su información personal contra el acceso no
          autorizado, la pérdida o la destrucción.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Sus derechos</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Usted tiene derecho a acceder, corregir o eliminar su información
          personal que tenemos. También puede oponerse al procesamiento de su
          información personal y solicitar que limitemos su uso.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Cambios a esta Política de Privacidad</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Podemos actualizar esta Política de Privacidad de vez en cuando. Le
          notificaremos cualquier cambio publicando la nueva política en nuestro
          sitio web. Le recomendamos revisar esta página periódicamente para
          estar al tanto de cualquier cambio.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Contacto</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Si tiene alguna pregunta sobre esta Política de Privacidad, puede
          contactarnos a través de: +1 (234) 567-890 o enviarnos un correo
          electrónico a: info@tuempresa.com.
        </p>
      </div>
    </div>
  );
}
