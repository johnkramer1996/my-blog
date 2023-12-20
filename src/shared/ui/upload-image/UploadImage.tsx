import { Button } from 'shared/ui'
import classNames from 'classnames'
import { InputHTMLAttributes, ReactNode } from 'react'
import { FileInfo } from 'shared/model'
import './UploadImage.scss'

type PropsUploadImage = {
  label?: string
  circle?: boolean
  hasError: boolean
  fileInfo: FileInfo | null
  onOpen: (e: React.MouseEvent<HTMLElement>) => void
  onDelete: (e: React.MouseEvent<HTMLElement>) => void
  imageSrc: string
  defaultSrc?: string
  errorSlot?: ReactNode
  inputFileProps: InputHTMLAttributes<HTMLInputElement>
}
export const UploadImage = (props: PropsUploadImage) => {
  const { hasError, circle, fileInfo, imageSrc, defaultSrc, onOpen, onDelete, errorSlot, inputFileProps } = props

  return (
    <>
      <div className='input-label'>{props.label}</div>
      <div className='upload-image'>
        <div className='upload-image__main'>
          <div
            className={classNames('upload-image__image image image--cover', {
              'image--error': hasError,
              'image--circle': circle,
            })}
          >
            {imageSrc ? <img src={imageSrc} alt='' /> : defaultSrc ? <img src={defaultSrc} alt='' /> : ''}
            {!(imageSrc || defaultSrc) && <div className='upload-image__image-empty'>Перетягніть файл</div>}
            <input {...inputFileProps} type='file' accept='image/*' />
          </div>
          <div>
            <div className='upload-image__buttons'>
              <Button size='sm' color='secondary' onClick={onOpen}>
                Download
              </Button>
              {(true || imageSrc) && (
                <Button size='sm' border onClick={onDelete}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
        {errorSlot && <div className='upload-image__error'>{errorSlot}</div>}
      </div>
    </>
  )
}
