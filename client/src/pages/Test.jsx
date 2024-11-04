/* import * as React from "react";
import styles from "./AdminComplete.module.css";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AllForms, dataPersonal, DetailForm } from "../../redux/action";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import zIndex from "@mui/material/styles/zIndex";

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
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) onEnter(null, true);
    },
    onRest: () => {
      if (!open && onExited) onExited(null, true);
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

export default function TableFormPetition() {
  const dispatch = useDispatch();
  const allform = useSelector((state) => state.allform.data);
  const formdetails = useSelector((state) => state.formdetails.data);
  const token = useSelector((state) => state.token);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = (formId) => {
    setOpen(true);
    dispatch(DetailForm(formId));
  };
  const handleCloseModal = () => setOpen(false);

  React.useEffect(() => {
    dispatch(AllForms());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const filteredForms = allform?.filter((data) =>
    data.reason_social.toLowerCase().includes(searchTerm.toLowerCase())
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
              <tr>
                <th>N° de RUC</th>
                <th>Razón social</th>
                <th>Nombre del comercio</th>
                <th>Nombre de representante legal</th>
                <th>Número de DNI Representante Legal</th>
                <th>Gerente(a) del local</th>
                <th>Estado</th>
                <th>Ver todo los detalles</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms &&
                filteredForms.map((data, index) => (
                  <tr key={index}>
                    <td>{data.ruc}</td>
                    <td>{data.reason_social}</td>
                    <td>{data.busines_name}</td>
                    <td>{data.legal_representative}</td>
                    <td>{data.legal_representative_dni}</td>
                    <td>{data.legal_manager}</td>
                    <td>{data.status}</td>
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
        </div>
      </div>
    </LocalizationProvider>
  );
}
 */