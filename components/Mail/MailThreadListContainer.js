import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MailThreadListAction from './MailThreadListAction';
import MailThreadListWrapper from './MailThreadListWrapper';

const MailThreadListContainer = ({ category }) => {
  // Base Redux Current Mail Thread State
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);

  const [selectedThreads, setSelectedThreads] = useState([]);

  useEffect(() => {
    setSelectedThreads(curMailThreads.filter((thread) => thread.isSelected))
  }, [curMailThreads])

  const handleSelectAll = () => {
    const cp = [...curMailThreads];

    // Select All Threads
    setThreadsWithSelectOption(
      cp.map(thread => {
        return {
          ...thread,
          isSelected: true
        }
      })
    )
    
    if (!hasSelectedOption) {
      setHasSelectedOption(true);
    }
  }

  const onSelectThread = (thread) => {
    const cp = [...curMailThreads];
    const index = cp.findIndex(el => el.threadId === thread.threadId);

    cp[index] = {
      ...cp[index],
      isSelected: !cp[index].isSelected
    }

    setThreadsWithSelectOption(cp);
  }

  return (
    <div className="flex flex-col">
      <MailThreadListAction
        selectedThreads={selectedThreads}
        handleSelectAll={handleSelectAll}
      />
      <MailThreadListWrapper
        category={category}
        curMailThreads={curMailThreads}
        onSelectThread={onSelectThread}
      />
    </div>
  )
}

export default MailThreadListContainer;