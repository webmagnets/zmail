import { useState } from 'react';

const wrapperSizeLookup = {
  'xs': {
    height: 'h-7',
    width: 'w-8'
  },
  'small': {
    height: 'h-9',
    width: 'w-9'
  },
  'medium': {
    height: 'h-10',
    width: 'w-10'
  }
}

const inkSizeLookup = {
  'xs': {
    height: 'h-10',
    width: 'w-10'
  },
  'small': {
    height: 'h-10',
    width: 'w-10'
  },
  'medium': {
    height: 'h-11',
    width: 'w-11'
  }
}

const IconButton = ({
  size,
  label,
  tooltipLocation,
  imgComponent,
  onClickHandler
}) => {
  return (
    <div
      className={`
        relative
        cursor-pointer
        flex
        justify-center
        items-center
        bg-transparent
        group
        ${wrapperSizeLookup[size].height}
        ${wrapperSizeLookup[size].width}
      `}
      onClick={e => onClickHandler()}
      size={size}
    >
      {imgComponent}
      <div
        className={`
          absolute
          rounded-full
          top-1/2
          left-1/2
          transform
          -translate-x-1/2
          -translate-y-1/2
          transition-all
          ease-in-out
          duration-300
          hover:bg-gray-100
          group-hover:bg-opacity-10
          z-10
          ${inkSizeLookup[size].height}
          ${inkSizeLookup[size].width}
        `}
      >
        {
          tooltipLocation === 'left' &&
          <div
            className={`
              absolute
              w-max
              p-2
              bg-black
              rounded-md
              top-1/2
              right-14
              transform
              -translate-y-1/2
              bg-opacity-60
              hidden
              group-hover:block
            `}
          >
            <p className={`
              text-xs
              text-white
              m-0
              p-0
            `}>
              {label}
            </p>
          </div>
        }
        {
          tooltipLocation === 'bottom' &&
          <div
            className={`
              absolute
              w-max
              p-2
              bg-black
              rounded-md
              transform
              left-1/2
              -translate-x-1/2
              -bottom-8
              bg-opacity-60
              hidden
              group-hover:block
            `}
          >
            <p className={`
              text-xs
              text-white
              m-0
              p-0
            `}>
              {label}
            </p>
          </div>
        }
      </div>
    </div>
  );
}

export default IconButton;