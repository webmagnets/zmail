export function getMailWithUserInfo(mailUid, mailHashMap, userHashmap) {
  const mail = mailHashMap[mailUid];
  const mailSender = userHashMap[headMail.senderUid];
  const mailReceiver = userHashMap[headMail.mailReceiverUid];

  return {
    ...mail,
    senderDetails: mailSender,
    receiverDetails: mailReceiver
  }
}