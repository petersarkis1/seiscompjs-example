import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FdsnService {
  private fdsnUrl = 'http://scarchive.beg.utexas.edu/fdsnws/dataselect/1/query?starttime=2024-09-18T00%3A00%3A00&endtime=2024-09-19T00%3A00%3A00&network=TX&station=MB06&nodata=404';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.fdsnUrl, { responseType: 'arraybuffer' });
  }
}