// 2-way calendar sync
// Add OOP-style classes to JS code?

var cal_id = '7pq4p9ui6ktsfo5bpf4521lphk@group.calendar.google.com';
var sheet_id = '1ERf41vn2tcpuIB_36RqroGRMgUppVsou5siEM2nWjIU';

function main() {
  // list_calendars();
  var events = get_calendar(cal_id);
  to_sheets(events);
}

function list_calendars() {
  var calendars = CalendarApp.getAllCalendars();
  Logger.log('This user owns or is subscribed to %s calendars.', calendars.length);
  // calendars is Object type
  for each (item in calendars) {
    Logger.log(item.getName());
  }
}

function get_calendar(cal_id) {
  var calendar = CalendarApp.getCalendarById(cal_id);
  Logger.log('The calendar is named "%s".', calendar.getName());
  Logger.log(calendar.getDescription())
  return get_events_today(calendar);
}

function get_events_today(cal) {
  // Determines how many events are happening today.
  var today = new Date();
  var events = cal.getEventsForDay(today);
  var results = [];
  Logger.log('Number of events happening today: ' + events.length);

  // https://developers.google.com/apps-script/reference/calendar/calendar-event
  for each (event in events) {
    //    Logger.log('[%s] %s', cal.getName(), event.getTitle());
    results.push(
      {
        title: event.getTitle(),
        description: event.getDescription(),
        tags: event.getAllTagKeys(),
        color: event.getColor(),
        creator: event.getCreators(),
        created: event.getDateCreated(),
        end: event.getEndTime(),
        start: event.getStartTime(),
        color: event.getColor(),
        location: event.getLocation(),
        allday: event.isAllDayEvent(),
      }
    );
  }
//  Logger.log(results);
  return results;
}

function to_sheets(items) {
  var ss = SpreadsheetApp.openById(sheet_id);
  Logger.log(ss.getName());

  var sheet = ss.getSheetByName("Sheet2");
  if (sheet != null) {
    Logger.log(sheet.getIndex());
    if (items.length > 0) {
      Logger.log(items.length);
      for each (item in items) {
        // Object.keys(item) List all keys of object
        // Logger.log(Object.values(item));
        var row = [ new Date() ];
        Logger.log('#Properties in object: ' + Object.keys(item).length);
        row.push(
          item.title,
          item.description,
          item.allday,
          item.created,
          item.end,
          item.start,
          item.tags,
          item.color,
          item.location,
          item.creator
        );
//        Logger.log(row);
        sheet.appendRow(row);
      }
    }
  }
}


function getByName(colName) {
  var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName("Sheet2");
  var data = sheet.getRange("A1:1").getValues();
  var col = data[0].indexOf(colName);
  if (col != -1) {
    return sheet.getRange(2,col+1,sheet.getMaxRows()).getValues();
  }
}

function test() {
  Logger.log(getByName('title'));
}

function cal_create() {
  var sheet = SpreadsheetApp.openById(sheet_id).getSheetByName("Sheet3");
  var namedRanges = sheet.getNamedRanges();
  for (var i = 0; i < namedRanges.length; i++) {
    Logger.log(namedRanges[i].getName());
  }
  
  var data = sheet.getRange("calenteries").getValues();
  Logger.log(data.length + typeof data);
  var data_t = [];
  for each (item in data) {
    Logger.log(item.length + typeof item + typeof item[0] + typeof item[1] + item[0].length);
    if (item[0].length == 0) {
      break;
    }
    else {
      data_t.push(item);
    }
  }
  Logger.log(data_t.length + data_t);
  
  // Creates an all-day event for the moon landing and logs the ID.
  var cal = CalendarApp.getCalendarById(cal_id);
  for each (event in data_t) {
    Logger.log(typeof event[0] + typeof event[1] + event[1]);
    var event = cal.createAllDayEvent(event[0], event[1]);
    Logger.log('Event ID: ' + event.getId());
  }
}




