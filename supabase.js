import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://jlsledoyvbiqzmikfase.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsc2xlZG95dmJpcXptaWtmYXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjIwOTQsImV4cCI6MjA3MTE5ODA5NH0.EMCOh87jgSZAwN1uoiemQr_D6ixwwvCF_ZY6xYzpIO0'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)