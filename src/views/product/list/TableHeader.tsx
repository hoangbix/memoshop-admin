import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { value, handleFilter } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <TextField
        size='small'
        value={value}
        placeholder='Tìm kiếm sản phẩm...'
        sx={{ mr: 4, mb: 2, maxWidth: '350px' }}
        onChange={e => handleFilter(e.target.value)}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href='/product/add' passHref>
          <Button sx={{ mb: 2 }} variant='contained'>
            Tạo mới sản phẩm
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
