import { Injectable, inject, isDevMode } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export type AboutDoc = {
  name: string;
  description: string;
};

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  db = inject(Firestore);

  data: AboutDoc | null = null;

  async getAbout() {

    const aboutSnap = await getDoc(
      doc(this.db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
      throw 'Document does not exist!';
    }

    this.data = aboutSnap.data() as AboutDoc;

    if (isDevMode()) {
      console.log(this.data);
    }

    return this.data;
  }

}
