const https = require('https');
const fs = require('fs');
const path = require('path');

const FEED_URL = 'https://vivekkaushal.substack.com/feed';
const OUTPUT_PATH = path.join(__dirname, 'src/static/blog-feed.xml');

console.log('Fetching latest blog feed from Substack...');

https.get(FEED_URL, {
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader/1.0)',
  }
}, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch RSS feed: HTTP ${response.statusCode}`);
    process.exit(1);
  }

  const data = [];
  response.on('data', chunk => data.push(chunk));

  response.on('end', () => {
    const feedContent = Buffer.concat(data).toString();

    // Verify that we got valid XML
    if (!feedContent.includes('<?xml')) {
      console.error('Invalid RSS feed response - not valid XML');
      process.exit(1);
    }

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, feedContent, 'utf8');
    console.log(`✓ Blog feed updated successfully at ${OUTPUT_PATH}`);
    console.log(`✓ Feed size: ${(feedContent.length / 1024).toFixed(2)} KB`);
  });
}).on('error', (error) => {
  console.error('Error fetching RSS feed:', error.message);
  process.exit(1);
}).on('timeout', () => {
  console.error('Request timed out');
  process.exit(1);
});
