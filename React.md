🧠 What is React?<br/>
React is a JavaScript library for building dynamic and interactive user interfaces, especially for single-page applications. It was developed by Facebook and is now the most widely used library for front-end development.
<br/>
🌐 DOM & Vanilla JavaScript<br/>
When a webpage loads, the browser parses HTML into a Document Object Model (DOM) — a tree-like structure. Using vanilla JavaScript (plain JS without libraries), we can manipulate this DOM, such as showing/hiding elements. But as apps grow, direct DOMmanipulation becomes error-prone and hard to manage.
<br/>
🧩 Why React?<br/>
React abstracts away direct DOM manipulation by letting us create components — small, reusable UI blocks. React manages updating and rendering efficiently through a virtual DOM. A React app is essentially a tree of components, with the App component at 
the root.
<br/>
⚙️ Creating a React App<br/>
There are two popular ways to scaffold a new React project:
1. Create React App (CRA) – Official but slower.
2. Vite – Modern, faster bundler. Preferred nowadays.

```
npm create vite@latest
# Select: React + TypeScript
cd react-app
npm install
code .           # Open in VS Code
npm run dev      # Starts local dev server

```
<br/>
📁 Project Structure & Files<br/>
All components go in src/components/.
Use .tsx for React components (TS + JSX).
Use .ts for plain TypeScript files.
Naming convention: PascalCase (e.g., MyComponent.tsx).
<br/>
🧬 JSX (JavaScript XML)<br/>
JSX lets you write HTML-like syntax in JavaScript:
```
return <h1>Hello, {name}</h1>;
```
Wrap multiple elements in one parent (e.g., <div> or <> </>).<br/>
You can use JavaScript expressions inside {}.<br/>
onClick, onChange, etc., are used as event handlers.<br/>
<br/>
🚫 JSX does not support for loops directly. Use map() instead:<br/>
```
{items.map(item => <li key={item.id}>{item.name}</li>)}
```
<br/>
💡 Variables in TypeScript/JSX<br/>
Use let for block-scoped variables that may change.<br/>
Use const for variables that won’t change.<br/>
<br/>
🖱️ Event Handling<br/>
React uses camelCase for events:
```
<button onClick={handleClick}>Click me</button>
```
<br/>
🧠 Props and State<br/>
Props: Inputs to a component (read-only).<br/>

```
function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}
```
State: Internal data that changes over time.<br/>
```
const [count, setCount] = useState(0);
```
<br/>
🛠️ Bootstrap Integration<br/>
To use Bootstrap:
```
npm install bootstrap@latest
```
In main.tsx or App.tsx:
```
import 'bootstrap/dist/css/bootstrap.min.css';
```
<br/>
💥 Hooks
<br/>
React Hooks let you use state and lifecycle features in function components:<br/>
- useState – Manage local state.<br/>
- useEffect – Side effects like fetching data or timers.<br/>
- useRef – Reference DOM elements or persist values between renders.<br/>
<br/>
📦 TypeScript Benefits in React<br/>
- Type Safety: Catch errors during development.<br/>
- Autocomplete: Faster and easier coding.<br/>
- Refactoring: Safer restructuring of code.<br/>
<br/>

⚖️ React vs. Frameworks<br/>
- React is a library, not a full framework.
- Angular, Vue are frameworks: they impose more structure and call your code.
- You call a library, but a framework calls your code (Inversion of Control).
<br/>
📱 React Native<br/>
React Native lets you build mobile apps with React. Apps look and feel native but are written in JavaScript and rendered natively on iOS and Android.<br/>
<br/>
⌨️ Tips for Productivity<br/>
- Use Ctrl + D in VS Code for multi-cursor editing.<br/>
- Use snippets or extensions like ES7+ React/Redux snippets to speed up coding.<br/>
<br/>
✅ Summary<br/>
React helps you build fast, scalable user interfaces using components. With tools like Vite and TypeScript, the development experience is smooth and efficient.



















