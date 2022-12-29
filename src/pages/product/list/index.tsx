import { Fragment, useState, useEffect, MouseEvent } from 'react'

import Link from 'next/link'
import toast from 'react-hot-toast'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

import format from 'date-fns/format'

import { useDispatch, useSelector } from 'react-redux'
import { deleteInvoice } from 'src/store/apps/invoice'

import { RootState, AppDispatch } from 'src/store'
import { ProductType } from 'src/types/apps/productTypes'

import TableHeader from 'src/views/product/list/TableHeader'

import 'react-datepicker/dist/react-datepicker.css'

import { fetchProduct } from 'src/store/apps/product'
import useClipboard from 'src/@core/hooks/useClipboard'

interface CellType {
  row: ProductType
}

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 600
}))

const RowOptions = ({ id }: { id: number | string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const clipboard = useClipboard()

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleClick = () => {
    clipboard.copy(id)
    handleRowOptionsClose()
    toast.success('ID sản phẩm đã được sao chép.', {
      duration: 4000
    })
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Link href={`/product/edit/${id}`} passHref>
          <MenuItem>
            <PencilOutline fontSize='small' sx={{ mr: 2 }} />
            Chỉnh sửa
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClick}>
          <ContentCopy fontSize='small' sx={{ mr: 2 }} />
          Sao chép ID
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'title',
    minWidth: 300,
    headerName: 'Sản phẩm',
    renderCell: ({ row }: CellType) => {
      const { title, description } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href={`/product/preview/${row._id}`} passHref>
              <StyledLink>{title}</StyledLink>
            </Link>
            <Typography noWrap variant='caption'>
              {description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'price',
    headerName: 'Giá',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{(row.price || 0).toLocaleString('vi-VN', { maximumFractionDigits: 2 })}đ</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'quantity',
    headerName: 'Số lượng',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.quantity || 0}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'sold',
    headerName: 'Đã bán',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.sold || 0}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 105,
    field: 'createdAt',
    headerName: 'Ngày hết hạn',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{format(new Date(row.createdAt), 'dd-MM-yyyy')}</Typography>
    )
  }
]

const InvoiceList = () => {
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Hành động',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Xoá sản phẩm'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row._id))}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='Chi tiết'>
            <Box>
              <Link href={`/product/preview/${row._id}`} passHref>
                <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                  <EyeOutline />
                </IconButton>
              </Link>
            </Box>
          </Tooltip>
          <RowOptions id={row._id} />
        </Box>
      )
    }
  ]

  return (
    <Card>
      <TableHeader value={value} handleFilter={handleFilter} />
      <DataGrid
        autoHeight
        pagination
        rows={data}
        columns={columns}
        getRowId={row => row._id}
        checkboxSelection
        disableSelectionOnClick
        pageSize={Number(pageSize)}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          pagination: {
            labelRowsPerPage: 'Số hàng trên mỗi trang'
          }
        }}
      />
    </Card>
  )
}

export default InvoiceList
