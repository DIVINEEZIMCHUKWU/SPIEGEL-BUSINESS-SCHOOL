import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gkfxenevabxunaxwerxj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZnhlbmV2YWJ4dW5heHdlcnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTEyMDUsImV4cCI6MjA3MTAyNzIwNX0.0P7-X_U8iPXD9JGyuJOFTaoD_rwjkUzvXK1d_BezgQU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
