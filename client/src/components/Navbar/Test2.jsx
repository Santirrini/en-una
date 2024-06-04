import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import { dataPersonal, logout } from "../../redux/action";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {token ? (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: datapersonal.backgroundColor,
                }}
              >
                {datapersonal.name && datapersonal.name[0]}
              </Avatar>{" "}
              <ListItemText primary={" Mi perfil"} />
            </ListItemButton>
          </ListItem>
        ) : null}
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Inicio"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/contactanos">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Contacto"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/carrito">
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Carrito"} />
            </ListItemButton>
          </ListItem>
        </Link>

        {datapersonal.role && datapersonal.role === "restaurante" ? (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Administrar"} />
            </ListItemButton>
          </ListItem>
        ) : null}
        {!token ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              className={styles.btn_login}
            >
              <ListItemText primary={"Iniciar sesión"} />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" id={styles.navbar}>
        <Toolbar className={styles.box_navbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <img
                src={require("../../Images/Logo.png")}
                alt=""
                className={styles.logo}
              />
            </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <input type="text" className={styles.search} />
            <Paper
              sx={{
                width: 450,
                maxWidth: "100%",
                position: "absolute",
                marginTop: "3em",
                textAlign: "center",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
          
                    <MenuList >
                      <Link
                       
                        className="title-search-name"
                      >
                        <MenuItem>
                          <ListItemIcon>
                            <Avatar
                            
                              sx={{
                                width: 60,
                                height: 60,
                              }}
                              className="perfil-avatar-content"
                            >
                                <div></div>
                                <div>
                              asdasd
                                </div>
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText>
                  asdasdsa
                            <ListItemText sx={{ color: "gray" }}>
                             asdasd
                            </ListItemText>
                          </ListItemText>
                        </MenuItem>
                      </Link>
                    </MenuList>
              
                    <MenuList>
                      <MenuItem>
                        <ListItemText>
                          No se encontraron resultados
                        </ListItemText>
                      </MenuItem>
                    </MenuList>
            </Paper>
            <Button
                 sx={{
                  background: "#500075",
                  color: "#fff",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                  borderRadius: "100%",
                  position: "absolute",
                  right: "10px", // Ajusta según sea necesario
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "5px", // Ajusta el padding para que se vea bien
                  minWidth: "auto",
                }}
            >
              <SearchIcon />
            </Button>
            <Link to="/contactanos">
              <Button
                sx={{
                  color: "#500075 ",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                }}
              >
                Contacto
              </Button>
            </Link>
            <Link to="/carrito">
              <Button
                sx={{
                  color: "#500075 ",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                }}
              >
                Carrito
              </Button>
            </Link>

            {datapersonal.role && datapersonal.role === "restaurante" ? (
              <Link to="/administrar" target="_blank">
                <Button
                  sx={{
                    color: "#500075 ",
                    fontFamily: "League Spartan",
                    fontWeight: "bold",
                  }}
                >
                  administrar
                </Button>
              </Link>
            ) : null}
          </Box>

          {token ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: datapersonal.backgroundColor,
                      }}
                    >
                      {datapersonal.name && datapersonal.name[0]}
                    </Avatar>
                  </IconButton>
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
              >
                <Link to="/perfil">
                  <MenuItem onClick={handleClose}>
                    <Avatar
                      sx={{ backgroundColor: datapersonal.backgroundColor }}
                    >
                      {datapersonal.name && datapersonal.name[0]}
                    </Avatar>
                    Perfil
                  </MenuItem>
                </Link>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link to="/iniciar-sesión">
                <Button className={styles.btn_login}>Iniciar sesión</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
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
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
