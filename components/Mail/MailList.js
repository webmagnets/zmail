import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdForward, MdReply } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { changeMailThread } from '../../reducers/store/mailThread';
import MailCompose from './MailCompose';
import MailListItem from './MailListItem';

const MailList = ({
  mailList,
  starredMailUids,
  currentUser,
  expandedMailUids,
  onAddExpandedMailUids,
  onRemoveExpandedMailUids,
  handleOnSendEmail
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(expandedMailUids);

  const [isComposeEmailOpen, setIsComposeEmailOpen] = useState(false);
  const [composeEmailDetail, setComposeEmailDetail] = useState({
    composeType: 'reply',
    senderEmail: '',
    senderDisplayName: '',
    senderUserUid: '',
    sourceThreadId: ''
  })

  const mailListWithStarred = mailList.map(mail => {
    const starred = starredMailUids.find(el => el === mail.mailUid) !== undefined;
    return {
      ...mail,
      isStarred: starred
    }
  })

  const lastMail = mailListWithStarred[mailListWithStarred.length-1]

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
      default:
        return;
    }
  }

  return (
    <div className="pb-10">
      <div className="divide-y">
      {
        mailListWithStarred.map((mail, i) => {
          return (
            <MailListItem
              key={mail.mailUid}
              mail={mail}
              currentUserUid={currentUser.userUid}
              isLast={i === mailList.length - 1}
              expandedMailUids={expandedMailUids}
              onAddExpandedMailUids={onAddExpandedMailUids}
              onRemoveExpandedMailUids={onRemoveExpandedMailUids}
              handleOnClickItem={handleOnClickItem}
            />
          )
        })  
      }
      </div>
      {
        isComposeEmailOpen ? (
          <MailCompose
            currentUser={currentUser}
            composeEmailDetail={composeEmailDetail}
            onClickSend={handleOnSendEmail}
            onClickClose={() => setIsComposeEmailOpen(false)}
          />
        )
        : (
          <div className="flex items-center py-4 pl-16 space-x-3">
            <div
              className="inline-flex items-center justify-center px-4 py-1.5 border rounded-sm cursor-pointer hover:bg-gray-200 hover:bg-opacity-50 ml-1"
              onClick={
                () => handleOnClickItem(
                  lastMail.mailUid,
                  'reply',
                  {
                    senderEmail: lastMail.senderDetails.email,
                    senderDisplayName: lastMail.senderDetails.displayName,
                    senderUserUid: lastMail.senderUid,
                    sourceThreadId: lastMail.sourceThreadId
                  }
                )
              }
            >
              <MdReply size="20px" color="rgb(87,87,87)" />
              <span className="ml-2 text-sm tracking-wide text-gray-600">
                Reply
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center px-4 py-1.5 border rounded-sm cursor-pointer hover:bg-gray-200 hover:bg-opacity-50"
              onClick={
                () => handleOnClickItem(
                  lastMail.mailUid,
                  'forward',
                  {
                    senderEmail: '',
                    senderDisplayName: '',
                    senderUserUid: '',
                    sourceThreadId: ''
                  }
                )
              }
            >
              <MdForward size="20px" color="rgb(87,87,87)" />
              <span className="ml-2 text-sm tracking-wide text-gray-600">
                Forward
              </span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MailList;