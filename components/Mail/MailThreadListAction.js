import { useState } from 'react';
import {
  MdRefresh,
  MdMoreVert,
  MdDelete,
  MdMarkunread,
  MdCheckBoxOutlineBlank,
  MdArrowDropDown,
  MdIndeterminateCheckBox,
  MdCheckBox,
  MdDeleteSweep,
  MdReport,
  MdDrafts,
  MdMoveToInbox
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useCategory from '../../hooks/category';
import { deleteSelectedMailThreads, readSelectedMailThreads, recoverSelectedMailThreads, setReadSectionStatus, setSelectedMailThreads, setUnreadSectionStatus, unreadSelectedMailThreads } from '../../reducers/store/mailThread';
import { addUsersToSpam, removeUsersFromSpam } from '../../reducers/store/user';
import IconButton from '../Button/IconButton';
import Dropdown from '../Dropdown/Dropdown';

const MailThreadListAction = () => {
  const dispatch = useDispatch();
  const category = useCategory();
  const currentUser = useSelector(({ user }) => user.currentUser)
  const mailThreadsHashMap = useSelector(({ mailThread }) => mailThread.mailThreadsHashMap);
  const curMailThreads = useSelector(({ mailThread }) => mailThread.curMailThreads);
  const selectedMailThreads = useSelector(({ mailThread }) => mailThread.selectedMailThreads);

  const [isSelectDropdownOpen, setIsSelectDropdownOpen] = useState(false);
  
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
    if (curMailThreads.length === selectedMailThreads.length && selectedMailThreads.length > 0) {
      return <MdCheckBox size="20px" color="white" />
    } else if (selectedMailThreads.length === 0) {
      return <MdCheckBoxOutlineBlank size="20px" color="white" />
    } else {
      return <MdIndeterminateCheckBox size="20px" color="white" />
    }
  }

  const dropdownData = [
    {
      label: 'All',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads([
          ...curMailThreads
        ]))
      }
    },
    {
      label: 'None',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads([]))
      }
    },
    {
      label: 'Read',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads(
          curMailThreads.filter(thread => !thread.hasUnread)
        ))
      }
    },
    {
      label: 'Unread',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads(
          curMailThreads.filter(thread => thread.hasUnread)
        ))
      }
    },
    {
      label: 'Starred',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads(
          curMailThreads.filter(thread => thread.starredMailUids.length > 0)
        ))
      }
    },
    {
      label: 'Unstarred',
      onClickHandler: () => {
        dispatch(setSelectedMailThreads(
          curMailThreads.filter(thread => thread.starredMailUids.length === 0)
        ))
      }
    }
  ]

  const handleOnDelete = () => {
    dispatch(deleteSelectedMailThreads());
  }

  const handleOnRecover = () => {
    dispatch(recoverSelectedMailThreads());
  }

  const handleOnUnread = () => {
    dispatch(unreadSelectedMailThreads());
  }

  const handleOnRead = () => {
    dispatch(readSelectedMailThreads());
  }

  const handleOnSpam = (type) => {
    const userThreads = mailThreadsHashMap[currentUser.userUid]
    const userUidsObj = selectedMailThreads.reduce((acc, cur) => {
      const { threadParticipants } = userThreads.filter(t => t.threadId === cur.threadId)[0];
      
      threadParticipants.forEach(p => {
        if (p !== currentUser.userUid) {
          acc[p] = 1;
        }
      })

      return acc
    }, {})

    if (type === 'add') {
      dispatch(addUsersToSpam(Object.keys(userUidsObj)));
    } else {
      dispatch(removeUsersFromSpam(Object.keys(userUidsObj)));
    }
  }

  const hasUnreadSelectedThreads = selectedMailThreads.filter(thread => thread.hasUnread).length > 0

  return (
    <div className="flex items-center justify-start h-12 border-b border-opacity-20">
      <div className="relative flex items-center mr-2">
        <div
          className="px-1 py-2 transition rounded-md cursor-pointer hover:bg-gray-100 hover:bg-opacity-10"
          onClick={() => handleOnClickCheckbox()}
        >
          {checkbox()}
        </div>
        <div
          className="-ml-1.5 py-2 transition rounded-md cursor-pointer hover:bg-gray-100 hover:bg-opacity-10"
          onClick={() => setIsSelectDropdownOpen(true)}
        >
          <MdArrowDropDown size="20px" color="white" />
        </div>
        {
          isSelectDropdownOpen &&
          <Dropdown data={dropdownData} onCloseDropdown={() => setIsSelectDropdownOpen(false)}/>
        }
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
          label={
            category !== 'spam'
              ? 'Spam'
              : 'Remove Spam'
          }
          tooltipLocation="bottom"
          imgComponent={
            category !== 'spam'
              ? <MdReport size="20px" color="white" />
              : <MdMoveToInbox size="20px" color="white" />
          }
          onClickHandler={
            category !== 'spam'
              ? () => handleOnSpam('add')
              : () => handleOnSpam('remove')
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
              ? handleOnDelete
              : handleOnRecover
          }
        />
        {
          category !== 'spam' &&
          <IconButton
            size="medium"
            label={
              hasUnreadSelectedThreads
                ? 'Mark Read'
                : 'Mark Unread'
            }
            tooltipLocation="bottom"
            imgComponent={
              hasUnreadSelectedThreads
                ? <MdDrafts size="20px" color="white" />
                : <MdMarkunread size="20px" color="white" />
            }
            onClickHandler={
              hasUnreadSelectedThreads
                ? handleOnRead
                : handleOnUnread
            }
          />
        }
      </div>
    </div>
  )
}

export default MailThreadListAction;