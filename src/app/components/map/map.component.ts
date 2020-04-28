import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  markerSource = new ol.source.Vector();
  latitude = 85.01220703125;
  longitude = 28.594168506232606;
  showTesting: boolean = false;

  @Output() mapClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() crossClickedEvent: EventEmitter<any> = new EventEmitter();
  @Input() globalReport;
  @Input() showInfo: boolean = false;
  @Input() loading$;
  @Input() RLoading$;
  @Input() information;
  @Input() report;
  @Input() menuClicked;


  ngOnInit() {
    // const tiles_url = `https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en`;
    const tiles_url = `https://c.tile.openstreetmap.org/{z}/{x}/{y}.png`;
    // const tiles_url = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png`;
    var markerStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        anchor: [0.5, 23],
        opacity: 1,
        src: './assets/images/marker.png'
      }))
    });
    var layerVector = new ol.layer.Vector({
      source: this.markerSource,
      style: markerStyle,
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(
            {
              'url': tiles_url
            }
          ),
        }),
        layerVector,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.latitude, this.longitude]),
        zoom: 3,
        minZoom: 3,
        maxZoom: 6
      })
    });

    this.map.on('singleclick', event => {
      this.markerSource.clear();
      var lonLat = ol.proj.toLonLat(event.coordinate);
      var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lonLat[0], lonLat[1]], 'EPSG:4326', 'EPSG:3857'))
      });
      this.markerSource.addFeature(iconFeature);
      this.mapClickEvent.emit(lonLat);
    });
    this.map.on('pointermove', function(e) {
      e.map.getTargetElement().style.cursor = this ? 'pointer' : '';
    });
  }

  cross() {
    this.showInfo = !this.showInfo;
    this.crossClickedEvent.emit(this.showInfo);
  }
}
