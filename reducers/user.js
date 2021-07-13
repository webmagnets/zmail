export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const USER_LOGOUT = "USER_LOGOUT"

export const userLogOut = () => ({
  type: USER_LOGOUT,
});

export const setCurrentUser = (user) => ({
  type: SET_USER_PROFILE,
  payload: user,
})

const initialState = {
  currentUser: {
    uid: '',
    displayName: '',
    photoUrl: ''
  },
  userHashMap: {},
  userDetailsHashMap: {},

}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    case USER_LOGOUT: {
      return {
        ...state,
        currentUser: {
          uid: '',
          displayName: '',
          photoUrl: ''
        }
      }
    }

    default:
      return state;
  }
};

export default user;