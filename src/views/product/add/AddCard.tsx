import { useState, forwardRef, useEffect } from 'react'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, alpha } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput'
import DatePicker from 'react-datepicker'

import Plus from 'mdi-material-ui/Plus'

import LogoIcon from 'src/@core/layouts/components/shared-components/logo'
import { FormControl } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FileUploaderRestrictions from 'src/@core/components/upload-file/FileUploaderRestrictions'
import { fetchCategory } from 'src/store/apps/category'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

interface Props {
  toggleAddCustomerDrawer: () => void
}

type DateType = Date | null | undefined

interface CategoryType {
  _id: string
  title: string
  slug: string
}

const CustomInput = forwardRef((props: any, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' size='small' />
})

const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  backgroundColor: 'transparent !important',
  padding: '0 !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important` }
}))

const AddCard = (props: Props) => {
  const { toggleAddCustomerDrawer } = props
  const dispatch = useDispatch<AppDispatch>()

  const [selected, setSelected] = useState<string[]>([])
  const [date, setDate] = useState<DateType>(null)

  const { data: categorys } = useSelector((state: RootState) => state.category)

  const [endDate, setEndDate] = useState<DateType>(null)
  const [language, setLanguage] = useState<string[]>([])

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    setSelected(event.target.value as string[])
  }

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <LogoIcon />
            <Typography variant='h6'>Thêm mới sản phẩm</Typography>
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
              <TextField
                required
                size='small'
                fullWidth
                label='Tên sản phẩm'
                placeholder='Nấm đùi gà Green Kingdom 250gr'
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField required size='small' fullWidth label='Giá sản phẩm' placeholder='150.000đ' />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField size='small' fullWidth label='Giá khuyến mãi' placeholder='175.000đ' />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField required size='small' fullWidth label='Số lượng' placeholder='100' />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='select-category'>Danh mục</InputLabel>
                <Select
                  multiple
                  value={selected}
                  onChange={handleCategoryChange}
                  id='form-layouts-separator-multiple-select'
                  input={<OutlinedInput label='Danh mục' id='select-category' />}
                >
                  <CustomSelectItem>
                    <Button
                      fullWidth
                      color='primary'
                      onClick={handleAddNewCustomer}
                      startIcon={<Plus fontSize='small' />}
                      sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                    >
                      Thêm danh mục mới
                    </Button>
                  </CustomSelectItem>
                  {categorys !== undefined &&
                    categorys.map((category: CategoryType) => (
                      <MenuItem key={category._id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Thương hiệu</InputLabel>
                <Select
                  multiple
                  value={language}
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Thương hiệu' id='select-multiple-language' />}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                  <MenuItem value='Portuguese'>Portuguese</MenuItem>
                  <MenuItem value='Italian'>Italian</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Arabic'>Arabic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  maxDate={new Date()}
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput label='Ngày nhập hàng' />}
                  id='form-layouts-separator-date'
                  onChange={(date: Date) => setDate(date)}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={endDate}
                  minDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput label='Ngày hết hạn' />}
                  id='form-layouts-separator-date'
                  onChange={(date: Date) => setEndDate(date)}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='invoice-note'>Mô tả:</InputLabel>
              <TextField
                rows={4}
                fullWidth
                multiline
                id='invoice-note'
                sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUploaderRestrictions title={'Tải lên hình ảnh của sản phẩm'} />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default AddCard
