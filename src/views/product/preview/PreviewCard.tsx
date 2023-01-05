import { useRef, useState } from 'react'

import Link from 'next/link'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import ReactToPdf from 'react-to-pdf'

import { ProductType } from 'src/types/apps/productTypes'
import LogoIcon from 'src/@core/layouts/components/shared-components/logo'
import { Rating } from '@mui/material'
import EditorCustom from 'src/@core/components/editor-custom'
import { format } from 'date-fns'
import ConfirmModal from 'src/@core/components/confirm-modal'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { deleteProduct } from 'src/store/apps/product/product.thunk'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface Props {
  data: ProductType
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const PreviewCard = ({ data }: Props) => {
  const PreviewRef = useRef(null)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const confirmHanlder = () => {
    dispatch(deleteProduct(data._id))
      .unwrap()
      .then(() => {
        router.push('/product/list')
        toast.success('Sản phẩm đã được xoá thành công', {
          duration: 5000
        })
        handleClose()
      })
      .catch(err => {
        toast.error(err.message || 'Có lỗi không xác định xảy ra. Vui lòng thử lại sau ít phút', {
          duration: 5000
        })
      })
  }

  if (data) {
    return (
      <>
        <Card>
          <Box ref={PreviewRef}>
            <CardContent>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                  <Link href='/'>
                    <Box component={'a'} sx={{ cursor: 'pointer' }}>
                      <LogoIcon width={150} />
                    </Box>
                  </Link>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                    <MUITableCell component={'span'}>
                      <Typography variant='h6'>ID sản phẩm</Typography>
                      <Typography variant='h6'>{`#${data._id}`}</Typography>
                    </MUITableCell>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            <Divider sx={{ mt: 6.5, mb: 5.5 }} />

            <CardContent>
              <Grid container justifyContent='space-between' spacing={5} columns={{ xs: 4, lg: 8 }}>
                <Grid item xs={4} sm={4} md={3}>
                  {data.images.length ? (
                    <>
                      <Box
                        sx={{
                          width: 328,
                          maxWidth: '100%',
                          border: '1px solid #cccccc80',
                          borderRadius: '20px',
                          margin: '0 auto'
                        }}
                      >
                        <Box
                          component={'img'}
                          sx={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                          src={data.images[0].url}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          gap: '20px',
                          my: '20px',
                          justifyContent: 'center'
                        }}
                      >
                        {data.images.map(image => (
                          <Box
                            key={image.public_id}
                            component={'img'}
                            sx={{ width: 118, height: '100%', borderRadius: '10px' }}
                            src={image.url}
                          />
                        ))}
                      </Box>
                    </>
                  ) : (
                    <Box
                      sx={{
                        width: 328,
                        maxWidth: '100%',
                        border: '1px solid #cccccc80',
                        borderRadius: '20px',
                        margin: '0 auto'
                      }}
                    >
                      <Box
                        component={'img'}
                        sx={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                        src={
                          'https://res.cloudinary.com/dparfrfjz/image/upload/v1672376632/default-product-image_x6kln8.png'
                        }
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={4} sm={4} md={5} sx={{ flex: 1 }}>
                  <Box sx={{ ml: { xs: '0', md: '30px' } }}>
                    {data.promotionalPrice ? (
                      <Typography
                        color={'#f74b81'}
                        sx={{
                          backgroundColor: '#fde0e9',
                          display: 'inline-block',
                          padding: '8px 12px',
                          mb: '20px',
                          fontSize: '14px',
                          fontWeight: 700,
                          borderRadius: '5px'
                        }}
                      >
                        Đang giảm giá
                      </Typography>
                    ) : null}
                    <Typography
                      variant={'h2'}
                      sx={{
                        fontSize: { xs: '18px', lg: '24px' },
                        color: '#253D4E',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: { xs: 3, lg: 2 }
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Box sx={{ padding: '15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {data.ratings.length ? (
                        <>
                          <Rating size='small' name='half-rating-read' value={4.5} precision={0.5} readOnly />
                          <Typography fontSize={'14px'}>({data.totalratings} đánh giá)</Typography>
                        </>
                      ) : (
                        <>
                          <Rating size='small' value={null} readOnly />
                          <Typography fontSize={'14px'}>Chưa có đánh giá</Typography>
                        </>
                      )}
                    </Box>
                    <Box
                      sx={{
                        padding: '15px 0',
                        display: { xs: 'block', md: 'flex' },
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      {data.promotionalPrice ? (
                        <>
                          <Typography color={'#3BB77E'} fontSize={{ xs: '20px', lg: '28px' }} fontWeight={'bold'}>
                            {data.promotionalPrice.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}đ
                          </Typography>
                          <Box sx={{ display: { xs: 'flex', md: 'block' }, alignItems: 'center', gap: '10px' }}>
                            <Typography color={'#FDC040'} fontSize='14px' fontWeight={'bold'}>
                              Giảm {Math.abs(((data.promotionalPrice - data.price) / data.price) * 100).toFixed(1)}%
                            </Typography>
                            <Typography
                              color={'#adadad'}
                              fontSize={{ xs: '18px', lg: '20px' }}
                              fontWeight={'600'}
                              sx={{ textDecoration: 'line-through' }}
                            >
                              {data.price.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}đ
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <Typography color={'#3BB77E'} fontSize={{ xs: '20px', lg: '28px' }} fontWeight={'bold'}>
                          {data.price.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}đ
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      gutterBottom
                      height={'55px'}
                      sx={{
                        color: '#253D4E',
                        fontSize: '14px',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        mb: '10px'
                      }}
                    >
                      {data.shortDesc}
                    </Typography>

                    <Grid container spacing={5} sx={{ mt: '30px' }}>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Nhà cung cấp: <span style={{ color: '#3BB77E' }}>{data.brand}</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Ngày nhập hàng:{' '}
                          <span style={{ color: '#3BB77E' }}>
                            {format(new Date(data.importWarehouseDate), 'dd-MM-yyyy') || ''}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Hạn sử dụng:{' '}
                          <span style={{ color: '#3BB77E' }}>
                            {' '}
                            {format(new Date(data.expirationDate), 'dd-MM-yyyy') || ''}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Danh mục: <span style={{ color: '#3BB77E' }}>{data.category}</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Kho hàng: <span style={{ color: '#3BB77E' }}>{data.quantity} sản phẩm</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          SKU: <span style={{ color: '#3BB77E' }}>JGHG878LA51</span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            <Divider sx={{ mt: 4.5, mb: 0 }} />

            {data.description ? (
              <>
                <CardContent>
                  <Typography fontWeight={'bold'}>Mô tả sản phẩm</Typography>
                  <EditorCustom
                    readOnly
                    theme={'bubble'}
                    modules={{
                      toolbar: false
                    }}
                    value={data.description}
                  />
                </CardContent>
                <Divider sx={{ mt: 4.5, mb: 0 }} />
              </>
            ) : null}
          </Box>
          <CardContent>
            <Box
              sx={{
                mt: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: '10px'
              }}
            >
              <ReactToPdf scale={0.75} targetRef={PreviewRef} filename={`memo-product-${data._id}.pdf`}>
                {({ toPdf }: { toPdf: () => void }) => {
                  return (
                    <Button variant='contained' color='success' onClick={toPdf} sx={{ mr: { xs: 0, sm: 4 } }}>
                      Xuất file PDF
                    </Button>
                  )
                }}
              </ReactToPdf>

              <Link href={`/product/edit/${data._id}`} passHref>
                <Button sx={{ mr: { xs: 0, sm: 4 } }} target='_blank' component='a' variant='contained'>
                  Chỉnh sửa
                </Button>
              </Link>

              <Button target='_blank' component='a' variant='contained' color='error' onClick={handleOpen}>
                Xoá sản phẩm
              </Button>
            </Box>
          </CardContent>
        </Card>

        <ConfirmModal
          open={open}
          onClose={handleClose}
          onConfirm={confirmHanlder}
          title={'Bạn đang thực hiện xoá sản phẩm'}
        />
      </>
    )
  } else {
    return null
  }
}

export default PreviewCard
