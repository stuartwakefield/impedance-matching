var math = {
	
	getRoundedValue: function(n, d) {
		var l = Math.pow(10, d);
		return Math.round(n*l)/l;
	}
	
}
