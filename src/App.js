import React, { Component } from 'react';
import NavBar from './components/navbar';
import Calculator from './components/calculator';
import Display from './components/display';
import Line from './components/line'
import Time from './components/time'
import './App.css';
import Timebox from './components/timebox';
import Daybar from './components/daybar';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateobj: new Date(),
            hours: this.getHours(),
            minutes: this.getMinutes(),
            meridian: this.getMeridian(),
            month: this.getMonth(),
            date: this.getDate(),
            year: this.getYear(),
            day: this.getDay(),
            dateString: this.getMonth() + " " + this.getDate() + ", " + this.getYear(),
            utcZone: this.getUTCZone(),
            utcCity: this.getUTCCity(),
            utcTimeZone: this.getUTCTimeZone(),
        }
    }

    isDST(now) {
        const jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
        const jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();

        return Math.max(jan, jul) !== now.getTimezoneOffset();    
    }

    getZoneIdx() {      //index of time zone (utc)
        const now = new Date();
        console.log('now:' + now.getHours()); //21
        const utcHours = this.isDST(now) ? now.getUTCHours() + 1 : now.getUTCHours();
        console.log('utc: ' + now.getUTCHours()); //1   (+1)

        return utcHours + this.getUTCZone(); //  2 + 20
    }

    getUTCCity() {
        const utcCities = [
            'London', 'Rome', 'Athens', 'Baghdad', 'Moscow', 'Karachi', 'Astana', 'Bangkok',
            'Taipei', 'Tokyo', 'Sydney', 'Solomon Islands', 'Auckland', 'Samoa', 'Hawaii', 
            'Alaska', 'Los Angeles', 'Denver', 'Chicago', 'New York', 'Santiago', 'Buenos Aires',
            'Mid Atlantic', 'Cape Verde'
        ];

        const now = new Date();
        const hrs = now.getHours();
        const utc = now.getUTCHours();

        var offset = hrs - utc;
        if (offset < 0) {
            offset = 23 + offset;
        }

        return utcCities[offset];
    }

    updateCity(diff) {
        console.log(this.getZoneIdx() + " : " + diff);
        const utcCities = [
            'London', 'Rome', 'Athens', 'Baghdad', 'Moscow', 'Karachi', 'Astana', 'Bangkok',
            'Taipei', 'Tokyo', 'Sydney', 'Solomon Islands', 'Auckland', 'Samoa', 'Hawaii', 
            'Alaska', 'Los Angeles', 'Denver', 'Chicago', 'New York', 'Santiago', 'Buenos Aires',
            'Mid Atlantic', 'Cape Verde'
        ];

        const now = new Date();
        const hrs = now.getHours();
        const utc = now.getUTCHours();

        var offset = hrs - utc;
        if (offset < 0) {
            offset = 23 + offset;
        }

        return utcCities[offset + diff];
    }

    getUTCTimeZone() {
        const utcTimeZones = [
            'Greenwich Mean Time', 'West/Central Europe ST', 'East Europe ST', 'Arab Standard Time',
            'Russian Standard Time', 'Pakistan Standard Time', 'Central Asia ST', 'Southeast Asia ST',
            'China Standard Time', 'Tokyo Standard Time', 'West Pacific ST', 'Central Pacific ST',
            'New Zealand ST', 'Samoa Standard Time', 'Hawaiian Standard Time', 'Alaskan Standard Time', 
            'Pacific Standard Time', 'Mountain Standard Time', 'Central Standard Time', 
            'Eastern Standard Time', 'Atlantic Standard Time', 'Argentina Standard Time', 
            'Mid Atlantic ST', 'Cape Verde ST'
        ];

        const now = new Date();
        const hrs = now.getHours();
        const utc = now.getUTCHours();

        var offset = hrs - utc;
        if (offset < 0) {
            offset = 23 + offset;
        }

        return utcTimeZones[offset];        
    }

    getMonth() {
        const now = new Date();
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        
        return months[now.getMonth()];
    }

    getDate() {
        const now = new Date();

        return now.getDate().toString();
    }

    getYear() {
        const now = new Date();

        return now.getFullYear().toString();
    }

    getDay() {
        const now = new Date();
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        return days[now.getDay()].toString();
    }

    getHours() {
        const now = new Date();
        var hours = now.getHours();

        if (hours > 12) {
            hours = hours - 12;
        }

        return (hours > 9) ? hours.toString() : '0' + hours.toString();
    }

    getMinutes() {
        const now = new Date();
        const minutes = now.getMinutes();

        return (minutes > 9) ? minutes.toString() : '0' + minutes.toString();
    }

    getMeridian() {
        const now = new Date();
        const hours = now.getHours();

        return hours > 11 ? 'PM' : 'AM';
    }

    getUTCZone() {  //offset for positive utc zones +5 +7
        const now = new Date();
        const utc = now.getUTCHours();
        const hours = now.getHours();
        console.log('tz: ' + (hours - utc).toString()); //20

        return hours - utc; //need to fix for when utc passes 12 before hrs
    }

    getInvertedUTCZone() {  //offset for negative utc zones ( -4, -12 etc)
        const now = new Date();
        const utc = now.getUTCHours();
        const hours = now.getHours();
        console.log('inv tz: ' + (utc - hours).toString());
        return utc - hours;
    }

    convertTime(hrs) {
        const milliseconds = 1000 * 60 * 60 * hrs; //hours as ms
        const now = new Date();
        const nowMS = now.getTime();
        const time = milliseconds + nowMS;
        var adjustedDateObj = new Date();
        console.log(typeof(adjustedDateObj))

        adjustedDateObj = adjustedDateObj.setTime(time);
        console.log(adjustedDateObj.getHours());

        return adjustedDateObj;
    }

    convertToMeridianTime(hrs, mins) {
        if (mins < 10) {
            mins = "0" + mins.toString();
        } else {
            mins = mins.toString();
        }

        if (hrs > 11) {
            if (hrs > 12) {
                hrs = hrs - 12;
                if (hrs < 10) {
                    hrs = "0" + hrs.toString();
                } else {
                    hrs = hrs.toString();
                }
            }
            return hrs + ":" + mins + " PM";
        } else if (hrs < 1) {
            return (12 - hrs).toString() + ":" + mins + " PM";
        } else {
            return hrs + ":" + mins + " AM";
        }
    }

    changeTime(diff) {
        const now = new Date();
        var hrs = now.getHours() + diff;
        var mins = now.getMinutes();
        if (hrs < 1) {
            hrs = 12 + hrs;
        }

        return this.convertToMeridianTime(hrs, mins); //10
    }

    updateDay(diff) {
        const now = new Date();
        const hrs = now.getHours();
        var day = now.getDay();
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        if ((hrs + diff) > 23) {
            day++;
        } else if ((hrs + diff) < 0) {
            day--;
        }
        return days[day];
    }

    render() {
        return (
            <React.Fragment>
                
                <Calculator>
                <NavBar headline="TimeZones"
                />

                    <div className='time'>
                        <Daybar
                            headline={this.state.day}
                            fontSize={35}>
                        </Daybar>
                        <h2 className="heading">{this.state.dateString}</h2>
                        <div className="center">
                    
                    <Display
                        value={this.state.hours}
                    />
                    <p className="one-line">:</p>
                    <Display
                        value={this.state.minutes}
                    />
                    <span className="one-line"> </span>
                    <Display
                        value={this.state.meridian}
                    />
                    <br/>
                    </div>
                    <h2 className="heading">{this.state.utcCity}</h2>
                    <h3 className="heading">{this.state.utcTimeZone}</h3>
                    <h3 className="heading">{this.state.utcZone} GMT</h3>

                    </div>
                    
                    <Line
                        color={"rgb(17, 236, 229)"}
                    />

                    <Container fluid>
                    <Row>

                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(-3)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(-3)}
                        city = {this.updateCity(-3)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(-2)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(-2)}
                        city = {this.updateCity(-2)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(-1)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(-1)}
                        city = {this.updateCity(-1)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(0)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(0)}
                        city = {this.updateCity(0)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(1)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(1)}
                        city = {this.updateCity(1)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(2)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(2)}
                        city = {this.updateCity(2)}
                    >
                    </Timebox>
                    </Col>
                    <Col>
                    <Timebox value=
                        {<Daybar headline={this.updateDay(3)}
                        fontSize={16}>
                        </Daybar>}

                        time = {this.changeTime(3)}
                        city = {this.updateCity(3)}
                    >
                    </Timebox>
                    </Col>
                    </Row>
                    </Container>
                    
                </Calculator>
            </React.Fragment>
        );
    }
}

export default App;