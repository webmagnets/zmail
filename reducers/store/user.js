export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const USER_LOGOUT = "USER_LOGOUT"
export const SET_INITIAL_USERS = 'SET_INITIAL_USERS'
export const ADD_SPAM_USER = 'ADD_SPAM_USER'


export const userLogOut = () => ({
  type: USER_LOGOUT,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
})

export const setInitialUsers = (users) => ({
  type: SET_INITIAL_USERS,
  payload: users
})

export const addUsersToSpam = (userUids) => ({
  type: ADD_SPAM_USER,
  payload: userUids
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

    case SET_INITIAL_USERS: {
      return {
        ...state,
        userHashMap: action.payload
      }
    }

    case ADD_SPAM_USER: {
      const updatedSpammedUserUids = [...state.currentUser.spammedUserUids];
      
      action.payload.forEach(uid => {
        if (!(uid in updatedSpammedUserUids)) {
          updatedSpammedUserUids.push(uid);
        }
      })

      return {
        ...state,
        userHashMap: {
          ...state.userHashMap,
          [state.currentUser.userUid]: {
            ...state.userHashMap[state.currentUser.userUid],
            spammedUserUids: updatedSpammedUserUids
          }
        },
        currentUser: {
          ...state.currentUser,
          spammedUserUids: updatedSpammedUserUids
        }
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