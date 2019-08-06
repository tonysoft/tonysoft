'use strict';

{
  let initCalled;
  const callbackPromise = new Promise((r) => window.__initGoodMap = r);

  function loadGoogleMaps(apiKey) {
    if (!initCalled) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?' +
        (apiKey ? `key=${apiKey}&` : '') +
        'callback=__initGoodMap';
      document.head.appendChild(script);
      initCalled = true;
    }
    return callbackPromise;
  }

  function isObject(something) {
    if( (typeof something === "object") && (something !== null) ) {
        return true;
    }
    else {
        return false;
    }
  }


  customElements.define('rmx-map', class extends HTMLElement {
    static get observedAttributes() {
      return ['api-key', 'zoom', 'latitude', 'longitude', 'map-options', 'markers', 'fit-to-markers', "authoring"];
    }

    attributeChangedCallback(name, oldVal, val) {
      var context = this;
      switch (name) {
        case 'api-key':
          this.apiKey = val;
          break;
        case 'zoom':
          this.zoom = parseFloat(val);
          if (this.map) this.map.setZoom(this.zoom);
          break;
        case "fit-to-markers":
            this.fitToMarkers = (val || (val === "")) ? true : false;
            break;
        case "authoring":
            this.authoring = val ? true : false;
            break;
        case 'latitude':
        case 'longitude':
          this[name] = parseFloat(val);
          if (this.map) this.map.setCenter({ lat: this.latitude || 0, lng: this.longitude || 0 });
          break;
        case 'map-options':
            context.mapOptions = val;
            try {
                context.mapOptions = JSON.parse(val);
            } catch(e) {}
            if (this.map) {
                this.map.setOptions(this.mapOptions);
            }
            break
        case 'markers':
            context.markers = val;
            try {
                context.markers = JSON.parse(val);
            } catch(e) {}
            if (this.map) {
                this.processMarkers(context.markers);
            }
            break
        }
    }

    constructor() {
      super();

      this.map = null;
      this.apiKey = null;
      this.zoom = null;
      this.latitude = null;
      this.longitude = null;
      this.mapOptions = {};
      this.markers = [];
      this.authoring = false;
    }

    setMarkers(map) {
        var context = this;
        if (context.mapMarkers) {
            for (var i = 0; i < context.mapMarkers.length; i++) {
                context.mapMarkers[i].setMap(map);
            }
        }
    }


    processMarkers(markers) {
        var context = this;
        context.setMarkers(null);
        context.mapMarkers = [];
        context.markers = markers;
        if (context.markers && context.markers.length) {
            var markerCount = context.markers.length;
            const latLngBounds = new google.maps.LatLngBounds();
            context.markers.forEach(function(marker) {
                addMarker(marker);
            });

            function addMarker(marker) {
                latLngBounds.extend(new google.maps.LatLng(marker.location.lat, marker.location.lng));
                var aMarker = new google.maps.Marker({
                    position: marker.location,
                    map: context.map,
                    title: marker.title || marker.id
                });
                context.mapMarkers.push(aMarker);
                aMarker.addListener('click', function() {
                    context.map.setZoom(8);
                    context.map.setCenter(marker.location);
                    context.dispatchEvent(new CustomEvent('marker', { detail: marker }));
                });
            }

            if (context.fitToMarkers) {
                fitToMarkers();
            }

            context.map.addListener('click', function(e) {
                if (context.authoring && !context.markerJustAdded) {
                    context.markerJustAdded = true;
                    var now = new Date();
                    markerCount++;
                    var newMarker = { id: now.getTime().toString(), title: "Marker " + markerCount, location: { lat: e.latLng.lat(), lng: e.latLng.lng() }};
                    addMarker(newMarker);
                    context.dispatchEvent(new CustomEvent('new-marker', { detail: newMarker }));
                } else {
                    if (context.authoring) {
                        context.markerJustAdded = false;
                    }
                    if (context.fitToMarkers) {
                        fitToMarkers();
                    } else {
                        context.map.setZoom(context.zoom);
                        context.map.setCenter({ lat: context.latitude, lng: context.longitude});
                    }
                }
            });

            function fitToMarkers() {
                // For one marker, don't alter zoom, just center it.
                if (context.markers.length > 1) {
                    context.map.fitBounds(latLngBounds);
                }
                context.map.setCenter(latLngBounds.getCenter());
            }
        } else {
            context.map.setZoom(context.zoom);
            context.map.setCenter({ lat: context.latitude, lng: context.longitude});
        }
    }

    connectedCallback() {
      loadGoogleMaps(this.apiKey).then(() => {
        var context = this;
        if (!this.mapOptions.zoom) {
          this.mapOptions.zoom = this.zoom || 0;
        }
        if (!this.mapOptions.center) {
          this.mapOptions.center = {
            lat: this.latitude || 0,
            lng: this.longitude || 0
          };
        }
        this.map = new google.maps.Map(this, this.mapOptions);
        this.dispatchEvent(new CustomEvent('google-map-ready', { detail: this.map }));

        context.processMarkers(context.markers);

        // exposed 2 extra events to the external world
        this.map.addListener('zoom_changed', () => {
          this.dispatchEvent(new CustomEvent('zoom-changed', { detail: this.map.getZoom() }));
        });
        this.map.addListener('center_changed', () => {
          this.dispatchEvent(new CustomEvent('center-changed', { detail: {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()} }));
        });
      });
    }
  });
}