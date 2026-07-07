import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MenuComponent} from './menu/menu.component'
import {MatCardModule} from '@angular/material/card';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'utily.tools';

  constructor(private readonly seoService: SeoService) {
    this.seoService.init();
  }
}
