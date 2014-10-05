Top Shelf Guild
===========

A website built for a World of Warcraft guild using MongoDB, Angular.js, Express.js, and Node.js.

#### Intro  
This is a repository for an SPA I'm building for my World of Warcraft guild. It also serves as the  
repo for the tutorial blog series I'm writing to go along with my experience. Please feel free to  
leave comments, suggestions or use it as a base for your own project.  However, I retain the rights  
to my design and would prefer if you use it, that you go your own creative way.  
  
Before beginning you should have [NodeJS](http://www.nodejs.com) and [MongoDB](http://www.mongodb.org/downloads) installed on your computer. As a quick note, I do all of my work using a Mac so any commands I included might not work for Windows users.  
  
##### Credit Where Credit is Due
You will find me referencing many people who are truly much more experienced than I am when it comes to this whole stack. I reference [John Papa](http://twitter.com/john_papa) and [Todd Motto](http://twitter.com/toddmotto) often. You will even see me modify or use snippets from [Angular-Fullstack](https://github.com/DaftMonk/generator-angular-fullstack) because I find those guys do a great job.  
  
### Usage

Clone the repo

`git clone git@github.com:strues/TopShelf.git yourApp`


Run `npm install && bower install`, in order to get started.


Run `gulp serve` to launch the development.

### Features

**Client Side**

* Scripts: `JavaScript`
* Markup:  `HTML`
* Stylesheets: `Sass`
* Task Runner: `Gulp`
* Angular: `1.3 RC1` `Restangular` `ui.router` `Angular Strap`


**Server Side**

* Server: `Express.js`
* Database: `MongoDB`
* Authentication: `Passport Local w/ JWT`
* oAuth: `Facebook` `Twitter` `Google` `Battle.net (soon)`


## Project Structure

Overview

    |── app
    |   ├── js                 - Everything related to Angular and our app
    |          |___ common      - Appwide things such a directives, navbar and auth
    |   ├── assets              - Fonts, Images, etc
    |   ├── bower_components    - Bower installations
    |
    |
    ├── test                    - Testing
    |
    |── server
        ├── api                 - Our express REST api 
        ├── authorization       - Passport strategies
        ├── components          - Errors for the most part (404)
        ├── config              - Express settings and environemtn
        │   └── environment     - Node env configurations
        └── views               - Server rendered jade views

A look inside the main component in `client/app`

    home
    ├── home.js                 - Routes
    ├── homeCtrl.js             - Controller for our main route
    ├── home.tpl.html           - View

Inside of the api at`server/api`

    users
    ├── index.js                - Routes
    ├── user.controller.js      - Controller for the users endpoint
    ├── user.model.js           - Mongoose model


### To Do
* Style and design          - Not the highest priority at the moment
* Integrate Battle.net API
* Setup ngGrid or ngTable   - For roster management
* Setup XML parsing         - For guild bank and attendence tracking
* Create calendar           - For raid management
* Cleanup Code              - Controller As syntax for everything
