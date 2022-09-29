export interface Magazine {
  key: string;
  name: string;
  info: string;
  fileUrl: string;
  fileName: string;
  genres: string[];
  hometown: string;
  journalists: string[];
  foundingdate: {
    day: number;
    month: number;
    year: number;
  };
  uploader: string;
}
