export function getMailWithUserInfo(mailUid, mailHashMap, userHashMap) {
  const mail = mailHashMap[mailUid];
  const {
    email,
    displayName,
    photoUrl
  } = userHashMap[mail.senderUid];
  return {
    ...mail,
    senderDetails: {
      email,
      displayName,
      photoUrl
    }
  }
}

export function getDateByTime(secs) {
  const t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(secs);
  return t;
}