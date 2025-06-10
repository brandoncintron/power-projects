import { ApplicationTypeData, SelectableCardData } from "../types/types";

export const frameworkData: ApplicationTypeData[] = [
  {
    name: "Web Application",
    categories: [
      {
        name: "Full-Stack Development",
        description:
          "Frameworks for building complete web applications with frontend and backend capabilities.",
        options: [
          {
            name: "Next.js",
            description: "A React framework for server-side rendering.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "SvelteKit",
            description:
              "A web framework powered by Svelte for high performance.",
            primaryLanguages: ["Svelte"],
          },
          {
            name: "Django",
            description: "A high-level Python framework for rapid development.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Ruby on Rails",
            description: "A web application framework written in Ruby.",
            primaryLanguages: ["Ruby"],
          },
        ],
      },
      {
        name: "Frontend Development",
        description:
          "Libraries and frameworks for the user interface of a web application.",
        options: [
          {
            name: "React",
            description: "A JavaScript library for building user interfaces.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "Angular",
            description:
              "A platform for building single-page client applications.",
            primaryLanguages: ["TypeScript"],
          },
          {
            name: "Vue.js",
            description:
              "A progressive framework for building user interfaces.",
            primaryLanguages: ["JavaScript"],
          },
        ],
      },
      {
        name: "Backend Development",
        description:
          "Frameworks for building the server-side of a web application.",
        options: [
          {
            name: "Flask",
            description: "A lightweight Python framework for APIs.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Express.js",
            description: "A fast, minimalist web framework for Node.js.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "Spring Boot",
            description: "A Java-based framework for creating microservices.",
            primaryLanguages: ["Java"],
          },
          {
            name: "FastAPI",
            description:
              "A high-performance web framework for building APIs with Python.",
            primaryLanguages: ["Python"],
          },
        ],
      },
    ],
  },
  {
    name: "Desktop Application",
    categories: [
      {
        name: "Desktop Application Frameworks",
        description:
          "Frameworks for building native desktop applications across different operating systems.",
        options: [
          {
            name: "Tkinter",
            description:
              "A built-in Python library for creating simple GUI applications.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Electron",
            description:
              "Build cross-platform desktop apps with web technologies.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "Qt",
            description:
              "A C++ framework for developing native desktop applications.",
            primaryLanguages: ["C++"],
          },
        ],
      },
    ],
  },
  {
    name: "Mobile Application",
    categories: [
      {
        name: "Cross-Platform Development",
        description:
          "Frameworks for building mobile applications that run on both Android and iOS.",
        options: [
          {
            name: "React Native",
            description: "Build native mobile apps using React and JavaScript.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "Flutter",
            description:
              "A UI toolkit for building natively compiled applications.",
            primaryLanguages: ["Dart"],
          },
          {
            name: "Kotlin Multiplatform",
            description: "Share business logic across Android and iOS.",
            primaryLanguages: ["Kotlin"],
          },
        ],
      },
      {
        name: "Native Development",
        description: "Develop applications specifically for Android or iOS.",
        options: [
          {
            name: "Swift",
            description:
              "A powerful language for developing native iOS applications.",
            primaryLanguages: ["Swift"],
          },
          {
            name: "Kotlin",
            description:
              "A modern language for developing native Android applications.",
            primaryLanguages: ["Kotlin"],
          },
        ],
      },
    ],
  },
  {
    name: "AI/ML",
    categories: [
      {
        name: "Deep Learning",
        description:
          "Frameworks for building and training complex neural networks.",
        options: [
          {
            name: "TensorFlow",
            description:
              "An open-source platform for machine learning by Google.",
            primaryLanguages: ["Python"],
          },
          {
            name: "PyTorch",
            description:
              "An open-source ML framework known for its flexibility.",
            primaryLanguages: ["Python"],
          },
        ],
      },
      {
        name: "Data Science",
        description:
          "Libraries for data manipulation, analysis, and classical ML.",
        options: [
          {
            name: "Scikit-learn",
            description: "Library for classical ML algorithms and evaluation.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Pandas",
            description: "Library for data manipulation and analysis.",
            primaryLanguages: ["Python"],
          },
        ],
      },
    ],
  },
];

export const databaseOptions: SelectableCardData[] = [
  {
    name: "PostgreSQL",
    description: "A powerful, open-source object-relational database system.",
  },
  {
    name: "MySQL",
    description:
      "A widely used, open-source relational database management system.",
  },
  {
    name: "MongoDB",
    description: "A cross-platform, document-oriented NoSQL database program.",
  },
  {
    name: "Redis",
    description:
      "An in-memory data structure store, used as a database or cache.",
  },
  {
    name: "SQLite",
    description:
      "A C-language library that implements a small, fast SQL database engine.",
  },
  {
    name: "Firebase",
    description:
      "A platform by Google for creating mobile and web applications.",
  },
];
