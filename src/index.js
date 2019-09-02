const app = require('./app');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

require('./database');

const { DESTINATION, createSitemap } = require("./sitemap");

nextApp.prepare()
    .then(async () => {

        // This `server.get()` lets you generate a sitemap on the fly and retrive it from http://your.domain/sitemap.xml
        // It also create a file if you need to open it with your editor.
        app.get("/sitemap.xml", function (req, res) {
            res.header("Content-Type", "application/xml");
            (async function sendXML() {
                let xmlFile = await createSitemap()
                // Send it to the browser
                res.send(xmlFile);
                // Create a file on the selected destination
                fs.writeFileSync(DESTINATION, xmlFile);
            })();
        });


        app.use('/', require('./routes/pages'));
        app.use('/api/notes', require('./routes/notes'));

        const faviconOptions = {
            root: path.join(__dirname,'../static/')
        };
        server.get('/favicon.ico', (req, res) => (
            res.status(200).sendFile('favicon.ico', faviconOptions)
        ));


        app.get('*', (req, res) => {
            return handle(req, res)
        });

        await app.listen(app.get('port'));
        console.log(`>>SERVER ON PORT ${app.get('port')}`);
    })
    .catch(e => console.log('nextApp error'));

module.exports = nextApp;