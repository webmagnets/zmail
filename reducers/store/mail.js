export const SET_MAILS = 'SET_MAILS'

export const setMails = (mails) => ({
  type: SET_MAILS,
  payload: mails,
})

const initialState = {
  mailHashMap: {},
}

const mail = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAILS: {
      return {
        mailHashMap: action.payload
      }
    }

    default:
      return state;
  }
};

export default mail;