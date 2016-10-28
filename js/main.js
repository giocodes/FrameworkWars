// Let's start by creating an object to hold the default frameworks we want to load by default. 
let frameworks = {
  'facebook/react': {
    repo: 'https://github.com/facebook/react',
    full_name: 'facebook/react'
  },
  'angular/angular.js': {
    repo: 'https://github.com/angular/angular.js',
    full_name: 'angular/angular.js'
  },
  'emberjs/ember.js': {
    repo: 'https://github.com/emberjs/ember.js/',
    full_name: 'emberjs/ember.js'
  },
  'vuejs/vue': {
    repo: 'https://github.com/vuejs/vue',
    full_name: 'vuejs/vue'
  }
}

// Then, we'll have a helper function to fetch the information for each default framework
function loadDefaults() {
  for (fm in frameworks) {
    fetchGithubData(frameworks[fm].full_name);
  }
}

// This one gets the jucy data from GitHub
function fetchGithubData(full_name) {
  let gitHub = 'https://api.github.com/repos/' + full_name;
  // actions.push();
  fetch(gitHub)
    .then(res => res.json())
    .then(res => updateTable(res))
    // Update the chart too!
    .then(res => updateChart())
}

// Helper function to select useful data and then insert the new row on the table
function updateTable(data) {
  frameworks[data.full_name]['data'] = data
  let name = data.full_name.split('/')[1];
  // From all the data feteched from GitHub, we'll pass the following to be added as a new row
  let dataArray = [name, data.watchers.toLocaleString(),
      data.forks.toLocaleString(),
      data.open_issues.toLocaleString(),
      data.subscribers_count.toLocaleString(),
      filesize(data.size),
      new Date(Date.parse(data.updated_at)).toLocaleString(),
      '<td class="icon-delete"><span fmId="'+data.id+'" class="icon-delete glyphicon glyphicon-trash" aria-hidden="true"></span></td>'
    ]
    // Call this helper function located on table.js
  addRow(dataArray);
  // Update header
  let currentTime = new Date().toLocaleString();
  $('#updateTime').html(currentTime);
}

// and then we can add even more framworks repos
$("#addRow").click(event => {
  let newURL = $("#newURL").val();
  let full_name = validURL(newURL);
  if (frameworks[full_name]) {
    alert('already on the list')
  } else if (full_name) {
    frameworks[full_name] = {};
    frameworks[full_name]['full_name'] = full_name;
    frameworks[full_name]['repo'] = newURL;
    fetchGithubData(full_name);
    $("#newURL").val("")
  }

  function validURL(URL) {
    if (newURL.slice(0, 18) === "https://github.com") {
      return newURL.slice(19);
    } else if (newURL.slice(0, 17) === "http://github.com") {
      return newURL.slice(18);
    } else {
      alert('Please use a valid URL starting with https://github.com/')
      return false;
    }
  }
})

// Option to update the stats every minute, not optimal since GitHub Api rate limit is 60 per hour w/o auth
// let refresh = window.setInterval(doRefresh, 60000);

function doRefresh(){
  let nextUpdate = new Date();
  nextUpdate.setMinutes(nextUpdate.getMinutes() + 1);
  $('#nextUpdate').html(nextUpdate.toLocaleString());
  clearTable();
  loadDefaults();
}

// Or refresh the data on demand
$("#refreshNow").click(event => {
  doRefresh();
})
// Update Chart on demand (not needed anymore)
$("#refreshChart").click(event => {
  updateChart();
})
// Update on new selector option
$("#chartSelect").change(event => {
  updateChart($("#chartSelect").val())
})

// First run!
doRefresh();
