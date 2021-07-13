import MailListItem from './MailListItem'

export default function MailList() {
  return (
    <div>
      <table className="table-fixed border-collapse p-0 w-full">
        <tbody>
          <MailListItem />
        </tbody>
      </table>
    </div>
  )
}