import { useState, Fragment } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert'
import { Box } from '@mui/material'

import { ProductType } from 'src/types/apps/productTypes'

import PreviewCard from 'src/views/product/preview/PreviewCard'
import AddPaymentDrawer from 'src/views/product/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/product/shared-drawer/SendInvoiceDrawer'

import Spinner from 'src/@core/components/spinner'

interface Props {
  data: ProductType
}

const ProductPreview = ({ data }: Props) => {
  const router = useRouter()

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  if (router.isFallback) {
    return <Spinner />
  }

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
