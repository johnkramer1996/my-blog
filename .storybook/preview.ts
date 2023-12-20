import '../src/shared/scss/style.scss'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'black',
          value: '#000',
        },
        {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    },
  },
  // decorators: [withRouter, withStore],
}

export default preview
