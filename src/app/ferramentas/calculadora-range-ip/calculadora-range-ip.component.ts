import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../data.service';
import { calculateIpv4Range, Ipv4RangeResult } from './ipv4-range.util';

@Component({
  selector: 'app-calculadora-range-ip',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './calculadora-range-ip.component.html',
  styleUrl: './calculadora-range-ip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculadoraRangeIpComponent implements OnInit {
  readonly commonPrefixes = [8, 16, 22, 24, 30, 31, 32];

  cidr = '192.168.1.10/24';
  errorMessage = '';
  result: Ipv4RangeResult | null = null;
  copied = false;

  constructor(
    private readonly dataService: DataService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.setTituloAplicacao('IPv4 CIDR Range Calculator');
    this.calculate();
  }

  onCidrInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maskedValue = this.applyCidrMask(input.value);
    input.value = maskedValue;
    this.cidr = maskedValue;
    this.copied = false;
    this.calculate();
  }

  applyPrefix(prefix: number): void {
    const currentIp = this.cidr.split('/')[0] || '192.168.1.10';
    this.cidr = `${currentIp}/${prefix}`;
    this.copied = false;
    this.calculate();
  }

  clear(): void {
    this.cidr = '';
    this.result = null;
    this.errorMessage = '';
    this.copied = false;
  }

  copyResult(): void {
    if (!this.result || typeof navigator === 'undefined') return;

    const output = [
      `CIDR: ${this.result.cidr}`,
      `Subnet mask: ${this.result.subnetMask}`,
      `Network: ${this.result.networkAddress}`,
      `Broadcast: ${this.result.broadcastAddress}`,
      `Complete range: ${this.result.networkAddress} - ${this.result.broadcastAddress}`,
      `Usable range: ${this.result.firstUsableAddress} - ${this.result.lastUsableAddress}`,
      `Total addresses: ${this.result.totalAddresses}`,
      `Usable addresses: ${this.result.usableAddresses}`
    ].join('\n');

    navigator.clipboard.writeText(output).then(() => {
      this.copied = true;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = false;
        this.cdr.markForCheck();
      }, 2200);
    });
  }

  private calculate(): void {
    if (!this.cidr) {
      this.result = null;
      this.errorMessage = '';
      return;
    }

    const calculation = calculateIpv4Range(this.cidr);
    this.result = calculation.result;
    this.errorMessage = calculation.error;
  }

  private applyCidrMask(value: string): string {
    const sanitized = value.replace(/[^\d./]/g, '');
    const slashPosition = sanitized.indexOf('/');
    const hasSlash = slashPosition >= 0;
    const rawIp = hasSlash ? sanitized.slice(0, slashPosition) : sanitized;
    const rawPrefix = hasSlash ? sanitized.slice(slashPosition + 1).replace(/\//g, '') : '';

    const ip = rawIp
      .split('.')
      .slice(0, 4)
      .map((octet) => octet.slice(0, 3))
      .join('.');

    return hasSlash ? `${ip}/${rawPrefix.slice(0, 2)}` : ip;
  }
}
