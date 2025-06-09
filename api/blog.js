const https = require('https');
const { DOMParser } = require('xmldom');

// In-memory cache
let blogCache = null;
let lastFetch = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function fetchAndParseFeed() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (blogCache && now - lastFetch < CACHE_DURATION) {
    return blogCache;
  }

  const rssData = await new Promise((resolve, reject) => {
    const request = https.get('https://vivekkaushal.substack.com/feed', {
      timeout: 10000, // 10 second timeout
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

  // Parse XML server-side
  const parser = new DOMParser();
  const doc = parser.parseFromString(rssData, 'text/xml');
  const items = Array.from(doc.getElementsByTagName('item'));

  const posts = items.map(item => {
    const title = item.getElementsByTagName('title')[0]?.textContent || '';
    
    // Get content from various possible fields
    const contentNode = 
      item.getElementsByTagName('content:encoded')[0] ||
      item.getElementsByTagNameNS('*', 'encoded')[0] ||
      item.getElementsByTagName('description')[0];
    
    const content = contentNode?.textContent || '';
    
    // Clean up CDATA sections
    const cleanContent = content
      .replace(/<!\[CDATA\[/g, '')
      .replace(/\]\]>/g, '');
    
    const link = item.getElementsByTagName('link')[0]?.textContent || '';
    const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '';
    const date = pubDate ? new Date(pubDate) : new Date();
    
    // Get description (usually shorter than full content)
    const description = item.getElementsByTagName('description')[0]?.textContent || '';
    const cleanDescription = description
      .replace(/<!\[CDATA\[/g, '')
      .replace(/\]\]>/g, '')
      .replace(/<[^>]*>/g, '') // Strip HTML tags for preview
      .substring(0, 200); // Limit description length
    
    // Create URL-friendly slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      title,
      content: cleanContent,
      link,
      date: date.toISOString(),
      slug,
      description: cleanDescription
    };
  });

  // Update cache
  blogCache = posts;
  lastFetch = now;
  
  return posts;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    const posts = await fetchAndParseFeed();

    if (slug) {
      // Return specific post
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.setHeader('Cache-Control', 'public, s-maxage=3600'); // Cache individual posts for 1 hour
      return res.status(200).json(post);
    } else {
      // Return list of posts with minimal data
      const postList = posts.map(post => ({
        title: post.title,
        description: post.description,
        date: post.date,
        slug: post.slug
      }));
      
      res.setHeader('Cache-Control', 'public, s-maxage=600'); // Cache list for 10 minutes
      return res.status(200).json(postList);
    }
  } catch (error) {
    console.error('Error processing blog feed:', error);
    return res.status(500).json({ 
      error: 'Failed to process blog feed',
      details: error.message 
    });
  }
} 