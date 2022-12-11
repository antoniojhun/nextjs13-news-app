import { categories } from '../constants';
import fetchNews from '../lib/fetchNews';
import NewsList from './NewsList';
import response from '../__mocks__/response.json';

async function Homepage() {
  // fetch the news data
  const news: NewsResponse =
    response || (await fetchNews(categories.join(',')));

  console.log(news);

  return (
    <div>
      {/* NewsList news */}
      <NewsList news={news} />
    </div>
  );
}

export default Homepage;
