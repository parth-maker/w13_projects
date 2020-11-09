const fs = require('fs')

function log (message) {
    if (!fs.existsSync('log')) {
        fs.mkdirSync('log')
        console.log('Directory created: ', 'log')
    }
    fs.appendFile('./log/server_log.log', message + '\n',
        function (err) {
            if (err) throw err
            else {
                console.log('done')
            }
        })
}

log('some text blabla')
