import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, MatDividerModule],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {
  panelOpenState = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("About");
  }
}
