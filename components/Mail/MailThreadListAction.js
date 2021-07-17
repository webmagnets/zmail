import {
  MdRefresh,
  MdMoreVert,
  MdDelete,
  MdDrafts,
  MdMarkunread,
  MdErrorOutline,
  MdCheckBoxOutlineBlank,
  MdArrowDropDown,
  MdIndeterminateCheckBox,
  MdCheckBox
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedMailThreads, setReadSectionStatus, setSelectedMailThreads, setUnreadSectionStatus } from '../../reducers/store/mailThread';
import IconButton from '../Button/IconButton';

const MailThreadListAction = () => {
  const dispatch = useDispatch();
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);
  const selectedMailThreads = useSelector(({ mailThread }) => mailThread.selectedMailThreads);
  
  const handleOnClickCheckbox = () => {
    if (curMailThreads.length === selectedMailThreads.length) {
      dispatch(setSelectedMailThreads([]));
    } else {
      dispatch(setSelectedMailThreads(
        [...curMailThreads]
      ));
      dispatch(setReadSectionStatus(true));
      dispatch(setUnreadSectionStatus(true));
    }
  }
  
  const checkbox = () => {
    if (curMailThreads.length === selectedMailThreads.length) {
      return <MdCheckBox size="20px" color="white" />
    } else if (selectedMailThreads.length === 0) {
      return <MdCheckBoxOutlineBlank size="20px" color="white" />
    } else {
      return <MdIndeterminateCheckBox size="20px" color="white" />
    }
  }

  const handleOnDelete = () => {
    dispatch(deleteSelectedMailThreads())
  }

  return (
    <div className="flex items-center justify-start h-12 border-b border-opacity-20">
      <div className="flex items-center mr-2">
        <div
          className="px-1 py-2 transition rounded-md cursor-pointer hover:bg-gray-100 hover:bg-opacity-10"
          onClick={() => handleOnClickCheckbox()}
        >
          {checkbox()}
        </div>
        <div className="-ml-1.5 py-2 transition rounded-md cursor-pointer hover:bg-gray-100 hover:bg-opacity-10">
          <MdArrowDropDown size="20px" color="white" />
        </div>
      </div>
      <div className={`
        flex
        space-x
        ${selectedMailThreads.length > 0 ? 'hidden' : 'block'}
      `}>
        <IconButton 
          size="medium"
          label="Refresh"
          tooltipLocation="bottom"
          imgComponent={
            <MdRefresh size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="More"
          tooltipLocation="bottom"
          imgComponent={
            <MdMoreVert size="20px" color="white" />
          }
        />
      </div>
      <div className={`
        flex
        space-x
        ${selectedMailThreads.length > 0 ? 'block' : 'hidden'}
      `}>
        <IconButton 
          size="medium"
          label="Spam"
          tooltipLocation="bottom"
          imgComponent={
            <MdErrorOutline size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="Delete"
          tooltipLocation="bottom"
          imgComponent={
            <MdDelete size="20px" color="white" />
          }
          onClickHandler={handleOnDelete}
        />
        <IconButton
          size="medium"
          label="Mark Unread"
          tooltipLocation="bottom"
          imgComponent={
            <MdMarkunread size="20px" color="white" />
          }
        />
      </div>
    </div>
  )
}

export default MailThreadListAction;