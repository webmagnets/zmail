import { useEffect, useRef, useState } from 'react';
import { MdClose, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import { getMailForSend, getNewThread, validateRecipients } from '../../lib/utils';
import { setMails } from '../../reducers/store/mail';
import { setMailThreads } from '../../reducers/store/mailThread';
import IconButton from '../Button/IconButton';

const ComposeMailModal = ({
  handleComposeMailOpenStatus
}) => {
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const [recipients, setRecipients] = useState([]);
  const [subjectValue, setSubjectValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [content, setContent] = useState("");

  const currentUser = useSelector(({ user }) => user.currentUser);
  const userHashMap = useSelector(({ user }) => user.userHashMap);
  const mailHashMap = useSelector(({ mail }) => mail.mailHashMap);
  const mailThreadsHashMap = useSelector(({ mailThread }) => mailThread.mailThreadsHashMap);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '350px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef, content])

  useEffect(() => {
    // Reset State
    setRecipients([]);
    setEmailValue('');
  }, [])

  const onDeleteRecipient = (email) => {
    const cp = [...recipients];
    const filtered = cp.filter(el => el !== email)
    setRecipients(filtered);
  }

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

  const handleOnSendNewMail = () => {
    const [isValid, validUids] = validateRecipients(recipients, userHashMap)

    if (isValid) {
      console.log("Sending New Mail");

      const mailSubject = subjectValue === '' ? 'No Subject' : subjectValue;
      const newMailUid = uuid();

      // Get Default Thread Object for user
      const newThreadForUser = getNewThread(
        currentUser.userUid,
        validUids,
        mailSubject,
        newMailUid
      )
      
      // Since its a mail that you send, set hasUnread to false
      newThreadForUser.hasUnread = false;

      // Get Default Mail Object
      const newMail = getMailForSend(
        currentUser.userUid,
        validUids,
        content,
        newThreadForUser.threadId,
        newMailUid
      )

      // Add Mail to MailHashMap
      dispatch(setMails(
        {
          ...mailHashMap,
          [newMail.mailUid]: newMail
        }
      ))

      const updatedMailThreadsHashMap = { ...mailThreadsHashMap };

      // Add New Thread for user
      updatedMailThreadsHashMap[currentUser.userUid].push(newThreadForUser)
      
      for (let i = 0; i < validUids.length; i++) {
        // Skip if user's uid is in recipients list
        // - This is because we have already put that message in user's thread above
        if (validUids[i] === currentUser.userUid) {
          continue;
        }

        const newThreadForReceiver = getNewThread(
          validUids[i],
          [currentUser.userUid],
          mailSubject,
          newMail.mailUid
        )
        
        // Add New Thread for receivers
        updatedMailThreadsHashMap[validUids[i]].push(newThreadForReceiver);
      }

      dispatch(setMailThreads(updatedMailThreadsHashMap));
      handleComposeMailOpenStatus(false);

    } else {
      alert('The recipients are not valid. Please type in emails of the available users for this project.')
    }
  }

  return (
    <div className="absolute bottom-0 right-0 z-20 flex-col overflow-hidden bg-white rounded-md fle composeMailModal">
      <div className="flex items-center justify-between px-3.5 py-3 text-sm antialiased font-semibold text-white bg-black bg-opacity-80 rounded-t-md">
        <div>
          <span>New Message</span>
        </div>
        <div
          className="p-1 cursor-pointer hover:bg-gray-500"
          onClick={() => handleComposeMailOpenStatus(false)}
        >
          <MdClose size="15px" color="white" />
        </div>
      </div>

      <div className="px-3 py-1 space-y-1">
        <div className="flex items-center border-b">
          <span className="mr-2 text-sm text-gray-500">To</span>
          <div className="flex flex-wrap items-center py-1">
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
                      onClick={() => onDeleteRecipient(r)}
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
        <div className="flex items-center border-b">
          <input
            type="text"
            value={subjectValue}
            onChange={e => setSubjectValue(e.target.value)}
            className="w-full py-1.5 text-sm outline-none"
            placeholder="Subject"
          />  
        </div>
      </div>

      <div className="flex-auto px-3 pt-2">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full overflow-y-auto text-sm outline-none resize-none composeMailTextarea"
        />
      </div>

      <div className="flex items-center justify-between px-3 py-2 border-t">
        <div
          onClick={() => handleOnSendNewMail()}
          className="flex items-center justify-center px-6 py-2 text-sm tracking-wide text-white transition-all bg-blue-600 rounded-md cursor-pointer hover:shadow hover:bg-blue-500"
        >
          Send
        </div>
        <div>
          <IconButton
            size="small"
            label="Discard"
            tooltipLocation="top"
            imgComponent={
              <MdDelete size="20px" color="rgb(87, 87, 87)" />
            }
            onClickHandler={() => handleComposeMailOpenStatus(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ComposeMailModal;