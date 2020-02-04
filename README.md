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

Run
```shell script
yarn start
``` 
Before you head your browser, I couldn't manage the overcome CORS issue and do the quick win installing a browser plugin
(Allow CORS)[https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf] 
for enabling CORS against the crate's docker container.

Then open your browser and type `localhost:3000`

## Friendly warning
This project also uses pretty smart (`useFetch`)[https://github.com/CharlesStover/fetch-suspense] library.
when you first click the tables in the list you will catch a flicker. that's actually showing `<Loading />`
until the data load.

## Available Scripts

In the project directory, you can run:

### `docker:crate`
Spins up the crate's docker image in the background. If you don't have the image on your system it will download first then run it.
Downloading image may take same time.

### `docker:import`
imports the sample data into crate db's cluster.

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
