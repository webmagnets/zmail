import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown, MdClose, MdDelete, MdForward, MdReply } from 'react-icons/md'
import IconButton from '../Button/IconButton'
import Dropdown from '../Dropdown/Dropdown';

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

  const textareaRef = useRef(null);
  const [recipients, setRecipients] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [content, setContent] = useState("");
  const [isComposeTypeDropdownOpen, setIsComposeTypeDropdownOpen] = useState(false);
  
  useEffect(() => {
    if (composeType === 'forward') {
      setContent(emailPreContent);
    } else {
      setContent("");
    }
  }, [composeType, emailPreContent])

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '150px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef, content])

  const composeTypeDropdownData = [
    {
      label: 'Reply',
      iconComponent: (<MdReply size="20px" color="rgb(87, 87, 87)" />),
      onClickHandler: () => {
        onClickChangeComposeType('reply')
      }
    },
    {
      label: 'Forward',
      iconComponent: (<MdForward size="20px" color="rgb(87, 87, 87)" />),
      onClickHandler: () => {
        onClickChangeComposeType('forward')
      }
    },
  ]

  const handleRecipients = () => {
    const email = emailValue.trim();
    const index = recipients.findIndex(el => el === email);

    if (index === -1 && email !== '') {
      const cp = [...recipients];
      cp.push(email);
      setRecipients(cp);
    }
    
    setEmailValue('');
  }

  const handleKeyPress = (e) => {
    const { code } = e;
    
    if (code === 'Space') {
      handleRecipients();
    }
  }

  const handleOnSend = () => {
    if (recipients.length === 0) {
      alert('Please enter at least on recipient.')
    } else {
      onClickClose();
      onClickSend(
        recipients,
        content,
        senderUserUid,
        senderEmail,
        sourceThreadId
      )
    }
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
            <div className={`relative flex items-center p-2 -ml-2 transition-all rounded-md cursor-pointer hover:bg-gray-500 hover:bg-opacity-10 ${isComposeTypeDropdownOpen && 'bg-gray-500 bg-opacity-10'}`}>
              <div
                className="flex items-center"
                onClick={() => setIsComposeTypeDropdownOpen(true)}
              >
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
              {
                isComposeTypeDropdownOpen &&
                <Dropdown
                  data={composeTypeDropdownData}
                  onCloseDropdown={() => setIsComposeTypeDropdownOpen(false)}
                />
              }
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
                      onBlur={() => handleRecipients()}
                      placeholder={recipients.length > 0 ? '' : 'Recipients'}
                      className="w-full h-full text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full h-32 text-sm outline-none resize-none"
            />
          </div>
          <div className="flex justify-between px-4 pb-4">
            <div
              className="flex items-center justify-center px-6 text-sm tracking-wide text-white transition-all bg-blue-600 rounded-md cursor-pointer hover:shadow hover:bg-blue-500"
              onClick={() => handleOnSend()}
            >
              Send
            </div>
            <div className="flex items-center mr-3.5">
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