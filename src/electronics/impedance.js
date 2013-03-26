var electronics = {
	
	impedance: {
		
		getPowerTransfer: function(peak, source, load) {
			return (Math.pow(peak, 2) * load) / (2 * Math.pow(source + load, 2)); 
		},
		
		getEfficiency: function(source, load) {
			return load / (source + load);
		},
		
		getSignalLoss: function(source, load) {
			return 20 * Math.log(this.getEfficiency(source, load)) / Math.LN10;
		},
		
		getPowerRatio: function(pow, max) {
			return pow / max;
		},
		
		getReflectionCoefficient: function(source, load) {
			return (load - source) / (load + source);
		}
		
	}
	
};