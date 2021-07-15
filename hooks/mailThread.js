import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMailWithUserInfo } from  '../lib/utils';
import { setCurrentMailThreads } from '../reducers/store/mailThread';

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
    headMailUid
  },
  mailHashMap,
  returnValue
) => {
  const [checkIsSpam, checkIsBlock, checkIsDelete, checkIsSent] = conditionBits;

  if (
    (checkIsSpam && (threadCreatorUid in spammedUserUids)) ||
    (checkIsBlock && (threadCreatorUid in blockedUserUids)) ||
    (checkIsDelete && isDeleted) ||
    (checkIsSent && (mailHashMap[headMailUid].senderUid === userUid))
  )  {
    return returnValue;
  }

  return !returnValue;
}

// Custom Hooks

export const useMailThreads = (type) => {
  const INBOX = 'inbox';
  const STARRED = 'starred';
  const IMPORTANT = 'important';
  const SENT = 'sent';
  const SPAM = 'spam';
  const TRASH = 'trash';

  const defaultState = () => []

  const [curType, setCurType] = useState(null);
  const [mailThreads, setMailThreads] = useState(defaultState);

  const currentUser = useSelector(({ user }) => user.currentUser);
  const userHashMap = useSelector(({ user }) => user.userHashMap);
  const mailThreadsHashMap = useSelector(({ mailThread }) => mailThread.mailThreadsHashMap);
  const mailHashMap = useSelector(({ mail }) => mail.mailHashMap);
  useEffect(() => {
    if (curType === null) {
      setCurType(type);
    } else if (curType !== type) {
      setCurType(type)
    }
  }, [type])

  useEffect(() => {
  console.log("UseMailThreads - Type: ", type)
  /*
    INBOX:
    - All mail threads
    - Read and Unread
    - X Spammed
    - X Blocked
    - X Trashed
    - X Sent
  */

  const inbox = () => {
    return mailThreadsHashMap[currentUser.userUid]
      // Filter threads that belong to inbox category
      .filter((thread) => {
        return checkMailThreadByCondition([1, 1, 1, 1], currentUser, thread, mailHashMap, INVALID)
      })
      // // Classify threads by read status
      // .reduce((acc, curThread) => {
      //   if (curThread.hasUnread) {
      //     acc['unread'].push(curThread);
      //   } else {
      //     acc['read'].push(curThread);
      //   }
        
      //   return acc;
      // }, {
      //   read: [],
      //   unread: []
      // });
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
    return mailThreadsHashMap[currentUser.userUid]
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
    return mailThreadsHashMap[currentUser.userUid]
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
    return mailThreadsHashMap[currentUser.userUid]
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
    return mailThreadsHashMap[currentUser.userUid]
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
    return mailThreadsHashMap[currentUser.userUid]
      .filter(thread => {
        return (
          checkMailThreadByCondition([0, 0, 1, 0], currentUser, thread, mailHashMap, VALID) &&
          checkMailThreadByCondition([1, 1, 0, 1], currentUser, thread, mailHashMap, INVALID)
        )
      })
  }

  // Additional Wrapper to insert head mail information & participants names
  const threadsWrapper = (threads) => {
    return threads
      .map(thread => {
        return {
          ...thread,
          threadParticipants: getUserDisplayNamesByUid(thread.threadParticipants, userHashMap),
          headMail: getMailWithUserInfo(thread.headMailUid, mailHashMap, userHashMap)
        }
      })
  }

  switch (type) {
    case INBOX: {
      const inboxThreads = threadsWrapper(inbox());
      console.log("Inbox Threads: ", inboxThreads);
      setMailThreads([
        ...inboxThreads
      ]);
      return;
    }

    case STARRED: {
      const starredThreads = threadsWrapper(starred());
      console.log("Starred Threads: ", starredThreads);
      setMailThreads([
        ...starredThreads
      ]);
      return;
    }

    case IMPORTANT: {
      const importantThreads = threadsWrapper(important());
      console.log("Important Threads: ", importantThreads);
      setMailThreads([
        ...importantThreads
      ]);
      return;
    }

    case SENT: {
      const sentThreads = threadsWrapper(sent());
      console.log("Sent Threads: ", sentThreads);
      setMailThreads([
        ...sentThreads
      ]);
      return;
    }

    case SPAM: {
      const spamThreads = threadsWrapper(spam());
      console.log("Spam Threads: ", spamThreads);
      setMailThreads([
        ...spamThreads
      ]);
      return;
    }

    case TRASH: {
      const trashThreads = threadsWrapper(starred());
      console.log("Trash Threads: ", trashThreads);
      setMailThreads([
        ...trashThreads
      ]);
      return;
    }

    default:
      console.log("Default")
      return;
  }

  }, [
    type,
    currentUser,
    userHashMap,
    mailHashMap,
    mailThreadsHashMap
  ], [curType])

  return mailThreads;
}