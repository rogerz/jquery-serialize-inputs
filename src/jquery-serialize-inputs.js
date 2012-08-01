/* 
   jQuery plugin to serialize inputs to javascript object
   https://github.com/rogerz/jquery-serialize-inputs

   Rogerz Zhang <rogerz.zhang@gmail.com>
   2012-05-19
   */

(function ($) {
	function parseVal(value, type) {
		if (type == "number") {
			return Number(value);
		} else if (type == "string") {
			return String(value);
		} else if (value === "true") {
			return true;
		} else if (value === "false") {
			return false;
		} else if (value === "null") {
			return null;
		} else if (isNaN(Number(value))) {
			return value;
		} else {
			return Number(value);
		}
	}
	$.fn.serializeInputs = function(filter) {
		var inputs = {};
		var arrayFilter = "select[name].array,input[name].array";
		// you may override the default selector, the element should have 'name'
		// attribute and 'val()' method
		filter = filter
			|| "select,input:text,input:hidden,input:radio:checked,input:checkbox:checked";
		this
			.find(filter)
			.add(this.filter(filter))
			.filter("[name]")
			.each(
					function() {
						var key = this.name, $elem = $(this), type = undefined, value = $elem
				.val();
			if ($elem.is(".number")) {
				type = "number";
			} else if ($elem.is(".string")) {
				type = "string";
			}
			if ($elem.is(".array")) {
				try {
					inputs[key].push(parseVal(value, type));
				} catch (e) {
					inputs[key] = [ parseVal(value, type) ];
				}
			} else {
				inputs[key] = parseVal(value, type);
			}
					});
		this.find(arrayFilter).add(this.filter(arrayFilter)).each( function(){
			// create empty array if nothing is selected
			if (!inputs[this.name])
			inputs[this.name] = [];
		});
		return inputs;
	};

	$.fn.autoFillInputs = function(values, callback) {
		var filter = "select,input:text,input:radio,input:checkbox";
		if (!values)
			return;
		this.find(filter).add(this.filter(filter)).each(function() {
			var $this = $(this);
			if (values[this.name] == undefined) {
				return;
			}
			if ($this.is(":text")) {
				$this.val(values[this.name]);
			} else {
				var type = undefined;
				if ($this.is(".number")) {
					type = "number";
				} else if ($this.is(".string")) {
					type = "string";
				}
				if ($this.is("select")) {
					var name = this.name;
					$this.find("option").filter( function() {
						return parseVal(this.value,	type) === values[name];
					}).attr("selected", true);
				} else if ($this.is(":checkbox")) {
					var checkbox = this;
					checkbox.checked = false;
					$.each(values[this.name], function(index, value) {
						if (parseVal(checkbox.value, type) === value) {
							checkbox.checked = true;
						}
					});
				} else if ($this.is(":radio")) {
					this.checked = (parseVal(this.value, type) === values[this.name]);
				}
			}
			callback && callback(this);
		});
	};
})(jQuery);
