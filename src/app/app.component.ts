import { Component, OnInit } from '@angular/core';
import { FdsnService } from './fdsn.service';
import { Buffer } from 'buffer';
//@ts-ignore
import * as sp from 'seisplotjs';
import * as d3 from 'd3';

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
    this.createLineGraph();
  }

  fetchData() {
    this.fdsnService.getData().subscribe(
      (response) => {
        this.data = response; // Store the response data
        const buf = Buffer.from(response, 'utf8');
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        const parsed = sp.miniseed.parseDataRecords(ab);
        // Loop over parsed records and extract the decoded values
        // parsed.forEach((record: any) => {
        //   const decodedValues = sp.miniseed.seismogramPerChannel(record);
        //   console.log(decodedValues);
        // });
        console.log(parsed);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createLineGraph() {
  }
  
}