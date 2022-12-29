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
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { addProduct } from 'src/store/apps/product'
import { UploadImgType } from 'src/types/apps'
import toast from 'react-hot-toast'
import { resetUpload } from 'src/store/apps/upload'
import { useRouter } from 'next/router'

export type AddProductType = {
  title: string
  desc: string
  price: number
  quantity: number
  promotionalPrice: number
  category: string
  brand: string
  importWarehouseDate: Date | null
  expirationDate: Date | null
  images: UploadImgType[]
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
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false)
  const [openAddBrand, setOpenAddBrand] = useState<boolean>(false)

  const toggleAddCategory = () => setOpenAddCategory(!openAddCategory)
  const toggleAddBrand = () => setOpenAddBrand(!openAddBrand)

  const { data: files } = useSelector((state: RootState) => state.upload)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddProductType>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = (data: AddProductType) => {
    dispatch(
      addProduct({
        ...data,
        images: files
      })
    )
      .unwrap()
      .then(() => {
        router.push('/product/list')
        toast.success('Sản phẩm đã được thêm thành công', {
          duration: 4000
        })
        reset()
        dispatch(resetUpload())
      })
      .catch((err: any) =>
        toast.error(err.message || 'Có lỗi không xác định xảy ra. Vui lòng thử lại sau ít phút', {
          duration: 2000
        })
      )
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
