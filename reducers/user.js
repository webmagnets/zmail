export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const USER_LOGOUT = "USER_LOGOUT"
export const SET_INITIAL_USERS = 'SET_INITIAL_USERS'


export const userLogOut = () => ({
  type: USER_LOGOUT,
});

export const setCurrentUser = (user) => ({
  type: SET_USER_PROFILE,
  payload: user,
})

export const setInitialUsers = (users) => ({
  type: SET_INITIAL_USERS,
  payload: users
})

const initialState = {
  currentUser: {
    userUid: '',
    email: '',
    displayName: '',
    photoUrl: '',
    spammedUserUids: [],
    blockedUserUids: [],
    deletedMailThreads: []
  },
  userHashMap: {}
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
          userUid: '',
          email: '',
          displayName: '',
          photoUrl: '',
          spammedUserUids: [],
          blockedUserUids: [],
          deletedMailThreads: []
        }
      }
    }

    default:
      return state;
  }
};

export default user;