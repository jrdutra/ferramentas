import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../data.service';
import {
  ComparadorService,
  FormatoEntrada,
  LinhaRender,
  ResultadoComparacao,
} from '../../services/comparador/comparador.service';

@Component({
  selector: 'app-comparador-json-yaml',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './comparador-json-yaml.component.html',
  styleUrl: './comparador-json-yaml.component.css',
})
export class ComparadorJsonYamlComponent implements OnInit {

  readonly formatos: { id: FormatoEntrada; nome: string }[] = [
    { id: 'auto', nome: 'Automatic' },
    { id: 'json', nome: 'JSON' },
    { id: 'yaml', nome: 'YAML' },
  ];

  textoA = '';
  textoB = '';
  formato: FormatoEntrada = 'auto';

  resultado: ResultadoComparacao | null = null;
  comparado = false;

  constructor(private dataService: DataService, private comparador: ComparadorService) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('JSON & YAML Comparator');
  }

  temConteudo(): boolean {
    return this.textoA.trim().length > 0 && this.textoB.trim().length > 0;
  }

  comparar(): void {
    this.resultado = this.comparador.comparar(this.textoA, this.textoB, this.formato);
    this.comparado = true;
  }

  editar(): void {
    this.comparado = false;
  }

  limpar(): void {
    this.textoA = '';
    this.textoB = '';
    this.resultado = null;
    this.comparado = false;
  }

  exemplo(): void {
    this.textoA = [
      '{',
      '  "name": "Service A",',
      '  "version": "1.2.0",',
      '  "active": true,',
      '  "port": 8080,',
      '  "database": {',
      '    "host": "localhost",',
      '    "port": 5432',
      '  },',
      '  "tags": ["api", "internal"]',
      '}',
    ].join('\n');
    this.textoB = [
      'name: Service A',
      'version: 1.3.0',
      'active: true',
      'database:',
      '  host: db.prod',
      '  port: 5432',
      '  ssl: true',
      'tags:',
      '  - api',
      '  - external',
    ].join('\n');
    this.formato = 'auto';
    this.comparado = false;
    this.resultado = null;
  }

  classeLinha(l: LinhaRender): string {
    return l.classe;
  }
}
