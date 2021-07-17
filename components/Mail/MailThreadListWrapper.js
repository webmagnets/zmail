import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReadSectionStatus, setUnreadSectionStatus } from '../../reducers/store/mailThread';
import MailThreadList from './MailThreadList';
import MailThreadListSection from './MailThreadListSection';

const MailThreadListWrapper = ({
  category,
  curMailThreads
}) => {
  // For Inbox
  const [inboxUnreadThreads, setInboxUnreadThreads] = useState([]);
  const [inboxReadThreads, setInboxReadThreads] = useState([]);

  const dispatch = useDispatch();
  const isReadSectionOpen = useSelector(({ mailThread }) => mailThread.isReadSectionOpen);
  const isUnreadSectionOpen = useSelector(({ mailThread }) => mailThread.isUnreadSectionOpen);

  useEffect(() => {
    if (category === 'inbox') {
      const read = [];
      const unread = [];

      curMailThreads.forEach(thread => {
        if (thread.hasUnread) {
          unread.push(thread);
        } else {
          read.push(thread);
        }
      })

      setInboxReadThreads(read);
      setInboxUnreadThreads(unread);
    }
  }, [category, curMailThreads])

  const onClickSection = (type) => {
    if (type === 'read') {
      dispatch(setReadSectionStatus(
        !isReadSectionOpen
      ))
    } else if (type === 'unread') {
      dispatch(setUnreadSectionStatus(
        !isUnreadSectionOpen
      ))
    }
  }

  return (
    <div className="overflow-y-auto min-h-list">
      {
        category === 'inbox'
        ? (
          <>
            <MailThreadListSection
              label="Unread"
              type="unread"
              isOpen={isUnreadSectionOpen}
              onClickHandler={onClickSection}
            />
            {
              isUnreadSectionOpen &&
              <MailThreadList
                threads={inboxUnreadThreads}
              />
            }
            <MailThreadListSection
              label="Everything else"
              type="read"
              isOpen={isReadSectionOpen}
              onClickHandler={onClickSection}
            />
            {
              isReadSectionOpen &&
              <MailThreadList
                threads={inboxReadThreads}
              /> 
            }
          </>
        )
        : (
          <MailThreadList
            threads={curMailThreads}
          />
        )
      }
    </div>
  )
}

export default MailThreadListWrapper