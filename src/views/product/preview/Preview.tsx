import { useState, Fragment } from 'react'

import Link from 'next/link'

import Alert from '@mui/material/Alert'

import { ProductType } from 'src/types/apps/productTypes'

import PreviewCard from 'src/views/product/preview/PreviewCard'
import AddPaymentDrawer from 'src/views/product/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/product/shared-drawer/SendInvoiceDrawer'
import { Box } from '@mui/material'

interface Props {
  data: ProductType
}

const ProductPreview = ({ data }: Props) => {
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  if (!data) {
    return (
      <Box>
        <Box component={'img'} src={'images/oops.png'} />
        <Alert severity='error'>
          Product does not exist. Please check the list of products: <Link href='/product/list'>Product List</Link>
        </Alert>
      </Box>
    )
  }

  return (
    <Fragment>
      <PreviewCard data={data} />
      <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
      <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
    </Fragment>
  )
}

export default ProductPreview
