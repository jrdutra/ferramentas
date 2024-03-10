import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { JsonService } from '../../services/json/json.service'
import { JwtService } from '../../services/jwt/jwt.service'
import { Base64Service } from '../../services/base64/base64.service'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-visualizador-jwt',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './visualizador-jwt.component.html',
  styleUrl: './visualizador-jwt.component.css'
})
export class VisualizadorJwtComponent {

  strJwt: string = '';
  strJwtCabecalho: string = '';
  strJwtCorpo: string = '';
  strJwtAssinatura: string = '';

  textoValidade: string = '';
  textoValidadeVermelho: boolean = true;

  constructor(private dataService: DataService, 
    private jsonService: JsonService, 
    private base64Service: Base64Service,
    private jwtService: JwtService) { }

  ngOnInit(): void {
    this.dataService.setTituloAplicacao("Visualizador de JWT");
  }

  lerTokenJwt() {
    this.strJwt = this.jwtService.extraiToken(this.strJwt);
    this.validaJwt(this.strJwt);

    if (this.jwtService.validaFormatoJwt(this.strJwt)) {
      let { header, body, signature } = this.jwtService.separaJWT(this.strJwt);
      this.strJwtCabecalho = header;
      this.strJwtCorpo = body;
      this.strJwtAssinatura = signature;

      this.strJwtCabecalho = this.base64Service.decodificaTexto(this.strJwtCabecalho);
      this.strJwtCabecalho = this.jsonService.formataJson(this.strJwtCabecalho);

      this.strJwtCorpo = this.base64Service.decodificaTexto(this.strJwtCorpo);
      this.strJwtCorpo = this.jsonService.formataJson(this.strJwtCorpo);
    } else {
      this.strJwtCabecalho = '';
      this.strJwtCorpo = '';
      this.strJwtAssinatura = '';
    }
  }

  validaJwt(strJwt: string): boolean {
    if (this.jwtService.validaFormatoJwt(strJwt)) {
      this.textoValidadeVermelho = false;
      this.textoValidade = 'Válido';
      return true;
    } else {
      this.textoValidadeVermelho = true;
      this.textoValidade = 'Inválido';
      if (!strJwt.trim()) {
        this.textoValidadeVermelho = false;
        this.textoValidade = '';
      }
      return false;
    }
  }

}
