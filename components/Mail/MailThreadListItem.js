import {
  MdStarBorder,
  MdStar,
  MdLabelOutline,
  MdLabel,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md'
import React, { useEffect, useMemo, useState } from 'react';
import { getDateByTime } from '../../lib/utils'
import IconButton from '../Button/IconButton'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { changeMailThread, setSelectedMailThreads } from '../../reducers/store/mailThread';

const MailThreadListItem = ({
  thread
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const category = router.query.category;
  const currentUser = useSelector(({ user }) => user.currentUser);
  const selectedMailThreads = useSelector(({ mailThread }) => mailThread.selectedMailThreads);

  const [isSelected, setIsSelected] = useState(false);

  const {
    threadOwnerUid,
    threadId,
    headMail,
    threadParticipants,
    linkedMailUids,
    threadTitle,
    starredMailUids,
    isImportant
  } = thread;

  useEffect(() => {
    if (selectedMailThreads) {
      setIsSelected(
        selectedMailThreads.findIndex(el => el.threadId === threadId) > -1
      )
    }
  }, [selectedMailThreads, threadId])

  const participantsString = () => {
    const { senderDetails } = headMail;

    return category === 'sent'
      ? `To: 
        ${(senderDetails.email === currentUser.email ? 'Me' : senderDetails.displayName)}
      `
      : threadParticipants.join(', ')
  }

  const threadCreatedAt = (secs) => {
    const t = getDateByTime(secs);
    const now = new Date();

    const tDateString = t.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    const nowDateString = now.toLocaleString('en-US', { month: 'short', day: 'numeric' })

    if (
      tDateString === nowDateString
    ) {
      return t.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    } else {
      return tDateString
    }
  }

  const onSelectThread = () => {
    const cp = [...selectedMailThreads];

    if (isSelected) {
      dispatch(setSelectedMailThreads(
        cp.filter(el => el.threadId !== threadId)
      ))
    } else {
      cp.push(thread);
      dispatch(setSelectedMailThreads(cp));
    }
  }

  const onClickMailThread = (threadId) => {
    // Navigate to Mails Page
    router.push(`${router.asPath}/${threadId}`);

    // Set MailThread to be read
    dispatch(changeMailThread(
      threadOwnerUid,
      threadId,
      {
        hasUnread: false
      }
    ))
  }

  const onClickStar = () => {
    const updated = starredMailUids.length === 0
      ? [headMail.mailUid]
      : []

    dispatch(changeMailThread(
      threadOwnerUid,
      threadId,
      {
        starredMailUids: updated
      }
    ))
  }

  const onClickImporant = () => {
    const updated = !isImportant;

    dispatch(changeMailThread(
      threadOwnerUid,
      threadId,
      {
        isImportant: updated
      }
    ))
  }

  const isOpaque = category === 'sent' ? true : !thread.hasUnread;

  return (
    <tr
      className={`flex h-11 py-2 text-sm antialiased bg-white cursor-pointer hover:shadow-2xl ${isOpaque ? 'bg-opacity-70 ' : 'bg-opacity-90 font-bold'}`}
    >
      <td className="flex items-center pl-2">
        <IconButton
          size="xs"
          imgComponent={
            isSelected
              ? <MdCheckBox size="20px" color="gray" />
              : <MdCheckBoxOutlineBlank size="20px" color="gray"/>
          }
          onClickHandler={() => onSelectThread()}
        />
      </td>
      <td className="flex items-center">
        <IconButton
          size="xs"
          label={
            starredMailUids.length > 0
              ? 'Unset Star'
              : 'Set Star'
          }
          tooltipLocation="bottom"
          imgComponent={
            starredMailUids.length > 0
              ? <MdStar size="20px" color="#F4C86A" />
              : <MdStarBorder size="20px" color="gray" />
          }
          onClickHandler={onClickStar}
        />
      </td>
      <td className="flex items-center">
        <div className="flex items-center justify-center pr-3">
          {
            isImportant ? (
              <IconButton
                size="xs"
                label="Set Unimportant"
                tooltipLocation="bottom"
                imgComponent={
                  <MdLabel size="20px" color="#F4C86A" />
                }
                onClickHandler={onClickImporant}
              />
            )
            : (
              <IconButton
                size="xs"
                label="Set Important"
                tooltipLocation="bottom"
                imgComponent={
                  <MdLabelOutline size="20px" color="gray" />
                }
                onClickHandler={onClickImporant}
              />    
            )
          }
        </div>
      </td>
      <td
        className="flex items-center max-w-2xl flex-basis-168"
        onClick={() => onClickMailThread(threadId)}
      >
        <div className="truncate">
          {participantsString()}
        </div>
        {
          category !== 'sent' && (
            <span className="ml-1 text-xs antialiased text-gray-500">
              {
                (threadParticipants.length > 1 && Object.keys(linkedMailUids).length > 1) &&
                threadParticipants.length
              }
            </span>
          )
        }
      </td>
      <td
        className="flex items-center flex-auto min-w-0"
        onClick={() => onClickMailThread(threadId)}
      >
        <div className="truncate">
          {threadTitle}
        </div>
      </td>
      <td
        className="flex items-center pr-4 flex-basis-56"
        onClick={() => onClickMailThread(threadId)}
      >
        <div className="truncate">
          {threadCreatedAt(headMail.sentAt)}
        </div>
      </td>
    </tr>
  )
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.thread.threadId === nextProps.thread.threadId &&
    prevProps.thread.headMail.mailUid === nextProps.thread.headMail.mailUid &&
    prevProps.thread.starredMailUids.length === nextProps.thread.starredMailUids.length &&
    prevProps.thread.deletedMailUids.length === nextProps.thread.deletedMailUids.length &&
    prevProps.thread.hasUnread === nextProps.thread.hasUnread &&
    prevProps.thread.isImportant === nextProps.thread.isImportant

}

export default React.memo(MailThreadListItem, areEqual)