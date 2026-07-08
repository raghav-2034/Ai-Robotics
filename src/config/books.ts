import { Book } from '@/types/textbook';

export const BOOKS: Book[] = [
  {
    id: 'class-1-ai-robotics',
    classId: 'class-1',
    grade: 1,
    title: "Miko's Tech Adventures: Intro to AI & Robotics",
    subject: 'AI & Robotics',
    description: 'Embark on a magical journey with Miko the smart robot! Learn what robots do, what makes them smart, and how they help us every day with hands-on fun activities.',
    coverColor: 'from-blue-500 to-indigo-600',
    accentColor: 'blue',
    iconName: 'Bot',
    learningOutcomes: [
      'Understand what a robot is and how it functions.',
      'Identify sensors, computer brains, and motor parts of smart agents.',
      'Differentiate between humans, mechanical toys, and smart robots.'
    ],
    chapters: [
      {
        id: 'chapter-1',
        number: 1,
        title: 'Meet Miko the Robot',
        description: 'Discover what a robot is, identify their parts, and learn how they are different from humans and toys.',
        readingTime: 10,
        slug: 'meet-miko-the-robot',
        contentPath: 'class1/chapter1'
      },
      {
        id: 'chapter-2',
        number: 2,
        title: 'Robots in Our World',
        description: 'Explore where robots live and work—from factories and hospitals to out in deep space.',
        readingTime: 12,
        slug: 'robots-in-our-world',
        contentPath: 'class1/chapter2'
      }
    ]
  },
  {
    id: 'class-9-ai-robotics',
    classId: 'class-9',
    grade: 9,
    title: 'Foundations of AI & Robotics',
    subject: 'AI & Robotics',
    description: 'Delve into the engineering principles of modern intelligent systems. Explore kinematics, neural networks, machine learning algorithms, and sensor fusion.',
    coverColor: 'from-purple-600 to-indigo-900',
    accentColor: 'purple',
    iconName: 'Cpu',
    learningOutcomes: [
      'Understand symbolic vs. connectionist paradigms in Artificial Intelligence.',
      'Explain logic systems, neural networks, and decision machines.',
      'Evaluate ethical, societal, and economic implications of AI automation.'
    ],
    chapters: [
      {
        id: 'chapter-1',
        number: 1,
        title: 'Introduction to Artificial Intelligence',
        description: 'Understand the core paradigms of AI, differentiate between symbolic and connectionist approaches, and analyze the ethical impacts of autonomous decision making.',
        readingTime: 20,
        slug: 'introduction-to-artificial-intelligence',
        contentPath: 'class9/chapter1'
      }
    ]
  },
  // Grades 2 to 8
  ...Array.from({ length: 7 }, (_, i) => {
    const grade = i + 2;
    const subjects = ['AI & Robotics', 'Creative Code', 'Python Essentials', 'Data Explorers', 'Sensors & IoT', 'Algorithmic Worlds', 'Intro to Machine Learning'];
    const icons = ['Sparkles', 'Code', 'Terminal', 'Database', 'Activity', 'Shuffle', 'Network'];
    const colors = [
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-pink-500 to-rose-600',
      'from-cyan-500 to-blue-600',
      'from-indigo-500 to-purple-600',
      'from-red-500 to-pink-600',
      'from-teal-500 to-indigo-600'
    ];
    const subject = subjects[i];
    const iconName = icons[i];
    const coverColor = colors[i];

    return {
      id: `class-${grade}-textbook`,
      classId: `class-${grade}`,
      grade: grade,
      title: `Class ${grade}: Next-Gen ${subject}`,
      subject: 'AI & Robotics',
      description: `Comprehensive textbook for Class ${grade} covering advanced concepts in ${subject}, including interactive programming laboratories, quizzes, and digital exercises.`,
      coverColor: coverColor,
      accentColor: 'emerald',
      iconName: iconName,
      learningOutcomes: [
        `Understand key concepts of ${subject} in Class ${grade}.`,
        `Apply core methodologies to digital programming challenges.`,
        `Synthesize class knowledge into computational experiments.`
      ],
      chapters: [
        {
          id: 'chapter-1',
          number: 1,
          title: `Welcome to Class ${grade} Coursework`,
          description: `Chapter 1 foundational guidelines for Class ${grade} curriculum.`,
          readingTime: 8,
          slug: 'welcome-coursework',
          contentPath: `class${grade}/chapter1`
        }
      ]
    };
  })
];

export const getBookByClassId = (classId: string) => {
  return BOOKS.find((b) => b.classId === classId);
};
