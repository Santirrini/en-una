import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Restaurant.module.css";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Restaurant() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.cards_container}>
  
      <Card sx={{ maxWidth: 345,}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.peru.travel/contenido/uploads/foto-interna-maido_638368811062361263.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Maido
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Caracteristicas:</Typography>
            <Typography paragraph>
              Logo de diariocorreo El restaurante peruano Maido es elegido
              nuevamente como el mejor de América Latina : El restaurante
              peruano Maido es elegido el mejor de América Latina | CORREO
              AREQUIPA AYACUCHO CHIMBOTE CUSCO HUANCAVELICA HUANCAYO HUÁNUCO ICA
              LA LIBERTAD LAMBAYEQUE LIMA PIURA PUNO TACNA TUMBES freestar PERÚ
              El restaurante peruano Maido es elegido nuevamente como el mejor
              de América Latina La cocina peruana sigue reinando en América
              Latina por segundo año consecutivo El restaurante peruano Maido es
              elegido nuevamente como el mejor de América Latina El restaurante
              peruano Maido es elegido nuevamente como el mejor de América
              Latina MICHAEL CARRIÓN Actualizado el 31/10/2018, 10:35 a. m. La
              cocina peruana volvió a ocupar los dos primeros lugares en la
              lista de los "50 Mejores Restaurantes de América Latina" con Maido
              y Central, establecimientos que repitieron este 2018 las
              posiciones de cabecera obtenidas el año pasado y que fueron
              anunciadas este martes en Bogotá. Maido, del chef Mitsuharu
              "Micha" Tsumura, fue elegido como el número uno por "fusionar
              perfectamente la gastronomía de Perú y la japonesa", a juicio de
              la publicación "50 Best Restaurants", que organiza los premios.
              Con sede en Lima, Maido ostenta el título nuevamente debido a que
              es "un espacio donde los visitantes pueden degustar platos basados
              en la cocina Nikkei que fusiona sorprendentemente los sabores
              peruanos y japoneses", agregaron los organizadores. El ganador
              prometió "seguir trabajando como hasta ahora, especialmente en
              lograr una cocina con sustentabilidad" y para "dar a conocer
              productos diferentes, poco conocidos, pero que resultan
              maravillosos".
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.peru.travel/Contenido/Uploads/foto-interna-astrid-y-gaston_638368811230078278.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary"
            sx={{ textAlign: "center" }}
          
          >
          Astrid y Gastón
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Caracteristicas:</Typography>
            <Typography paragraph>
            Este es uno de los restaurantes más emblemáticos de la ciudad de Lima. Fundado por el chef Gastón Acurio y su esposa la chef Astrid Gutsche. Este restaurante ofrece una interpretación moderna de la cocina tradicional peruana, ha sido un referente en la promoción de la misma y ha contribuido a su éxito a nivel mundial. Se caracteriza por ofrecer una experiencia gastronómica de alta calidad, con platos innovadores que resaltan los ingredientes locales y la diversidad de la cocina peruana.
            </Typography>
            
          </CardContent>
        </Collapse>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.peru.travel/Contenido/Uploads/foto-interna-kjolle_638368811472604588.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{textAlign: "center"}}>
          Kjolle
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Caracteristicas:</Typography>
            <Typography paragraph>
           

Es dirigido por la reconocida chef Pía León, quien tiene como objetivo destacar los ingredientes peruanos en su máxima expresión, utilizando técnicas modernas y creativas. En la carta de Kjolle, el producto de estación es la estrella y todo puede cambiar muy rápido dependiendo de la disponibilidad de los productos.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
