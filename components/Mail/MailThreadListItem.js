import {
  MdStarBorder,
  MdStar,
  MdLabelOutline,
  MdLabel,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md'
import React from 'react';
import { getDateByTime } from '../../lib/utils'
import IconButton from '../Button/IconButton'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { changeMailThread } from '../../reducers/store/mailThread';

const MailThreadListItem = ({
  thread,
  onSelectThread
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
  console.log(thread)

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

  return (
    <tr
      className={`flex h-10 py-2 text-sm antialiased font-bold bg-white cursor-pointer hover:shadow-xl ${thread.hasUnread ? 'bg-opacity-90' : 'bg-opacity-70'}`}
    >
      <td className="flex items-center pl-2">
        <IconButton
          size="xs"
          label="Select"
          tooltipLocation="bottom"
          imgComponent={
            <MdCheckBoxOutlineBlank size="20px" color="gray"/>
          }
          onClickHandler={() => {}}
        />
      </td>
      <td className="flex items-center">
        {
          starredMailUids.length > 0 ? (
            <IconButton
              size="xs"
              label="Unset Star"
              tooltipLocation="bottom"
              imgComponent={
                <MdStar size="20px" color="#F4C86A" />
              }
              onClickHandler={onClickStar}
            />
          )
          : (
            <IconButton
              size="xs"
              label="Set Star"
              tooltipLocation="bottom"
              imgComponent={
                <MdStarBorder size="20px" color="gray" />
              }
              onClickHandler={onClickStar}
            />
          )
        }
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
          {threadParticipants.join(', ')}
        </div>
        {
          <span className="ml-1 text-xs antialiased text-gray-500">
            {
              (threadParticipants.length > 1 && Object.keys(linkedMailUids).length > 1) &&
              threadParticipants.length
            }
          </span>
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
    prevProps.thread.hasUnread === nextProps.thread.hasUnread &&
    prevProps.thread.deletedMailUids.length === nextProps.thread.deletedMailUids.length &&
    prevProps.thread.isImportant === nextProps.thread.isImportant &&
    prevProps.thread.isSelected === nextProps.thread.isSelected

}

export default React.memo(MailThreadListItem, areEqual)