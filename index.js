const express = require('express');
const mustache = require('mustache');
const fs = require('fs');

let db = [{
        name: "Dj Blop",
        place: "Blopland",

    },
    {
        name: "Dj Afar",
        place: "afar club",
    },
    {
        name: "Dj Pirate",
        place: "Bois de boubou",

    }
];

let app = express();

app.get("/", function(rep, resp) {
    resp.render('index', {
        // name: 'thomas',
        // adjective: 'pro dof',
        events: db
    });
});

app.get("/test", function(rep, resp) {
    let str = mustache.render("hello {{name}}!!! You strong!", {
        name: "Thomas"
    })
    resp.send(str)
});

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err)
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })

});

app.set('views', './template');
app.set('view engine', 'html');

app.use(express.static("public"));

app.listen(80, "localhost", function() {
    console.log('Server ready to stage');
})