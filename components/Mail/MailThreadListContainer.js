import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MailThreadListAction from './MailThreadListAction';
import MailThreadListWrapper from './MailThreadListWrapper';

const MailThreadListContainer = ({ category }) => {
  // Base Redux Current Mail Thread State
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);

  // const [threadsWithSelectOption, setThreadsWithSelectOption] = useState([]);

  // console.log("Container")

  // useEffect(() => {
  //   console.log("Setup with threads")

  //   const updatedThreads = curMailThreads.map(thread => {
  //     return {
  //       ...thread,
  //       isSelected: false
  //     }
  //   })

  //   setThreadsWithSelectOption(updatedThreads);
  // }, [curMailThreads])

  // const handleSelectAll = () => {
  //   console.log("On Select All Threads");
  //   const cp = [...curMailThreads];

  //   // Select All Threads
  //   setThreadsWithSelectOption(
  //     cp.map(thread => {
  //       return {
  //         ...thread,
  //         isSelected: true
  //       }
  //     })
  //   )
  // }

  // const onSelectThread = (thread, status) => {
  //   const cp = [...threadsWithSelectOption];
  //   const index = cp.findIndex(el => el.threadId === thread.threadId);

  //   console.log("On Select Thread: ", thread);
  //   console.log("Original Threads: ", cp);
    
  //   cp[index] = {
  //     ...cp[index],
  //     isSelected: status
  //   }

  //   setThreadsWithSelectOption(cp);
  // }

  return (
    <div className="flex flex-col">
      <MailThreadListAction
        curMailThreads={curMailThreads}
      />
      <MailThreadListWrapper
        category={category}
        curMailThreads={curMailThreads}
      />
    </div>
  )
}

export default MailThreadListContainer