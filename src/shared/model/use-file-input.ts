import { useEffect, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { getFileSize } from 'shared/lib/get-file-size'

export type FileInfo = {
  name: string
  size: string
}

type Props = {
  name: string
  onChange?: (name: string, file: File) => void
  onDelete?: (name: string) => void
}

export const useFileInput = (props: Props) => {
  const { name, onChange, onDelete } = props
  const {
    register,
    setValue,
    formState: { isSubmitSuccessful, isSubmitted, errors },
  } = useFormContext()
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)

  useEffect(() => {
    isSubmitSuccessful && !errors.root?.serverError && setFileInfo(null)
  }, [isSubmitSuccessful, errors])

  const inputName = name
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const inputFile = register(inputName, {
    onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const { files } = e.target
      if (!files || !files.length) return

      const [file] = files
      const name = file.name
      const size = getFileSize(file.size)
      setFileInfo({ name, size })
      onChange && onChange(inputName, file)
    },
  })

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    inputFileRef.current?.click()
  }

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    setValue(inputName, null, { shouldDirty: isSubmitted, shouldValidate: isSubmitted, shouldTouch: isSubmitted })
    onDelete && onDelete(inputName)
    setFileInfo(null)
  }

  return {
    fileInfo,
    onOpen: handleOpen,
    onDelete: handleDelete,
    inputFileProps: {
      ...inputFile,
      ref: (e: HTMLInputElement | null) => {
        inputFile.ref(e)
        inputFileRef.current = e
      },
    },
  }
}

export const useFileInputWithPreview = (props: Props) => {
  const { register, control, setValue } = useFormContext()

  const previewName = props.name + 'Preview'

  const onChange = (name: string, file: File) => {
    const src = URL.createObjectURL(file)
    setValue(previewName, src, { shouldDirty: true })
    props.onChange && props.onChange(name, file)
  }
  const onDelete = (name: string) => {
    setValue(previewName, '')
    props.onDelete && props.onDelete(name)
  }
  const inputProps = useFileInput({ ...props, onChange, onDelete })

  const imageSrc: string = useWatch({
    control,
    name: previewName,
  })
  const previewInput = register(previewName)

  return { ...inputProps, imageSrc }
}
