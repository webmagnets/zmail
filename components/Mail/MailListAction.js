import { useRouter } from 'next/router'
import { MdArrowBack, MdDelete, MdDeleteSweep, MdMarkunread, MdReport } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import useCategory from '../../hooks/category';
import { changeMailThread, deleteSelectedMailThreads, recoverSelectedMailThreads, setSelectedMailThreads } from '../../reducers/store/mailThread';
import IconButton from '../Button/IconButton'

const MailListAction = ({ mailThread }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const category = useCategory();
  const currentUser = useSelector(({ user }) => user.currentUser);

  const onDelete = () => {
    dispatch(setSelectedMailThreads([mailThread]));
    dispatch(deleteSelectedMailThreads());
    router.back();
  }

  const onRecover = () => {
    dispatch(setSelectedMailThreads([mailThread]));
    dispatch(recoverSelectedMailThreads());
    router.back();
  }

  const onSetSpam = () => {
    
  }

  const onSetUnread = () => {
    dispatch(changeMailThread(
      currentUser.userUid,
      mailThread.threadId,
      {
        hasUnread: true
      }
    ))
    router.back();
  }

  return (
    <div className="flex items-center justify-start h-12 border-b border-opacity-20">
      <div className="flex items-center px-3 mr-2">
        <IconButton
          label="Back"
          size="medium"
          tooltipLocation="bottom"
          imgComponent={<MdArrowBack size="20px" color="white" />}
          onClickHandler={() => router.back()}
        />
      </div>
      <div className="flex items-center">
        <IconButton 
          size="medium"
          label="Spam"
          tooltipLocation="bottom"
          imgComponent={
            <MdReport size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label={
            category !== 'trash'
              ? 'Delete'
              : 'Recover'
          }
          tooltipLocation="bottom"
          imgComponent={
            category !== 'trash'
              ? <MdDelete size="20px" color="white" />
              : <MdDeleteSweep size="20px" color="white" />
          }
          onClickHandler={
            category !== 'trash'
              ? () => onDelete()
              : () => onRecover()
          }
        />
        <IconButton
          size="medium"
          label="Mark Unread"
          tooltipLocation="bottom"
          imgComponent={
            <MdMarkunread size="20px" color="white" />
          }
          onClickHandler={() => onSetUnread()}
        />
      </div>
    </div>
  )
}

export default MailListAction