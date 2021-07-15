import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const MailThreadListSection = ({
  label,
  type,
  isOpen,
  onClickHandler
}) => {
  return (
    <div className="flex items-center justify-between h-12 mr-4 border-b border-opacity-20">
      <div
        className="flex items-center justify-center px-2 mx-2 transition-all ease-in-out rounded-md cursor-pointer h-9 hover:bg-gray-200 hover:bg-opacity-20"
        onClick={() => onClickHandler(type)}
      >
        {
          isOpen
          ? (
            <MdKeyboardArrowUp size="20px" color="white" />
          )
          : (
            <MdKeyboardArrowDown size="20px" color="white" />
          ) 
        }
        <span className="pl-3 tracking-wide text-white">
          {label}
        </span>
      </div>
      <div></div>
    </div>
  )
}

export default MailThreadListSection;