function nextTrain(destStation) {
  var url = 'http://as0.mta.info/mnr/schedules/sched_results.cfm?n=y';
  var currentTime = new Date();
  var params = {
    'orig_id' : 1, // Grand Central
    'dest_id' : destStation,
    'Filter_id' : 1,
    'traveldate' : getDate(currentTime),
    'Time_id' : getTime(currentTime),
    'SelAMPM1' : getAmPm(currentTime),
    'cmdschedule' : 'see schedule'
  };
  post_to_url(url, params, 'post');
}

function getDate(currentTime) {
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  return month + '-' + day + '-' + year;
}

function getTime(currentTime) {
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}

function getAmPm(currentTime) {
  var hours = currentTime.getHours();
  if (hours > 11) {
    return 'PM';
  } else {
    return 'AM';
  }
}

function post_to_url(path, params, method) {
  method = method || 'post'; // Set method to post by default, if not
  // specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);
//  form.setAttribute('target', '_blank');

  for ( var key in params) {
    if (params.hasOwnProperty(key)) {
      var hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}