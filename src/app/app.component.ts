import { Component, OnInit } from '@angular/core';
import { FdsnService } from './fdsn.service';
import { Buffer } from 'buffer';
import * as sp from 'seisplotjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private fdsnService: FdsnService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.fdsnService.getData().subscribe(
      (response) => {
        this.data = response; // Store the response data
        const buf = Buffer.from(response, 'utf8');
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        const parsed = sp.parseDataRecords(ab);
        console.log(parsed);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}