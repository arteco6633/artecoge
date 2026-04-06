import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xprzqrknkalnyuxnauus.supabase.co';
const supabaseAnonKey = 'sb_publishable_eJuBtbXDJJP5ECcbklUKWQ_roWKtyPN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
