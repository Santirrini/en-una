import styles from "./TermsConditions.module.css";

export default function TermsConditions() {
  return (
    <div className={styles.terms_container}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Términos y Condiciones
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Estos Términos y Condiciones rigen el uso de nuestro sitio web y los
          servicios que ofrecemos. Al acceder o utilizar nuestro sitio web,
          usted acepta cumplir con estos términos. Si no está de acuerdo con
          estos términos, por favor no utilice nuestro sitio web.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Uso del sitio web</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Usted se compromete a utilizar nuestro sitio web solo con fines
          legales y de manera que no infrinja los derechos de, restrinja o
          inhiba el uso y disfrute de este sitio web por parte de terceros. Está
          prohibido el comportamiento que cause o pueda causar molestia o
          inconveniente a cualquier persona, la transmisión de contenido
          obsceno u ofensivo o la interrupción del flujo normal de diálogo en
          nuestro sitio web.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Propiedad intelectual</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Todo el contenido presente en este sitio web, incluyendo textos,
          gráficos, logotipos, iconos, imágenes y software, es propiedad de Tu
          Empresa o de nuestros proveedores de contenido y está protegido por
          las leyes de propiedad intelectual. No está permitido reproducir,
          duplicar, copiar, vender, revender o explotar de cualquier manera
          ningún contenido sin nuestro consentimiento expreso por escrito.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Enlaces a otros sitios web</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Nuestro sitio web puede contener enlaces a sitios web de terceros que
          no son operados por nosotros. No tenemos control sobre el contenido y
          las prácticas de estos sitios, y no podemos aceptar responsabilidad
          por sus respectivas políticas de privacidad.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Limitación de responsabilidad</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          En la medida en que lo permita la ley, Tu Empresa no será responsable
          por ningún daño indirecto, incidental, especial, consecuente o
          punitivo, o cualquier pérdida de beneficios o ingresos, ya sea
          incurridos directamente o indirectamente, o cualquier pérdida de
          datos, uso, fondo de comercio u otras pérdidas intangibles resultantes
          de (i) su acceso o uso o incapacidad de acceder o utilizar el sitio;
          (ii) cualquier conducta o contenido de cualquier tercero en el sitio.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Cambios a estos Términos y Condiciones</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Publicaremos los cambios en esta página y, si los
          cambios son significativos, proporcionaremos un aviso más destacado.
          Le recomendamos revisar estos Términos y Condiciones periódicamente
          para estar al tanto de cualquier cambio.
        </p>
        <h3 className="mt-6 text-2xl font-semibold text-gray-900">Contacto</h3>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Si tiene alguna pregunta sobre estos Términos y Condiciones, puede
          contactarnos a través de: +1 (234) 567-890 o enviarnos un correo
          electrónico a: info@tuempresa.com.
        </p>
      </div>
    </div>
  );
}
