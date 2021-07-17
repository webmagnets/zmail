export const SET_MAIL_THREADS = 'SET_MAIL_THREADS';
export const SET_CURRENT_MAIL_THREADS = 'SET_CURRENT_MAIL_THREADS';
export const CHANGE_MAIL_THREAD = 'CHANGE_MAIL_THREAD';
export const SET_SELECTED_MAIL_THREADS = 'SET_SELECTED_MAIL_THREADS'

export const SET_READ_SECTION_OPEN_STATUS = 'SET_READ_SECTION_OPEN_STATUS'
export const SET_UNREAD_SECTION_OPEN_STATUS = 'SET_UNREAD_SECTION_OPEN_STATUS'

export const ACTION_ON_SELECTED_MAIL_THREADS = 'ACTION_ON_SELECTED_MAIL_THREADS'

export const setMailThreads = (mailThreads) => ({
  type: SET_MAIL_THREADS,
  payload: mailThreads,
})

export const setCurrentMailThreads = (curMailThreads) => ({
  type: SET_CURRENT_MAIL_THREADS,
  payload: curMailThreads
})

export const setSelectedMailThreads = (selectedMailThreads) => ({
  type: SET_SELECTED_MAIL_THREADS,
  payload: selectedMailThreads
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

export const setReadSectionStatus = (status) => ({
  type: SET_READ_SECTION_OPEN_STATUS,
  payload: status
})

export const setUnreadSectionStatus = (status) => ({
  type: SET_UNREAD_SECTION_OPEN_STATUS,
  payload: status
})

export const deleteSelectedMailThreads = () => ({
  type: ACTION_ON_SELECTED_MAIL_THREADS,
  payload: 'delete'
})

export const recoverSelectedMailThreads = () => ({
  type: ACTION_ON_SELECTED_MAIL_THREADS,
  payload: 'recover'
})

const initialState = {
  mailThreadsHashMap: {},
  curMailThreads: [],
  selectedMailThreads: [],
  // Section State
  isReadSectionOpen: true,
  isUnreadSectionOpen: true
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

    case CHANGE_MAIL_THREAD: {
      const updatedMailThreads = [...state.curMailThreads];
      const threadIndex = updatedMailThreads.findIndex(el => el.threadId === action.payload.threadId);

      updatedMailThreads[threadIndex] = {
        ...updatedMailThreads[threadIndex],
        ...action.payload.changes
      }

      const updatedMailThreadsHashMap = { ...state.mailThreadsHashMap }[action.payload.userUid];
      const hashMapThreadIndex = updatedMailThreadsHashMap.findIndex(el => el.threadId === action.payload.threadId);

      updatedMailThreadsHashMap[hashMapThreadIndex] = {
        ...updatedMailThreadsHashMap[hashMapThreadIndex],
        ...action.payload.changes
      }

      return {
        ...state,
        mailThreadsHashMap: {
          ...state.mailThreadsHashMap,
          [action.payload.userUid]: updatedMailThreadsHashMap
        },
        curMailThreads: updatedMailThreads
      }
    }

    case SET_SELECTED_MAIL_THREADS: {
      return {
        ...state,
        selectedMailThreads: action.payload
      }
    }

    case SET_READ_SECTION_OPEN_STATUS: {
      return {
        ...state,
        isReadSectionOpen: action.payload
      }
    }

    case SET_UNREAD_SECTION_OPEN_STATUS: {
      return {
        ...state,
        isUnreadSectionOpen: action.payload
      }
    }

    case ACTION_ON_SELECTED_MAIL_THREADS: {
      let updatedSelectedThreads;
      let changedKey;
      console.log(action.payload);

      switch (action.payload) {
        case 'delete': {
          changedKey = 'deletedMailUids';
          updatedSelectedThreads = [...state.selectedMailThreads]
            .map((thread) => {
              const mailUidsWithoutHead = Object.keys(thread.linkedMailUids).filter(uid => uid !== thread.headMailUid);
              return {
                ...thread,
                deletedMailUids: [thread.headMailUid, ...mailUidsWithoutHead]
              }
            })
          break;
        }

        case 'recover': {
          changedKey = 'deletedMailUids';
          updatedSelectedThreads = [...state.selectedMailThreads]
            .map((thread) => {
              return {
                ...thread,
                deletedMailUids: []
              }
            })
          break;
        }

        default: {
          updatedSelectedThreads = [...state.curMailThreads];
          break;
        }
      }

      console.log(updatedSelectedThreads)
      
      const userUid = state.curMailThreads[0].threadOwnerUid;
      const updatedMailThreads = [...state.curMailThreads];
      const updatedMailThreadsHashMap = { ...state.mailThreadsHashMap }[userUid];

      for (let i = 0; i < updatedSelectedThreads.length; i++) {
        const threadIndex = updatedMailThreads.findIndex(el => el.threadId === updatedSelectedThreads[i].threadId);
        const hashMapThreadIndex = updatedMailThreadsHashMap.findIndex(el => el.threadId === updatedSelectedThreads[i].threadId);
        updatedMailThreads[threadIndex] = {
          ...updatedMailThreads[threadIndex],
          [changedKey]: updatedSelectedThreads[i][changedKey]
        }
        updatedMailThreadsHashMap[hashMapThreadIndex] = {
          ...updatedMailThreadsHashMap[hashMapThreadIndex],
          [changedKey]: updatedSelectedThreads[i][changedKey]
        }
      }

      return {
        ...state,
        mailThreadsHashMap: {
          ...state.mailThreadsHashMap,
          [userUid]: updatedMailThreadsHashMap
        },
        curMailThreads: updatedMailThreads,
        selectedMailThreads: []
      }
    }

    default:
      return state;
  }
};

export default mailThread;