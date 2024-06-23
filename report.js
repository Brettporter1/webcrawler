function printReport(pages) {
    console.log('Report starting');
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    for (const page in sortedPages) {
        console.log(`Found ${sortedPages[page][1]} pages at ${sortedPages[page][0]}`);
    }
}

export { printReport };