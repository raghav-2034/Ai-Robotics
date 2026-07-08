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
    chapters: [
      {
        id: 'chapter-1',
        number: 1,
        title: 'Meet Miko the Robot',
        description: 'Discover what a robot is, identify their parts, and learn how they are different from humans and toys.',
        readingTime: 10,
        learningObjectives: [
          'Identify what a robot is and what it does.',
          'Name the basic parts of Miko the robot (Sensors, Brain, Motors).',
          'Distinguish between a living being, a mechanical toy, and a smart robot.'
        ],
        summary: [
          'Robots are special smart machines made by humans to perform tasks.',
          'Miko has sensors to see/feel, a computer brain to think, and motors to move around.',
          'Unlike simple toys, robots can make decisions based on what their sensors tell them.'
        ],
        sections: [
          {
            id: '1-1',
            title: 'Who is Miko?',
            content: [
              {
                id: '1-1-1',
                type: 'story',
                story: {
                  character: 'Miko',
                  dialogue: 'Hello, friends! I am Miko, a smart robotic puppy. I have a computer for a brain, cameras for eyes, and wheels for paws. I love learning new things and helping out around the classroom! Can you spot my flashing blue eyes?',
                  context: 'Miko rolls up to the students, greeting them with a cheerful beep.'
                }
              },
              {
                id: '1-1-2',
                type: 'text',
                text: 'A robot is a machine that can do work on its own. While a teddy bear is a soft toy and a microwave is a kitchen machine, Miko is a robot because Miko can sense things, make choices, and move!'
              },
              {
                id: '1-1-3',
                type: 'robot-fact',
                robotFact: {
                  mascot: 'robo-guide',
                  fact: 'Did you know? The word "robot" comes from a play written over 100 years ago! It means "hard work" or "forced labor," but today, robots are our friendly helpers.'
                }
              },
              {
                id: '1-1-4',
                type: 'vocabulary',
                vocabulary: {
                  term: 'Robot',
                  definition: 'A smart machine that can gather information from its surroundings, make decisions, and perform tasks.',
                  pronunciation: 'Roh-bot',
                  exampleSentence: 'Miko is a helper robot that cleans the library floors.'
                }
              }
            ]
          },
          {
            id: '1-2',
            title: 'How Miko Thinks and Moves',
            content: [
              {
                id: '1-2-1',
                type: 'text',
                text: 'Just like we use our eyes, ears, and hands to feel the world, robots use special tools called sensors. Let us see how Miko uses its parts to play!'
              },
              {
                id: '1-2-2',
                type: 'did-you-know',
                title: 'Robot Senses',
                text: 'Robots do not have eyes like us, but they have cameras. They do not have ears, but they have microphones. These are called sensors, and they help the robot learn about its surroundings.'
              },
              {
                id: '1-2-3',
                type: 'activity',
                activity: {
                  title: 'Sensory Match-up',
                  duration: '5 mins',
                  type: 'pair',
                  instructions: [
                    'Point to your eyes and ask your partner: What is Miko\'s equivalent? (Camera)',
                    'Point to your ears and ask: What is Miko\'s equivalent? (Microphone)',
                    'Wave your hand and see if Miko can detect you!'
                  ]
                }
              },
              {
                id: '1-2-4',
                type: 'quiz',
                quiz: {
                  question: 'Which part of the robot acts like its brain?',
                  options: [
                    'The wheels and motors',
                    'The computer chip inside',
                    'The plastic outer shell',
                    'The battery pack'
                  ],
                  correctOptionIndex: 1,
                  explanation: 'The computer chip processes all the information and tells the robot what to do, acting exactly like a brain!'
                }
              }
            ]
          },
          {
            id: '1-3',
            title: 'Hands-on Fun',
            content: [
              {
                id: '1-3-1',
                type: 'challenge',
                title: 'Help Miko Find the Ball',
                text: 'Imagine Miko is in a dark room and needs to find a red ball. What sensor does Miko need to turn on? Write down or draw your answer!'
              },
              {
                id: '1-3-2',
                type: 'mini-project',
                miniProject: {
                  title: 'Design Your Own Robot Helper',
                  duration: '15 mins',
                  materials: [
                    'Drawing paper',
                    'Crayons or colored markers',
                    'Your creative imagination!'
                  ],
                  steps: [
                    'Think of a chore you dislike doing (like cleaning your room or watering plants).',
                    'Draw a robot that can do this chore for you.',
                    'Label the sensors (eyes/ears) and motors (wheels/arms) on your robot.',
                    'Give your robot a cute helper name!'
                  ],
                  expectedOutput: 'A colorful drawing of your custom helper robot with labelled sensors and parts.'
                }
              },
              {
                id: '1-3-3',
                type: 'teacher-note',
                teacherNote: {
                  pedagogyTip: 'For Class 1 students, emphasize concrete physical analogies. Guide them by asking them to compare their body parts to robotic parts.',
                  classroomActivity: 'Have students pretend to be robots. The teacher gives inputs (e.g. "Clap if you see a red card") to simulate sensors and logic.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'chapter-2',
        number: 2,
        title: 'Robots in Our World',
        description: 'Explore where robots live and work—from factories and hospitals to out in deep space.',
        readingTime: 12,
        learningObjectives: [
          'Recognize robots in daily environments (home, supermarkets, schools).',
          'Describe how robots help doctors and firefighters in dangerous situations.',
          'Understand that robots go where humans cannot easily reach, like Mars!'
        ],
        summary: [
          'Robots can help humans in many different places.',
          'They perform jobs that are too dangerous, dirty, or repetitive for humans.',
          'Exploration robots like Mars Rovers send back photos of other planets.'
        ],
        sections: [
          {
            id: '2-1',
            title: 'Robots at Home and School',
            content: [
              {
                id: '2-1-1',
                type: 'text',
                text: 'Robots are not just in laboratories. Many of them are already around us! Let us look at some robots you might have seen.'
              },
              {
                id: '2-1-2',
                type: 'vocabulary',
                vocabulary: {
                  term: 'Autonomous',
                  definition: 'Capable of acting or operating independently without direct human control.',
                  pronunciation: 'Aw-ton-o-mus',
                  exampleSentence: 'A robotic vacuum cleaner is autonomous because it cleans the floor by itself.'
                }
              },
              {
                id: '2-1-3',
                type: 'robot-fact',
                robotFact: {
                  mascot: 'ai-buddy',
                  fact: 'Smart vacuum cleaners use light sensors called LiDAR to map your living room so they do not bump into chairs!'
                }
              }
            ]
          }
        ]
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
    chapters: [
      {
        id: 'chapter-1',
        number: 1,
        title: 'Introduction to Artificial Intelligence',
        description: 'Understand the core paradigms of AI, differentiate between symbolic and connectionist approaches, and analyze the ethical impacts of autonomous decision making.',
        readingTime: 20,
        learningObjectives: [
          'Analyze the mathematical difference between classical programming and machine learning.',
          'Distinguish between Supervised, Unsupervised, and Reinforcement Learning.',
          'Evaluate real-world AI applications and their ethical implications on privacy and labor.'
        ],
        summary: [
          'AI systems simulate human cognitive functions through data-driven mathematical models.',
          'Traditional coding translates rules into outputs, whereas ML models translate data and labels into rules.',
          'The ethical deployment of AI requires careful consideration of bias, transparency, and accountability.'
        ],
        sections: [
          {
            id: '1-1',
            title: 'What makes an AI Intelligent?',
            content: [
              {
                id: '1-1-1',
                type: 'text',
                text: 'At its core, Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction.'
              },
              {
                id: '1-1-2',
                type: 'did-you-know',
                title: 'The Turing Test',
                text: 'Proposed by Alan Turing in 1950, the Turing Test evaluates a machine\'s ability to exhibit intelligent behavior indistinguishable from that of a human. If an evaluator cannot reliably tell the machine from the human in text conversations, the machine passes the test!'
              },
              {
                id: '1-1-3',
                type: 'quiz',
                quiz: {
                  question: 'In Machine Learning, what is the mathematical goal of training a model?',
                  options: [
                    'To hardcode every possible combination of inputs and outputs.',
                    'To find a function that maps inputs to outputs with minimal error.',
                    'To compress the input file sizes for faster transmission.',
                    'To eliminate the need for an operating system.'
                  ],
                  correctOptionIndex: 1,
                  explanation: 'Training an ML model is essentially optimization: finding a mapping function (often represented by weights in a neural network) that minimizes a loss function representing the error of predictions.'
                }
              }
            ]
          },
          {
            id: '1-2',
            title: 'Paradigms of Machine Learning',
            content: [
              {
                id: '1-2-1',
                type: 'text',
                text: 'Machine Learning algorithms are categorized based on how they learn. Let\'s explore the three main methodologies.'
              },
              {
                id: '1-2-2',
                type: 'vocabulary',
                vocabulary: {
                  term: 'Gradient Descent',
                  definition: 'An optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent as defined by the negative of the gradient.',
                  pronunciation: 'Gray-dee-ent Dee-sent',
                  exampleSentence: 'Neural networks use gradient descent during backpropagation to update their weights and reduce loss.'
                }
              },
              {
                id: '1-2-3',
                type: 'activity',
                activity: {
                  title: 'Reinforcement Learning Simulation',
                  duration: '15 mins',
                  type: 'individual',
                  instructions: [
                    'Imagine training a virtual robot dog to walk across a bridge.',
                    'Define the reward (+10 points for forward step, -5 for falling, -1 for standing still).',
                    'Write a brief pseudocode block outlining the training loop where the policy is updated based on cumulative rewards.'
                  ]
                }
              },
              {
                id: '1-2-4',
                type: 'mini-project',
                miniProject: {
                  title: 'Classification Model Outline',
                  duration: '30 mins',
                  materials: [
                    'Pen, paper, or text editor',
                    'Access to a simple dataset (e.g. house features vs prices)'
                  ],
                  steps: [
                    'Select 3 parameters of a house (square footage, bedrooms, age).',
                    'Establish a heuristic threshold to classify the house as "Luxury" or "Standard".',
                    'Formulate a simple linear regression equation (y = w1x1 + w2x2 + w3x3 + b) and guess appropriate starting weights.',
                    'Perform manual calculation for one data point and describe how you would adjust the weights if the prediction was wrong.'
                  ],
                  expectedOutput: 'A complete mathematical model formulation with test calculations and manual weight update descriptions.'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  // Add shell structures for Classes 2-8 to satisfy routing / library listing
  ...Array.from({ length: 7 }, (_, i) => {
    const grade = i + 2; // Grades 2 to 8
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
      chapters: [
        {
          id: 'chapter-1',
          number: 1,
          title: `Welcome to Class ${grade} Coursework`,
          description: `Chapter 1 foundational guidelines for Class ${grade} curriculum.`,
          readingTime: 8,
          learningObjectives: [
            `Understand the core pillars of Grade ${grade} curriculum.`,
            `Master basic tools and setup environments.`,
            `Demonstrate familiarity with interactive classroom modules.`
          ],
          summary: [
            `Grade ${grade} studies introduce advanced methodologies.`,
            `Collaboration and structured analysis are emphasized.`,
            `Practical exploration forms the basis of evaluation.`
          ],
          sections: [
            {
              id: '1-1',
              title: 'Getting Started',
              content: [
                {
                  id: '1-1-1',
                  type: 'text' as const,
                  text: `Welcome to Class ${grade} Textbook. This course is designed to take your skills to the next level. Let's begin by reviewing the syllabus and learning objectives.`
                },
                {
                  id: '1-1-2',
                  type: 'robot-fact' as const,
                  robotFact: {
                    mascot: 'circuit-chum' as const,
                    fact: `Robotics engineer tip: Always double check your power source before turning on your microcontrollers!`
                  }
                },
                {
                  id: '1-1-3',
                  type: 'quiz' as const,
                  quiz: {
                    question: 'What is the main learning method of this class?',
                    options: [
                      'Rote memorization',
                      'Hands-on experimental learning',
                      'Listening only to lectures',
                      'Doing homework without feedback'
                    ],
                    correctOptionIndex: 1,
                    explanation: 'This platform emphasizes interactive, project-based experimental learning to build strong problem solving skills.'
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  })
];

export const getBookByClassId = (classId: string) => {
  return BOOKS.find((b) => b.classId === classId);
};

export const getChapterById = (book: Book, chapterId: string) => {
  return book.chapters.find((c) => c.id === chapterId);
};
