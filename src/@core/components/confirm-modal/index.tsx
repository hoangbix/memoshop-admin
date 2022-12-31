import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

const ConfirmModal = (props: Props) => {
  const { open, onClose, title, onConfirm } = props

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{title || 'Xoá'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xoá không?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} variant={'outlined'}>
          Huỷ
        </Button>
        <Button onClick={onConfirm} autoFocus variant={'contained'} color={'error'}>
          Xác nhận xoá
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
