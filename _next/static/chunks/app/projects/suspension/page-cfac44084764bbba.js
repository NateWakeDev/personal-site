(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[381],{746:function(e,t,r){Promise.resolve().then(r.bind(r,3861))},3861:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(7437),c=r(2265),u=r(2896),i=r(7585),s=r(4673),l=r(1010),a=r(7776);function o(e){let{currentBump:t,isPaused:r}=e,{scene:i,animations:l}=(0,s.L)("../../models/SAE-Baja-Suspension-Wheel.glb"),o=(0,c.useRef)(),m=(0,c.useRef)(),p=(0,c.useRef)(1);return(0,c.useEffect)(()=>{l.length&&(o.current&&o.current.stopAllAction(),o.current=new a.AnimationMixer(i),m.current=o.current.clipAction(l[0]),console.log("Animation Duration:",m.current.getClip().duration),"Normal"===t?(m.current.time=1,m.current.setLoop(a.LoopRepeat,1/0),m.current.timeScale=1,m.current.play()):"SmallBounce"===t?(m.current.time=5,m.current.setLoop(a.LoopOnce,0),m.current.timeScale=2,m.current.play()):"SharpBumps"===t?(m.current.time=4,m.current.setLoop(a.LoopOnce,0),m.current.timeScale=8,m.current.play()):"Jump"===t&&(m.current.time=6,m.current.timeScale=1,p.current=1,m.current.play()))},[l,i,t]),(0,c.useEffect)(()=>{m.current&&(m.current.paused=r)},[r]),(0,u.F)((e,n)=>{if(o.current&&!r){let e=m.current.time;if("Normal"===t)e>=9&&(m.current.timeScale=-1),e<=1&&(m.current.timeScale=1);else if("SmallBounce"===t)e>=7&&(m.current.timeScale=-2),e<=5&&(m.current.timeScale=2);else if("SharpBumps"===t)e>=6&&(m.current.timeScale=-8),e<=4&&(m.current.timeScale=8);else if("Jump"===t)switch(p.current){case 1:e>=7&&(p.current=2,m.current.timeScale=-10);break;case 2:e<=2&&(p.current=3,m.current.timeScale=10);break;case 3:e>=6&&(p.current=1,m.current.timeScale=1)}o.current.update(n)}}),i.position.set(0,-5,0),i.scale.set(3,3,3),(0,n.jsx)("primitive",{object:i})}function m(){let[e,t]=(0,c.useState)("Normal"),[r,u]=(0,c.useState)(!1),s=e=>{t(e),u(!1)};return(0,n.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,n.jsx)("h1",{className:"text-4xl font-bold mb-4",children:"Suspension Simulation with Three.js"}),(0,n.jsx)("p",{className:"text-lg mb-8",children:"This project simulates the suspension system of a Baja car going over different types of bumps. Select a bump type below to start the simulation."}),(0,n.jsx)("div",{className:"w-full h-96",children:(0,n.jsxs)(i.Xz,{children:[(0,n.jsx)("ambientLight",{intensity:.75}),(0,n.jsx)("directionalLight",{position:[0,2,10],intensity:1}),(0,n.jsx)(o,{currentBump:e,isPaused:r}),(0,n.jsx)(l.z,{})]})}),(0,n.jsxs)("div",{className:"flex justify-center mt-4 space-x-4",children:[(0,n.jsx)("button",{onClick:()=>s("Normal"),className:"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700",children:"Normal"}),(0,n.jsx)("button",{onClick:()=>s("SmallBounce"),className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",children:"Slow RollingBounce"}),(0,n.jsx)("button",{onClick:()=>s("SharpBumps"),className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",children:"Washboard Road"}),(0,n.jsx)("button",{onClick:()=>s("Jump"),className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700",children:"Jump"}),(0,n.jsxs)("button",{onClick:()=>{u(e=>!e)},className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700",children:[r?"Resume":"Pause"," Animation"]})]})]})}}},function(e){e.O(0,[689,752,971,23,744],function(){return e(e.s=746)}),_N_E=e.O()}]);