const path = require("path");
const glob = require("glob");
const fs = require("fs");
const axios = require("axios");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const SITE_ROOT = "https://notemash.herokuapp.com";

// SOURCE is where are stored all pages files
// By default it tracks all files in the pages folder
// without considering the ones starting with `_` (e.g. _document.js and _app.js)
const SOURCE =
  process.env.SOURCE || path.join(resolveApp("pages"), "/**/!(_*).js");

// API_SOURCE is the endpoint of you api
// Update example.com/api with your endpoint or set the env variable
const API_SOURCE = "https://notemash.herokuapp.com/api/getUsers";

// DESTINATION is where the real file is exported
// By default is .next/static/sitemap.xml
const DESTINATION =
  process.env.DESTINATION ||
  path.join(resolveApp(".next/static"), "sitemap.xml");


const createSitemap = async () => {

  /**
   * STEP 1: Store all static pages url
   **/
  let diskPages = glob.sync(SOURCE);
  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  diskPages.forEach(page => {
    let stats = fs.statSync(page);
    let modDate = new Date(stats.mtime);
    let lastMod = `${modDate.getFullYear()}-${(
      "0" +
      (modDate.getMonth() + 1)
    ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;

    page = page.replace(resolveApp("pages"), "");
    page = page.replace(/.js$/, "");
    page = `${SITE_ROOT}${page}`;

    if (page.match(/.*\/index$/)) {
      page = page.replace(/(.*)index$/, "$1");
    }

    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<lastmod>${lastMod}</lastmod>`;
    xml += "</url>";
  });
  /*
  await axios.post(API_SOURCE)
    .then(res => {
      res.data.map(user => {
        xml += "<url><loc>";
        xml += `${SITE_ROOT}/${user.username}`;
        xml +="</loc>";
        xml += `<lastmod>${user.updatedAt}</lastmod>`;
        xml +="</url>";
      })
    })
    .catch(error => {
      console.log(error.message, error.name);
    });*/
  xml += "</urlset>";
  return xml;
  /*
  return axios
    .post(API_SOURCE, {
      query: `{
        productList: {
          product: {
            slug
          }
        } 
      }`
    })
    .then(resp => {
      console.log(res);
      let { productList } = resp.data;
      productList.forEach((product, index) => {
        xml += "<url><loc>";
        xml += `${SITE_ROOT}/products/${product.slug}`;
        xml +=
          "</loc><changefreq>always</changefreq><priority>0.5</priority></url>";
        if (product === productList.length - 1) {
          xml += "</urlset>";
        }
      });
      return xml;
    })

    
    .catch(error => {
      console.log(error.message, error.name);
    });
    */
};

module.exports = { DESTINATION, createSitemap };