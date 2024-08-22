import { AfterViewInit, Component, ElementRef, Input, numberAttribute, ViewChild } from '@angular/core';

@Component({
  selector: 'app-four-stage-envelope-canvas',
  standalone: true,
  imports: [],
  templateUrl: './four-stage-envelope-canvas.component.html',
  styleUrl: './four-stage-envelope-canvas.component.scss'
})
export class FourStageEnvelopeCanvasComponent implements AfterViewInit {

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

  public drawEnvelope(rate1: number, level1: number, rate2: number, level2: number, rate3: number, level3: number, rate4: number, level4: number) {
    let slope1Value = (rate1 === 0 ? 1 : rate1);
    let rate1slope = 99 / slope1Value;
    let level1yint = level1;
    let rate1yint = 0;
    let line1x1 = 0;
    let line1y1 = 0;
    let line1x2 = (level1yint - rate1yint) / rate1slope;
    let line1y2 = level1yint;

    let slope2Value = (rate2 === 0 ? 1 : rate2);

    if (level2 < level1yint) {
      slope2Value *= -1;
    }

    let rate2slope = 99 / slope2Value;
    let level2yint = level2;
    let rate2yint = line1y2 - (rate2slope * line1x2);
    let line2x2 = (level2yint - rate2yint) / rate2slope;
    let line2y2 = level2yint;

    let slope3Value = (rate3 === 0 ? 1 : rate3);

    if (level3 < level2yint) {
      slope3Value *= -1;
    }

    let rate3slope = 99 / slope3Value;
    let level3yint = level3;
    let rate3yint = line2y2 - (rate3slope * line2x2);
    let line3x2 = (level3yint - rate3yint) / rate3slope;
    let line3y2 = level3yint;

    let slope4Value = (rate4 === 0 ? 1 : rate4);

    if (level4 < level3yint) {
      slope4Value *= -1;
    }

    let rate4slope = 99 / slope4Value;
    let line4x2 = this.width;
    let line4y2 = level4;
    let line4y1 = level3;
    let line4yint = line4y2 - (rate4slope * line4x2);
    let line4x1 = (line4y1 - line4yint) / rate4slope;

    if (this.context) {
      this.context.lineWidth = 1;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';

      this.context.fillStyle = 'lightgray';
      this.context.fillRect(0, 0, this.width, this.height);

      this.context.strokeStyle = '#000000';
      this.context.beginPath();
      this.context.moveTo(0, this.height);
      this.context.lineTo(line1x1, this.height - line1y1);
      this.context.lineTo(line1x2, this.height - line1y2);
      this.context.lineTo(line2x2, this.height - line2y2);
      this.context.lineTo(line3x2, this.height - line3y2);
      this.context.lineTo(line4x1, this.height - line4y1);
      this.context.lineTo(line4x2, this.height - line4y2);
      this.context.lineTo(this.width, this.height);
      this.context.stroke();
    }
  }
}
