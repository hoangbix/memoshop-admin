import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import LogoIcon from 'src/@core/layouts/components/shared-components/logo'

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <LogoIcon />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
