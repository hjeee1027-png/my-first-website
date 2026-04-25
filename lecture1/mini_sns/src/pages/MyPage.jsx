import React, { useEffect, useState } from 'react'
import {
  Box, Typography, Avatar, Button, Divider, List, ListItem,
  ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Snackbar, Alert, IconButton, Skeleton,
  Card, CardMedia, CardActionArea,
} from '@mui/material'
import {
  Edit, Settings, HelpOutline, Report, Article, Favorite,
  Comment, CameraAlt, Lock, ChevronRight, Logout,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const MyPage = () => {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ posts: 0, comments: 0, likes: 0 })
  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [pwOpen, setPwOpen] = useState(false)
  const [editForm, setEditForm] = useState({ display_name: '', bio: '', phone: '' })
  const [pwForm, setPwForm] = useState({ newPw: '', confirmPw: '' })
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, msg: '', type: 'success' })

  useEffect(() => {
    if (user) {
      fetchStats()
      fetchMyPosts()
    }
  }, [user])

  useEffect(() => {
    if (profile) {
      setEditForm({ display_name: profile.display_name || '', bio: profile.bio || '', phone: profile.phone || '' })
    }
  }, [profile])

  const fetchStats = async () => {
    const [postsRes, commentsRes, likesRes] = await Promise.all([
      supabase.from('sns_posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('sns_comments').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('sns_likes').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])
    setStats({
      posts: postsRes.count || 0,
      comments: commentsRes.count || 0,
      likes: likesRes.count || 0,
    })
    setLoading(false)
  }

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(9)
    setMyPosts(data || [])
  }

  const parseFirstImage = (imageUrl) => {
    if (!imageUrl) return null
    try {
      const arr = JSON.parse(imageUrl)
      return Array.isArray(arr) ? arr[0] : null
    } catch { return imageUrl }
  }

  const handleSaveProfile = async () => {
    if (!editForm.display_name.trim()) { setSnackbar({ open: true, msg: '닉네임을 입력해주세요.', type: 'error' }); return }
    setSaving(true)
    const { error } = await supabase.from('sns_users').update({
      display_name: editForm.display_name.trim(),
      bio: editForm.bio.trim(),
      phone: editForm.phone.trim(),
    }).eq('id', user.id)

    if (error) {
      setSnackbar({ open: true, msg: '저장 중 오류가 발생했습니다.', type: 'error' })
    } else {
      refreshProfile()
      setEditOpen(false)
      setSnackbar({ open: true, msg: '프로필이 수정됐습니다!', type: 'success' })
    }
    setSaving(false)
  }

  const handleChangePw = async () => {
    if (pwForm.newPw.length < 6) { setSnackbar({ open: true, msg: '비밀번호는 6자 이상이어야 합니다.', type: 'error' }); return }
    if (pwForm.newPw !== pwForm.confirmPw) { setSnackbar({ open: true, msg: '비밀번호가 일치하지 않습니다.', type: 'error' }); return }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: pwForm.newPw })
    if (error) {
      setSnackbar({ open: true, msg: '비밀번호 변경 실패: ' + error.message, type: 'error' })
    } else {
      setPwOpen(false)
      setPwForm({ newPw: '', confirmPw: '' })
      setSnackbar({ open: true, msg: '비밀번호가 변경됐습니다!', type: 'success' })
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const DEFAULT_IMGS = [
    'https://images.unsplash.com/photo-1538481199521-2f05e9ca95d9?w=200&h=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552820728-717b2cbe42d9?w=200&h=200&auto=format&fit=crop',
  ]

  return (
    <Box sx={{ pb: 4 }}>
      {/* 프로필 헤더 */}
      <Box sx={{
        background: 'linear-gradient(160deg, #1a3a5c, #427AB5)',
        color: 'white', pt: 3, pb: 4, px: 2, position: 'relative',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profile?.avatar_url || ''}
              sx={{ width: 80, height: 80, bgcolor: '#FFEF91', color: '#427AB5', fontSize: 28, fontWeight: 800 }}
            >
              {profile?.display_name?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <IconButton
              size="small"
              onClick={() => setEditOpen(true)}
              sx={{
                position: 'absolute', bottom: 0, right: 0,
                bgcolor: '#FFEF91', color: '#427AB5', width: 26, height: 26,
                '&:hover': { bgcolor: '#ffe066' },
              }}
            >
              <CameraAlt sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {loading ? '...' : (profile?.display_name || '게임러')}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              @{profile?.username || ''}
            </Typography>
            {profile?.bio && (
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                {profile.bio}
              </Typography>
            )}
          </Box>
        </Box>

        {/* 통계 */}
        <Box sx={{ display: 'flex', mt: 2.5, gap: 1 }}>
          {[
            { label: '게시물', value: stats.posts, icon: <Article sx={{ fontSize: 16 }} /> },
            { label: '댓글', value: stats.comments, icon: <Comment sx={{ fontSize: 16 }} /> },
            { label: '좋아요', value: stats.likes, icon: <Favorite sx={{ fontSize: 16 }} /> },
          ].map(stat => (
            <Box key={stat.label} sx={{
              flex: 1, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.15)',
              borderRadius: 2, p: 1,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.3, mb: 0.3 }}>
                {stat.icon}
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
              </Box>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 정보 수정 버튼 */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1 }}>
        <Button
          variant="outlined" startIcon={<Edit />} size="small"
          onClick={() => setEditOpen(true)} sx={{ borderRadius: 20, flex: 1 }}
        >
          프로필 수정
        </Button>
        <Button
          variant="outlined" startIcon={<Lock />} size="small"
          onClick={() => setPwOpen(true)} sx={{ borderRadius: 20, flex: 1 }}
        >
          비밀번호 변경
        </Button>
      </Box>

      {/* 내 게시물 */}
      {myPosts.length > 0 && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            내 게시물 ({stats.posts})
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.5 }}>
            {myPosts.map((post, i) => {
              const img = parseFirstImage(post.image_url) || DEFAULT_IMGS[i % DEFAULT_IMGS.length]
              return (
                <CardActionArea key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
                  <CardMedia
                    component="img" image={img} alt={post.title}
                    sx={{ height: 110, objectFit: 'cover', borderRadius: 1 }}
                  />
                </CardActionArea>
              )
            })}
          </Box>
        </Box>
      )}

      <Divider sx={{ mx: 2 }} />

      {/* 설정 메뉴 */}
      <List sx={{ px: 1 }}>
        {[
          { icon: <Settings />, text: '환경설정', action: () => alert('환경설정 페이지는 준비 중입니다.') },
          { icon: <HelpOutline />, text: '문의하기', action: () => alert('이메일: support@gemview.kr') },
          { icon: <Report />, text: '신고하기', action: () => alert('신고 접수 페이지는 준비 중입니다.') },
        ].map(item => (
          <ListItem
            key={item.text} onClick={item.action}
            sx={{ cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#427AB5' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            <ChevronRight color="action" />
          </ListItem>
        ))}
        <ListItem
          onClick={handleLogout}
          sx={{ cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}><Logout color="error" /></ListItemIcon>
          <ListItemText primary="로그아웃" primaryTypographyProps={{ color: 'error' }} />
        </ListItem>
      </List>

      {/* 프로필 수정 다이얼로그 */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="닉네임 *" margin="normal"
            value={editForm.display_name}
            onChange={e => setEditForm(p => ({ ...p, display_name: e.target.value }))} />
          <TextField fullWidth label="전화번호" margin="normal"
            value={editForm.phone}
            onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} />
          <TextField fullWidth label="소개글" multiline rows={3} margin="normal"
            value={editForm.bio}
            onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>취소</Button>
          <Button onClick={handleSaveProfile} variant="contained" disabled={saving}>
            {saving ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 변경 다이얼로그 */}
      <Dialog open={pwOpen} onClose={() => setPwOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>비밀번호 변경</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="새 비밀번호 (6자 이상)" type="password" margin="normal"
            value={pwForm.newPw}
            onChange={e => setPwForm(p => ({ ...p, newPw: e.target.value }))} />
          <TextField fullWidth label="비밀번호 확인" type="password" margin="normal"
            value={pwForm.confirmPw}
            onChange={e => setPwForm(p => ({ ...p, confirmPw: e.target.value }))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPwOpen(false)}>취소</Button>
          <Button onClick={handleChangePw} variant="contained" disabled={saving}>
            {saving ? '변경 중...' : '변경'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open} autoHideDuration={3000}
        onClose={() => setSnackbar(p => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.type} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MyPage
