import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'menu-topo',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu-topo.component.html',
  styleUrl: './menu-topo.component.css'
})
export class MenuTopoComponent {
  items = [
    {
      label: 'Início',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'Ferramentas',
      icon: 'pi pi-fw pi-wrench',
      items: [
        {
          label: 'Criptografia',
          icon: 'pi pi-chart-bar',
          items: [
            {
              label: 'Md5',
              icon: 'pi pi-fw pi-bookmark'
            }
          ]
        },
        {
          label: 'Codificação',
          icon: 'pi pi-fw pi-qrcode',
          items:[
            {
              label: 'Base64',
              icon: 'pi pi-fw pi-qrcode'
            },
            {
              label: 'Json Beautify',
              icon: 'pi pi-fw pi-code'
            },
            {
              label: 'Json Stringfy',
              icon: 'pi pi-fw pi-code'
            },
            {
              label: 'Lacws',
              icon: 'pi pi-fw pi-code'
            }
          ]
        },
        {
          separator: true
        },
        {
          label: 'Geradores',
          icon: 'pi pi-fw pi-external-link',
          items:[
            {
              label: 'Cpf',
              icon: 'pi pi-fw pi-id-card'
            },
            {
              label: 'Cnpj',
              icon: 'pi pi-fw pi-id-card'
            }
          ]
        },
        {
          label: 'Verificadores',
          icon: 'pi pi-fw pi-verified',
          items:[
            {
              label: 'Cpf',
              icon: 'pi pi-fw pi-verified'
            },
            {
              label: 'Cnpj',
              icon: 'pi pi-fw pi-verified'
            }
          ]
        }
      ]
    }
  ];
}
