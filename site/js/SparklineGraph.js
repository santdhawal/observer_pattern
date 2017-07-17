'use strict';

class SparklineGraph {
  constructor(element, model) {
    this.model = model;
    this.element = element;
    this.dataArray = [];
    this.sparkline = null;
    this.model.addObserver(this);
    this.plot();
  }

  plot() {
    if(this.sparkline == null) {
      this.sparkline = new Sparkline(this.element); // create instance of sparkline
    }
    this.draw();
  }

  draw(){
    this.sparkline.draw(this.dataArray); // draw sparkline with dataArray
  }

  // set Interval
  setIntervals(){
    const self = this;
    let intervalCounts = 0;
    this.interval = setInterval(function () {
      if(intervalCounts === 30){ // reset in 30 seconds
        self.reset();
        intervalCounts = 0;
        self.clearIntervals()
      } else {
        intervalCounts++;
      }
    }, 1000);
  }

  // Clear Interval
  clearIntervals(){
    clearInterval(this.interval);
  }

  reset(){
    this.dataArray = [];
    this.plot();
  };

  // When notifies by the modal send the request of update
  notify(data) {
    if("spark_"+data.name === this.element.id) {
      this.dataArray.push((data.bestBid + data.bestAsk) / 2);
      if(this.dataArray.length === 1) {
        this.setIntervals();
      }
    }
    this.draw();
  };
}

exports.SparklineGraph = SparklineGraph;