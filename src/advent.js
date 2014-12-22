moment.fn.dayAfter = function(){
    return this.clone().add(1, 'days');
};

// feasts

function adventSunday(year){
    var christmasDay = christmas(year);
    var adjustment = christmasDay.day() == 0 ? -7: 0; // if Christmas is a Sunday, we need to go back one week further

    return christmasDay.day(-21 + adjustment);
}

function christmas(year){
    return moment(new Date(year, 11, 25))
}

function epiphany(year){
    return moment(year, 1, 8).day(0); // assumes, per USCCB, that Epiphany is celebrated Sunday between Jan 2 & 8.
}

function baptismOfTheLord(year){
    return epiphany(year).day(7);
}

function easter(year) {
    // source: http://www.irt.org/articles/js052/

    var century = Math.floor(year/100);
    var N = year - 19 * Math.floor(year/19);
    var K = Math.floor((century - 17)/25);

    var I = century - Math.floor(century/4) - Math.floor((century - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));

    var J = year + Math.floor(year/4) + I + 2 - century + Math.floor(century/4);
    J = J - 7*Math.floor(J/7);

    var L = I - J;

    var month = 2 + Math.floor((L + 40)/44);
    var date = L + 28 - 31*Math.floor(month/4);

    return moment(new Date(year, month - 1, date));
}

function holySaturday(year){
    return easter(year).subtract(1, 'days');
}

function goodFriday(year){
    return easter(year).subtract(2, 'days');
}

function holyThursday(year){
    return easter(year).subtract(3, 'days');
}

function palmSunday(year){
    return easter(year).subtract(7, 'days');
}

function ashWednesday(year) {
    return easter(year).subtract(46, 'days');
}

function ascension(year) {
    return easter(year).add(39, 'days');
}

function pentecost(year) {
    return easter(year).add(49, 'days');
}

// Seasons

// ranges do not include their right endpoint, so they go until the day AFTER the season ends.
// Thus, even though Advent is specified as ending on Christmas,
// advent(2014).contains(christmas(2014)) returns false.

function advent(year){
    moment().range(
        adventSunday(year), // 4th Sunday before Christmas
        christmas(year)
    );
}

function christmasSeason(year){
    return moment().range(
        christmas(year),
        baptismOfTheLord(year + 1).dayAfter() // ends Sunday after Epiphany, the Baptism of the Lord
    );
}

function firstOrdinaryTime(year) {
    return moment().range(baptismOfTheLord(year), ashWednesday(year));
}

function lent(year){
    return moment().range(ashWednesday(year), goodFriday(year));
}

function triduum(year){
    return moment().range(goodFriday(year), easter(year).add(1, 'days'));
}

function easterSeason(year){
    return moment().range(easter(year).add(1, 'days'), pentecost(year).dayAfter());
}

function secondOrdinaryTime(year) {
    return moment().range(pentecost(year).add(1, 'days'), adventSunday(year));
}

var seasonFuncs = [advent, christmasSeason, firstOrdinaryTime, lent, triduum, easterSeason, secondOrdinaryTime];

function seasonOf(date){
    var momentDate = moment(date);
    var year = momentDate.year();

    var result;

    for(var i = 0; i < seasonFuncs.length; i++){
        if(seasonFuncs[i](year).contains()) {
            result = seasonFuncs[i];
            break;
        }
    }

    switch(result){
        case advent: return "Advent";
        case christmasSeason: return "Christmas";
        case lent: return "Lent";
        case triduum: return "Triduum";
        case easterSeason: return "Easter";
        case firstOrdinaryTime:
        case secondOrdinaryTime: return "Ordinary Time"
        default: return "Undefined Season"; // this should never happen
    }
}

console.log(christmas(2014));
console.log(easter(2014));
