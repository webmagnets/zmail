import Image from 'next/image';
import IconButton from '../Button/IconButton';

export default function PanelRight() {
  const panelRightItems = [
    {
      label: 'Calendar',
      src: '/google-calender.png'
    },
    {
      label: 'Keeps',
      src: '/google-keep.png'
    },
    {
      label: 'Tasks',
      src: '/google-tasks.png'
    },
    {
      label: 'Contact',
      src: '/google-contacts.png'
    }
  ]

  return (
    <div className="
      min-w-56
      border-l
      border-opacity-25
      flex
      flex-col
      items-center
      space-y-4
      py-2
    ">
      {
        panelRightItems.map(({label, src}, i) => {
          return (
            <div key={i}>
              <IconButton
                size="medium"
                label={label}
                tooltipLocation="left"
                imgComponent={
                  <Image src={src} width="20px" height="20px" alt="panel-icon" className="z-10" />
                }
                onClickHandler={() => {}}
              />
            </div>
          )
        })
      }
    </div>
  )
}