# Introduction

AdventJS is a simple library for calculating events in the Roman Catholic liturgical calendar, especially the beginnings
of the Liturgical seasons, which vary from year to year. It's built on [momentjs](http://momentjs.com/) and [moment-range](https://github.com/gf3/moment-range).

Currently, AdventJS only supports the United States Catholic Church's calendar. The key difference for the liturgical
seasons is that, in the US, Epiphany and the Feast of Baptism of the Lord (which marks the end of the Christmas season)
are pegged to consecutive Sundays. In some other locales, Epiphany is always celebrated January 6th, and if it lands on
a Sunday, the Baptism of the Lord is celebrated the day after.

# API

## Feasts

Each of the following functions takes a year, and returns a moment object set to the date of the given feast in local
time at midnight.

- `adventSunday(year)`
- `christmas(year)`
- `epiphany(year)`
- `baptismOfTheLord(year)`
- `ashWednesday(year)`
- `palmSunday(year)`
- `holyThursday(year)`
- `goodFriday(year)`
- `holySaturday(year)`
- `easter(year)`
- `ascension(year)`
- `pentecost(year)`

## Seasons

Each of the following functions takes a year, and returns a moment-range object, with the endpoints being the start of
the season and the day AFTER the final day in the season. This is because moment-ranges are include the starting time
but not the end time.

- `advent(year)`
- `christmasSeason(year)`
- `firstOrdinaryTime(year)`
- `lent(year)`
- `triduum(year)`
- `easterSeason(year)`
- `secondOrdinaryTime(year)`

## Other
`seasonOf(date)`
Takes any object that can be interpreted by momentJS, including another moment, a Javascript Date, a string, or a
timestamp. Returns the liturgical season of that date. Possible return values are:
`Advent, Christmas, Lent, Triduum, Easter, Ordinary Time`

# Installing
## Bower
From your shell, run:
```bower install adventjs```

# Running tests

Unit tests for `adventjs` are written using QUnit. To run the tests, first, navigate to your code repository in the shell, and run `bower install`. Then, open `tests/test.html` in your browser.
