import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdLabel, MdLabelOutline, MdUnfoldLess, MdUnfoldMore } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../components/Button/IconButton';
import MailLayout from '../../../components/Layouts/MailLayout';
import MailList from '../../../components/Mail/MailList';
import MailListAction from '../../../components/Mail/MailListAction';
import useCategory from '../../../hooks/category';
import { getMailForSend, getMailWithUserInfo, getNewThread, validateRecipients } from '../../../lib/utils';
import { setMails } from '../../../reducers/store/mail';
import { changeMailThread, setMailThreads } from '../../../reducers/store/mailThread';

const MailThread = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector(({ user }) => user.currentUser);
  const userHashMap = useSelector(({ user }) => user.userHashMap);
  const mailHashMap = useSelector(({ mail }) => mail.mailHashMap);
  const mailThreadsHashMap = useSelector(({ mailThread }) => mailThread.mailThreadsHashMap);
  const category = useCategory();

  const [mailThread, setMailThread] = useState({
    title: '',
    mailList: [],
    isImporant: false,
    starredMailUids: []
  });

  useEffect(() => {
    if (currentUser.uid === '') {
      alert('Please select a user in the landing page to proceed to Mail Page.')
      router.push('/')
    }
  }, [currentUser])

  const [expandedMailUids, setExpandedMailUids] = useState([]);
  const hasExpandedAll = expandedMailUids.length >= mailThread.mailList.length - 1

  console.log(mailThread);

  const handleAddExpandedMailUids = (targetMailUid) => {
    const cp = [...expandedMailUids];
    cp.push(targetMailUid);
    setExpandedMailUids(cp);
  }

  const handleRemoveExpandedMailUids = (targetMailUid) => {
    setExpandedMailUids(
      [...expandedMailUids].filter(uid => uid !== targetMailUid)
    );
  }

  const handleExpandAll = () => {
    if (hasExpandedAll) {
      setExpandedMailUids([]);
    } else {
      setExpandedMailUids([
        ...mailThread.mailList.map(mail => mail.mailUid)
      ])
    }

  };

  const onClickImporant = (status) => {
    dispatch(changeMailThread(
      currentUser.userUid,
      mailThread.threadId,
      {
        isImportant: status
      }
    ))
  }

  const updateMailThreadWithNewMail = (thread, newMail, userUid) => {
    const { threadId, headMailUid, linkedMailUids, threadParticipants, threadOwnerUid } = thread;
    
    const updateUnread = !(thread.threadId === newMail.sourceThreadId);

    const updatedHeadMailUid = newMail.mailUid;
    const updatedThreadParticipants = [ ...threadParticipants ];
    const updatedLinkedMailUids = { ...linkedMailUids };
    updatedLinkedMailUids[updatedHeadMailUid] = headMailUid;

    if (threadOwnerUid !== userUid) {
      const index = updatedThreadParticipants.findIndex(el => userUid);
      if (index === -1) {
        updatedThreadParticipants.push(userUid);
      }
    }

    dispatch(changeMailThread(
      userUid,
      threadId,
      {
        linkedMailUids: updatedLinkedMailUids,
        headMailUid: updatedHeadMailUid,
        threadParticipants: updatedThreadParticipants,
        hasUnread: updateUnread
      }
    ))
  }

  const handleOnSendEmail = (
    recipientEmails,
    content,
    senderUserUid,
    senderEmail,
    sourceThreadId
  ) => {
    const [isValid, validUids] = validateRecipients(recipientEmails, userHashMap);
    console.log(recipientEmails, content);

    if (isValid) {
      console.log("Send Email: ", recipientEmails, content, senderUserUid, senderEmail, sourceThreadId);

      // Get Default Mail Object
      const newMail = getMailForSend(
        currentUser.userUid,
        validUids,
        content,
        mailThread.threadId
      )

      // Add Mail to MailHashMap
      dispatch(setMails(
        {
          ...mailHashMap,
          [newMail.mailUid]: newMail
        }
      ))

      // // 1. Add mail to the user's thread
      updateMailThreadWithNewMail(mailThread, newMail, currentUser.userUid);

      // 2. Add mail to recipients threads
      const updatedMailThreadsHashMap = { ...mailThreadsHashMap };

      for (let i = 0; i < validUids.length; i++) {
        // Skip if user's uid is in recipients list
        // - This is because we have already put that message in user's thread above
        if (validUids[i] === currentUser.userUid) {
          continue;
        }

        // 2-1. Source Thread Id
        if (validUids[i] === senderUserUid) {
          console.log('Source Thread Owner', validUids[i]);
          const senderThreads = mailThreadsHashMap[senderUserUid];
          const index = senderThreads.findIndex(el => el.threadId === sourceThreadId);
          updateMailThreadWithNewMail(senderThreads[index], newMail, validUids[i]);

        // 2-2. X Source Thread Id
        } else {
          console.log('New Thread', validUids[i]);
          // A. Create New Thread with New Mail as head
          const newThread = getNewThread(
            validUids[i],
            [currentUser.userUid],
            mailThread.title,
            newMail.mailUid
          )
          console.log(validUids[i]);
          console.log(updatedMailThreadsHashMap[validUids[i]]);
          updatedMailThreadsHashMap[validUids[i]].push(newThread);
        }
      }
      dispatch(setMailThreads(updatedMailThreadsHashMap));
    } else {
      alert('There is an invalid email in Recipients. Please type in only the emails that are available for this project.')
    }
  }

  // Traverse the linked list using LinkedMailUids object to retrieve mail data
  const getMailList = (thread, mailHashMap, userHashMap, forTrash) => {
    const {
      headMailUid,
      deletedMailUids,
      linkedMailUids
    } = thread;

    const mailList = [];
    console.log(thread, forTrash);

    // Set initial node uid with head mail uid
    let curNodeUid = headMailUid;

    while (curNodeUid !== null) {
      const isDeleted = deletedMailUids.findIndex(uid => uid === curNodeUid) > -1;
      const traverseCondition = forTrash
        ? isDeleted
        : !isDeleted

      if (traverseCondition) {
        const curNode = getMailWithUserInfo(curNodeUid, mailHashMap, userHashMap);
        mailList.push(curNode);
      }

      curNodeUid = linkedMailUids[curNodeUid];
    }

    return mailList.reverse();
  }

  useEffect(() => {
    if (mailThreadsHashMap[currentUser.userUid].length > 0) {
      const index = mailThreadsHashMap[currentUser.userUid].findIndex(el => el.threadId === router.query.mailThreadId);

      if (index > -1) {
        const thread = { ...mailThreadsHashMap[currentUser.userUid][index] };
        const mailList = getMailList(thread, mailHashMap, userHashMap, category === 'trash');
        
        setMailThread({
          ...thread,
          mailList
        })
      }
    }
  }, [
    mailThreadsHashMap,
    currentUser,
    mailHashMap,
    category,
    userHashMap,
    router
  ])


  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - Mails" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout category={category}>
        <MailListAction
          mailThread={mailThread}
        />
        <div className="flex flex-col pr-4 bg-white">
          {/* Title Row */}
          <div className="flex items-center justify-between pt-5 pb-2 pl-16">
            <div className="flex items-center">
              <h3 className="text-2xl font-normal">
                {mailThread.threadTitle || ''}
              </h3>
              <div className="pt-1">
                <IconButton
                  size="xs"
                  label={
                    mailThread.isImportant
                      ? 'Set Unimportant'
                      : 'Set Important'
                  }
                  tooltipLocation="bottom"
                  imgComponent={
                    mailThread.isImportant
                      ? <MdLabel size="20px" color="#F4C86A" />
                      : <MdLabelOutline size="20px" color="gray" />
                  }
                  onClickHandler={() => onClickImporant(!mailThread.isImportant)}
                />
              </div>
            </div>
            <div>
              {/* Title Row Icons */}
              <IconButton
                size="medium"
                label={
                  hasExpandedAll
                    ? 'Collapse All'
                    : 'Expand All'
                }
                tooltipLocation="bottom"
                imgComponent={
                  hasExpandedAll
                    ? <MdUnfoldLess size="20px" color="black" />
                    : <MdUnfoldMore size="20px" color="black" />
                }
                onClickHandler={handleExpandAll}
              />
            </div>
          </div>

          {/* Mail List */}
          <MailList
            mailList={mailThread.mailList}
            expandedMailUids={expandedMailUids}
            onAddExpandedMailUids={handleAddExpandedMailUids}
            onRemoveExpandedMailUids={handleRemoveExpandedMailUids}
            currentUser={currentUser}
            starredMailUids={mailThread.starredMailUids}
            handleOnSendEmail={handleOnSendEmail}
          />
        </div>
      </MailLayout>
    </div>
  )
}

export default MailThread;
