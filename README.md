Top Shelf Guild
===========
![Travis CI](https://travis-ci.org/strues/TopShelf.svg?branch=master)
  
A website built for Top Shelf, a World of Warcraft guild using MongoDB, Angular.js, Express.js, and Node.js. 

#### Intro  
This is a repository for an SPA I'm building for my World of Warcraft guild. Please feel free to  
leave comments, suggestions or use it as a base for your own project.  
  
  ##### Currently in early(ish) stages of development

Before beginning you should have [NodeJS](http://www.nodejs.com) and [MongoDB](http://www.mongodb.org/downloads) installed on your computer. As a quick note, I do all of my work using a Mac so any commands I included might not work for Windows users.  
  

  
### Usage

Clone the repo

`git clone git@github.com:strues/TopShelf.git yourApp`


Run `npm install && bower install`, in order to get started.

Navigate to `server/config/environment` and rename index.example.js to index.js. Make sure to edit all the fields that have
caps for values to match your settings. You can either setup the MongoDB database yourself or use a BaaS such as [Mongolabs](http://www.mongolabs.com). You're going to need to change the development and production files inside the environment folder as well.  
  
Due to the fact that this is still fairly early in the development phases much of the frontend configuration will require you
to manually change things such as Top Shelf to whatever your guild is named.

Run `gulp serve` to launch the development server.

### Features

**Client Side**

* Scripts: `JavaScript`
* Markup:  `HTML`
* Stylesheets: `Sass`
* Task Runner: `Gulp`
* Angular: `1.3.12`


**Server Side**

* Server: `Express.js`
* Database: `MongoDB`
* Authentication: `Passport Local w/ JWT`
* Session: `Redis`


## Project Structure

Overview

    |── client
    |   ├── app                 - Everything related to our Angular app
    |   ├    ├── accounts       - Account / User module
    |   |    ├── guild          - Guild module
    |   |    ├── core           - Core module
    |   |    ├── admin          - Admin module
    |   |-- index.html
    |   |-- app.module.js       - Bootstrap of the entire application
    |   ├── assets              - Fonts, Images, etc
    |   |__ styles              - Sass files
    |
    |__ bower_components
    |
    |
    ├── test                    - Testing
    |
    |__ gulp                    - Gulp tasks
    |
    |── server
        ├── api                 - Our express REST api
        ├── auth                - Passport Login strategies
        ├── components          - Errors for the most part (404)
        ├── config              - Express settings and environemtn
        │   └── environment     - Node env configurations
        └── views               - Server rendered views


A look inside the core component in `client/app/core`


    core
    ├── core.module.js          - Routes
    ├── directives              - Appwide directives
    ├── services                - Services for the entire app
    ├── filters                 - Filters for the entire app
    ├── states                  - States  (home)

Inside of the api at`server/api`

    users
    ├── index.js                - Routes
    ├── user.controller.js      - Controller for the users endpoint
    ├── user.model.js           - Mongoose model


### To Do

* `MODULARIZE` - ~~instead of having the entire application running from app.~~
* `News Post Listing` - ~~Needs to be added to the routes~~
* `Admin Navigation` - ~~needs proper ui-srefs again~~
* `Session` - ~~Session appears to not store.~~
* `Calendar` - Raid signup and creation module
* `Roster` - Integrate with Battlenet Armory. Currently waiting for them to fix their API.
* `Add Characters` - Link characters to user accounts

##### Credit Where Credit is Due
You will find me referencing many people who are truly much more experienced than I am when it comes to this whole stack. I reference [John Papa](http://twitter.com/john_papa) and [Todd Motto](http://twitter.com/toddmotto) often. You will even see me modify or use snippets from [Angular-Fullstack](https://github.com/DaftMonk/generator-angular-fullstack) because I find those guys do a great job.  
