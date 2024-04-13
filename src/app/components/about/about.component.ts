import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { AboutDoc } from './about.resolver';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styles: ``
})
export class AboutComponent {

  constructor(public route: ActivatedRoute) { }

  about = this.route.snapshot.data['data'] as AboutDoc;

}
