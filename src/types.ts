export interface Module {
  id: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  hours: number;
  badge?: string;
  modules: Module[];
}
