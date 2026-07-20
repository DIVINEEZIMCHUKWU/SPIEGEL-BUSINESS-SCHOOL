const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

const fallbackBlock = `
  // Fallback in-memory DB
  let localEnquiries: any[] = [];
  let localEnquiryId = 1;
  let localGallery: any[] = [
    { id: "g1", url: "https://i.ibb.co/nN6GRvpR/1119707526127202818.jpg", title: "Training sessions", type: "image", created_at: new Date().toISOString() },
    { id: "g2", url: "https://i.ibb.co/HDBP678Z/1019924646848076011.jpg", title: "Holiday lessons", type: "image", created_at: new Date().toISOString() },
    { id: "g3", url: "https://i.ibb.co/C54jPp11/dddd.jpg", title: "Computer classes", type: "image", created_at: new Date().toISOString() },
    { id: "g4", url: "https://i.ibb.co/0psvNNL1/ppppp.jpg", title: "Workshops", type: "image", created_at: new Date().toISOString() },
    { id: "g5", url: "https://i.ibb.co/ZzNP8ZyB/Akilah.jpg", title: "Graduations", type: "image", created_at: new Date().toISOString() }
  ];
  let localGalleryId = 6;
  let localPrograms: any[] = [
    {
      id: "p1",
      title: "Holiday Lessons (Junior & Secondary School)",
      description: "Structured academic support for Junior and Secondary School students designed to strengthen understanding, improve performance, and build confidence.",
      category: "Academic",
      image: "https://i.ibb.co/zVKj8wcY/grind-o-clock.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: "p2",
      title: "Computer Training",
      description: "Practical digital skills training including Web Development, Coding, Python, Artificial Intelligence, Data Analysis, and essential tools like Microsoft Office Suite and Digital Marketing.",
      category: "Technology",
      image: "https://i.ibb.co/GvHS5zSH/eeee.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: "p3",
      title: "Business and Professional Skills Training",
      description: "Industry-relevant skills that prepare individuals for career advancement and entrepreneurial success.",
      category: "Business",
      image: "https://i.ibb.co/5xBmb9WY/gggg.jpg",
      created_at: new Date().toISOString()
    }
  ];
  let localProgramId = 4;
`;

code = code.replace(/  \/\/ Fallback in-memory DB[\s\S]*?let localProgramId = 1;/m, fallbackBlock);

fs.writeFileSync('server.ts', code);
