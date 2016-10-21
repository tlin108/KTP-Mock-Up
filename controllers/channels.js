const express = require('express');
const router = express.Router();
const unsortedChannels = require('../model/channels');
const _ = require('underscore');

/* GET channel listing. */
router.get('/', function(req, res, next) {
  res.render('channels', { 
    date: sortChannelsByDate(unsortedChannels), 
  });
});

function sortChannelsByDate (unsortedChannels){
  var channels = unsortedChannels;
  channels.forEach(function(channel) {

    // reformat date, subject start time from channel time, and add subject end time
    var dateTime = channel.time.split(' ');
    channel.date = dateTime[0].toString();
    channel.startTime = dateTime[1].toString();
    var hourMin = dateTime[1].split(':');
    channel.endTime = (parseInt(hourMin[0]) + 1).toString() + ":" + hourMin.splice(1, hourMin.length).join(':');

  });
  var sortByTime = _.sortBy(channels, 'time');
  var groupByDate = _.groupBy(sortByTime, 'date');

  var sortByDate = {}
  // sort date in ascending order
  Object.keys(groupByDate).sort().forEach(function(date) {
    sortByDate[date] = groupByDate[date];
  });

  return sortByDate;
}

module.exports = router;
