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

// const generator = SiteMapGenerator('https://www.moovweb.com/', {
//     stripQuerystring: false
// })
//
// generator.on('done', () => {
//     console.log('done')
// })
//
// generator.start()


function getURlsFromXML(){

}

function getPageHTML(url) {

}

function checkPageForKeyWord(keyWord) {

}

function run(term) {
    const parser = new xml2js.Parser();
    const xmlData = fs.readFile(__dirname +  '/sitemap.xml', (err, data) => {
        parser.parseString(data, (err, result) => {
            console.log('...xml parsed...');
            const totalScraped = 0;
            const pagesWithKeyWord = 0;
            return BluePromise.map(result.urlset.url, urlObj => {
                const url = urlObj.loc[0];
                return axios.get(url)
                    .then(response => {
                        const $ = cheerio.load(response.data)
                        

                    })
                    .catch(err  => {
                        console.error(`There was trouble trying to scrape  ${url}`, err)
                    })
            })
        })
    })
}

