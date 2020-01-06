<script>
	const dispatch = createEventDispatcher();

    export let json = {};
    export let data = {};

	$: if (json) {
        if (json.split) {
            json = JSON.parse(json);
        }
        merge();
	}

	$: if (data) {
        if (data.split) {
            data = JSON.parse(data);
        }
        merge();
	}

    export function merge(jsonIn, dataIn) {
        jsonIn = jsonIn || json;
        dataIn = dataIn || data;
        var jsonString = JSON.stringify(jsonIn);
        for (var prop in dataIn) {
            var value = dataIn[prop];
            var subKey = "${" + prop + "}";
            while (jsonString.indexOf(subKey) >= 0) {
                jsonString = jsonString.replace(subKey, value);
            }
        }
        var merged = JSON.parse(jsonString);
        event("merged", merged);
        return merged;
    }

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

 </script>