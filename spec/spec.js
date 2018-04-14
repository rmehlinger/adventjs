jasmine.CATCH_EXCEPTIONS = false;
import moment from 'moment';
import 'moment-range';
import {
  adventSunday,
  ascension,
  ashWednesday,
  baptismOfTheLord,
  christmas,
  easter,
  epiphany,
  goodFriday,
  holySaturday,
  holyThursday,
  palmSunday,
  pentecost,
  seasonOf
} from "../src/main";

let adventDates = {
    1994: moment(new Date(1994, 10, 27)),
    1995: moment(new Date(1995, 11, 3)),
    1996: moment(new Date(1996, 11, 1)),
    1997: moment(new Date(1997, 10, 30)),
    1998: moment(new Date(1998, 10, 29)),
    1999: moment(new Date(1999, 10, 28)),
    2000: moment(new Date(2000, 11, 3)),
    2001: moment(new Date(2001, 11, 2)),
    2002: moment(new Date(2002, 11, 1)),
    2003: moment(new Date(2003, 10, 30)),
    2004: moment(new Date(2004, 10, 28)),
    2005: moment(new Date(2005, 10, 27)),
    2006: moment(new Date(2006, 11, 3)),
    2007: moment(new Date(2007, 11, 2)),
    2008: moment(new Date(2008, 10, 30)),
    2009: moment(new Date(2009, 10, 29)),
    2010: moment(new Date(2010, 10, 28)),
    2011: moment(new Date(2011, 10, 27)),
    2012: moment(new Date(2012, 11, 2)),
    2013: moment(new Date(2013, 11, 1)),
    2014: moment(new Date(2014, 10, 30)),
    2015: moment(new Date(2015, 10, 29)),
    2016: moment(new Date(2016, 10, 27)),
    2017: moment(new Date(2017, 11, 3)),
    2018: moment(new Date(2018, 11, 2)),
    2019: moment(new Date(2019, 11, 1)),
    2020: moment(new Date(2020, 10, 29)),
    2021: moment(new Date(2021, 10, 28)),
    2022: moment(new Date(2022, 10, 27)),
    2023: moment(new Date(2023, 11, 3)),
    2024: moment(new Date(2024, 11, 1)),
    2025: moment(new Date(2025, 10, 30)),
    2026: moment(new Date(2026, 10, 29)),
    2027: moment(new Date(2027, 10, 28)),
    2028: moment(new Date(2028, 11, 3)),
    2029: moment(new Date(2029, 11, 2)),
    2030: moment(new Date(2030, 11, 1)),
    2031: moment(new Date(2031, 10, 30)),
    2032: moment(new Date(2032, 10, 28)),
    2033: moment(new Date(2033, 10, 27)),
    2034: moment(new Date(2034, 11, 3))
};

let easterDates = {
    1994: moment(new Date(1994, 3, 3)),
    1995: moment(new Date(1995, 3, 16)),
    1996: moment(new Date(1996, 3, 7)),
    1997: moment(new Date(1997, 2, 30)),
    1998: moment(new Date(1998, 3, 12)),
    1999: moment(new Date(1999, 3, 4)),
    2000: moment(new Date(2000, 3, 23)),
    2001: moment(new Date(2001, 3, 15)),
    2002: moment(new Date(2002, 2, 31)),
    2003: moment(new Date(2003, 3, 20)),
    2004: moment(new Date(2004, 3, 11)),
    2005: moment(new Date(2005, 2, 27)),
    2006: moment(new Date(2006, 3, 16)),
    2007: moment(new Date(2007, 3, 8)),
    2008: moment(new Date(2008, 2, 23)),
    2009: moment(new Date(2009, 3, 12)),
    2010: moment(new Date(2010, 3, 4)),
    2011: moment(new Date(2011, 3, 24)),
    2012: moment(new Date(2012, 3, 8)),
    2013: moment(new Date(2013, 2, 31)),
    2014: moment(new Date(2014, 3, 20)),
    2015: moment(new Date(2015, 3, 5)),
    2016: moment(new Date(2016, 2, 27)),
    2017: moment(new Date(2017, 3, 16)),
    2018: moment(new Date(2018, 3, 1)),
    2019: moment(new Date(2019, 3, 21)),
    2020: moment(new Date(2020, 3, 12)),
    2021: moment(new Date(2021, 3, 4)),
    2022: moment(new Date(2022, 3, 17)),
    2023: moment(new Date(2023, 3, 9)),
    2024: moment(new Date(2024, 2, 31)),
    2025: moment(new Date(2025, 3, 20)),
    2026: moment(new Date(2026, 3, 5)),
    2027: moment(new Date(2027, 2, 28)),
    2028: moment(new Date(2028, 3, 16)),
    2029: moment(new Date(2029, 3, 1)),
    2030: moment(new Date(2030, 3, 21)),
    2031: moment(new Date(2031, 3, 13)),
    2032: moment(new Date(2032, 2, 28)),
    2033: moment(new Date(2033, 3, 17)),
    2034: moment(new Date(2034, 3, 9))
};

