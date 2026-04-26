import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Grid, Avatar, Button, TextField,
  Divider, Chip, Alert, CircularProgress, Tab, Tabs, Paper
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../hooks/useAuth'
import { signOut, getProfile, getUserReservations } from '../utils/supabase'

const STATUS_COLORS = {
  '상담신청': { bg: 'rgba(0,150,255,0.1)', color: '#4fc3f7', border: 'rgba(0,150,255,0.3)' },
  '계약완료': { bg: 'rgba(0,200,100,0.1)', color: '#66bb6a', border: 'rgba(0,200,100,0.3)' },
  '인도대기': { bg: 'rgba(255,180,0,0.1)', color: '#ffd54f', border: 'rgba(255,180,0,0.3)' },
  '완료': { bg: 'rgba(166,137,102,0.1)', color: '#A68966', border: 'rgba(166,137,102,0.3)' },
}

const CONTRACT_STEPS = ['상담 신청', '계약 완료', '인도 대기', '인도 완료']

export default function MyPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [profile, setProfile] = useState(null)
  const [reservations, setReservations] = useState([])
  const [fetching, setFetching] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!user) return
    setFetching(true)
    Promise.all([
      getProfile(user.id).catch(() => null),
      getUserReservations(user.id).catch(() => []),
    ]).then(([prof, res]) => {
      setProfile(prof)
      setReservations(res || [])
      setEditForm({
        display_name: prof?.display_name || user.user_metadata?.display_name || '',
        phone: prof?.phone || user.user_metadata?.phone || '',
        address: prof?.address || '',
        address_detail: prof?.address_detail || '',
        zip_code: prof?.zip_code || '',
      })
    }).finally(() => setFetching(false))
  }, [user])

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 20 }}><CircularProgress sx={{ color: '#A68966' }} /></Box>
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0B0B0B', pt: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <PersonIcon sx={{ fontSize: '4rem', color: '#4A4A4A', mb: 2 }} />
          <Typography sx={{ color: '#fff', fontSize: '1.2rem', mb: 3 }}>로그인이 필요합니다</Typography>
          <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#A68966', color: '#0B0B0B', border: 'none', '&:hover': { bgcolor: '#c4a882' } }}>
            로그인하기
          </Button>
        </Box>
      </Box>
    )
  }

  const displayName = profile?.display_name || user.user_metadata?.display_name || user.email?.split('@')[0] || '회원'
  const completedRes = reservations.filter(r => r.status === '완료')
  const activeRes = reservations.filter(r => r.status !== '완료')

  const getContractStep = (status) => {
    return CONTRACT_STEPS.indexOf(
      status === '상담신청' ? '상담 신청' :
      status === '계약완료' ? '계약 완료' :
      status === '인도대기' ? '인도 대기' : '인도 완료'
    )
  }

  return (
    <Box sx={{ bgcolor: '#0B0B0B', minHeight: '100vh', pt: '72px' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: 6 }}>
        {/* 프로필 헤더 */}
        <Box
          sx={{
            bgcolor: '#0c121c',
            border: '1px solid rgba(166,137,102,0.15)',
            p: { xs: 3, md: 4 },
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            gap: 3,
          }}
        >
          <Avatar
            sx={{
              width: 72, height: 72,
              bgcolor: 'rgba(166,137,102,0.2)',
              border: '2px solid rgba(166,137,102,0.3)',
              fontSize: '1.8rem',
              color: '#A68966',
            }}
          >
            {displayName[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', mb: 0.5 }}>
              반갑습니다, {displayName}님!
            </Typography>
            <Typography sx={{ color: '#4A4A4A', fontSize: '0.875rem' }}>
              {user.email}
            </Typography>
            {activeRes.length > 0 && (
              <Typography sx={{ color: '#A68966', fontSize: '0.875rem', mt: 1 }}>
                📅 진행 중인 시승 예약 {activeRes.length}건이 있습니다.
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon fontSize="small" />}
              onClick={async () => { await signOut(); navigate('/') }}
              sx={{ borderColor: '#4A4A4A', color: '#4A4A4A', fontSize: '0.8rem', '&:hover': { borderColor: '#ff6b6b', color: '#ff6b6b' } }}
            >
              로그아웃
            </Button>
          </Box>
        </Box>

        {/* 탭 */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 4, borderBottom: '1px solid rgba(74,74,74,0.3)', '.MuiTabs-indicator': { bgcolor: '#A68966' } }}
        >
          {[
            { label: '예약 현황', icon: <CalendarTodayIcon fontSize="small" /> },
            { label: '관심 차량', icon: <FavoriteIcon fontSize="small" /> },
            { label: '내 정보', icon: <PersonIcon fontSize="small" /> },
            { label: '결제 정보', icon: <CreditCardIcon fontSize="small" /> },
          ].map((t, i) => (
            <Tab
              key={i}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  {t.icon}
                  <span>{t.label}</span>
                </Box>
              }
              sx={{ color: '#4A4A4A', '&.Mui-selected': { color: '#A68966' }, fontSize: '0.875rem' }}
            />
          ))}
        </Tabs>

        {/* 탭 0: 예약 현황 */}
        {tab === 0 && (
          <Box>
            {fetching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress sx={{ color: '#A68966' }} /></Box>
            ) : reservations.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <CalendarTodayIcon sx={{ fontSize: '3rem', color: '#4A4A4A', mb: 2 }} />
                <Typography sx={{ color: '#969696', mb: 3 }}>예약 내역이 없습니다</Typography>
                <Button variant="contained" onClick={() => navigate('/reservation')} sx={{ bgcolor: '#A68966', color: '#0B0B0B', border: 'none', '&:hover': { bgcolor: '#c4a882' } }}>
                  시승 예약하기
                </Button>
              </Box>
            ) : (
              <Box>
                {/* 진행 중 */}
                {activeRes.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography sx={{ color: '#A68966', fontSize: '0.85rem', letterSpacing: '0.1em', mb: 2 }}>진행 중</Typography>
                    {activeRes.map(res => {
                      const stepIdx = getContractStep(res.status)
                      const statusStyle = STATUS_COLORS[res.status] || STATUS_COLORS['상담신청']
                      return (
                        <Paper key={res.id} sx={{ bgcolor: '#0c121c', border: '1px solid rgba(74,74,74,0.3)', borderRadius: 0, p: 3, mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', mb: 0.5 }}>
                                {res.cars_data?.model_name || res.car_id}
                              </Typography>
                              <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
                                {res.branch_name} · {res.res_date?.split('T')[0]}
                              </Typography>
                            </Box>
                            <Chip
                              label={res.status}
                              size="small"
                              sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, borderRadius: 0, fontSize: '0.75rem' }}
                            />
                          </Box>

                          {/* 타임라인 */}
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            {CONTRACT_STEPS.map((s, i) => (
                              <Box key={s} sx={{ display: 'flex', alignItems: 'center', flex: i < CONTRACT_STEPS.length - 1 ? 1 : 'none' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Box sx={{
                                    width: 24, height: 24, borderRadius: '50%',
                                    bgcolor: i <= stepIdx ? '#A68966' : '#333',
                                    border: `2px solid ${i <= stepIdx ? '#A68966' : '#4A4A4A'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  }}>
                                    {i < stepIdx && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0B0B0B' }} />}
                                    {i === stepIdx && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0B0B0B' }} />}
                                  </Box>
                                  <Typography sx={{ color: i <= stepIdx ? '#A68966' : '#4A4A4A', fontSize: '0.65rem', mt: 0.5, whiteSpace: 'nowrap' }}>
                                    {s}
                                  </Typography>
                                </Box>
                                {i < CONTRACT_STEPS.length - 1 && (
                                  <Box sx={{ flex: 1, height: 1, bgcolor: i < stepIdx ? '#A68966' : '#333', mx: 0.5 }} />
                                )}
                              </Box>
                            ))}
                          </Box>
                        </Paper>
                      )
                    })}
                  </Box>
                )}

                {/* 완료된 예약 */}
                {completedRes.length > 0 && (
                  <Box>
                    <Typography sx={{ color: '#4A4A4A', fontSize: '0.85rem', letterSpacing: '0.1em', mb: 2 }}>완료된 예약</Typography>
                    {completedRes.map(res => (
                      <Paper key={res.id} sx={{ bgcolor: '#0c121c', border: '1px solid rgba(74,74,74,0.2)', borderRadius: 0, p: 2.5, mb: 1.5, opacity: 0.7 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography sx={{ color: '#969696', fontSize: '0.9rem', mb: 0.3 }}>
                              {res.cars_data?.model_name || res.car_id}
                            </Typography>
                            <Typography sx={{ color: '#4A4A4A', fontSize: '0.8rem' }}>
                              {res.branch_name} · {res.res_date?.split('T')[0]}
                            </Typography>
                          </Box>
                          <Chip label="완료" size="small" sx={{ bgcolor: 'rgba(166,137,102,0.1)', color: '#A68966', borderRadius: 0, fontSize: '0.7rem' }} />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* 탭 1: 관심 차량 */}
        {tab === 1 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <FavoriteIcon sx={{ fontSize: '3rem', color: '#4A4A4A', mb: 2 }} />
            <Typography sx={{ color: '#969696', mb: 3 }}>관심 차량이 없습니다</Typography>
            <Button variant="outlined" onClick={() => navigate('/search')} sx={{ borderColor: '#A68966', color: '#A68966' }}>
              차량 둘러보기
            </Button>
          </Box>
        )}

        {/* 탭 2: 내 정보 */}
        {tab === 2 && (
          <Box sx={{ maxWidth: 600 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 500 }}>개인정보 관리</Typography>
              <Button
                size="small"
                startIcon={<EditIcon fontSize="small" />}
                onClick={() => setEditing(!editing)}
                sx={{ color: editing ? '#A68966' : '#4A4A4A', fontSize: '0.8rem', '&:hover': { color: '#A68966' } }}
              >
                {editing ? '수정 중' : '수정'}
              </Button>
            </Box>

            <Box sx={{ bgcolor: '#0c121c', border: '1px solid rgba(74,74,74,0.3)', p: 3 }}>
              {saveMsg && <Alert severity="success" sx={{ mb: 2, bgcolor: 'rgba(0,200,100,0.1)', color: '#66bb6a', border: '1px solid rgba(0,200,100,0.3)', borderRadius: 0 }}>{saveMsg}</Alert>}

              <Grid container spacing={2.5}>
                {[
                  { label: '이름', key: 'display_name', readOnly: !editing },
                  { label: '이메일', value: user.email, readOnly: true },
                  { label: '휴대폰', key: 'phone', readOnly: !editing },
                  { label: '우편번호', key: 'zip_code', readOnly: !editing, half: true },
                  { label: '주소', key: 'address', readOnly: !editing },
                  { label: '상세주소', key: 'address_detail', readOnly: !editing },
                ].map((field, i) => (
                  <Grid item xs={12} sm={field.half ? 6 : 12} key={i}>
                    <TextField
                      fullWidth
                      size="small"
                      label={field.label}
                      value={field.value || editForm[field.key] || ''}
                      onChange={field.readOnly ? undefined : (e) => setEditForm(f => ({ ...f, [field.key]: e.target.value }))}
                      InputProps={{ readOnly: field.readOnly }}
                      sx={{
                        '& .MuiInputBase-input': { color: field.readOnly ? '#4A4A4A' : '#fff' },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {editing && (
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setSaveMsg('정보가 저장되었습니다.')
                      setEditing(false)
                      setTimeout(() => setSaveMsg(''), 3000)
                    }}
                    sx={{ bgcolor: '#A68966', color: '#0B0B0B', border: 'none', py: 1.5, '&:hover': { bgcolor: '#c4a882' } }}
                  >
                    저장
                  </Button>
                  <Button fullWidth variant="outlined" onClick={() => setEditing(false)} sx={{ borderColor: '#4A4A4A', color: '#fff', py: 1.5 }}>
                    취소
                  </Button>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(74,74,74,0.2)' }} />

            <Button
              variant="outlined"
              sx={{ borderColor: 'rgba(200,50,50,0.3)', color: '#ff6b6b', fontSize: '0.8rem', '&:hover': { borderColor: '#ff6b6b', bgcolor: 'rgba(200,50,50,0.05)' } }}
            >
              회원 탈퇴
            </Button>
          </Box>
        )}

        {/* 탭 3: 결제 정보 */}
        {tab === 3 && (
          <Box sx={{ maxWidth: 500 }}>
            <Typography sx={{ color: '#4A4A4A', fontSize: '0.875rem', mb: 3 }}>
              등록된 결제 수단이 없습니다.
            </Typography>
            <Button
              variant="outlined"
              sx={{ borderColor: '#A68966', color: '#A68966', '&:hover': { bgcolor: 'rgba(166,137,102,0.1)' } }}
            >
              카드 등록
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}
