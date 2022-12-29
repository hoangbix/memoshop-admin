import { useState } from 'react'

import Grid from '@mui/material/Grid'

import AddCard from 'src/views/product/add/AddCard'
import AddActions from 'src/views/product/add/AddActions'
import AddNewCustomers from 'src/views/product/add/AddNewCategory'

import 'react-datepicker/dist/react-datepicker.css'

const ProductAdd = () => {
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false)

  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard toggleAddCustomerDrawer={toggleAddCustomerDrawer} />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
      <AddNewCustomers open={addCustomerOpen} toggle={toggleAddCustomerDrawer} />
    </>
  )
}

export default ProductAdd
