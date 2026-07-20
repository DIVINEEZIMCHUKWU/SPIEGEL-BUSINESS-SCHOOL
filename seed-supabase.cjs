require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

let supabaseUrl = process.env.SUPABASE_URL || "";
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const defaultPrograms = [
    {
      title: "Holiday Lessons (Junior & Secondary School)",
      description: "Structured academic support for Junior and Secondary School students designed to strengthen understanding, improve performance, and build confidence.",
      category: "Academic",
      image: "https://i.ibb.co/zVKj8wcY/grind-o-clock.jpg",
      date: "Ongoing"
    },
    {
      title: "Computer Training",
      description: "Practical digital skills training including Web Development, Coding, Python, Artificial Intelligence, Data Analysis, and essential tools like Microsoft Office Suite and Digital Marketing, designed for students, professionals, entrepreneurs, and job seekers.",
      category: "Technology",
      image: "https://i.ibb.co/GvHS5zSH/eeee.jpg",
      date: "Ongoing"
    },
    {
      title: "Business and Professional Skills Training",
      description: "Industry-relevant skills that prepare individuals for career advancement and entrepreneurial success.",
      category: "Business",
      image: "https://i.ibb.co/5xBmb9WY/gggg.jpg",
      date: "Ongoing"
    }
];

const defaultGallery = [
    { url: "https://i.ibb.co/nN6GRvpR/1119707526127202818.jpg", title: "Training sessions", type: "image" },
    { url: "https://i.ibb.co/HDBP678Z/1019924646848076011.jpg", title: "Holiday lessons", type: "image" },
    { url: "https://i.ibb.co/C54jPp11/dddd.jpg", title: "Computer classes", type: "image" },
    { url: "https://i.ibb.co/0psvNNL1/ppppp.jpg", title: "Workshops", type: "image" },
    { url: "https://i.ibb.co/ZzNP8ZyB/Akilah.jpg", title: "Graduations", type: "image" },
];

async function seed() {
  const { data: pData, error: pError } = await supabase.from('programs').select('id').limit(1);
  if (!pError && pData && pData.length === 0) {
    console.log("Seeding programs...");
    await supabase.from('programs').insert(defaultPrograms);
  }

  const { data: gData, error: gError } = await supabase.from('gallery').select('id').limit(1);
  if (!gError && gData && gData.length === 0) {
    console.log("Seeding gallery...");
    const { error: ge } = await supabase.from('gallery').insert(defaultGallery);
    if (ge) console.error("Gallery Seed Error", ge);
  }
}
seed();
