⚡ What is Next.js?<br/>
Next.js is a React framework for building production-grade web applications. It provides structure and tooling out of the box and focuses on:<br/>
- Server-side rendering (SSR)<br/>
- Static site generation (SSG)<br/>
- Routing<br/>
- API routes<br/>
- Image optimization<br/>
- Full-stack capabilities<br/>
It's built and maintained by Vercel.
<br/>

🚀 Why Next.js?<br/>
- Next.js solves many problems that come with using plain React, such as:<br/>
- SEO (Search Engine Optimization) → via SSR/SSG<br/>
- Routing system (no need for React Router)<br/>
- Performance optimizations (lazy loading, code splitting)<br/>
- Easy backend API routes in the same project<br/>
- Built-in TypeScript support<br/>
- Out-of-the-box deployment with Vercel
<br/>

⚙️ Setting Up a Next.js Project<br/>

```
npx create-next-app@latest
# Choose TypeScript if needed
cd my-next-app
npm run dev     # Starts development server
code .          # Open in VS Code
```
This scaffolds a project with a sensible folder structure and built-in features.
<br/>

📁 Folder Structure Overview<br/>

```
/pages          → Each file is a route
/public         → Static assets like images, favicons
/styles         → CSS files
/components     → Reusable UI parts (create this manually)
```
- Files inside /pages automatically become routes.<br/>
- index.tsx becomes / route.<br/>
- about.tsx becomes /about.<br/>
<br/>

🌍 Routing in Next.js<br/>
File-based routing means routes are determined by file names inside /pages.
```
pages/posts/[id].tsx  →  /posts/1, /posts/hello
```

You can get the dynamic value via:
```
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return <p>Post ID: {id}</p>;
};
```
<br/>

✨ Page Rendering Methods<br/>
Next.js offers different ways to render pages:<br/>
1. Static Site Generation (SSG) – Build HTML at build time<br/>
```
export async function getStaticProps() {}
```
2. Server-side Rendering (SSR) – Build HTML on each request
```
export async function getServerSideProps() {}
```
3. Client-side Rendering (CSR) – Default React behavior using hooks and states<br/>
4. Incremental Static Regeneration (ISR) – Rebuild static pages on demand
<br/>

🧪 Example: getStaticProps
```
export async function getStaticProps() {
  return {
    props: {
      message: "Hello from Static Props"
    }
  };
}

export default function Home({ message }) {
  return <h1>{message}</h1>;
}
```
<br/>
🧠 API Routes<br/>
Next.js lets you write backend logic with API endpoints in the same project.<br/>
Create a file inside /pages/api:
```
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: "Hello from API!" });
}
```
Access it via http://localhost:3000/api/hello.
<br/>

🖼️ Image Optimization<br/>
Next.js provides an optimized <Image> component:
```
import Image from 'next/image';

<Image src="/logo.png" alt="Logo" width={200} height={100} />
```
Benefits:<br/>
Lazy loading<br/>
Automatically resized<br/>
Optimized formats
<br/>

🌐 Metadata and Head<br/>
Use the built-in <Head> component to customize the HTML <head>:
```
import Head from 'next/head';

<Head>
  <title>My Page Title</title>
  <meta name="description" content="This is a Next.js page" />
</Head>
```
<br/>

📦 Styling Options<br/>
- Global CSS in pages/_app.tsx<br/>
- Component-scoped CSS Modules:
```
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```
- Or use utility libraries like Tailwind CSS or styled-components
<br/>

➕ TypeScript Support<br/>
Next.js has built-in support for TypeScript. If you didn't enable it during setup:
```
touch tsconfig.json
npm install --save-dev typescript @types/react @types/node
```
<br/>

🌍 Deployment<br/>
Deploying with Vercel is the easiest option:
```
npm install -g vercel
vercel
```
Or deploy to other platforms like Netlify, AWS, etc.
<br/>

✅ Summary<br/>
- Next.js is a full-featured framework on top of React.<br/>
- It gives you routing, SSR/SSG, API routes, and performance out of the box.<br/>
-Best suited for SEO-optimized, production-grade applications.<br/>
- You can still use all React features inside Next.js components.




















