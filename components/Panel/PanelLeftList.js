import { MdInbox, MdStar } from 'react-icons/md'
import PanelLeftListItem from './PanelLeftListItem'

export default function PanelLeftList() {
  const categoryItems = [
    {
      label: 'Inbox',
      hash: 'inbox'
    },
    {
      label: 'Starred',
      hash: 'starred'
    },
    {
      label: 'Important',
      hash: 'important'
    },
    {
      label: 'Sent',
      hash: 'sent'
    },
    {
      label: 'Drafts',
      hash: 'drafts'
    },
    {
      label: 'Spam',
      hash: 'spam'
    },
    {
      label: 'Trash',
      hash: 'trash'
    },
  ]

  return (
    <div>
      {
        categoryItems.map(item => {
          return (
            <PanelLeftListItem key={item.hash} item={item}/>
          )
        })
      }
    </div>
  )
}