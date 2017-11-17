(function () {
    'use strict';
	angular.module("uigridApp", ['ui.grid', 'ngTagsInput', 'am.multiselect'])
		.controller("uigridCtrl", function ($scope, $http, $rootScope) {
			$scope.productData = [];
    		$http.get('https://s3-us-west-1.amazonaws.com/hero-engineering-public/interview/fe-code-challenge.json')
         	.success(function (data) {
         		$scope.productData = data.cards;
         		$scope.uniqueTags = function() {
         			  return _.chain($scope.productData)
         			    .pluck('tags')
         			    .flatten()
         			    .unique()
         			    .value();         			 
         			};
         		$scope.holder = $scope.uniqueTags();
         		$scope.technologyArray = [];
         		var i = 0;
      			angular.forEach($scope.holder, function(program) {
      				i++;
      				$scope.technologyArray.push({
      					name: program,
      					on: false,
      			      	id: i
      			 	});
      			});
      			$rootScope.bundleTest = [];
      			$scope.showAll = true;
         		$scope.checkChange = function() {
         			for(var i=0;i<$scope.technologyArray.length;i++) { 
         				if($scope.technologyArray[i].on){
         					$scope.showAll = false;
         			     	return;
         			  	}
         			 }
         			$scope.showAll = true;
         		};         			    
         		$rootScope.checkChangeMobile = function(a, b) {
         			$scope.technologyArray.filter(function(item) {
         				if (item.name === a) {
         					if (b == true){
	         					item.on = true;
	         					return item;
         					} else {
         						item.on = false;
            					return item;
         					}
         				}
         			})[0];
         			$scope.checkChange();
        		};         			    
        		$scope.productFilter = function(a) {
         			if($scope.showAll) { return true; }
         			var sel = false;
         			for(var tech in $scope.technologyArray){
         				var t = $scope.technologyArray[tech];
         				if(t.on){
         					if(a.tags.indexOf(t.name) == -1){
         			        	return false;
         			      	}else{
         			          	sel = true;
         			     	}
         				}           
         			}
         			return sel;
         		};	        			           			   
         	})
         	.error(function (data, status, headers, config) {
             	//  Placeholder for actual error handling that would be uniquely created depending on the core environment.
         		alert("The entire Internet is down! Please reboot society and try again.");
         	});   
	
		});
 
}());;