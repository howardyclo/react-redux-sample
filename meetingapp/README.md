# [MeetingApp](http://meetingapp.parseapp.com/)

## User story
A and B would like to meet up with each other, but they don't know each other's available time. This app simply shows others' available time which is your available time, too.

## Features
* Asyncronized actions, using React Thunk Middleware
* Routings built with React Router for routes and Redux Simple Router for transitions
* Handle public and private views, based on  [**Higher Older Component**](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) implementation
* Authentication flow : sign up, login, logout
* Use [**Parse**](https://www.parse.com/) as backend
* Beautiful UI

## Project structure
```
|-- meetingapp
    |-- .babelrc          # Babel configuration file, makes us able to write es6 syntax
    |-- README.md         # Ignore it
    |-- package.json      # Node package configuration
    |-- webpack.config.js # Webpack configuration file
    |-- app               # App src code
    |   |-- index.js      # Entry point of app, config in webpack.config.js
    |   |-- __tests__     # Jest unit test
    |   |-- img           # image files
    |   |-- modules       # Parse initialize and configs (App key and JS key)
    |   |-- actions       # Redux actions
    |   |-- components    # React dumb component
    |   |-- containers    # React smart component, composed by dumb component
    |   |-- reducers      # Redux reducers
    |   |-- store         # Redux store
    |-- build             # Webpack build/deploy output folder
```

## Setup workflow
### Installation
First open your command line, clone this project (suppose you have installed [git command line tool](https://git-scm.com/)) or simply download the ZIP to your prefered directory .

```
git clone https://github.com/HowardLoTW/react-redux-sample.git
cd react-redux-sample/meetingapp
```
Suppose you have installed [nodejs](https://nodejs.org/en/) (required node version 4.x or upper. I'm using node v5.3.0 & npm v3.3.12).
<br>Type 'npm install' in your command line to install dependencies.
```
npm install
```

### Development
```
npm run dev
```
Open your browser and navigate to http://localhost:8080/webpack-dev-server/

##### Parse Setup
Go to [**Parse**](https://www.parse.com/) and create a project.
<br>
Remember to change Parse keys at `meetingapp/app/modules/config.js`.
<br>
Create two classes in your Parse app
1. User (By default)
2. Timetable (Custom) containing two columns: `data (String)`, `user (Pointer to _User)`

### Testing
```
npm run test
```

### Build
```
npm run build
```

### Deploy
```
npm run deploy
```

## About CSS with React
In this project, I use the following css tools and it works well with React. And of course you can use another css tools to write css in your project.
1. [Css Modules](https://github.com/css-modules/css-modules)
2. [classnames](https://github.com/JedWatson/classnames)

You can checkout the following talks for more information:
1. [The case for CSS modules - Mark Dalgleish](https://www.youtube.com/watch?v=zR1lOuyQEt8)
2. [Michael Chan - Inline Styles: themes, media queries, contexts, & when it's best to use CSS](https://www.youtube.com/watch?v=ERB1TJBn32c)
3. [CSS with React.js](https://www.youtube.com/watch?v=FXlWWhKevaw)

## Reference
1. More setup workflow information, please refer to [react-webpack-cookbook](https://christianalfoni.github.io/react-webpack-cookbook/index.html)
2. [Learn to implement Redux architecture in React app](http://rackt.org/redux/index.html)
3. [More Redux example](https://github.com/rackt/redux)
4. [Authentication basic example](https://github.com/joshgeller/react-redux-jwt-auth-example)



