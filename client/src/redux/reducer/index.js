const initialState = {
  token: localStorage.getItem('token'),
  role: [],
  loginUser: {},
  loginError: null,
  allcompany: [],
  allUsers: [],
  registrationSuccess: false,
  registrationError: null,
  datapersonal: [],
  productDetails: [],
  allOrders: [],
  oneOrder: [],
  allCart: [],

  
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
        token: null,
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

      
    case 'POST_PRODUCT':
      return {
        ...state,
      };
    case 'ALL_COMPANY':
      return {
        ...state,
        allcompany: action.payload
      };
    case 'ALL_USERS':
      return {
        ...state,
        allUsers: action.payload
      };

    case 'PRODUCT_DETAILS':
      return {
        ...state,
        productDetails: action.payload
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

        
          
            


    default: return { ...state }
  }
}






