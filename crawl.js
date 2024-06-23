import { JSDOM } from 'jsdom';

function normalizeURL(url){
    const normalizeURL = new URL(url);
    const newURL = `${normalizeURL.hostname}${normalizeURL.pathname}`
    if(newURL.endsWith('/')){
        return newURL.slice(0, -1);
    }
    return newURL;
}

function getURLsFromHTML(html, baseURL){
    const urls = [];
    const dom = new JSDOM(html);
    const anchors = Array.from(dom.window.document.querySelectorAll('a'));
    for (const anchor of anchors){
        let href = anchor.getAttribute('href');
        try {
            if(href){
                href = new URL(href, baseURL).href;
                urls.push(href);
            }
            
        } catch (err) {
            console.log(`Error: ${err.message}`   )
        }
    }
    return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){
    const currentHost = new URL(currentURL).hostname;
    if(currentHost !== new URL(baseURL).hostname){
        return pages;
    }
    const currentNormalizedURL = normalizeURL(currentURL);
    if(pages[currentNormalizedURL]){
        pages[currentNormalizedURL]++;
        return pages;
    }else{
        pages[currentNormalizedURL] = 1;
    }
     
   const urls = await fetchPage(currentURL);
    for (const url of urls){
         if(!pages[normalizeURL(url)]){
              await crawlPage(baseURL, url, pages);
         }
    }
    return pages;
}

async function fetchPage(url){
    let response;
    try {
         response = await fetch(url);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
        if(response.status > 399){
            throw new Error(`Error: ${response.status}`);
        }
        if(response.headers.get('content-type' !== 'text/html')){
            throw new Error("Error: Not an HTML page");
        }
        const html = await response.text();
        const urls = getURLsFromHTML(html, url);
        return urls;
    }


export { normalizeURL, getURLsFromHTML, crawlPage };