import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: HomeOutline,
      badgeContent: 'new',
      badgeColor: 'error',
      path: '/dashboards'
    },
    {
      sectionTitle: 'Quản lý'
    },
    {
      title: 'Sản phẩm',
      icon: FileDocumentOutline,
      children: [
        {
          title: 'Danh sách',
          path: '/product/list'
        },
        {
          title: 'Thêm mới',
          path: '/product/add'
        }
      ]
    },
    {
      title: 'Người dùng',
      icon: AccountOutline,
      children: [
        {
          title: 'Danh sách',
          path: '/user/list'
        },
        {
          title: 'Xem',
          path: '/user/view'
        }
      ]
    },
    {
      title: 'Chat',
      icon: MessageOutline,
      path: '/chat'
    }
  ]
}

export default navigation
