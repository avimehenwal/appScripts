// 2-way calendar sync
// Add OOP-style classes to JS code?

var cal_id = '7pq4p9ui6ktsfo5bpf4521lphk@group.calendar.google.com';
var sheet_id = '1ERf41vn2tcpuIB_36RqroGRMgUppVsou5siEM2nWjIU';

function main() {
//  list_calendars();
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
      }
    );
  }
  Logger.log(results);
  return results;
}

function to_sheets(items) {
  var ss = SpreadsheetApp.openById(sheet_id);
  Logger.log(ss.getName());
  
  var sheet = ss.getSheetByName("Sheet2");
  if (sheet != null) {
//    Logger.log(sheet.getIndex());
    if (items.length > 0) {
      Logger.log(items);
      for each (item in items) {
        sheet.appendRow([new Date(), item.title, item.description]);
      }
    }
  }
}



