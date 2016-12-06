# USA-NPN Geoserver Request Builder

This repository contains the front end [angular2](https://angular.io/) code for the [USA-NPN geoserver request builder](https://www.usanpn.org/geoserver-request-builder). The main purpose of this project is to guide a user through downloading USA-NPN phenology maps.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

To run the geoserver request builder the following need to be installed:

* [nodejs](https://nodejs.org/en/) - it is recommended to use [nvm](https://github.com/creationix/nvm) to manage multiple versions of nodejs

All additional dependancies are managed through [npm](https://www.npmjs.com/), the node package manager which is included with node.

### Installing

After cloning the project you will need to take the following steps.

cd into the main directory and install all dependancies through npm. 

```
cd geoserver-request-builder
npm install
```
The command installs all dependencies listed in the package.json file into a folder called node_modules.

[Webpack](https://webpack.github.io/) is used to build and bundle the project.

```
cd geoserver-request-builder
npm run build
```

If you are not running the project a webserver like apache or nginx, you can use the webpack dev server to serve the pages

```
cd geoserver-request-builder
npm start
```

## Deployment

A common deployment will look like this
```
cd geoserver-request-builder
sudo git pull
sudo npm install - this is only needed if the commit added a new npm package
sudo npm run build
```

## Related Projects

This repository only contains the front end used to deliver phenology maps to public. The following repository contains the server scripts used to generate the phenology maps nightly which are then delivered through the USA-NPN geoserver instance.

* [USA-NPN Gridded Models Platform](https://github.com/usa-npn/gridded_models)

## Authors

* **Jeff Switzer** - [NPN](https://github.com/usa-npn)
* **Lee Marsh** - [NPN](https://github.com/usa-npn)

See also the list of [contributors](https://www.usanpn.org/about/staff) who participated in this project.
