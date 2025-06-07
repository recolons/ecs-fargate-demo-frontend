import { Section } from "./section.model";

export interface Article {
  id: string;
  title: string;
  content: string;
  section: Section;
  date: Date;
} 