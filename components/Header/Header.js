import Image from 'next/image';
import { MdSearch, MdTune, MdMenu } from 'react-icons/md';
import { useSelector } from 'react-redux';
import IconButton from '../Button/IconButton';

export default function Header() {
  const {
    userUid,
    photoUrl,
    email,
    displayName
  } = useSelector(state => state.user.currentUser);

  return (
    <div className="
      flex
      w-full
      p-2
      border-b
      border-opacity-25
    ">
      {/* Right Section */}
      <div className="
        min-w-248
        w-1/5
        pl-2
        text-white
        text-2xl
        flex
        justify-start
        items-center
      ">
        <div className="p-1 ml-1 mr-2">
          <IconButton
            size="medium"
            label="Menu"
            tooltipLocation="bottom"
            imgComponent={
              <MdMenu size="24px" color="white"/>
            }
            onClickHandler={() => {}}
          />
        </div>
        <div className="flex justify-center items-center">
          <Image src="/mailIcon.png" height="25px" width="32px" alt="mail-icon"/>
          <p className="ml-4">Zmail</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-auto">
        <div
          className="
            max-w-screen-md
            flex
            justify-center
            align-items
            rounded-md
            bg-gray-300
            bg-opacity-20
            py-2
          "
        >
          <div className="flex justify-center items-center py-2 px-3">
            <MdSearch size="24px" color="white" />
          </div>
          <div className="flex-auto flex justify-center items-center">
            <input
              type="text"
              placeholder="Search mail"
              className="bg-transparent placeholder-white w-full outline-none"
            />
          </div>
          <div className="flex justify-center items-center py-2 px-3">
            <MdTune size="24px" color="white" />
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="flex justify-end items-center pl-6 pr-2">
        <IconButton
          size="medium"
          label="Profile"
          tooltipLocation="none"
          imgComponent={
            <Image
              src={photoUrl}
              alt="Profile Picture"
              width="32px"
              height="32px"
              className="rounded-full flex justify-center items-center z-10"
            />
          }
          onClickHandler={() => {}}
        />
      </div>
    </div>
  )
}