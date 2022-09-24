var games = new Vue({
	el: '#all',
	data: {
		games: [],
		isFullScreen: false,
		isShowBox: false,
		currentGame: {
			name: '',
			url: ''
		}
	},
	created: function() {
		
		var self = this
		var erd = elementResizeDetectorMaker();
		var erdUltraFast = elementResizeDetectorMaker({
			strategy: "scroll"
		});
		self.games = gamesData
		var itemNums = gamesData.length
		erd.listenTo(document.getElementById('games'), function(element) {
			var width = element.offsetWidth;
			var height = element.offsetHeight;
			var n = ~~(width / 176)
			var left = 0
			if (itemNums % n > 0) {
				left = n - itemNums % n
			}
			if (n <= 2) {
				$('#games').css('justify-content', 'center');
			} else {
				$('#games').css('justify-content', 'space-between');
			}
			if (left > 0) {
				var div = ''
				while (left > 0) {
					div += '<div class="game-item game-item-hide"></div>'
					left--;
				}
				$('.game-item-hide').remove()
				$('#games').append(div)
			} else {
				$('.game-item-hide').remove()
			}
		});
		self.initGame()
	},
	methods: {
		getJsonFromUrl: function() {
			var query = location.search.substr(1);
			var result = {};
			query.split("&").forEach(function(part) {
				var item = part.split("=");
				result[item[0]] = decodeURIComponent(item[1]);
			});
			return result;
		},
		initGame: function() {
			var self = this
			var params = self.getJsonFromUrl()
			var id = params.gameid
			for (var i in gamesData) {
				var game=gamesData[i]
				if(game.id==id){
					self.play(game)
					break
				}
			}
		},
		fullScreen: function() {
			this.isFullScreen = !this.isFullScreen
		},
		close: function() {
			this.isShowBox = false
		},
		play: function(game) {
			this.currentGame = game
			//this.currentGame.url=''
			this.isShowBox = true
			this.isFullScreen = false
		}
	}
})