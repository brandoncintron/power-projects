import { ApplicationTypeData, SelectableCardData } from "../types/types";

export const frameworkData: ApplicationTypeData[] = [
  {
    name: "Web Application",
    categories: [
      {
        name: "Full-Stack Development",
        description:
          "Technologies for building complete web applications with frontend and backend capabilities.",
        options: [
          {
            name: "ASP.NET Core",
            description:
              "A cross-platform, open-source framework for building modern, cloud-enabled, Internet-connected apps.",
            primaryLanguages: ["C#"],
          },
          {
            name: "Django",
            description: "A high-level Python framework for rapid development.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Laravel",
            description:
              "A PHP web application framework with expressive, elegant syntax.",
            primaryLanguages: ["PHP"],
          },
          {
            name: "Next.js",
            description:
              "A React framework for building full-stack web applications.",
            primaryLanguages: ["JavaScript", "TypeScript"],
          },
          {
            name: "Ruby on Rails",
            description: "A web application framework written in Ruby.",
            primaryLanguages: ["Ruby"],
          },
          {
            name: "SvelteKit",
            description:
              "A web framework powered by Svelte for high performance.",
            primaryLanguages: ["Svelte", "TypeScript"],
          },
        ],
      },
      {
        name: "Frontend Development",
        description:
          "Libraries and technologies for the user interface of a web application.",
        options: [
          {
            name: "Angular",
            description:
              "A platform for building single-page client applications.",
            primaryLanguages: ["TypeScript"],
          },
          {
            name: "React",
            description: "A JavaScript library for building user interfaces.",
            primaryLanguages: ["JavaScript", "TypeScript"],
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
          "Technologies for building the server-side of a web application.",
        options: [
          {
            name: "Express.js",
            description: "A fast, minimalist web framework for Node.js.",
            primaryLanguages: ["JavaScript"],
          },
          {
            name: "FastAPI",
            description:
              "A high-performance web framework for building APIs with Python.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Flask",
            description: "A lightweight Python framework for APIs.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Nest.js",
            description:
              "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
            primaryLanguages: ["TypeScript"],
          },
          {
            name: "Spring Boot",
            description: "A Java-based framework for creating microservices.",
            primaryLanguages: ["Java"],
          },
        ],
      },
    ],
  },
  {
    name: "Desktop Application",
    categories: [
      {
        name: "Desktop Application Technologies",
        description:
          "Technologies for building native desktop applications across different operating systems.",
        options: [
          {
            name: ".NET MAUI",
            description:
              "A cross-platform framework for creating native mobile and desktop apps with C# and XAML.",
            primaryLanguages: ["C#"],
          },
          {
            name: "Electron",
            description:
              "Build cross-platform desktop apps with web technologies.",
            primaryLanguages: ["JavaScript", "TypeScript"],
          },
          {
            name: "Qt",
            description:
              "A C++ framework for developing native desktop applications.",
            primaryLanguages: ["C++"],
          },
          {
            name: "Tauri",
            description:
              "Build smaller, faster, and more secure desktop applications with a web frontend.",
            primaryLanguages: ["Rust", "JavaScript", "TypeScript"],
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
          "Technologies for building mobile applications that run on both Android and iOS.",
        options: [
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
          {
            name: "React Native",
            description: "Build native mobile apps using React and JavaScript.",
            primaryLanguages: ["JavaScript", "TypeScript"],
          },
        ],
      },
      {
        name: "Native Development",
        description: "Develop applications specifically for Android or iOS.",
        options: [
          {
            name: "Jetpack Compose",
            description: "Android's modern toolkit for building native UI.",
            primaryLanguages: ["Kotlin"],
          },
          {
            name: "SwiftUI",
            description:
              "A modern declarative framework for building apps for all Apple platforms.",
            primaryLanguages: ["Swift"],
          },
        ],
      },
    ],
  },
  {
    name: "ML/Data Science",
    categories: [
      {
        name: "Deep Learning",
        description:
          "Technologies for building and training complex neural networks.",
        options: [
          {
            name: "PyTorch",
            description:
              "An open-source ML framework known for its flexibility.",
            primaryLanguages: ["Python"],
          },
          {
            name: "TensorFlow",
            description:
              "An open-source platform for machine learning by Google.",
            primaryLanguages: ["Python"],
          },
        ],
      },
      {
        name: "Data Analysis & Machine Learning",
        description:
          "Libraries for data manipulation, analysis, and classical ML.",
        options: [
          {
            name: "NumPy",
            description:
              "The fundamental package for scientific computing with Python.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Pandas",
            description: "Library for data manipulation and analysis.",
            primaryLanguages: ["Python"],
          },
          {
            name: "Scikit-learn",
            description: "Library for classical ML algorithms and evaluation.",
            primaryLanguages: ["Python"],
          },
        ],
      },
    ],
  },
];

export const databaseOptions: SelectableCardData[] = [
  {
    name: "Firebase",
    description:
      "A platform by Google, offering NoSQL databases like Firestore and Realtime Database.",
  },
  {
    name: "MongoDB",
    description: "A cross-platform, document-oriented NoSQL database program.",
  },
  {
    name: "MySQL",
    description:
      "A widely used, open-source relational database management system.",
  },
  {
    name: "Pinecone",
    description:
      "A vector database for building high-performance vector search applications.",
  },
  {
    name: "PostgreSQL",
    description: "A powerful, open-source object-relational database system.",
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
    name: "Supabase",
    description: "An open source Firebase alternative based on PostgreSQL.",
  },
];
