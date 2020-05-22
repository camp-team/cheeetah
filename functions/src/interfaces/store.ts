import { firestore } from 'firebase';

export interface Store {
  storeId: string;
  createdAt: firestore.Timestamp;
  name: string;
  description: string;
  // time: string;
  // rating: number;
  // reviews: number;
  // category: string;
  // avatarURL: string;
  // slideURL: string;
}
