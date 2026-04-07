import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Paper,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

const Section08 = () => {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState(null)

  const handleOpen = () => setOpen(true)

  const handleClose = (action = '닫기') => {
    setOpen(false)
    setResult(action)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 08 — Modal
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={handleOpen}>
          모달 열기
        </Button>
        <Button variant="outlined" onClick={handleOpen}>
          모달 열기 (outlined)
        </Button>
      </Box>

      {/* 결과 표시 */}
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          마지막 액션
        </Typography>
        <Typography variant="body2">
          {result ? (
            <strong style={{ color: result === '확인' ? '#1976d2' : '#e53935' }}>
              {result}
            </strong>
          ) : (
            <span style={{ color: '#bbb' }}>(없음)</span>
          )}
        </Typography>
      </Paper>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => handleClose('배경 클릭')}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pr: 6 }}>
          작업을 진행하시겠습니까?
          <IconButton
            onClick={() => handleClose('X 버튼')}
            size="small"
            sx={{ position: 'absolute', right: 12, top: 12, color: 'grey.500' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            이 작업은 되돌릴 수 없습니다. 계속 진행하면 선택한 항목이 삭제되며
            관련 데이터도 함께 제거됩니다. 정말로 진행하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => handleClose('취소')} color="inherit">
            취소
          </Button>
          <Button onClick={() => handleClose('확인')} variant="contained" color="error">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Section08
