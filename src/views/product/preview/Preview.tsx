import { useState, useEffect } from 'react'

import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

import { ProductType } from 'src/types/apps/productTypes'

import PreviewCard from 'src/views/product/preview/PreviewCard'
import AddPaymentDrawer from 'src/views/product/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/product/shared-drawer/SendInvoiceDrawer'

import axiosClient from 'src/apiClient/axiosClient'

const InvoicePreview = ({ id }: { id: string }) => {
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | ProductType>(null)
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  useEffect(() => {
    axiosClient
      .get(`/product/${id}`)
      .then(res => {
        setData(res.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  if (data) {
    return (
      <>
        <PreviewCard data={data} />
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Sản phẩm có id: {id} không tồn tại. Vui lòng kiểm tra danh sách sản phẩm:{' '}
            <Link href='/product/list'>Danh sách sản phẩm</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoicePreview
