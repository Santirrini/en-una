import axios from 'axios'






/* http://localhost:30021/// */
/* http://localhost:3001// */
export const RegisterUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', payload);

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error(error);

      // Aquí podrías despachar una acción indicando que el registro falló
      dispatch({ type: 'REGISTER_FAILURE', payload: error });

      throw error; // Puedes lanzar el error para que el componente también lo maneje si es necesario
    }
  };
};

export const ConfirmForm = (email, restaurantIds, business_name) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/confirm-form',
        { email, restaurantIds, business_name } // Enviar el email como un objeto
      );

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'FORM_CONFIRM', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error(error);

      // Aquí podrías despachar una acción indicando que el registro falló
      dispatch({ type: 'FORM_ERROR', payload: error });

      throw error; // Puedes lanzar el error para que el componente también lo maneje si es necesario
    }
  };
};


// action.js
// action.js
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/login", {
      email,
      password,
    });

    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: response.data.token,
          role: response.data.role,
          userId: response.data.userId,
        },
      });

      // Devuelve un objeto con los datos necesarios
      return {
        token: response.data.token,
        userId: response.data.userId,
        role: response.data.role,
      };
    }
  } catch (error) {

    dispatch({ type: "LOGIN_ERROR", });
    throw error;
  }
};



export const loginGoogle = (response) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:3001/api/auth/google', {
      token: response.credential, // Token JWT de Google
    });

    if (res.status === 200 && res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.data.token,
          role: res.data.role,
          userId: res.data.userId,
        },
      });

      // Devuelve un objeto con los datos necesarios
      return {
        token: res.data.token,
        userId: res.data.userId,
        role: res.data.role,
      };
    } else {
      dispatch({ type: "LOGIN_ERROR" });
      return null;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR" });
    return null;
  }
};




export const dataGoogle = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/auth/google/callback");

    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: response.data.token,
          role: response.data.role,
          userId: response.data.userId,
        },
      });

      return {
        token: response.data.token,
        userId: response.data.userId,
        role: response.data.role,
      };
    } else {
      dispatch({ type: "LOGIN_ERROR", payload: "Error en la respuesta del servidor" });
      return null;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error.message });
    console.error("Error en loginGoogle:", error); // Agrega este log
    return null;
  }
};





export const SendEmailPassword = (email) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/api/email-reset', { email });
      const data = res.data;
      dispatch({
        type: "SEND_EMAIL_SUCCESS",
        payload: data
      });
    } catch (error) {
      console.error('Error al enviar la contraseña:', error);
      dispatch({
        type: "SEND_EMAIL_FAILURE",
        payload: error.message
      });
    }
  };
};



