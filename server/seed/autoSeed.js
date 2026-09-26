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
    about: 'Senior Campus Talent Acquisition Lead for Google, Amazon & Tech Startups ecosystem.',
  });

  const recruiter2 = await User.create({
    name: 'Vikram Malhotra',
    email: 'recruiter2@demo.com',
    password: 'password123',
    role: 'recruiter',
    phone: '+91 9876543211',
    about: 'Head of University Hiring at Microsoft, TCS & Infosys ecosystem.',
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
      companyName: 'Google India',
      logo: '/logos/google.svg',
      description: 'Google LLC is a global technology leader organizing world information and making it universally accessible and useful. Google India leads engineering innovations across AI, Cloud, Android, and Search.',
      website: 'https://careers.google.com',
      location: 'RMZ Infinity, Old Madras Road, Bennigana Halli, Bengaluru, Karnataka 560016',
      industry: 'Technology, AI & Cloud',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Microsoft India',
      logo: '/logos/microsoft.svg',
      description: 'Microsoft India Development Center is one of Microsoft’s largest R&D centers outside Redmond, driving innovations in Azure Cloud, Windows, Office 365, and AI.',
      website: 'https://careers.microsoft.com',
      location: 'Microsoft Campus, ISB Road, Gachibowli, Hyderabad, Telangana 500032',
      industry: 'Software, Cloud & Hardware',
      recruiterId: recruiter2._id,
    },
    {
      companyName: 'Amazon India',
      logo: '/logos/amazon.svg',
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking. Powers AWS and prime e-commerce across India.',
      website: 'https://amazon.jobs',
      location: 'Bagmane World Technology Center, Mahadevapura, Bengaluru, Karnataka 560048',
      industry: 'E-Commerce & Cloud Computing (AWS)',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Flipkart',
      logo: '/logos/flipkart.svg',
      description: 'Flipkart is India’s homegrown e-commerce marketplace leading customer-centric innovations in online retail, hyper-scale distributed systems, and supply chain technology.',
      website: 'https://www.flipkartcareers.com',
      location: 'Buildings Alyssa, Begonia & Clover, Embassy Tech Village, Outer Ring Road, Bengaluru, Karnataka 560103',
      industry: 'E-Commerce & Supply Chain Tech',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Swiggy',
      logo: '/logos/swiggy.svg',
      description: 'Swiggy is India’s leading on-demand convenience platform, delivering food, groceries via Instamart, and dining experiences powered by real-time logistics AI.',
      website: 'https://careers.swiggy.com',
      location: 'IBC Knowledge Park, Bannerghatta Main Road, Bhavani Nagar, Bengaluru, Karnataka 560029',
      industry: 'Quick Commerce & On-Demand Delivery',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Zomato',
      logo: '/logos/zomato.svg',
      description: 'Zomato connects customers, restaurant partners, and delivery partners serving millions of meals and rapid grocery delivery across 10,000+ cities in India.',
      website: 'https://www.zomato.com/careers',
      location: 'DLF Cyber City, Building 10, Phase II, Gurugram, Haryana 122002',
      industry: 'Food Delivery & Hyperlocal Logistics',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Razorpay',
      logo: '/logos/razorpay.svg',
      description: 'Razorpay is India’s leading full-stack financial solutions unicorn, revolutionizing digital payment gateways, neo-banking, and corporate credit cards for millions of businesses.',
      website: 'https://razorpay.com',
      location: 'The Pavillion, 175/1, Bannerghatta Main Road, Dollars Colony, Bengaluru, Karnataka 560076',
      industry: 'Fintech & Banking Infrastructure',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Tata Consultancy Services (TCS)',
      logo: '/logos/tcs.svg',
      description: 'TCS is a global leader in IT services, consulting, and business solutions with extensive presence in over 50 countries, building tomorrow’s enterprise architecture.',
      website: 'https://www.tcs.com',
      location: 'TCS House, Raveline Street, Fort, Mumbai, Maharashtra 400001',
      industry: 'Information Technology & Consulting',
      recruiterId: recruiter2._id,
    },
    {
      companyName: 'Infosys',
      logo: '/logos/infosys.svg',
      description: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients across 50+ countries to navigate their digital transformation.',
      website: 'https://www.infosys.com',
      location: 'Electronics City, Hosur Road, Bengaluru, Karnataka 560100',
      industry: 'Information Technology & Cloud Consulting',
      recruiterId: recruiter2._id,
    },
    {
      companyName: 'Accenture India',
      logo: '/logos/accenture.svg',
      description: 'Accenture is a global professional services company with leading capabilities in digital, cloud, security, and generative artificial intelligence.',
      website: 'https://www.accenture.com',
      location: 'Divyasree Orion, Raidurga, HITEC City, Hyderabad, Telangana 500081',
      industry: 'Management & Technology Consulting',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Wipro Technologies',
      logo: '/logos/wipro.svg',
      description: 'Wipro is a leading technology services and consulting company focused on building innovative solutions that address clients’ most complex digital transformation needs.',
      website: 'https://www.wipro.com',
      location: 'Doddakannelli, Sarjapur Road, Bengaluru, Karnataka 560035',
      industry: 'IT Services & Cloud Solutions',
      recruiterId: recruiter1._id,
    },
    {
      companyName: 'Tech Mahindra',
      logo: '/logos/techmahindra.svg',
      description: 'Tech Mahindra offers innovative and customer-centric digital experiences, enabling enterprises, associates, and society to Rise through connected technologies.',
      website: 'https://www.techmahindra.com',
      location: 'Sharda Centre, Off Karve Road, Erandwane, Pune, Maharashtra 411004',
      industry: 'Telecommunications & Enterprise IT',
      recruiterId: recruiter1._id,
    },
  ];

  const companies = await Company.insertMany(companiesData);

  const google = companies[0];
  const microsoft = companies[1];
  const amazon = companies[2];
  const flipkart = companies[3];
  const swiggy = companies[4];
  const zomato = companies[5];
  const razorpay = companies[6];
  const tcs = companies[7];
  const infosys = companies[8];
  const accenture = companies[9];
  const wipro = companies[10];
  const techMahindra = companies[11];

  const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const fortyFiveDaysFromNow = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
  const sixtyDaysFromNow = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  const jobsData = [
    // Google
    {
      title: 'Software Engineering Intern (Summer 2025/2026)',
      description:
        'Join Google as a Software Engineering Intern! You will work on core Google products and services that affect billions of users, collaborate with team leads, write clean testable code, and solve distributed systems challenges.',
      type: 'Internship',
      category: 'Software Engineering',
      companyId: google._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹1,25,000 / month',
      duration: '3 Months',
      experience: 'Pre-final Year (B.Tech / M.Tech / MS)',
      skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Distributed Systems'],
      eligibility: 'Currently pursuing a Bachelor’s or Master’s in Computer Science or related STEM field. Strong foundation in Algorithms.',
      responsibilities: [
        'Design and implement algorithms for scalable cloud microservices.',
        'Optimize code for latency, throughput, and cross-platform reliability.',
        'Participate in design reviews and submit high-standard pull requests.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Associate Cloud Engineer (Fresher Graduate)',
      description:
        'As an Associate Cloud Engineer at Google Cloud, you will deploy enterprise cloud solutions, manage Google Cloud Platform (GCP) resources, and assist tier-1 clients in their modernization journeys.',
      type: 'Full-time',
      category: 'Cloud & DevOps',
      companyId: google._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '₹20,00,000 / year',
      experience: 'Fresher (0 - 1 Years)',
      skills: ['Google Cloud (GCP)', 'Kubernetes', 'Linux', 'Python', 'Terraform', 'Networking'],
      eligibility: 'B.Tech/B.E. in CS/IT/ECE (2024/2025 Batch) with GCP Associate Cloud Engineer certification or strong cloud coursework.',
      responsibilities: [
        'Deploy containerized applications on Google Kubernetes Engine (GKE).',
        'Automate cloud infrastructure using Terraform scripts.',
        'Monitor application performance and ensure 99.99% uptime compliance.',
      ],
      deadline: sixtyDaysFromNow,
      status: 'Active',
    },

    // Microsoft
    {
      title: 'Software Development Engineer (SDE) Intern',
      description:
        'Microsoft is looking for brilliant problem solvers for our SDE Internship. You will build scalable cloud services in Azure, innovate on AI-powered developer tools, and collaborate with world-class engineers.',
      type: 'Internship',
      category: 'Software Engineering',
      companyId: microsoft._id,
      recruiterId: recruiter2._id,
      location: 'Hyderabad, Telangana',
      workMode: 'Hybrid',
      stipend: '₹1,20,000 / month',
      duration: '6 Months',
      experience: 'College Student (Final / Pre-final Year)',
      skills: ['C#', '.NET Core', 'Azure', 'Data Structures', 'Algorithms', 'Object Oriented Programming'],
      eligibility: 'B.Tech/Dual Degree students graduating in 2025 or 2026 with minimum 7.5 CGPA.',
      responsibilities: [
        'Develop RESTful microservices on Microsoft Azure.',
        'Write unit, integration, and load testing automation.',
        'Contribute to sprint planning and agile feature delivery.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Azure Support & Cloud Operations Engineer',
      description:
        'Work directly with Microsoft global enterprise customers to diagnose and resolve mission-critical cloud platform issues across hybrid cloud infrastructures.',
      type: 'Full-time',
      category: 'Cloud & DevOps',
      companyId: microsoft._id,
      recruiterId: recruiter2._id,
      location: 'Hyderabad, Telangana',
      workMode: 'Hybrid',
      salary: '₹16,00,000 / year',
      experience: 'Fresher (0 - 1 Years)',
      skills: ['Microsoft Azure', 'PowerShell', 'Windows Server', 'Linux', 'Networking (TCP/IP)'],
      eligibility: 'Graduating engineers with understanding of cloud systems, virtualization, and DNS/Networking.',
      responsibilities: [
        'Troubleshoot complex cloud networking and virtual machine issues.',
        'Collaborate with Azure product engineering to triage platform bugs.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // Amazon
    {
      title: 'Software Development Engineer Intern - AWS',
      description:
        'Amazon Web Services (AWS) is hiring SDE Interns to invent on behalf of millions of developers worldwide. You will dive deep into high-throughput systems, caching layers, and asynchronous event architectures.',
      type: 'Internship',
      category: 'Software Engineering',
      companyId: amazon._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'On-site',
      stipend: '₹1,10,000 / month',
      duration: '6 Months',
      experience: 'Pre-final Year Student',
      skills: ['Java', 'AWS', 'Distributed Systems', 'SQL', 'Data Structures'],
      eligibility: 'Enrolled in accredited B.Tech/M.Tech program in Computer Science or related degree.',
      responsibilities: [
        'Build customer-facing APIs and background workers on AWS Lambda and DynamoDB.',
        'Participate in Amazon operational reviews and design discussions.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Business Intelligence & Data Analyst Intern',
      description:
        'Help Amazon drive retail and operational excellence using data insights. You will query massive petabyte-scale data lakes, build executive dashboards in QuickSight, and model business forecasts.',
      type: 'Internship',
      category: 'Data & Analytics',
      companyId: amazon._id,
      recruiterId: recruiter1._id,
      location: 'Hyderabad, Telangana',
      workMode: 'Hybrid',
      stipend: '₹65,000 / month',
      duration: '6 Months',
      experience: 'Final Year Student / Recent Graduate',
      skills: ['SQL', 'Python', 'Tableau', 'Amazon QuickSight', 'Data Modeling', 'Excel'],
      eligibility: 'B.Tech/BCA/B.Sc in Statistics, CS, or Analytics with advanced SQL skills.',
      responsibilities: [
        'Design automated ETL pipelines and KPI dashboards.',
        'Extract actionable business trends for regional supply chain heads.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // Flipkart
    {
      title: 'Associate SDE-1 (Full-Time Fresher)',
      description:
        'Flipkart is hiring ambitious freshers for the core engineering team. Build high-concurrency systems handling hundreds of thousands of checkout requests during the Big Billion Days sale.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: flipkart._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '₹22,00,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['Java', 'Spring Boot', 'Kafka', 'MySQL', 'Redis', 'Microservices'],
      eligibility: 'B.E./B.Tech in Computer Science or related field with solid grasp of CS fundamentals.',
      responsibilities: [
        'Develop fault-tolerant backend microservices with Java and Spring.',
        'Optimize database queries and caching layers for sub-100ms response times.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Associate Product Manager (APM) Intern',
      description:
        'Shape the future of Indian e-commerce. Work alongside senior product managers to define feature specs, run A/B experiments, and enhance the customer purchasing journey.',
      type: 'Internship',
      category: 'Product Management',
      companyId: flipkart._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹85,000 / month',
      duration: '6 Months',
      experience: 'College Student (All Branches)',
      skills: ['Product Thinking', 'User Research', 'Wireframing', 'SQL', 'A/B Testing'],
      eligibility: 'Undergraduate or Master’s students with strong analytical skills and consumer empathy.',
      responsibilities: [
        'Conduct user interviews to synthesize product pain points.',
        'Write PRDs and partner with engineering to launch experiments.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // Swiggy
    {
      title: 'Frontend Engineering Intern (React & Mobile Web)',
      description:
        'Build lightning-fast web interfaces for millions of Swiggy foodies and Instamart shoppers. Master React, state synchronization, and modern web performance optimizations.',
      type: 'Internship',
      category: 'Web Development',
      companyId: swiggy._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹50,000 / month',
      duration: '6 Months',
      experience: 'Fresher / Student',
      skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
      eligibility: 'B.Tech/BCA/MCA with demonstrable web projects and responsive UI portfolio.',
      responsibilities: [
        'Build pixel-perfect UI components adhering to Swiggy design system.',
        'Optimize asset delivery for ultra-fast rendering on mobile networks.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'UI/UX Product Design Intern',
      description:
        'Craft delightful consumer experiences for food ordering and groceries. Create wireframes, interactive prototypes, and design systems for mobile and web apps.',
      type: 'Internship',
      category: 'UI/UX Design',
      companyId: swiggy._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹40,000 / month',
      duration: '3 Months',
      experience: 'Design Student / Fresher',
      skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Mobile UX'],
      eligibility: 'Design portfolio displaying mobile app case studies is mandatory.',
      responsibilities: [
        'Design interactive prototypes and mockups in Figma.',
        'Collaborate with developers to ensure fidelity in final production.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },

    // Zomato
    {
      title: 'Backend Developer Intern (Golang / Python)',
      description:
        'Work on high-performance order routing engines and real-time rider dispatch algorithms at Zomato. Ideal for coders passionate about concurrency and backend performance.',
      type: 'Internship',
      category: 'Backend Development',
      companyId: zomato._id,
      recruiterId: recruiter1._id,
      location: 'Gurugram, Haryana',
      workMode: 'On-site',
      stipend: '₹60,000 / month',
      duration: '6 Months',
      experience: 'College Student (Pre-final / Final Year)',
      skills: ['Golang', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
      eligibility: 'B.Tech in CS/IT. Solid understanding of multi-threading and relational databases.',
      responsibilities: [
        'Develop microservices handling real-time order lifecycle events.',
        'Write automated tests and monitor latency metrics via Grafana.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Operations & City Growth Associate',
      description:
        'Drive hyperlocal restaurant acquisition, onboarding, and customer retention strategies across key regional markets.',
      type: 'Full-time',
      category: 'Marketing & Sales',
      companyId: zomato._id,
      recruiterId: recruiter1._id,
      location: 'Mumbai, Maharashtra',
      workMode: 'On-site',
      salary: '₹7,50,000 / year',
      experience: 'Fresher (0 - 1 Years)',
      skills: ['Business Strategy', 'Stakeholder Management', 'Excel', 'Data Analysis'],
      eligibility: 'BBA / B.Tech / B.Com graduates with exceptional communication and negotiation skills.',
      responsibilities: [
        'Partner with premium restaurant chains for exclusive launch campaigns.',
        'Analyze regional delivery demand patterns to optimize operational coverage.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },

    // Razorpay
    {
      title: 'Full Stack Engineering Intern (MERN / TypeScript)',
      description:
        'Contribute to Razorpay payment gateway dashboards, automated billing systems, and developer checkout SDKs used by millions of merchants daily.',
      type: 'Internship',
      category: 'Full Stack Development',
      companyId: razorpay._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹45,000 / month',
      duration: '6 Months',
      experience: 'College Student',
      skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs'],
      eligibility: 'Pre-final and final year students with hands-on MERN or full-stack web development projects.',
      responsibilities: [
        'Develop responsive merchant dashboard modules using React and TypeScript.',
        'Build secure backend endpoints for payment settlement reconciliation.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Junior DevOps Engineer (Fresher)',
      description:
        'Help build automated CI/CD pipelines, container orchestration environments, and security monitoring setups for critical financial infrastructures.',
      type: 'Full-time',
      category: 'Cloud & DevOps',
      companyId: razorpay._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '₹12,00,000 / year',
      experience: 'Fresher (0 - 1 Years)',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD (GitHub Actions)', 'Terraform'],
      eligibility: 'B.Tech graduates with strong Linux command line skills and containerization knowledge.',
      responsibilities: [
        'Maintain Kubernetes clusters across multi-region cloud infrastructures.',
        'Automate deployment pipelines and manage zero-downtime releases.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // TCS
    {
      title: 'TCS Digital Ninja Graduate Trainee',
      description:
        'TCS Digital is our flagship recruitment stream for high-potential engineering graduates. Work on cutting-edge enterprise projects in AI, IoT, Blockchain, and Full-Stack Engineering.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: tcs._id,
      recruiterId: recruiter2._id,
      location: 'Mumbai, Maharashtra',
      workMode: 'Hybrid',
      salary: '₹7,20,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['Java', 'Python', 'SQL', 'Data Structures', 'Spring Boot', 'Git'],
      eligibility: 'B.E./B.Tech/M.E./M.Tech/MCA/M.Sc with minimum 70% throughout academics.',
      responsibilities: [
        'Design and code enterprise software solutions for global banking and retail clients.',
        'Participate in agile sprint ceremonies and continuous code quality audits.',
      ],
      deadline: sixtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'TCS Research & Innovation Intern - AI/NLP',
      description:
        'Join TCS Innovation Labs to conduct research in natural language processing, computer vision, and cognitive systems.',
      type: 'Internship',
      category: 'AI & Data Science',
      companyId: tcs._id,
      recruiterId: recruiter2._id,
      location: 'Pune, Maharashtra',
      workMode: 'Hybrid',
      stipend: '₹35,000 / month',
      duration: '6 Months',
      experience: 'M.Tech / Pre-final B.Tech',
      skills: ['Python', 'Natural Language Processing', 'PyTorch', 'Transformers', 'Machine Learning'],
      eligibility: 'Students with publication track record or strong academic coursework in ML/NLP.',
      responsibilities: [
        'Train and fine-tune large language models for domain-specific industrial tasks.',
        'Co-author research papers and patent disclosures.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // Infosys
    {
      title: 'Specialist Programmer (Power Programmer)',
      description:
        'Infosys Specialist Programmer role is an elite high-compensation track designed for exceptional coders and algorithm masters. Lead digital transformation projects for Fortune 500 enterprises.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: infosys._id,
      recruiterId: recruiter2._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '₹9,50,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['Competitive Programming', 'Java / C++', 'Data Structures', 'Algorithms', 'Cloud'],
      eligibility: 'Outstanding coding performance in HackWithInfy or strong competitive programming rating.',
      responsibilities: [
        'Develop polyglot microservices architectures.',
        'Architect resilient and scalable enterprise applications on public cloud.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
    {
      title: 'React.js Frontend Developer Intern',
      description:
        'Build dynamic, accessible, and high-performance customer portals and internal tools using modern React, Tailwind, and REST APIs.',
      type: 'Internship',
      category: 'Web Development',
      companyId: infosys._id,
      recruiterId: recruiter2._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      experience: 'College Student (Final / Pre-final Year)',
      skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
      eligibility: 'B.Tech / BCA / MCA / B.Sc (2024 / 2025 / 2026 Batch) with minimum 60% aggregate.',
      responsibilities: [
        'Develop reusable component libraries in React.js.',
        'Integrate REST APIs and manage application state.',
      ],
      deadline: thirtyDaysFromNow,
      status: 'Active',
    },

    // Accenture
    {
      title: 'Associate Software Engineer (ASE - Graduate Trainee)',
      description:
        'Accenture is hiring Associate Software Engineers. You will design, develop, and maintain software programs across Cloud, Security, SAP, and Modern Web architectures.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: accenture._id,
      recruiterId: recruiter1._id,
      location: 'Hyderabad, Telangana',
      workMode: 'Hybrid',
      salary: '₹4,80,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['Java', 'C++', 'Python', 'SQL', 'Cloud Fundamentals', 'Agile'],
      eligibility: 'B.E./B.Tech/MCA/M.Sc all branches with 65% or 6.5 CGPA and no active backlogs.',
      responsibilities: [
        'Collaborate in cross-functional agile teams to deliver client digital solutions.',
        'Write modular code, perform unit testing, and resolve software defects.',
      ],
      deadline: sixtyDaysFromNow,
      status: 'Active',
    },
    {
      title: 'Generative AI & Data Analytics Intern',
      description:
        'Explore real-world enterprise implementations of Generative AI, RAG pipelines, and automated intelligence at Accenture Innovation Center.',
      type: 'Internship',
      category: 'AI & Data Science',
      companyId: accenture._id,
      recruiterId: recruiter1._id,
      location: 'Delhi NCR',
      workMode: 'Hybrid',
      stipend: '₹30,000 / month',
      duration: '6 Months',
      experience: 'Pre-final / Final Year Student',
      skills: ['Generative AI', 'Python', 'LangChain', 'OpenAI APIs', 'Vector Databases', 'Pandas'],
      eligibility: 'Engineering students with solid grasp of Python and practical projects in LLMs/NLP.',
      responsibilities: [
        'Build proof-of-concept AI agents using LangChain and Vector databases.',
        'Evaluate prompt performance and model safety guardrails.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },

    // Wipro
    {
      title: 'Wipro Elite Graduate Trainee Engineer',
      description:
        'Join Wipro Elite National Talent Hunt. As a Project Engineer, you will undergo rigorous corporate technical training before being mapped to global digital accounts.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: wipro._id,
      recruiterId: recruiter1._id,
      location: 'Bengaluru, Karnataka',
      workMode: 'Hybrid',
      salary: '₹4,20,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['Python', 'Java', 'SQL', 'Operating Systems', 'Networking'],
      eligibility: 'B.E./B.Tech/5-year Integrated-M.Tech with 60% or 6.0 CGPA throughout 10th, 12th, and graduation.',
      responsibilities: [
        'Develop software components following engineering best practices.',
        'Automate testing protocols and maintain technical documentation.',
      ],
      deadline: sixtyDaysFromNow,
      status: 'Active',
    },

    // Tech Mahindra
    {
      title: 'Graduate Engineer Trainee - 5G & Telecom Software',
      description:
        'Work on next-generation telecom software, network automation, and cloud-native 5G systems for major global telecom operators.',
      type: 'Full-time',
      category: 'Software Engineering',
      companyId: techMahindra._id,
      recruiterId: recruiter1._id,
      location: 'Pune, Maharashtra',
      workMode: 'Hybrid',
      salary: '₹5,00,000 / year',
      experience: 'Fresher (2024 / 2025 Batch)',
      skills: ['C++', 'Linux', 'Networking Protocols', 'Python', 'Telecom Domain'],
      eligibility: 'B.Tech in CS/IT/ECE/EEE with minimum 65% aggregate.',
      responsibilities: [
        'Implement protocol testing and automated deployment for 5G network functions.',
        'Debug network signaling logs and optimize throughput.',
      ],
      deadline: fortyFiveDaysFromNow,
      status: 'Active',
    },
  ];

  await Job.insertMany(jobsData);
};

module.exports = autoSeed;
