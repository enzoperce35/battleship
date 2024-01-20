(()=>{var t={424:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var r=n(81),i=n.n(r),s=n(645),o=n.n(s)()(i());o.push([t.id,"#container {\n  height: 100vh;\n  width: 100vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#main {\n  height: fit-content;\n  width: fit-content;\n  padding: 3rem;\n  border: 1px solid darkblue;\n  display: grid;\n  grid-template-columns: 3fr 2fr 3fr;\n}\n\n.boards {\n  width: fit-content;\n  height: fit-content;\n  border: 4px solid darkblue;\n  display: grid;\n  grid-template-columns: repeat(10, 3.2rem);\n  grid-template-rows: repeat(10, 3.2rem);\n}\n\n#game-display {\n  height: 100%;\n  width: 100%;\n}\n\n#game-title, #game-over {\n  font-size: 2vw;\n  text-align: center;\n}\n\n#game-over {\n  font-size: 1vw;\n  text-align: center;\n}\n\n.squares {\n  border: 1px solid darkblue;\n}\n\n.boards {\n  opacity: .70;\n}\n\n/* For Smaller screen sizes */\n\n@media screen and (max-width: 1300px) {\n  #main {\n    padding: unset;\n  }\n\n  #game-title {\n    font-size: 1em;\n  }\n\n  #game-over {\n    font-size: 0.5em;\n  }\n\n  .boards {\n    grid-template-columns: repeat(10, 1.5rem);\n    grid-template-rows: repeat(10, 1.5rem);\n  }\n}\n\n@media screen and (max-width: 650px) {\n  #main {\n    grid-template-columns: none;\n    grid-template-rows: 2fr 5fr;\n    border: unset;\n  }\n\n  .boards {\n    grid-template-columns: repeat(10, 1rem);\n    grid-template-rows: repeat(10, 1rem);\n  }\n\n  #p1-board {\n    margin-left: 2vw;\n  }\n\n  #p2-board {\n    margin-right: 2vw;\n  }\n\n  #game-display {\n    grid-row: 1/2;\n    grid-column: 1/3;\n  }\n}\n",""]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,i,s){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(o[c]=!0)}for(var u=0;u<t.length;u++){var d=[].concat(t[u]);r&&o[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),e.push(d))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},798:function(t,e,n){t=n.nmd(t),function(n,r){"use strict";var i={};n.PubSub?(i=n.PubSub,console.warn("PubSub already loaded, using existing version")):(n.PubSub=i,function(t){var e={},n=-1,r="*";function i(t,e,n){try{t(e,n)}catch(t){setTimeout(function(t){return function(){throw t}}(t),0)}}function s(t,e,n){t(e,n)}function o(t,n,r,o){var a,c=e[n],u=o?s:i;if(Object.prototype.hasOwnProperty.call(e,n))for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&u(c[a],t,r)}function a(t){var n=String(t);return Boolean(Object.prototype.hasOwnProperty.call(e,n)&&function(t){var e;for(e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!0;return!1}(e[n]))}function c(t,e,n,i){var s=function(t,e,n){return function(){var i=String(t),s=i.lastIndexOf(".");for(o(t,t,e,n);-1!==s;)s=(i=i.substr(0,s)).lastIndexOf("."),o(t,i,e,n);o(t,r,e,n)}}(t="symbol"==typeof t?t.toString():t,e,i);return!!function(t){for(var e=String(t),n=a(e)||a(r),i=e.lastIndexOf(".");!n&&-1!==i;)i=(e=e.substr(0,i)).lastIndexOf("."),n=a(e);return n}(t)&&(!0===n?s():setTimeout(s,0),!0)}t.publish=function(e,n){return c(e,n,!1,t.immediateExceptions)},t.publishSync=function(e,n){return c(e,n,!0,t.immediateExceptions)},t.subscribe=function(t,r){if("function"!=typeof r)return!1;t="symbol"==typeof t?t.toString():t,Object.prototype.hasOwnProperty.call(e,t)||(e[t]={});var i="uid_"+String(++n);return e[t][i]=r,i},t.subscribeAll=function(e){return t.subscribe(r,e)},t.subscribeOnce=function(e,n){var r=t.subscribe(e,(function(){t.unsubscribe(r),n.apply(this,arguments)}));return t},t.clearAllSubscriptions=function(){e={}},t.clearSubscriptions=function(t){var n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&0===n.indexOf(t)&&delete e[n]},t.countSubscriptions=function(t){var n,r,i=0;for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&0===n.indexOf(t)){for(r in e[n])i++;break}return i},t.getSubscriptions=function(t){var n,r=[];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&0===n.indexOf(t)&&r.push(n);return r},t.unsubscribe=function(n){var r,i,s,o="string"==typeof n&&(Object.prototype.hasOwnProperty.call(e,n)||function(t){var n;for(n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&0===n.indexOf(t))return!0;return!1}(n)),a=!o&&"string"==typeof n,c="function"==typeof n,u=!1;if(!o){for(r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(i=e[r],a&&i[n]){delete i[n],u=n;break}if(c)for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&i[s]===n&&(delete i[s],u=!0)}return u}t.clearSubscriptions(n)}}(i)),void 0!==t&&t.exports&&(e=t.exports=i),e.PubSub=i,t.exports=e=i}("object"==typeof window&&window||this)},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var s={},o=[],a=0;a<t.length;a++){var c=t[a],u=r.base?c[0]+r.base:c[0],d=s[u]||0,l="".concat(u," ").concat(d);s[u]=d+1;var p=n(l),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=i(h,r);r.byIndex=a,e.splice(a,0,{identifier:l,updater:f,references:1})}o.push(l)}return o}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var s=r(t=t||[],i=i||{});return function(t){t=t||[];for(var o=0;o<s.length;o++){var a=n(s[o]);e[a].references--}for(var c=r(t,i),u=0;u<s.length;u++){var d=n(s[u]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}s=c}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),n.nc=void 0,(()=>{"use strict";var t=n(798),e=n.n(t);function r(t){return t[Math.floor(Math.random()*t.length)]}function i(t,e,n){return t.find((t=>t.coordX===e&&t.coordY===n))}class s{constructor(t,e){var n;this.coordX=t,this.coordY=e,this.status="vacant",this.void=!1,this.id=(n=t,"ABCDEFGHIJ".split("")[n]+(e+1))}static{e().subscribe("turn_done",((t,e)=>e.avoid()))}occupy(t){this.status="occupied",this.occupant=t.id}reserve(){this.status="reserved"}reveal(){this.status="revealed"}hit(){this.status="hit"}missed(){this.status="missed"}avoid(){this.void=!0}hasOccupant(){return void 0!==this.occupant}isVacant(){return"vacant"===this.status}isRevealed(){return"revealed"===this.status}isReserved(){return"reserved"===this.status}wasHit(){return"hit"===this.status}wasMissed(){return"missed"===this.status}adjacentSquares(t){const e=this.coordX,n=this.coordY;return[i(t,e-1,n),i(t,e+1,n),i(t,e,n-1),i(t,e,n+1),i(t,e-1,n-1),i(t,e+1,n-1),i(t,e-1,n+1),i(t,e+1,n+1)]}}class o{constructor(t,e){this.id=`ship${e+1}`,this.shipLength=t,this.orientation=r(["vertical","horizontal"]),this.hits=0}addHit(){this.hits+=1}isSunk(){return this.shipLength===this.hits}positionHints(t){const e=[],n=t.getSquares("occupant",this.id).filter((t=>"hit"===t.status));return n.forEach((n=>{const r=n.adjacentSquares(t.getSquares());this.hits>1?"vertical"===this.orientation?e.push(r.slice(2,4)):e.push(r.slice(0,2)):e.push(r.splice(0,4))})),e.flat().filter((t=>void 0!==t&&!t.void&&!n.includes(t)))}findPosition(t){const e=function(t,e,n,r){let s="ascending";function o(t,n){return"ascending"===s?"X"===n?e.coordX+t:e.coordY+t:"X"===n?e.coordX-t:e.coordY-t}function a(n){const{coordX:r}=e,s=o(n,"Y");return i(t,r,s)}function c(n){const r=o(n,"X"),{coordY:s}=e;return i(t,r,s)}function u(){const t=[e];for(let e=1;e<r;e++)"horizontal"===n?t.push(c(e)):t.push(a(e));return t}return{ascend:function(){return s="ascending",u()},descend:function(){return s="descending",u()}}}(t,r(t),this.orientation,this.shipLength),n=e.ascend(),s=e.descend();return n.includes(void 0)?s.includes(void 0)?this.findPosition(t):s:n}}function a(t=!1){const e=function(){const t=(()=>{const t=[];for(let e=0;e<10;e++)for(let n=0;n<10;n++)t.push(new s(e,n));return t})(),e=(()=>{const t=[4,3,3,2,2,2,1,1,1,1];return t.forEach(((e,n)=>{t[n]=new o(e,n)})),t})();return{getShips:()=>e,collectHints:function(){const t=e.filter((t=>t.hits>0&&!t.isSunk())),n=[];return t.forEach((t=>{n.push(t.positionHints(this))})),n.flat()},getSquares:function(e=null,n=null){return null==e||null==n?t:t.filter((t=>t[e]===n))},positionShips:function(){e.forEach((e=>{const n=t.filter((t=>"vacant"===t.status));e.findPosition(n).forEach((t=>{const r=t.adjacentSquares(n).filter((t=>void 0!==t));t.occupy(e),r.forEach((t=>{t.isVacant()&&t.reserve()}))}))}))},receiveAttack:function(n,r){const s=i(t,n,r),o=e.find((t=>t.id===s.occupant)),a=s.adjacentSquares(t).filter((t=>void 0!==t&&!t.void));s.hasOccupant()?(o.addHit(),s.hit(),a.forEach((t=>t.reveal()))):s.missed(),PubSub.publish("turn_done",s)},allShipsSunk:function(){return 0===e.filter((t=>!t.isSunk())).length}}}();function n(){return!t}return e.positionShips(),{getIntel:()=>5,getBoard:()=>e,hasAI:n,attack:async function(t){const e=function(t){const e=t.getSquares("void",!1).filter((t=>"revealed"!=t.status)),n=t.getSquares("status","revealed");return{auto:function(i){const s=t.collectHints(),o=n.filter((t=>s.includes(t)));return n.length/e.length*100>i&&s.length>0?r(s):r(e.concat(o))},manual:function(){const e=document.getElementsByClassName("p2-squares active");return new Promise((n=>{for(let r=0;r<e.length;r++)e[r].addEventListener("click",(e=>{const r=t.getSquares().find((t=>t.id===e.target.id));n(r)}))}))}}}(t.getBoard()),i=await(()=>n()?e.auto(this.getIntel()):e.manual())();t.getBoard().receiveAttack(i.coordX,i.coordY)}}}function c(t="",e="",n="div"){const r=document.createElement(n);return""!==t&&(r.id=t),""!==e&&(r.className=e),r}const u=c("container"),d=c("main");u.append(d),document.body.appendChild(u);class l{gameBoard(t,e){const n=t.getBoard().getSquares(),r=c(`p${e}-board`,"boards");return n.forEach((t=>{const n=c(t.id,`p${e}-squares squares`,"span");var i;t.void||n.classList.add("active"),i=t,n.style.backgroundColor=i.wasHit()?"red":i.wasMissed()?"none":i.isRevealed()?"orange":"gray",r.appendChild(n)})),r}gameResult(t){const e=c("game-over"),n=(()=>{const t=c("GO-1","","h1");return t.innerHTML="Game Over",t})(),r=(()=>{const e=c("GO-2","","h1");return e.innerHTML=t.attacker.hasAI()?"CPU won":"You won!",e})();return e.append(n,r),e}statusBoard(){const t=c("game-display");return t.appendChild((()=>{const t=c("game-title","","h1");return t.innerHTML="BattleShip",t})()),t}}class p{constructor(t){this.game=t,this.main=document.getElementById("main"),this.view=document.getElementById("game-display"),this.display=new l}updateMain(){const[t,e]=this.game.players();!function(t){for(;t.firstChild;)t.removeChild(t.lastChild)}(this.main),this.main.appendChild(this.display.gameBoard(e,2)),this.main.appendChild(this.display.statusBoard()),this.main.appendChild(this.display.gameBoard(t,1))}highlightReceiver(){const t=(()=>this.game.receiver===this.game.player1?"p1-board":"p2-board")();document.getElementById(t).style.opacity=1}updateDisplay(){this.view.appendChild(this.display.gameResult(this.game))}}e().subscribe("new_turn",((t,e)=>{const n=new p(e);n.updateMain(),n.highlightReceiver()})),e().subscribe("game_over",((t,e)=>{new p(e).updateDisplay()}));var h=n(379),f=n.n(h),m=n(795),v=n.n(m),g=n(569),y=n.n(g),b=n(565),w=n.n(b),S=n(216),O=n.n(S),x=n(589),P=n.n(x),k=n(424),E={};E.styleTagTransform=P(),E.setAttributes=w(),E.insert=y().bind(null,"head"),E.domAPI=v(),E.insertStyleElement=O(),f()(k.Z,E),k.Z&&k.Z.locals&&k.Z.locals,new class{constructor(t,e){this.player1=t,this.player2=e,this.over=!1,this.attacker=this.player1,this.receiver=this.player2}players(){return[this.player1,this.player2]}switchTurn(t){const{attacker:e}=this,{receiver:n}=this;t.wasMissed()&&(this.attacker=n,this.receiver=e)}takeTurn(){e().publish("new_turn",this),setTimeout((()=>{this.attacker.attack(this.receiver)}),500),this.receiver.getBoard().allShipsSunk()&&(this.over=!0,e().publish("game_over",this))}async play(){const t=this;for(;!this.over;)await new Promise((n=>{t.takeTurn(),e().subscribe("turn_done",((t,e)=>n(e)))})).then((t=>this.switchTurn(t)))}}(a(!0),a()).play()})()})();