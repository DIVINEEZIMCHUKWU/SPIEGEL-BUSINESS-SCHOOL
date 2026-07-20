require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

let supabaseUrl = process.env.SUPABASE_URL || "";
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  const { data, error } = await supabase.from('programs').select('*');
  console.log("Programs Data:", data);
  console.log("Programs Error:", error);
}
test();
