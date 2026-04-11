import React, { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { supabase } from '../supabase.js'

const PostCreateModal = ({ open, onClose, onCreated, currentUser }) => {
  const [form, setForm] = useState({
    title: '', content: '', image_url: '', product_url: '', product_image_url: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !currentUser) return

    setLoading(true)
    await supabase.from('posts').insert([{
      title: form.title,
      content: form.content,
      user_id: currentUser.id,
      image_url: form.image_url || null,
      product_url: form.product_url || null,
      product_image_url: form.product_image_url || null,
    }])
    setLoading(false)
    setForm({ title: '', content: '', image_url: '', product_url: '', product_image_url: '' })
    onClose()
    onCreated()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        pb: 1, color: '#5C3D00', fontWeight: 800,
      }}>
        🐾 새 게시물 작성
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            fullWidth label="제목" name="title"
            value={form.title} onChange={handleChange}
            required sx={{ mb: 2 }}
          />
          <TextField
            fullWidth label="내용" name="content"
            value={form.content} onChange={handleChange}
            multiline rows={4} sx={{ mb: 2 }}
          />
          <TextField
            fullWidth label="이미지 URL (선택)" name="image_url"
            value={form.image_url} onChange={handleChange}
            sx={{ mb: 2 }}
            placeholder="https://..."
          />

          <Typography variant="subtitle2" sx={{ color: '#8B6914', mb: 1, fontWeight: 700 }}>
            🛍 상품 연결 (선택)
          </Typography>
          <TextField
            fullWidth label="상품 구매 URL" name="product_url"
            value={form.product_url} onChange={handleChange}
            sx={{ mb: 2 }}
            placeholder="https://..."
          />
          <TextField
            fullWidth label="상품 이미지 URL" name="product_image_url"
            value={form.product_image_url} onChange={handleChange}
            placeholder="https://..."
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} sx={{ color: '#8B6914' }}>
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !form.title.trim()}
            sx={{
              background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
              color: '#5C3D00',
              '&:hover': { background: 'linear-gradient(90deg, #ffc800, #5ab868)' },
            }}
          >
            {loading ? '작성 중...' : '게시하기'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default PostCreateModal
