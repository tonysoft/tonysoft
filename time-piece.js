import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `workout-timer`
 * An Analog Clock which tracks workout progress
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TimePiece extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --optional-display-scale: translate(0px,0px) scale(.50,.07);
        }
        .relatively {
          position: relative;
        }
        .absolutely {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
        }
        .optionalDisplay {
          z-index: 25;
          top: 65%;
          left: 25%;
          width: 50%;
          height: 7%;
        }
        .digitalDisplay {
          border: 1px solid #00000088;
          background-color: #ffffffcc;
          z-index: 35;
          top: 15%;
          left: 37%;
          width: 26%;
          height: 5%;
          text-align: center;
        }
        .face {
          z-index: 20;
        }
        .hands {
          z-index: 30;
          pointer-events: none;
        }
        .crystal {
          z-index: 40;
          pointer-events: none;
        }
        .action {
          cursor: pointer;
        }
        .noSelect {
          user-select: none;
        }
      </style>
      <div class="relatively action noSelect " style="height:[[height]]; width:[[width]];" on-click="clickOnTimePiece">
        <span class="absolutely face ">
          <span class="svg face">
<svg xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 91 91" version="1.1" id="svg6910" sodipodi:docname="clock.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
  <metadata id="metadata6916">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <dc:title/>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs id="defs6914">
    <linearGradient inkscape:collect="always" id="linearGradient14510">
      <stop style="stop-color:#907d6a;stop-opacity:0.35532996" offset="0" id="stop14506"/>
      <stop style="stop-color:#be7226;stop-opacity:0.02030457" offset="1" id="stop14508"/>
    </linearGradient>
    <linearGradient id="white" osb:paint="solid">
      <stop style="stop-color:#f1f1f1;stop-opacity:1;" offset="0" id="stop7461"/>
    </linearGradient>
    <radialGradient inkscape:collect="always" xlink:href="#linearGradient14510" id="radialGradient14512" cx="-47.334522" cy="87.668587" fx="-47.334522" fy="87.668587" r="42.629696" gradientTransform="matrix(1,0,0,0.99006033,97.334523,-36.538818)" gradientUnits="userSpaceOnUse"/>
  </defs>
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1407" inkscape:window-height="919" id="namedview6912" showgrid="false" inkscape:zoom="3.337544" inkscape:cx="44.26835" inkscape:cy="46.74707" inkscape:window-x="251" inkscape:window-y="92" inkscape:window-maximized="0" inkscape:current-layer="Clock" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0"/>
  <g id="Clock" inkscape:label="" transform="translate(-4.5,-4.7583694)">
    <desc id="title8715">Clock</desc>
    <g id="g10078" inkscape:label="">
      <desc id="desc10080">Face</desc>
      <g id="Face" inkscape:label="#g8297">
        <desc id="title8301">Face</desc>
        <circle r="45" style="fill:#f0f0f0;fill-opacity:1" cy="50.258369" cx="50" id="Background">
          <desc id="title7483">Background</desc>
        </circle>
        <g transform="translate(88.250212,1.750104)" id="g8219">
          <g id="Ticks" transform="translate(16.62267,16.940467)">
            <desc id="title8421">Ticks</desc>
            <line inkscape:label="" id="sec-6-61" x1="-54.872887" y1="76.533897" x2="-54.872887" y2="-13.398302" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-0-2" x1="-77.355934" y1="70.509583" x2="-32.389835" y2="-7.3739886" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-5-3" x1="-93.814667" y1="54.050842" x2="-15.931099" y2="9.0847464" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-0-1-7" x1="-99.838982" y1="31.567797" x2="-9.9067822" y2="31.567797" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-5-7-7" x1="-93.814667" y1="9.0847445" x2="-15.9311" y2="54.050842" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-0-1-1-7" x1="-77.355934" y1="-7.3739867" x2="-32.389835" y2="70.509583" style="fill:#000000;fill-opacity:0.16161619;stroke:#000000;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
          </g>
          <g id="g8185" transform="translate(16.622669,16.940467)">
            <line inkscape:label="" id="sec-6-6-65" x1="-73.162239" y1="72.64637" x2="-36.583527" y2="-9.5107803" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-2" x1="-68.768173" y1="74.333099" x2="-40.977596" y2="-11.197506" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-8" x1="-64.221863" y1="75.551277" x2="-45.523907" y2="-12.415684" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-9" x1="-59.573124" y1="76.287567" x2="-50.172649" y2="-13.151972" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-6-4-6" x1="-91.251221" y1="57.998203" x2="-18.494545" y2="5.1373835" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-3-9" x1="-88.289207" y1="61.655987" x2="-21.45656" y2="1.479601" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-4-47" x1="-84.961075" y1="64.984116" x2="-24.784691" y2="-1.8485268" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-2-2" x1="-81.303291" y1="67.946136" x2="-28.442474" y2="-4.8105416" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-6-6-65" x1="-99.592644" y1="36.268032" x2="-10.153111" y2="26.867559" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-34-5" x1="-98.856361" y1="40.916775" x2="-10.8894" y2="22.218819" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-3-1" x1="-97.638184" y1="45.463081" x2="-12.107582" y2="17.672508" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-6-0" x1="-95.951454" y1="49.857155" x2="-13.794309" y2="13.278436" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-6-4-5-2" x1="-95.951454" y1="13.27844" x2="-13.794304" y2="49.857155" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-3-6-5" x1="-97.638184" y1="17.67251" x2="-12.107578" y2="45.463081" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-4-4-8" x1="-98.856361" y1="22.218821" x2="-10.8894" y2="40.916771" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-2-1-8" x1="-99.592651" y1="26.867559" x2="-10.153113" y2="36.268032" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-6-6-6-2" x1="-81.303291" y1="-4.8105383" x2="-28.442472" y2="67.946136" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-34-4-2" x1="-84.961075" y1="-1.8485273" x2="-24.784689" y2="64.984123" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-3-6-1" x1="-88.289207" y1="1.4796039" x2="-21.456562" y2="61.655987" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-6-2-2" x1="-91.251221" y1="5.1373854" x2="-18.494547" y2="57.998203" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-6-4-5-4-3" x1="-59.573124" y1="-13.151967" x2="-50.172646" y2="76.287567" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-67-3-6-4-3" x1="-64.221863" y1="-12.415683" x2="-45.523907" y2="75.551277" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-8-4-4-5-3" x1="-68.768173" y1="-11.1975" x2="-40.977596" y2="74.333099" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            <line inkscape:label="" id="sec-6-3-2-1-3-1" x1="-73.162247" y1="-9.5107775" x2="-36.583527" y2="72.64637" style="fill:#000000;fill-opacity:0.16161619;stroke:#c8c8c8;stroke-width:0.9918552;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
          </g>
        </g>
        <ellipse inkscape:label="" ry="41.739971" rx="42.163696" style="fill:#ebe5df;fill-opacity:1;stroke:#000000;stroke-width:0.93199998;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.0408163" cy="50.258369" cx="50" id="Inner">
          <desc id="title7483-8">Inner</desc>
        </ellipse>
        <circle r="45" style="fill:none;fill-opacity:1;stroke:#000000;stroke-opacity:1" cy="50.258369" cx="50" id="Outer">
          <desc id="title8458">Outer</desc>
        </circle>
      </g>
      <text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:5.33333349px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:0.15816327;stroke:none" x="39.063801" y="34.016949" id="text8609"><tspan y="34.016949" x="39.063801" id="tspan8717" sodipodi:role="line">tonysoft...</tspan></text>
    </g>
    <ellipse id="Inner-7" cx="50" cy="50.258369" style="fill:#282119;fill-opacity:0.55612242;stroke:#000000;stroke-width:0.05011619;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.0408163" rx="2.2672572" ry="2.2444723" inkscape:label="">
      <desc id="title7483-8-6">Inner</desc>
    </ellipse>
    
    
  </g>
