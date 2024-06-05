import { Attachment } from './attachment';

export type Memory = {
  id: string;
  title: string;
  tags: string[];
  media_urls: string[];
  description: string;
  date: string;
};

export type MemoryCreate = {
  title: string;
  tags: string[];
  description: string;
  date: Date;
  mediaForSend: Attachment[];
};
