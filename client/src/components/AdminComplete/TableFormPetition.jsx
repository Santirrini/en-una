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
    <animated.div ref={ref} style={style} {...other} data-oid="x8h9wsz">
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
          formdetails.busines_name,
        ),
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
      <Stack
        spacing={2}
        direction="row"
        sx={{ marginTop: 5 }}
        data-oid="72ksp4f"
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#500075",
            border: "none",
            ":hover": { backgroundColor: "#500075" },
          }}
          onClick={handleOpen}
          data-oid="w0m2kje"
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
          data-oid="5vrsdz."
        >
          Cancelar
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        data-oid="6mvhen9"
      >
        <Box sx={{ ...style, width: 400 }} data-oid="_:b5nst">
          <h2 id="child-modal-title" data-oid="phc8l78">
            ¿Quieres aprobar la cuenta?
          </h2>

          <Stack
            spacing={2}
            direction="row"
            sx={{ marginTop: 5 }}
            data-oid="vaq.i93"
          >
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                backgroundColor: "#500075",
                border: "none",
                ":hover": { backgroundColor: "#500075" },
              }}
              data-oid="3cxte8b"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                  data-oid="jvoxivg"
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
              data-oid="ky5:ea0"
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
        "https://en-una-production.up.railway.app/api/forms",
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
  const user =
    allform &&
    allform?.filter((data) => {
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
          b.legal_representative ?? "",
        );

      return 0;
    });
  }, [user, sortOption]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} data-oid="g995n_3">
      <div className={styles.search_container} data-oid="-q.62iy">
        <Search className="input-container" data-oid="_abr.7r">
          <input
            placeholder="Buscar por nombre..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-oid="ic4g7at"
          />

          <SearchIconWrapper data-oid="5uqgrg9">
            <SearchIcon data-oid="o4o1_s:" />
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
        data-oid="caaqt0n"
      >
        <h4 data-oid="-.kzv6t">Ordenar pedido por:</h4>
        <div data-oid="93ptv4g">
          <select
            name="area"
            className={styles.order}
            required
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            data-oid="hc76pnn"
          >
            <option value="busines_name" data-oid="9vg4hia">
              Nombre
            </option>
            <option value="email_contract" data-oid="bi7bsb_">
              Correo electrónico
            </option>
            <option value="legal_representative" data-oid="91oede0">
              Representante legal
            </option>
          </select>
        </div>
      </div>
      <div className={styles.order_for_container} data-oid="dldsubg"></div>
      <div
        className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8"
        data-oid="cd4lycu"
      >
        <div className={styles.boletin_container} data-oid="iwl-ahj">
          <table className={styles.boletin_table} data-oid="7nt1m_v">
            <thead data-oid="tuxpp5h">
              <tr data-oid="68g:w.a">
                <th data-oid="hwfokz7">N° de RUC</th>
                <th data-oid="3f58tkh">Razón social</th>
                <th data-oid="b60vvn2">Nombre del comercio</th>
                <th data-oid="m.lam29">Nombre de representante legal</th>
                <th data-oid="udmqba:">Número de DNI Representante Legal</th>
                <th data-oid="_.fytl.">Gerente(a) del local</th>

                <th data-oid="3e2esrl">Ver todo los detalles</th>
              </tr>
            </thead>
            <tbody data-oid="ph--cp0">
              {sortedForms &&
                sortedForms.map((data, index) => (
                  <tr key={index} data-oid="cfgvdd7">
                    <td data-oid="0adkn7-">{data.ruc}</td>
                    <td data-oid="04:pjr2">{data.reason_social}</td>
                    <td data-oid="x9ijlh7">{data.busines_name}</td>
                    <td data-oid="u1u1az9">{data.legal_representative}</td>
                    <td data-oid="l9b3m1q">{data.legal_representative_dni}</td>

                    <td data-oid="m9qm522">{data.legal_manager}</td>

                    <td
                      className={styles.view_details}
                      onClick={() => handleOpen(data.id)}
                      data-oid="ygyibbx"
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
            data-oid="kbl0xno"
          >
            <Fade in={open} data-oid="hbc_x.x">
              <Box className={styles.modal_detail} data-oid="vk8w7wb">
                <Typography
                  id="spring-modal-title"
                  variant="h6"
                  component="h2"
                  data-oid="he2p3ib"
                >
                  Formulario completo
                </Typography>
                <ul data-oid="72idetu">
                  <li data-oid="16xl6l4">
                    <strong data-oid="j56p5.v">N° de RUC:</strong>{" "}
                    {formdetails && formdetails.ruc}
                  </li>
                  <li data-oid="m2jx2gl">
                    <strong data-oid="23bx.4f">Razón social:</strong>{" "}
                    {formdetails && formdetails.reason_social}
                  </li>
                  <li data-oid="x356xdp">
                    <strong data-oid="3ddlvht">Nombre del comercio:</strong>{" "}
                    {formdetails && formdetails.busines_name}
                  </li>
                  <li data-oid="4zxuc23">
                    <strong data-oid="n-v6t7i">
                      Nombre de representante legal:
                    </strong>{" "}
                    {formdetails && formdetails.legal_representative}
                  </li>
                  <li data-oid="6mrwt0g">
                    <strong data-oid="8q4bnv2">
                      Número de DNI Representante Legal:
                    </strong>{" "}
                    {formdetails && formdetails.legal_representative_dni}
                  </li>
                  <li data-oid="3ucl:94">
                    <strong data-oid="1nh0r0c">Gerente(a) del local:</strong>{" "}
                    {formdetails && formdetails.legal_manager}
                  </li>

                  <li data-oid="cyes7_n">
                    <strong data-oid="y-.0v5o">Dirección del local:</strong>{" "}
                    {formdetails && formdetails.local_address}
                  </li>
                  <li data-oid="7mq89ho">
                    <strong data-oid="c4_i._k">Celular contacto:</strong>{" "}
                    {formdetails && formdetails.phone_contact}
                  </li>
                  <li data-oid="x53a2-w">
                    <strong data-oid="jfr4yxo">Teléfono local:</strong>{" "}
                    {formdetails && formdetails.local_phone}
                  </li>
                  <li data-oid="ridb01j">
                    <strong data-oid=".xks.za">
                      Correo para enviar el contrato (Gmail):
                    </strong>{" "}
                    {formdetails && formdetails.email_contract}
                  </li>

                  <li data-oid="z9.sm2z">
                    <strong data-oid="j:83b7.">Estado:</strong>{" "}
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
                      data-oid="tbt:zrm"
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
                  data-oid="9-a508c"
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
        data-oid="36qlwaw"
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          data-oid="efrh9td"
        >
          Formulario aprobado.
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
