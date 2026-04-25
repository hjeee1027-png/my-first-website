import React, { useState, useRef } from 'react'
import {
  Box, Typography, TextField, Button, IconButton, CircularProgress,
  Alert, Grid, CardMedia, Chip, Snackbar, LinearProgress,
} from '@mui/material'
import { ArrowBack, Refresh, AddPhotoAlternate, Close } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const IMAGE_SETS = [
  [
    'https://images.unsplash.com/photo-1538481199521-2f05e9ca95d9?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552820728-717b2cbe42d9?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560253023-3ec59bbcc6f5?w=400&h=300&auto=format&fit=crop',
  ],
  [
    'https://images.unsplash.com/photo-1586182987293-9d8a432e7d8f?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616036740571-9a9d82b9e1c6?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=300&auto=format&fit=crop',
  ],
  [
    'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535223289429-462edb9cc663?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400&h=300&auto=format&fit=crop',
  ],
]

const PostWritePage = () => {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [imageSetIdx, setImageSetIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [snackbar, setSnackbar] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileInputRef = useRef(null)

  const currentImages = IMAGE_SETS[imageSetIdx]

  const toggleImage = (url) => {
    setSelectedImages(prev => {
      if (prev.includes(url)) return prev.filter(u => u !== url)
      if (prev.length >= 5) return prev
      return [...prev, url]
    })
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    const remaining = 5 - selectedImages.length
    if (remaining <= 0) { setError('이미지는 최대 5장까지 선택할 수 있어요.'); return }
    const toUpload = files.slice(0, remaining)

    setUploading(true)
    setError('')
    const uploaded = []
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i]
      if (file.size > 5 * 1024 * 1024) { setError('파일 크기는 5MB 이하여야 합니다.'); continue }
      const ext = file.name.split('.').pop()
      const filePath = `${user.id}/${Date.now()}_${i}.${ext}`
      const { error: upErr } = await supabase.storage.from('post-images').upload(filePath, file)
      if (!upErr) {
        const { data } = supabase.storage.from('post-images').getPublicUrl(filePath)
        uploaded.push(data.publicUrl)
      }
      setUploadProgress(Math.round(((i + 1) / toUpload.length) * 100))
    }
    setSelectedImages(prev => [...prev, ...uploaded])
    setUploading(false)
    setUploadProgress(0)
    e.target.value = ''
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요.'); return }
    if (!caption.trim()) { setError('내용을 입력해주세요.'); return }
    if (!user) return

    setLoading(true)
    setError('')

    const { error: insertError } = await supabase.from('sns_posts').insert({
      user_id: user.id,
      title: title.trim(),
      caption: caption.trim(),
      image_url: selectedImages.length > 0 ? JSON.stringify(selectedImages) : null,
      likes_count: 0,
      views_count: 0,
    })

    if (insertError) {
      setError('게시물 작성 중 오류가 발생했습니다.')
      setLoading(false)
      return
    }

    setSnackbar(true)
    setTimeout(() => navigate('/posts'), 1200)
    setLoading(false)
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1, borderBottom: '1px solid #eee' }}>
        <IconButton onClick={() => navigate('/posts')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>게임 리뷰 작성</Typography>
        <Button
          variant="contained" size="small" onClick={handleSubmit} disabled={loading}
          sx={{ borderRadius: 20, px: 2.5, background: 'linear-gradient(90deg, #427AB5, #5B93D3)' }}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : '게시'}
        </Button>
      </Box>

      <Box sx={{ p: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* 제목 */}
        <TextField
          fullWidth label="게시물 제목" placeholder="어떤 게임을 리뷰하시나요?"
          value={title} onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 내용 */}
        <TextField
          fullWidth multiline rows={5}
          label="게임 리뷰 내용"
          placeholder="게임에 대한 솔직한 리뷰를 남겨주세요!&#10;공략 팁, 추천 포인트, 아쉬운 점 등 자유롭게 작성하세요 🎮"
          value={caption} onChange={e => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 이미지 선택 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
              이미지 선택 (최대 5장)
            </Typography>
            <Chip
              label={`${selectedImages.length}/5 선택됨`}
              size="small"
              color={selectedImages.length > 0 ? 'primary' : 'default'}
              sx={{ mr: 1 }}
            />
            <IconButton
              size="small"
              onClick={() => setImageSetIdx(i => (i + 1) % IMAGE_SETS.length)}
              sx={{ bgcolor: '#EEF4FB', mr: 0.5 }}
            >
              <Refresh fontSize="small" />
            </IconButton>
          </Box>

          {/* 내 컴퓨터에서 업로드 */}
          <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
          <Button
            variant="outlined" startIcon={<AddPhotoAlternate />}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || selectedImages.length >= 5}
            fullWidth size="small"
            sx={{ mb: 1.5, borderRadius: 2, borderStyle: 'dashed' }}
          >
            {uploading ? `업로드 중... ${uploadProgress}%` : '내 컴퓨터에서 업로드'}
          </Button>
          {uploading && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1.5, borderRadius: 1 }} />}

          <Grid container spacing={1}>
            {currentImages.map((url, i) => {
              const isSelected = selectedImages.includes(url)
              const selIdx = selectedImages.indexOf(url)
              return (
                <Grid item xs={4} key={i}>
                  <Box
                    onClick={() => toggleImage(url)}
                    sx={{
                      position: 'relative', cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                      border: isSelected ? '3px solid #427AB5' : '3px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <CardMedia
                      component="img" image={url} alt=""
                      sx={{ height: 90, objectFit: 'cover' }}
                    />
                    {isSelected && (
                      <Box sx={{
                        position: 'absolute', inset: 0, bgcolor: 'rgba(66,122,181,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Chip label={selIdx + 1} size="small"
                          sx={{ bgcolor: '#427AB5', color: 'white', fontWeight: 800, fontSize: 13, height: 24, width: 24, minWidth: 0 }} />
                      </Box>
                    )}
                  </Box>
                </Grid>
              )
            })}
          </Grid>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
            새로고침(↻) 버튼을 눌러 다른 이미지를 볼 수 있어요
          </Typography>
        </Box>

        {/* 선택된 이미지 미리보기 */}
        {selectedImages.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>선택된 이미지</Typography>
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
              {selectedImages.map((url, i) => (
                <Box key={i} sx={{ position: 'relative', flexShrink: 0 }}>
                  <CardMedia
                    component="img" image={url} alt=""
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setSelectedImages(prev => prev.filter(u => u !== url))}
                    sx={{
                      position: 'absolute', top: -6, right: -6,
                      bgcolor: 'error.main', color: 'white', width: 20, height: 20,
                      '&:hover': { bgcolor: 'error.dark' },
                    }}
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar} autoHideDuration={1500}
        message="게시물이 업로드됐습니다! ✅"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  )
}

export default PostWritePage
