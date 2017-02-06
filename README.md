# React-Redux Sample

This repo contains two sample applications using **React** and **Redux**,
built with **Babel** and **Webpack** and tested with **Jest** :

1. [TodoMVC](https://github.com/YuChunLOL/react-redux-sample/tree/master/todomvc) (Basic, no async actions)
2. [MeetingApp](https://github.com/YuChunLOL/react-redux-sample/tree/master/meetingapp) (Advanced, contains async actions, routings, authentication flow and so on)

(Click the above project links to see how to run the demos.)

## Brief introduction to the tech stack
### [React](http://facebook.github.io/react/index.html)
React is a javascript frontend library supported by Facebook.
<br>
In contrast to any other MVC frontend frameworks, such as Angular,
<br>
React only cares about the **View** layer.
<br><br>
Unlike Angular's two-way data-binding, React implements unidirectional data flow that makes developers easy to debug, maintain and add new features.

### [Redux](http://rackt.org/redux/index.html)
Redux is a design pattern (or application architecture) inspired by [Flux](https://facebook.github.io/flux/docs/overview.html).
<br>
It helps us to create a predictable state container for JavaScript apps.
<br>

### [Babel](http://babeljs.io/)
Babel has support for the latest version of JavaScript through syntax transformers. These allow you to use new syntax, right now without waiting for browser support.
<br><br>
Many React applications have started to use javascript ES6 (also known as ES2015). Its class and module features work well with React.

### [Webpack](https://webpack.github.io/)
Webpack operates on a lower level. It is a module bundler. In essence it is something that you use to build your project into deliverable components (HTML, CSS, JS).
It has generally replaced other build tools like grunt, gulp, etc., but you can still use then along with Webpack.

### [Jest](https://facebook.github.io/jest/)
Jest provides you with multiple layers on top of Jasmine.
Here I use Jest to write our unit test.
