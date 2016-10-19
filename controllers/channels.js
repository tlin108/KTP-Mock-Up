const express = require('express');
const router = express.Router();
const channels = require('../model/channels');
const _ = require('underscore');
const moment = require('moment')

/* GET channel listing. */
router.get('/', function(req, res, next) {

  channels.forEach(function(channel) {

    // remote date from channel time
    var dateTime = channel.time.split(' ');
    channel.date = dateTime[0];
    channel.startTime = dateTime[1].toString();
    var hourMin = dateTime[1].split(':');
    channel.endTime = (parseInt(hourMin[0]) + 1).toString() + ":" + hourMin.splice(1, hourMin.length).join(':');

  });
  var sortByTime = _.sortBy(channels, 'time');
  var groupByDate = _.groupBy(sortByTime, 'date');

  var sortByDate = {}
  Object.keys(groupByDate).sort().forEach(function(key) {
    sortByDate[key] = groupByDate[key];
  });
  console.log(sortByDate);

  res.render('channels', { 
    channels: sortByDate, 
    helpers: {
      formatDate: function(nonFormattedDate) { 
        return moment(nonFormattedDate).format('ddd, MMMM DD, YYYY');
      },
      formatTime: function(nonFormattedTime) {
        return moment(nonFormattedTime, "HH:mm:ss").format('h:mm A');
      } 
    }});
});

module.exports = router;
