# CSV Uploader, Pipedrive Fullstack Coding Challenge
## Front-end

- Import form displays real-time progress.
- Search field displays names in autocomplete manner and only 20 or less most related items.
- On clicking search result, displays all the data related to the item.
- User interface must be on one page, without any reloads. How it looks, is up to you.
- Frontend must be testable in a way that:
- Import upload field has an id "uploadField" and submit button has id "uploadButton"
- Search field has an id "searchField" and results have id "result-N" where N is the order of item in search result list.

## Back-end

- API tests assume that:
- GET / - Will display UI and all the frontend components mentioned above
- POST /import - for file upload
- POST /search - Payload should be {query : "query"} and result
{"results":[{"id":id, "name":"name", "age": age, "address": "address", "team":
"team"}, ....]}
- Solution is installable by "npm install" and run by "npm start". All dependencies for solution should be installed and started via npm.
- Accepted programming languages: PHP, Node.js, React, Backbone, Vue
- Consider using containerization/virtualization technologies (like docker or vagrant) to ease testing of the service API

## Screenshots

![gif1](https://user-images.githubusercontent.com/10876540/61302715-d94e9c80-a818-11e9-9d4d-fac6dddd79ea.gif)

![gif2](https://user-images.githubusercontent.com/10876540/61302739-e075aa80-a818-11e9-8981-7a67effe5939.gif)

## Tech/framework used
<b>Built with</b>
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [docker](https://www.docker.com/)

## How to use?
Before proceeding make sure you have installed docker and docker-compose.
- To install docker and docker-compose, [Docker Compose](https://docs.docker.com/compose/)
- Clone the repository and then follow the commands.
```
$ cd %repo%
$ docker-compose up
```
- This will build and run the react, node.js and MySQL containers.
- Navigate to http://localhost:3000 in a web browser to see your newly installed application.
- You can also use the following command to further explore the resulting configuration.
```
$ docker ps
```
- To stop and remove the containers.
```
$ docker-compose down
```
