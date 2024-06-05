import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./FrequentQuestions.module.css";

export default function FrequentQuestions() {
  return (
    <div className={styles.frequentquestions_container}>
      <Accordion defaultExpanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>¿Cómo realizar una reservación?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Para realizar una reservación en un restaurante a través de EN-UNA,
            sigue estos pasos:
            <ul>
              <li>1. Inicia sesión en tu cuenta.</li>
              <li>2. Selecciona el restaurante de tu preferencia.</li>

              <li>3. Revisa los menús disponibles.</li>

              <li>4. Añade los menús deseados al carrito.</li>

              <li>
                5. Dirígete al carrito y haz clic en "Reservar" para completar
                la reservación.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            ¿Se puede contactar directamente con los restaurante?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            En la sección de detalles del restaurante, podrás encontrar la
            siguiente información:
            <ul>
              <li>
                .Horarios de Apertura y Cierre: Consulta los horarios en los que
                el restaurante está abierto para recibirte.
              </li>

              <li>
                .Correo Electrónico: Contáctanos por correo electrónico para
                cualquier consulta o reserva.
              </li>

              <li>
                .Número de Teléfono: Llama directamente al restaurante para
                obtener información inmediata o hacer una reserva.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            ¿Me puedo contactar con la empresa EN-UNA?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Puedes contactarte con EN-UNA de las siguientes maneras:
  <ul>
    <li>
    .Sección de Contacto: Ubicada en la parte inferior de nuestra página web.

    </li>

    <li>
    .Icono de WhatsApp: Haz clic en el icono de WhatsApp para comunicarte directamente con nuestro equipo.

    </li>
  </ul>

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
