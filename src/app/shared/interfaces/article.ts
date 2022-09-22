export interface Article {
  key: string;
  name: string;
  text: string;
  fileUrl: string;
  fileName: string;
  magazine: string;
  journalist: string;
  genre: string;
  uploader: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  uploadDate: number;
}