export const ResetPassword = (token, newPassword) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/password-reset/${token}`, { newPassword });
      const data = res.data;
      dispatch({
        type: "RESET_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error('Error al enviar la contraseña:', error);
      dispatch({
        type: "RESET_FAILURE",
        payload: error.message
      });
    }
  };
};


export const ClaimSend = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/claim', payload);

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'CLAIM_SUCCESS', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error("No se pudo enviar el reclamo:", error);

    }
  };
};

export const petitionForm = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/form-petition', payload);

      // Aquí podrías despachar una acción indicando que el registro fue exitoso
      dispatch({ type: 'FORM_SUCCESS', payload: response.data });

      return response; // Devolver la respuesta para su procesamiento en el componente
    } catch (error) {
      // Manejar errores aquí si es necesario
      console.error("No se pudo enviar el la petición de registro:", error);

    }
  };
};
// actions/authActions.js

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const AllRestaurant = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/restaurants',);
      const data = res.data;

      dispatch({
        type: "ALL_RESTAURANTS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las compañias:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const AllForms = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/forms',);
      const data = res.data;

      dispatch({
        type: "ALL_FORM",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los FORMULARIOS:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const DetailRestaurant = (restaurantId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/restaurant/${restaurantId}`);
      const data = res.data;

      dispatch({
        type: "DETAIL_RESTAURANT",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar el detalle del restaurante:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const DetailForm = (formId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/forms/${formId}`);
      const data = res.data;

      dispatch({
        type: "DETAIL_FORM",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar el detalle del formulario:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const DetailUser = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/${userId}`);
      const data = res.data;

      dispatch({
        type: "DETAIL_USER",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar el detalle del usuario:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const DetailsReservation = (reservationId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/details-reservations/${reservationId}`);
      const data = res.data;

      dispatch({
        type: "DETAIL_RESERVATION",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar el detalle de las reservaciones:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const OrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/${orderId}`);
      const data = res.data;

      dispatch({
        type: "ORDER_DETAIL",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los detalles de las ordenes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};



export const dataPersonal = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/datapersonal",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      return dispatch({
        type: "DATA_PERSONAL",
        payload: data,
      });
    } catch (error) {
      console.error('Error no existe el token:', error);
    }
  };
};
export const UpdatePersonal = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/update-datapersonal`, payload);

      const data = res.data;

      dispatch({
        type: 'UPDATE_PERSONAL',
        payload: data,
      });
    } catch (error) {
      console.error("Error a actualizar el usuario:", error);
      // Podrías dispatch una acción de error si es necesario
    }
  };
};
export const postRestaurant = (token, payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/api/post-restaurant', payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = res.data;
      dispatch({
        type: "POST_RESTAURANT",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const PostMenu = (token, payload, restaurantId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/post-menu/${restaurantId}`, payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = res.data;
      dispatch({
        type: "POST_MENU",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};

export const PutMenu = (token, payload, menuId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/update-menu/${menuId}`, payload, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = res.data;
      dispatch({
        type: "_MENU",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear una publicación:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};
export const PaymentReserve = (token, cart) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:3001/api/payment', cart, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const response = res.data;
      localStorage.setItem('orderId', response.data);

      // Despachar la acción para guardar el 'orderId' en el estado de Redux
      dispatch({
        type: "PAYMENT_RESERVE",
        payload: response,
      });
      return response
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      dispatch({
        type: "PAYMENT_ERROR",
        payload: error.message
      });
    }
  };
};


export const DeleteAccount = (token) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/deleteaccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la cuenta');
    }

    // Eliminar el token de localStorage
    localStorage.removeItem('token');

    // Despachar alguna acción de éxito si es necesario
    dispatch({ type: 'DELETE_ACCOUNT_SUCCESS' });

    // Redireccionar a otra página si es necesario
    window.location.href = '/';

  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    // Despachar alguna acción de error si es necesario
    dispatch({ type: 'DELETE_ACCOUNT_ERROR', payload: error.message });
  }
};





export const AllOrder = (restaurantId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/orders/${restaurantId}`);
      const data = res.data;
      dispatch({
        type: "ALL_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar todas las órdenes:', error);
    }
  };
};

export const OneOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DETAILS_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};
export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/order/delete/${orderId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al borrar la orden:', error);
    }
  };
};



export const ProductDetail = (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/${productId}`);
      const data = res.data;

      dispatch({
        type: "PRODUCT_DETAILS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los detalles:', error);
    }
  };
};














export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/delete/${productId}`);
      const data = res.data;
      dispatch({
        type: "DELETE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al ver la orden:', error);
    }
  };
};


export const AllUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/users',);
      const data = res.data;

      dispatch({
        type: "ALL_USERS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los usuarios:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};



export const PaymentPaypal = (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/create-payment/${productId}`);
      const data = res.data;
      window.location.href = data.links[1].href
      dispatch({
        type: "PAYMENT_PAYPAL",
        payload: data
      });
    } catch (error) {
      console.error('Error al al pagar on paypal:', error);
    }
  };
};

export const Order = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/order`, payload);
      const data = res.data;
      dispatch({
        type: "ORDER",
        payload: data
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };
};




export const updateProduct = (productId, payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/productupdate/${productId}`, payload);
      const data = res.data;
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
    }
  };
};

export const AllProducts = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/products', payload);
      const data = res.data;

      dispatch({
        type: "ALL_PRODUCT",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar las publicaciónes:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
}; 