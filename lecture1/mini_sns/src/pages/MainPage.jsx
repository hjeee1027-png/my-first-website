import React, { useEffect, useState } from 'react'
import {
  Box, Typography, Card, CardMedia, CardContent, Chip,
  Avatar, Skeleton, IconButton,
} from '@mui/material'
import {
  Visibility, FiberManualRecord, NavigateNext, NavigateBefore,
  EmojiEvents, Groups,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const BANNERS = [
  {
    id: 1,
    title: '디지몬 서바이브 출시!',
    subtitle: '지금 바로 플레이하고 리뷰를 남겨보세요',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=300&auto=format&fit=crop',
    color: 'linear-gradient(90deg, rgba(66,122,181,0.8), transparent)',
  },
  {
    id: 2,
    title: '닌텐도 스위치 신작 공개',
    subtitle: '친구들과 함께 즐기는 멀티플레이',
    img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=300&auto=format&fit=crop',
    color: 'linear-gradient(90deg, rgba(255,100,50,0.8), transparent)',
  },
  {
    id: 3,
    title: 'PS5 독점 타이틀 할인!',
    subtitle: '이번 주말만 최대 40% 할인',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=300&auto=format&fit=crop',
    color: 'linear-gradient(90deg, rgba(0,60,120,0.8), transparent)',
  },
]

const MainPage = () => {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [topPosts, setTopPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { profile } = useAuth()

  useEffect(() => {
    fetchTopPosts()
    const timer = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 3500)
    return () => clearInterval(timer)
  }, [])

  const fetchTopPosts = async () => {
    const { data: postsData, error } = await supabase
      .from('sns_posts')
      .select('*')
      .order('views_count', { ascending: false })
      .limit(5)

    if (error || !postsData) { setLoading(false); return }

    const userIds = [...new Set(postsData.map(p => p.user_id).filter(Boolean))]
    let usersMap = {}
    if (userIds.length > 0) {
      const { data: usersData } = await supabase
        .from('sns_users').select('id, display_name, avatar_url, username').in('id', userIds)
      usersData?.forEach(u => { usersMap[u.id] = u })
    }
    setTopPosts(postsData.map(p => ({ ...p, sns_users: usersMap[p.user_id] || null })))
    setLoading(false)
  }

  const parseImages = (imageUrl) => {
    if (!imageUrl) return []
    try { return JSON.parse(imageUrl) }
    catch { return [imageUrl] }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}.${d.getDate()}`
  }

  return (
    <Box>
      {/* 배너 */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        {BANNERS.map((banner, i) => (
          <Box
            key={banner.id}
            sx={{
              position: 'absolute', inset: 0,
              transition: 'opacity 0.6s ease',
              opacity: i === bannerIdx ? 1 : 0,
              cursor: 'pointer',
            }}
          >
            <CardMedia
              component="img"
              image={banner.img}
              alt={banner.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1538481199521-2f05e9ca95d9?w=800&h=300&auto=format&fit=crop' }}
            />
            <Box sx={{
              position: 'absolute', inset: 0,
              background: banner.color,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 2,
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 800, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {banner.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                {banner.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}

        <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5 }}>
          {BANNERS.map((_, i) => (
            <FiberManualRecord
              key={i} onClick={() => setBannerIdx(i)}
              sx={{ fontSize: 10, color: i === bannerIdx ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length)}
          sx={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)' }}
          size="small"
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={() => setBannerIdx(i => (i + 1) % BANNERS.length)}
          sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,0.3)' }}
          size="small"
        >
          <NavigateNext />
        </IconButton>
      </Box>

      {/* 인기 게시물 */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <EmojiEvents sx={{ color: '#F5A623', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a3a5c' }}>
            인기 게시물
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography
            variant="body2" sx={{ color: '#427AB5', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/posts')}
          >
            전체보기
          </Typography>
        </Box>

        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
              <Skeleton variant="rectangular" width={72} height={72} sx={{ borderRadius: 2, flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="80%" height={20} />
                <Skeleton width="50%" height={16} />
              </Box>
            </Box>
          ))
        ) : topPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            <Typography>아직 게시물이 없어요. 첫 번째 리뷰를 작성해보세요!</Typography>
          </Box>
        ) : (
          topPosts.map((post, idx) => {
            const images = parseImages(post.image_url)
            return (
              <Card
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                sx={{
                  display: 'flex', mb: 1.5, cursor: 'pointer', borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  '&:hover': { boxShadow: '0 4px 16px rgba(66,122,181,0.2)' },
                }}
              >
                <Box sx={{ position: 'relative', width: 80, flexShrink: 0 }}>
                  <CardMedia
                    component="img"
                    image={images[0] || `https://images.unsplash.com/photo-1538481199521-2f05e9ca95d9?w=160&h=160&auto=format&fit=crop`}
                    alt={post.title}
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160&h=160&auto=format&fit=crop' }}
                  />
                  <Chip
                    label={idx + 1}
                    size="small"
                    sx={{
                      position: 'absolute', top: 4, left: 4,
                      bgcolor: idx === 0 ? '#F5A623' : idx === 1 ? '#aaa' : idx === 2 ? '#cd7f32' : '#427AB5',
                      color: 'white', fontWeight: 800, fontSize: 11, height: 20, minWidth: 20,
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: 1, p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.3 }} noWrap>
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} noWrap>
                    {post.caption}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Avatar sx={{ width: 16, height: 16, fontSize: 10, bgcolor: '#427AB5' }}>
                      {post.sns_users?.display_name?.[0] || '?'}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {post.sns_users?.display_name || '알 수 없음'}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Visibility sx={{ fontSize: 12, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">{post.views_count}</Typography>
                  </Box>
                </CardContent>
              </Card>
            )
          })
        )}
      </Box>

      {/* 게임 파티원 */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Groups sx={{ color: '#427AB5', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a3a5c' }}>
            게임 파티원 모집
          </Typography>
        </Box>

        {[
          { game: '디지몬 서바이브', current: 2, max: 4, host: '보갱갱', style: '#427AB5' },
          { game: '몬스터헌터 월드', current: 1, max: 4, host: '헌터킹', style: '#5B93D3' },
          { game: '스플래툰3', current: 3, max: 4, host: '오징어', style: '#9C27B0' },
        ].map((party, i) => (
          <Card key={i} sx={{ mb: 1.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{party.game}</Typography>
                <Typography variant="caption" color="text.secondary">호스트: {party.host}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: party.style }}>
                  {party.current}/{party.max}
                </Typography>
                <Typography variant="caption" color="text.secondary">참가중</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
              {Array(party.max).fill(0).map((_, j) => (
                <Box key={j} sx={{
                  width: 28, height: 6, borderRadius: 3,
                  bgcolor: j < party.current ? party.style : '#e0e0e0',
                }} />
              ))}
            </Box>
          </Card>
        ))}

        <Typography variant="caption" sx={{ color: '#427AB5', display: 'block', textAlign: 'center', mt: 1 }}>
          파티원 매칭 기능 준비 중입니다 🎮
        </Typography>
      </Box>
    </Box>
  )
}

export default MainPage
