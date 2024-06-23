import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    if(process.argv.length < 3) {
        console.log("Error: No URL provided");
        return;
    }
    if(process.argv.length > 3) {
        console.log("Error: Too many arguments");
        return;
    }
    const baseURL = process.argv[2];
    console.log(`Crawling ${baseURL}`);
    const pages = await crawlPage(baseURL);
    printReport(pages);
}

main();