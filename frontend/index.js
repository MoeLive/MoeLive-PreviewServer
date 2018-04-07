// require('es5-shim'); 
// require('es5-shim/es5-sham');
// require('console-polyfill');
import flvjs from 'flv.js';
import css from 'materialize-css/dist/css/materialize.css';

var urldomain = document.domain;
var livepath = location.pathname.split("/");

var roomid ;
if(livepath.length == 2){
  roomid = "stream";
}else{
  roomid = livepath[2];
}
var videoViewWidth = document.body.clientWidth*0.6;
var videoViewHeight = videoViewWidth*3/4;
var videoTemplate = `<center><video width="`+videoViewWidth+`" height="`+videoViewHeight+`"controls="controls"poster="/img/black.jpg" id="videoElement"></video></center>`

var defautTemplate = `<nav style="background-color: #5b32b4 !important;" role="navigation">
  <div class="nav-wrapper container">
    <a id="logo-container" href="/" class="brand-logo">萌直播</a>
    <ul class="right hide-on-med-and-down">
      <li><a href="/#download">立即下载</a></li>
    </ul>
  </div>
</nav>


<div class="container">
<div class="section">

<div class="row">
    <div class="col s12 m12">
      <div class="card">
      <br/>
        `+ videoTemplate +`
        <br/>
      </div>
    </div>
  </div>

</div>
<br><br>
</div>


`

document.getElementById("app").innerHTML = defautTemplate;

if (flvjs.isSupported()) {
  var videoElement = document.getElementById('videoElement');
  var flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: 'http://'+urldomain+':8000/live/'+roomid+'.flv'
  });
  flvPlayer.attachMediaElement(videoElement);
  flvPlayer.load();
  flvPlayer.play();
}


// export { $,materialize };