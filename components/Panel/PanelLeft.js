import Image from 'next/image';
import PanelLeftList from './PanelLeftList';

export default function PanelLeft () {
  return (
    <div className="min-w-248">
      <div className="my-4 pl-2">
        <button className="
          flex
          justify-center
          items-center
          bg-white
          rounded-full
          h-12
          font-medium
          text-sm
          min-w-56
          shadow-md
          p-3
        ">
          <Image
            src="/mailComposeIcon.png"
            height="32px"
            width="32px"
            alt="compose-icon"
          />
          <span className="pr-3 ml-3 text-gray-600">Compose</span>
        </button>
      </div>
      <PanelLeftList />
    </div>
  )
}