export interface Article {
  key: string;
  name: string;
  text: string;
  fileUrl: string;
  fileName: string;
  magazine: {
    key: string;
    name: string;
  };
  journalist: {
    key: string;
    name: string;
  };
  genre: string;
  uploader: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  uploadDate: number;
}
