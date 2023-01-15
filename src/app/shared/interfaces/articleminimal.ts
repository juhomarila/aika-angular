export interface ArticleMinimal {
  key: string;
  name: string;
  magazine: {
    key: string;
    name: string;
  };
  journalist: {
    key: string;
    name: string;
  };
}
