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
import axios from "axios";

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
  const [allUsers, setAllUser] = React.useState([]);
  const detailuser = useSelector((state) => state.detailuser.data);
  const [sortOption, setSortOption] = React.useState("name");
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  console.log(selectedRestaurant?.status)
  const handleOpenUpdate = (restaurant) => {
    setOpenUpdate(true);
    setSelectedRestaurant(restaurant)
  };
  const handleCloseUpdate = () => {

    setOpenUpdate(false);
  }

  const handleOpen = (userId) => {
    setOpen(true);
    dispatch(DetailUser(userId));
  };
  const handleCloseModal = () => setOpen(false);
  const AllRestaurant = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users");
      setAllUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    AllRestaurant();
  }, [selectedRestaurant]);
  const userRestaurant = allUsers?.filter(
    (data) =>
      data.role === "restaurante" &&
      (
        data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.razon_social?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.province?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.district?.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
  );
  
  

  const updateAccount = async () => {
    console.log(selectedRestaurant);
    if (!selectedRestaurant) return;

    // Cambiar el estado al valor opuesto: si está activo, pasa a pendiente y viceversa
    const newStatus = selectedRestaurant.status === "pendiente" ? "activo" : "pendiente";
    console.log(selectedRestaurant.status, newStatus);
    
    try {
      const res = await axios.put(`http://localhost:3001/api/user/${selectedRestaurant.id}`, {
        status: newStatus,
      });
      console.log("Respuesta de la API:", res.data); // Para verificar la respuesta
      setAllUser((prev) =>
        prev.map((restaurant) =>
          restaurant.id === selectedRestaurant.id ? { ...restaurant, status: newStatus } : restaurant
        )
      );
      setOpenUpdate(false);
    } catch (error) {
      console.error("Error al actualizar el estado de la cuenta:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };

 
  const sortedForms = React.useMemo(() => {
    return userRestaurant.sort((a, b) => {
      if (sortOption === "name")
        return (a.name ?? "").localeCompare(b.name ?? "");
      if (sortOption === "razon_social")
        return (a.razon_social ?? "").localeCompare(b.razon_social ?? "");
      if (sortOption === "email")
        return (a.email ?? "").localeCompare(b.email ?? "");
      if (sortOption === "country")
        return (a.country ?? "").localeCompare(b.country ?? "");
      if (sortOption === "department")
        return (a.department ?? "").localeCompare(b.department ?? "");
      if (sortOption === "province")
        return (a.province ?? "").localeCompare(b.province ?? "");
      if (sortOption === "district")
        return (a.district ?? "").localeCompare(b.district ?? "");
      return 0;
    });
  }, [userRestaurant, sortOption]);
 console.log(sortedForms)
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          placeItems: "center",
          gap: "1em",
        }}
      >
        <h4>Ordenar pedido por:</h4>
        <div>
          <select
            name="area"
            className={styles.order}
            required
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Nombre</option>
            <option value="razon_social">Razón social</option>
            <option value="email">Correo electrónico</option>
            <option value="Country">País</option>

            <option value="departament">Departamento</option>
            <option value="province">Porvincia</option>
            <option value="district">Districto</option>
          </select>
        </div>
      </div>
      <div className={styles.order_for_container}></div>
      <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Razón social</th>
                <th>Codigo</th>

                <th>Ruc</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Persona de contacto</th>

                <th>Ver todo los detalles</th>
                <th>Estado</th>
            <th>Cambiar estado de la cuenta</th>

              </tr>
            </thead>
            <tbody>
              {sortedForms &&
                sortedForms.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.razon_social}</td>
                    <td>{data.codeId}</td>

                    <td>{data.ruc}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>

                    <td>{data.contact_person}</td>

                    <td
                      className={styles.view_details}
                      onClick={() => handleOpen(data.id)}
                      >
                      Ver detalles
                    </td>
                      <td>{data.status}</td>

                      <td>
                      <button className={data.status=== "pendiente" ? styles.buttonActive: styles.buttonUpdateAccount} onClick={() => handleOpenUpdate(data)}>
                  {data.status === "pendiente" ? "Activar la cuenta" : "Poner en pendiente"}
                  
                </button>
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
                    <strong>Codigo:</strong> {detailuser && detailuser.code}
                  </li>
                  <li>
                    <strong>Razón Social:</strong>{" "}
                    {detailuser && detailuser.razon_social}
                  </li>
                  <li>
                    <strong>Nombre comercial:</strong>{" "}
                    {detailuser && detailuser.name}
                  </li>
                  <li>
                    <strong>Correo:</strong> {detailuser && detailuser.email}
                  </li>
                  <li>
                    <strong>Persona de contacto:</strong>{" "}
                    {detailuser && detailuser.contact_person}
                  </li>
                  <li>
                    <strong>Cargo:</strong> {detailuser && detailuser.position}
                  </li>
                  <li>
                    <strong>País:</strong> {detailuser && detailuser.country}
                  </li>

                  <li>
                    <strong>Departamento:</strong>{" "}
                    {detailuser && detailuser.departament}
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
                    <strong>Estado:</strong>{" "}
                    <span
                      style={{
                        backgroundColor: detailuser?.status === "pendiente" ? "#AFA901FF" : "#01AF2FFF",
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

          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpdate}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              ¿Estás seguro de que deseas {selectedRestaurant?.status === "pendiente" ? "activar" : "poner en pendiente"} la cuenta?
           
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, display: "flex", gap: "2em" }}>
              <Button variant="contained" onClick={updateAccount} sx={{backgroundColor: "#500075", ":hover": {backgroundColor: "#6d009f"}}}>
                Sí
              </Button>
              <Button variant="contained" onClick={handleCloseUpdate} sx={{backgroundColor: "#ff4d4d", ":hover": {backgroundColor: "#ff3333"}}}>
                No
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
        </div>
      </div>
    </LocalizationProvider>
  );
}
