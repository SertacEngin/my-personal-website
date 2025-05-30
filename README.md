# Portfolio Website

This is my website (www.sertacengin.com) built with Next.js and Tailwind CSS. I am planning to practice my DevOps skills, build projects, and showcase my achievements in an elegant and responsive design.

I used Vercel to quickly prototype and deploy my personal site with automatic deployments on every Git push.

Next, I moved to Hetzner with Docker and GitHub Actions to do more with CI/CD pipelines, Linux servers, and container orchestration.

Continuous Integration and Continuous Deployment (CI/CD) pipelines automate the process of testing, building, and deploying code changes, ensuring rapid and reliable delivery of software. In my setup, I use GitHub Actions as the CI/CD platform integrated directly with my GitHub repository. Every time I push code to the main branch, the pipeline triggers automatically. The pipeline workflow is defined in a YAML file (deploy.yml) inside the .github/workflows directory of the repo. This file specifies the sequence of steps the pipeline should follow.

First, the pipeline checks out the latest code from the repository. Then, it installs all necessary dependencies—typically using package managers like npm and pm2 for a Next.js project. After that, the build process runs, compiling the React/Next.js code into production-ready assets. This ensures that the code compiles correctly and no build errors occur before deployment.

Next comes deployment. On successful build, the pipeline connects to the remote server (in this case, my Hetzner VPS) via SSH. Using secure keys, the pipeline runs commands on the server to update the project code by pulling the latest changes from GitHub. This step requires the server’s Git repository to be in a clean state—meaning no uncommitted local changes, otherwise the pull fails (which was the issue I faced). After the pull, the server restarts the running process (managed by PM2) to apply the new code changes immediately, minimizing downtime.

In this way, the CI/CD pipeline automates every stage from code commit to live deployment, reducing manual errors, speeding up feedback loops, and ensuring that the production server always runs the latest tested code. This approach is critical in professional environments to maintain high code quality and rapid iteration cycles.

Next I will work on Containerization and add databases to the website.

## Installation

1. Clone the repository: `git clone https://github.com/SertacEngin/my-personal-website`
2. Navigate to the project directory: `cd my-personal-website`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and visit `http://localhost:3000` to view the website.

## Dependencies

The following dependencies are required for this project:

- Next.js: A React framework for server-side rendering and static site generation.
- Tailwind CSS: A highly customizable CSS framework.
- React: A JavaScript library for building user interfaces.
- React Icons: A collection of popular icons for React projects.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Resend: Resend is the email API for developers.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
