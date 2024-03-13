import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AboutDoc, AboutService } from './about.service';


export const aboutResolver: ResolveFn<AboutDoc> = () => {

  const about = inject(AboutService);

  // Don't refetch data
  if (about.data) {
    return about.data;
  }

  return about.getAbout();
};
