React is a Javascript library for building dynamic and interactive user interfaces. It is the most used Javascript library for front end development.

When a web page is loaded in a browser the browser takes the HTML code and creates a tree-like structure called the Document Object Model (DOM). This allows us to use JavaScript and change the page content and response to user actions. For example we can 
use JavaScript to hide an element when a button is clicked. This is called vanilla JavasScript meaning plain JavaScript code without any third party tools. As our applications grow working with a DOM can become quite complex and challenging to manage. 
This is where React comes into play. With react we no longer need to worry about querying and updating DOM elements. Instead we work with small reuseable components and React will take care of efficiently creating and updating DOM elements. So components 
help us write reusable, modular and better code.

Essentially a React application is a tree of components with the app being the root bringing everything together.

There are 2 ways to create a react app. First we can use the official tool provided by the react team. It’s called Create React App (CRA). And we have another tool called Vite. That’s getting increasingly popular because it’s faster and gives us smaller 
bundle sizes. This is what we will use.

For that we run “npm create vite@latest”. For the framework we select React. And we select TypeScript for the language.

Then we run “cd react-app” and “npm install” commands.
To open our project in VS code, we run “code .”.
We can use the embedded terminal in VS code. It’s easier than switching between VS code and a different terminal window.

Then we run “npm run dev” command.
“npm run dev” tells npm (Node Package Manager) to run a custom script defined in our project’s package.json file under the “scripts” section.
This starts a local development server.
Watches for file changes and reloads the app automatically.
Runs a bundler like Vite, Webpack, or Next.js in development mode.

To create a new component we right click on the src folder and choose new file. The extension of the file should be either .ts or .tsx. We often use .ts for plain TypeScript files and .tsx for React components. We will use the function based approach.

JSX stands for JavaScript XML. With JSX we can describe the user interface of our application with HTML and JavaScript. It allows us to create dynamic content. 

React Native is a JavaScript framework for building mobile apps for iOS and Android that are rendered natively, meaning they feel and look like apps developed using native languages like Swift or Java. It allows developers to write a single codebase and 
deploy it to both platforms, offering advantages like faster development and reduced code maintenance.

So React is a JavaScript library for creating user interfaces. In contrast ro React we have other tools like Angular and View which are Frameworks. What is the difference between a library and a framework?
A library is a tool that provides specific functionality. So a library is a collection of pre-written code that developers can reuse to perform specific tasks.
A framework is a set of tools and guidelines for building apps. Frameworks provide a pre-defined structure or architecture for building applications, and your code is executed within that framework's control. Essentially, you call library functions, while 
a framework calls your code
So a library is like a tool while a framework is like a tool set.

Bootstrap is a popular css library that we will use. We install it with “npm install bootstrap@latest”.

By convention we put all out folder in a folder called components in the src folder.

Pascal convention is capitalizing the first letter of each word.

Tip: We can use ctrl+D to have multiple cursor. We can use them when we need to change the name of multiple occurances.

A component cannot return more than one element in React. One simple solution is to wrap the entire expression inside a div or another element.
And the simpliest way is to wrap all the children into empty angle brackets.

In JSX we don’t have a for loop.




