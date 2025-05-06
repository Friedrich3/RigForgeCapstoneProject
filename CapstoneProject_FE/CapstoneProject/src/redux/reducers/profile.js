

const initialObject = {
  username: null,
  email: null,
  role: null,
  expire: null,
  registeredAt: null
};

const initialState = {
  data: initialObject
}



const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SAVE_PROFILE":
      return {
        ...state,
        data: action.payload,
      };

    case "LOGOUT":
      return {
        data: initialObject
      };

    //TODO: FIX E IMPLEMENTAZIONE
    case "CHECK_TOKEN":
      return {
        ...state,
        profile: {
          ...state.profile,
          isExpired: true,
        },
      };





    default:
      return state
  }


};

export default profileReducer;