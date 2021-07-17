import { useSelector } from 'react-redux';
import MailThreadListAction from './MailThreadListAction';
import MailThreadListWrapper from './MailThreadListWrapper';

const MailThreadListContainer = ({ category }) => {
  // Base Redux Current Mail Thread State
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);

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