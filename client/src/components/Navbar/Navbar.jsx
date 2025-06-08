import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Form, Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal, logout } from "../../redux/action";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import { AllRestaurant } from "../../redux/action";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import Notification from "./Notification";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import FormModal from "./FormModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2em",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  height: "2.5em",
  border: "1px solid gray",
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
  color: "orange",
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
    <animated.div ref={ref} style={style} {...other} data-oid="jdb6fh5">
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
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [scroll, setScroll] = React.useState("body");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSuccess } = state;
  const allrestaurant = useSelector((state) => state.allrestaurant.data);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const open = Boolean(anchorEl);
  const inputRef = React.useRef(null);
  const [openForm, setOpenForm] = React.useState(false);
  const handleOpenForm = (scrollType) => () => {
    setOpenForm(true);
    setScroll(scrollType);
  };
  const handleCloseForm = () => setOpenForm(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [openAlert, setOpenAlert] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openForm) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openForm]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/iniciar-sesión");
    }
    // Aquí podrías redirigir al usuario a la página de inicio de sesión u otra página que consideres adecuada
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !event.target.closest(".input-container")
      ) {
        setSearchTerm(""); // Limpiar el término de búsqueda al hacer clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);
  const drawer = (
    <Box onClick={handleDrawerToggle} data-oid="zv1.jac">
      <Typography variant="h6" sx={{ my: 2 }} data-oid="yn9fa3t">
        <img
          src={require("../../Images/Logo.png")}
          alt="Not found"
          className={styles.logo_mobile}
          data-oid="vt85ufl"
        />
      </Typography>
      <Divider data-oid="88paae." />
      <List data-oid="h51d6lj">
        <Link to="/" data-oid="l07bsok">
          <ListItem disablePadding data-oid="4jom22r">
            <ListItemButton data-oid="0jqh9sg">
              <ListItemIcon data-oid="uc39e1g">
                <HomeIcon data-oid="m3h:pzf" />
              </ListItemIcon>

              <ListItemText primary={"Inicio"} data-oid=":::_99f" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/sobre-nosotros" data-oid="wqciss1">
          <ListItem disablePadding data-oid="5b8sj_x">
            <ListItemButton data-oid="1.1abd:">
              <ListItemIcon data-oid="lfkccgg">
                <InfoIcon data-oid="ppkacdd" />
              </ListItemIcon>
              <ListItemText primary={"Acerca nosotros"} data-oid="brz9gwr" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/contactanos" data-oid="kiairxg">
          <ListItem disablePadding data-oid="cu8ra4t">
            <ListItemButton data-oid="jjxub6h">
              <ListItemIcon data-oid="29tjr3x">
                <ContactsIcon data-oid="pt-4o5c" />
              </ListItemIcon>
              <ListItemText primary={"Contáctanos"} data-oid="_zfbe13" />
            </ListItemButton>
          </ListItem>
        </Link>

        {!token ? (
          <>
            <br data-oid=".1eaw-5" />
            <ListItem
              disablePadding
              onClick={handleOpenForm("body")}
              data-oid=":uhl3xw"
            >
              <ListItemButton data-oid="4qq9jhe">
                <ListItemIcon data-oid="t6gjkt3">
                  <LoginIcon sx={{ color: "white" }} data-oid="kh77wop" />
                </ListItemIcon>
                <ListItemText
                  primary={"¿Eres un Restaurante?"}
                  data-oid="ebxq1dc"
                />
              </ListItemButton>
            </ListItem>
            <Link to="/iniciar-sesión" data-oid="2tvff9z">
              <ListItem
                disablePadding
                className={styles.btn_login}
                data-oid="nj9b4-e"
              >
                <ListItemButton data-oid=".vtsu-c">
                  <ListItemIcon data-oid="bq-6lt2">
                    <LoginIcon sx={{ color: "white" }} data-oid="w:z64pc" />
                  </ListItemIcon>
                  <ListItemText primary={"Iniciar sesión"} data-oid="o2i3rjg" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            {datapersonal.role && datapersonal.role === "administrador" ? (
              <Link
                to="/panel/administrativo/formularios-de-registros"
                data-oid="fikowlh"
              >
                <Divider data-oid="-h51f_x" />

                <ListItem disablePadding data-oid=".h1:k6:">
                  <ListItemButton data-oid="aj1w_33">
                    <ListItemIcon data-oid="0m-146.">
                      <Avatar
                        src={datapersonal.avatar || ""}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: datapersonal.avatar
                            ? ""
                            : datapersonal.backgroundColor,
                        }}
                        data-oid="ca2z:uu"
                      >
                        {!datapersonal.avatar && datapersonal.name?.[0]}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={"Administrar"} data-oid="cwcduxg" />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : (
              <Link to="/perfil" data-oid=".i7-46-">
                <Divider data-oid=".t0x82v" />

                <ListItem disablePadding data-oid="16-.lhw">
                  <ListItemButton data-oid="j_ph-9y">
                    <ListItemIcon data-oid="hh2x4fl">
                      <Avatar
                        src={datapersonal.avatar || ""}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: datapersonal.avatar
                            ? ""
                            : datapersonal.backgroundColor,
                        }}
                        data-oid="yngjqre"
                      >
                        {!datapersonal.avatar && datapersonal.name?.[0]}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={"Perfil"} data-oid="7y:m-d8" />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            {datapersonal.role && datapersonal.role === "restaurante" ? (
              <Link to="/panel" data-oid="gahdgt.">
                <ListItem disablePadding data-oid="tzhexeo">
                  <ListItemButton data-oid="pxpn6iq">
                    <ListItemIcon data-oid="kf1b6lj">
                      <AdminPanelSettingsIcon data-oid="0gul386" />
                    </ListItemIcon>
                    <ListItemText primary={"Administrar"} data-oid="1tpvmk." />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null}

            {datapersonal.role && datapersonal.role === "personal" ? (
              <>
                <Link to="/mis-reservaciones" data-oid="xvi1rj.">
                  <ListItem disablePadding data-oid="n:fc:np">
                    <ListItemButton data-oid="-fx58w_">
                      <ListItemIcon data-oid="2--.3mc">
                        <StorefrontIcon data-oid="1zoqjlp" />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Mis Reservas"}
                        data-oid="ycwkuv9"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : null}

            <ListItem disablePadding onClick={handleLogout} data-oid="bqsqgh.">
              <ListItemButton data-oid="l9gl8u7">
                <ListItemIcon data-oid="1mn783t">
                  <Logout fontSize="small" data-oid="cb5byjz" />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} data-oid="xhsvj6l" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      data-oid="o9qswyf"
    >
      <MenuItem onClick={handleMenuClose} data-oid="a65kcl2">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} data-oid="kv04kpf">
        My account
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      data-oid=":b_jdky"
    >
      <MenuItem data-oid="f.ca7.c">
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          data-oid="ijdi8s."
        >
          <Badge badgeContent={4} color="error" data-oid="7fthuzb">
            <MailIcon data-oid=":f8fpfz" />
          </Badge>
        </IconButton>
        <p data-oid="4oatmaa">Messages</p>
      </MenuItem>
      <MenuItem data-oid="di59i6j">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          data-oid=":-u26rv"
        >
          <Badge badgeContent={17} color="error" data-oid="53c0lf7">
            <NotificationsIcon data-oid="u0g6t3_" />
          </Badge>
        </IconButton>
        <p data-oid="-4stt6i">Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} data-oid="09chy-o">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          data-oid="6dsmq:."
        >
          <AccountCircle data-oid="wgnopgx" />
        </IconButton>
        <p data-oid="6bdu4oy">Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={styles.navbar_container} data-oid="2.kr-zi">
      <Box sx={{ flexGrow: 1 }} data-oid="9t.10sm">
        <div
          position="static"
          sx={{
            background: "transparent",
            color: "#000",
            boxShadow: "0  0  1px",
          }}
          data-oid="a7qbtfy"
        >
          {/* <div className={styles.toolbar} > */}
          <div className={styles.toolbar} data-oid="07jmjtn">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
              data-oid="u3pbwh4"
            >
              <MenuIcon data-oid="2b6iqws" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              data-oid="._7066i"
            >
              <Link to="/" data-oid="jye5lph">
                <img
                  src={require("../../Images/Logo.png")}
                  alt="Logo"
                  className={styles.logo}
                  data-oid="vuuh3fx"
                />
              </Link>
            </Typography>
            <Search className="input-container" data-oid="rui00jg">
              <input
                ref={inputRef}
                placeholder="Buscar..."
                inputProps={{ "aria-label": "search" }}
                className={styles.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-oid="q7xtfuz"
              />

              <SearchIconWrapper data-oid="sfj808c">
                <SearchIcon data-oid="g6_bf02" />
              </SearchIconWrapper>

              {searchTerm.trim() &&
                (() => {
                  const filteredRestaurants =
                    allrestaurant?.flatMap(
                      (data) =>
                        data.restaurants?.filter(
                          (row) =>
                            row.name
                              .toLowerCase()
                              .includes(searchTerm.trim().toLowerCase()) ||
                            row.type_of_meals
                              .toLowerCase()
                              .includes(searchTerm.trim().toLowerCase()) ||
                            row.additional_services?.some((service) =>
                              service
                                .toLowerCase()
                                .includes(searchTerm.trim().toLowerCase()),
                            ) ||
                            row.address
                              .toLowerCase()
                              .includes(searchTerm.trim().toLowerCase()) ||
                            row.area?.some((item) =>
                              item
                                .toLowerCase()
                                .includes(searchTerm.trim().toLowerCase()),
                            ) ||
                            row.Menus?.some((item) =>
                              item.name
                                .toLowerCase()
                                .includes(searchTerm.trim().toLowerCase()),
                            ),
                        ) || [],
                    ) || [];

                  return (
                    <Paper className={styles.paper} data-oid="a3_k-3j">
                      {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((row) => (
                          <MenuList key={row.id} data-oid="z:8zz8c">
                            <Link
                              to={`/detalles/restaurante/${row.id}`}
                              className="title-search-name"
                              data-oid="bdf_460"
                            >
                              <MenuItem data-oid="sp7hamg">
                                <ListItemIcon data-oid=".annpbk">
                                  <Avatar
                                    src={row.imageFile?.[0]}
                                    className={styles.avatar}
                                    data-oid=":ec:hdh"
                                  />
                                </ListItemIcon>
                                <ListItemText data-oid="hj__ut:">
                                  {row.name}
                                  <ListItemText
                                    sx={{ color: "gray" }}
                                    data-oid="g72l-__"
                                  >
                                    {row.address}{" "}
                                    {row.address_optional
                                      ? row.address_optional
                                      : null}
                                  </ListItemText>
                                </ListItemText>
                              </MenuItem>
                            </Link>
                          </MenuList>
                        ))
                      ) : (
                        <MenuList sx={{ height: "6em" }} data-oid="guav2yc">
                          <MenuItem data-oid="sre6o6m">
                            <ListItemText data-oid="4.0vkoe">
                              No se encontraron resultados
                            </ListItemText>
                          </MenuItem>
                        </MenuList>
                      )}
                    </Paper>
                  );
                })()}
            </Search>

            <div className={styles.bg_navbar} data-oid="g:uwjub">
              {token ? (
                <div className={styles.nonemobile} data-oid="6swgdej">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    data-oid="3b7a-9x"
                  >
                    <Tooltip data-oid="4-n95ol">
                      <div
                        style={{ display: "flex", placeItems: "center" }}
                        data-oid="l1gtb89"
                      >
                        <div data-oid="q9v98pm">
                          <strong style={{ color: "#fff" }} data-oid="iei.nok">
                            ¡Hola {datapersonal.name}!
                          </strong>
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            data-oid="65x:0n2"
                          >
                            <Avatar
                              src={datapersonal.avatar || undefined}
                              sx={{
                                width: 50,
                                height: 50,
                                backgroundColor: datapersonal.avatar
                                  ? undefined
                                  : datapersonal.backgroundColor,
                              }}
                              data-oid="lg-ja2h"
                            >
                              {!datapersonal.avatar && datapersonal.name?.[0]}
                            </Avatar>
                          </IconButton>
                        </div>

                        <div data-oid="edx5--d">
                          <Notification data-oid="-0h:fes" />
                        </div>
                      </div>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    data-oid="jbh7hf1"
                  >
                    {datapersonal.role &&
                    datapersonal.role === "administrador" ? (
                      <div data-oid="i4ombpp"></div>
                    ) : (
                      <Link to="/perfil" data-oid="f0ibu_e">
                        <MenuItem onClick={handleClose} data-oid="2f7.xvb">
                          <ListItemIcon data-oid="zu.3ruf">
                            <AccountCircleIcon
                              fontSize="small"
                              data-oid="lxb2g5c"
                            />
                          </ListItemIcon>
                          Perfil
                        </MenuItem>
                      </Link>
                    )}

                    {datapersonal.role &&
                    datapersonal.role === "restaurante" ? (
                      <Link to="/panel" target="_blank" data-oid=":ym5_49">
                        <MenuItem onClick={handleClose} data-oid=".wz1sz6">
                          <ListItemIcon data-oid="zs.jack">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="p_xh71e"
                            />
                          </ListItemIcon>
                          Administrar
                        </MenuItem>
                      </Link>
                    ) : null}
                    {datapersonal.role &&
                    datapersonal.role === "administrador" ? (
                      <Link
                        to="/panel/administrativo/formularios-de-registros"
                        target="_blank"
                        data-oid="-.xwfzi"
                      >
                        <MenuItem onClick={handleClose} data-oid="9sunbsq">
                          <ListItemIcon data-oid="1kg-qpl">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="4q4dqre"
                            />
                          </ListItemIcon>
                          Panel administrativo
                        </MenuItem>
                      </Link>
                    ) : null}

                    {datapersonal.role && datapersonal.role === "personal" ? (
                      <Link to="/mis-reservaciones" data-oid="a:eyhf8">
                        <MenuItem onClick={handleClose} data-oid="ua6pru4">
                          <ListItemIcon data-oid="-grk78y">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="4-jf61o"
                            />
                          </ListItemIcon>
                          Mis reservas
                        </MenuItem>
                      </Link>
                    ) : null}
                    <Divider data-oid="krzak1t" />

                    <MenuItem onClick={handleLogout} data-oid="kxn-11d">
                      <ListItemIcon data-oid="endmnbx">
                        <Logout fontSize="small" data-oid="00z8:y_" />
                      </ListItemIcon>
                      Cerrar sesión
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div
                  style={{ display: "flex", placeItems: "center" }}
                  data-oid="d48mpwz"
                >
                  <div data-oid="9a_7.kr">
                    <span
                      onClick={handleOpenForm("body")}
                      className={styles.modal_form}
                      data-oid="14j._q5"
                    >
                      ¿Eres un Restaurante?
                    </span>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      data-oid="2n-mqsg"
                    >
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          backgroundColor: "transparent",
                          border: "2px solid #fff",
                          color: "gray",
                          fontSize: 50,
                        }}
                        data-oid="55pzkw:"
                      ></Avatar>
                    </IconButton>
                  </div>

                  <Box
                    sx={{ display: { xs: "none", sm: "block" } }}
                    data-oid="1w9kl56"
                  >
                    <Link to="/iniciar-sesión" data-oid="wa:4si-">
                      <Button className={styles.btn_login} data-oid="ld.1h:m">
                        Iniciar sesión
                      </Button>
                    </Link>
                  </Box>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav data-oid="x7u3ate">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            data-oid="2lm1izr"
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>

      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        data-oid="8sumpd3"
      >
        <DialogContent dividers={scroll === "paper"} data-oid="9dkvnk.">
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            data-oid="y7ob-f3"
          >
            <FormModal
              setOpenForm={setOpenForm}
              setOpenAlert={setOpenAlert}
              data-oid="zelwfb:"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions data-oid="rqmnlbi"></DialogActions>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        data-oid="6mn-fk-"
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%", textAlign: "center" }}
          data-oid="hr0fjac"
        >
          Formulario completado exitosamente.
        </Alert>
      </Snackbar>
    </div>
  );
}
