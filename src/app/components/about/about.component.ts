import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AboutDoc } from './about.resolver';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './about.component.html',
  styles: ``
})
export class AboutComponent {

  private route = inject(ActivatedRoute);

  about = toSignal<AboutDoc>(
    this.route.data.pipe(
      map((v) => v['data'])
    )
  );

}