</svg>
</span>
        </span>
        <div class="absolutely centered optionalDisplay" title="Status">
          <slot name="optionalDisplay"></slot>
        </div>
        <div id="digitalDisplay" style="display: none;"class="absolutely centered digitalDisplay">
          <slot name="digitalDisplay"></slot>
        </div>
        <span class="absolutely hands ">
          <span class="svg hands">
<svg xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 91 91" version="1.1" id="svg6910" sodipodi:docname="clock.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
  <metadata id="metadata6916">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <dc:title/>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs id="defs6914">
    <linearGradient inkscape:collect="always" id="linearGradient14510">
      <stop style="stop-color:#907d6a;stop-opacity:0.35532996" offset="0" id="stop14506"/>
      <stop style="stop-color:#be7226;stop-opacity:0.02030457" offset="1" id="stop14508"/>
    </linearGradient>
    <linearGradient id="white" osb:paint="solid">
      <stop style="stop-color:#f1f1f1;stop-opacity:1;" offset="0" id="stop7461"/>
    </linearGradient>
    <radialGradient inkscape:collect="always" xlink:href="#linearGradient14510" id="radialGradient14512" cx="-47.334522" cy="87.668587" fx="-47.334522" fy="87.668587" r="42.629696" gradientTransform="matrix(1,0,0,0.99006033,97.334523,-36.538818)" gradientUnits="userSpaceOnUse"/>
  </defs>
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1407" inkscape:window-height="919" id="namedview6912" showgrid="false" inkscape:zoom="3.337544" inkscape:cx="44.26835" inkscape:cy="46.74707" inkscape:window-x="251" inkscape:window-y="92" inkscape:window-maximized="0" inkscape:current-layer="Clock" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0"/>
  <g id="Clock" inkscape:label="" transform="translate(-4.5,-4.7583694)">
    <desc id="title8715">Clock</desc>
    
    <ellipse id="Inner-7" cx="50" cy="50.258369" style="fill:#282119;fill-opacity:0.55612242;stroke:#000000;stroke-width:0.05011619;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.0408163" rx="2.2672572" ry="2.2444723" inkscape:label="">
      <desc id="title7483-8-6">Inner</desc>
    </ellipse>
    <g id="Hands" inkscape:label="">
      <desc id="desc9869">Hands</desc>
      <g id="g9858">
        <line style="fill:#b95f46;fill-opacity:0.39215686;stroke:#4d212a;stroke-width:2.27399993;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.58163267" y2="25.318485" x2="50" y1="50.096558" x1="50" id="HourHand" inkscape:label="">
          <desc id="title7481-5-0-7">HourHand</desc>
        </line>
        <line style="fill:#b95f46;fill-opacity:0.39215686;stroke:#4d212a;stroke-width:1.40600002;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.58163267" y2="14.936478" x2="50" y1="50.536739" x1="50" id="MinuteHand" inkscape:label="">
          <desc id="title7481-5-0">MinuteHand</desc>
        </line>
        <line style="fill:#b95f46;fill-opacity:0.39215686;stroke:#630b1d;stroke-width:0.84055203;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.58163267" y2="12.433653" x2="50" y1="50.82349" x1="50" id="SecondHand" inkscape:label="">
          <desc id="title7481-5">SecondHand</desc>
        </line>
      </g>
    </g>
    
  </g>
