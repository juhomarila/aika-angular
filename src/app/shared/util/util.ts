import { Article } from 'src/app/shared/interfaces/article';

export function byDateSorter(articles: Article[]) {
  console.log('olen täällä');
  articles.sort((a, b) => {
    return a.date.day - b.date.day;
  });
}
