import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

import SendOutline from 'mdi-material-ui/SendOutline'
import { useRouter } from 'next/router'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

interface Props {
  onSubmit: () => void
}

const AddActions = (props: Props) => {
  const { onSubmit } = props

  const router = useRouter()

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<SendOutline />} onClick={onSubmit}>
            Thêm sản phẩm
          </Button>
          <Button fullWidth sx={{ mb: 3.5 }} variant='outlined' onClick={() => router.back()}>
            Huỷ bỏ
          </Button>
        </CardContent>
      </Card>
      <OptionsWrapper sx={{ mb: 1 }}>
        <InputLabel
          htmlFor='invoice-add-payment-terms'
          sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Sản phẩm nổi bật
        </InputLabel>
        <Switch id='invoice-add-payment-terms' />
      </OptionsWrapper>
      <OptionsWrapper sx={{ mb: 1 }}>
        <InputLabel
          htmlFor='invoice-add-client-notes'
          sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}
        >
          Sản phẩm bán chạy
        </InputLabel>
        <Switch id='invoice-add-client-notes' />
      </OptionsWrapper>
    </Box>
  )
}

export default AddActions
