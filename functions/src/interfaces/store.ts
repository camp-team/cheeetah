import { firestore } from 'firebase';

export interface Store {
  ownerId: string;
  name: string;
  description: string;
  category: string;
  slide: string;
  // avatarURL?: string;
  // createdAt?: firestore.Timestamp;
  // time: string;
  // rating: number;
  // reviews: number;
}
