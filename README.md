# Crate.io Frontend Developer Challenge.

> Author: Halil KAYER

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and depend on [crate.io](https://hub.docker.com/_/crate)
Docker image.

## How to run this repo?
In order to up and run this repository, you should have `docker` and `yarn` installed on your machine.
First things first. Before run any available scripts below, you should install the dependencies
```shell script
➜ yarn 
``` 

After install all dependencies, you can use the available scripts now. There are two commands for your convenience
 to download and run crate.io image and import sample data.
 
This download the crate.io image if you don't have then run it exposing `4200` port.
```shell script
➜  yarn docker:crate
```
It's always wise to check whether the container is running or not
```shell script
➜  docker ps
``` 
if you see:
```shell script
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                                        NAMES
b673c9517dcf        crate               "/docker-entrypoint.…"   About a minute ago   Up About a minute   4300/tcp, 0.0.0.0:4200->4200/tcp, 5432/tcp   clever_ride
```

your good to go for second docker script which imports the sample data.
```shell script
➜  yarn docker:import
```

if the chances are good. You'll see this output:
```shell script
yarn run v1.19.1
$ node scripts/import.js
data for films is persisted
data for planets is persisted
data for people is persisted
data for species is persisted
data for starships is persisted
✨  Done in 1.55s.
```

You're almost there. Let's see this data we just imported:

in order to avoid CORS issue of the crate's docker cluster, I use a proxy node server
allow me to request data without hassle, to do so,

Run
```shell script
yarn start-proxy
``` 

script and you will see this output:
```shell script
Start proxy on port 4201 for http://localhost:4200
```
then you can start the app with running
```shell script
yarn start
``` 
**~~Before you head your browser, I couldn't manage CORS issue and went for a quick win with installing a browser plugin [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) for enabling CORS against the crate's docker container.~~**

Then open your browser and type `localhost:3000`

## Friendly warning
This project also uses pretty smart [useFetch](https://github.com/CharlesStover/fetch-suspense) library.
when you first click the tables in the list you will catch a flicker. that's actually showing `<Loading />`
until the data load.

## Available Scripts

In the project directory, you can run:

### `docker:crate`

Spins up the crate's docker image in the background. If you don't have the image on your system it will download first then run it.
Downloading image may take same time.

### `docker:import`

imports the sample data into crate db's cluster.

### `yarn start-proxy`

Starts proxy node server for crate's local cluster. 

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:debug`

Launches the test runner in the interactive watch mode with debugging support.<br />
After run this script headover your chrome browser and type `chrome://inspect`
Click the node specific devtools. You can debug your test right into chrome developer tools.
