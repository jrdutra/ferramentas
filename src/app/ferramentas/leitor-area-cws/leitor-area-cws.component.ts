import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-leitor-area-cws',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './leitor-area-cws.component.html',
  styleUrl: './leitor-area-cws.component.css'
})
export class LeitorAreaCwsComponent {
  esconderBrancoseZeros = true;

}
