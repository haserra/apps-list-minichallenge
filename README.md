# AppsListMiniChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.


## Important note before running the application 

 - This application has been developed in Angular 7. Given the provided JSON file that provides a list of apps as input data, I made  the choice to include a Mock Server based on  JSON Server (https://github.com/typicode/json-server) that can act as a quick back-end for prototyping and mocking. This way  we will get a full REST API end point, which is quite convenient. 

 - The apps.json file is available at the \mocks folder. 


## To get the app up and running the following steps should be taken

- Node.js (and npm ) should be  installed.

- Install all modules listed as dependencies in package.json (including JSON Server)
	> npm install

- Start JSON Server
    > npm run mock:server (as described in the scripts property of package.json )
    or directly:
    > json-server --watch mocks/apps.json

- JSON server will be listening on port 3000:
  - http://localhost:3000/
  - http://localhost:3000/apps


- Because we will be running both the Angular App and JSON Server on localhost, even though  they will run on different ports, the browser treats them as different origins therefore won’t allow calls across domains and origins. To get around this (CORS)  I’ve settled  a proxy, so that all requests that would be sent to the server, would then proxy to the final endpoint. To do this,  a file proxy.conf.json has been created in the main folder of the Angular application.  

- So it's finally possible to run the application 
 > npm run start:proxy (as described in the scripts property of package.json)
 or directly:
 > ng serve --proxy-config proxy.config.json --open --port 4201

- ngular CLI Development server will be listening on port 4201, and the App will be served:
	http://localhost:4201





### App architecture

The Angular app consists of the following components
- App Component : root tree component
- Categories Component : responsible for rendering the categories on the left navigation bar . It allows filtering the list of apps by category.
- ApplistComponent: responsible for rendering  the apps (all of them or filtered by category). It also includes pagination and a search bar that provides  a search as-you-type functionality.
- AppItemComponnet : Applist Component its child’s – responsible for rendering the Apps Details as described in JSON file.
- TdAppService: It works as a layer across all the components of the tree providing services that retrieve data from the Mock server.

## Features/ Functionalities
- List all the apps – Done – When the app starts or when the user clicks “All categories”.
- Paginate the list (page size = 3) – Done.  Pagination is working when all categories have been listed or filtered . In either case  if the number of apps retrieved from the server is greater or equal to 3 than all the 3 pages will be made available.   Please check the algorithm chosen to implement this.
- Filter the apps as you type in the search bar – Done. Search as-you-type works when all the apps have been retrieved or filtered.
- Have all the existing categories in the left navigation sorted by alphabetic order - Done
- Allow filtering of apps when we click on a category - Done
- Apps should be sorted by ascending order of the sum of the plans price - Done






## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

(TBD)

## Running end-to-end tests

TBD




## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
