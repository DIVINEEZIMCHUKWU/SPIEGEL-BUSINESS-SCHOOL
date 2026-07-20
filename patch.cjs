const fs = require('fs');
let code = fs.readFileSync('src/components/sections/HeroSection.tsx', 'utf-8');

const replacement = `
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming Learners Into Future{' '}
            <TypeAnimation
              sequence={[
                'Leaders',
                2000,
                'Entrepreneurs',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200"
              repeat={Infinity}
            />
          </motion.h1>
`;

code = code.replace(/<motion\.h1[^>]*>[\s\S]*?<\/motion\.h1>/, replacement.trim());
fs.writeFileSync('src/components/sections/HeroSection.tsx', code);
