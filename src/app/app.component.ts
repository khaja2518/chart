import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Chart, registerables } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ComponentComponent } from './component/component.component';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private _auth: AuthService, public dialog: MatDialog) { }

  result = []
  sma_signal: any = []
  sma_test: any = []
  pcb_signal = []
  pcb_test = []
  chart: any
  set1: boolean = false;
  set2: boolean = false;

  id1: any
  id2: any

  test_count: any = [];

  input() {
    this.dialog.open(ComponentComponent);
  }

  reload() {
    window.location.reload();
  }

  sma() {
    this._auth.getSmabyid(this.id2).then((res: any) => {
      this.result = res
      for (let index = 0; index < this.result.length; index++) {
        this.test_count[index] = index;
        // console.log(this.test_count)
      }
      this.sma_signal = this.result.map(function (index: any) {
        return index.signal
      })

      // console.log(this.sma_signal)
      // console.log(this.sma_test)
    })
  }
  pcb() {
    if (this.set1 === true && this.set2 === false) {
      this._auth.getPcbbyid(this.id1).then((res: any) => {
        for (let index = 0; index < res.length; index++) {
          this.test_count[index] = index;
          // console.log(this.test_count)
        }
        this.pcb_test = res.map(function (index: any) {
          // console.log(index.test)
          return index.test
        })
        this.pcb_signal = res.map(function (index: any) {
          return index.signal
        })
        console.log(this.test_count)
        this.pcbChart()
      })
    } else {
      this._auth.getPcbbyid(this.id1).then((res: any) => {

        this.pcb_test = res.map(function (index: any) {
          return index.test
        })

        this.pcb_signal = res.map(function (index: any) {
          return index.signal
        })

        if (this.set2) {
          // console.log('fetching id2 data')
          this._auth.getSmabyid(this.id2).then((res: any) => {
            this.result = res
            this.sma_signal = this.result.map(function (index: any) {
              return index.signal
            })
            
            this.pcbChart()
          })
        } else {
          // console.log('not fetching id2 data')
        }
      })
    }
  }

  pcbChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels:this.test_count,
        datasets: [{
          label: 'pcb antenna',
          data: this.pcb_signal,
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 2
        },
        {
          label: 'sma antenna',
          data: this.sma_signal,
          backgroundColor: 'transparent',
          borderColor: 'blue',
          borderWidth: 2
        }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Antenna Tests Chart'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Number of Tests Performed',
              font: {
                size: 12,
                family: 'tahoma',
                weight: 'bold',
                style: 'italic'
              },
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Signal Strength ( 0 - 100% )',
              font: {
                size: 12,
                family: 'tahoma',
                weight: 'bold',
                style: 'italic'
              },
            }
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.id1 = localStorage.getItem('id1')
    this.id2 = localStorage.getItem('id2')
    if (this.id1 === null) {
      // console.log('id1 is null')
      this.set1 = false
    } else {
      this.set1 = true
      // console.log('id1')
    }

    if (this.id2 === null) {
      // console.log('id2 is null')
    } else {
      this.set2 = true
    }

    if (this.set1 === false) {
      alert('No id present')
      // console.log('no id present')
    } else {
      // this._auth.getPcbbyid(this.id1)
      this.pcb()
    }
  }
}
