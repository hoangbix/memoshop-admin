// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/productTypes'

// ** Demo Components Imports
import Edit from 'src/views/product/edit/Edit'

const InvoiceEdit = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Edit id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('/apps/invoice/invoices')
  const data: InvoiceType[] = await res.data.allData

  const paths = data.map((item: InvoiceType) => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

export default InvoiceEdit
