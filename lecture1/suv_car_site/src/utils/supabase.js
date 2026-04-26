import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fkwvqqxtgmptyuznmibw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signUp = async ({ email, password, username, phone, display_name }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username, phone, display_name } }
  })
  if (error) throw error
  return data
}

export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getCars = async (filters = {}) => {
  let query = supabase.from('cars_search').select('*')
  if (filters.fuel_type) query = query.eq('fuel_type', filters.fuel_type)
  if (filters.min_price) query = query.gte('base_price', filters.min_price)
  if (filters.max_price) query = query.lte('base_price', filters.max_price)
  if (filters.year) query = query.eq('model_year', filters.year)
  if (filters.is_promotion) query = query.eq('is_promotion', true)
  if (filters.search) query = query.ilike('model_name', `%${filters.search}%`)
  if (filters.sort === 'price_asc') query = query.order('base_price', { ascending: true })
  else if (filters.sort === 'price_desc') query = query.order('base_price', { ascending: false })
  else if (filters.sort === 'year_desc') query = query.order('model_year', { ascending: false })
  else if (filters.sort === 'efficiency_desc') query = query.order('efficiency', { ascending: false })
  const { data, error } = await query
  if (error) throw error
  return data
}

export const getCarById = async (carId) => {
  const { data, error } = await supabase.from('cars_data').select('*').eq('car_id', carId).single()
  if (error) throw error
  return data
}

export const createReservation = async (reservationData) => {
  const { data, error } = await supabase.from('reservations').insert([reservationData]).select().single()
  if (error) throw error
  return data
}

export const getUserReservations = async (userId) => {
  const { data, error } = await supabase.from('reservations').select(`*, cars_data(model_name, brand)`).eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const getShowrooms = async () => {
  const { data, error } = await supabase.from('showrooms').select('*').order('city')
  if (error) throw error
  return data
}

export const getActiveEvents = async () => {
  const now = new Date().toISOString()
  const { data, error } = await supabase.from('events').select('*').lte('start_date', now).gte('end_date', now).eq('is_active', true)
  if (error) throw error
  return data
}

export const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabase.from('profiles').upsert({ user_id: userId, ...profileData }).select().single()
  if (error) throw error
  return data
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId).single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}
