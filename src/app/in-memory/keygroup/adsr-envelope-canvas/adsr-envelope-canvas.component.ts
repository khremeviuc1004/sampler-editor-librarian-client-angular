import { AfterViewInit, Component, ElementRef, Input, numberAttribute, ViewChild } from '@angular/core';

@Component({
  selector: 'app-adsr-envelope-canvas',
  standalone: true,
  imports: [],
  templateUrl: './adsr-envelope-canvas.component.html',
  styleUrl: './adsr-envelope-canvas.component.scss'
})
export class ADSREnvelopeCanvasComponent implements AfterViewInit {

  @ViewChild('envelopeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input({transform: numberAttribute}) width = 400;
  @Input({transform: numberAttribute}) height = 100;
  context?: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    const htmlCanvas  = this.canvasRef.nativeElement;
    this.context = htmlCanvas.getContext('2d');
    htmlCanvas.height = this.height;
    htmlCanvas.width = this.width;
  }

  public drawEnvelope(attack: number, decay: number, sustain: number, release: number) {
    if (this.context) {
      this.context.lineWidth = 1;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';

      this.context.fillStyle = 'lightgray';
      this.context.fillRect(0, 0, this.width, this.height);

      this.context.strokeStyle = '#000000';
      this.context.beginPath();
      this.context.moveTo(0, this.height);
      this.context.lineTo(attack, 0);
      this.context.lineTo(attack + decay, this.height - sustain);
      this.context.lineTo(this.width - release, this.height - sustain);
      this.context.lineTo(this.width, this.height);
      this.context.stroke();
    }
  }
}
