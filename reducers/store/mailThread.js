export const SET_MAIL_THREADS = 'SET_MAIL_THREADS';
export const SET_CURRENT_MAIL_THREADS = 'SET_CURRENT_MAIL_THREADS';
export const ADD_MAIL_THREAD = 'ADD_MAIL_THREAD';
export const CHANGE_MAIL_THREAD = 'CHANGE_MAIL_THREAD';

export const setMailThreads = (mailThreads) => ({
  type: SET_MAIL_THREADS,
  payload: mailThreads,
})

export const setCurrentMailThreads = (curMailThreads) => ({
  type: SET_CURRENT_MAIL_THREADS,
  payload: curMailThreads,
})

export const addMailThreads = (mailThreads) => ({
  type: ADD_MAIL_THREAD,
  payload: mailThreads
})

export const changeMailThread = (userUid, threadId, changes) => ({
  type: CHANGE_MAIL_THREAD,
  payload: {
    userUid,
    threadId,
    changes // key-values wrapped as single object
  }
})

const initialState = {
  mailThreadsHashMap: {},
  curMailThreads: []
}

const mailThread = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIL_THREADS: {
      return {
        ...state,
        mailThreadsHashMap: action.payload
      }
    }

    case SET_CURRENT_MAIL_THREADS: {
      return {
        ...state,
        curMailThreads: action.payload
      }
    }

    case ADD_MAIL_THREAD: {
      return state
    }

    case CHANGE_MAIL_THREAD: {
      const updatedMailThreads = [...curMailThreads];
      const threadIndex = updatedMailThreads.findIndex(el => el.threadId === action.payload.threadId);

      updatedMailThreads[threadIndex] = {
        ...updatedMailThreads[threadIndex],
        ...action.payload.changes
      }

      const updatedMailThreadsHashMap = { ...mailThreadsHashMap }[action.payload.userUid];
      const hashMapThreadIndex = updatedMailThreadsHashMap.findIndex(el => el.threadId === action.payload.threadId);

      updatedMailThreadsHashMap[hashMapThreadIndex] = {
        ...updatedMailThreadsHashMap,
        ...action.payload.changes
      }

      return {
        mailThreadsHashMap: {
          ...state.mailThreadsHashMap,
          [userUid]: updatedMailThreadsHashMap
        },
        curMailThreads: updatedMailThreads
      }
    }

    default:
      return state;
  }
};

export default mailThread;