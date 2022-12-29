import { Fragment } from 'react'

import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography, { TypographyProps } from '@mui/material/Typography'

import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { CircularProgress, ImageList, ImageListItem } from '@mui/material'
import DropzoneWrapper from './DropzoneWrapper'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteImg, uploadImg } from 'src/store/apps/upload'
import { UploadImgType } from 'src/types/apps'

const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

interface Props {
  title: string
  isSmall?: boolean
  files: UploadImgType[]
  isLoading?: boolean
}

const FileUploaderRestrictions = (props: Props) => {
  const { files = [], title, isSmall, isLoading } = props
  const dispatch = useDispatch<AppDispatch>()

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 10000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: isSmall ? false : true,
    onDrop: (acceptedFiles: File[]) => {
      dispatch(uploadImg(acceptedFiles.map((file: File) => Object.assign(file))))
        .unwrap()
        .catch((err: any) =>
          toast.error(err.message || 'Có lỗi không xác định xảy ra. Vui lòng thử lại sau ít phút', {
            duration: 2000
          })
        )
    },
    onDropRejected: () => {
      toast.error('Bạn chỉ có thể tải lên 5 hình ảnh và kích thước tối đa là 10 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: UploadImgType) => {
    if (file) {
      return <img width={150} height={150} alt={file.asset_id} src={file.url} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = (id: string) => {
    dispatch(deleteImg(id))
      .unwrap()
      .catch((err: any) =>
        toast.error(err.message || 'Có lỗi không xác định xảy ra. Vui lòng thử lại sau ít phút', {
          duration: 2000
        })
      )
  }

  return (
    <DropzoneWrapper>
      <HeadingTypography variant={isSmall ? 'h6' : 'h5'} sx={{ mb: '5px', mt: '20px' }}>
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
          <HeadingTypography variant={isSmall ? 'h6' : 'h5'}>Kéo thả tập tin hoặc bấm vào đây</HeadingTypography>
          <Typography color='textSecondary'>Cho phép *.jpeg, *.jpg, *.png</Typography>
          <Typography color='textSecondary'>
            Tối đa {isSmall ? '1' : '5'} hình ảnh và kích thước không quá 10MB
          </Typography>
        </Box>
      </div>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
          <CircularProgress color='primary' thickness={2} />
        </Box>
      ) : null}
      {files.length ? (
        <Fragment>
          <ImageList cols={3} rowHeight={164}>
            {files.map(file => (
              <ImageListItem key={file.public_id} sx={{ position: 'relative' }}>
                <ListItem component={'span'} sx={{ alignItems: 'flex-start' }}>
                  <div className='file-details'>
                    <div className='file-preview'>{renderFilePreview(file)}</div>
                  </div>
                  <IconButton
                    onClick={() => handleRemoveFile(file.public_id)}
                    sx={{ position: 'absolute', top: '5px', right: '10px' }}
                  >
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
