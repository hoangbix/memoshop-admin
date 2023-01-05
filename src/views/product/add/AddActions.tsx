import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

import SendOutline from 'mdi-material-ui/SendOutline'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

interface Props {
  onSubmit: () => void
  state: {
    isHot: boolean
    isSelling: boolean
  }
  setState: (state: { isHot: boolean; isSelling: boolean }) => void
}

const AddActions = (props: Props) => {
  const { onSubmit, setState, state } = props

  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

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
        <InputLabel htmlFor='isHot' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
          Sản phẩm nổi bật
        </InputLabel>
        <Switch id='isHot' onChange={handleChange} name='isHot' />
      </OptionsWrapper>
      <OptionsWrapper sx={{ mb: 1 }}>
        <InputLabel htmlFor='isSelling' sx={{ cursor: 'pointer', fontSize: '0.875rem', color: 'text.secondary' }}>
          Sản phẩm bán chạy
        </InputLabel>
        <Switch id='isSelling' onChange={handleChange} name='isSelling' />
      </OptionsWrapper>
    </Box>
  )
}

export default AddActions
