import Image from 'next/image';
import PanelLeftList from './PanelLeftList';

export default function PanelLeft ({ hash }) {
  return (
    <div className="min-w-248">
      <div className="pl-2 my-4">
        <button className="flex items-center justify-center h-12 p-3 text-sm font-medium bg-white rounded-full shadow-md  min-w-56">
          <Image
            src="/mailComposeIcon.png"
            height="32px"
            width="32px"
            alt="compose-icon"
          />
          <span className="pr-3 ml-3 text-gray-600">Compose</span>
        </button>
      </div>
      <PanelLeftList hash={hash} />
    </div>
  )
}