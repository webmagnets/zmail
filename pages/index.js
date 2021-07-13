import Head from 'next/head'
import Image from 'next/image'
import MailLayout from '../components/MailLayout';
import MailActionContainer from '../components/Mail/MailActionContainer';
import MailContainer from '../components/Mail/MailContainer';

export default function Home() {
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
