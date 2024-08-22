import { ActivatedRoute } from '@angular/router';

export class ScreenCommon {

  route: ActivatedRoute | null = null;

  constructor(route: ActivatedRoute){
    this.route = route;
  }
}
