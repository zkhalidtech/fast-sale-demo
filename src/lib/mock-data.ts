import {
  Course,
  EnrolledCourse,
  Certificate,
  Testimonial,
  AdminStats,
  MonthlyData,
  RecentEnrollment,
} from "@/types";

export const courses: Course[] = [
  {
    id: "1",
    title: "Mastering the Auto Sales Process",
    description:
      "Learn the complete automotive sales process from greeting to delivery. This comprehensive course covers every step a successful auto sales professional needs to master, including building rapport, needs analysis, vehicle presentation, test drives, negotiation, and closing techniques used by top performers.",
    instructor: "Michael Torres",
    instructorRole: "Former GM of Lexus Dealership, 20+ years experience",
    price: 299,
    category: "Auto Sales",
    level: "Beginner",
    duration: "8 hours",
    studentsEnrolled: 2847,
    rating: 4.9,
    thumbnail: "bg-gradient-to-br from-navy to-navy-light",
    learningOutcomes: [
      "Master the 10-step automotive sales process",
      "Build instant rapport with every customer",
      "Conduct effective needs analysis interviews",
      "Deliver compelling vehicle presentations",
      "Handle objections with confidence",
      "Close deals using proven techniques",
    ],
    curriculum: [
      {
        id: "m1",
        title: "The Modern Auto Sales Landscape",
        lessons: [
          { id: "l1", title: "Welcome & Course Overview", type: "video", duration: "12 min" },
          { id: "l2", title: "The Evolution of Car Buying", type: "video", duration: "18 min" },
          { id: "l3", title: "Understanding Today's Customer", type: "reading", duration: "10 min" },
          { id: "l4", title: "Module 1 Quiz", type: "quiz", duration: "5 min" },
        ],
      },
      {
        id: "m2",
        title: "Building Rapport & Needs Analysis",
        lessons: [
          { id: "l5", title: "First Impressions That Sell", type: "video", duration: "15 min" },
          { id: "l6", title: "The Art of Active Listening", type: "video", duration: "20 min" },
          { id: "l7", title: "Needs Analysis Framework", type: "video", duration: "22 min" },
          { id: "l8", title: "Practice Scenarios", type: "quiz", duration: "10 min" },
        ],
      },
      {
        id: "m3",
        title: "Vehicle Presentation & Test Drive",
        lessons: [
          { id: "l9", title: "Feature-Benefit Selling", type: "video", duration: "18 min" },
          { id: "l10", title: "The Walk-Around Technique", type: "video", duration: "25 min" },
          { id: "l11", title: "Conducting the Perfect Test Drive", type: "video", duration: "20 min" },
        ],
      },
      {
        id: "m4",
        title: "Negotiation & Closing",
        lessons: [
          { id: "l12", title: "Overcoming Price Objections", type: "video", duration: "22 min" },
          { id: "l13", title: "Closing Techniques That Work", type: "video", duration: "25 min" },
          { id: "l14", title: "The Delivery Process", type: "video", duration: "15 min" },
          { id: "l15", title: "Final Assessment", type: "quiz", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "F&I Manager Certification Program",
    description:
      "Complete Finance & Insurance training for automotive professionals. Learn compliance, product presentation, menu selling, and how to maximize per-vehicle revenue while maintaining customer satisfaction and regulatory compliance.",
    instructor: "Sarah Chen",
    instructorRole: "F&I Director, 15+ years multi-brand experience",
    price: 499,
    category: "F&I Training",
    level: "Intermediate",
    duration: "12 hours",
    studentsEnrolled: 1523,
    rating: 4.8,
    thumbnail: "bg-gradient-to-br from-emerald-700 to-emerald-500",
    learningOutcomes: [
      "Understand all F&I product offerings",
      "Master compliant disclosure practices",
      "Implement effective menu selling techniques",
      "Maximize PVR while maintaining CSI scores",
      "Navigate state and federal regulations",
      "Build long-term customer relationships",
    ],
    curriculum: [
      {
        id: "m1",
        title: "F&I Fundamentals",
        lessons: [
          { id: "l1", title: "Role of the F&I Manager", type: "video", duration: "15 min" },
          { id: "l2", title: "Understanding the Deal Jacket", type: "video", duration: "20 min" },
          { id: "l3", title: "Compliance Essentials", type: "reading", duration: "15 min" },
        ],
      },
      {
        id: "m2",
        title: "Product Knowledge",
        lessons: [
          { id: "l4", title: "Extended Service Contracts", type: "video", duration: "25 min" },
          { id: "l5", title: "GAP Insurance & Protection Products", type: "video", duration: "20 min" },
          { id: "l6", title: "Product Knowledge Quiz", type: "quiz", duration: "10 min" },
        ],
      },
      {
        id: "m3",
        title: "Menu Selling Mastery",
        lessons: [
          { id: "l7", title: "The Menu Presentation Process", type: "video", duration: "30 min" },
          { id: "l8", title: "Handling F&I Objections", type: "video", duration: "20 min" },
          { id: "l9", title: "Practice Presentations", type: "quiz", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Auto Broker Business Masterclass",
    description:
      "Launch and grow a successful auto brokerage business. From licensing requirements to building dealer relationships, this course provides the complete roadmap to becoming a profitable auto broker.",
    instructor: "David Park",
    instructorRole: "Licensed Auto Broker, $50M+ in annual transactions",
    price: 599,
    category: "Auto Broker",
    level: "Advanced",
    duration: "15 hours",
    studentsEnrolled: 892,
    rating: 4.7,
    thumbnail: "bg-gradient-to-br from-violet-700 to-violet-500",
    learningOutcomes: [
      "Understand licensing requirements by state",
      "Build profitable dealer relationships",
      "Master vehicle sourcing and pricing",
      "Create effective marketing strategies",
      "Handle transactions from start to finish",
      "Scale your brokerage business",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Getting Started as an Auto Broker",
        lessons: [
          { id: "l1", title: "What is Auto Brokering?", type: "video", duration: "15 min" },
          { id: "l2", title: "Licensing & Legal Requirements", type: "video", duration: "25 min" },
          { id: "l3", title: "Setting Up Your Business", type: "reading", duration: "20 min" },
        ],
      },
      {
        id: "m2",
        title: "Dealer Relationships & Sourcing",
        lessons: [
          { id: "l4", title: "Building Dealer Networks", type: "video", duration: "20 min" },
          { id: "l5", title: "Vehicle Sourcing Strategies", type: "video", duration: "25 min" },
          { id: "l6", title: "Pricing & Margins", type: "video", duration: "18 min" },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Dealership Leadership Academy",
    description:
      "Develop the leadership skills needed to manage and grow a successful dealership. Covers team building, performance management, culture development, and strategic planning for automotive retail leaders.",
    instructor: "Jennifer Walsh",
    instructorRole: "Dealer Principal, Multi-rooftop operator",
    price: 449,
    category: "Leadership",
    level: "Advanced",
    duration: "10 hours",
    studentsEnrolled: 1105,
    rating: 4.8,
    thumbnail: "bg-gradient-to-br from-rose-700 to-rose-500",
    learningOutcomes: [
      "Build high-performing sales teams",
      "Implement effective performance metrics",
      "Create a winning dealership culture",
      "Master strategic planning for automotive retail",
      "Develop coaching and mentoring skills",
      "Drive profitability through leadership",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Leadership Foundations",
        lessons: [
          { id: "l1", title: "Leadership in Automotive Retail", type: "video", duration: "20 min" },
          { id: "l2", title: "Building Your Leadership Style", type: "video", duration: "18 min" },
          { id: "l3", title: "Self-Assessment", type: "quiz", duration: "10 min" },
        ],
      },
      {
        id: "m2",
        title: "Team Building & Performance",
        lessons: [
          { id: "l4", title: "Hiring Top Talent", type: "video", duration: "22 min" },
          { id: "l5", title: "Performance Management Systems", type: "video", duration: "25 min" },
          { id: "l6", title: "Coaching for Results", type: "video", duration: "20 min" },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Automotive Compliance Essentials",
    description:
      "Stay compliant with federal and state regulations in automotive sales. Covers TILA, ECOA, FCRA, FTC Safeguards Rule, and state-specific requirements every dealership must follow.",
    instructor: "Robert Kim",
    instructorRole: "Automotive Compliance Attorney, 18+ years",
    price: 249,
    category: "Compliance",
    level: "Intermediate",
    duration: "6 hours",
    studentsEnrolled: 3210,
    rating: 4.6,
    thumbnail: "bg-gradient-to-br from-sky-700 to-sky-500",
    learningOutcomes: [
      "Understand key federal regulations (TILA, ECOA, FCRA)",
      "Implement FTC Safeguards Rule requirements",
      "Maintain compliant advertising practices",
      "Handle customer data properly",
      "Avoid common compliance pitfalls",
      "Create a compliance culture at your dealership",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Regulatory Overview",
        lessons: [
          { id: "l1", title: "The Compliance Landscape", type: "video", duration: "15 min" },
          { id: "l2", title: "TILA & Truth in Lending", type: "video", duration: "25 min" },
          { id: "l3", title: "ECOA & Fair Lending", type: "video", duration: "20 min" },
        ],
      },
      {
        id: "m2",
        title: "Data Security & Privacy",
        lessons: [
          { id: "l4", title: "FTC Safeguards Rule", type: "video", duration: "22 min" },
          { id: "l5", title: "Customer Data Handling", type: "video", duration: "18 min" },
          { id: "l6", title: "Compliance Quiz", type: "quiz", duration: "10 min" },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Digital Retailing for Auto Sales",
    description:
      "Master the art of selling vehicles in the digital age. Learn how to leverage online tools, social media, and digital retailing platforms to connect with today's tech-savvy car buyers.",
    instructor: "Alex Rivera",
    instructorRole: "Digital Sales Director, Top 100 Dealer Group",
    price: 349,
    category: "Auto Sales",
    level: "Intermediate",
    duration: "7 hours",
    studentsEnrolled: 1876,
    rating: 4.7,
    thumbnail: "bg-gradient-to-br from-cyan-700 to-cyan-500",
    learningOutcomes: [
      "Build an effective online sales presence",
      "Master digital retailing tools",
      "Leverage social media for lead generation",
      "Handle internet leads effectively",
      "Create compelling digital vehicle presentations",
      "Measure and optimize digital performance",
    ],
    curriculum: [
      {
        id: "m1",
        title: "The Digital Customer Journey",
        lessons: [
          { id: "l1", title: "How Customers Shop for Cars Online", type: "video", duration: "18 min" },
          { id: "l2", title: "Your Digital Presence", type: "video", duration: "22 min" },
          { id: "l3", title: "Digital Tools Overview", type: "reading", duration: "12 min" },
        ],
      },
      {
        id: "m2",
        title: "Social Media & Lead Generation",
        lessons: [
          { id: "l4", title: "Social Media Strategies", type: "video", duration: "20 min" },
          { id: "l5", title: "Lead Response Best Practices", type: "video", duration: "18 min" },
          { id: "l6", title: "Converting Online Leads", type: "video", duration: "25 min" },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "Used Vehicle Appraisal & Acquisition",
    description:
      "Learn professional vehicle appraisal techniques and used car acquisition strategies. Understand market pricing, condition grading, reconditioning decisions, and auction buying.",
    instructor: "Carlos Mendez",
    instructorRole: "Used Car Director, 22 years experience",
    price: 379,
    category: "Auto Sales",
    level: "Intermediate",
    duration: "9 hours",
    studentsEnrolled: 1432,
    rating: 4.8,
    thumbnail: "bg-gradient-to-br from-orange-700 to-orange-500",
    learningOutcomes: [
      "Conduct thorough vehicle appraisals",
      "Understand market pricing dynamics",
      "Make profitable acquisition decisions",
      "Master auction buying strategies",
      "Evaluate reconditioning costs effectively",
      "Build a profitable used car inventory",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Appraisal Fundamentals",
        lessons: [
          { id: "l1", title: "The Appraisal Process", type: "video", duration: "20 min" },
          { id: "l2", title: "Condition Grading Standards", type: "video", duration: "25 min" },
          { id: "l3", title: "Market Pricing Tools", type: "video", duration: "18 min" },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "Customer Experience Excellence",
    description:
      "Transform your dealership's customer experience from average to exceptional. Learn the strategies that drive CSI scores, repeat business, and referrals in automotive retail.",
    instructor: "Lisa Thompson",
    instructorRole: "CX Consultant, JD Power Award-winning programs",
    price: 279,
    category: "Leadership",
    level: "Beginner",
    duration: "5 hours",
    studentsEnrolled: 2156,
    rating: 4.9,
    thumbnail: "bg-gradient-to-br from-pink-700 to-pink-500",
    learningOutcomes: [
      "Map the complete customer journey",
      "Identify and eliminate friction points",
      "Build a customer-centric culture",
      "Implement effective follow-up systems",
      "Measure and improve CSI scores",
      "Drive referrals through experience",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Customer Experience Basics",
        lessons: [
          { id: "l1", title: "Why CX Matters in Automotive", type: "video", duration: "15 min" },
          { id: "l2", title: "Mapping the Customer Journey", type: "video", duration: "22 min" },
          { id: "l3", title: "CX Self-Assessment", type: "quiz", duration: "10 min" },
        ],
      },
    ],
  },
  {
    id: "9",
    title: "Advanced Negotiation Strategies",
    description:
      "Take your negotiation skills to the next level with advanced techniques specifically designed for automotive sales. Learn psychology-based approaches that create win-win outcomes.",
    instructor: "Michael Torres",
    instructorRole: "Former GM of Lexus Dealership, 20+ years experience",
    price: 349,
    category: "Auto Sales",
    level: "Advanced",
    duration: "6 hours",
    studentsEnrolled: 1678,
    rating: 4.7,
    thumbnail: "bg-gradient-to-br from-indigo-700 to-indigo-500",
    learningOutcomes: [
      "Apply psychology-based negotiation techniques",
      "Handle difficult customer situations",
      "Negotiate trade-in values effectively",
      "Master payment-focused selling",
      "Create win-win deal structures",
      "Maintain margins under pressure",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Advanced Negotiation Psychology",
        lessons: [
          { id: "l1", title: "The Psychology of Buying", type: "video", duration: "20 min" },
          { id: "l2", title: "Anchoring & Framing", type: "video", duration: "25 min" },
          { id: "l3", title: "Advanced Objection Handling", type: "video", duration: "22 min" },
        ],
      },
    ],
  },
  {
    id: "10",
    title: "EV Sales Specialist Certification",
    description:
      "Become an expert in electric vehicle sales. Understand EV technology, charging infrastructure, incentives, and the unique selling points that help customers make the switch to electric.",
    instructor: "Sarah Chen",
    instructorRole: "F&I Director, 15+ years multi-brand experience",
    price: 399,
    category: "Auto Sales",
    level: "Intermediate",
    duration: "8 hours",
    studentsEnrolled: 2341,
    rating: 4.8,
    thumbnail: "bg-gradient-to-br from-green-700 to-green-500",
    learningOutcomes: [
      "Understand EV technology and terminology",
      "Explain charging options and infrastructure",
      "Navigate EV tax credits and incentives",
      "Address common EV objections",
      "Compare EV total cost of ownership",
      "Deliver compelling EV test drives",
    ],
    curriculum: [
      {
        id: "m1",
        title: "EV Technology Fundamentals",
        lessons: [
          { id: "l1", title: "How EVs Work", type: "video", duration: "20 min" },
          { id: "l2", title: "Battery Technology & Range", type: "video", duration: "25 min" },
          { id: "l3", title: "Charging Infrastructure", type: "video", duration: "18 min" },
        ],
      },
    ],
  },
  {
    id: "11",
    title: "F&I Compliance Deep Dive",
    description:
      "An advanced compliance course specifically for F&I managers covering adverse action notices, rate markup policies, ancillary product disclosures, and audit preparation.",
    instructor: "Robert Kim",
    instructorRole: "Automotive Compliance Attorney, 18+ years",
    price: 349,
    category: "F&I Training",
    level: "Advanced",
    duration: "8 hours",
    studentsEnrolled: 987,
    rating: 4.6,
    thumbnail: "bg-gradient-to-br from-teal-700 to-teal-500",
    learningOutcomes: [
      "Master adverse action notice requirements",
      "Implement compliant rate markup policies",
      "Ensure proper product disclosures",
      "Prepare for compliance audits",
      "Handle consumer complaints properly",
      "Build an F&I compliance checklist",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Advanced F&I Compliance",
        lessons: [
          { id: "l1", title: "Adverse Action Notices", type: "video", duration: "25 min" },
          { id: "l2", title: "Rate Markup & Dealer Reserve", type: "video", duration: "22 min" },
          { id: "l3", title: "Compliance Case Studies", type: "reading", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "12",
    title: "Building a Broker Referral Network",
    description:
      "Learn how to build and manage a referral network that generates consistent deal flow for your auto brokerage. Covers CRM systems, partner relationships, and marketing automation.",
    instructor: "David Park",
    instructorRole: "Licensed Auto Broker, $50M+ in annual transactions",
    price: 299,
    category: "Auto Broker",
    level: "Intermediate",
    duration: "5 hours",
    studentsEnrolled: 654,
    rating: 4.5,
    thumbnail: "bg-gradient-to-br from-amber to-amber-light",
    learningOutcomes: [
      "Build a systematic referral network",
      "Implement CRM for broker operations",
      "Create effective marketing funnels",
      "Develop strategic partnerships",
      "Automate follow-up processes",
      "Measure and optimize referral performance",
    ],
    curriculum: [
      {
        id: "m1",
        title: "Referral Network Basics",
        lessons: [
          { id: "l1", title: "The Power of Referrals", type: "video", duration: "15 min" },
          { id: "l2", title: "Building Your Network", type: "video", duration: "22 min" },
          { id: "l3", title: "CRM Setup & Management", type: "video", duration: "20 min" },
        ],
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Rodriguez",
    role: "General Manager",
    company: "Pacific Coast Honda",
    quote:
      "Fast Sales Training Center transformed our dealership. Our team's closing rate increased by 32% within three months of completing the Auto Sales Process course. The ROI has been incredible.",
    initials: "JR",
  },
  {
    id: "2",
    name: "Amanda Foster",
    role: "F&I Director",
    company: "Midwest Auto Group",
    quote:
      "The F&I certification program is the most comprehensive training I've seen in 15 years. Our PVR went up $400 per deal while maintaining top CSI scores. Every F&I manager should take this course.",
    initials: "AF",
  },
  {
    id: "3",
    name: "Kevin Nakamura",
    role: "Dealer Principal",
    company: "Nakamura Automotive",
    quote:
      "We enrolled our entire sales team in the platform. The leadership and compliance courses have helped us build a culture of excellence. Fast Sales is now our go-to training partner.",
    initials: "KN",
  },
];

export const enrolledCourses: EnrolledCourse[] = [
  {
    courseId: "1",
    course: courses[0],
    progress: 68,
    currentModuleIndex: 2,
    currentLessonIndex: 1,
    enrolledDate: "2025-12-15",
    lastAccessed: "2026-03-16",
  },
  {
    courseId: "2",
    course: courses[1],
    progress: 35,
    currentModuleIndex: 1,
    currentLessonIndex: 0,
    enrolledDate: "2026-01-20",
    lastAccessed: "2026-03-14",
  },
  {
    courseId: "5",
    course: courses[4],
    progress: 100,
    currentModuleIndex: 1,
    currentLessonIndex: 2,
    enrolledDate: "2025-10-05",
    lastAccessed: "2025-12-20",
  },
  {
    courseId: "6",
    course: courses[5],
    progress: 12,
    currentModuleIndex: 0,
    currentLessonIndex: 1,
    enrolledDate: "2026-03-01",
    lastAccessed: "2026-03-10",
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    courseTitle: "Automotive Compliance Essentials",
    completedDate: "2025-12-20",
    credentialId: "FSTC-COMP-2025-4821",
  },
];

export const adminStats: AdminStats = {
  totalRevenue: 284750,
  totalEnrollments: 1247,
  activeLearners: 834,
  completionRate: 72,
  revenueChange: 12.5,
  enrollmentChange: 8.3,
  learnersChange: 15.2,
  completionChange: 3.1,
};

export const monthlyData: MonthlyData[] = [
  { month: "Apr", revenue: 18200, enrollments: 78 },
  { month: "May", revenue: 21500, enrollments: 92 },
  { month: "Jun", revenue: 19800, enrollments: 85 },
  { month: "Jul", revenue: 24100, enrollments: 103 },
  { month: "Aug", revenue: 22700, enrollments: 97 },
  { month: "Sep", revenue: 26300, enrollments: 112 },
  { month: "Oct", revenue: 25100, enrollments: 108 },
  { month: "Nov", revenue: 23400, enrollments: 101 },
  { month: "Dec", revenue: 21800, enrollments: 94 },
  { month: "Jan", revenue: 27500, enrollments: 118 },
  { month: "Feb", revenue: 29200, enrollments: 125 },
  { month: "Mar", revenue: 31400, enrollments: 134 },
];

export const recentEnrollments: RecentEnrollment[] = [
  { id: "e1", learnerName: "Maria Santos", email: "msantos@dealer.com", courseName: "Mastering the Auto Sales Process", date: "2026-03-17", amount: 299 },
  { id: "e2", learnerName: "Tyler Johnson", email: "tjohnson@autogroup.com", courseName: "F&I Manager Certification Program", date: "2026-03-17", amount: 499 },
  { id: "e3", learnerName: "Priya Patel", email: "ppatel@motors.com", courseName: "EV Sales Specialist Certification", date: "2026-03-16", amount: 399 },
  { id: "e4", learnerName: "Chris Okafor", email: "cokafor@dealer.com", courseName: "Dealership Leadership Academy", date: "2026-03-16", amount: 449 },
  { id: "e5", learnerName: "Anna Kowalski", email: "akowalski@auto.com", courseName: "Automotive Compliance Essentials", date: "2026-03-15", amount: 249 },
  { id: "e6", learnerName: "Derek Chang", email: "dchang@group.com", courseName: "Digital Retailing for Auto Sales", date: "2026-03-15", amount: 349 },
  { id: "e7", learnerName: "Rachel Green", email: "rgreen@motors.com", courseName: "Auto Broker Business Masterclass", date: "2026-03-14", amount: 599 },
  { id: "e8", learnerName: "Marcus Williams", email: "mwilliams@dealer.com", courseName: "Advanced Negotiation Strategies", date: "2026-03-14", amount: 349 },
];
