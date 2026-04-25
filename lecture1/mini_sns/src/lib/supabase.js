import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fkwvqqxtgmptyuznmibw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd3ZxcXh0Z21wdHl1em5taWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTA1NDksImV4cCI6MjA5MTQ4NjU0OX0.cjQMwzLJsmyyOC2CTYSrkWFYahlbAxdDAUV0XoqkKMM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
