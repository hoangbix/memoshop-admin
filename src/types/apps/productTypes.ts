export type InvoiceStatus = 'Paid' | string

export type InvoiceLayoutProps = {
  id: string | undefined
}

export type InvoiceClientType = {
  name: string
  address: string
  company: string
  country: string
  contact: string
  companyEmail: string
}

export type InvoiceType = {
  id: number
  name: string
  total: number
  avatar: string
  service: string
  dueDate: string
  address: string
  company: string
  country: string
  contact: string
  avatarColor?: string
  issuedDate: string
  companyEmail: string
  balance: string | number
  invoiceStatus: InvoiceStatus
}

export type ImagesType = {
  url: string
  asset_id: string
  public_id: string
}

type RatingType = {
  star: number
  comment: string
  postedby: string
}

export type ProductType = {
  _id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  price: number
  promotionalPrice: number
  category: string
  brand: string
  quantity: number
  sold: number
  images: ImagesType[]
  ratings: RatingType[]
  totalratings: number
  importWarehouseDate: Date
  expirationDate: Date
}

export type InvoicePaymentType = {
  iban: string
  totalDue: string
  bankName: string
  country: string
  swiftCode: string
}

export type SingleInvoiceType = {
  invoice: InvoiceType
  paymentDetails: InvoicePaymentType
}
