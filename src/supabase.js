import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tnrusogdplqbithagiji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucnVzb2dkcGxxYml0aGFnaWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODc0NTYsImV4cCI6MjA0NzA2MzQ1Nn0.nuFMLfsvwGpoBdWP1wKEK9SOPde_k61R_q6WVxKI5kM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
