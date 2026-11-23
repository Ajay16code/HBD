export interface PhotoMemory {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  defaultPath: string;
  tag?: string;
}

export interface SectionState {
  currentSection: number;
  scrollProgress: number;
}
