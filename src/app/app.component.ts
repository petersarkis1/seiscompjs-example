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
    this.createBarChart();
  }

  fetchData() {
    this.fdsnService.getData().subscribe(
      (response) => {
        this.data = response; // Store the response data
        const buf = Buffer.from(response, 'utf8');
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        const parsed = sp.miniseed.parseDataRecords(ab);

          // Loop over parsed records and extract the decoded values
          parsed.forEach((record: any) => {
          const decodedValues = sp.miniseed.seismogramPerChannel(record);
          console.log(decodedValues);
        });
        console.log(parsed);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createBarChart() {
    const data = [30, 86, 168, 234, 78, 321];

    const width = 400;
    const height = 200;
    const barHeight = height / data.length;

    const svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

    const bar = svg.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

    bar.append('rect')
      .attr('width', d => d)
      .attr('height', barHeight - 1)
      .attr('fill', 'steelblue');

    bar.append('text')
      .attr('x', d => d - 3)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(d => d);
  }
  
}