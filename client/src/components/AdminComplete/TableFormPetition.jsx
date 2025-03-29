import * as React from "react";
import styles from "./AdminComplete.module.css";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  AllForms,
  dataPersonal,
  DetailForm,
  ConfirmForm,
} from "../../redux/action";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
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

function ChildModal({
  handleCloseModal,
  formdetails,
  setOpenAlert,
  setAllform,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (!formdetails || !formdetails.email_contract) {
      console.log("El correo electrónico no está definido.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        ConfirmForm(
          formdetails.email_contract,
          formdetails.id,
          formdetails.busines_name
        )
      );

      
      
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleCloseModal();
      setOpen(false);
      setOpenAlert(true);
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={2} direction="row" sx={{ marginTop: 5 }}>
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
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">¿Quieres aprobar la cuenta?</h2>

          <Stack spacing={2} direction="row" sx={{ marginTop: 5 }}>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                backgroundColor: "#500075",
                border: "none",
                ":hover": { backgroundColor: "#500075" },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                />
              ) : (
                "Confirmar"
              )}
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
  const [allform, setAllform] = React.useState();
  const formdetails = useSelector((state) => state.formdetails.data);
  const [sortOption, setSortOption] = React.useState("hour");
  const token = useSelector((state) => state.token);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleOpen = (formId) => {
    setOpen(true);
    dispatch(DetailForm(formId));
  };
  const handleCloseModal = () => setOpen(false);

  const AllForm = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/forms"
      );
      setAllform(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    AllForm();
  }, []);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  const user =allform &&  allform?.filter((data) => {
    return (
      data.busines_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.email_contract?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.legal_manager?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.legal_representative
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.legal_representative_dni
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      data.local_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.local_phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phone_contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.ruc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  
  const sortedForms = React.useMemo(() => {
    if (!Array.isArray(user)) return []; // Si `user` no es un arreglo, devuelve un arreglo vacío

    return user.sort((a, b) => {
      if (sortOption === "busines_name")
        return (a.busines_name ?? "").localeCompare(b.busines_name ?? "");
      if (sortOption === "email_contract")
        return (a.email_contract ?? "").localeCompare(b.email_contract ?? "");
      if (sortOption === "legal_representative")
        return (a.legal_representative ?? "").localeCompare(
          b.legal_representative ?? ""
        );

      return 0;
    });
  }, [user, sortOption]);

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
            <option value="busines_name">Nombre</option>
            <option value="email_contract">Correo electrónico</option>
            <option value="legal_representative">Representante legal</option>
          </select>
        </div>
      </div>
      <div className={styles.order_for_container}></div>
      <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>N° de RUC</th>
                <th>Razón social</th>
                <th>Nombre del comercio</th>
                <th>Nombre de representante legal</th>
                <th>Número de DNI Representante Legal</th>
                <th>Gerente(a) del local</th>

                <th>Ver todo los detalles</th>
              </tr>
            </thead>
            <tbody>
              {sortedForms &&
                sortedForms.map((data, index) => (
                  <tr key={index}>
                    <td>{data.ruc}</td>
                    <td>{data.reason_social}</td>
                    <td>{data.busines_name}</td>
                    <td>{data.legal_representative}</td>
                    <td>{data.legal_representative_dni}</td>

                    <td>{data.legal_manager}</td>

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
                  Formulario completo
                </Typography>
                <ul>
                  <li>
                    <strong>N° de RUC:</strong> {formdetails && formdetails.ruc}
                  </li>
                  <li>
                    <strong>Razón social:</strong>{" "}
                    {formdetails && formdetails.reason_social}
                  </li>
                  <li>
                    <strong>Nombre del comercio:</strong>{" "}
                    {formdetails && formdetails.busines_name}
                  </li>
                  <li>
                    <strong>Nombre de representante legal:</strong>{" "}
                    {formdetails && formdetails.legal_representative}
                  </li>
                  <li>
                    <strong>Número de DNI Representante Legal:</strong>{" "}
                    {formdetails && formdetails.legal_representative_dni}
                  </li>
                  <li>
                    <strong>Gerente(a) del local:</strong>{" "}
                    {formdetails && formdetails.legal_manager}
                  </li>

                  <li>
                    <strong>Dirección del local:</strong>{" "}
                    {formdetails && formdetails.local_address}
                  </li>
                  <li>
                    <strong>Celular contacto:</strong>{" "}
                    {formdetails && formdetails.phone_contact}
                  </li>
                  <li>
                    <strong>Teléfono local:</strong>{" "}
                    {formdetails && formdetails.local_phone}
                  </li>
                  <li>
                    <strong>Correo para enviar el contrato (Gmail):</strong>{" "}
                    {formdetails && formdetails.email_contract}
                  </li>

                  <li>
                    <strong>Estado:</strong>{" "}
                    <span
                      style={{
                        backgroundColor:
                          formdetails && formdetails.status === "pendiente"
                            ? "#ffae00"
                            : "#0F9200FF",
                        color: "white",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      {formdetails && formdetails.status}
                    </span>
                  </li>
                </ul>
                <ChildModal
                  handleCloseModal={handleCloseModal}
                  formdetails={formdetails}
                  setOpenAlert={setOpenAlert}
                  setAllform={setAllform}
                />
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Formulario aprobado.
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
