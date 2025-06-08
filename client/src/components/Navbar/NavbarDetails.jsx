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
import { Link, useNavigate } from "react-router-dom";
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

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2em",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  height: "2.5em",
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

export default function NavbarDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const allrestaurant = useSelector((state) => state.allrestaurant.data);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const open = Boolean(anchorEl);
  const inputRef = React.useRef(null);
  const userId = useSelector((state) => state.userId);

  const [items, setItems] = React.useState([]);
  const [cartItemCount, setCartItemCount] = React.useState(0);
  React.useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setItems(cartItems);
    setCartItemCount(cartItems.length);
  }, [cartItemCount, userId]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    <Box onClick={handleDrawerToggle} data-oid="5z6h4l7">
      <Typography variant="h6" sx={{ my: 2 }} data-oid="nku7z-7">
        <img
          src={require("../../Images/Logo.png")}
          alt="Not found"
          className={styles.logo_mobile}
          data-oid="q.2bdpn"
        />
      </Typography>
      <Divider data-oid="6:q5fy3" />
      <List data-oid="jfe8z_9">
        <Link to="/" data-oid="o.oce.1">
          <ListItem disablePadding data-oid="gnbhdny">
            <ListItemButton data-oid="hgx2iuc">
              <ListItemIcon data-oid="yi73cb6">
                <HomeIcon data-oid="oppze43" />
              </ListItemIcon>

              <ListItemText primary={"Inicio"} data-oid="6yjq2fe" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/sobre-nosotros" data-oid="5.-unlh">
          <ListItem disablePadding data-oid="pjzons5">
            <ListItemButton data-oid="7aktv78">
              <ListItemIcon data-oid="aw2bl6y">
                <InfoIcon data-oid="o9omcb3" />
              </ListItemIcon>
              <ListItemText primary={"Acerca nosotros"} data-oid="wkcaatl" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/contactanos" data-oid="vqr_kz7">
          <ListItem disablePadding data-oid="w1vzrl2">
            <ListItemButton data-oid="-df9m5a">
              <ListItemIcon data-oid="i-y.oas">
                <ContactsIcon data-oid="ubjl:0s" />
              </ListItemIcon>
              <ListItemText primary={"Contáctanos"} data-oid="7xf1jof" />
            </ListItemButton>
          </ListItem>
        </Link>

        {!token ? (
          <>
            <br data-oid="6gc4jgf" />
            <Link to="/iniciar-sesión" data-oid="7wven7n">
              <ListItem
                disablePadding
                className={styles.btn_login}
                data-oid="pf5vab7"
              >
                <ListItemButton data-oid="0gtcjqk">
                  <ListItemIcon data-oid="rvym6mm">
                    <LoginIcon sx={{ color: "white" }} data-oid="fojwmkf" />
                  </ListItemIcon>
                  <ListItemText primary={"Iniciar sesión"} data-oid="uqci4.i" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/perfil" data-oid="x568y.h">
              <Divider data-oid=".3wyc94" />

              <ListItem disablePadding data-oid="-p--wyv">
                <ListItemButton data-oid="8_m_84.">
                  <ListItemIcon data-oid="z93cuq4">
                    <Avatar
                      src={datapersonal.avatar || undefined}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: datapersonal.avatar
                          ? undefined
                          : datapersonal.backgroundColor,
                      }}
                      data-oid="6l03jnu"
                    >
                      {!datapersonal.avatar && datapersonal.name?.[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} data-oid="41_3q-r" />
                </ListItemButton>
              </ListItem>
            </Link>
            {datapersonal.role && datapersonal.role === "restaurante" ? (
              <Link to="/administrar" data-oid=":0i3gjw">
                <ListItem disablePadding data-oid=":3huh-r">
                  <ListItemButton data-oid="rs7-5er">
                    <ListItemIcon data-oid="iuhmb_a">
                      <AdminPanelSettingsIcon data-oid="c--ll5t" />
                    </ListItemIcon>
                    <ListItemText primary={"Administrar"} data-oid=":5kab3c" />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null}

            {datapersonal.role && datapersonal.role === "personal" ? (
              <>
                <Link to="/panel" data-oid="6z.r1ha">
                  <ListItem disablePadding data-oid="j-kj5rq">
                    <ListItemButton data-oid="-:xjzsy">
                      <ListItemIcon data-oid="ixt54.m">
                        <StorefrontIcon data-oid="bba8x4u" />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Mis reservas"}
                        data-oid="dwfsa.j"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : null}

            <ListItem disablePadding onClick={handleLogout} data-oid="2amgtu0">
              <ListItemButton data-oid="-0nqwsr">
                <ListItemIcon data-oid="jjo:rs2">
                  <Logout fontSize="small" data-oid="wwkqg4f" />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} data-oid="g_t-361" />
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
      data-oid="nb:j:5h"
    >
      <MenuItem onClick={handleMenuClose} data-oid="5v:1tfw">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} data-oid="-40bg18">
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
      data-oid="_sbulhr"
    >
      <MenuItem data-oid="7:5gwnh">
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          data-oid="b0gz_7:"
        >
          <Badge badgeContent={4} color="error" data-oid="1.i953x">
            <MailIcon data-oid="5pwbshl" />
          </Badge>
        </IconButton>
        <p data-oid="sf:lb6e">Messages</p>
      </MenuItem>
      <MenuItem data-oid="o999mhc">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          data-oid="j0qlhhx"
        >
          <Badge badgeContent={17} color="error" data-oid="t9gknsz">
            <NotificationsIcon data-oid="rq6bsna" />
          </Badge>
        </IconButton>
        <p data-oid="2:rjwta">Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} data-oid="j0yxxb.">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          data-oid="cfpaj-8"
        >
          <AccountCircle data-oid="cy6.h9l" />
        </IconButton>
        <p data-oid="9w4.ebp">Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={styles.navbar_container} data-oid="bcu_ckd">
      <Box sx={{ flexGrow: 1 }} data-oid="t33azjh">
        <div
          position="static"
          sx={{
            background: "transparent",
            color: "#000",
            boxShadow: "0  0  1px",
          }}
          data-oid="hedrpqo"
        >
          {/* <div className={styles.toolbar} > */}
          <div className={styles.toolbar} data-oid="f9nnf.4">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
              data-oid="wu:4hyl"
            >
              <MenuIcon data-oid="9-jtt6u" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              data-oid="bfn:ahp"
            >
              <Link to="/" data-oid="_oi7ssj">
                <img
                  src={require("../../Images/Logo.png")}
                  alt="Logo"
                  className={styles.logo}
                  data-oid="lce_ro7"
                />
              </Link>
            </Typography>
            <Search data-oid="tkwzzxe"></Search>

            <div className={styles.bg_navbar} data-oid="kv81x67">
              {token ? (
                <div className={styles.nonemobile} data-oid="7kj2tsp">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    data-oid="uyt-goh"
                  >
                    <Tooltip data-oid="_d_q-vm">
                      <div
                        style={{ display: "flex", placeItems: "center" }}
                        data-oid=":jxk:0q"
                      >
                        <div data-oid="3-q98r3">
                          <strong style={{ color: "#fff" }} data-oid="zfla.fm">
                            ¡Hola {datapersonal.name}!
                          </strong>
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            data-oid=".hs6sf."
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
                              data-oid="5l3tz47"
                            >
                              {!datapersonal.avatar && datapersonal.name?.[0]}
                            </Avatar>
                          </IconButton>
                        </div>

                        <div data-oid="j3vfg78">
                          <Notification data-oid="n_iz:-z" />
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
                    data-oid="lusg9p."
                  >
                    {datapersonal.role &&
                    datapersonal.role === "administrador" ? (
                      <div data-oid="h7gb_zj"></div>
                    ) : (
                      <Link to="/perfil" data-oid="qd:jro8">
                        <MenuItem onClick={handleClose} data-oid="pud:2gl">
                          <ListItemIcon data-oid="b4vkgo2">
                            <AccountCircleIcon
                              fontSize="small"
                              data-oid="vhfl9jk"
                            />
                          </ListItemIcon>
                          Perfil
                        </MenuItem>
                      </Link>
                    )}

                    {datapersonal.role &&
                    datapersonal.role === "restaurante" ? (
                      <Link to="/panel" target="_blank" data-oid="ok1suv2">
                        <MenuItem onClick={handleClose} data-oid="laxu:v7">
                          <ListItemIcon data-oid="ne34qvi">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="qeiy-hw"
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
                        data-oid="q4wv6tj"
                      >
                        <MenuItem onClick={handleClose} data-oid="1_i6.7g">
                          <ListItemIcon data-oid="nc9biph">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="7npleav"
                            />
                          </ListItemIcon>
                          Panel administrativo
                        </MenuItem>
                      </Link>
                    ) : null}
                    {datapersonal.role && datapersonal.role === "personal" ? (
                      <Link to="/mis-reservaciones" data-oid="f6ar27n">
                        <MenuItem onClick={handleClose} data-oid="9vxeg.m">
                          <ListItemIcon data-oid="h5_w-p-">
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              data-oid="dx.:1hg"
                            />
                          </ListItemIcon>
                          Mis reservas
                        </MenuItem>
                      </Link>
                    ) : null}
                    <Divider data-oid="_p9s.v_" />

                    <MenuItem onClick={handleLogout} data-oid="qxtclu0">
                      <ListItemIcon data-oid="k9hch6a">
                        <Logout fontSize="small" data-oid="m2b_j_3" />
                      </ListItemIcon>
                      Cerrar sesión
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div className={styles.nonemobile} data-oid="36q1s06">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    data-oid="jwgg8j2"
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
                      data-oid="gph4ae0"
                    ></Avatar>
                  </IconButton>
                  <Box
                    sx={{ display: { xs: "none", sm: "block" } }}
                    data-oid="e68hv09"
                  >
                    <Link to="/iniciar-sesión" data-oid="c2pbe0x">
                      <Button className={styles.btn_login} data-oid="4g7:-ow">
                        Iniciar sesión
                      </Button>
                    </Link>
                  </Box>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav data-oid="mkn85gm">
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
            data-oid="02w-q9g"
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
}
