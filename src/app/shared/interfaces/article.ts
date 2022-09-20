export interface Article {
  key: string;
  name: string;
  text: string;
  fileUrl: string;
  fileName: string;
  magazine: string;
  uploader: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  uploadDate: number;
}
