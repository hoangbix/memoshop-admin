import { forwardRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, alpha } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import { FormControl, FormHelperText } from '@mui/material'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

import Plus from 'mdi-material-ui/Plus'

import { fetchCategory } from 'src/store/apps/category'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import LogoIcon from 'src/@core/layouts/components/shared-components/logo'
import FileUploaderRestrictions from 'src/@core/components/upload-file/FileUploaderRestrictions'

import { fetchBrand } from 'src/store/apps/brand'
import { AppDispatch, RootState } from 'src/store'
import EditorCustom from 'src/@core/components/editor-custom'
import Link from 'next/link'

interface Props {
  toggleAddCategory: () => void
  toggleAddBrand: () => void
  errors: any
  control: any
}

interface CategoryBrandType {
  _id: string
  title: string
  slug: string
}

const CustomInput = forwardRef((props: any, ref) => {
  return <TextField required fullWidth {...props} inputRef={ref} autoComplete='off' size='small' />
})

const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  backgroundColor: 'transparent !important',
  padding: '0 !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important` }
}))

const AddCard = (props: Props) => {
  const { toggleAddCategory, toggleAddBrand, control, errors } = props
  const dispatch = useDispatch<AppDispatch>()

  const { data: categorys } = useSelector((state: RootState) => state.category)
  const { data: brands } = useSelector((state: RootState) => state.brand)
  const { data: files, isLoading } = useSelector((state: RootState) => state.upload)

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchBrand())
  }, [dispatch])

  return (
    <Card sx={{ mb: '30px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 6,
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'space-between' },
              alignItems: 'center',
              flexDirection: { xs: 'column', lg: 'row' }
            }}
          >
            <Link href='/' passHref>
              <Box component={'a'} sx={{ cursor: 'pointer' }}>
                <LogoIcon />
              </Box>
            </Link>
            <Typography variant='h6' sx={{ mt: '20px' }}>
              Thêm mới sản phẩm
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <form>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={'title'}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextField
                      required
                      size='small'
                      value={value || ''}
                      onChange={onChange}
                      fullWidth
                      label='Tên sản phẩm'
                      placeholder='Nấm đùi gà Green Kingdom 250gr'
                    />
                  )
                }}
              />
              <FormHelperText error={true}>{errors.title?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name={'price'}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextField
                      value={value || ''}
                      onChange={onChange}
                      required
                      size='small'
                      fullWidth
                      label='Giá sản phẩm'
                      placeholder='150.000đ'
                    />
                  )
                }}
              />
              <FormHelperText error={true}>{errors.price?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name={'promotionalPrice'}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextField
                      value={value || ''}
                      onChange={onChange}
                      size='small'
                      fullWidth
                      label='Giá khuyến mãi'
                      placeholder='175.000đ'
                    />
                  )
                }}
              />
              <FormHelperText error={true}>{errors.promotionalPrice?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Controller
                name={'quantity'}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextField
                      value={value || ''}
                      onChange={onChange}
                      size='small'
                      fullWidth
                      label='Số lượng'
                      placeholder='100'
                    />
                  )
                }}
              />
              <FormHelperText error={true}>{errors.quantity?.message}</FormHelperText>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Controller
                name='category'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth size='small'>
                    <InputLabel id='category' required>
                      Danh mục
                    </InputLabel>
                    <Select
                      value={value || ''}
                      onChange={onChange}
                      id='category'
                      input={<OutlinedInput label='Danh mục' id='category' fullWidth size='small' />}
                    >
                      <CustomSelectItem>
                        <Button
                          fullWidth
                          color='primary'
                          onClick={toggleAddCategory}
                          startIcon={<Plus fontSize='small' />}
                          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        >
                          Thêm danh mục mới
                        </Button>
                      </CustomSelectItem>
                      {categorys !== undefined &&
                        categorys.map((category: CategoryBrandType) => (
                          <MenuItem key={category._id} value={category.title}>
                            {category.title}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />

              <FormHelperText error={true}>{errors.category?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name='brand'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth size='small'>
                    <InputLabel id='brand' required>
                      Thương hiệụ
                    </InputLabel>
                    <Select
                      value={value || ''}
                      onChange={onChange}
                      id='brand'
                      input={<OutlinedInput label='Thương hiệụ' id='brand' fullWidth size='small' />}
                    >
                      <CustomSelectItem>
                        <Button
                          fullWidth
                          color='primary'
                          onClick={toggleAddBrand}
                          startIcon={<Plus fontSize='small' />}
                          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        >
                          Thêm thương hiệu mới
                        </Button>
                      </CustomSelectItem>
                      {brands.map((brand: CategoryBrandType) => (
                        <MenuItem key={brand._id} value={brand.title}>
                          {brand.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <FormHelperText error={true}>{errors.brand?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='importWarehouseDate'
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePickerWrapper>
                    <DatePicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      maxDate={new Date()}
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput label='Ngày nhập hàng' />}
                      id='form-layouts-separator-date'
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </DatePickerWrapper>
                )}
              />
              <FormHelperText error={true}>{errors.importWarehouseDate?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='expirationDate'
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePickerWrapper>
                    <DatePicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      minDate={new Date()}
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput label='Ngày hết hạn' />}
                      id='form-layouts-separator-date'
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </DatePickerWrapper>
                )}
              />
              <FormHelperText error={true}>{errors.expirationDate?.message}</FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='shortDesc'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      label='Mô tả ngắn'
                      value={value || ''}
                      rows={3}
                      fullWidth
                      multiline
                      id='invoice-note'
                      sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                      onChange={onChange}
                      error={Boolean(errors.shortDesc)}
                    />
                  )}
                />
                {errors.shortDesc && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.shortDesc.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Mô tả sản phẩm</InputLabel>
              <Controller
                name={'description'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <EditorCustom
                    theme={'snow'}
                    value={value}
                    onChange={(text: string) => onChange(text)}
                    style={{
                      width: '100%',
                      height: '210px',
                      marginBottom: '50px'
                    }}
                    formats={formats}
                    modules={{
                      toolbar: toolbarOptions
                    }}
                  />
                )}
              />
              {errors.description && (
                <Typography color={'#ff5555'} fontSize={'12px'}>
                  {errors.description.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <FileUploaderRestrictions title={'Tải lên hình ảnh của sản phẩm'} files={files} isLoading={isLoading} />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default AddCard

const toolbarOptions = [
  { header: [1, 2, 3, 4, 5, 6, false] },
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  { list: 'ordered' },
  { list: 'bullet' },
  { indent: '-1' },
  { indent: '+1' },
  { align: '' },
  { align: 'center' },
  { align: 'right' },
  { align: 'justify' },
  'link',
  'image'
]

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align'
]
