# Cyberhawk

This repo contains the source code for Cyberhawk 2015 website.


Cyberhawk is an online competition conducted by IECSE, Manipal where obscure questions
are to be answered by people. 


### How to build

To build, `gulp` is expected to be present, along with `npm` and `sass`.

* `npm install` after entering into the folder to pull all dependences
* `gem install sass` for SASS preprocessor
* `gulp` to create a local webserver that builds and compiles to the `dist/` folder


### How to deploy

run `gulp`, and copy everything from `dist/` to the folder where we want to deploy to.