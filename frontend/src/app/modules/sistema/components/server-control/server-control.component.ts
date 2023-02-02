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
    this.backend.init().subscribe((msg) => {});
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  reset() {
    this.backend.reset().subscribe((msg) => location.reload());
  }
}
