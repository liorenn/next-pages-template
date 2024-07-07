module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '400px',
        'mantine-breakpoint-sm': '600px',
        'mantine-breakpoint-md': '800px',
        'mantine-breakpoint-lg': '1000px',
        'mantine-breakpoint-xl': '1200px',
      },
    },
  },
}
