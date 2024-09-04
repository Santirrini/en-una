/* 
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
import { dataPersonal, logout, AllRestaurant } from "../../redux/action";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
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

export default function PrimarySearchAppBar() {
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
      navigate('/iniciar-sesión');
    }
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
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          src={require("../../Images/Logo.png")}
          alt="Not found"
          className={styles.logo_mobile}
        />
      </Typography>
      <Divider />
      <List>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/sobre-nosotros">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"Acerca nosotros"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/contactanos">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary={"Contáctanos"} />
            </ListItemButton>
          </ListItem>
        </Link>

        {!token ? (
          <>
            <br />
            <Link to="/iniciar-sesión">
              <ListItem disablePadding className={styles.btn_login}>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Iniciar sesión"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/perfil">
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        backgroundColor: datapersonal.backgroundColor,
                      }}
                    >
                      {datapersonal.name && datapersonal.name[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {datapersonal.role && datapersonal.role === "restaurante" ? (
              <Link to="/panel">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Administrar"} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ) : null}

            {datapersonal.role && datapersonal.role === "personal" ? (
              <>
                <Link to="/mis-reservaciones">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <StorefrontIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Mis reservaciones"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            ) : null}

            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} />
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
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mi cuenta</MenuItem>
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
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const filteredRestaurants = allrestaurant
    ? allrestaurant.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: "90px",
          boxShadow: "none",
        }}
      >
        <Toolbar className={styles.navbar_container}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className={styles.navbar_logo_search}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                marginTop: "20px",
              }}
            >
              <img
                src={require("../../Images/Logo.png")}
                alt="Not found"
                className={styles.navbar_logo}
              />
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBase
                ref={inputRef}
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  color: "black",
                  width: "100%",
                  height: "40px",
                  borderRadius: "15px",
                }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, marginTop: "25px" }}
            className={styles.navbar_options}
          >
            <Link to="/">
              <Button color="inherit">Inicio</Button>
            </Link>
            <Link to="/sobre-nosotros">
              <Button color="inherit">Sobre nosotros</Button>
            </Link>
            <Link to="/contactanos">
              <Button color="inherit">Contáctanos</Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Notification
              handleProfileMenuOpen={handleProfileMenuOpen}
              handleMobileMenuOpen={handleMobileMenuOpen}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              open={open}
              token={token}
              datapersonal={datapersonal}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
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

      {searchTerm && (
        <Paper sx={{ marginTop: "10px", padding: "10px" }}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Box
                key={restaurant._id}
                sx={{
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2">{restaurant.address}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No se encontraron resultados</Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}

*/