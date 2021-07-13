export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = (user) => ({
  type: SET_USER_PROFILE,
  payload: user,
})

const initialState = {
  currentUser: {
    uid: '',
    nickname: '',
    photoUrl: ''
  },
  allUsers: {
    0: {
      uid: '',
      nickname: '',
      photoUrl: ''
    },
    1: {
      uid: '',
      nickname: '',
      photoUrl: ''
    },
    2: {
      uid: '',
      nickname: '',
      photoUrl: ''
    },
    3: {
      uid: '',
      nickname: '',
      photoUrl: ''
    },
    4: {
      uid: '',
      nickname: '',
      photoUrl: ''
    },
    5: {
      uid: '',
      nickname: '',
      photoUrl: ''
    }
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    default:
      return state;
  }
};

export default user;