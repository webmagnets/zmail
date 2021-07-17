import MailThreadListItem from './MailThreadListItem'

const MailThreadList = ({
  threads
}) => {
  return (
    <div>
      <table className="w-full p-0 border-collapse table-fixed">
        <tbody>
          {
            threads.map((thread, i) => {
              return (
                <MailThreadListItem
                  key={i}
                  thread={thread}
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