describe('adventjs', () => {
    it("Christmas Day", () => {
        for(let yr = 2014; yr < 2114; yr++) {
            expect(christmas(yr).format("MM-DD-YYYY")).toBe("12-25-" + (yr).toString());
        }
    });

    it("Easter Sunday", () => {
        for(let yr = 1994; yr < 2035; yr++) {
            expect(easter(yr).format("MM-DD-YYYY")).toBe(easterDates[yr].format("MM-DD-YYYY"));
        }
    });

    it("Advent Sunday", () =>{
        for(let yr = 1994; yr < 2035; yr++) {
            expect(adventSunday(yr).format("MM-DD-YYYY")).toBe(adventDates[yr].format("MM-DD-YYYY"));
        }
    });

    it("seasonOfOk", () =>{
        let curDate = moment(new Date(2015, 0, 1));
        let season;
        for(let i = 0; i < 731; i++) { // two full years, including a leap year
            curDate = curDate.dayAfter();
            season = seasonOf(curDate);
            expect(season).not.toBeUndefined();
            expect(season).not.toBeNull();
            expect(season).not.toBe("Undefined Season", curDate);
        }
    });

    it("seasonOfEndpoints", () =>{
        for(let year=2000; year < 2100; year++) {
            expect(seasonOf(adventSunday(year - 1).dayBefore())).toBe("Ordinary Time");
            expect(seasonOf(adventSunday(year - 1))).toBe("Advent");
            expect(seasonOf(christmas(year - 1).dayBefore())).toBe("Advent");
            expect(seasonOf(christmas(year - 1))).toBe("Christmas");
            expect(seasonOf(epiphany(year))).toBe("Christmas");
            expect(seasonOf(baptismOfTheLord(year))).toBe("Christmas");
            expect(seasonOf(baptismOfTheLord(year).dayAfter())).toBe("Ordinary Time");
            expect(seasonOf(ashWednesday(year).dayBefore())).toBe("Ordinary Time");
            expect(seasonOf(ashWednesday(year))).toBe("Lent");
            expect(seasonOf(palmSunday(year).dayBefore())).toBe("Lent");
            expect(seasonOf(palmSunday(year))).toBe("Lent");
            expect(seasonOf(holyThursday(year).dayBefore())).toBe("Lent");
            expect(seasonOf(holyThursday(year))).toBe("Triduum");
            expect(seasonOf(goodFriday(year))).toBe("Triduum");
            expect(seasonOf(holySaturday(year))).toBe("Triduum");
            expect(seasonOf(easter(year))).toBe("Easter");
            expect(seasonOf(ascension(year))).toBe("Easter");
            expect(seasonOf(pentecost(year))).toBe("Easter");
            expect(seasonOf(pentecost(year).dayAfter())).toBe("Ordinary Time");
        }
    });
});