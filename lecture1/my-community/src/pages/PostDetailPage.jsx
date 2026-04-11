import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Typography, Avatar, IconButton, TextField, Button,
  CircularProgress, Divider, Chip, Paper, AppBar, Toolbar,
  Link as MuiLink
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import { supabase } from '../supabase.js'
import { useAuth } from '../contexts/AuthContext.jsx'

// 특수 메세지 감지 목록
const SPECIAL_MESSAGES = ['좋아', '야호', '최고', '완벽', '대박', '축하']

// 꽃잎/하트 애니메이션 컴포넌트
const CelebrationEffect = ({ active }) => {
  const items = Array.from({ length: 20 })
  const emojis = ['🌸', '💛', '💚', '🌼', '🎉', '✨', '💝']

  if (!active) return null

  return (
    <Box sx={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 9999, overflow: 'hidden',
    }}>
      {items.map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: '-50px',
            left: `${Math.random() * 100}%`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
            animation: `fall ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards`,
            '@keyframes fall': {
              '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
              '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 },
            },
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </Box>
      ))}
    </Box>
  )
}

// 댓글 컴포넌트
const CommentItem = ({ comment, currentUser, onDelete, onLike }) => (
  <Box sx={{ display: 'flex', gap: 1.5, py: 1.5 }}>
    <Avatar sx={{
      width: 32, height: 32, fontSize: '0.8rem',
      background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
      color: '#5C3D00', flexShrink: 0,
    }}>
      {comment.users?.nickname?.[0] || '?'}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#5C3D00' }}>
          {comment.users?.nickname || '알 수 없음'}
        </Typography>
        <Typography variant="caption" sx={{ color: '#ccc' }}>
          {new Date(comment.created_at).toLocaleDateString('ko-KR')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#5C3D00', lineHeight: 1.6 }}>
        {comment.content}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 0.3, cursor: 'pointer' }}
          onClick={() => onLike(comment)}
        >
          {comment.liked ? (
            <FavoriteIcon sx={{ fontSize: 14, color: '#FF6B6B' }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 14, color: '#aaa' }} />
          )}
          <Typography variant="caption" sx={{ color: comment.liked ? '#FF6B6B' : '#aaa' }}>
            {comment.like_count}
          </Typography>
        </Box>
        {currentUser?.id === comment.user_id && (
          <IconButton size="small" onClick={() => onDelete(comment.id)}>
            <DeleteIcon sx={{ fontSize: 14, color: '#ccc' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  </Box>
)

const PostDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [postLiked, setPostLiked] = useState(false)
  const [celebration, setCelebration] = useState(false)
  const celebrationTimer = useRef(null)

  const fetchPost = useCallback(async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, users(nickname)')
      .eq('id', id)
      .single()
    if (data) setPost(data)
  }, [id])

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, users(nickname)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    if (data) setComments(data.map(c => ({ ...c, liked: false })))
  }, [id])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([fetchPost(), fetchComments()])
      setLoading(false)
    }
    init()
  }, [fetchPost, fetchComments])

  const handlePostLike = async () => {
    if (!post) return
    const newLiked = !postLiked
    const newCount = newLiked ? post.like_count + 1 : post.like_count - 1
    setPostLiked(newLiked)
    setPost(prev => ({ ...prev, like_count: newCount }))
    await supabase.from('posts').update({ like_count: newCount }).eq('id', id)
  }

  const handleCommentLike = async (comment) => {
    const newLiked = !comment.liked
    const newCount = newLiked ? comment.like_count + 1 : comment.like_count - 1
    setComments(prev => prev.map(c =>
      c.id === comment.id ? { ...c, liked: newLiked, like_count: newCount } : c
    ))
    await supabase.from('comments').update({ like_count: newCount }).eq('id', comment.id)
  }

  const handleCommentDelete = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId)
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  const triggerCelebration = () => {
    setCelebration(true)
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current)
    celebrationTimer.current = setTimeout(() => setCelebration(false), 3000)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || !currentUser) return

    // 특수 메세지 감지
    const isSpecial = SPECIAL_MESSAGES.some(msg => commentText.includes(msg))
    if (isSpecial) triggerCelebration()

    setSubmitting(true)
    const { data } = await supabase
      .from('comments')
      .insert([{
        content: commentText,
        user_id: currentUser.id,
        post_id: parseInt(id),
      }])
      .select('*, users(nickname)')
      .single()

    setSubmitting(false)
    setCommentText('')

    if (data) {
      setComments(prev => [...prev, { ...data, liked: false }])
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#FFD93D' }} />
      </Box>
    )
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography>게시물을 찾을 수 없어요.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#FFFBF0' }}>
      <CelebrationEffect active={celebration} />

      {/* 상단 앱바 */}
      <AppBar position="sticky" elevation={0} sx={{
        background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
        color: '#5C3D00',
      }}>
        <Toolbar>
          <IconButton onClick={() => navigate(-1)} sx={{ color: '#5C3D00', mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#5C3D00' }}>
            🐾 마이냥멍
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 640, mx: 'auto', p: 2 }}>
        {/* 게시물 카드 */}
        <Paper sx={{ borderRadius: 4, overflow: 'hidden', mb: 2 }}>
          {/* 이미지 */}
          {post.image_url && (
            <Box
              component="img"
              src={post.image_url}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
            />
          )}

          <Box sx={{ p: 3 }}>
            {/* 작성자 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar sx={{
                background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
                color: '#5C3D00', fontWeight: 700,
              }}>
                {post.users?.nickname?.[0] || '?'}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#5C3D00' }}>
                  {post.users?.nickname || '알 수 없음'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#aaa' }}>
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </Typography>
              </Box>
            </Box>

            {/* 제목 */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#5C3D00', mb: 1.5 }}>
              {post.title}
            </Typography>

            {/* 내용 */}
            <Typography variant="body1" sx={{
              color: '#5C3D00', lineHeight: 1.8, mb: 2,
              whiteSpace: 'pre-wrap',
            }}>
              {post.content}
            </Typography>

            {/* 상품 링크 */}
            {post.product_url && (
              <Paper variant="outlined" sx={{
                p: 2, borderRadius: 3, mb: 2,
                borderColor: '#FFD93D',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                {post.product_image_url ? (
                  <Box
                    component="img"
                    src={post.product_image_url}
                    sx={{ width: 56, height: 56, borderRadius: 2, objectFit: 'cover' }}
                  />
                ) : (
                  <ShoppingBagIcon sx={{ fontSize: 32, color: '#FFD93D' }} />
                )}
                <Box>
                  <Typography variant="caption" sx={{ color: '#8B6914', display: 'block' }}>
                    연결된 상품
                  </Typography>
                  <MuiLink
                    href={post.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#5C3D00', fontWeight: 700, fontSize: '0.9rem' }}
                    onClick={e => e.stopPropagation()}
                  >
                    상품 보러가기 →
                  </MuiLink>
                </Box>
              </Paper>
            )}

            {/* 조회수/좋아요 */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VisibilityIcon sx={{ fontSize: 18, color: '#aaa' }} />
                <Typography variant="body2" sx={{ color: '#aaa' }}>{post.view_count}</Typography>
              </Box>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                onClick={handlePostLike}
              >
                {postLiked ? (
                  <FavoriteIcon sx={{ fontSize: 22, color: '#FF6B6B' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 22, color: '#aaa' }} />
                )}
                <Typography variant="body2" sx={{ color: postLiked ? '#FF6B6B' : '#aaa' }}>
                  {post.like_count}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: '#aaa' }} />
                <Typography variant="body2" sx={{ color: '#aaa' }}>{comments.length}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* 댓글 섹션 */}
        <Paper sx={{ borderRadius: 4, p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#5C3D00', mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          {comments.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#aaa', textAlign: 'center', py: 2 }}>
              첫 댓글을 남겨보세요!
            </Typography>
          ) : (
            comments.map((comment, i) => (
              <Box key={comment.id}>
                <CommentItem
                  comment={comment}
                  currentUser={currentUser}
                  onDelete={handleCommentDelete}
                  onLike={handleCommentLike}
                />
                {i < comments.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Paper>

        {/* 댓글 작성 */}
        <Paper sx={{ borderRadius: 4, p: 2, position: 'sticky', bottom: 16 }}>
          <Typography variant="caption" sx={{ color: '#8B6914', mb: 1, display: 'block' }}>
            💡 좋아!, 야호!, 최고! 등을 입력하면 특별한 효과가!
          </Typography>
          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{ display: 'flex', gap: 1 }}
          >
            <Avatar sx={{
              width: 32, height: 32, fontSize: '0.8rem',
              background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
              color: '#5C3D00', flexShrink: 0, mt: 0.5,
            }}>
              {currentUser?.nickname?.[0] || '?'}
            </Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="댓글을 입력하세요... (@닉네임 태그 가능)"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <IconButton
              type="submit"
              disabled={submitting || !commentText.trim()}
              sx={{
                background: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
                color: '#5C3D00',
                '&:hover': { background: 'linear-gradient(135deg, #ffc800, #5ab868)' },
                '&:disabled': { background: '#eee', color: '#ccc' },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default PostDetailPage
