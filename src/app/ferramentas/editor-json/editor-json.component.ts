import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../data.service';
import { JsonService } from '../../services/json/json.service'

@Component({
  selector: 'app-editor-json',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './editor-json.component.html',
  styleUrl: './editor-json.component.css'
})
export class EditorJsonComponent {

  strJson: string = '';
  strResultado: string = ''
  strJsonValido = 'Validade do Json';
  textoVermelho: boolean = false;

  constructor(private dataService: DataService, private jsonService: JsonService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Editor de Json");
  }

  minificaJson() {
    if (this.jsonService.seJsonValido(this.strJson)) {
      this.strResultado = this.jsonService.padronizaJson(this.strJson);
    }
  }

  formataJson() {
    if (this.jsonService.seJsonValido(this.strJson)) {
      let jsonPadronizado = this.jsonService.padronizaJson(this.strJson);
      this.strResultado = JSON.stringify(JSON.parse(jsonPadronizado), null, 2);
    }
  }

  stringficaJson() {
    if (this.jsonService.seJsonValido(this.strJson)) {
      this.strResultado = JSON.stringify(this.strJson);
    }
  }

  copiaJsonProcessadoEntrada(){
    this.strJson = this.strResultado;
    this.strResultado = '';
  }
}
