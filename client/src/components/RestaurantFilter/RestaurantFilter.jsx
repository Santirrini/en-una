import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./RestaurantFilter.module.css";
import CategoryModal from "../CategoryModal/CategoryModal";

const filters = [
  "Por categorías",
  "Orden alfabético",
  "Más cercanos",
  "Ordenar por",
];

const RestaurantFilter = () => {
  const { pathname } = useLocation();
  const { category } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("Sugeridos");
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [googleRestaurants, setGoogleRestaurants] = useState([]);

  // Estado para modal categorías (puedes implementar según tu necesidad)
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  // Estado para modal menor costo
  const [openCostModal, setOpenCostModal] = useState(false);

  // Estado para opciones del filtro de costo
  const [costOrder, setCostOrder] = useState("asc"); // 'asc' o 'desc'
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleOpenCostModal = () => setOpenCostModal(true);
  const handleCloseCostModal = () => setOpenCostModal(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setScroll(scrollType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const googlePlacesApiKey = "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA"; // Asegúrate de reemplazarlo con tu clave
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address,
            key: googlePlacesApiKey,
          },
        },
      );
      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
    return null;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://en-una-production.up.railway.app/api/restaurant-filter/${category}`,
        );
        const restaurantsWithCoords = await Promise.all(
          res.data.data.map(async (r) => {
            if (!r.latitude || !r.longitude) {
              const coords = await geocodeAddress(r.address);
              return { ...r, latitude: coords?.lat, longitude: coords?.lng };
            }
            return r;
          }),
        );
        setRestaurants(restaurantsWithCoords);
      } catch (error) {
        console.error("Error al obtener restaurantes:", error);
      }
    };
    fetchData();
  }, [category]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(location);

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
              {
                params: {
                  location: `${location.latitude},${location.longitude}`,
                  radius: 5000,
                  type: "restaurant",
                  key: googlePlacesApiKey,
                },
              },
            );
            setGoogleRestaurants(response.data.results);
          } catch (error) {
            console.error(
              "Error al obtener restaurantes cercanos de Google Places:",
              error,
            );
          }
        },
        (error) => {
          console.error("Error obteniendo ubicación del usuario:", error);
        },
      );
    }
  }, []);

  // Función para calcular distancia si tienes coordenadas
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => angle * (Math.PI / 180);
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filtrar y ordenar restaurantes según filtro y búsqueda
  const getFilteredRestaurants = () => {
    let filtered = [...restaurants];

    // Filtrar por texto de búsqueda
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (r.details &&
          r.details.toLowerCase().includes(searchText.toLowerCase())) ||
        (r.address &&
          r.address.toLowerCase().includes(searchText.toLowerCase())),
    );

    // Agregar distancia si tienes ubicación del usuario
    if (userLocation) {
      filtered = filtered.map((r) => {
        const distance =
          r.latitude && r.longitude
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                r.latitude,
                r.longitude,
              )
            : null;
        return { ...r, distance };
      });
    }

    // Aplicar filtro según selección
    switch (selectedFilter) {
      case "Orden alfabético":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "Más cercanos":
        return filtered.sort(
          (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity),
        );
      case "Ordenar por":
        // Filtrar por rango de precio
        filtered = filtered.filter((r) => {
          const cost = parseFloat(r.minimum_consumption) || 0;
          const minOk = minPrice ? cost >= parseFloat(minPrice) : true;
          const maxOk = maxPrice ? cost <= parseFloat(maxPrice) : true;
          return minOk && maxOk;
        });
        // Ordenar según elección
        filtered.sort((a, b) => {
          const costA = parseFloat(a.minimum_consumption) || 0;
          const costB = parseFloat(b.minimum_consumption) || 0;
          return costOrder === "asc" ? costA - costB : costB - costA;
        });
        return filtered;
      default:
        return filtered;
    }
  };

  const filteredRestaurants = getFilteredRestaurants();

  // Manejar clic en filtro
  const handleFilterClick = (filter) => {
    if (filter === "Por categorías") {
      setOpen(true);
    } else if (filter === "Ordenar por") {
      handleOpenCostModal();
    }
    setSelectedFilter(filter);
  };

  // Aplicar filtro costo y cerrar modal
  const applyCostFilter = () => {
    setOpenCostModal(false);
  };
  useEffect(() => {
    if (userLocation && restaurants.length > 0) {
      const restaurantsWithDistance = restaurants.map((r) => {
        if (r.latitude && r.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            r.latitude,
            r.longitude,
          );
          return { ...r, distance };
        }
        return { ...r, distance: null };
      });
      setRestaurants(restaurantsWithDistance);
    }
  }, [userLocation, restaurants]);
  return (
    <Box
      p={2}
      bgcolor="#fff"
      className={styles.FilterContainer}
      data-oid="7.8hnqz"
    >
      <Box display="flex" justifyContent="center" mb={4} data-oid="flw2u7g">
        <TextField
          placeholder="Buscar restaurante"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" data-oid="u9-q72c">
                <SearchIcon data-oid="220g9-x" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%",
            borderRadius: "30px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#7B1FA2",
              },
          }}
          data-oid="aej:swq"
        />
      </Box>

      <Box maxWidth="100%" mx="auto" data-oid="xqm50ah">
        <Box className={styles.btnFilter} data-oid="59yqc7b">
          {filters?.map((filter, index) => (
            <Button
              key={index}
              fullWidth
              variant="contained"
              onClick={() => handleFilterClick(filter)}
              sx={{
                backgroundColor: filter === selectedFilter ? "#f0f" : "#4b0082",
                "&:hover": {
                  backgroundColor:
                    filter === selectedFilter ? "#d700d7" : "#5c1a99",
                },
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                minWidth: 120,
                height: 120,
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
                position: "relative",
              }}
              data-oid="9ed5nys"
            >
              {filter}
              {filter === selectedFilter && (
                <TouchAppIcon
                  sx={{
                    position: "absolute",
                    right: -20,
                    top: 10,
                    fontSize: 28,
                  }}
                  data-oid="dxjcmiy"
                />
              )}
            </Button>
          ))}
        </Box>

        <Grid container spacing={2} data-oid="xx7-b1r">
          {filteredRestaurants?.map((restaurant, index) => (
            <Grid item xs={12} key={index} data-oid="n:z1exu">
              <Link
                to={`/detalles/restaurante/${restaurant.id}`}
                data-oid="idjf9fv"
              >
                <Box
                  sx={{
                    display: "flex",
                    border: "2px solid #4b0082",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    padding: 2,
                    alignItems: "center",
                    color: "#000",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    },
                  }}
                  data-oid="89j_bug"
                >
                  <Box sx={{ mr: 2 }} data-oid="6n_.amr">
                    <img
                      src={restaurant?.imageFile?.[0]}
                      alt="Comida"
                      width={120}
                      height={120}
                      style={{ borderRadius: "10px" }}
                      data-oid="rnftpzl"
                    />
                  </Box>

                  <Box sx={{ flex: 1 }} data-oid="ex0_hna">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      data-oid="2ycdr_l"
                    >
                      {restaurant.name || "Título del restaurante"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1 }}
                      data-oid="g618l:m"
                    >
                      {restaurant.details ||
                        "Descripción breve del restaurante"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1 }}
                      data-oid=":-b2eq_"
                    >
                      {restaurant.address || "Dirección no disponible"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#7B1FA2" }}
                      data-oid="y0a2g0x"
                    >
                      {`A ${(restaurant.distance ?? 0).toFixed(2)} km de ti`}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        maxWidth="md"
        data-oid="dszkz.w"
      >
        <DialogContent dividers={scroll === "body"} data-oid="jtpab26">
          <CategoryModal
            setOpen={setOpen}
            restaurants={restaurants}
            data-oid="ygx2wzg"
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openCostModal}
        onClose={handleCloseCostModal}
        data-oid="npjtgxz"
      >
        <DialogContent data-oid="zrlxax3">
          <Typography variant="subtitle1" mb={1} data-oid="0ktzf2a">
            Ordenar por:
          </Typography>
          <RadioGroup
            value={costOrder}
            onChange={(e) => setCostOrder(e.target.value)}
            data-oid="_8-czaw"
          >
            <FormControlLabel
              value="asc"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#4b0082", // color del círculo cuando está seleccionado
                    },
                  }}
                  data-oid="699n81h"
                />
              }
              label="Menor a Mayor"
              data-oid="jbsdckc"
            />

            <FormControlLabel
              value="desc"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#4b0082", // color del círculo cuando está seleccionado
                    },
                  }}
                  data-oid="n5-fryx"
                />
              }
              label="Mayor a Menor"
              data-oid="mwekf8n"
            />
          </RadioGroup>

          <Typography variant="subtitle1" mt={2} mb={1} data-oid="yqllf63">
            Filtrar por rango de precio:
          </Typography>
          <Box display="flex" gap={2} mb={2} data-oid="ut70prn">
            <TextField
              label="Precio mínimo"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              fullWidth
              sx={{
                width: "100%",
                "& label.Mui-focused": {
                  color: "#4b0082",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#4b0082",
                  },
                  "& input": {
                    color: "#4b0082", // color del texto
                  },
                },
              }}
              data-oid="p8.8cox"
            />

            <TextField
              label="Precio máximo"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              fullWidth
              sx={{
                width: "100%",
                "& label.Mui-focused": {
                  color: "#7B1FA2",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#4b0082",
                  },
                  "& input": {
                    color: "#4b0082", // color del texto
                  },
                },
              }}
              data-oid="v5m4w4."
            />
          </Box>
        </DialogContent>
        <DialogActions data-oid="ypbl.nd">
          <Button
            onClick={handleCloseCostModal}
            sx={{ color: "red" }}
            data-oid="n8tj7ee"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={applyCostFilter}
            sx={{
              backgroundColor: "#7B1FA2",
              ":hover": { backgroundColor: "#7B1FA2" },
            }}
            data-oid="_n_v4k2"
          >
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantFilter;
