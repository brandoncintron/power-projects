// Application types
export const applicationTypes = [
  "Web Application",
  "Desktop Application",
  "Mobile Application",
  "AI/ML",
  "Embedded Systems/IoT",
  "Scripting",
  "Other",
];

// Framework options based on application type with descriptions
export const frameworkOptions = {
  "Web Application": [
    {
      category: "Full-Stack Development",
      description:
        "Frameworks that come with all necessary the tools right out the box for building complete web applications with frontend and backend capabilities. These frameworks use HTML and CSS for the frontend.",
      options: [
        {
          name: "Next.js",
          description:
            "A React framework that enables server-side rendering and static site generation for improved performance.",
          primaryLanguages: ["TypeScript"],
        },
        {
          name: "SvelteKit",
          description:
            "A web framework powered by Svelte, offering server-side rendering and static site generation for high performance, similarly to Next.js.",
          primaryLanguages: ["Svelte"],
        },
        {
          name: "Django",
          description:
            "Build secure and scalable web applications, quickly. Includes built-in authentication, an admin panel and ORM for database management.",
          primaryLanguages: ["Python"],
        },
        {
          name: "Ruby on Rails",
          description:
            "Ruby on Rails simplifies development by including built-in tools for database management, authentication, and RESTful API development.",
          primaryLanguages: ["Ruby"],
        },
      ],
    },
    {
      category: "Frontend Development",
      description:
        "Libraries and frameworks for creating the user interface of a web application.",
      options: [
        {
          name: "React",
          description:
            "A JavaScript library for building user interfaces with component-based architecture.",
          primaryLanguages: ["JavaScript"],
        },
        {
          name: "Angular",
          description:
            "A platform and framework for building single-page client applications using HTML and TypeScript.",
          primaryLanguages: ["TypeScript"],
        },
        {
          name: "Vue.js",
          description:
            "A progressive framework for building modern, reactive UI components.",
          primaryLanguages: ["JavaScript"],
        },
      ],
    },
    {
      category: "Backend Development",
      description:
        "Frameworks for building the backend, or server-side of a web application.",
      options: [
        {
          name: "Flask",
          description:
            "A lightweight Python framework for quickly building APIs and web applications.",
          primaryLanguages: ["Python"],
        },
        {
          name: "Express.js",
          description:
            "A fast, unopinionated, minimalist web framework for Node.js.",
          primaryLanguages: ["JavaScript"],
        },
        {
          name: "Spring Boot",
          description:
            "A modern, high-performance web framework for building the backend with Java.",
          primaryLanguages: ["Java"],
        },
      ],
    },
  ],
  "Desktop Application": [
    {
      category: "Desktop Application Frameworks",
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
            "Build cross-platform desktop apps with JavaScript, HTML, and CSS.",
          primaryLanguages: ["JavaScript"],
        },
        {
          name: "Qt",
          description:
            "A C++ framework for developing native-looking desktop applications with a GUI.",
          primaryLanguages: ["C++"],
        },
      ],
    },
  ],
  "Mobile Application": [
    {
      category: "Cross-Platform Development",
      description:
        "Frameworks for building mobile applications that run on both Android and iOS.",
      options: [
        {
          name: "React Native",
          description:
            "A framework for building native mobile apps using React and JavaScript.",
          primaryLanguages: ["JavaScript"],
        },
        {
          name: "Flutter",
          description:
            "A UI toolkit for building natively compiled applications with a single Dart codebase.",
          primaryLanguages: ["Dart"],
        },
        {
          name: "Kotlin Multiplatform",
          description:
            "A Kotlin-based solution for sharing business logic across Android and iOS.",
          primaryLanguages: ["Kotlin"],
        },
      ],
    },
    {
      category: "Native Development",
      description:
        "Frameworks and languages for developing mobile applications specifically for Android or iOS.",
      options: [
        {
          name: "Swift",
          description:
            "A powerful programming language for developing native iOS applications.",
        },
        {
          name: "Kotlin",
          description:
            "A modern programming language for developing native Android applications.",
        },
      ],
    },
  ],
  "AI/ML": [
    {
      category: "General ML / Tabular Data",
      description:
        "Libraries and techniques for common machine learning tasks like classification, regression, and clustering, often applied to structured (tabular) data.",
      options: [
        {
          name: "Scikit-learn",
          description:
            "Fundamental library for classical ML algorithms, preprocessing, and model evaluation.",
          primaryLanguages: ["Python"],
        },
        {
          name: "Pandas",
          description:
            "Essential library for data manipulation, cleaning, and analysis (especially DataFrames).",
          primaryLanguages: ["Python"],
        },
      ],
    },
    {
      category: "Deep Learning",
      description:
        "Frameworks for building and training complex neural networks, widely used in CV and NLP.",
      options: [
        {
          name: "TensorFlow",
          description:
            "End-to-end open-source platform for machine learning developed by Google, with strong production capabilities (Keras API).",
          primaryLanguages: ["Python"],
        },
        {
          name: "PyTorch",
          description:
            "Open-source ML framework known for flexibility, strong GPU acceleration, and popularity in research.",
          primaryLanguages: ["Python"],
        },
      ],
    },
    {
      category: "Computer Vision",
      description:
        "Technologies enabling computers to interpret and understand information from digital images and videos.",
      options: [
        {
          name: "OpenCV",
          description:
            "Core open-source library for image/video processing, feature detection, and interfacing with ML models.",
          primaryLanguages: ["Python"],
        },
      ],
    },
    {
      category: "Natural Language Processing",
      description:
        "Technologies enabling computers to understand, interpret, and generate human language.",
      options: [
        {
          name: "Hugging Face Transformers",
          description:
            "Provides thousands of pre-trained models (BERT, GPT, etc.) and tools for NLP tasks.",
          primaryLanguages: ["Python"],
        },
        {
          name: "NLTK",
          description:
            "Comprehensive library for symbolic and statistical NLP, text processing, and linguistic analysis.",
          primaryLanguages: ["Python"],
        },
      ],
    },
  ],
  "Embedded Systems/IoT": [
    {
      category: "Embedded Programming",
      description:
        "Languages and frameworks for programming embedded systems and IoT devices.",
      options: [
        {
          name: "C",
          description:
            "A low-level language commonly used for microcontroller programming.",
          primaryLanguages: ["C"],
        },
        {
          name: "Rust",
          description:
            "A memory-safe systems programming language designed for embedded development.",
          primaryLanguages: ["Rust"],
        },
        {
          name: "MicroPython",
          description:
            "A lightweight version of Python optimized for microcontrollers.",
          primaryLanguages: ["Python"],
        },
      ],
    },
  ],
  Scripting: [
    {
      category: "Automation & Scripting",
      description:
        "Languages commonly used for automating tasks and writing scripts.",
      options: [
        {
          name: "Python",
          description:
            "A versatile language often used for scripting, automation, and data processing.",
          primaryLanguages: ["Python"],
        },
        {
          name: "Lua",
          description:
            "A lightweight, high-level language designed for embedded use in applications like mods or add-ons for video games.",
          primaryLanguages: ["Lua"],
        },
        {
          name: "PowerShell",
          description:
            "A scripting language designed for automating Windows system administration.",
          primaryLanguages: ["PowerShell"],
        },
        {
          name: "Bash",
          description:
            "A Unix shell scripting language for automating system tasks.",
          primaryLanguages: ["Bash"],
        },
      ],
    },
  ],
  Other: [
    {
      category: "Custom",
      description:
        "Any framework or technology not covered by the categories above.",
      options: [],
    },
  ],
  // Default empty categories for other application types (can be expanded later)
};

