// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Types
import { InvoiceType, InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import AddCard from 'src/views/product/add/AddCard'
import AddActions from 'src/views/product/add/AddActions'
import AddNewCustomers from 'src/views/product/add/AddNewCustomer'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const InvoiceAdd = ({ apiClientData, invoiceNumber }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [addCustomerOpen, setAddCustomerOpen] = useState<boolean>(false)
  const [selectedClient, setSelectedClient] = useState<InvoiceClientType | null>(null)
  const [clients, setClients] = useState<InvoiceClientType[] | undefined>(apiClientData)

  const toggleAddCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            clients={clients}
            invoiceNumber={invoiceNumber}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            toggleAddCustomerDrawer={toggleAddCustomerDrawer}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions />
        </Grid>
      </Grid>
      <AddNewCustomers
        clients={clients}
        open={addCustomerOpen}
        setClients={setClients}
        toggle={toggleAddCustomerDrawer}
        setSelectedClient={setSelectedClient}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const clientResponse = await axios.get('/apps/invoice/clients')
  const apiClientData: InvoiceClientType = clientResponse.data

  const allInvoicesResponse = await axios.get('/apps/invoice/invoices', { params: { q: '', status: '' } })
  const lastInvoiceNumber = Math.max(...allInvoicesResponse.data.allData.map((i: InvoiceType) => i.id))

  return {
    props: {
      apiClientData,
      invoiceNumber: lastInvoiceNumber + 1
    }
  }
}

export default InvoiceAdd
