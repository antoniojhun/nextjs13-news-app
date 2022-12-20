import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "au,us,gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          published_at
          language
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;
  const decodeString = (str) => {
    return str
      .replace(/\\u[\dA-F]{4}/gi, (unicode) => {
        return String.fromCharCode(parseInt(unicode.replace(/\\u/g, ''), 16));
      })
      .replace(/&amp;/g, '&');
  };
  // Fetch function with Next.js 13 caching
  const res = await fetch(
    'https://villagesell.stepzen.net/api/lumbering-beetle/__graphql',
    {
      method: 'POST',
      cache: isDynamic ? 'no-cache' : 'default',
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },

      body: decodeString(
        JSON.stringify({
          query,
          variables: {
            access_key: process.env.NEWS_API_KEY,
            categories: category,
            keywords: keywords,
          },
        })
      ),
    }
  );

  console.log(
    'Fetching news from API with category: ',
    category,
    ' and keywords: ',
    keywords
  );

  const newsResponse = await res.json();

  // Sort function by images vs not images present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  // Return news
  return news;
};

export default fetchNews;

// Example Import
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY"
// Example with category, country specified
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=YOUR_ACCESS_KEY&countries=au%2Cus%2Cgb&category=sports%2Chealth&limit=100&offset=0&sort=published_desc"
