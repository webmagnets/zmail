import { useSelector } from 'react-redux'
import MailThreadListItem from './MailThreadListItem'

const MailThreadList = ({
  threads = [],
  onSelectThread
}) => {
  const currentUser = useSelector(({ user }) => user.currentUser);

  return (
    <div>
      <table className="w-full p-0 border-collapse table-fixed">
        <tbody>
          {
            threads.map((thread, i) => {
              return (
                <MailThreadListItem
                  key={i}
                  currentUser={currentUser}
                  thread={thread}
                  onSelectThread={onSelectThread}
                />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default MailThreadList;