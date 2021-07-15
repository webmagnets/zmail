import Image from 'next/image'
import { useEffect, useState } from 'react';
import { MdArrowDropDown, MdClose, MdDelete, MdForward, MdReply } from 'react-icons/md'
import IconButton from '../Button/IconButton'

const MailCompose = ({
  currentUser,
  composeEmailDetail,
  onClickClose,
  onClickSend,
  onClickChangeComposeType
}) => {
  const {
    composeType,
    senderEmail,
    senderUserUid,
    sourceThreadId,
    emailPreContent = ''
  } = composeEmailDetail;

  const [recipients, setRecipients] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [content, setContent] = useState('');

  const handleKeyPress = (e) => {
    const { code } = e;
    
    if (code === 'Space') {
      const email = emailValue.trim();
      const index = recipients.findIndex(el => el === email);

      if (index === -1 && email !== '') {
        const cp = [...recipients];
        cp.push(email);
        setRecipients(cp);
      }
      
      setEmailValue('');
    }
  }

  const handleOnSend = () => {
    onClickClose();
    onClickSend(
      recipients,
      content,
      senderUserUid,
      senderEmail,
      sourceThreadId
    )
  }

  const onDeleteRecipient = (email) => {
    const cp = [...recipients];
    const filtered = cp.filter(el => el !== email)
    setRecipients(filtered);
  }

  useEffect(() => {
    // Reset State
    setRecipients([]);
    setEmailValue('');
    setContent('');
    
    if (senderEmail) {
      setRecipients([senderEmail]);
    }
  }, [senderEmail])

  return (
    <div className="flex">
      <div className="flex items-start justify-center h-20 px-4 cursor-pointer min-w-40">
        <Image src={currentUser.photoUrl} height="40px" width="40px" alt="mail-profile" className="rounded-full"/>
      </div>
      <div className="flex flex-col flex-auto w-full mb-5">
        <div className="min-h-full transition-shadow border rounded-md hover:shadow-lg">
          <div className="flex px-4 py-1.5">
            <div className="flex items-center p-2 -ml-2 transition-all rounded-md cursor-pointer hover:bg-gray-500 hover:bg-opacity-10">
              {
                composeType === 'reply' ? (
                  <MdReply size="20px" color="rgb(87, 87, 87)" />
                )
                : (
                  <MdForward size="20px" color="rgb(87, 87, 87)" />
                )
              }
              <MdArrowDropDown size="20px" color="rgb(87, 87, 87)" />
            </div>
            <div className="flex flex-wrap flex-auto">
              <div className="inline-flex items-center">
                <span className="mr-1 text-sm text-gray-500">To</span>
                <div className="flex flex-wrap items-center">
                  {
                    recipients.map(r => {
                      return (
                        <div
                          key={r}
                          className="flex h-5 items-center justify-center px-2 mr-1.5 text-sm text-gray-500 border rounded-full hover:bg-gray-100"
                        >
                          <span className="mr-1">
                            {r}
                          </span>
                          <MdClose
                            size="15px"
                            color="rgb(107, 114, 128)"
                            className="cursor-pointer"
                            onClick={e => onDeleteRecipient(r)}
                          />
                        </div>
                      )
                    })
                  }
                  <div>
                    <input
                      value={emailValue}
                      onChange={e => setEmailValue(e.target.value)}
                      onKeyPress={e => handleKeyPress(e)}
                      placeholder="Recipients"
                      className="w-full h-full text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full h-32 outline-none resize-none"
            />
          </div>
          <div className="flex justify-between px-4 pb-4">
            <div
              className="flex items-center justify-center px-6 text-sm tracking-wide text-white transition-all bg-blue-600 rounded-md cursor-pointer hover:shadow hover:bg-blue-500"
              onClick={() => handleOnSend()}
            >
              Send
            </div>
            <div className="flex items-center">
              <IconButton
                size="small"
                label="Discard Draft"
                tooltipLocation="bottom"
                imgComponent={
                  <MdDelete size="25px" color="rgb(87, 87, 87)" />
                }
                onClickHandler={onClickClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailCompose