import { inject, isDevMode } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ResolveFn } from '@angular/router';

export type AboutDoc = {
  name: string;
  description: string;
};

export const aboutResolver: ResolveFn<AboutDoc> = async () => {
  
  const db = inject(Firestore);

  const aboutSnap = await getDoc(
    doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
  );

  if (!aboutSnap.exists()) {
    throw 'Document does not exist!';
  }

  const data = aboutSnap.data() as AboutDoc;

  if (isDevMode()) {
    console.log(data);
  }

  return data;
};
