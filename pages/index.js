import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  getInitialMails,
  getInitialMailThreads,
  getInitialUsers
} from '../lib/api';
import { setMails } from '../reducers/store/mail';
import {
  setCurrentUser,
  setInitialUsers
} from '../reducers/store/user';
import {
  setCurrentMailThreads,
  setMailThreads
} from '../reducers/store/mailThread';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userHashMap = useSelector(({ user }) => user.userHashMap);
  const mailHashMap = useSelector(({ mail }) => mail.mailHashMap);
  const mailThreadsHashMap = useSelector(({ mailThread }) => mailThread.mailThreadsHashMap)


  useEffect(() => {
    if (Object.keys(userHashMap).length === 0) {
      // dispatch initial data
      const initialUsers = getInitialUsers();
      dispatch(setInitialUsers({ ...initialUsers }));
    }

    if (Object.keys(mailHashMap).length === 0) {
      // dispatch initial data
      const initialMails = getInitialMails();
      dispatch(setMails({ ...initialMails }));
    }

    if (Object.keys(mailThreadsHashMap).length === 0) {
      const initialMailThreads = getInitialMailThreads();
      dispatch(setMailThreads({ ...initialMailThreads}));
    }
  }, [
    dispatch,
    userHashMap,
    mailHashMap,
    mailThreadsHashMap
  ])

  const loginWithUser = (uid) => {
    dispatch(setCurrentUser(userHashMap[uid]));
    router.push('/mail/inbox');
  }

  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - A Gmail Clone Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-screen min-h-screen bg-gray-400 ">
        <div className="max-w-screen-sm p-6 bg-white rounded-md shadow-md ">
          <div className="flex items-center justify-start mb-6">
            <Image src="/mailIcon.png" height="25px" width="32px" alt="mail-icon"/>
            <p className="ml-4 text-2xl text-gray-600">Zmail</p>
          </div>
          <p className="font-bold text-gray-600">
            Welcome to Zmail
          </p>
          <p className="pb-4 text-gray-400 border-b">
            A Simplified Gmail Clone Project Using Next.js
          </p>
          <p className="mt-4 text-gray-600">
            This project is an offline version where the data is pre-populated using Redux in the beginning.
            So, sending emails will only be allowed amongst the users below.
          </p>
          <div className="mt-8">
            <p className="pb-2 font-semibold text-gray-600 border-b">
              Select any user below to login
            </p>
            <div className="mt-4 space-y-2">
              {
                Object.keys(userHashMap).map(uid => {
                  const {
                    displayName,
                    email,
                    photoUrl
                  } = userHashMap[uid];
                  return (
                    <div
                      key={uid}
                      className="flex justify-between px-2 py-1 border-2 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-40"
                      onClick={() => loginWithUser(uid)}
                    >
                      <div className="flex">
                        <Image
                          src={photoUrl}
                          width="25px"
                          height="25px"
                          alt="user-icon"
                          className="rounded-full"
                        />
                        <p className="ml-3">
                          {displayName}
                        </p>
                      </div>
                      <p className="ml-3 text-gray-400">
                        {email}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;