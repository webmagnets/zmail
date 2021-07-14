import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import MailLayout from '../components/Layouts/MailLayout';
import MailActionContainer from '../components/Mail/MailActionContainer';
import MailContainer from '../components/Mail/MailContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  getInitialMails,
  getInitialUsers
} from '../lib/api';
import { setMails } from '../reducers/store/mail';
import { setInitialUsers } from '../reducers/store/user';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userHashMap = useSelector(({ user }) => user.userHashMap);
  const mailHashMap = useSelector(({ mail }) => mail.mailHashMap);

  useEffect(() => {
    if (Object.keys(userHashMap).length === 0) {
      // dispatch initial data
      const initialUsers = getInitialUsers();
      dispatch(setInitialUsers({ ...initialUsers }));
    }

    if (Object.keys(mailHashMap).length === 0) {
      // dispatch initial data
      const initialMails = getInitialMails();
      dispatch(setMails({ ...initialMails }))
    }
  }, [
    dispatch,
    userHashMap,
    mailHashMap
  ])

  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - A Gmail Clone Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout>
        <MailActionContainer />
        <MailContainer />
      </MailLayout>
    </div>
  )
}
