import {
  MdRefresh,
  MdMoreVert,
  MdDelete,
  MdDrafts,
  MdMarkunread,
  MdErrorOutline

} from 'react-icons/md';
import IconButton from '../Button/IconButton';

export default function MailListAction({
  selectedThreads,
  handleSelectAll
}) {
  return (
    <div className="flex items-center justify-start h-12">
      <div></div>
      <div className={`
        flex
        ${selectedThreads.length > 0 ? 'hidden' : 'block'}
      `}>
        <IconButton 
          size="medium"
          label="Refresh"
          tooltipLocation="bottom"
          imgComponent={
            <MdRefresh size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="More"
          tooltipLocation="bottom"
          imgComponent={
            <MdMoreVert size="20px" color="white" />
          }
        />
      </div>
      <div className={`
        flex
        ${selectedThreads.length > 0 ? 'block' : 'hidden'}
      `}>
        <IconButton 
          size="medium"
          label="Refresh"
          tooltipLocation="bottom"
          imgComponent={
            <MdErrorOutline size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="More"
          tooltipLocation="bottom"
          imgComponent={
            <MdDelete size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="More"
          tooltipLocation="bottom"
          imgComponent={
            <MdDelete size="20px" color="white" />
          }
        />
        <IconButton
          size="medium"
          label="More"
          tooltipLocation="bottom"
          imgComponent={
            <MdMarkunread size="20px" color="white" />
          }
        />
      </div>
    </div>
  )
}