/* 
   jQuery plugin to serialize inputs to javascript object
   https://github.com/rogerz/jquery-serialize-inputs

   Rogerz Zhang <rogerz.zhang@gmail.com>
   2012-05-19
   */

(function ($) {
	"use strict";
	function parseVal(value, type) {
		if (type === "number") {
			return Number(value);
		}
		if (type === "string") {
			return String(value);
		}
		if (value === "true") {
			return true;
		}
		if (value === "false") {
			return false;
		}
		if (value === "null") {
			return null;
		}
		if (isNaN(Number(value))) {
			return value;
		}
		return Number(value);
	}
	$.fn.serializeInputs = function (filter) {
		var inputs = {}, arrayFilter = "select[name].array,input[name].array";
		// you may override the default selector, the element should have 'name'
		// attribute and 'val()' method
		filter = filter
				|| "select,input:text,input[type=hidden],input:radio:checked,input:checkbox:checked";
		this
			.find(filter)
			.add(this.filter(filter))
			.filter("[name]")
			.each(function () {
				var key = this.name, $elem = $(this), type = undefined, value = $elem.val();
				if ($elem.is(".number")) {
					type = "number";
				} else if ($elem.is(".string")) {
					type = "string";
				}
				if ($elem.is(".array")) {
					try {
						inputs[key].push(parseVal(value, type));
					} catch (e) {
						inputs[key] = [parseVal(value, type)];
					}
				} else {
					inputs[key] = parseVal(value, type);
				}
			});
		this.find(arrayFilter).add(this.filter(arrayFilter)).each(function () {
			// create empty array if nothing is selected
			if (!inputs[this.name]) {
				inputs[this.name] = [];
			}
		});
		return inputs;
	};

	$.fn.fillInput = function (value) {
		var $elem = this, type = undefined;
		if ($elem.is(":text")) {
			$elem.val(value);
		} else {
			if ($elem.is(".number")) {
				type = "number";
			} else if ($elem.is(".string")) {
				type = "string";
			}
			if ($elem.is("select")) {
				$elem.find("option").filter(function () {
					return parseVal(this.value,	type) === value;
				}).attr("selected", true);
			} else if ($elem.is(":checkbox")) {
				$elem.attr("checked", false);
				$.each(value, function (index, val) {
					if (parseVal($elem.val(), type) === val) {
						$elem.attr("checked", true);
					}
				});
			} else if ($elem.is(":radio")) {
				$elem.attr("checked", (parseVal($elem.val(), type) === value));
			}
		}
	};

	$.fn.autoFillInputs = function (values, callback) {
		var filter = "select,input:text,input:radio,input:checkbox";
		if (!values) {
			return;
		}
		this.find(filter).add(this.filter(filter)).each(function () {
			if (values.hasOwnProperty(this.name)) {
				$(this).fillInput(values[this.name]);
				if (callback) {
					callback(this);
				}
			}
		});
	};
})(jQuery);
