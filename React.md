🧠 What is React?

React is a JavaScript library for building dynamic and interactive user interfaces, especially for single-page applications. It was developed by Facebook and is now the most widely used library for front-end development.
🌐 DOM & Vanilla JavaScript

When a webpage loads, the browser parses HTML into a Document Object Model (DOM) — a tree-like structure. Using vanilla JavaScript (plain JS without libraries), we can manipulate this DOM, such as showing/hiding elements. But as apps grow, direct DOM manipulation becomes error-prone and hard to manage.
🧩 Why React?

React abstracts away direct DOM manipulation by letting us create components — small, reusable UI blocks. React manages updating and rendering efficiently through a virtual DOM. A React app is essentially a tree of components, with the App component at the root.
⚙️ Creating a React App

There are two popular ways to scaffold a new React project:

    Create React App (CRA) – Official but slower.

    Vite – Modern, faster bundler. Preferred nowadays.

npm create vite@latest
# Select: React + TypeScript
cd react-app
npm install
code .           # Open in VS Code
npm run dev      # Starts local dev server

📁 Project Structure & Files

    All components go in src/components/.

    Use .tsx for React components (TS + JSX).

    Use .ts for plain TypeScript files.

    Naming convention: PascalCase (e.g., MyComponent.tsx).

🧬 JSX (JavaScript XML)

JSX lets you write HTML-like syntax in JavaScript:

return <h1>Hello, {name}</h1>;

    Wrap multiple elements in one parent (e.g., <div> or <> </>).

    You can use JavaScript expressions inside {}.

    onClick, onChange, etc., are used as event handlers.

🚫 JSX does not support for loops directly. Use map() instead:

{items.map(item => <li key={item.id}>{item.name}</li>)}

💡 Variables in TypeScript/JSX

    Use let for block-scoped variables that may change.

    Use const for variables that won’t change.

🖱️ Event Handling

React uses camelCase for events:

<button onClick={handleClick}>Click me</button>

🧠 Props and State

    Props: Inputs to a component (read-only).

function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}

    State: Internal data that changes over time.

const [count, setCount] = useState(0);

🛠️ Bootstrap Integration

To use Bootstrap:

npm install bootstrap@latest

In main.tsx or App.tsx:

import 'bootstrap/dist/css/bootstrap.min.css';

💥 Hooks

React Hooks let you use state and lifecycle features in function components:

    useState – Manage local state.

    useEffect – Side effects like fetching data or timers.

    useRef – Reference DOM elements or persist values between renders.

📦 TypeScript Benefits in React

    Type Safety: Catch errors during development.

    Autocomplete: Faster and easier coding.

    Refactoring: Safer restructuring of code.

⚖️ React vs. Frameworks

    React is a library, not a full framework.

    Angular, Vue are frameworks: they impose more structure and call your code.

    You call a library, but a framework calls your code (Inversion of Control).

📱 React Native

React Native lets you build mobile apps with React. Apps look and feel native but are written in JavaScript and rendered natively on iOS and Android.
⌨️ Tips for Productivity

    Use Ctrl + D in VS Code for multi-cursor editing.

    Use snippets or extensions like ES7+ React/Redux snippets to speed up coding.

✅ Summary

React helps you build fast, scalable user interfaces using components. With tools like Vite and TypeScript, the development experience is smooth and efficient.
