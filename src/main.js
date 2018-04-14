import moment from 'moment';
import 'moment-range';

moment.fn.dayAfter = function(){
    return this.clone().add(1, 'days');
};

moment.fn.dayBefore = function(){
    return this.clone().subtract(1, 'days');
};

// feasts

export function adventSunday(year){
    let christmasDay = christmas(year);
    let adjustment = christmasDay.day() == 0 ? -7: 0; // if Christmas is a Sunday, we need to go back one week further

    return christmasDay.day(-21 + adjustment);
}

export function christmas(year){
    return moment(new Date(year, 11, 25));
}

export function epiphany(year){
    return moment(new Date(year, 0, 8)).day(0); // assumes, per USCCB, that Epiphany is celebrated Sunday between Jan 2 & 8.
}

export function baptismOfTheLord(year){
    return epiphany(year).day(7);
}

export function easter(year) {
    // source: http://www.irt.org/articles/js052/

    let century = Math.floor(year/100);
    let N = year - 19 * Math.floor(year/19);
    let K = Math.floor((century - 17)/25);
    let I = century - Math.floor(century/4) - Math.floor((century - K)/3) + 19 * N + 15;
    I = I - 30 * Math.floor((I/30));
    I = I - Math.floor(I/28) * (1 - Math.floor(I/28) * Math.floor(29/(I + 1)) * Math.floor((21 - N)/11));
    let J = year + Math.floor(year/4) + I + 2 - century + Math.floor(century/4);
    J = J - 7 * Math.floor(J/7);
    let L = I - J;
    let month = 3 + Math.floor((L + 40)/44);
    let day = L + 28 - 31 * Math.floor(month/4);

    return moment(new Date(year, month - 1, day));
}

export function holySaturday(year){
    return easter(year).subtract(1, 'days');
}

export function goodFriday(year){
    return easter(year).subtract(2, 'days');
}

export function holyThursday(year){
    return easter(year).subtract(3, 'days');
}

export function palmSunday(year){
    return easter(year).subtract(7, 'days');
}

export function ashWednesday(year) {
    return easter(year).subtract(46, 'days');
}

export function ascension(year) {
    return easter(year).add(39, 'days');
}

export function pentecost(year) {
    return easter(year).add(49, 'days');
}

// Seasons

// ranges do not include their right endpoint, so they go until the day AFTER the season ends.
// Thus, even though Advent is specified as ending on Christmas,
// advent(2014).contains(christmas(2014)) returns false.

export function advent(year){
    return moment().range(
        adventSunday(year), // 4th Sunday before Christmas
        christmas(year)
    );
}

// have to split the christmas season because it crosses the year boundary.
export function firstChristmasSeason(year){
    return moment().range(
        new Date(year, 0, 1),
        baptismOfTheLord(year).dayAfter() // ends Sunday after Epiphany, the Baptism of the Lord
    );
}

export function secondChristmasSeason(year){
    return moment().range(
        christmas(year),
        new Date(year + 1, 0, 1)
    )
}

export function firstOrdinaryTime(year) {
    return moment().range(baptismOfTheLord(year).dayAfter(), ashWednesday(year));
}

export function lent(year){
    return moment().range(ashWednesday(year), holyThursday(year));
}

export function holyWeek(year){
    return moment().range(palmSunday(year), easter(year).dayAfter());
}

export function triduum(year){
    return moment().range(holyThursday(year), easter(year));
}

export function easterSeason(year){
    return moment().range(easter(year), pentecost(year).dayAfter());
}

export function secondOrdinaryTime(year) {
    return moment().range(pentecost(year).dayAfter(), adventSunday(year));
}

let seasonFuncs = [
  advent,
  firstChristmasSeason,
  secondChristmasSeason,
  firstOrdinaryTime,
  lent,
  triduum,
  easterSeason,
  secondOrdinaryTime
];

export function seasonOf(date){
    let momentDate = moment(date);
    let year = momentDate.year();

    let result;

    for(let i = 0; i < seasonFuncs.length; i++){
        if(seasonFuncs[i](year).contains(momentDate, true)) {
            result = seasonFuncs[i];
            break;
        }
    }

    switch(result){
        case advent: return "Advent";
        case firstChristmasSeason:
        case secondChristmasSeason: return "Christmas";
        case lent: return "Lent";
        case triduum: return "Triduum";
        case easterSeason: return "Easter";
        case firstOrdinaryTime:
        case secondOrdinaryTime: return "Ordinary Time";
        default: return "Undefined Season"; // this should never happen
    }
}
