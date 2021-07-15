import PanelLeftListItem from './PanelLeftListItem'

const PanelLeftList = ({ category }) => {
  const categoryItems = [
    {
      label: 'Inbox',
      category: 'inbox'
    },
    {
      label: 'Starred',
      category: 'starred'
    },
    {
      label: 'Important',
      category: 'important'
    },
    {
      label: 'Sent',
      category: 'sent'
    },
    {
      label: 'Drafts',
      category: 'drafts'
    },
    {
      label: 'Spam',
      category: 'spam'
    },
    {
      label: 'Trash',
      category: 'trash'
    },
  ]

  return (
    <div className="pr-5">
      {
        categoryItems.map(item => {
          return (
            <PanelLeftListItem key={item.category} item={item} isActive={category === item.category}/>
          )
        })
      }
    </div>
  )
}

export default PanelLeftList