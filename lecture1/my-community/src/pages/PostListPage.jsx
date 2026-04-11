import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Avatar, IconButton, Fab,
  CircularProgress, Chip, AppBar, Toolbar, Button, Skeleton
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { supabase } from '../supabase.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import PostCreateModal from '../components/PostCreateModal.jsx'

const PostCard = ({ post, onLike, onClick }) => {
  const hasProduct = !!post.product_url

  return (
    <Box
      onClick={() => onClick(post.id)}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(255,217,61,0.15)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(255,217,61,0.3)',
        },
      }}
    >
      {/* 게시물 이미지 영역 */}
      <Box sx={{
        aspectRatio: '1',
        background: post.image_url
          ? `url(${post.image_url}) center/cover`
          : `linear-gradient(135deg, #FFD93D22, #6BCB7722)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {!post.image_url && (
          <Typography sx={{ fontSize: '3rem' }}>🐾</Typography>
        )}

        {/* 상품 연결 아이콘 (쇼츠 스타일) */}
        {hasProduct && (
          <Box sx={{
            position: 'absolute', bottom: 8, right: 8,
            background: '#fff',
            borderRadius: 2, p: 0.5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', gap: 0.5,
          }}>
            {post.product_image_url ? (
              <Box
                component="img"
                src={post.product_image_url}
                sx={{ width: 36, height: 36, borderRadius: 1, objectFit: 'cover' }}
              />
            ) : (
              <ShoppingBagIcon sx={{ fontSize: 20, color: '#FFD93D' }} />
            )}
          </Box>
        )}
      </Box>

      {/* 게시물 정보 */}
      <Box sx={{ p: 1.5 }}>
        {/* 작성자 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Avatar sx={{
            width: 24, height: 24, fontSize: '0.75rem',
            background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
            color: '#5C3D00',
          }}>
            {post.users?.nickname?.[0] || '?'}
          </Avatar>
          <Typography variant="caption" sx={{ color: '#8B6914', fontWeight: 600 }}>
            {post.users?.nickname || '알 수 없음'}
          </Typography>
        </Box>

        {/* 제목 */}
        <Typography variant="body2" sx={{
          fontWeight: 700, color: '#5C3D00',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          lineHeight: 1.4, mb: 1,
        }}>
          {post.title}
        </Typography>

        {/* 조회수, 좋아요 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <VisibilityIcon sx={{ fontSize: 14, color: '#aaa' }} />
            <Typography variant="caption" sx={{ color: '#aaa' }}>{post.view_count}</Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.3, cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); onLike(post) }}
          >
            {post.liked ? (
              <FavoriteIcon sx={{ fontSize: 14, color: '#FF6B6B' }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 14, color: '#aaa' }} />
            )}
            <Typography variant="caption" sx={{ color: post.liked ? '#FF6B6B' : '#aaa' }}>
              {post.like_count}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const PostListPage = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openCreate, setOpenCreate] = useState(false)
  const PAGE_SIZE = 12

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('posts')
      .select('*, users(nickname)')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE)

    if (data) {
      setPosts(data.map(p => ({ ...p, liked: false })))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleLike = async (post) => {
    const newLiked = !post.liked
    const newCount = newLiked ? post.like_count + 1 : post.like_count - 1

    setPosts(prev => prev.map(p =>
      p.id === post.id ? { ...p, liked: newLiked, like_count: newCount } : p
    ))

    await supabase
      .from('posts')
      .update({ like_count: newCount })
      .eq('id', post.id)
  }

  const handlePostClick = async (postId) => {
    // 조회수 증가
    const post = posts.find(p => p.id === postId)
    if (post) {
      await supabase
        .from('posts')
        .update({ view_count: post.view_count + 1 })
        .eq('id', postId)
    }
    navigate(`/post/${postId}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#FFFBF0' }}>
      {/* 상단 앱바 */}
      <AppBar position="sticky" elevation={0} sx={{
        background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
        color: '#5C3D00',
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1, color: '#5C3D00' }}>
            🐾 마이냥멍
          </Typography>
          <Chip
            label={`${currentUser?.nickname || '?'}`}
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.7)',
              color: '#5C3D00',
              fontWeight: 600,
              mr: 1,
            }}
          />
          <IconButton onClick={handleLogout} size="small" sx={{ color: '#5C3D00' }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 게시물 그리드 */}
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
        {loading ? (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2,
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={280} sx={{ borderRadius: 3 }} />
            ))}
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '4rem' }}>🐾</Typography>
            <Typography variant="h6" sx={{ color: '#8B6914', mt: 2 }}>
              아직 게시물이 없어요
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mt: 1 }}>
              첫 번째 게시물을 작성해보세요!
            </Typography>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2,
          }}>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onClick={handlePostClick}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* 게시물 작성 FAB */}
      <Fab
        onClick={() => setOpenCreate(true)}
        sx={{
          position: 'fixed', bottom: 24, right: 24,
          background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
          color: '#5C3D00',
          '&:hover': { background: 'linear-gradient(135deg, #ffc800, #5ab868)' },
        }}
      >
        <AddIcon />
      </Fab>

      {/* 게시물 작성 모달 */}
      <PostCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={fetchPosts}
        currentUser={currentUser}
      />
    </Box>
  )
}

export default PostListPage
