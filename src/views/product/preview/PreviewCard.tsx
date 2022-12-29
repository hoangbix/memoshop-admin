import { useRef } from 'react'

import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import ReactToPdf from 'react-to-pdf'

import { ProductType } from 'src/types/apps/productTypes'
import LogoIcon from 'src/@core/layouts/components/shared-components/logo'
import { ImageList, ImageListItem } from '@mui/material'

interface Props {
  data: ProductType
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const PreviewCard = ({ data }: Props) => {
  console.log(data)

  const PreviewRef = useRef(null)

  if (data) {
    return (
      <Card>
        <Box ref={PreviewRef}>
          <CardContent>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <LogoIcon width={150} />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <MUITableCell>
                    <Typography variant='h6'>ID sản phẩm</Typography>
                    <Typography variant='h6'>{`#${data._id}`}</Typography>
                  </MUITableCell>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 6.5, mb: 5.5 }} />

          <CardContent>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>{data.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Giá</TableCell>
                    <TableCell>{data.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Đã bán</TableCell>
                    <TableCell>{data.sold}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>{data.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Đánh giá</TableCell>
                    <TableCell>{data.totalratings}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {data.images.length > 0 ? (
              <Box sx={{ mt: '30px' }}>
                <Typography variant='h6'>Hình ảnh sản phẩm</Typography>
                <ImageList sx={{ width: '100%', height: 400 }} cols={3} rowHeight={164}>
                  {data.images.map((item: string, i: number) => (
                    <ImageListItem key={i}>
                      <Box
                        component={'img'}
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item}
                        loading='lazy'
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            ) : null}
          </CardContent>

          <Divider sx={{ mt: 4.5, mb: 0 }} />
        </Box>
        <CardContent>
          <Box sx={{ mt: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Link href={`/apps/invoice/print/${data._id}`} passHref>
              <Button sx={{ mr: 4 }} target='_blank' component='a' variant='contained'>
                Xoá
              </Button>
            </Link>

            <ReactToPdf scale={0.845} targetRef={PreviewRef} filename={`invoice-${data._id}.pdf`}>
              {({ toPdf }: { toPdf: () => void }) => {
                return (
                  <Button variant='contained' color='success' onClick={toPdf}>
                    Chỉnh sửa
                  </Button>
                )
              }}
            </ReactToPdf>
          </Box>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
