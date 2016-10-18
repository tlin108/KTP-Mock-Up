const express = require('express');
const router = express.Router();
const channels = require('../model/channels');
const _ = require('underscore');

/* GET channel listing. */
router.get('/', function(req, res, next) {

  channels.forEach(function(channel) {
    /*
    var dateTime = new Date(channel.time);
    var dateTimeFormat = {
      weekday: "short", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    var schedule = dateTime.toLocaleTimeString("en-us", dateTimeFormat).split(',');
    */

    // remote date from channel time
    var dateTime = channel.time.split(' ');
    channel.date = dateTime[0];
    channel.startTime = dateTime[1].toString();
    var hourMin = dateTime[1].split(':');
    channel.endTime = (parseInt(hourMin[0]) + 1).toString() + ":" + hourMin.splice(1, hourMin.length).join(':');

    console.log(channel.date);
    console.log(channel.startTime);
    console.log(channel.endTime);


    //channel.date = schedule.splice(0, schedule.length-1).join(', ');

    // format channel start time to end time as period
    /*
    var startTime = schedule[0].toString();
    var hourMin = schedule[0].split(':');
    var endTime = (parseInt(hourMin[0]) + 1).toString() + ":" + hourMin.splice(1, hourMin.length-1).join(', ') + " EDT";
    channel.period = startTime + " - " + endTime;
    */

  });
  var sortByTime = _.sortBy(channels, 'time');
  var groupByDate = _.groupBy(sortByTime, 'date');

  var sortByDate = {}
  Object.keys(groupByDate).sort().forEach(function(key) {
    sortByDate[key] = groupByDate[key];
  });
  console.log(sortByDate);

  res.render('channels', { channels: sortByDate} );
});

module.exports = router;
