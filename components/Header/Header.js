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
    <div className="flex w-full p-2 border-b  border-opacity-20">
      {/* Right Section */}
      <div className="flex items-center justify-start w-1/5 pl-2 text-2xl text-white  min-w-248">
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
        <div className="flex items-center justify-center">
          <Image src="/mailIcon.png" height="25px" width="32px" alt="mail-icon"/>
          <p className="ml-4">Zmail</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-auto">
        <div
          className="flex justify-center max-w-screen-md py-2 bg-gray-300 rounded-md  align-items bg-opacity-20"
        >
          <div className="flex items-center justify-center px-3 py-2">
            <MdSearch size="24px" color="white" />
          </div>
          <div className="flex items-center justify-center flex-auto">
            <input
              type="text"
              placeholder="Search mail"
              className="w-full text-white placeholder-white bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <MdTune size="24px" color="white" />
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="flex items-center justify-end pl-6 pr-2">
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
              className="z-10 flex items-center justify-center rounded-full"
            />
          }
          onClickHandler={() => {}}
        />
      </div>
    </div>
  )
}