export const SET_MAIL_THREADS = 'SET_MAIL_THREADS'

export const setMailThreads = (mailThreads) => ({
  type: SET_MAIL_THREADS,
  payload: mailThreads,
})

const initialState = {
  mailThreads: []
}

const mailThread = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIL_THREADS: {
      return {
        mailThreads: action.payload
      }
    }

    default:
      return state;
  }
};

export default mailThread;