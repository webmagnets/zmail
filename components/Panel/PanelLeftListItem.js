import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  MdStar,
  MdDelete,
  MdLabel,
  MdReport,
  MdSend,
  MdInsertDriveFile,
  MdInbox
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setCurrentMailThreads, setSelectedMailThreads } from '../../reducers/store/mailThread';

const PanelLeftListItem = ({ item, isActive }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const iconComponentLookup = {
    'inbox': (<MdInbox size="20px" color="white" />),
    'starred': (<MdStar size="20px" color="white" />),
    'important': (<MdLabel size="20px" color="white" />),
    'sent': (<MdSend size="20px" color="white" />),
    'spam': (<MdReport size="20px" color="white" />),
    'drafts': (<MdInsertDriveFile size="20px" color="white" />),
    'trash': (<MdDelete size="20px" color="white" />),
  }

  const navigateTo = (category) => {
    router.push(`/mail/${category}`);
    dispatch(setSelectedMailThreads([]));
    dispatch(setCurrentMailThreads([]));
  }

  return (
    <div
      className={`flex items-center pl-6 pr-8 rounded-r-full cursor-pointer  h-9 hover:bg-gray-400 hover:bg-opacity-50 ${isActive ? 'bg-gray-400 bg-opacity-80 hover:bg-opacity-80' : ''}`}
      onClick={() => navigateTo(item.category)}
    >
      <div className="flex">
        <div className="flex items-center justify-center mr-4">
          {iconComponentLookup[item.category]}
        </div>
        <div className="flex items-center justify-center text-sm antialiased font-medium text-white ">
          {item.label}
        </div>
      </div>
    </div>
  )
}

export default PanelLeftListItem