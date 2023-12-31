import type { Meta, StoryObj } from '@storybook/react'

import { Author } from './Author'
import { PATH_PAGE } from 'shared/lib'

const meta = {
  title: 'UI/Author',
  component: Author,
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Author>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    image: null,
    name: 'Vitalii',
    to: PATH_PAGE.members.member.root('Vitalii'),
  },
}
