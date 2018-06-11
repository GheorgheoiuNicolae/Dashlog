export interface Entry {
  id: string;
  name: string;
  description: string;
  date: number;
  dateTime: number;
  geo: {
    latitude: number;
    longitude: number;
  };
  labels: string[];
  checkList: ChecklistItem[];
}
interface ChecklistItem {
  text: string;
  done: boolean;
}