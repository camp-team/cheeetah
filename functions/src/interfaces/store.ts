// import { firestore } from 'firebase';

export interface Store {
  storeId?: string;
  ownerId: string;
  storename: string;
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
