import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-unix-timestamp',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './unix-timestamp.component.html',
  styleUrl: './unix-timestamp.component.css'
})
export class UnixTimestampComponent {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Unix Timestamp");
  }

}
