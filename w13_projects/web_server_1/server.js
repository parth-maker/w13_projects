// use express framework,
const express = require('express')
const app = express()
// serve static html/css/js files, image, etc..
// good old web site files
// in folder public_html
app.use(express.static('public_html'))

// HOME PAGE http://localhost:8000
app.get('/',
    function (req, res) {
        res.writeHead(200)
        res.end('<h1>Hello World test</h1>')
    }
)
app.get('/byebye', function (req, res) {
    res.send('this is the bybye response')
})

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

// LAST LINE OF CODE- START SERVER - ON PORT 8000
app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
