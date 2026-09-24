const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const Notification = require('../models/Notification');

const autoSeed = async () => {
  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Company.deleteMany({}),
    Job.deleteMany({}),
    Application.deleteMany({}),
    SavedJob.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  // Admin User
  const adminUser = await User.create({
    name: 'Platform Admin',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 9800000001',
    about: 'Chief Administrator of InternConnect Portal',
  });

  // Recruiters
  const recruiter1 = await User.create({
    name: 'Priya Sharma',
    email: 'recruiter@demo.com',
    password: 'password123',
    role: 'recruiter',
    phone: '+91 9876543210',
    about: 'Senior Campus Talent Acquisition Lead at Tech Mahindra & partner enterprises.',
  });

  const recruiter2 = await User.create({
    name: 'Vikram Malhotra',
    email: 'recruiter2@demo.com',
    password: 'password123',
    role: 'recruiter',
    phone: '+91 9876543211',
    about: 'Head of University Hiring at TCS & Infosys ecosystem.',
  });

  // Students
  const student1 = await User.create({
    name: 'Aarav Patel',
    email: 'student@demo.com',
    password: 'password123',
    role: 'student',
    phone: '+91 9123456780',
    college: 'IIT Bombay',
    course: 'B.Tech in Computer Science and Engineering',
    graduationYear: 2025,
    skills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    resume: 'https://example.com/aarav-patel-resume.pdf',
    github: 'https://github.com/aaravpatel-dev',
    linkedin: 'https://linkedin.com/in/aaravpatel-dev',
    about:
      'Passionate full-stack developer and pre-final year engineering student. Built multiple MERN web applications, active open-source contributor, and looking for a high-impact internship opportunity.',
  });

  const student2 = await User.create({
    name: 'Ananya Iyer',
    email: 'student2@demo.com',
    password: 'password123',
    role: 'student',
    phone: '+91 9123456781',
    college: 'BITS Pilani',
    course: 'B.E. Computer Science',
    graduationYear: 2026,
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'FastAPI', 'Pandas', 'Docker'],
    resume: 'https://example.com/ananya-iyer-resume.pdf',
    github: 'https://github.com/ananyaiyer',
    linkedin: 'https://linkedin.com/in/ananya-iyer',
    about:
      'Aspiring Data Scientist & AI enthusiast with strong problem-solving skills, experience with Python, PyTorch, and developing data pipelines.',
  });

  // Companies
  const companiesData = [
    {
      companyName: 'Tata Consultancy Services (TCS)',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60',
      description: 'TCS is a global leader in IT services, consulting, and business solutions with extensive presence worldwide.',
      website: 'https://www.tcs.com',
      location: 'Mumbai, Maharashtra, India',
      industry: 'Information Technology & Services',
      recruiterId: recruiter2._id,
    },
    {
      companyName: 'Infosys',
      logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=150&auto=format&fit=crop&q=60',
      description: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients across 50+ countries to navigate their digital transformation.',
      website: 'https://www.infosys.com',
      location: 'Bengaluru, Karnataka, India',
      industry: 'Information Technology',
      recruiterId: recruiter2._id,
    },
    {
      companyName: 'Wipro Technologies',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&auto=format&fit=crop&q=60',
      description: 'Wipro is a leading technology services and consulting company focused on building innovative solutions that address clients’ most complex digital transformation needs.',
      website: 'https://www.wipro.com',
      location: 'Bengaluru, Karnataka, India',
      industry: 'IT Services & Consulting',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Accenture India',
      logo: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=150&auto=format&fit=crop&q=60',
      description: 'Accenture is a global professional services company with leading capabilities in digital, cloud, security and software innovation.',
      website: 'https://www.accenture.com',
      location: 'Hyderabad, Telangana, India',
      industry: 'Management & Technology Consulting',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Tech Mahindra',
      logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=150&auto=format&fit=crop&q=60',
      description: 'Tech Mahindra offers innovative and customer-centric digital experiences, enabling enterprises, associates, and society to Rise.',
      website: 'https://www.techmahindra.com',
      location: 'Pune, Maharashtra, India',
      industry: 'Telecommunications & IT',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Razorpay (Fintech Startup)',
      logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=60',
      description: 'Razorpay is India’s leading full-stack financial solutions company revolutionizing digital payments and banking for modern businesses.',
      website: 'https://razorpay.com',
      location: 'Bengaluru, Karnataka, India',
      industry: 'Fintech & SaaS',
      recruiterId: recruiter1._id,
    },
  ];

  const companies = await Company.insertMany(companiesData);

  const tcs = companies[0];
  const infosys = companies[1];
  const wipro = companies[2];
  const accenture = companies[3];
  const techMahindra = companies[4];
  const razorpay = companies[5];

  const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const fortyFiveDaysFromNow = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

  const jobsData = [
    {
      title: 'React.js Frontend Developer Intern',
      description:
        'We are looking for enthusiastic React.js interns to build dynamic, mobile-responsive web applications. You will work closely with senior engineers on real-world client dashboards and product portals.',
      type: 'Internship',
      category: 'Web Development',
      companyId: infosys._id,
      recruiterId: recruiter2._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      experience: 'Fresher / College Student',
      skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
      eligibility: 'B.Tech / BCA / MCA / B.Sc (2024 / 2025 / 2026 Batch) with minimum 60% aggregate.',
      responsibilities: [
        'Develop interactive and responsive UI components using React.js and modern JavaScript.',
        'Collaborate with backend developers to integrate RESTful APIs and ensure seamless data flow.',
        'Participate in code reviews, debug front-end issues, and optimize web performance.',
        'Write clean, maintainable, and reusable modular code.',
      ],
      requirements: [
        'Strong fundamentals in HTML, CSS, JavaScript (ES6+), and React hooks.',
        'Familiarity with state management libraries (Redux or Context API) is a plus.',
        'Understanding of REST APIs and Git version control.',
        'Good communication skills and eagerness to learn new web technologies.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Full Stack Developer Intern (MERN)',
      description:
        'Join our agile engineering team as a Full Stack MERN intern. Gain hands-on experience building end-to-end cloud applications using MongoDB, Express, React, and Node.js.',
      type: 'Internship',
      category: 'Software Development',
      companyId: tcs._id,
      recruiterId: recruiter2._id,
      location: 'Remote / Virtual',
      workMode: 'Remote',
      stipend: '₹30,000 / month',
      duration: '6 Months',
      experience: 'Fresher / Pre-final Year',
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API', 'JavaScript'],
      eligibility: 'Engineering/CS/IT students currently in 3rd or 4th year with hands-on MERN project experience.',
      responsibilities: [
        'Build scalable backend services and REST APIs with Node.js and Express.',
        'Design MongoDB schemas and write performant queries with Mongoose.',
        'Connect React frontend with backend endpoints and manage application state.',
        'Deploy applications to cloud platforms and write unit tests.',
      ],
      requirements: [
        'Proven project experience with Node.js and React.js.',
        'Good knowledge of asynchronous programming, promises, and JWT authentication.',
        'Comfortable working with Git and GitHub.',
        'High problem-solving aptitude.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Python Developer Intern',
      description:
        'Exciting internship opportunity for students skilled in Python. You will work on automation scripts, data pipelines, backend APIs, and internal productivity tools.',
      type: 'Internship',
      category: 'Data Science & AI',
      companyId: wipro._id,
      recruiterId: recruiter1._id,
      location: 'Hyderabad, Telangana',
      workMode: 'On-site',
      stipend: '₹22,000 / month',
      duration: '3 Months',
      experience: 'Fresher',
      skills: ['Python', 'Django', 'FastAPI', 'SQL', 'Git', 'Linux'],
      eligibility: 'Any graduate/post-graduate in Computer Science, IT, or Mathematics.',
      responsibilities: [
        'Write clean and efficient Python code for automation workflows.',
        'Assist in building REST APIs using Flask/FastAPI.',
        'Query relational databases and write optimized SQL queries.',
        'Test and debug Python applications.',
      ],
      requirements: [
        'Solid understanding of core Python and Object-Oriented Programming (OOP).',
        'Knowledge of basic SQL and database design.',
        'Ability to write test cases and debug code.',
        'Strong analytical thinking and teamwork spirit.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Java Developer Intern',
      description:
        'Learn enterprise software engineering by working on Spring Boot microservices, cloud deployments, and resilient transactional systems with our global consulting team.',
      type: 'Internship',
      category: 'Software Development',
      companyId: accenture._id,
      recruiterId: recruiter1._id,
      location: 'Pune, Maharashtra',
      workMode: 'Hybrid',
      stipend: '₹28,000 / month',
      duration: '6 Months',
      experience: 'Fresher',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'Microservices', 'Git'],
      eligibility: 'B.Tech/B.E. Computer Science or Information Technology with good academic track record.',
      responsibilities: [
        'Develop Java backend services using Spring Boot framework.',
        'Work with MySQL/PostgreSQL databases using Spring Data JPA.',
        'Participate in daily standups and agile sprint planning sessions.',
        'Implement unit tests with JUnit and Mockito.',
      ],
      requirements: [
        'Strong knowledge of Core Java, Collections, Multithreading, and OOP.',
        'Basic understanding of Spring Boot framework and REST APIs.',
        'Familiarity with relational databases and SQL.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'UI/UX Design Intern',
      description:
        'Passionate about crafting intuitive user experiences? Join Razorpay’s design studio to design delightful fintech interfaces, design systems, wireframes, and prototypes.',
      type: 'Internship',
      category: 'UI/UX Design',
      companyId: razorpay._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru / Remote',
      workMode: 'Remote',
      stipend: '₹35,000 / month',
      duration: '3 Months',
      experience: 'Fresher / Portfolio required',
      skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Adobe XD'],
      eligibility: 'Design students or tech students with a demonstrable design portfolio (Behance/Dribbble/Figma).',
      responsibilities: [
        'Design user journeys, wireframes, and high-fidelity mockups for web and mobile.',
        'Conduct usability testing sessions and synthesize customer feedback.',
        'Maintain and contribute components to our centralized design system.',
        'Collaborate directly with product managers and frontend engineers.',
      ],
      requirements: [
        'Proficiency with Figma and modern design tooling.',
        'Strong eye for typography, layout, spacing, and micro-interactions.',
        'Portfolio showcasing at least 2 detailed UI/UX case studies.',
        'Clear communication and presentation skills.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Software Developer (Fresh Graduate)',
      description:
        'Tech Mahindra is hiring fresh graduates for our Digital Transformation business unit. You will be trained in cutting-edge tech and placed on live customer projects.',
      type: 'Full-time',
      category: 'Software Development',
      companyId: techMahindra._id,
      recruiterId: recruiter1._id,
      location: 'Noida / Pune, India',
      workMode: 'Hybrid',
      salary: '4.5 - 7.5 LPA',
      experience: 'Fresher (2024 / 2025 Passouts)',
      skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'SQL'],
      eligibility: 'B.Tech/MCA 2024 or 2025 graduates with 65%+ across 10th, 12th, and Degree.',
      responsibilities: [
        'Write high-quality software code following enterprise coding guidelines.',
        'Analyze software requirements and participate in technical design discussions.',
        'Troubleshoot and resolve production defects.',
        'Collaborate across cross-functional teams in an agile environment.',
      ],
      requirements: [
        'Strong foundation in Data Structures, Algorithms, and Operating Systems.',
        'Proficiency in at least one object-oriented programming language.',
        'Excellent problem-solving and logical reasoning abilities.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Associate Frontend Developer',
      description:
        'Develop high-performance customer-facing web applications. We value clean code, accessible UI components, and fast-loading web applications.',
      type: 'Full-time',
      category: 'Web Development',
      companyId: infosys._id,
      recruiterId: recruiter2._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '6.0 - 9.5 LPA',
      experience: '0-1 Year',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
      eligibility: 'Graduates with bachelor’s degree in Computer Science, IT or related fields.',
      responsibilities: [
        'Architect and implement scalable frontend components in Next.js/React.',
        'Optimize web performance, Core Web Vitals, and SEO metrics.',
        'Write comprehensive automated tests with Jest and React Testing Library.',
      ],
      requirements: [
        'Solid expertise in modern JavaScript (ES6+), TypeScript, and React ecosystem.',
        'Experience working with REST and GraphQL APIs.',
        'Familiarity with CI/CD and deployment workflows.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Backend Developer (Node.js & Cloud)',
      description:
        'Build scalable microservices and APIs powering critical enterprise platforms. Work with Docker, Kubernetes, AWS, and MongoDB.',
      type: 'Full-time',
      category: 'Cloud & DevOps',
      companyId: accenture._id,
      recruiterId: recruiter1._id,
      location: 'Remote / All India',
      workMode: 'Remote',
      salary: '7.5 - 12 LPA',
      experience: '0-2 Years',
      skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker', 'Redis', 'Kafka'],
      eligibility: 'B.Tech/MCA degree with strong grasp of distributed systems.',
      responsibilities: [
        'Design and maintain robust REST APIs and event-driven microservices.',
        'Optimize database queries, caching strategies, and server memory footprints.',
        'Implement authentication and authorization protocols (OAuth2, JWT).',
      ],
      requirements: [
        'Strong practical experience with Node.js and Express framework.',
        'Proficiency with MongoDB / PostgreSQL and Redis caching.',
        'Understanding of cloud services (AWS/GCP) and containerization with Docker.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
  ];

  const jobs = await Job.insertMany(jobsData);

  // Applications
  await Application.create({
    studentId: student1._id,
    jobId: jobs[0]._id, // React intern
    resume: student1.resume,
    coverLetter:
      'I have been developing React applications for the last 2 years and have built several responsive client portals. I am eager to contribute to Infosys engineering projects.',
    studentName: student1.name,
    studentEmail: student1.email,
    studentPhone: student1.phone,
    status: 'Shortlisted',
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  });

  await Application.create({
    studentId: student1._id,
    jobId: jobs[1]._id, // Full stack MERN intern
    resume: student1.resume,
    coverLetter:
      'As a passionate MERN stack enthusiast with full-stack projects on GitHub, I am excited about the opportunity to build cloud-native applications at TCS.',
    studentName: student1.name,
    studentEmail: student1.email,
    studentPhone: student1.phone,
    status: 'Under Review',
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  });

  await Application.create({
    studentId: student2._id,
    jobId: jobs[2]._id, // Python intern
    resume: student2.resume,
    coverLetter:
      'My expertise in Python and data pipelines aligns directly with Wipro’s automation engineering needs. Looking forward to discussing how I can add value.',
    studentName: student2.name,
    studentEmail: student2.email,
    studentPhone: student2.phone,
    status: 'Interview',
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  });

  // Saved Jobs
  await SavedJob.create({ studentId: student1._id, jobId: jobs[4]._id });
  await SavedJob.create({ studentId: student1._id, jobId: jobs[7]._id });

  // Notifications
  await Notification.create({
    userId: student1._id,
    message: '🎉 Congratulations! Your application for "React.js Frontend Developer Intern" at Infosys has been shortlisted!',
    type: 'status_update',
    isRead: false,
    link: '/student/applications',
  });
  await Notification.create({
    userId: student1._id,
    message: 'Your application for "Full Stack Developer Intern (MERN)" at TCS is currently Under Review.',
    type: 'status_update',
    isRead: true,
    link: '/student/applications',
  });
  await Notification.create({
    userId: recruiter1._id,
    message: 'New applicant Aarav Patel applied for "React.js Frontend Developer Intern".',
    type: 'application',
    isRead: false,
    link: `/recruiter/jobs/${jobs[0]._id}/applications`,
  });

  return { usersCount: 5, companiesCount: companies.length, jobsCount: jobs.length };
};

module.exports = autoSeed;
