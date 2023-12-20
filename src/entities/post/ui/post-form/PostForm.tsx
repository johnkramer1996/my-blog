import { InputForm, RadioFormGroup, RadioInput, UploadImageForm } from 'shared/ui'
import { ReactNode } from 'react'

type props = {
  actionsSlot?: ReactNode
}

export const PostForm = (props: props) => {
  const { actionsSlot } = props

  return (
    <>
      <div className='col-lg-9 col-12'>
        <RadioFormGroup
          label='Status'
          name='status'
          options={[
            { label: 'Publish', value: 'publish' },
            { label: 'Draft', value: 'draft' },
            { label: 'Trash', value: 'trash' },
          ]}
        ></RadioFormGroup>
        <UploadImageForm name='image' label='Preview' />
        <InputForm type='text' name='title' label='Title' />
        <InputForm name='text' label='Text' />
      </div>
      <div className='col-lg-3 col-12 item-bg item-bg--grid'>
        <div className='item-bg__bg'></div>
        {actionsSlot}
      </div>
    </>
  )
}
