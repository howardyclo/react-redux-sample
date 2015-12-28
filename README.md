# React-Redux Sample

This repo contains two sample applications using **React** and **Redux**, 
built with **Babel** and **Webpack** and tested with **Jest** :

1. [TodoMVC](http://todomvc.parseapp.com/)
2. DatingApp (Not done yet.)

(Click the above project links to see demo)

## Brief introduction to the tech stack
### [React](http://facebook.github.io/react/index.html)
React is a javascript frontend framework supported by Facebook.
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

##### Architecture graph
![Redux architecture graph](https://camo.githubusercontent.com/83fef7601c50c8b025953579e5c5be3aa47ee51d/687474703a2f2f692e696d6775722e636f6d2f30756e68744e512e6a7067)
<br><br>

1. User makes an **Action** to the **View** (or UI).
2. **Reducer** receives the **Action**. Make some processes, then send new state to **Store**.
3. **Store** updates the app's current state with the new state returned from **Reducer**, and finally updates the **View** (or UI) based on current app's state.

<br>
The above architecture graph contains mainly 4 components : 
<br>
##### Actions

Actions are payloads of information that send data from your application to your store. 
<br>
They are the only source of information for the store.
<br><br>
Here is what a action simply looks like following the [Flux Action Standard](https://github.com/acdlite/flux-standard-action) :
```javascript
{
    type: 'ACTION_VERB', // This can be an action type or action ID.
    payloads: {} // Optional information about the action.
}
```

##### Action Creators
Action creators are exactly that—functions that create actions.
<br>
Different from the Flux design pattern, we simply return action without dispatching.

##### Reducers
Actions describe the fact that something happened, but don’t specify how the application’s state changes in response. 
<br>
This is the job of a reducer. And it is important that we should implement reducer functions **purely**.
<br><br>
Here are what pure function and impure function look like :
```javascript
// Pure function
function square(x) {
  return x * x;  // Do not override the passed value.
}

// Impure function
function square(x) {
  updateXinDatabase(x); // This is a side effect. 
                        // We don't want any network operations, API calls, mutations.
                        // Just calculation here.
  return x * x;
}
```
##### Store
Store is the object that brings actions and reducers together. 
<br>
It’s important to note that you’ll only have a single store in a Redux application. 
<br>
When you want to split your data handling logic, you’ll use reducer composition instead of many stores.
<br><br>
Here is what a store look like in redux implementation to make you more clear :
<br>
(We don't need to implement in our project since the Redux library has already done it for us)
```javascript
// Using ES6 syntax.
const createStore = (reducer) => {
    let state;
    let listeners = []; // listeners will invoke when finishing executing dispatcher.
    
    const getState = () => state; // Return current app's state.
    
    const dispatcher = (action) => {
        state = reducer(state, action); // reducer process the action
                                        // and then update current app's state.
        listeners.forEach(listener => listener()); // Notify every listener 
                                                   // when app's state is updated.
    };
    
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            // Instead of adding a unsubscribe method,
            // we'll just return a function from subscribe method
            // that removes the listener from the listeners array.
            listeners = listeners.filter(l => l !== listener); 
        }
    };
    
    dispatch({}); // We want to have a initial state populated 
                  // by the time the store is returned.
    
    return { getState, dispatcher, subscribe };
}
```

### [Babel](http://babeljs.io/)
Babel has support for the latest version of JavaScript through syntax transformers. These allow you to use new syntax, right now without waiting for browser support.
<br><br>
Many React applications have started to use javascript ES6 (also known as ES2015). Its class and module features work well with React.

### [Webpack](https://webpack.github.io/)
Webpack operates on a lower level. It is a module bundler. In essence it is something that you use to build your project into deliverable components (HTML, CSS, JS). 
It has generally replaced other build tools like grunt, gulp, etc., but you can still use then along with Webpack.