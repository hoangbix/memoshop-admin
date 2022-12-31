import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next/types'

import Preview from 'src/views/product/preview/Preview'
import { ProductType } from 'src/types/apps/productTypes'
import axiosClient from 'src/apiClient/axiosClient'

const ProductPreview = (data: ProductType) => {
  return <Preview data={data} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosClient.get('/product')
  const data: ProductType[] = await res.data

  const paths = data.map((item: ProductType) => ({
    params: { id: item._id }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await axiosClient.get(`/product/${params?.id}`)
  const data: ProductType = await res.data

  return {
    props: data,
    revalidate: 5
  }
}

export default ProductPreview
