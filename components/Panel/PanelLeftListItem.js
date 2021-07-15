import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PanelLeftListItem ({ item, isActive }) {
  const router = useRouter();
  const iconImageLookup = {
    'inbox': 'bg-inbox',
    'starred': 'bg-starred',
    'important': 'bg-important',
    'sent': 'bg-sent',
    'spam': 'bg-spam',
    'drafts': 'bg-drafts',
    'trash': 'bg-trash',
  }

  const navigateTo = (hash) => router.push(`/mail#${hash}`);

  return (
    <div
      className={`flex items-center pl-6 pr-8 rounded-r-full cursor-pointer  h-9 hover:bg-gray-400 hover:bg-opacity-50 ${isActive ? 'bg-gray-400 bg-opacity-80 hover:bg-opacity-80' : ''}`}
      onClick={() => navigateTo(item.hash)}
    >
      <div className="flex">
        <div className="flex items-center justify-center mr-4">
          <div className={`h-5 w-5 opacity-70 bg-cover ${iconImageLookup[item.hash]}`} />
        </div>
        <div className="flex items-center justify-center text-sm antialiased font-bold tracking-wide text-white ">
          {item.label}
        </div>
      </div>
    </div>
  )
}