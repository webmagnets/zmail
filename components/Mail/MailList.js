import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeMailThread } from '../../reducers/store/mailThread';
import MailCompose from './MailCompose';
import MailListItem from './MailListItem';

const MailList = ({
  mailList,
  starredMailUids,
  currentUser,
  handleOnSendEmail
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isComposeEmailOpen, setIsComposeEmailOpen] = useState(false);
  const [composeEmailDetail, setComposeEmailDetail] = useState({
    composeType: 'reply',
    senderEmail: '',
    senderDisplayName: '',
    senderUserUid: '',
    sourceThreadId: ''
  })

  const onClickStar = (mailUid) => {
    const updated = starredMailUids.length === 0
      ? [mailUid]
      : [...starredMailUids, mailUid]

    dispatch(changeMailThread(
      currentUser.userUid,
      router.query.mailThreadId,
      {
        starredMailUids: updated
      }
    ))
  }

  const handleOnClickItem = (mailUid, ...payload) => {
    const [key, value] = payload;
    
    switch (key) {
      case 'star':
        onClickStar(mailUid);
        return;
      case 'reply':
      case 'forward':
        setComposeEmailDetail({ 
          composeType: key,
          ...value
         })
         setIsComposeEmailOpen(true);
        return;
      case 'expand':
        return;
      default:
        return;
    }
  }

  const mailListWithExpandOption = mailList.map(mail => {
    const starred = starredMailUids.find(el => el === mail.mailUid) !== undefined;
    return {
      ...mail,
      isExpanded: false,
      isStarred: starred
    }
  })

  return (
    <>
      {
        mailListWithExpandOption.map((mail, i) => {
          return (
            <MailListItem
              key={mail.mailUid}
              mail={mail}
              currentUserUid={currentUser.userUid}
              isLast={i === mailList.length - 1}
              handleOnClickItem={handleOnClickItem}
            />
          )
        })  
      }
      {
        isComposeEmailOpen &&
        <MailCompose
          currentUser={currentUser}
          composeEmailDetail={composeEmailDetail}
          onClickSend={handleOnSendEmail}
          onClickClose={() => setIsComposeEmailOpen(false)}
        />
      }
    </>
  )
}

export default MailList;