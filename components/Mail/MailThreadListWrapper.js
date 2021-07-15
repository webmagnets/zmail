import { useEffect, useState } from 'react';
import MailThreadList from './MailThreadList';
import MailThreadListSection from './MailThreadListSection';

const MailThreadListWrapper = ({
  category,
  curMailThreads,
  onSelectThread
}) => {
  // For Inbox
  const [inboxReadThreads, setInboxReadThreads] = useState([])
  const [inboxUnreadThreads, setInboxUnreadThreads] = useState([]);

  const [isReadOpen, setIsReadOpen] = useState(true);
  const [isUnreadOpen, setIsUnreadOpen] = useState(true);

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
      setIsReadOpen(prev => !prev);
    } else if (type === 'unread') {
      setIsUnreadOpen(prev => !prev);
    }
  }

  return (
    <div className="overflow-y-auto">
      {
        category === 'inbox'
        ? (
          <>
            <MailThreadListSection
              label="Unread"
              type="unread"
              isOpen={isUnreadOpen}
              onClickHandler={onClickSection}
            />
            {
              isUnreadOpen &&
              <MailThreadList
                threads={inboxUnreadThreads}
                onSelectThread={onSelectThread}
              />
            }
            <MailThreadListSection
              label="Everything else"
              type="read"
              isOpen={isReadOpen}
              onClickHandler={onClickSection}
            />
            {
              isReadOpen &&
              <MailThreadList
                threads={inboxReadThreads}
                onSelectThread={onSelectThread}
              /> 
            }
          </>
        )
        : (
          <MailThreadList
            threads={curMailThreads}
            onSelectThread={onSelectThread}
          />
        )
      }
    </div>
  )
}

export default MailThreadListWrapper