//days of the week
cal_days_labels = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];

//month names
cal_months_labels = ['Січень', 'Лютий', 'Березень', 'Квітень','Травень', 'Червень', 'Липень', 'Серпень', 'Вересень','Жовтень', 'Листопад', 'Грудень'];

cal_months_backgrounds = ['zjpg', 'img/clr-bg-2.jpg', 'img/clr-bg-2.jpg', 'img/clr-bg-3.jpg', 'img/clr-bg-3.jpg', 'img/clr-bg-3.jpg', 'img/clr-bg-4.jpg'];

//days for each month
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//current date
cal_current_date = new Date(); 

function Calendar(month, year, events) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.day = cal_current_date.getDate();
  this.events = (events == null) ? {} : events;
  this.html = '';
}

Calendar.prototype.generateHTML = function(){

  // get first day of month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay()-1;
  if(startingDay<0) startingDay=6;

  
  // find number of days in month
  var monthLength = cal_days_in_month[this.month];
  
  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[this.month],
      monthBackground = cal_months_backgrounds[this.month];
  var html = '<table class="calendar-table" data-month="'+this.month+'" data-year="'+this.year+'">';
  html += '<tr class="calendar-month" style="background-image: url('+monthBackground+')"><th colspan="7">';
  html +=  '<span class="month-prev"><span></span></span>' + '<span class="month-title">' + monthName + ",&nbsp;" + this.year + '</span>' + '<span class="month-next"><span></span></span>';
  html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for(var i = 1; i <= 6; i++ ){
    html += '<td class="calendar-header-day">';
    html += cal_days_labels[i];
    html += '</td>';
  }
    html += '<td class="calendar-header-day">';
    html += cal_days_labels[0];
    html += '</td>';
  html += '</tr><tr>';

  // fill in the days
  var day = 1;
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 6; j++) { 
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          html += '<td class="calendar-day '+((day==this.day && this.month==cal_current_date.getMonth())?('active'):'')+'"><div class="cell">';
          
            html += '<span class="number">'+day+'</span>';
            if (""+day in this.events){
                html += this.events[""+day];
            }
            day++;

          html += '</div></td>';
        }
        else html += '<td class="calendar-day disabled"><div class="cell"></div></td>';
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';

  this.html = html;
};

Calendar.prototype.getHTML = function() {
  return this.html;
};


jQuery(function($){
    var monthEvents = {
        "4":"<div class='calendar-event-content disabled'><div class='clrEvent'><a class='ev1' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div> <div class='clrEvent'><a class='ev2' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div></div>", 
        "9":"<div class='calendar-event-content'><div class='clrEvent'><a class='ev4' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div> <div class='clrEvent'><a class='ev3' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div></div>", 
        "12":"<div class='calendar-event-content'><div class='clrEvent'><a class='ev5' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div> <div class='clrEvent'><a class='ev1' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div></div>",
        "15":"<div class='calendar-event-content'><div class='clrEvent'><a class='ev2' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div></div>", 
        "25":"<div class='calendar-event-content'><div class='clrEvent'><a class='ev3' href='events.html'>  </a><div class='clrPopUp'><a href='events.html'><span>22:00</span> Україна - Франція</a><a href='events.html'><span>22:00</span> Спеціальна пропозиція для фанатів футболу</a></div></div></div>"
    };
    //var cal = new Calendar(3,2016);
    var cal = new Calendar(null, null, monthEvents);
    cal.generateHTML();
    $('#calendar-wrapper').html(cal.getHTML());

    $(document).on('click', '.month-prev', function(){
        var table = $(this).closest('.calendar-table'),
            month = parseInt(table.data('month'), 10) - 1,
            year = parseInt(table.data('year'), 10);
        if(month<0){
            month = 11;
            year = year - 1;
        }
        cal = new Calendar(month, year, monthEvents);
        cal.generateHTML();
        $('#calendar-wrapper').html(cal.getHTML());
    });

    $(document).on('click', '.month-next', function(){
        var table = $(this).closest('.calendar-table'),
            month = parseInt(table.data('month'), 10) + 1,
            year = parseInt(table.data('year'), 10);
        if(month>11){
            month = 0;
            year = year + 1;
        }
        cal = new Calendar(month, year, monthEvents);
        cal.generateHTML();
        $('#calendar-wrapper').html(cal.getHTML());
    });
});
