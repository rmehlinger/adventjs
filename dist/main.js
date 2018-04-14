(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('bobtail-deep-cell', ['exports', 'moment', 'moment-range'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('moment'), require('moment-range'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.moment, global.momentRange);
        global.bobtailDeepCell = mod.exports;
    }
})(this, function (exports, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.adventSunday = adventSunday;
    exports.christmas = christmas;
    exports.epiphany = epiphany;
    exports.baptismOfTheLord = baptismOfTheLord;
    exports.easter = easter;
    exports.holySaturday = holySaturday;
    exports.goodFriday = goodFriday;
    exports.holyThursday = holyThursday;
    exports.palmSunday = palmSunday;
    exports.ashWednesday = ashWednesday;
    exports.ascension = ascension;
    exports.pentecost = pentecost;
    exports.advent = advent;
    exports.firstChristmasSeason = firstChristmasSeason;
    exports.secondChristmasSeason = secondChristmasSeason;
    exports.firstOrdinaryTime = firstOrdinaryTime;
    exports.lent = lent;
    exports.holyWeek = holyWeek;
    exports.triduum = triduum;
    exports.easterSeason = easterSeason;
    exports.secondOrdinaryTime = secondOrdinaryTime;
    exports.seasonOf = seasonOf;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _moment2.default.fn.dayAfter = function () {
        return this.clone().add(1, 'days');
    };

    _moment2.default.fn.dayBefore = function () {
        return this.clone().subtract(1, 'days');
    };

    // feasts

    function adventSunday(year) {
        var christmasDay = christmas(year);
        var adjustment = christmasDay.day() == 0 ? -7 : 0; // if Christmas is a Sunday, we need to go back one week further

        return christmasDay.day(-21 + adjustment);
    }

    function christmas(year) {
        return (0, _moment2.default)(new Date(year, 11, 25));
    }

    function epiphany(year) {
        return (0, _moment2.default)(new Date(year, 0, 8)).day(0); // assumes, per USCCB, that Epiphany is celebrated Sunday between Jan 2 & 8.
    }

    function baptismOfTheLord(year) {
        return epiphany(year).day(7);
    }

    function easter(year) {
        // source: http://www.irt.org/articles/js052/

        var century = Math.floor(year / 100);
        var N = year - 19 * Math.floor(year / 19);
        var K = Math.floor((century - 17) / 25);
        var I = century - Math.floor(century / 4) - Math.floor((century - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor(I / 30);
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = year + Math.floor(year / 4) + I + 2 - century + Math.floor(century / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var month = 3 + Math.floor((L + 40) / 44);
        var day = L + 28 - 31 * Math.floor(month / 4);

        return (0, _moment2.default)(new Date(year, month - 1, day));
    }

    function holySaturday(year) {
        return easter(year).subtract(1, 'days');
    }

    function goodFriday(year) {
        return easter(year).subtract(2, 'days');
    }

    function holyThursday(year) {
        return easter(year).subtract(3, 'days');
    }

    function palmSunday(year) {
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

    function advent(year) {
        return (0, _moment2.default)().range(adventSunday(year), // 4th Sunday before Christmas
        christmas(year));
    }

    // have to split the christmas season because it crosses the year boundary.
    function firstChristmasSeason(year) {
        return (0, _moment2.default)().range(new Date(year, 0, 1), baptismOfTheLord(year).dayAfter() // ends Sunday after Epiphany, the Baptism of the Lord
        );
    }

    function secondChristmasSeason(year) {
        return (0, _moment2.default)().range(christmas(year), new Date(year + 1, 0, 1));
    }

    function firstOrdinaryTime(year) {
        return (0, _moment2.default)().range(baptismOfTheLord(year).dayAfter(), ashWednesday(year));
    }

    function lent(year) {
        return (0, _moment2.default)().range(ashWednesday(year), holyThursday(year));
    }

    function holyWeek(year) {
        return (0, _moment2.default)().range(palmSunday(year), easter(year).dayAfter());
    }

    function triduum(year) {
        return (0, _moment2.default)().range(holyThursday(year), easter(year));
    }

    function easterSeason(year) {
        return (0, _moment2.default)().range(easter(year), pentecost(year).dayAfter());
    }

    function secondOrdinaryTime(year) {
        return (0, _moment2.default)().range(pentecost(year).dayAfter(), adventSunday(year));
    }

    var seasonFuncs = [advent, firstChristmasSeason, secondChristmasSeason, firstOrdinaryTime, lent, triduum, easterSeason, secondOrdinaryTime];

    function seasonOf(date) {
        var momentDate = (0, _moment2.default)(date);
        var year = momentDate.year();

        var result = void 0;

        for (var i = 0; i < seasonFuncs.length; i++) {
            if (seasonFuncs[i](year).contains(momentDate, true)) {
                result = seasonFuncs[i];
                break;
            }
        }

        switch (result) {
            case advent:
                return "Advent";
            case firstChristmasSeason:
            case secondChristmasSeason:
                return "Christmas";
            case lent:
                return "Lent";
            case triduum:
                return "Triduum";
            case easterSeason:
                return "Easter";
            case firstOrdinaryTime:
            case secondOrdinaryTime:
                return "Ordinary Time";
            default:
                return "Undefined Season"; // this should never happen
        }
    }
});

//# sourceMappingURL=main.js.map