</svg>
</span>
        </span>
        <span class="absolutely crystal ">
          <span class="svg crystal">
<svg xmlns:osb="http://www.openswatchbook.org/uri/2009/osb" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 91 91" version="1.1" id="svg6910" sodipodi:docname="clock.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
  <metadata id="metadata6916">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <dc:title/>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs id="defs6914">
    <linearGradient inkscape:collect="always" id="linearGradient14510">
      <stop style="stop-color:#907d6a;stop-opacity:0.35532996" offset="0" id="stop14506"/>
      <stop style="stop-color:#be7226;stop-opacity:0.02030457" offset="1" id="stop14508"/>
    </linearGradient>
    <linearGradient id="white" osb:paint="solid">
      <stop style="stop-color:#f1f1f1;stop-opacity:1;" offset="0" id="stop7461"/>
    </linearGradient>
    <radialGradient inkscape:collect="always" xlink:href="#linearGradient14510" id="radialGradient14512" cx="-47.334522" cy="87.668587" fx="-47.334522" fy="87.668587" r="42.629696" gradientTransform="matrix(1,0,0,0.99006033,97.334523,-36.538818)" gradientUnits="userSpaceOnUse"/>
  </defs>
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1407" inkscape:window-height="919" id="namedview6912" showgrid="false" inkscape:zoom="3.337544" inkscape:cx="44.26835" inkscape:cy="46.74707" inkscape:window-x="251" inkscape:window-y="92" inkscape:window-maximized="0" inkscape:current-layer="Clock" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0"/>
  <g id="Clock" inkscape:label="" transform="translate(-4.5,-4.7583694)">
    <desc id="title8715">Clock</desc>
    
    <ellipse id="Inner-7" cx="50" cy="50.258369" style="fill:#282119;fill-opacity:0.55612242;stroke:#000000;stroke-width:0.05011619;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.0408163" rx="2.2672572" ry="2.2444723" inkscape:label="">
      <desc id="title7483-8-6">Inner</desc>
    </ellipse>
    
    <ellipse inkscape:label="" ry="41.739971" rx="42.163696" style="fill:url(#radialGradient14512);fill-opacity:1;stroke:#000000;stroke-width:0.93199998;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.0408163" cy="50.258369" cx="50" id="Crystal">
      <desc id="title7483-8-4" style="fill:url(#radialGradient14512);fill-opacity:1">Crystal</desc>
    </ellipse>
  </g>
