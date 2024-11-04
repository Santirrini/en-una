import * as React from "react";
import styles from "./AdminComplete.module.css";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AllUsers, dataPersonal, DetailUser } from "../../redux/action";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importa el adaptador de Day.js
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import zIndex from "@mui/material/styles/zIndex";

// Configura dayjs con los plugins necesarios

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2em",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  height: "2.5em",
  border: "1px solid #500075",
  background: "white",
  display: "flex",
  alignItems: "center",
  width: "100% !important",
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "40% !important",
    marginTop: "25px",
  },
  [theme.breakpoints.up("md")]: {
    width: "40% !important",
    marginTop: "25px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "40% !important",
    marginTop: "25px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "relative",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  color: "#500075",
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ handleCloseModal }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/*  <Stack spacing={2} direction="row" sx={{ marginTop: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#500075",
            border: "none",
            ":hover": { backgroundColor: "#500075" },
          }}
          onClick={handleOpen}
        >
          Confirmar Restaurante
        </Button>
        <Button
          onClick={handleCloseModal}
          variant="contained"
          sx={{
            backgroundColor: "red",
            border: "none",
            ":hover": { backgroundColor: "red" },
          }}
        >
          Cancelar
        </Button>
      </Stack> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">¿Quéres dar de alta la cuenta?</h2>

          <Stack spacing={2} direction="row" sx={{ marginTop: 5 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#500075",
                border: "none",
                ":hover": { backgroundColor: "#500075" },
              }}
            >
              Confirmar
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                backgroundColor: "red",
                border: "none",
                ":hover": { backgroundColor: "red" },
              }}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function TableFormPetition() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const detailuser = useSelector((state) => state.detailuser.data);

  console.log(detailuser);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = (userId) => {
    setOpen(true);
    dispatch(DetailUser(userId));
  };
  const handleCloseModal = () => setOpen(false);

  React.useEffect(() => {
    dispatch(AllUsers());
  }, [dispatch]);
  const userRestaurant = allUsers?.filter(
    (data) =>
      data.role === "personal" &&
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredForms = userRestaurant?.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.search_container}>
        <Search className="input-container">
          <input
            placeholder="Buscar por nombre..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </div>

      <div className={styles.order_for_container}></div>
      <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <th>Nombre</th>
              <th>Género</th>
              <th>Fecha de nacimiento</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Departamento</th>
              <th>Provincia</th>
              <th>Distrito</th>
              <th>Estado</th>
            </thead>
            <tbody>
              {filteredForms &&
                filteredForms.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.genre}</td>
                    <td>{data.date}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>

                    <td>{data.departament}</td>
                    <td>{data.province}</td>
                    <td>{data.district}</td>

                    <td
                      className={styles.view_details}
                      onClick={() => handleOpen(data.id)}
                    >
                      Ver detalles
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Fade in={open}>
              <Box className={styles.modal_detail}>
                <Typography id="spring-modal-title" variant="h6" component="h2">
                  Datos del restaurante
                </Typography>
                <ul>
                  <li>
                    <strong>Tipo de cuenta:</strong>{" "}
                    {detailuser && detailuser.role}
                  </li>
                  <li>
                    <strong>Nombre:</strong> {detailuser && detailuser.name}
                  </li>
                  <li>
                    <strong>Apellidos:</strong>{" "}
                    {detailuser && detailuser.lastName}
                  </li>
                  <li>
                    <strong>Género:</strong>{" "}
                    {detailuser && detailuser.genre}
                  </li>
                  <li>
                    <strong>Fecha de nacimiento:</strong> {detailuser && detailuser.date}
                  </li>
                  <li>
                    <strong>Correo:</strong>{" "}
                    {detailuser && detailuser.email}
                  </li>
                  <li>
                    <strong>País:</strong> {detailuser && detailuser.country}
                  </li>
                  <li>
                    <strong>Departamento:</strong> {detailuser && detailuser.departament}
                  </li>

                  <li>
                    <strong>Provincia:</strong>{" "}
                    {detailuser && detailuser.province}
                  </li>
                  <li>
                    <strong>Distrito:</strong>{" "}
                    {detailuser && detailuser.district}
                  </li>
                  <li>
                    <strong>Telefóno:</strong>{" "}
                    {detailuser && detailuser.phone}
                  </li>

                  <li>
                    <strong>Estado:</strong>{" "}
                    <span
                      style={{
                        backgroundColor: "#01AF2FFF",
                        color: "white",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      {detailuser && detailuser.status}
                    </span>
                  </li>
                </ul>
                <ChildModal handleCloseModal={handleCloseModal} />
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </LocalizationProvider>
  );
}
