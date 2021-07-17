import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailLayout from '../../../components/Layouts/MailLayout';
import MailThreadListContainer from '../../../components/Mail/MailThreadListContainer';
import ComposeMailModal from '../../../components/Modal/ComposeMailModal';
import useCategory from '../../../hooks/category';
import { useMailThreads } from '../../../hooks/mailThread';
import { setCurrentMailThreads } from '../../../reducers/store/mailThread';

const MailThreads = () => {
  /*
    use hash routing for directing different categories
    such as inbox, starred, important, etc.
  */

  const currentUser = useSelector(state => state.user.currentUser);
  const category =  useCategory();
  const mailThreads = useMailThreads(category);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (currentUser.userUid === '') {
      alert('Please select a user in the landing page to proceed to Mail Page.')
      router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    console.log("Set MailThreads in Base Page")
    dispatch(setCurrentMailThreads(mailThreads));
  }, [mailThreads, dispatch])

  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - Mails" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout category={category}>
        <MailThreadListContainer category={category} />
      </MailLayout>
    </div>
  )
}

export default MailThreads;