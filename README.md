# Dev Portfolio API

REST API created with Express and Typescript.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

## Production

SSH into Digital Ocean droplet and navigate to port 81 to view nginx configuration.
Requires Admin Access.

## CICD

Inspect (code_quality.yml) and Scan (scan.yml) workflows are required for merges to main.

Release workflow (release.yml) only runs on main branch.

## Resources

Includes API Server utilities:

-   [morgan](https://www.npmjs.com/package/morgan)
    -   HTTP request logger middleware for node.js
-   [helmet](https://www.npmjs.com/package/helmet)
    -   Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
-   [dotenv](https://www.npmjs.com/package/dotenv)
    -   Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
-   [cors](https://www.npmjs.com/package/cors)
    -   CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   [nginx](https://nginxproxymanager.com/guide/#quick-setup)
    -   nginx

Development utilities:

-   [typescript](https://www.npmjs.com/package/typescript)
    -   TypeScript is a language for application-scale JavaScript.
-   [ts-node](https://www.npmjs.com/package/ts-node)
    -   TypeScript execution and REPL for node.js, with source map and native ESM support.
-   [nodemon](https://www.npmjs.com/package/nodemon)
    -   nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
-   [eslint](https://www.npmjs.com/package/eslint)
    -   ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
-   [typescript-eslint](https://typescript-eslint.io/)
    -   Tooling which enables ESLint to support TypeScript.
-   [jest](https://www.npmjs.com/package/jest)
    -   Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
-   [supertest](https://www.npmjs.com/package/supertest)
    -   HTTP assertions made easy via superagent.
