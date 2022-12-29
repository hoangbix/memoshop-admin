import { useState } from 'react'

import Grid from '@mui/material/Grid'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import AddCard from 'src/views/product/add/AddCard'
import AddActions from 'src/views/product/add/AddActions'
import AddNewCategory from 'src/views/product/add/AddNewCategory'

import 'react-datepicker/dist/react-datepicker.css'
import AddNewBrand from 'src/views/product/add/AddNewBrand'

export type AddProductType = {
  title: string
  price: number
}

const schema = yup.object().shape({
  title: yup.string().required('Đây là trường bắt buộc').min(3, 'Tối thiểu 3 ký tự').max(74, 'Tối đa 74 ký tự'),
  desc: yup.string().required('Đây là trường bắt buộc').min(10, 'Tối thiểu 10 ký tự').max(5000, 'Tối đa 5000 ký tự'),
  price: yup.number().required('Đây là trường bắt buộc'),
  promotionalPrice: yup.number(),
  quantity: yup.number().required('Đây là trường bắt buộc'),
  category: yup.string().required('Đây là trường bắt buộc'),
  brand: yup.string().required('Đây là trường bắt buộc'),
  importWarehouseDate: yup.date().required('Đây là trường bắt buộc'),
  expirationDate: yup.date().required('Đây là trường bắt buộc'),
  images: yup.array()
})

const ProductAdd = () => {
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)
  const [openAddBrand, setOpenAddBrand] = useState<boolean>(false)

  const toggleAddCategory = () => setOpenAddCategory(!openAddCategory)
  const toggleAddBrand = () => setOpenAddBrand(!openAddBrand)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddProductType>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })
  console.log('errors', errors)

  const onSubmit = (data: any) => {
    console.log('submit', data)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            toggleAddCategory={toggleAddCategory}
            toggleAddBrand={toggleAddBrand}
            errors={errors}
            control={control}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions onSubmit={handleSubmit(onSubmit)} />
        </Grid>
      </Grid>
      <AddNewCategory open={openAddCategory} toggle={toggleAddCategory} />
      <AddNewBrand open={openAddBrand} toggle={toggleAddBrand} />
    </>
  )
}

export default ProductAdd
