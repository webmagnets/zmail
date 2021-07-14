module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10'
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '56': '56px',
        '248': '248px'
       },
       backgroundImage: theme => ({
         'inbox': "url('/inbox.png')",
         'starred': "url('/starred.png')",
         'important': "url('/important.png')",
         'sent': "url('/sent.png')",
         'spam': "url('/spam.png')",
         'drafts': "url('/drafts.png')",
         'trash': "url('/trash.png')",
         'background': "url('/background.jpeg')"
       })
    },
  },
  variants: {
    extend: {
      display: ['group-hover']
    },
  },
  plugins: [],
}
