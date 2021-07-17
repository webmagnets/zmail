import Image from 'next/image';
import { useState } from 'react';
import { MdSearch, MdTune, MdMenu } from 'react-icons/md';
import { useSelector } from 'react-redux';
import IconButton from '../Button/IconButton';
import UserProfile from '../Profile/UserProfile';

export default function Header() {
  const {
    photoUrl = '',
  } = useSelector(state => state.user.currentUser);

  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const profilePhoto = photoUrl === ''
    ? 'https://gravatar.com/avatar/762cbbab74ca0b222c1aaed8948be973?s=400&d=identicon&r=x'
    : photoUrl

  return (
    <div className="flex w-full p-2 border-b border-opacity-20">
      {/* Right Section */}
      <div className="flex items-center justify-start w-1/5 pl-2 text-2xl text-white min-w-248">
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
          className="flex justify-center max-w-screen-md py-2 bg-gray-300 rounded-md align-items bg-opacity-20"
        >
          <div className="flex items-center justify-center px-3 py-1">
            <IconButton
              size="xs"
              label="Show Search Options"
              tooltipLocation="botttom"
              imgComponent={<MdSearch size="24px" color="white" />}
            />
          </div>
          <div className="flex items-center justify-center flex-auto">
            <input
              type="text"
              placeholder="Search mail"
              className="w-full text-white placeholder-white bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center justify-center px-3 py-1">
            <IconButton
              size="xs"
              label="Show Search Options"
              tooltipLocation="botttom"
              imgComponent={<MdTune size="24px" color="white" />}
            />
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="relative flex items-center justify-end pl-6 pr-2">
        <IconButton
          size="medium"
          label="Profile"
          tooltipLocation="none"
          imgComponent={
            <Image
              src={profilePhoto}
              alt="Profile Picture"
              width="32px"
              height="32px"
              className="z-10 flex items-center justify-center rounded-full"
            />
          }
          onClickHandler={() => setIsUserProfileOpen(true)}
        />
        {
          isUserProfileOpen &&
          <UserProfile onCloseUserProfile={() => setIsUserProfileOpen(false)}/>
        }
      </div>
    </div>
  )
}