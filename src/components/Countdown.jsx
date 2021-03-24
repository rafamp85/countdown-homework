import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      noTime: false
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({noTime: true});
    this.stop();
  }

  /** Improved */
  calculateCountdown(endDate) {
    const year = new Date(endDate).getFullYear();

    if( year < new Date().getFullYear() ) {
      this.noMoreTimeLeft();
      this.stop();
    }


    const difference =+ new Date(`${year}-10-1`) - +new Date(); // Best diff instead using DIFF
    let timeLeft = {}; // Simple and blank object without extra indeed code

    // Best way to get time data instead a lot of ugly code...
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  /** Improved */
  addLeadingZeros(value) {
    value = value.toString(); // Will always have data, whatever String() calls internally toString()

    // Don't use WHILE is not needed its better O(1) instead O(n) 
    return value.length < 2 ? '0' + value : value;  
  }

  /* New function */
  noMoreTimeLeft() {
    const countDown = this.state;
    const values = Object.values(countDown).filter( val => val > 0);

    if ( values.length <= 0 ) {
      this.setState({noTime: true});
    }
  }

  render() {
    const countDown = this.state;
    if ( this.state.noTime ) {
      return (
        <div><h1>TIME IS OVER</h1></div>
      ) 
    } else {
      return (
        <div className="countdown">
          <span className="countdown-col">
          <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          <br/>
            <strong className="countdown-num">{this.addLeadingZeros(countDown.days)}</strong>
          </span>
  
          <span className="countdown-col">
          <span>Hours</span>
          <br/>
            <strong className="countdown-num">{this.addLeadingZeros(countDown.hours)}</strong>
          </span>
  
          <span className="countdown-col">
          <span>Min</span>
          <br/>
            <strong className="countdown-num">{this.addLeadingZeros(countDown.min)}</strong>
          </span>
  
          <span className="countdown-col">
          <span>Sec</span><br/>
            <strong className="countdown-num">{this.addLeadingZeros(countDown.sec)}</strong>
          </span>
        </div>
      );
    }
  }
}

export default Countdown;
