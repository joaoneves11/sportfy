
export interface Event {
  _id: string;
  name: string;
  icon: string;
  date_time: Date;
  location: string;
  number_people: number;
  description: string;
  category: string;
  user_id: string;
  subscribers: string[];

}
