import React, { useEffect, useState, useRef } from 'react'
import {
  Box, Typography, Avatar, IconButton, Divider, TextField, Button,
  Skeleton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import {
  Favorite, FavoriteBorder, Visibility, Share, ArrowBack,
  NavigateBefore, NavigateNext, Send, Delete, Edit,
  Image as ImageIcon,
} from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const PostDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [images, setImages] = useState([])
  const [imgIdx, setImgIdx] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editComment, setEditComment] = useState(null)
  const [editText, setEditText] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    const { data: postData, error } = await supabase
      .from('sns_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !postData) { navigate('/posts'); return }
    setPost(postData)

    if (postData.user_id) {
      const { data: authorData } = await supabase
        .from('sns_users').select('id, display_name, avatar_url, username')
        .eq('id', postData.user_id).single()
      setAuthor(authorData || null)
    }

    const parsed = (() => {
      if (!postData.image_url) return []
      try { return JSON.parse(postData.image_url) }
      catch { return [postData.image_url] }
    })()
    setImages(parsed)

    await supabase.from('sns_posts').update({ views_count: (postData.views_count || 0) + 1 }).eq('id', id)

    if (user) {
      const { data: likeData } = await supabase.from('sns_likes')
        .select('id').eq('post_id', id).eq('user_id', user.id).single()
      setLiked(!!likeData)
    }
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data: commentsData } = await supabase
      .from('sns_comments').select('*').eq('post_id', id).order('created_at', { ascending: true })

    if (!commentsData) { setComments([]); return }

    const userIds = [...new Set(commentsData.map(c => c.user_id).filter(Boolean))]
    let usersMap = {}
    if (userIds.length > 0) {
      const { data: usersData } = await supabase
        .from('sns_users').select('id, display_name, avatar_url, username').in('id', userIds)
      usersData?.forEach(u => { usersMap[u.id] = u })
    }
    setComments(commentsData.map(c => ({ ...c, sns_users: usersMap[c.user_id] || null })))
  }

  const handleLike = async () => {
    if (!user || !post) return
    if (liked) {
      await supabase.from('sns_likes').delete().eq('post_id', id).eq('user_id', user.id)
      await supabase.from('sns_posts').update({ likes_count: Math.max(0, post.likes_count - 1) }).eq('id', id)
      setPost(p => ({ ...p, likes_count: Math.max(0, p.likes_count - 1) }))
      setLiked(false)
    } else {
      await supabase.from('sns_likes').insert({ post_id: Number(id), user_id: user.id })
      await supabase.from('sns_posts').update({ likes_count: (post.likes_count || 0) + 1 }).eq('id', id)
      setPost(p => ({ ...p, likes_count: (p.likes_count || 0) + 1 }))
      setLiked(true)
    }
  }

  const handleComment = async () => {
    if (!commentText.trim() || !user || submitting) return
    setSubmitting(true)
    await supabase.from('sns_comments').insert({
      post_id: Number(id),
      user_id: user.id,
      content: commentText.trim(),
      parent_id: replyTo || null,
    })
    setCommentText('')
    setReplyTo(null)
    await fetchComments()
    setSubmitting(false)
  }

  const handleEditComment = async () => {
    if (!editText.trim() || !editComment) return
    await supabase.from('sns_comments').update({ content: editText.trim() }).eq('id', editComment.id)
    setEditComment(null)
    setEditText('')
    await fetchComments()
  }

  const handleDeleteComment = async () => {
    if (!deleteConfirm) return
    await supabase.from('sns_comments').delete().eq('id', deleteConfirm)
    setDeleteConfirm(null)
    await fetchComments()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, text: post?.caption, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다!')
    }
  }

  const formatTime = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const topComments = comments.filter(c => !c.parent_id)
  const getReplies = (commentId) => comments.filter(c => c.parent_id === commentId)

  if (loading) return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2, mb: 2 }} />
      <Skeleton width="70%" height={28} sx={{ mb: 1 }} />
      <Skeleton width="40%" height={20} />
    </Box>
  )

  if (!post) return null

  return (
    <Box sx={{ pb: 4 }}>
      {/* 뒤로가기 */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <IconButton onClick={() => navigate('/posts')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }} noWrap>
          {post.title}
        </Typography>
        <IconButton onClick={handleShare}><Share fontSize="small" /></IconButton>
      </Box>

      {/* 이미지 슬라이드 */}
      {images.length > 0 && (
        <Box sx={{ position: 'relative', bgcolor: '#000', overflow: 'hidden' }}>
          <Box
            component="img"
            src={images[imgIdx]}
            alt=""
            sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', display: 'block' }}
          />
          {images.length > 1 && (
            <>
              <IconButton
                onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                sx={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}
                size="small"
              >
                <NavigateBefore />
              </IconButton>
              <IconButton
                onClick={() => setImgIdx(i => (i + 1) % images.length)}
                sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}
                size="small"
              >
                <NavigateNext />
              </IconButton>
              <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)' }}>
                <Chip label={`${imgIdx + 1} / ${images.length}`} size="small"
                  sx={{ bgcolor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11 }} />
              </Box>
            </>
          )}
        </Box>
      )}

      {/* 작성자 정보 */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Avatar src={author?.avatar_url || ''} sx={{ bgcolor: '#427AB5', width: 40, height: 40 }}>
            {author?.display_name?.[0] || '?'}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{author?.display_name || '알 수 없음'}</Typography>
            <Typography variant="caption" color="text.secondary">@{author?.username || ''} · {formatTime(post.created_at)}</Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{post.title}</Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#333', mb: 2 }}>{post.caption}</Typography>

        {/* 좋아요/조회수 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton onClick={handleLike} size="small" sx={{ color: liked ? '#e53935' : 'text.secondary' }}>
              {liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">{post.likes_count}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Visibility sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{post.views_count + 1}</Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Typography variant="caption" color="text.secondary">댓글 {comments.length}</Typography>
        </Box>

        {/* 댓글 목록 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>댓글 {comments.length}개</Typography>

          {topComments.map(comment => (
            <Box key={comment.id}>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#427AB5', fontSize: 12, flexShrink: 0 }}>
                  {comment.sns_users?.display_name?.[0] || '?'}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ bgcolor: '#f5f5f5', borderRadius: '0 12px 12px 12px', p: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#427AB5' }}>
                      {comment.sns_users?.display_name || '?'}
                    </Typography>
                    {comment.image_url && (
                      <Box component="img" src={comment.image_url} alt="" sx={{ width: '100%', borderRadius: 1, mt: 0.5, maxHeight: 150, objectFit: 'cover' }} />
                    )}
                    <Typography variant="body2" sx={{ mt: 0.5 }}>{comment.content}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5, px: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">{formatTime(comment.created_at)}</Typography>
                    <Typography
                      variant="caption" sx={{ color: '#427AB5', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setReplyTo(comment.id)}
                    >
                      답글
                    </Typography>
                    {comment.user_id === user?.id && (
                      <>
                        <Typography
                          variant="caption" sx={{ cursor: 'pointer', color: 'text.secondary' }}
                          onClick={() => { setEditComment(comment); setEditText(comment.content) }}
                        >
                          수정
                        </Typography>
                        <Typography
                          variant="caption" sx={{ cursor: 'pointer', color: 'error.main' }}
                          onClick={() => setDeleteConfirm(comment.id)}
                        >
                          삭제
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* 답글 */}
              {getReplies(comment.id).map(reply => (
                <Box key={reply.id} sx={{ display: 'flex', gap: 1.5, mb: 1.5, ml: 5 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: '#5B93D3', fontSize: 10, flexShrink: 0 }}>
                    {reply.sns_users?.display_name?.[0] || '?'}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ bgcolor: '#EEF4FB', borderRadius: '0 12px 12px 12px', p: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#5B93D3' }}>
                        {reply.sns_users?.display_name || '?'}
                      </Typography>
                      {reply.image_url && (
                        <Box component="img" src={reply.image_url} alt="" sx={{ width: '100%', borderRadius: 1, mt: 0.5, maxHeight: 120, objectFit: 'cover' }} />
                      )}
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{reply.content}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, px: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">{formatTime(reply.created_at)}</Typography>
                      {reply.user_id === user?.id && (
                        <>
                          <Typography variant="caption" sx={{ cursor: 'pointer', color: 'text.secondary' }}
                            onClick={() => { setEditComment(reply); setEditText(reply.content) }}>
                            수정
                          </Typography>
                          <Typography variant="caption" sx={{ cursor: 'pointer', color: 'error.main' }}
                            onClick={() => setDeleteConfirm(reply.id)}>
                            삭제
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* 댓글 입력 */}
      <Box sx={{
        position: 'sticky', bottom: 0, bgcolor: 'white',
        borderTop: '1px solid #eee', p: 1.5, mt: 2,
      }}>
        {replyTo && (
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#EEF4FB', borderRadius: 2, px: 1.5, py: 0.5, mb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
              ↩ 답글 작성 중
            </Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer', color: 'error.main' }}
              onClick={() => setReplyTo(null)}>
              취소
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <Avatar src={profile?.avatar_url || ''} sx={{ width: 32, height: 32, bgcolor: '#427AB5', fontSize: 12, flexShrink: 0 }}>
            {profile?.display_name?.[0] || '?'}
          </Avatar>
          <TextField
            fullWidth multiline maxRows={3} size="small"
            placeholder={replyTo ? '답글을 입력하세요...' : '댓글을 입력하세요...'}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleComment() } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <IconButton
            onClick={handleComment} disabled={!commentText.trim() || submitting}
            sx={{ bgcolor: '#427AB5', color: 'white', '&:hover': { bgcolor: '#2d5f9a' }, '&:disabled': { bgcolor: '#ccc' } }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* 댓글 수정 다이얼로그 */}
      <Dialog open={!!editComment} onClose={() => setEditComment(null)} fullWidth maxWidth="sm">
        <DialogTitle>댓글 수정</DialogTitle>
        <DialogContent>
          <TextField fullWidth multiline rows={3} value={editText}
            onChange={e => setEditText(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditComment(null)}>취소</Button>
          <Button onClick={handleEditComment} variant="contained">수정</Button>
        </DialogActions>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>
          <Typography>정말 이 댓글을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>취소</Button>
          <Button onClick={handleDeleteComment} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PostDetailPage
