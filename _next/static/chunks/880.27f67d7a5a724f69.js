"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[880],{11880:function(t,e,s){s.d(e,{ring2:function(){return a}});class i extends HTMLElement{_propsToUpgrade={};shadow;template;defaultProps;isAttached=!1;constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.template=document.createElement("template")}storePropsToUpgrade(t){t.forEach(t=>{this.hasOwnProperty(t)&&void 0!==this[t]&&(this._propsToUpgrade[t]=this[t],delete this[t])})}upgradeStoredProps(){Object.entries(this._propsToUpgrade).forEach(([t,e])=>{this.setAttribute(t,e)})}reflect(t){t.forEach(t=>{Object.defineProperty(this,t,{set(e){"string,number".includes(typeof e)?this.setAttribute(t,e.toString()):this.removeAttribute(t)},get(){return this.getAttribute(t)}})})}applyDefaultProps(t){this.defaultProps=t,Object.entries(t).forEach(([t,e])=>{this[t]=this[t]||e.toString()})}}var r=":host{align-items:center;display:inline-flex;flex-shrink:0;height:var(--uib-size);justify-content:center;width:var(--uib-size)}:host([hidden]){display:none}.container{animation:rotate var(--uib-speed) linear infinite;height:var(--uib-size);overflow:visible;transform-origin:center;width:var(--uib-size);will-change:transform}.car{stroke:var(--uib-color);stroke-dasharray:var(--uib-dash),var(--uib-gap);stroke-dashoffset:0;stroke-linecap:round}.car,.track{fill:none;transition:stroke .5s ease}.track{stroke:var(--uib-color);opacity:var(--uib-bg-opacity)}@keyframes rotate{to{transform:rotate(1turn)}}";class o extends i{_attributes=["size","color","speed","stroke","stroke-length","bg-opacity"];size;color;speed;stroke;"stroke-length";"bg-opacity";static get observedAttributes(){return["size","color","stroke","stroke-length","speed","bg-opacity"]}constructor(){super(),this.storePropsToUpgrade(this._attributes),this.reflect(this._attributes)}connectedCallback(){this.upgradeStoredProps(),this.applyDefaultProps({size:40,color:"black",stroke:5,"stroke-length":.25,speed:.8,"bg-opacity":.1});let t=parseInt(this.size),e=parseInt(this.stroke),s=t/2,i=Math.max(0,t/2-e/2);this.template.innerHTML=`
      <svg
        class="container"
        viewBox="${s} ${s} ${this.size} ${this.size}"
        height="${this.size}"
        width="${this.size}"
      >
        <circle 
          class="track"
          cx="${this.size}" 
          cy="${this.size}" 
          r="${i}" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
        <circle 
          class="car"
          cx="${this.size}" 
          cy="${this.size}" 
          r="${i}" 
          pathlength="100" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
      </svg>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
          --uib-dash: ${100*parseFloat(this["stroke-length"])};
          --uib-gap: ${100-100*parseFloat(this["stroke-length"])};
          --uib-bg-opacity: ${this["bg-opacity"]};
        }
        ${r}
      </style>
    `,this.shadow.replaceChildren(this.template.content.cloneNode(!0))}attributeChangedCallback(){let t=this.shadow.querySelector("style"),e=this.shadow.querySelector("svg"),s=this.shadow.querySelectorAll("circle");if(!t)return;let i=parseInt(this.size),o=parseInt(this.stroke),a=i/2,h=String(Math.max(0,i/2-o/2));e.setAttribute("height",this.size),e.setAttribute("width",this.size),e.setAttribute("viewBox",`${a} ${a} ${this.size} ${this.size}`),s.forEach(t=>{t.setAttribute("cx",this.size),t.setAttribute("cy",this.size),t.setAttribute("r",h),t.setAttribute("stroke-width",this.stroke)}),t.innerHTML=`
      :host{
        --uib-size: ${this.size}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
        --uib-dash: ${100*parseFloat(this["stroke-length"])};
        --uib-gap: ${100-100*parseFloat(this["stroke-length"])};
        --uib-bg-opacity: ${this["bg-opacity"]};
      }
      ${r}
    `}}var a={register:(t="l-ring-2")=>{customElements.get(t)||customElements.define(t,class extends o{})},element:o}}}]);