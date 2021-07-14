import Image from 'next/image';

export default function PanelLeftListItem ({ item }) {
  const iconImageLookup = {
    'inbox': 'bg-inbox',
    'starred': 'bg-starred',
    'important': 'bg-important',
    'sent': 'bg-sent',
    'spam': 'bg-spam',
    'drafts': 'bg-drafts',
    'trash': 'bg-trash',
  }

  return (
    <div className="
      pl-6
      pr-8
      rounded-r-full
      h-9
      flex
      items-center
      cursor-pointer
      hover:bg-gray-400
      hover:bg-opacity-30
    ">
      <div className="flex">
        <div className="flex justify-center items-center mr-4">
          <div className={`h-5 w-5 opacity-70 bg-cover ${iconImageLookup[item.hash]}`} />
        </div>
        <div className="
          flex
          justify-center
          items-center
          text-sm
          tracking-wide
          text-white
          antialiased
          font-bold
        ">
          {item.label}
        </div>
      </div>
    </div>
  )
}