import { MdArrowBack, MdDelete, MdMarkunread, MdReport } from 'react-icons/md'
import IconButton from '../Button/IconButton'

const MailListAction = () => {
  return (
    <div className="flex items-center justify-start h-12 border-b border-opacity-20">
      <div className="flex items-center px-3 mr-2">
        <IconButton
          label="Back"
          size="medium"
          tooltipLocation="bottom"
          imgComponent={<MdArrowBack size="20px" color="white" />}
        />
      </div>
      <div className="flex items-center">
        <IconButton 
          size="medium"
          label="Spam"
          tooltipLocation="bottom"
          imgComponent={
            <MdReport size="20px" color="white" />
          }
        />
        <IconButton 
          size="medium"
          label="Delete"
          tooltipLocation="bottom"
          imgComponent={
            <MdDelete size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="Mark Unread"
          tooltipLocation="bottom"
          imgComponent={
            <MdMarkunread size="20px" color="white" />
          }
        />
      </div>
    </div>
  )
}

export default MailListAction