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
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Index.module.css";
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
      window.location.reload();
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
    <Box onClick={handleDrawerToggle} data-oid="1zzgce5">
      <Typography variant="h6" sx={{ my: 2 }} data-oid="_0qcrm4">
        <img
          src={require("../../Images/Logo.png")}
          alt="Not found"
          className={styles.logo_mobile}
          data-oid="vkom54z"
        />
      </Typography>
      <Divider data-oid="iajffvb" />
      <List data-oid="l6whwfe">
        <Link to="/" data-oid="ypfahde">
          <ListItem disablePadding data-oid="r0uqiup">
            <ListItemButton data-oid="j7p8iqg">
              <ListItemIcon data-oid="fy_:nxd">
                <HomeIcon data-oid="u_gctis" />
              </ListItemIcon>

              <ListItemText primary={"Inicio"} data-oid="hsts40n" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/sobre-nosotros" data-oid="u_of0.0">
          <ListItem disablePadding data-oid=".qknndx">
            <ListItemButton data-oid="z0us2po">
              <ListItemIcon data-oid="0c3e267">
                <InfoIcon data-oid="fno_j1g" />
              </ListItemIcon>
              <ListItemText primary={"Acerca nosotros"} data-oid="_gu:4-0" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/contactanos" data-oid="kv8ejbl">
          <ListItem disablePadding data-oid="v6bjhg4">
            <ListItemButton data-oid="ccb-u8n">
              <ListItemIcon data-oid="71kcwa3">
                <ContactsIcon data-oid="pf3x_qz" />
              </ListItemIcon>
              <ListItemText primary={"Contáctanos"} data-oid="_08ge.9" />
            </ListItemButton>
          </ListItem>
        </Link>

        {!token ? (
          <>
            <br data-oid="9.j416x" />
            <Link to="/iniciar-sesión" data-oid="c2qpyhf">
              <ListItem
                disablePadding
                className={styles.btn_login}
                data-oid="3hynt:2"
              >
                <ListItemButton data-oid="mm3rh1w">
                  <ListItemIcon data-oid="t:yitqn">
                    <LoginIcon sx={{ color: "white" }} data-oid=".d544r6" />
                  </ListItemIcon>
                  <ListItemText primary={"Iniciar sesión"} data-oid="28u0jpr" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/perfil" data-oid="nvfypq.">
              <Divider data-oid="2vwg7ra" />

              <ListItem disablePadding data-oid="6bjzsii">
                <ListItemButton data-oid="kt9ou5b">
                  <ListItemIcon data-oid="4r62tbv">
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: datapersonal.backgroundColor,
                      }}
                      data-oid="_f7uuct"
                    >
                      {datapersonal.name && datapersonal.name[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} data-oid="84o0t4l" />
                </ListItemButton>
              </ListItem>
            </Link>
            {datapersonal.role && datapersonal.role === "restaurante" ? (
              <Link to="/panel" data-oid="cvnms7q">
                <ListItem disablePadding data-oid="be9.t94">
                  <ListItemButton data-oid="sbaqi.m">
                    <ListItemIcon data-oid="yo:ho8c">
                      <AdminPanelSettingsIcon data-oid="t6i1twk" />
                    </ListItemIcon>
                    <ListItemText primary={"Administrar"} data-oid="1vskqfz" />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null}

            {datapersonal.role && datapersonal.role === "personal" ? (
              <>
                <Link to="/mis-reservaciones" data-oid="12c4pk_">
                  <ListItem disablePadding data-oid="vq8cqsm">
                    <ListItemButton data-oid="yza_5ob">
                      <ListItemIcon data-oid="5khsc9l">
                        <StorefrontIcon data-oid="6eqgd91" />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Mis reservaciones"}
                        data-oid="-jk6nhl"
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : null}

            <ListItem disablePadding onClick={handleLogout} data-oid="upgxbhf">
              <ListItemButton data-oid="p06xi5j">
                <ListItemIcon data-oid="12nzbzw">
                  <Logout fontSize="small" data-oid="cjobcm-" />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} data-oid="pjlbbmn" />
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
      data-oid="tb9a__i"
    >
      <MenuItem onClick={handleMenuClose} data-oid="g7ldxx1">
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} data-oid="ths1tu5">
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
      data-oid="g0xen_h"
    >
      <MenuItem data-oid="tfz7ao:">
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          data-oid="-n82ttf"
        >
          <Badge badgeContent={4} color="error" data-oid="y1g7paj">
            <MailIcon data-oid="6f8k7z8" />
          </Badge>
        </IconButton>
        <p data-oid="h..h2mr">Messages</p>
      </MenuItem>
      <MenuItem data-oid="rcsv.pm">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          data-oid="tvxlsaf"
        >
          <Badge badgeContent={17} color="error" data-oid="o6po.vm">
            <NotificationsIcon data-oid="eqa8137" />
          </Badge>
        </IconButton>
        <p data-oid="1e.-o24">Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} data-oid="8er-mx0">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          data-oid="quy25o-"
        >
          <AccountCircle data-oid="wsx18tl" />
        </IconButton>
        <p data-oid="qmt7swi">Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} data-oid="ygel69:">
      <div
        position="static"
        sx={{
          background: "transparent",
          color: "#000",
          boxShadow: "0  0  1px",
        }}
        data-oid="acl0yhx"
      >
        {/* <div className={styles.toolbar} > */}
        <div className={styles.toolbar} data-oid="yec:7-o">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            data-oid="s7l_qfv"
          >
            <MenuIcon data-oid="hh:4cp:" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            data-oid="h3qg:76"
          >
            <Link to="/" data-oid="8s19lg9">
              <img
                src={require("../../Images/Logo.png")}
                alt="Logo"
                className={styles.logo}
                data-oid="fzi5g0p"
              />
            </Link>
          </Typography>
          <Search data-oid=".y07ggm"></Search>

          <div className={styles.bg_navbar} data-oid="7l9cv4j">
            {token ? (
              <div className={styles.nonemobile} data-oid="r39tj.i">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  data-oid="rt.cepd"
                >
                  <Tooltip data-oid="02pn0pt">
                    <div
                      style={{ display: "flex", placeItems: "center" }}
                      data-oid="ojsxz.z"
                    >
                      <div data-oid="sm7:6y_">
                        <strong style={{ color: "#fff" }} data-oid="c90j6t-">
                          ¡Hola {datapersonal.name}!
                        </strong>
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          data-oid="wugj4jb"
                        >
                          <Avatar
                            sx={{
                              width: 50,
                              height: 50,
                              backgroundColor: datapersonal.backgroundColor,
                            }}
                            data-oid="i7cgo6a"
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
                  data-oid=":pzc3kk"
                >
                  <Link to="/perfil" data-oid="70amz:b">
                    <MenuItem onClick={handleClose} data-oid="_tw6wr2">
                      <ListItemIcon data-oid="pm4a3-g">
                        <AccountCircleIcon
                          fontSize="small"
                          data-oid="2jvi4zb"
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
                    <Link to="/mis-reservaciones" data-oid="o1wd7bw">
                      <MenuItem onClick={handleClose} data-oid="8lrswfq">
                        <ListItemIcon data-oid="oao0ifa">
                          <AdminPanelSettingsIcon
                            fontSize="small"
                            data-oid="nbc049:"
                          />
                        </ListItemIcon>
                        Mis reservaciones
                      </MenuItem>
                    </Link>
                  ) : null}
                  <Divider data-oid="jzpljy_" />

                  <MenuItem onClick={handleLogout} data-oid="28bn-v9">
                    <ListItemIcon data-oid="va_7_nn">
                      <Logout fontSize="small" data-oid="x6086hs" />
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
                  data-oid="ngyaykq"
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
                    data-oid="v-_kj_e"
                  ></Avatar>
                </IconButton>
                <Box
                  sx={{ display: { xs: "none", sm: "block" } }}
                  data-oid="ed49924"
                >
                  <Link to="/iniciar-sesión" data-oid="oeootcy">
                    <Button className={styles.btn_login} data-oid="0p.l1gs">
                      Iniciar sesión
                    </Button>
                  </Link>
                </Box>
              </>
            )}
          </div>
        </div>
      </div>

      <nav data-oid="-i19315">
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
          data-oid="vinuhdt"
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
