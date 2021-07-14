import Head from 'next/head'
import Image from 'next/image'
import MailLayout from '../../components/Layouts/MailLayout';
import MailActionContainer from '../../components/Mail/MailActionContainer';
import MailContainer from '../../components/Mail/MailContainer';

export default function MailThread() {
  return (
    <div>
      <Head>
        <title>Zmail</title>
        <meta name="description" content="Zmail - Mail Thread" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MailLayout>
        <MailActionContainer />
        <MailContainer />
      </MailLayout>
    </div>
  )
}
