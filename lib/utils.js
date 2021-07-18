import { uuid } from 'uuidv4';

export const getMailWithUserInfo = (mailUid, mailHashMap, userHashMap) => {
  const mail = mailHashMap[mailUid];
  
  const {
    email,
    displayName,
    photoUrl
  } = userHashMap[mail.senderUid];

  const receiverDetails = mail.receiverUids.map(uid => {
    const {
      email,
      displayName,
      photoUrl
    } = userHashMap[uid]

    return {
      userUid: uid,
      email,
      displayName,
      photoUrl
    }
  });


  return {
    ...mail,
    receiverDetails,
    senderDetails: {
      email,
      displayName,
      photoUrl
    }
  }
}

export const getDateByTime = (secs) => {
  const t = new Date(secs);
  return t;
}

export const validateRecipients = (emails, userHashMap) => {
  const validRecipients = Object.values(userHashMap).map(user => {
    return {
      email: user.email,
      userUid: user.userUid
    }
  });
  const validRecipientUids = []
  let isValid = true;

  if (emails.length === 0) {
    isValid = false
  } else {
    emails.forEach(email => {
      const index = validRecipients.findIndex(el => el.email === email);
      
      if (index === -1) {
        isValid = false;
      } else {
        validRecipientUids.push(validRecipients[index].userUid);
      }
    })
  }

  return [isValid, validRecipientUids];
}

export const getMailForSend = (
  userUid,
  receiverUids,
  content,
  sourceThreadId,
  mailUid = uuid()
) => {
  return {
    mailUid,
    senderUid: userUid,
    receiverUids,
    sentAt: new Date().getTime(),
    content,
    sourceThreadId
  }
}

export const getNewThread = (
  threadOwnerUid,
  threadParticipants,
  threadTitle,
  headMailUid
) => {
  return {
    threadId: uuid(),
    threadOwnerUid,
    threadTitle,
    headMailUid,
    isImportant: false,
    hasUnread: true,
    starredMailUids: [],
    deletedMailUids: [],
    threadParticipants,
    linkedMailUids: {
      [headMailUid]: null
    }
  }
}