import { useEffect, useState } from 'react';
import MailList from './MailList';
import MailSection from './MailSection';

export default function MailListContainer({
  hash,
  threadsWithSelectOption,
  onSelectThread
}) {
  // For Inbox
  const [inboxReadThreads, setInboxReadThreads] = useState([])
  const [inboxUnreadThreads, setInboxUnreadThreads] = useState([]);

  const [isReadOpen, setIsReadOpen] = useState(true);
  const [isUnreadOpen, setIsUnreadOpen] = useState(true);

  useEffect(() => {
    if (hash === 'inbox') {
      const read = [];
      const unread = [];

      threadsWithSelectOption.forEach(thread => {
        if (thread.hasUnread) {
          unread.push(thread);
        } else {
          read.push(thread);
        }
      })

      setInboxReadThreads(read);
      setInboxUnreadThreads(unread);
    }
  }, [hash, threadsWithSelectOption])

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
        hash === 'inbox'
        ? (
          <>
            <MailSection
              label="Unread"
              type="unread"
              isOpen={isUnreadOpen}
              onClickHandler={onClickSection}
            />
            {
              isUnreadOpen &&
              <MailList
                threads={inboxUnreadThreads}
                onSelectThread={onSelectThread}
              />
            }
            <MailSection
              label="Everything else"
              type="read"
              isOpen={isReadOpen}
              onClickHandler={onClickSection}
            />
            {
              isReadOpen &&
              <MailList
                threads={inboxReadThreads}
                onSelectThread={onSelectThread}
              /> 
            }
          </>
        )
        : (
          <MailList
            threads={threadsWithSelectOption}
            onSelectThread={onSelectThread}
          />
        )
      }
    </div>
  )
}