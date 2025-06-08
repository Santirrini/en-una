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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal } from "../../redux/action";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} data-oid="pf45meg" />;
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

  const token = useSelector((state) => state.token);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch]);

  return (
    <div data-oid="dujumtm">
      <div
        className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
        data-oid="j1r3di:"
      >
        <h1 className={styles.text} data-oid="10vcuq:">
          Mi restaurante
        </h1>
        <div className={styles.cards_container} data-oid="71y.ot4">
          <Link to="/restaurantes" data-oid="lni.fng">
            <Card sx={{ maxWidth: 345 }} data-oid="gxr7ywo">
              <CardMedia
                sx={{ position: "relative" }}
                component="img"
                height="194"
                image={datapersonal && datapersonal.imageFile[0]}
                alt="Paella dish"
                data-oid="9indwp7"
              />

              <CardContent data-oid=".e42qo4">
                <Typography sx={{ textAlign: "center" }} data-oid="8:usoq0">
                  {datapersonal && datapersonal.name}
                </Typography>
              </CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", paddingBottom: "2em" }}
                data-oid="12rfr0p"
              >
                {datapersonal && datapersonal.address}
              </Typography>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
