Top Shelf Guild
===========

A website built for Top Shelf, a World of Warcraft guild using MongoDB, Angular.js, Express.js, and Node.js. 
Also a perfect MEAN seed application with Gulp and Jwt.

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
* Angular: `1.3.1` `ui.router` `ui.bootstrap` 


**Server Side**

* Server: `Express.js`
* Database: `MongoDB`
* Authentication: `Passport Local w/ JWT`
* oAuth: `Facebook` `Twitter` `Google` `Battle.net (soon)`


## Project Structure

Overview

    |── client
    |   ├── views               - Everything related to Angular and our app
    |   |-- directives / services / filters
    |   ├── assets              - Fonts, Images, etc
    |   |__ styles              - Sass files
    |
    |── bower_components
    |
    |
    ├── test                    - Testing
    |
    |__ gulp                    - Gulp tasks
    |
    |── server
        ├── api                 - Our express REST api 
        ├── auth                - Passport strategies
        ├── components          - Errors for the most part (404)
        ├── config              - Express settings and environemtn
        │   └── environment     - Node env configurations
        └── views               - Server rendered jade views


A look inside the home component in `client/app`
    
    The files are all named with .whatever.js because I load them into gulp that way.

    home
    ├── home.module.js          - Routes
    ├── home.controller.js      - Controller for our main route
    ├── home.tpl.html           - View
    ├── home.directive.js       - 
    ├── home.filter.js          - 
    ├── home.service.js         - 

Inside of the api at`server/api`

    users
    ├── index.js                - Routes
    ├── user.controller.js      - Controller for the users endpoint
    ├── user.model.js           - Mongoose model


### To Do

* `MODULARIZE` - ~~instead of having the entire application running from app.~~
* `Composer Post Listing` - Needs to be added to the routes
* `Admin Navigation` - ~~needs proper ui-srefs again~~
* `Session` - session appears to not store. Could be Gulp though.
* `Calendar` - Raid signup and creation module
* `Roster` - Integrate with Battlenet Armory. Currently waiting for them to fix their API.
* `Add Characters` - Link characters to user accounts

