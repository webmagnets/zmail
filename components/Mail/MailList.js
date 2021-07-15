import MailListItem from './MailListItem'

export default function MailList({
  threads = [],
  onSelectThread
}) {
  return (
    <div>
      <table className="w-full p-0 border-collapse table-fixed">
        <tbody>
          {
            threads.map(thread => {
              return (
                <MailListItem
                  key={thread.threadUid}
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