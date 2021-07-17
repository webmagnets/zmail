import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMailWithUserInfo } from  '../lib/utils';
import { setCurrentMailThreads } from '../reducers/store/mailThread';

// Constants For Condition Return Value
const VALID = true;
const INVALID = false;

const getUserDisplayNamesByUid = (thread, userHashMap, mailHashMap, forTrash) => {
  if (forTrash) {
    const deletedMailSenderList = []

    thread.deletedMailUids.forEach(uid => {
      console.log(userHashMap[uid]);
      const senderName = mailHashMap[uid].senderUid;
      if (!(senderName in deletedMailSenderList)) {
        deletedMailSenderList.push(senderName);
      }
    })

    return deletedMailSenderList.map(uid => userHashMap[uid].displayName);
  } else {
    const userUidsList = thread.threadParticipants;
    return userUidsList.map(uid => userHashMap[uid].displayName)
  }
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
    headMailUid
  },
  mailHashMap,
  returnValue
) => {
  const [checkIsSpam, checkIsBlock, checkIsSent] = conditionBits;

  if (checkIsSpam && (threadCreatorUid in spammedUserUids)) {
    return returnValue;
  }

  if (checkIsBlock && (threadCreatorUid in blockedUserUids)) {
    return returnValue
  }

  if (checkIsSent && (mailHashMap[headMailUid].senderUid === userUid)) {
    return returnValue
  }

  return !returnValue;
}

const checkHasDeleted = ({ deletedMailUids }) => deletedMailUids.length > 0;
const checkIsThreadDeleted = ({ deletedMailUids, linkedMailUids }) => deletedMailUids.length === Object.keys(linkedMailUids).length;

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
    console.log("UseMailThreads - Type: ", curType)
    /*
      INBOX:
      - All mail threads
      - Read and Unread
      - X Spammed
      - X Blocked
      - X Trashed
    */

    if (currentUser.userUid === '') {
      return;
    }

    const inbox = () => {
      return mailThreadsHashMap[currentUser.userUid]
        // Filter threads that belong to inbox category
        .filter((thread) => {
          return checkMailThreadByCondition([1, 1, 0], currentUser, thread, mailHashMap, INVALID) &&
            !checkIsThreadDeleted(thread)
        })
    }

    /*
      STARRED:
      - All mail threads that has "hasStars" as true
      - X Spammed
      - X Blocked
      - X Trashed
    */

    const starred = () =>  {
      return mailThreadsHashMap[currentUser.userUid]
        .filter(thread => {
          return (
            checkMailThreadByCondition([1, 1, 0], currentUser, thread, mailHashMap, INVALID) &&
            (thread.starredMailUids.length > 0) &&
            !checkIsThreadDeleted(thread)
          )
        })
    }

    /*
      IMPORTANT:
      - All mail threads that has "isImportant" as true
      - X Spammed
      - X Blocked
      - X Trashed
    */

    const important = () =>  {
      return mailThreadsHashMap[currentUser.userUid]
        .filter(thread => {
          return (
            checkMailThreadByCondition([1, 1, 0], currentUser, thread, mailHashMap, INVALID) && 
            thread.isImportant &&
            !checkIsThreadDeleted(thread)
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
            checkMailThreadByCondition([0, 0, 1], currentUser, thread, mailHashMap, VALID) &&
            checkMailThreadByCondition([1, 1, 0], currentUser, thread, mailHashMap, INVALID) &&
            !checkIsThreadDeleted(thread)
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
            checkMailThreadByCondition([1, 0, 0], currentUser, thread, mailHashMap, VALID) &&
            checkMailThreadByCondition([0, 1, 1], currentUser, thread, mailHashMap, INVALID)
          )
        })
    }

    /*
      TRASH:
      - All mail threads that have deleted mails
      - Spammed mails do not show up in trash category
    */

    const trash = () =>  {
      return mailThreadsHashMap[currentUser.userUid]
        .filter(thread => {
          return (
            checkMailThreadByCondition([1, 0, 0], currentUser, thread, mailHashMap, INVALID) &&
            checkHasDeleted(thread)
          )
        })
    }

    // Additional Wrapper to insert head mail information & participants names
    const threadsWrapper = (threads, forTrash = false) => {
      return threads
        .map(thread => {
          // If the threads are for Trash category, set headMail using the first index of the deleted mail uid array
          // For other categories other than Trash, set headMailUid of the thread as headMail
          const mainMailUid = forTrash ? thread.deletedMailUids[0] : thread.headMailUid;
          return {
            ...thread,
            threadParticipants: getUserDisplayNamesByUid(thread, userHashMap, mailHashMap, forTrash),
            headMail: getMailWithUserInfo(mainMailUid, mailHashMap, userHashMap)
          }
        })
    }

    switch (curType) {
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
        const trashThreads = threadsWrapper(trash(), true);
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
    curType,
    userHashMap,
    mailHashMap,
    mailThreadsHashMap,
    currentUser
  ])

  return mailThreads;
}