</svg>
</span>
        </span>
      </div>
    `;
  }
  static get properties() {
    return {
      width: {
        type: String
      },
      height: {
        type: String
      },
      standardSize: {
        type: String
      },
      size: {
        type: String,
        observer: '_sizeChanged'
      },
      optionalDisplayScale: {
        type: Number
      },
      passClicks: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        observer: '_passClicksChanged'
      },
      clockMode: {
        type: Boolean,
        observer: '_clockModeChanged'
      },
      elapsedTime: {
        type: Number,
        observer: '_elapsedTimeChanged'
      },
      clockTimer: {
        type: Number
      },
      clockSeconds: {
        type: Number
      },
      clockMinutes: {
        type: Number
      },
      clockHours: {
        type: Number
      }
    };
  }
  constructor() {
    super();
    this.reset();
    this.optionalDisplayScale = 1.0;
    this.clockMode = false;
    this.clockSeconds = 0;
    this.clockMinutes = 0;
    this.clockHours = 0; 
    this.passClicks = false; 
  }
  reset() {
    this.elapsedTime = 0;
    var digitalDisplay = this.querySelector("digital-time-piece");
    if (digitalDisplay) {
      digitalDisplay.reset();
    }
  }
  start() {
    var context = this;
    if (!context.clockTimer) {
      context.clockTimer = setInterval(function() {
        context.elapsedTime += 1000;
      }, 1000);
      var digitalDisplay = this.querySelector("digital-time-piece");
      if (digitalDisplay) {
        var digitalDisplaySlot = this.shadowRoot.querySelector("#digitalDisplay");
        digitalDisplaySlot.style.display = "block";
        // digitalDisplay.start();
      }
    }
  }
  pause() {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = 0;
      // var digitalDisplay = this.querySelector("digital-time-piece");
      // if (digitalDisplay) {
      //   digitalDisplay.pause();
      // }
    }
  }
  _elapsedTimeChanged() {
      var context = this;
      if (context.clockTimer) {
        var d = null;
        if (!context.clockMode) {
          d = new Date(context.elapsedTime);
          context.clockSeconds = d.getSeconds()
          context.clockMinutes = d.getMinutes()
          context.clockHours = d.getHours() - 16;
        } else {
          d = new Date();
          context.clockSeconds = d.getSeconds()
          context.clockMinutes = d.getMinutes()
          context.clockHours = d.getHours()%12;
        }
        context.rotateSecondHand(context.clockSeconds);
        context.rotateMinuteHand(context.clockMinutes, context.clockSeconds);
        context.rotateHourHand(context.clockHours, context.clockMinutes, context.clockSeconds);
        var digitalDisplay = this.querySelector("digital-time-piece");
        if (digitalDisplay) {
          digitalDisplay.clockSeconds = context.clockSeconds;
          digitalDisplay.clockMinutes = context.clockMinutes;
          digitalDisplay.clockHours = context.clockMode ? d.getHours() : context.clockHours;
        }
        context.dispatchEvent(new CustomEvent('update', { detail: { rawDate: d, hours: d.getHours(), minutes: context.clockMinutes, seconds: context.clockSeconds }}));
      }
  }
  _clockModeChanged(newValue, oldValue) {
      var digitalDisplay = this.querySelector("digital-time-piece");
      if (digitalDisplay) {
        digitalDisplay.clockMode = newValue;
      }
  }
  rotateSecondHand(clockSeconds) {
    var Hand = this.shadowRoot.querySelector("#SecondHand");
    if (Hand) {
      var deg = 6 * clockSeconds;
      Hand.setAttribute('transform', 'rotate('+ deg +' 50 50)');
    }
  }
  rotateMinuteHand(clockMinutes, clockSeconds) {
    var Hand = this.shadowRoot.querySelector("#MinuteHand");
    if (Hand) {
      var deg = (6 * clockMinutes) + (6 * clockSeconds / 60);
      Hand.setAttribute('transform', 'rotate('+ deg +' 50 50)');
    }
  }
  rotateHourHand(clockHours, clockMinutes) {
    var Hand = this.shadowRoot.querySelector("#HourHand");
    if (Hand) {
      var deg = (30 * (clockHours % 12)) + (clockMinutes / 2);
      Hand.setAttribute('transform', 'rotate('+ deg +' 50 50)');
    }
  }
  _sizeChanged(newValue, oldValue) {
    this.width = newValue + "px";
    this.height = newValue + "px";
    // this.updateStyles({'--optional-display-scale': "scale(" + (newValue / this.standardSize) + ")"});
  }
  _passClicksChanged(newValue) {
    console.log(newValue);
  }
  clickOnTimePiece(e) {
    if (!this.passClicks) {
      e.stopPropagation();
    }
  }
}

window.customElements.define('time-piece', TimePiece);
