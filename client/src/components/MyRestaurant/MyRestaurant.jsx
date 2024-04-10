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
import styles from "./Myrestaurant.module.css";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal } from "../../redux/action";


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

export default function Cards() {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const datapersonal = useSelector((state) => state.datapersonal.Restaurant);
  console.log(datapersonal)

  const token = useSelector((state) => state.token);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch]);

  return (
    <div>

         <h1 className={styles.text}>
    Todos los productos
   </h1>
    <div className={styles.cards_container}>
   <Link to= "/restaurantes">


      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
        sx={{ position: "relative"}}
          component="img"
          height="194"
          image={datapersonal && datapersonal.imageFile[0]}
          alt="Paella dish"
        />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>{datapersonal && datapersonal.name}</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
        >
          Criollas y mariscos
        </Typography>
      </Card>
      </Link>
     

    </div>
    </div>

  );
}
