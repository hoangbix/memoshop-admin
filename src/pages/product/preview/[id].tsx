import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

import axios from 'axios'

import { ProductType } from 'src/types/apps/productTypes'

import Preview from 'src/views/product/preview/Preview'

const InvoicePreview = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Preview id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`https://api-memeshop.herokuapp.com/api/v1/product`)
  const data: ProductType[] = await res.data

  const paths = data.map((item: ProductType) => ({
    params: { id: `${item._id}` }
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

export default InvoicePreview
