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
import styles from "./AdminComplete.module.css";
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

export default function Navbar() {
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
    <Box onClick={handleDrawerToggle} data-oid="hjjb0vh">
      <Typography variant="h6" sx={{ my: 2 }} data-oid="o16n6p3">
        <img
          src={require("../../Images/Logo.png")}
          alt="Not found"
          className={styles.logo_mobile}
          data-oid="6exmcry"
        />
      </Typography>
      <Divider data-oid="2ugw810" />
      <List data-oid="4b00kl2">
        <Link to="formularios-de-registros" data-oid="d-jj3cq">
          <ListItem disablePadding data-oid="1bc_bcf">
            <ListItemButton data-oid="ejwgtkq">
              <ListItemText
                primary={"Formularios de registros"}
                data-oid="q4t:sve"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="usuarios-registrados" data-oid="cvg64wd">
          <ListItem disablePadding data-oid="92l9050">
            <ListItemButton data-oid=".:ecnqk">
              <ListItemText
                primary={"Usuarios registrados"}
                data-oid="gm-s-jg"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="restaurantes-registrados" data-oid="3kenzfs">
          <ListItem disablePadding data-oid="ozgmt26">
            <ListItemButton data-oid="ygooq.s">
              <ListItemText
                primary={"Restaurantes registrados"}
                data-oid="leyiizb"
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="pedidos" data-oid="y6q.c_d">
          <ListItem disablePadding data-oid="3_3lap8">
            <ListItemButton data-oid="k-zn6-c">
              <ListItemText primary={"Pedidos"} data-oid=":cldt.y" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="publicar-carrusel" data-oid="bls2vqi">
          <ListItem disablePadding data-oid="c76g_no">
            <ListItemButton data-oid="ou2uwck">
              <ListItemText primary={"Publicar carrusel"} data-oid="irgvuyl" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="destacar-restaurante" data-oid="8_f.9.5">
          <ListItem disablePadding data-oid="n_xa09l">
            <ListItemButton data-oid="9.1ubg3">
              <ListItemText
                primary={"Destacar restaurante"}
                data-oid="tctufm3"
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding onClick={handleLogout} data-oid="hctq1q3">
          <ListItemButton data-oid="4slt11u">
            <ListItemIcon data-oid="8tzhgms">
              <Logout fontSize="small" data-oid="6.gwsnk" />
            </ListItemIcon>
            <ListItemText primary={"Cerrar sesión"} data-oid="c772w.y" />
          </ListItemButton>
        </ListItem>
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
      data-oid="7mdc_.j"
    >
      <MenuItem onClick={handleMenuClose} data-oid="3z7nxf4">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} data-oid="_nvunqb">
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
      data-oid="sp01o1k"
    >
      <MenuItem data-oid="cya5:pt">
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          data-oid="nh06utz"
        >
          <Badge badgeContent={4} color="error" data-oid="8twb-03">
            <MailIcon data-oid="-g1i7tu" />
          </Badge>
        </IconButton>
        <p data-oid="4n7by4k">Messages</p>
      </MenuItem>
      <MenuItem data-oid="inn.bx6">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          data-oid="sic4d61"
        >
          <Badge badgeContent={17} color="error" data-oid="_dbd71e">
            <NotificationsIcon data-oid="i21qc8u" />
          </Badge>
        </IconButton>
        <p data-oid="iw4t83o">Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} data-oid="mo9ynke">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          data-oid="b:gl1n1"
        >
          <AccountCircle data-oid="qsk9ahe" />
        </IconButton>
        <p data-oid="j..udfv">Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} data-oid="gzopxnz">
      <div
        position="static"
        sx={{
          background: "transparent",
          color: "#000",
          boxShadow: "0  0  1px",
        }}
        data-oid="sn4754g"
      >
        {/* <div className={styles.toolbar} > */}
        <div className={styles.toolbar} data-oid="vjsli5-">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            data-oid="qwg5.1m"
          >
            <MenuIcon data-oid="yiclhm0" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            data-oid="d7lwed3"
          >
            <Link to="/" data-oid="cu58xy2">
              <img
                src={require("../../Images/Logo.png")}
                alt="Logo"
                className={styles.logo}
                data-oid="are8e_m"
              />
            </Link>
          </Typography>
          <Search data-oid="2lq27dc"></Search>

          <div className={styles.bg_navbar} data-oid="8cn3k0q">
            {token ? (
              <div className={styles.nonemobile} data-oid="9kwqbvp">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  data-oid="-7.-67r"
                >
                  <Tooltip data-oid="s7:zkyb">
                    <div
                      style={{ display: "flex", placeItems: "center" }}
                      data-oid="dg:37q4"
                    >
                      <div data-oid="k8gfxch">
                        <strong style={{ color: "#fff" }} data-oid="x0tnizv">
                          ¡Hola {datapersonal.name}!
                        </strong>
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          data-oid="arh:ssn"
                        >
                          <Avatar
                            sx={{
                              width: 50,
                              height: 50,
                              backgroundColor: datapersonal.backgroundColor,
                            }}
                            data-oid="480viu7"
                          >
                            {datapersonal.name && datapersonal.name[0]}
                          </Avatar>
                        </IconButton>
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
                  data-oid="cepocud"
                >
                  <Link to="/perfil" data-oid="-qt:wyk">
                    <MenuItem onClick={handleClose} data-oid="f2jql-e">
                      <ListItemIcon data-oid="2k.5w2-">
                        <AccountCircleIcon
                          fontSize="small"
                          data-oid="b.-2z84"
                        />
                      </ListItemIcon>
                      Perfil
                    </MenuItem>
                  </Link>

                  {/*     {datapersonal.role && datapersonal.role === "restaurante" ? (
                  <Link to="/administrar" target="_blank">
                  <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                  <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Administrar
                  </MenuItem>
                  </Link>
                  ) : null} */}

                  {datapersonal.role && datapersonal.role === "personal" ? (
                    <Link to="/mis-reservaciones" data-oid="i52r3ti">
                      <MenuItem onClick={handleClose} data-oid="pmfjpjy">
                        <ListItemIcon data-oid="-7eh8hc">
                          <AdminPanelSettingsIcon
                            fontSize="small"
                            data-oid="s0izp22"
                          />
                        </ListItemIcon>
                        Mis reservaciones
                      </MenuItem>
                    </Link>
                  ) : null}
                  <Divider data-oid="_szs19_" />

                  <MenuItem onClick={handleLogout} data-oid="ip7g_u9">
                    <ListItemIcon data-oid="8d6f.i1">
                      <Logout fontSize="small" data-oid="5u74sx." />
                    </ListItemIcon>
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  data-oid="jqy-98t"
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
                    data-oid="mlt0kg_"
                  ></Avatar>
                </IconButton>
                <Box
                  sx={{ display: { xs: "none", sm: "block" } }}
                  data-oid="9:yh_9t"
                >
                  <Link to="/iniciar-sesión" data-oid="kp6cdkz">
                    <Button className={styles.btn_login} data-oid="rgjy3i1">
                      Iniciar sesión
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </div>
        </div>
      </div>

      <nav data-oid="odowy0x">
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
          data-oid="k8b:n-7"
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
