module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  corePlugins: {
    animation: false,
    textOpacity: false,
  },
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        
      },
      fontFamily: {
        roboto: [
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      spacing: {
        px: '1px',
        0: '0',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1440px',
      },
      maxWidth: (theme) => theme('spacing'),
    },
  },
}
