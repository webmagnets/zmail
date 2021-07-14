import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMailWithUserInfo } from  '../lib/utils';

// Constants For Condition Return Value
const VALID = true;
const INVALID = false;

const getUserDisplayNamesByUid = (userUidsList, userHashMap) => {
  return userUidsList.map(uid => userHashMap[uid].displayName)
}

const checkMailThreadByCondition = (
  conditionBits,
  {
    userUid,
    spammedUserUids,
    blockedUserUids
  },
  {
    threadCreatorUid,
    isDeleted,
    threadId
  },
  mailHashMap,
  returnValue
) => {
  const [checkIsSpam, checkIsBlock, checkIsDelete, checkIsSent] = conditionBits;

  if (
    (checkIsSpam && (threadCreatorUid in spammedUserUids)) ||
    (checkIsBlock && (threadCreatorUid in blockedUserUids)) ||
    (checkIsDelete && isDeleted) ||
    (checkIsSent && (mailHashMap[threadId].senderUid === userUid))
  )  {
    return returnValue;
  }

  return !returnValue;
}

// Custom Hooks

export const useMailThreads = (type) => {
  const INBOX = 'INBOX';
  const STARRED = 'STARRED';
  const IMPORTANT = 'IMPORTANT';
  const SENT = 'SENT';
  const SPAM = 'SPAM';
  const TRASH = 'TRASH';

  const defaultState = () => {
    return {
      read: [],
      unread: [],
      starred: [],
      important: [],
      spam: [],
      sent: [],
      trash: []
    }
  }

  const [mailThreads, setMailThreads] = useState(defaultState);

  const currentUser = useSelector(state => state.user.currentUser);
  const allMailThreads = useSelector(state => state.mailThread.mailThreads);
  const mailHashMap = useSelector(state => state.mail.mailHashMap);
  const userHashMap = useSelector(state => state.user.userHashMap);

  useEffect(() => {

  /*
    INBOX:
    - All mail threads
    - Read and Unread separated
    - X Spammed
    - X Blocked
    - X Trashed
    - X Sent

    Return Type: {
      read: [ ...mailThreads ],
      unread: [ ...mailThreads ]
    }
  */

  const inbox = () => {
    return allMailThreads
      // Filter threads that belong to inbox category
      .filter((thread) => {
        return checkMailThreadByCondition([1, 1, 1, 1], currentUser, thread, mailHashMap, INVALID)
      })
      // Fetch head mail information
      .map(thread => {
        return {
          ...thread,
          threadParticipants: getUserDisplayNamesByUid(thread.threadParticipants, userHashMap),
          headMail: getMailWithUserInfo(thread.headMailUid, mailHashMap, userHashMap)
        }
      })
      // Classify threads by read status
      .reduce((acc, curThread) => {
        if (curThread.hasUnread) {
          acc['unread'].push(curThread);
        } else {
          acc['read'].push(curThread);
        }
        
        return acc;
      }, {
        read: [],
        unread: []
      });
  }

  /*
    STARRED:
    - All mail threads that has "hasStars" as true
    - X Spammed
    - X Blocked
    - X Trashed
    - X Sent
  */

  const starred = () =>  {
    return allMailThreads
      .filter(thread => {
        return (
          checkMailThreadByCondition([1, 1, 1, 1], currentUser, thread, mailHashMap, INVALID) &&
          thread.hasStars
        )
      })
  }

  /*
    IMPORTANT:
    - All mail threads that has "isImportant" as true
    - X Spammed
    - X Blocked
    - X Trashed
    - X Sent
  */

  const important = () =>  {
    return allMailThreads
      .filter(thread => {
        return (
          checkMailThreadByCondition([1, 1, 1, 1], currentUser, thread, mailHashMap, INVALID) && 
          thread.isImportant
        )
      })
  }

  /*
    SENT:
    - All mail threads that has its head Mail created by the current user
    - X Trashed
  */

    const sent = () =>  {
      return allMailThreads
        .filter(thread => {
          return (
            checkMailThreadByCondition([0, 0, 0, 1], currentUser, thread, mailHashMap, VALID) &&
            checkMailThreadByCondition([1, 1, 1, 0], currentUser, thread, mailHashMap, INVALID)
          )
        })
    }

  /*
    SPAMMED:
    - All mail threads with creatorUids that are enlisted in current user's spammed list
    - X Trashed
  */

    const spam = () =>  {
      return allMailThreads
        .filter(thread => {
          return (
            checkMailThreadByCondition([1, 0, 0, 0], currentUser, thread, mailHashMap, VALID) &&
            checkMailThreadByCondition([0, 1, 1, 1], currentUser, thread, mailHashMap, INVALID)
          )
        })
    }

  /*
    TRASH:
    - All mail threads that have "isDeletetd" as true
  */

    const trash = () =>  {
      return allMailThreads
        .filter(thread => {
          return (
            checkMailThreadByCondition([0, 0, 1, 0], currentUser, thread, mailHashMap, VALID) &&
            checkMailThreadByCondition([1, 1, 0, 1], currentUser, thread, mailHashMap, INVALID)
          )
        })
    }

  switch (type) {
    case INBOX: {
      setMailThreads({
        ...inbox()
      });
      return;
    }

    case STARRED: {
      setMailThreads({
        ...starred()
      })
      return;
    }

    case IMPORTANT: {
      setMailThreads({
        ...important()
      })
      return;
    }

    case SENT: {
      setMailThreads({
        ...sent()
      })
      return;
    }

    case SPAM: {
      setMailThreads({
        ...spam()
      })
      return;
    }

    case TRASH: {
      setMailThreads({
        ...trash()
      })
      return;
    }

    default:
      return;
  }

  }, [
    type,
    currentUser,
    userHashMap,
    mailHashMap,
    allMailThreads
  ])

  return mailThreads;
}