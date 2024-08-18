import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private readonly url = 'https://compartilhadortexto-fuf5efeqfjhybte3.brazilsouth-01.azurewebsites.net'; // URL do seu servidor

  constructor() {
    this.socket = io(this.url, {
      rejectUnauthorized: false
    });
  }

  conect(){
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.io');
    });
  }

  // Método para emitir eventos
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Método para ouvir eventos
  on(event: string): Observable<any> {
    const subject = new Subject<any>();
    this.socket.on(event, (data) => subject.next(data));
    return subject.asObservable();
  }
}
