import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-what-is-utily-tools',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './what-is-utily-tools.component.html',
  styleUrl: './what-is-utily-tools.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatIsUtilyToolsComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('What Is utily.tools?');
  }
}
