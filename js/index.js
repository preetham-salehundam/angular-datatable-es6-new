var module = angular.module('app', ['data-table']);

module.controller('MyController', function($scope, $http, $filter) {
  var data;
  $scope.selected=[];
  $scope.options = {
    rowHeight: 50,
    headerHeight: 50,
    footerHeight: 50,
    checkboxSelection: true,
    selectable: true,
    multiSelect: true,

    columns: [{
      name: "WTG",
      prop: "turbineNumber",
      isCheckboxColumn: true,
      headerCheckbox: true,
      cellRenderer: function() {
        return '<a href="/#"> {{$cell}}</a>';
      }
    }, {
      name: "Type",
      prop: "taskType"
    },
    {
      name: "Description",
      prop: "description",
      width: 600,
      cellRenderer: function() {
        return '<div><a href="/#"> {{$cell}}</a></div>';
      }
    },{
      name: "Priority",
      prop: "priority"
    },{
      name: "Complete By",
      prop: "createdBy",
      canAutoResize: false
    },{
      name: "Notes",
      prop: "notes"
    }],
    paging: {
      externalPaging: false,
      size:10
    }
  };
 $http.get('js/dpod.json').success(function(data) {
  $scope.data = data.done;
   $scope.masterData = angular.copy($scope.data);
  });
  /*$scope.paging = function(offset, size) {
    $http.get('https://cdn.rawgit.com/Swimlane/angular-data-table/master/demos/data/complex-100000.json').success(function(d) {
      console.log("called");
      $scope.options.paging.count = d.length;

      var set = d.splice(offset, size);
      if (!$scope.data) {
        $scope.data = set;
      } else {
        // only insert items i don't already have
        set.forEach(function(r, i) {
          var idx = i + (offset * size);
          $scope.data[idx] = r;
        });
      }
//console.log($scope.data.splice(1,20))
      //console.log('paging!', offset, size)
    });
  };*/
  $scope.demo=function(cell){
    console.log(cell)
  }
$scope.filter = function(){
  console.log('filtering')
  $scope.data = $filter('filter')($scope.masterData,$scope.key)
}
$scope.onSelect = function(row) {
  console.log('ROW SELECTED!', row);
}
$scope.onRowClick = function(row) {
  console.log('ROW CLICKED', row);
}
});
