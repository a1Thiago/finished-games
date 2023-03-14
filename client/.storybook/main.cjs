const { mergeConfig } = require('vite');
const { default: tsconfigPaths } = require('vite-tsconfig-paths')

module.exports = {

  viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths()
      ]
    })
  },

  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  }
}