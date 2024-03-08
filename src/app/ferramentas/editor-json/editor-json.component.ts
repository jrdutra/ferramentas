import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-editor-json',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './editor-json.component.html',
  styleUrl: './editor-json.component.css'
})
export class EditorJsonComponent {

  strJson: string = '';

  minificaJson(){
    this.strJson = "minifica"
  }

  formataJson(){
    this.strJson = "formata"
  }

  stringficaJson(){
    this.strJson = "stringfica"
  }

}
