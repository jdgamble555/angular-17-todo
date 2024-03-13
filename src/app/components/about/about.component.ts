import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AboutDoc } from './about.service';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styles: ``
})
export class AboutComponent {

  private route = inject(ActivatedRoute);

  about = this.route.snapshot.data['data'] as AboutDoc;

  /*
  about = toSignal<AboutDoc>(
    this.route.data.pipe(
      map((v) => v['data'])
    )
  );
  */

}
