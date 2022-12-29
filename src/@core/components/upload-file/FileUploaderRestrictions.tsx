import { Fragment, useState } from 'react'

import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { ImageList, ImageListItem } from '@mui/material'
import DropzoneWrapper from './DropzoneWrapper'

interface FileProp {
  name: string
  type: string
  size: number
}

const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderRestrictions = ({ title }: { title: string }) => {
  const [files, setFiles] = useState<File[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 10000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: true,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('Bạn chỉ có thể tải lên 5 hình ảnh và kích thước tối đa là 10 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={150} height={150} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  return (
    <DropzoneWrapper>
      <HeadingTypography variant='h5' sx={{ mb: '5px', mt: '20px' }}>
        {title}
      </HeadingTypography>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: ['center', 'center', 'inherit'],
            cursor: 'pointer'
          }}
        >
          <HeadingTypography variant='h5'>Kéo thả tập tin hoặc bấm vào đây</HeadingTypography>
          <Typography color='textSecondary'>Cho phép *.jpeg, *.jpg, *.png</Typography>
          <Typography color='textSecondary'>Tối đa 5 hình ảnh và kích thước không quá 10MB</Typography>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <ImageList cols={3} rowHeight={164}>
            {files.map(file => (
              <ImageListItem key={file.name}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <div className='file-details'>
                    <div className='file-preview'>{renderFilePreview(file)}</div>
                    <div>
                      <Typography className='file-name'>{file.name}</Typography>
                      <Typography className='file-size' variant='body2'>
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                          : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                      </Typography>
                    </div>
                  </div>
                  <IconButton onClick={() => handleRemoveFile(file)}>
                    <Close fontSize='small' />
                  </IconButton>
                </ListItem>
              </ImageListItem>
            ))}
          </ImageList>
        </Fragment>
      ) : null}
    </DropzoneWrapper>
  )
}

export default FileUploaderRestrictions
