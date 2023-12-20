import type { Meta, StoryObj } from '@storybook/react'

import { SectionTitle } from './SectionTitle'

const meta = {
	title: 'UI/SectionTitle',
	component: SectionTitle,
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
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Section title',
	},
}

export const White: Story = {
	args: {
		...Default.args,
		white: true,
	},
}

export const Left: Story = {
	parameters: {
		layout: 'padded',
	},
	args: {
		...Default.args,
		left: true,
	},
}
