import Image from 'next/image'
import { MdMoreVert, MdReply, MdStar, MdStarBorder } from 'react-icons/md';
import { getDateByTime } from '../../lib/utils';
import IconButton from '../Button/IconButton';

const MailListItem = ({
  mail,
  isLast,
  expandedMailUids,
  onAddExpandedMailUids,
  onRemoveExpandedMailUids,
  currentUserUid,
  handleOnClickItem
}) => {
  const receiverNames = mail.receiverDetails.reduce((acc, cur) => {
    const name = cur.userUid === currentUserUid ? 'me' : cur.displayName;

    if (acc === '') {
      return acc += name
    } else {
      return acc += `, ${name}`
    }
  }, '')

  const handleOnClick = (type, value = '') => {
    handleOnClickItem(mail.mailUid, type, value);
  }

  const isExpanded = expandedMailUids.findIndex(el => el === mail.mailUid) !== -1;

  const handleOnExpand = () => {
    if (isExpanded) {
      onRemoveExpandedMailUids(mail.mailUid);
    } else {
      onAddExpandedMailUids(mail.mailUid);
    }
  }

  const mailSentAt = (secs) => {
    const t = getDateByTime(secs);
    return t.toLocaleString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    )
  }

  return (
    <div>
      <div className="flex">
        <div
          className="flex items-center justify-center h-20 px-4 cursor-pointer min-w-40"
          onClick={() => handleOnExpand()}
        >
          <Image src={mail.senderDetails.photoUrl} height="40px" width="40px" alt="mail-profile" className="rounded-full"/>
        </div>
        <div className="flex flex-col flex-auto w-full pb-5">

          {/* Mail Header */}
          <div className="w-full pt-5 cursor-pointer">
            <table className="w-full">
              <tbody>
                <tr className="flex pr-2">
                  <td
                    className="flex items-center flex-auto"
                    onClick={() => handleOnExpand()}
                  >
                    <span className="text-sm antialiased font-bold">
                      {mail.senderDetails.displayName}
                    </span>
                    <span className="ml-1 text-xs antialiased text-gray-700">
                      {`<${mail.senderDetails.email}>`}
                    </span>
                  </td>
                  <td className="flex items-center">
                    <span className="text-xs text-gray-500">
                      {mailSentAt(mail.sentAt)}
                    </span>
                  </td>
                  <td className="relative w-5 ml-5">
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {
                        mail.isStarred ? (
                          <IconButton
                            size="medium"
                            onClickHandler={() => handleOnClick('star', false)}
                            imgComponent={
                              <MdStar size="20px" color="#F4C86A" />
                            }
                          />
                        )
                        : (
                          <IconButton
                            size="medium"
                            onClickHandler={() => handleOnClick('star', true)}
                            imgComponent={
                              <MdStarBorder size="20px" color="rgb(87,87,87)" />
                            }
                          />
                        )
                      }
                    </div>
                  </td>
                  <td className={`relative w-5 ml-5 ${(isLast || isExpanded) ? 'block' : 'hidden'}`}>
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <IconButton
                        size="medium"
                        label="Reply"
                        tooltipLocation="bottom"
                        onClickHandler={() => handleOnClick('reply', {
                          senderEmail: mail.senderDetails.email,
                          senderDisplayName: mail.senderDetails.displayName,
                          senderUserUid: mail.senderUid,
                          sourceThreadId: mail.sourceThreadId
                        })}
                        imgComponent={
                          <MdReply size="20px" color="rgb(87,87,87)" />
                        }
                      />
                    </div>
                  </td>
                  <td className={`relative w-5 ml-5 ${(isLast || isExpanded) ? 'block' : 'hidden'}`}>
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <IconButton
                        size="medium"
                        label="More"
                        tooltipLocation="bottom"
                        imgComponent={
                          <MdMoreVert size="20px" color="rgb(87,87,87)" />
                        }
                        onClickHandler={() => {}}
                      />
                    </div>
                  </td>
                </tr>
                <tr onClick={() => handleOnExpand()}>
                <td className="text-xs text-gray-500">
                  <span className="overflow-ellipsis">
                    {
                      (isLast || isExpanded)
                        ? `to ${receiverNames}`
                        : `${mail.content}`
                    }
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          {
            // Mail Content
            (isLast || isExpanded) &&
            <div className="mt-2">
              <div className="text-sm whitespace-pre-wrap">
                {mail.content}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MailListItem;