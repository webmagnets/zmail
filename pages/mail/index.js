import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailLayout from '../../components/Layouts/MailLayout';
import MailActionContainer from '../../components/Mail/MailActionContainer';
import MailContainer from '../../components/Mail/MailContainer';
import { useMailThreads } from '../../hooks/mailThread';
import { setCurrentUser } from '../../reducers/store/user';

export default function Mail() {
  /*
    use hash routing for directing different categories
    such as inbox, starred, important, etc.
  */
  const [hash, setHash] = useState('');
  const dispatch = useDispatch();
  const mailThreads = useMailThreads(hash);

  const router = useRouter();

  // Test User Set
  const userHashMap = useSelector(state => state.user.userHashMap);
  useEffect(() => {
    dispatch(setCurrentUser(userHashMap['Rick-1234']));
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      setHash((window.location.hash).replace('#', ''));
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  console.log(router);

  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - Mails" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout>
        <MailActionContainer />
        <MailContainer />
      </MailLayout>
    </div>
  )
}
