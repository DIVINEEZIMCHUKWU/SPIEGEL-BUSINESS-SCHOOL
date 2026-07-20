require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
let supabaseUrl = process.env.SUPABASE_URL || "";
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);
async function test() {
  const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
  console.log("Enquiries:", data);
}
test();
