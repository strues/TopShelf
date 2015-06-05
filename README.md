Built with ![Alt Text](http://img-cache.cdn.gaiaonline.com/36f426e214c347d0d23f9ee897a3fcf1/http://i89.photobucket.com/albums/k239/bjf092/TinyBlackHeart.gif "logo") by [@itsSoop](https://twitter.com/itsSoop)

# [TSG](https://topshelfguild.com)

#### Contents
- What Is It?
- How Do I Use It?
- Software Stack
- Features
- Gulp Tasks
- Provided Libraries
- Todo

#### What Is It?
A CMS inspired, web application and Gulp workflow for guild management, specifically [Top Shelf](https://topshelfguild.com).

#### How Do I Use It?

###### The current version is still under heavy development -- Use at your own risk
Most things are indeed functioning (some very well) however, there are changes happening all the time.

```
git clone git@github.com:strues/topshelf.git
```

Then

```
npm install && bower install
```

#### Software Stack
- All the JavaScript (MEAN)
- Sass(SCSS)
- Gulp
- Angular 1.3.15
- Mongoose (MongoDB)
- Node (Express)

## Features
- SCSS
- Angular annotations
- Livereloading w/ BrowserSync and Nodemon
- Fully working Express server
- Swag and lots of it
-----------------------------------------------
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

----------------------------------------------------
## Gulp Tasks
| Tasks        | Are           |
| ------------- |:-------------:| -----:|
| apidoc        | Generates api documentation |
| clean    | Deletes the tmp, build, and doc folders (together or individually).      |
| control | Holds the build, vet and help tasks     |
| e2e        | End to end testing |
| fonts        | Copies the fonts to build |
| images        | Creates spritesheets and compresses images |
| inject        | Injects the bower files and project files into the index |
| optimize        | Annotates, uglifies, concats and other prep for building |
| partials        | Creates a templatecache for Angular |
| sass        | Compiles SCSS files into CSS |
| serve        | Starts the Express server using Nodemon and launches BrowserSync |
| todo        | Generates TODO documentation |
| unit        | Performs unit testing |
| watch        | Watches your files for changes |

## Provided Libraries:


## Todo
