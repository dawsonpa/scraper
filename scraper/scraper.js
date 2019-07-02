"use strict"

const cheerio = require('cheerio');
const axios = require('axios');
const BluePromise = require('bluebird');
const SiteMapGenerator = require('sitemap-generator');
const fs = require('fs')
const xml2js = require('xml2js')


/*
* Generate Site Map
* Iterate Through Pages
* Download html from Each Page
* Search each pages text for key word
* Isolate first occurence and retrieve context for the word
* print out page url, and word with context
* Finally Print out total number of pages crawled
*
* */

// function getWebpage

// function() {
//
// }


function run(webpage, term) {
    const generator = SiteMapGenerator(webpage, {
        stripQuerystring: false
    })

    generator.on('done', () => {
        main(term)
    })
    console.log('Creating the site map. Please wait this could take several minutes depending on the site.')
    generator.start()
}

function main(term) {
    const parser = new xml2js.Parser();
    const xmlData = fs.readFile(__dirname +  '/sitemap.xml', (err, data) => {
        parser.parseString(data, (err, result) => {
            console.log('...xml parsed...');
            let totalScraped = 0;
            let pagesWithKeyWord = 0;
            const successArr = []
            return BluePromise.map(result.urlset.url, urlObj => {
                const url = urlObj.loc[0];
                return axios.get(url)
                    .then(response => {
                        const $ = cheerio.load(response.data);
                        const htmlText = $('html *').text();
                        const isText = htmlText.search(term);
                        if(isText !== -1) {
                            const context = htmlText.slice(isText - 20, isText + 50 )
                            console.log(url, context);
                            pagesWithKeyWord++
                        } else {
                            // console.log(`${url} does not contain ${term}`)
                        }
                        totalScraped++
                    })
                    .catch(err  => {
                        console.error(`There was trouble trying to scrape  ${url}`, err)
                    })
            }). then(() => {
                console.log(`Crawled ${totalScraped}. Found ${pagesWithKeyWord} with the term '${term}'`)
            })
        })
    })
}
console.log(process.argv[2], process.argv[3])

run(process.argv[2], process.argv[3])