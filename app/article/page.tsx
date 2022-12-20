import { notFound } from 'next/navigation';
import LiveTimestamp from '../LiveTimestamp';

type Props = {
  searchParams?: Article;
};
function ArticlePage({ searchParams }: Props) {
  if (
    (searchParams && Object.entries(searchParams).length === 0) ||
    !searchParams
  ) {
    return notFound();
  }

  const article: Article = searchParams;

  return (
    <article>
      <section className="flex flex-wrap flex-col lg:flex-row pb-24 px-0 lg:px-10 pt-20">
        {article.image && (
          <img
            className="min-h-fit h-auto w-72 mb-10 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
            src={article.image}
            alt={article.title}
          />
        )}

        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-5">
            {article.title}
          </h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {article.author || 'unknown'}</h2>
            <h2 className="font-bold pl-4">
              Source: {article.source || 'unknown'}
            </h2>
            <p className="pl-4 font-bold">
              <LiveTimestamp time={article.published_at} />
            </p>
          </div>
          <p className="pt-4">{article.description}</p>
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;
