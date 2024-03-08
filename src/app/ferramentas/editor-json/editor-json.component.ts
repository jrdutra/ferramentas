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
  strJsonValido = '...';

  minificaJson(){
    try {
      this.strJson = JSON.stringify(this.strJson);
      this.strJsonValido = "Json válido";
    } catch (error) {
      this.strJsonValido = "Json inválido";
    }
  }

  formataJson(){
    this.strJson = JSON.stringify(this.strJson, null, 2);
  }

  stringficaJson(){
    try {
      this.strJson = JSON.stringify(this.strJson);
      this.strJsonValido = "Json válido";
    } catch (error) {
      this.strJsonValido = "Json inválido";
    }
  }

}
