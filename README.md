Top Shelf Guild
===========


A website built for Top Shelf, a World of Warcraft guild using MongoDB, Angular.js, Express.js, and Node.js.

#### Intro  
Top Shelf is an SPA for managing my World of Warcraft guild's website. Please feel free to leave comments, submit pull requests or use it as a base for your own project.  

##### Currently in early(ish) stages of development: Version: 0.0.9 - Alpha

###### Everything is in a usable state as long as you know the basics.

Alpha 1 ETA: This weekend.

Before beginning you should have [NodeJS](http://www.nodejs.com) and [MongoDB](http://www.mongodb.org/downloads) installed on your computer. As a quick note, I do all of my work using a Mac so any commands I included might not work for Windows users.  



### Usage

Clone the repo

`git clone git@github.com:strues/TopShelf.git yourApp`


Run `npm install && bower install`

Navigate to `src/server/config/environment` and rename index.example.js to index.js. Make sure to edit all the fields that have
caps for values to match your settings. You can either setup the MongoDB database yourself or use a BaaS such as [Mongolab](http://www.mongolab.com). You're going to need to change the development and production files inside the environment folder as well.  

Due to the fact that this is still fairly early in the development phases much of the frontend configuration will require you
to manually change things such as Top Shelf to whatever your guild is named.

Run `gulp serve` to launch the development server.

### Features

**Client Side**

* Scripts: `JavaScript`
* Markup:  `HTML`
* Stylesheets: `libSass`
* Task Runner: `Gulp`
* Angular: `1.3.15`


**Server Side**

* Server: `Express.js`
* Database: `MongoDB`
* Authentication: `Passport Local w/ JWT`

A look inside the core component in `src/client/app/core`


    core
    ├── core.module.js          - Routes
    ├── directives              - Appwide directives
    ├── services                - Services for the entire app
    ├── filters                 - Filters for the entire app
    ├── core-home                  - your states  (home)

Inside of the api at`server/api`

    users
    ├── index.js                - Routes
    ├── user.controller.js      - Controller for the users endpoint
    ├── user.model.js           - Mongoose model


### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| account/profile/profile.controller.js | 12 | Implement a members list with this information
| admin/media/adminMedia.controller.js | 28 | Add the ability to delete uploads. Expanded media functionality.
| guild/guild-apply/application.controller.js | 37 | fix typeahead
| guild/guild-apply/application.controller.js | 38 | fix dependency injection errors from fabform
| admin/applications/details/ApplicationView.controller.js | 22 | refactor into its own service
| admin/news/create/NewsCreate.controller.js | 21 | implement image upload

##### Credit Where Credit is Due
You will find me referencing many people who are truly much more experienced than I am when it comes to this whole stack. I reference [John Papa](http://twitter.com/john_papa) and [Todd Motto](http://twitter.com/toddmotto) often. You will even see me modify or use snippets from [Angular-Fullstack](https://github.com/DaftMonk/generator-angular-fullstack) because I find those guys do a great job.  
