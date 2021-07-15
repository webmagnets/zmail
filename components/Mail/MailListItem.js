import {
  MdStarBorder,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md'
import React from 'react';
import { getDateByTime } from '../../lib/utils'
import IconButton from '../Button/IconButton'

function MailListItem({
  thread,
  onSelectThread
}) {
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
  return (
    <tr className={`flex h-10 py-2 text-sm antialiased font-bold bg-white cursor-pointer hover:shadow-xl ${thread.hasUnread ? 'bg-opacity-90' : 'bg-opacity-70'}`}>
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
          thread.hasStars ? (
            <IconButton
              size="xs"
              label="Unset Star"
              tooltipLocation="bottom"
              imgComponent={
                <div className={`h-5 w-5 opacity-40 bg-cover bg-active-star`} />
              }
              onClickHandler={() => {}}
            />
          )
          : (
            <IconButton
              size="xs"
              label="Set Star"
              tooltipLocation="bottom"
              imgComponent={
                <div className={`h-5 w-5 opacity-40 bg-cover bg-inactive-star`} />
              }
              onClickHandler={() => {}}
            />
          )
        }
      </td>
      <td className="flex items-center">
        <div className="flex items-center justify-center pr-3">
          {
            thread.isImportant ? (
              <IconButton
                size="xs"
                label="Set Unimportant"
                tooltipLocation="bottom"
                imgComponent={
                  <div className={`h-5 w-5 opacity-40 bg-cover bg-active-important`} />
                }
                onClickHandler={() => {}}
              />
            )
            : (
              <IconButton
                size="xs"
                label="Set Important"
                tooltipLocation="bottom"
                imgComponent={
                  <div className={`h-5 w-5 opacity-40 bg-cover bg-inactive-important`} />
                }
                onClickHandler={() => {}}
              />    
            )
          }
        </div>
      </td>
      <td className="flex items-center max-w-2xl flex-basis-168">
        <div className="truncate">
          {thread.threadParticipants.join(', ')}
        </div>
        {
          <span className="ml-1 text-xs antialiased text-gray-500">
            {
              (thread.threadParticipants.length > 1 && Object.keys(thread.linkedMailUids).length > 1) &&
              thread.threadParticipants.length
            }
          </span>
        }
      </td>
      <td className="flex items-center flex-auto min-w-0">
        <div className="truncate">
          {thread.headMail.subject}
        </div>
      </td>
      <td className="flex items-center pr-4 flex-basis-56">
        <div className="truncate">
          {threadCreatedAt(thread.headMail.createdAt)}
        </div>
      </td>
    </tr>
  )
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.thread.threadId === nextProps.thread.threadId &&
    prevProps.thread.headMail.mailUid === nextProps.thread.headMail.mailUid &&
    prevProps.thread.hasStars === nextProps.thread.hasStars &&
    prevProps.thread.hasUnread === nextProps.thread.hasUnread &&
    prevProps.thread.isDeleted === nextProps.thread.isDeleted &&
    prevProps.thread.isImportant === nextProps.thread.isImportant &&
    prevProps.thread.isSelected === nextProps.thread.isSelected

}

export default React.memo(MailListItem, areEqual)