const https = require('https');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rssData = await new Promise((resolve, reject) => {
      const request = https.get('https://vivekkaushal.substack.com/feed', {
        timeout: 5000, // 5 second timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader/1.0)',
        }
      }, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch RSS feed: ${response.statusCode}`));
          return;
        }

        const data = [];
        response.on('data', chunk => data.push(chunk));
        response.on('end', () => resolve(Buffer.concat(data).toString()));
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Request timed out'));
      });
    });

    // Verify that we got valid XML
    if (!rssData.includes('<?xml')) {
      throw new Error('Invalid RSS feed response');
    }

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=600'); // Cache for 10 minutes
    return res.status(200).send(rssData);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch RSS feed',
      details: error.message 
    });
  }
} 