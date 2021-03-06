function App() {
	
	var render = function(container, voltage, source, load) {
		
		// calculate values
		var maximumPowerTransfer = electronics.impedance.getPowerTransfer(voltage, source, source);
		var powerTransfer = electronics.impedance.getPowerTransfer(voltage, source, load);
		var powerRatio = electronics.impedance.getPowerRatio(powerTransfer, maximumPowerTransfer);
		var signalEfficiency = electronics.impedance.getEfficiency(source, load);
		var signalLoss = electronics.impedance.getSignalLoss(source, load);
		var reflectionCoefficient = electronics.impedance.getReflectionCoefficient(source, load);
		
		var info = [], warnings = [], success = [], fatal = [];
		
		// get match information
		info.push(["Source voltage", math.getRoundedValue(voltage, 3), "V"].join(" "));
		info.push(["Source", math.getRoundedValue(source, 3), "\u2126"].join(" "));
		info.push(["Load", math.getRoundedValue(load, 3), "\u2126"].join(" "));
		info.push(["Load power", math.getRoundedValue(powerTransfer, 3), "W"].join(" "));
		info.push(["Load power (% of max)", math.getRoundedValue(powerRatio * 100, 3), "%"].join(" "));
		info.push(["Signal efficiency", math.getRoundedValue(signalEfficiency * 100, 3), "%"].join(" "));
		info.push(["Signal loss", math.getRoundedValue(signalLoss, 3), "dB"].join(" "));
		info.push(["Reflection coefficient", math.getRoundedValue(reflectionCoefficient, 3), ""].join(" "));
		
		// validate match
		if(source > load) {
			fatal.push("Impedance mismatch, overload!");
		}
		if(reflectionCoefficient === -1) {
			fatal.push("Short circuit!");
		}
		
		if(signalLoss < -6) {
			warnings.push("Signal loss over 6 dB");
		}
		if(reflectionCoefficient === 1) {
			warnings.push("Open circuit! No source...");
		}
		if(powerRatio < 0.03) {
			warnings.push("Less than 3% power is reaching the load");
		}
		
		if(signalLoss > -6) {
			success.push("Signal loss under 6 dB");
		}
		if(reflectionCoefficient === 0) {
			success.push("No signal reflection");
		}
		if(powerRatio > 90) {
			success.push("Transferred over 90% of maximum power");
		}
		if(source < load) {
			success.push("Within safe limits");
		}
		
		var frag = document.createDocumentFragment();
		
		for(var i = 0; i < fatal.length; ++i) {
			frag.appendChild($('<p class="message message-fatal"/>').text(fatal[i]).get(0));
		}
		
		for(var i = 0; i < success.length; ++i) {
			frag.appendChild($('<p class="message message-success"/>').text(success[i]).get(0));
		}		
		
		for(var i = 0; i < warnings.length; ++i) {
			frag.appendChild($('<p class="message message-warning"/>').text(warnings[i]).get(0));
		}
		
		for(var i = 0; i < info.length; ++i) {
			frag.appendChild($('<p class="message message-info"/>').text(info[i]).get(0));
		}
		
		container.append(frag);
		
	};
	
	this.main = function(args) {
		
		// device information
		var voltage = 230;
		var source = 100;
		var load = 1000;
		
		$(function() {
			$("form").on("submit", function() {
				var voltage = +$(this.elements.voltage).val();
				var source = +$(this.elements.source).val();
				var load = +$(this.elements.load).val();
				render($("#details").empty(), voltage, source, load);
				return false;
			});

			$("button").on("mousedown", function() {
				$(this).addClass("button-clicked");
			}).on("mouseup mouseout", function() {
				$(this).removeClass("button-clicked");
			});
		});
		
	};
	
}