// Database options based on framework
export const databaseOptions = {
  "Next.js": [
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
  ],
  Django: [
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
  ],
  "Ruby on Rails": [
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
  ],
  "Express.js": [
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "Redis",
      description: "An open source, in-memory data structure store.",
    },
  ],
  Flask: [
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
  ],
  SvelteKit: [
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
  ],
  React: [
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
  ],
  Angular: [
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
  ],
  "Vue.js": [
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
  ],
  Tkinter: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
  ],
  Qt: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
  ],
  "Scikit-learn": [
    // Focus: Tabular data input, model persistence, results storage
    {
      name: "SQLite",
      description:
        "Self-contained database for local experiments and results storage.",
    },
    {
      name: "PostgreSQL",
      description:
        "Robust SQL database for storing features, predictions, and application data.",
    },
    {
      name: "MySQL",
      description: "Widely used SQL database alternative for application data.",
    },
    {
      name: "AWS S3",
      description:
        "Scalable cloud storage for large datasets (often CSV/Parquet).",
    },
    {
      name: "HDF5",
      description:
        "File format for storing large numerical datasets or model data efficiently.",
    },
  ],
  Pandas: [
    // Focus: Reading/Writing various data sources/targets
    {
      name: "SQLite",
      description: "Read/write local SQL database files directly.",
    },
    {
      name: "PostgreSQL",
      description:
        "Connect and interact with PostgreSQL databases (via libraries like SQLAlchemy).",
    },
    {
      name: "MySQL",
      description:
        "Connect and interact with MySQL databases (via libraries like SQLAlchemy).",
    },
    {
      name: "AWS S3",
      description:
        "Read/write files (like CSV, Parquet) directly from/to cloud object storage.",
    },
    {
      name: "HDF5",
      description: "Read/write large, structured datasets in the HDF5 format.",
    },
  ],
  TensorFlow: [
    // Focus: Large dataset storage, model files, embeddings, app integration
    {
      name: "AWS S3",
      description:
        "Essential cloud storage for large datasets (images, text, TFRecords) & model checkpoints.",
    },
    {
      name: "HDF5",
      description:
        "Common file format for saving/loading model weights or large datasets.",
    },
    {
      name: "PostgreSQL",
      description:
        "SQL database for application metadata, user data, or structured results.",
    },
    {
      name: "MongoDB",
      description:
        "NoSQL database for flexible data storage within the surrounding application.",
    },
    {
      name: "Pinecone",
      description:
        "Popular managed Vector Database for storing and querying model embeddings.",
    },
  ],
  PyTorch: [
    // Focus: Large dataset storage, model files, embeddings, app integration
    {
      name: "AWS S3",
      description:
        "Essential cloud storage for large datasets (images, text, etc.) & model files (.pt).",
    },
    {
      name: "HDF5",
      description:
        "Common file format for storing large numerical datasets or model checkpoints.",
    },
    {
      name: "PostgreSQL",
      description:
        "SQL database for application metadata, user data, or structured results.",
    },
    {
      name: "MongoDB",
      description:
        "NoSQL database for flexible data storage within the surrounding application.",
    },
    {
      name: "Pinecone",
      description:
        "Popular managed Vector Database for storing and querying model embeddings.",
    },
  ],
  "Hugging Face Transformers": [
    // Focus: Text corpora, model files, embeddings, app integration
    {
      name: "AWS S3",
      description:
        "Cloud storage for large text corpora, custom datasets, or model checkpoints.",
    },
    {
      name: "Pinecone",
      description:
        "Essential Vector Database service for storing and searching text embeddings.",
    },
    {
      name: "PostgreSQL",
      description:
        "SQL database for storing document metadata, structured results, or application data.",
    },
    {
      name: "MongoDB",
      description:
        "NoSQL database for storing text documents and associated metadata flexibly.",
    },
    {
      name: "SQLite",
      description:
        "Self-contained database for local experiments or smaller-scale applications.",
    },
  ],
  OpenCV: [
    // Focus: Image/video storage, metadata, results
    {
      name: "AWS S3",
      description:
        "Scalable cloud storage for large collections of images or videos.",
    },
    {
      name: "SQLite",
      description:
        "Simple local database for storing image/video metadata or analysis results.",
    },
    {
      name: "PostgreSQL",
      description:
        "Robust SQL database for managing metadata, annotations, or structured results.",
    },
    {
      name: "MySQL",
      description:
        "Widely used SQL database alternative for metadata and results.",
    },
    {
      name: "MongoDB",
      description:
        "NoSQL database for storing potentially complex or unstructured metadata/results.",
    },
  ],
  NLTK: [
    // Focus: Text corpora storage, processed data/lexicons, app integration
    {
      name: "SQLite",
      description:
        "Simple local database for storing processed text data, lexicons, or results.",
    },
    {
      name: "PostgreSQL",
      description:
        "SQL database for storing structured text annotations or document metadata.",
    },
    {
      name: "MySQL",
      description:
        "Widely used SQL database alternative for structured text data.",
    },
    {
      name: "MongoDB",
      description: "NoSQL database for storing collections of text documents.",
    },
    {
      name: "AWS S3",
      description:
        "Cloud storage, primarily for accessing or storing large source text corpora.",
    },
  ],
  C: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
  ],
  Rust: [
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Redis",
      description: "An open source, in-memory data structure store.",
    },
  ],
  MicroPython: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
  ],
  Python: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
  ],
  PowerShell: [
    {
      name: "SQL Server",
      description: "Microsoft's relational database management system.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
  ],
  Bash: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
  ],
  Electron: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "IndexedDB",
      description:
        "A low-level API for client-side storage of significant amounts of structured data.",
    },
  ],
  ".NET": [
    {
      name: "SQL Server",
      description: "Microsoft's relational database management system.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
  ],
  "React Native": [
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Realm",
      description:
        "A mobile database that runs directly on phones, tablets or wearables.",
    },
  ],
  Flutter: [
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Hive",
      description:
        "A lightweight and fast key-value database written in pure Dart.",
    },
  ],
  "Kotlin Multiplatform": [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Realm",
      description:
        "A mobile database that runs directly on phones, tablets or wearables.",
    },
  ],
  Swift: [
    {
      name: "CoreData",
      description:
        "Apple's framework for managing object-relational data in iOS applications.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Realm",
      description:
        "A mobile database that runs directly on phones, tablets or wearables.",
    },
  ],
  Kotlin: [
    {
      name: "Room",
      description:
        "Android's abstraction layer over SQLite, providing object-relational mapping.",
    },
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "Realm",
      description:
        "A mobile database that runs directly on phones, tablets or wearables.",
    },
  ],
  default: [
    {
      name: "SQLite",
      description: "A self-contained, serverless SQL database engine.",
    },
    {
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system.",
    },
    {
      name: "MySQL",
      description: "An open-source relational database management system.",
    },
    {
      name: "MongoDB",
      description:
        "A document-oriented NoSQL database used for high volume data storage.",
    },
    {
      name: "Redis",
      description: "An open source, in-memory data structure store.",
    },
    {
      name: "Firebase",
      description:
        "A platform developed by Google for creating mobile and web applications.",
    },
    {
      name: "SQL Server",
      description: "Microsoft's relational database management system.",
    },
    {
      name: "Realm",
      description:
        "A mobile database that runs directly on phones, tablets or wearables.",
    },
    {
      name: "IndexedDB",
      description:
        "A low-level API for client-side storage of significant amounts of structured data.",
    },
    {
      name: "Hive",
      description:
        "A lightweight and fast key-value database written in pure Dart.",
    },
    {
      name: "CoreData",
      description:
        "Apple's framework for managing object-relational data in iOS applications.",
    },
    {
      name: "Room",
      description:
        "Android's abstraction layer over SQLite, providing object-relational mapping.",
    },
  ],
};
