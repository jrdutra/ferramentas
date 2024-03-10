import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-urlcodec',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './urlcodec.component.html',
  styleUrl: './urlcodec.component.css'
})
export class UrlcodecComponent {

  strUrl: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Codec de URL");
  }

  codificarUrl(){
    this.strUrl = encodeURIComponent(this.strUrl);
  }

  decodificarUrl(){
    this.strUrl = decodeURIComponent(this.strUrl);
  }
}
