const initialState = {
  token: localStorage.getItem('token'),
  role: [],
  loginUser: {},
  loginError: null,
  allrestaurant: [],
  allUsers: [],
  registrationSuccess: false,
  registrationError: null,
  datapersonal: [],
  restaurantdetails: [],
  allOrders: [],
  oneOrder: [],
  allCart: [],
  emailSent: false,
  error: null,
  message: '',
  paymentData: null,
  orderDetails: [],
  detailsReservation: [],

  
}


export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        registrationSuccess: true,
        registrationError: null,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        registrationSuccess: false,
        registrationError: action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };



    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        token: localStorage.removeItem("token"),
        role: null,

      };


    case 'DATA_PERSONAL':
      return {
        ...state,
        datapersonal: action.payload,
        role: action.payload.role
      };
    case 'DELETE_ACCOUNT':
      return {
        ...state,

      };


    case 'POST_RESTAURANT':
      return {
        ...state,
      };

    case 'POST_MENU':
      return {
        ...state,
      };
    case 'ALL_RESTAURANTS':
      return {
        ...state,
        allrestaurant: action.payload
      };
    case 'ALL_USERS':
      return {
        ...state,
        allUsers: action.payload
      };

    case 'DETAIL_RESTAURANT':
      return {
        ...state,
        restaurantdetails: action.payload
      };
    case 'PAYMENT_PAYPAL':
      return {
        ...state,
      };
    case 'ORDER':
      return {
        ...state,
      };

    case 'ALL_ORDER':
      return {
        ...state,
        allOrders: action.payload
      };
    case 'DETAILS_ORDER':
      return {
        ...state,
        oneOrder: action.payload
      };
    case 'PRODUCT_CART':
      return {
        ...state,

      };

    case 'ALL_CART':
      return {
        ...state,

        allCart: action.payload
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,

      };
      case 'SEND_EMAIL_SUCCESS':
      return {
        ...state,
        emailSent: true,
        error: null,
      };
    case 'SEND_EMAIL_FAILURE':
      return {
        ...state,
        emailSent: false,
        error: action.payload,
      };
  // En tu reducer
case "RESET_SUCCESS":
  return {
    ...state,
    message: 'Contraseña restablecida correctamente',
    error: null,
  };
case "RESET_FAILURE":
  return {
    ...state,
    message: null,
    error: 'Error al restablecer la contraseña',
  };
  case "PAYMENT_RESERVE":
    return {
      ...state,
      paymentData: action.payload,
      paymentError: null,
    };
  case "PAYMENT_ERROR":
    return {
      ...state,
      paymentError: action.payload,
    };
    case "ORDER_DETAIL":
    return {
      ...state,
      orderDetails: action.payload,
    };

    case "DETAIL_RESERVATION":
      return {
        ...state,
        detailsReservation: action.payload,
      };

    


    default: return { ...state }
  }
}






