require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

let supabaseUrl = process.env.SUPABASE_URL || "";
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  const { data, error } = await supabase.from('gallery').insert([{
    url: "https://example.com/image.jpg",
    title: "Test Image",
    type: "image"
  }]).select();
  console.log("Gallery Insert Error:", error);
}
test();
