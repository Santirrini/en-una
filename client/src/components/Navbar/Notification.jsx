import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataPersonal } from "../../redux/action";

export default function Notification() {
  const dispatch = useDispatch();

  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const openNoti = Boolean(anchorElNoti);
  const [items, setItems] = React.useState([]);
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  React.useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setItems(cartItems);
  }, []);
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };
  const handleClickNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  return (
    <div data-oid="15goycd">
      <IconButton
        id="basic-button"
        aria-controls={openNoti ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openNoti ? "true" : undefined}
        onClick={handleClickNoti}
        data-oid="u:uvs23"
      >
        <Badge
          color="secondary"
          variant={items.length > 0 ? "dot" : ""}
          sx={{ color: "white" }}
          data-oid="__zxb32"
        >
          <NotificationsIcon data-oid="j64h07q" />
        </Badge>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorElNoti}
        open={openNoti}
        onClose={handleCloseNoti}
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
        data-oid="6u8rqxi"
      >
        {items.length > 0 ? (
          <Link to="/carrito" data-oid="x9ymtx6">
            <MenuItem onClick={handleCloseNoti} data-oid="r4zbu8r">
              ¡Tenes una reserva pendiente!
            </MenuItem>
          </Link>
        ) : (
          <MenuItem onClick={handleCloseNoti} data-oid="46ur2rt">
            No hay notificaciones
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
