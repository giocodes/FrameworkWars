// This file holds the features related to the table visualization

let mainTable = false;

$(document).ready(function() {
  mainTable = $('#table_id').DataTable({
    paging: false,
    info: false,
    searching: false
  });
});

// Adding Rows
function addRow(data) {
  mainTable.row.add(data).draw();
  // $('#table_id').DataTable().row.add(data).draw();	
}

// Removing Rows
$('#table_id tbody').on('click', '.icon-delete', function() {
  // select the framework Id to be removed
  let fmId = $(this).attr('fmId')
    // remove it from the main object
  for (fm in frameworks) {
    if (frameworks[fm].data.id === +fmId) {
      delete frameworks[fm]
    }
  }
  $('#table_id').DataTable()
    .row($(this).parents('tr'))
    .remove()
    .draw();

  // update Chart
  updateChart();
});

// Clear Table
function clearTable() {
  if (mainTable) {
    mainTable.clear().draw();

  }
}
