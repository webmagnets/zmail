import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailLayout from '../../components/Layouts/MailLayout';
import MailContainer from '../../components/Mail/MailContainer';
import { useMailThreads } from '../../hooks/mailThread';
import { setCurrentMailThreads } from '../../reducers/store/mailThread';
import { setCurrentUser } from '../../reducers/store/user';

export default function Mail() {
  /*
    use hash routing for directing different categories
    such as inbox, starred, important, etc.
  */
  const [hash, setHash] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);
  const mailThreads = useMailThreads(hash);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (currentUser.uid === '') {
      alert('Please select a user in the landing page to proceed to Mail Page.')
      router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    const hashRoute = router.asPath.match(/#([a-z0-9]+)/gi);

    console.log(hashRoute);
    
    if (hashRoute && hashRoute.length === 1) {
      const hashValue = hashRoute[0].replace('#', '');
      setHash(hashValue);
    } else {
      router.push('/mail#inbox');
    }
  }, [router.asPath])

  useEffect(() => {
    console.log("MailThreads Changed: ", mailThreads);
    dispatch(setCurrentMailThreads(mailThreads));
  }, [mailThreads, dispatch])

  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - Mails" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout hash={hash}>
        <MailContainer hash={hash} />
      </MailLayout>
    </div>
  )
}
