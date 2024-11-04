import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://licavbosyxfsysseapwp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY2F2Ym9zeXhmc3lzc2VhcHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MjM1MDMsImV4cCI6MjA0NjI5OTUwM30.vPemvJz93NrezqoIlb_O3xCtN5gzs86pzjFlFNc0uP4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'mijo@mijokristo.com',
    password: 'mijo123'
  });

  if (error) {
    console.error('Error creating user:', error.message);
    return;
  }

  console.log('User created successfully:', data);
}

createUser();