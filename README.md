# to Use this project install whit npm some packages.
1. npm install json-server -g

execute this project with 
- json-server -w -p 5550 assets/db.json

http://localhost/5550 is the default url for the server.

This Api works with the following urls:

- GET http://localhost:5550/posts
- POST http://localhost:5550/posts
Sending the data in json format like this:
{
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}

- PUT http://localhost:5550/posts/id
Sending the data in json format like the POST form.
- DELETE http://localhost:5550/posts/id
Sending the id of the post


## Open the crud

To practice execution and use install a local server to execute the ajax.html like **live server** in Visual Studio Code.


