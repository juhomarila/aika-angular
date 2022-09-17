export interface Article {
  key: string;
  name: string;
  text: string;
  fileUrl: string;
  fileName: string;
  file: File;
  magazine: string;
  uploader: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  uploadDate: number;
}
