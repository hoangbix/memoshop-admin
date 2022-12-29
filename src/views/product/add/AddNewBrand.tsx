import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import Close from 'mdi-material-ui/Close'
import { AppDispatch, RootState } from 'src/store'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import FileUploaderRestrictions from 'src/@core/components/upload-file/FileUploaderRestrictions'
import { addBrand } from 'src/store/apps/brand'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  toggle: () => void
}

interface FormData {
  title: string
  desc: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  title: yup.string().required('Đây là trường bắt buộc').min(3, 'Tối thiểu 3 ký tự'),
  desc: yup.string().required('Đây là trường bắt buộc').min(10, 'Tối thiểu 10 ký tự').max(5000, 'Tối đa 5000 ký tự')
})

const AddNewBrand = ({ open, toggle }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: files } = useSelector((state: RootState) => state.upload)

  const {
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    await dispatch(addBrand(data))
      .unwrap()
      .then(() => {
        toast.success('Thêm thương hiệu thành công.', {
          duration: 4000
        })
        handleDrawerClose()
      })
      .catch(err => {
        setError('title', {
          type: 'error',
          message: err.message || 'Có lỗi xẩy ra. Vui lòng thử lại sau ít phút'
        })
      })
  }

  const handleDrawerClose = () => {
    toggle()
    reset({ title: '', desc: '' })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleDrawerClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] }, zIndex: 999999 }}
    >
      <Header>
        <Typography variant='h6'>Thêm thương hiệu mới</Typography>
        <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box component='form' sx={{ p: 5 }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size='small'
                label='Tên thương hiệu'
                value={value}
                variant='outlined'
                onChange={onChange}
                error={Boolean(errors.title)}
              />
            )}
          />
          {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <Controller
            name='desc'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField
                size='small'
                label='Mô tả thương hiệu'
                value={value}
                rows={3}
                fullWidth
                multiline
                id='invoice-note'
                sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                onChange={onChange}
                error={Boolean(errors.desc)}
              />
            )}
          />
          {errors.desc && <FormHelperText sx={{ color: 'error.main' }}>{errors.desc.message}</FormHelperText>}
        </FormControl>
        <FileUploaderRestrictions title={'Tải lên hình đại diện của thương hiệu'} isSmall files={files} />
        <Box sx={{ mt: '30px' }}>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Thêm
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleDrawerClose}>
            Huỷ
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddNewBrand
