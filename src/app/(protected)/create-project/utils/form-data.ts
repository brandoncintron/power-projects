// Application types
export const applicationTypes = [
  "Web Application",
  "Desktop Application",
  "Mobile Application",
  "AI/ML",
  "Embedded Systems/IoT",
  "Scripting",
  "Other"
]

// Framework options based on application type with descriptions
export const frameworkOptions = {
  "Web Application": [
    {
      category: "Full-Stack Development",
      description: "Frameworks that come with all necessary the tools right out the box for building complete web applications with frontend and backend capabilities. These frameworks use HTML and CSS for the frontend.",
      options: [
        { name: "Next.js", description: "A React framework that enables server-side rendering and static site generation for improved performance.", primaryLanguages: ["TypeScript"] },
        { name: "Django", description: "Build secure and scalable web applications, quickly. Includes built-in authentication, an admin panel and ORM for database management.", primaryLanguages: ["Python"] },
        { name: "Ruby on Rails", description: "Ruby on Rails is a full-stack framework that simplifies development by including built-in tools for database management, authentication, and RESTful API development.", primaryLanguages: ["Ruby"] },
      ]
    },
    {
      category: "Frontend Development",
      description: "Libraries and frameworks for creating the user interface of a web application.",
      options: [
        { name: "React", description: "A JavaScript library for building user interfaces with component-based architecture.", primaryLanguages: ["JavaScript"] },
        { name: "Angular", description: "A platform and framework for building single-page client applications using HTML and TypeScript.", primaryLanguages: ["TypeScript"] },
        { name: "Vue.js", description: "A progressive framework for building modern, reactive UI components.", primaryLanguages: ["JavaScript"] }
      ]
    },
    {
      category: "Backend Development",
      description: "Frameworks for building the backend, or server-side of a web application.",
      options: [
        { name: "Flask", description: "A lightweight Python framework for quickly building APIs and web applications.", primaryLanguages: ["Python"] },
        { name: "Express.js", description: "A fast, unopinionated, minimalist web framework for Node.js.", primaryLanguages: ["JavaScript"] },
        { name: "Spring Boot", description: "A modern, high-performance web framework for building the backend with Java.", primaryLanguages: ["Java"] },
      ]
    }
  ],
  "Desktop Application": [
    {
      category: "Desktop Application Frameworks",
      description: "Frameworks for building native desktop applications across different operating systems.",
      options: [
        { name: "Tkinter", description: "A built-in Python library for creating simple GUI applications.", primaryLanguages: ["Python"] },
        { name: "Electron", description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS.", primaryLanguages: ["JavaScript"] },
        { name: "Qt", description: "A C++ framework for developing native-looking desktop applications with a GUI.", primaryLanguages: ["C++"] },
      ]
    }
  ],
  "Mobile Application": [
    {
      category: "Cross-Platform Development",
      description: "Frameworks for building mobile applications that run on both Android and iOS.",
      options: [
        { name: "React Native", description: "A framework for building native mobile apps using React and JavaScript.", primaryLanguages: ["JavaScript"] },
        { name: "Flutter", description: "A UI toolkit for building natively compiled applications with a single Dart codebase.", primaryLanguages: ["Dart"] },
        { name: "Kotlin Multiplatform", description: "A Kotlin-based solution for sharing business logic across Android and iOS.", primaryLanguages: ["Kotlin"] }
      ]
    },
    {
      category: "Native Development",
      description: "Frameworks and languages for developing mobile applications specifically for Android or iOS.",
      options: [
        { name: "Swift", description: "A powerful programming language for developing native iOS applications." },
        { name: "Kotlin", description: "A modern programming language for developing native Android applications." }
      ]
    }
  ],
  "AI/ML": [
    {
      category: "Computer Vision",
      description: "Technologies that enable computers to derive meaningful information from digital images, videos and other visual inputs.",
      options: [
        { name: "TensorFlow", description: "An end-to-end open source platform for machine learning developed by Google.", primaryLanguages: ["Python"] },
        { name: "OpenCV", description: "An open-source computer vision and machine learning software library.", primaryLanguages: ["Python"] }
      ]
    },
    {
      category: "Natural Language Processing",
      description: "Technologies enabling computers to understand, interpret, and generate human language.",
      options: [
        { name: "PyTorch", description: "An open source machine learning framework that accelerates the path from research to production.", primaryLanguages: ["Python"] },
        { name: "NLTK", description: "A leading platform for building Python programs to work with human language data.", primaryLanguages: ["Python"] }
      ]
    }
  ],
  "Embedded Systems/IoT": [
    {
      category: "Embedded Programming",
      description: "Languages and frameworks for programming embedded systems and IoT devices.",
      options: [
        { name: "C", description: "A low-level language commonly used for microcontroller programming.", primaryLanguages: ["C"] },
        { name: "Rust", description: "A memory-safe systems programming language designed for embedded development.", primaryLanguages: ["Rust"] },
        { name: "MicroPython", description: "A lightweight version of Python optimized for microcontrollers.", primaryLanguages: ["Python"] }
      ]
    }
  ],
  "Scripting": [
    {
      category: "Automation & Scripting",
      description: "Languages commonly used for automating tasks and writing scripts.",
      options: [
        { name: "Python", description: "A versatile language often used for scripting, automation, and data processing.", primaryLanguages: ["Python"] },
        { name: "Lua", description: "A lightweight, high-level language designed for embedded use in applications like mods or add-ons for video games.", primaryLanguages: ["Lua"] },
        { name: "PowerShell", description: "A scripting language designed for automating Windows system administration.", primaryLanguages: ["PowerShell"] },
        { name: "Bash", description: "A Unix shell scripting language for automating system tasks.", primaryLanguages: ["Bash"] },
      ]
    }
  ],
  "Other": [
    {
      category: "Custom",
      description: "Any framework or technology not covered by the categories above.",
      options: []
    }
  ],
  // Default empty categories for other application types (can be expanded later)

}

// Database options based on framework
export const databaseOptions = {
  "Next.js": [
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
  ],
  "Django": [
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." }
  ],
  "Ruby on Rails": [
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." }
  ],
  "Express.js": [
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "Redis", description: "An open source, in-memory data structure store." }
  ],
  "Flask": [
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "FastAPI": [
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "React": [
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." }
  ],
  "Angular": [
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "Vue.js": [
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." }
  ],
  "Tkinter": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MySQL", description: "An open-source relational database management system." }
  ],
  "Qt": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." }
  ],
  "TensorFlow": [
    { name: "HDF5", description: "A file format designed to store and organize large amounts of data." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system with JSON support." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "OpenCV": [
    { name: "HDF5", description: "A file format designed to store and organize large amounts of data." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." }
  ],
  "PyTorch": [
    { name: "HDF5", description: "A file format designed to store and organize large amounts of data." },
    { name: "Redis", description: "An open source, in-memory data structure store." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "NLTK": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "C": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MySQL", description: "An open-source relational database management system." }
  ],
  "Rust": [
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Redis", description: "An open source, in-memory data structure store." }
  ],
  "MicroPython": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." }
  ],
  "Python": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." }
  ],
  "PowerShell": [
    { name: "SQL Server", description: "Microsoft's relational database management system." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." }
  ],
  "Bash": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "MySQL", description: "An open-source relational database management system." }
  ],
  "Electron": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "IndexedDB", description: "A low-level API for client-side storage of significant amounts of structured data." }
  ],
  ".NET": [
    { name: "SQL Server", description: "Microsoft's relational database management system." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." }
  ],
  "React Native": [
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Realm", description: "A mobile database that runs directly on phones, tablets or wearables." }
  ],
  "Flutter": [
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Hive", description: "A lightweight and fast key-value database written in pure Dart." }
  ],
  "Kotlin Multiplatform": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Realm", description: "A mobile database that runs directly on phones, tablets or wearables." }
  ],
  "Swift": [
    { name: "CoreData", description: "Apple's framework for managing object-relational data in iOS applications." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Realm", description: "A mobile database that runs directly on phones, tablets or wearables." }
  ],
  "Kotlin": [
    { name: "Room", description: "Android's abstraction layer over SQLite, providing object-relational mapping." },
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "Realm", description: "A mobile database that runs directly on phones, tablets or wearables." }
  ],
  "default": [
    { name: "SQLite", description: "A self-contained, serverless SQL database engine." },
    { name: "PostgreSQL", description: "A powerful, open source object-relational database system." },
    { name: "MySQL", description: "An open-source relational database management system." },
    { name: "MongoDB", description: "A document-oriented NoSQL database used for high volume data storage." },
    { name: "Redis", description: "An open source, in-memory data structure store." },
    { name: "Firebase", description: "A platform developed by Google for creating mobile and web applications." },
    { name: "SQL Server", description: "Microsoft's relational database management system." },
    { name: "Realm", description: "A mobile database that runs directly on phones, tablets or wearables." },
    { name: "HDF5", description: "A file format designed to store and organize large amounts of data." },
    { name: "IndexedDB", description: "A low-level API for client-side storage of significant amounts of structured data." },
    { name: "Hive", description: "A lightweight and fast key-value database written in pure Dart." },
    { name: "CoreData", description: "Apple's framework for managing object-relational data in iOS applications." },
    { name: "Room", description: "Android's abstraction layer over SQLite, providing object-relational mapping." }
  ]
} 