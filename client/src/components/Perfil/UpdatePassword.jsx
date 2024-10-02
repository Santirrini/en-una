import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SendEmailPassword } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import styles from './Perfil.module.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { Link, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme({
    palette: {
      primary: {
        main: "#500075", // Color primario que usarás
      },
    },
  });
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UpdatePassword({datapersonal, disabled}) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const error = useSelector((state) => state.error);

React.useEffect(() => {
    setEmail(datapersonal?.email)
}, [datapersonal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      try {
        await dispatch(SendEmailPassword(datapersonal?.email));
      } catch (error) {
        console.error("Error al enviar el correo:", error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
  };
  return (
    <div>
      <Button variant='contained' sx={{backgroundColor : '#500075', width: '100%', fontSize:10}} onClick={handleOpen } disabled={!disabled}>Actualizar contraseña</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">Se enviara un correo para restablecer su contraseña.</Alert>
    </Stack>
        <div className={styles.btnContainer}>
            <Button
              size="small"
              variant="contained"
              sx={{ background: "gray", ":hover": { background: "gray" } }}
          onClick={handleClose}
            
        
            >
              Cancelar
            </Button>
          <Button
          onClick={handleSubmit}
            size="small"
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#500075",
              border: "none",
              ":hover": {
                backgroundColor: "#500075",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={25}
                thickness={5}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Enviar"
            )}
          </Button>
          </div>
 
        </Box>
      </Modal>
    </div>
  );
}



