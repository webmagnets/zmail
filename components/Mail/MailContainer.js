import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MailListAction from './MailListAction';
import MailListContainer from './MailListContainer';

export default function MailContainer({ hash }) {
  // Base Redux Current Mail Thread State
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);
  
  // Threads with Select Option
  const [threadsWithSelectOption, setThreadsWithSelectOption] = useState([]);
  const [selectedThreads, setSelectedThreads] = useState([]);
  
  useEffect(() => {
    setThreadsWithSelectOption(
      curMailThreads.map(thread => {
        return {
          ...thread,
          isSelected: false
        }
      })
    )
  }, [curMailThreads])

  useEffect(() => {
    setSelectedThreads(threadsWithSelectOption.filter((thread) => thread.isSelected))
  }, [threadsWithSelectOption])

  const handleSelectAll = () => {
    const cp = [...threadsWithSelectOption];

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
    const cp = [...threadsWithSelectOption];
    const index = cp.findIndex(el => el.threadId === thread.threadId);

    cp[index] = {
      ...cp[index],
      isSelected: !cp[index].isSelected
    }

    setThreadsWithSelectOption(cp);
  }

  return (
    <div className="flex flex-col">
      <MailListAction
        selectedThreads={selectedThreads}
        handleSelectAll={handleSelectAll}
      />
      <MailListContainer
        hash={hash}
        threadsWithSelectOption={threadsWithSelectOption}
        onSelectThread={onSelectThread}
      />
    </div>
  )
}