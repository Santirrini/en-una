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
import { dataPersonal } from "../../redux/action";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [dispatch]);

  const handleLogout = () => {
    setTimeout(async () => {
      try {
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }, 3000);
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
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <Link to="/">
              <Button
                sx={{
                  color: "#500075 ",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                }}
              >
                Inicio
              </Button>
            </Link>

            <Button
              sx={{
                color: "#500075 ",
                fontFamily: "League Spartan",
                fontWeight: "bold",
              }}
            >
              Buscar
            </Button>
            <Button
              sx={{
                color: "#500075 ",
                fontFamily: "League Spartan",
                fontWeight: "bold",
              }}
            >
              Contacto
            </Button>
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

                {datapersonal.role && datapersonal.role === "restaurante" ? (
                 <Link to= "/administrar">
                 <MenuItem onClick={handleClose}>
                    <SupervisorAccountIcon>
                      {datapersonal.name && datapersonal.name[0]}
                    </SupervisorAccountIcon>
                    Administrar
                  </MenuItem>
                 </Link>
                ) : null}
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
              <Link to="/auth/login">
                <Button className={styles.btn_login}>Iniciar sesión</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
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

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
