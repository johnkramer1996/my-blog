import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'facebook',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
  },
  parameters: {},
}

export const Secondary: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    color: 'secondary',
  },
}

export const Transparent: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    withoutColor: true,
  },
  parameters: {
    backgrounds: {
      default: 'white',
    },
    controls: { include: ['backgroundDark', 'border', 'color'] },
  },
}

export const Loading: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    loading: true,
  },
}

export const BorderWithLightBackgournd: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    border: true,
  },
  parameters: {
    backgrounds: {
      default: 'white',
    },
    controls: { include: ['backgroundDark', 'border', 'color'] },
  },
}

export const BorderWithDarkBackground: Story = {
  ...Primary.args,
  args: {
    ...Primary.args,
    border: true,
    backgroundDark: true,
  },
  parameters: {
    backgrounds: {
      default: 'black',
    },
    controls: { include: ['backgroundDark', 'border', 'color'] },
  },
}
