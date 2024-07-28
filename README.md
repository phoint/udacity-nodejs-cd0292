# Image Processing API

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/phoint/udacity-nodejs-cd0292
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm run build
    npm run start
    ```

2. Query an existing image:
   Currently, service provide the query for existing image. Uploading image is not allowed.

    ```http
    GET /api/images?name=imageName
    ```

3. Resize an existing image:

    ```http
    GET /api/images?name=imageName&width=200&height=200
    ```

### Example Requests

- Query an image:

    ```bash
    curl http://localhost:3000/api/images?name=imageName
    ```

- Resize an image:

    ```bash
    curl http://localhost:3000/api/images?name=imageName&width=200&height=200
    ```

## Project Structure

project-root/
├── src/
│ ├── routes/
│ │ ├── api/
│ │ │ └── images.ts # Route handler for image API
│ │ └── index.ts # Main route index file
│ ├── utilities/
│ │ ├── errorHandler.ts # Error handling utilities
│ │ ├── fileHandler.ts # File handling utilities
│ │ ├── logger.ts # Logger utilities
│ │ ├── resizeImage.ts # Image resizing utilities
│ │ └── serveImage.ts # Serve image utilities
│ └── index.ts # Main entry point of the application
├── tests/
│ ├── helpers/ # Helper functions for tests
│ ├── routes/ # Route-specific tests
│ ├── utilities/ # Utility-specific tests
│ └── indexSpec.ts # Tests for the main entry point
├── .gitignore # Git ignore file
├── .prettierrc # Prettier configuration
├── CODEOWNERS # Code owners configuration
├── LICENSE.txt # License file
├── package-lock.json # npm lock file
├── package.json # npm configuration file
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration file


## Running Tests

This project uses Jasmine for unit tests and SuperTest for HTTP request testing.

Run all tests:

```bash
npm run test
```
## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

[License](LICENSE.txt)
