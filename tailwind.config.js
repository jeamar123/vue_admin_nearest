module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-primary' : '#476A9D',      
        'c-secondary' : '#476A9D',      
        'c-error' : '#E24949',                // custom red color
        'c-warning' : '#F7C848',               // custom green color
        'c-fade-blue' : '#C0D0E5',          
        'c-fade-gray' : '#7c7b7c',          
        'loader' : '#000000cc',                 
        'violet' : '#393C8E',    
        'c-gray' : '#6c757d',                 // custom gray color
        'c-error-text' : '#EB5757',     // message bg red color
        'c-blue-text' : '#393C8E',               // message bg blue color
        'c-success-text' : '#36D37A',               // message bg green color
      },
      fontSize: {
        'xxs': '.65rem',
        'xxxs': '.55rem',
      },
      gridTemplateRows:  {
        '12': 'repeat(12, minmax(0, 1fr));',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
