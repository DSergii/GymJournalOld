// initialize material design js
$.material.init();
(function(){
	'use strict'
	
	angular
		.module('GymDiary', [
		'ngRoute',
		'firebase',
		'GymDiary.gymfirebase.srv',
		'GymDiary.about',
		'GymDiary.contact',
		'GymDiary.main',
		'GymDiary.exercises',
		'GymDiary.statistics',
		'GymDiary.profile',
		'GymDiary.playlist',
		'GymDiary.nutrition'
		])
		.config(gymDiaryConfig)
		.constant('FIREBASE_URL', 'https://gymjournal.firebaseio.com/')
		.controller('AppCtrl', AppCtrl)
				
	gymDiaryConfig.$inject = ['$routeProvider', '$locationProvider'];


	function AppCtrl($scope, $rootScope){

	}
	
	function gymDiaryConfig($routeProvider, $locationProvider){
		$routeProvider.
			otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(false);
	}
})();


;(function(){
'use strict'

	angular
		.module('GymDiary.gymfirebase.srv', ['firebase'])
		.service('gymfirebase', gymfirebase);


	gymfirebase.$inject = ['FIREBASE_URL', '$firebaseObject', '$firebaseArray'];


	function gymfirebase(FIREBASE_URL, $firebaseObject, $firebaseArray){

		var dbData = this;

		/* подключение к БД */
		var ref = new Firebase(FIREBASE_URL);

		/* получение объекта из БД */
		var refObj = $firebaseObject(ref);

		/* получение массива из объекта БД */
		var refArr = $firebaseArray(ref);

		/*вернет только пользователей, все равно, что добавить users в конец url ->  https://gymjournal.firebaseio.com/users */
		var usersRef = ref.child('users');

		var usersArr = $firebaseArray(usersRef);

		this.getUsers = function(){
			return usersArr.$loaded(function(_data){
				return _data;
			});
		};

		this.addUser = function(_user){
			usersRef.push(_user);
		};

		/* callback функция, возвращающая через промис объект из БД 
		(можно обойтись без нее, но она нужна для синхронной загрузки) */
		refObj.$loaded(function() {
			dbData.dbObj = refObj;
		});

		/* тот же callback только в виде массива */
		refArr.$loaded(function(){
			dbData.dbArr = refArr;
		});

	}


})();
;(function(){
'use strict'

angular
	.module('GymDiary.about', ['ngRoute'])
	.config(['$routeProvider', configAbout])
	.controller('AboutCtrl', AboutCtrl);
	
	AboutCtrl.$inject = ['$scope', '$rootScope', 'gymfirebase'];
	
	function AboutCtrl($scope, $rootScope, gymfirebase){

		var vm = this;

		vm.title = 'Page About';
		$rootScope.curPath = 'about';

		gymfirebase.getUsers().then(function(_data){
			vm.users = _data;
		});

		vm.user = {
			name: null,
			age: 0
		}

		vm.addUser = function(){
		 	gymfirebase.addUser(vm.user);
		}
			

	}
	
	function configAbout($routeProvider){
		$routeProvider.
			when('/about', {
				templateUrl: 'app/about/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'vm'
			});
	}
})();
;(function(){
'use strict'

angular
	.module('GymDiary.contact', ['ngRoute'])
	.config( configContact )
	.controller('ContactCtrl', ContactCtrl);
	
	ContactCtrl.$inject = ['$scope', '$rootScope'];
	
	function ContactCtrl($scope, $rootScope){
		$scope.title = 'Contact';
		$rootScope.curPath = 'contact';
	}
	
	function configContact($routeProvider){
		$routeProvider
			.when('/contact', {
				templateUrl: 'app/contact/contact.html',
				controller: 'ContactCtrl'
			});
	}
})();
;(function(){
	'use strict'

angular
	.module('GymDiary.exercises', ['ngRoute'])
	.config(ConfigExercicses)
	.controller('ExercisesCtrl', ExercisesCtrl);


	ExercisesCtrl.$inject = ['$scope', '$rootScope'];

	function ExercisesCtrl($scope, $rootScope){
		$scope.title = 'Exercises';
		$rootScope.curPath = 'exercises';
	}

	function ConfigExercicses($routeProvider){
		$routeProvider
			.when('/exercises', {
				templateUrl: 'app/exercises/exercises.html',
				controller: 'ExercisesCtrl'
			});
	}


})();
;(function(){
'use strict'

	angular
		.module('GymDiary.main', ['ngRoute'])
		.config(configMain)
		.controller('MainCtrl', MainCtrl);

		MainCtrl.$inject = ['$scope', '$rootScope'];
		
		function MainCtrl($scope, $rootScope){

			var vm = this;

			vm.title = 'Main';
			$rootScope.curPath = 'home';


		}

		function configMain($routeProvider){
			$routeProvider
				.when('/home', {
					templateUrl: 'app/main/main.html',
					controller: 'MainCtrl',
					controllerAs: 'vm'
				});
		}

})();

;(function (){
'use strict'
angular
	.module('GymDiary.nutrition', ['ngRoute'])
	.config(NutritionConfig)
	.controller('NutritionCtrl', NutritionCtrl);

	NutritionCtrl.$inject = ['$scope', '$rootScope'];

	function NutritionCtrl($scope, $rootScope){
		$scope.title = 'Nutrition';
		$rootScope.curPath = 'nutrition';
	}

	function NutritionConfig($routeProvider){
		$routeProvider
			.when('/nutrition', {
				templateUrl: 'app/nutrition/nutrition.html',
				controller: 'NutritionCtrl'
			});
	}
})();
;(function(){
'use strict'

angular
	.module('GymDiary.playlist', ['ngRoute'])
	.config( PlaylistConfig )
	.controller('PlayListCtrl', PlayListCtrl);
	
	PlayListCtrl.$inject = ['$scope', '$rootScope'];
	
	function PlayListCtrl($scope, $rootScope){
		$scope.title = 'PlayList';
		$rootScope.curPath = 'playlist';
	}
	
	function PlaylistConfig($routeProvider){
		$routeProvider
			.when('/playlist', {
				templateUrl: 'app/playlist/playlist.html',
				controller: 'PlayListCtrl'
			});
	}
})();
;(function (){
'use strict'
angular
	.module('GymDiary.profile', ['ngRoute'])
	.config(ProfileConfig)
	.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$scope', '$rootScope'];

	function ProfileCtrl($scope, $rootScope){
		$scope.title = 'Profile';
		$rootScope.curPath = 'profile';
	}

	function ProfileConfig($routeProvider){
		$routeProvider
			.when('/profile', {
				templateUrl: 'app/profile/profile.html',
				controller: 'ProfileCtrl'
			});
	}
})();
;(function (){
'use strict'
angular
	.module('GymDiary.statistics', ['ngRoute'])
	.config(StatisticsConfig)
	.controller('StatisticCtrl', StatisticCtrl);

	StatisticCtrl.$inject = ['$scope', '$rootScope'];

	function StatisticCtrl($scope, $rootScope){
		$scope.title = 'Statistics';
		$rootScope.curPath = 'statistics';
	}

	function StatisticsConfig($routeProvider){
		$routeProvider
			.when('/statistics', {
				templateUrl: 'app/statistics/statistics.html',
				controller: 'StatisticCtrl'
			});
	}
})();
/**
 * Created by szaharov on 28/05/15.
 */
