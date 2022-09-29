export interface Journalist {
  key: string;
  name: string;
  info: string;
  fileUrl: string;
  fileName: string;
  genres: string[];
  magazines: string[];
  dateofbirth: {
    day: number;
    month: number;
    year: number;
  };
  uploader: string;
}
