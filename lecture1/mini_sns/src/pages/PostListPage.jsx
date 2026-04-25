import React, { useEffect, useState } from 'react'
import {
  Box, Typography, Card, CardMedia, CardContent, CardActionArea,
  Avatar, Skeleton, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon,
  Chip,
} from '@mui/material'
import { Visibility, Edit, HelpOutline, Favorite } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const PostListPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('sns_posts')
      .select('*, sns_users(display_name, avatar_url, username)')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const parseImages = (imageUrl) => {
    if (!imageUrl) return []
    try { return JSON.parse(imageUrl) }
    catch { return [imageUrl] }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1538481199521-2f05e9ca95d9?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552820728-717b2cbe42d9?w=400&h=300&auto=format&fit=crop',
  ]

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a3a5c', mb: 2 }}>
        게임 리뷰 게시판
      </Typography>

      {loading ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          {Array(6).fill(0).map((_, i) => (
            <Box key={i}>
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
              <Skeleton width="80%" height={18} sx={{ mt: 1 }} />
              <Skeleton width="50%" height={14} />
            </Box>
          ))}
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Typography variant="h6">아직 게시물이 없어요</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>첫 번째 게임 리뷰를 작성해보세요!</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          {posts.map((post, idx) => {
            const images = parseImages(post.image_url)
            const thumb = images[0] || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length]
            return (
              <Card
                key={post.id}
                sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={thumb}
                      alt={post.title}
                      sx={{ height: 130, objectFit: 'cover' }}
                    />
                    {images.length > 1 && (
                      <Chip
                        label={`+${images.length}`}
                        size="small"
                        sx={{
                          position: 'absolute', top: 6, right: 6,
                          bgcolor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, height: 18,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5 }} noWrap>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mb: 0.5 }}>
                      {post.caption}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Avatar sx={{ width: 14, height: 14, fontSize: 9, bgcolor: '#427AB5' }}>
                        {post.sns_users?.display_name?.[0] || '?'}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ flex: 1 }}>
                        {post.sns_users?.display_name || '?'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Visibility sx={{ fontSize: 11, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">{post.views_count}</Typography>
                      <Favorite sx={{ fontSize: 11, color: '#e57373' }} />
                      <Typography variant="caption" color="text.secondary">{post.likes_count}</Typography>
                      <Box sx={{ flex: 1 }} />
                      <Typography variant="caption" color="text.secondary">{formatDate(post.created_at)}</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      )}

      {/* 작성 버튼 */}
      <SpeedDial
        ariaLabel="게시물 작성"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        FabProps={{ sx: { bgcolor: '#427AB5', '&:hover': { bgcolor: '#2d5f9a' } } }}
      >
        <SpeedDialAction
          icon={<Edit />}
          tooltipTitle="게시물 작성"
          tooltipOpen
          onClick={() => navigate('/posts/write')}
          FabProps={{ sx: { bgcolor: '#427AB5', color: 'white', '&:hover': { bgcolor: '#2d5f9a' } } }}
        />
        <SpeedDialAction
          icon={<HelpOutline />}
          tooltipTitle="작성 방법"
          tooltipOpen
          onClick={() => alert('제목과 내용을 입력하고\n마음에 드는 이미지를 선택해서\n게임 리뷰를 작성해보세요! 🎮')}
          FabProps={{ sx: { bgcolor: '#FFEF91', color: '#427AB5', '&:hover': { bgcolor: '#ffe066' } } }}
        />
      </SpeedDial>
    </Box>
  )
}

export default PostListPage
