import {test, expect} from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from './crawl';

test('normalizeURL', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev')).toBe('blog.boot.dev');
    expect(normalizeURL('https://blog.boot.dev')).toBe('blog.boot.dev');
    expect(normalizeURL('http://blog.boot.dev/')).toBe('blog.boot.dev');
    expect(normalizeURL('https://blog.boot.dev/')).toBe('blog.boot.dev');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('getURLsFromHTML', () => {
    const html = `
    <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
    `;
    expect(getURLsFromHTML(html)).toStrictEqual([
        "https://blog.boot.dev/"
    ]);
} );