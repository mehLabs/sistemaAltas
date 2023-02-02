import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
const backend = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ServerControlService {
  constructor(private http: HttpClient) {}

  init() {
    return this.http.post(`${backend}/init`, {}, { observe: 'body' });
  }

  reset() {
    return this.http.delete(`${backend}/reset`);
  }
}
