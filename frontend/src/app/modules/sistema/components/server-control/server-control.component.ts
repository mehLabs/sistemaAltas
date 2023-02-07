import { Component } from '@angular/core';
import { ServerControlService } from '../../services/server-control.service';

@Component({
  selector: 'app-server-control',
  templateUrl: './server-control.component.html',
  styleUrls: ['./server-control.component.css'],
})
export class ServerControlComponent {
  constructor(private backend: ServerControlService) {}
  init() {
    this.backend.init().subscribe((msg) => {
      console.log(msg);

      location.reload();
    });
  }

  reset() {
    this.backend.reset().subscribe((msg) => location.reload());
  }
}
