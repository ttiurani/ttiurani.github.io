import{S as C,i as q,s as U,a as j,e as d,c as z,b as w,d as h,f as P,g,h as E,j as W,o as F,k as G,l as H,m as J,n as D,p,q as K,r as M,u as Q,v as A,w as I,x as v,y as k,z as O,A as R,B as L}from"../chunks/index.7f717b3c.js";const X="modulepreload",Y=function(s,e){return new URL(s,e).href},T={},m=function(e,i,n){if(!i||i.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(i.map(_=>{if(_=Y(_,n),_ in T)return;T[_]=!0;const t=_.endsWith(".css"),l=t?'[rel="stylesheet"]':"";if(!!n)for(let a=r.length-1;a>=0;a--){const u=r[a];if(u.href===_&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${_}"]${l}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":X,t||(o.as="script",o.crossOrigin=""),o.href=_,document.head.appendChild(o),t)return new Promise((a,u)=>{o.addEventListener("load",a),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${_}`)))})})).then(()=>e())},ne={};function Z(s){let e,i,n;var r=s[1][0];function _(t){return{props:{data:t[3],form:t[2]}}}return r&&(e=v(r,_(s)),s[12](e)),{c(){e&&k(e.$$.fragment),i=d()},l(t){e&&O(e.$$.fragment,t),i=d()},m(t,l){e&&R(e,t,l),w(t,i,l),n=!0},p(t,l){const c={};if(l&8&&(c.data=t[3]),l&4&&(c.form=t[2]),r!==(r=t[1][0])){if(e){A();const o=e;h(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=v(r,_(t)),t[12](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,i.parentNode,i)):e=null}else r&&e.$set(c)},i(t){n||(e&&g(e.$$.fragment,t),n=!0)},o(t){e&&h(e.$$.fragment,t),n=!1},d(t){s[12](null),t&&E(i),e&&L(e,t)}}}function $(s){let e,i,n;var r=s[1][0];function _(t){return{props:{data:t[3],$$slots:{default:[x]},$$scope:{ctx:t}}}}return r&&(e=v(r,_(s)),s[11](e)),{c(){e&&k(e.$$.fragment),i=d()},l(t){e&&O(e.$$.fragment,t),i=d()},m(t,l){e&&R(e,t,l),w(t,i,l),n=!0},p(t,l){const c={};if(l&8&&(c.data=t[3]),l&8215&&(c.$$scope={dirty:l,ctx:t}),r!==(r=t[1][0])){if(e){A();const o=e;h(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=v(r,_(t)),t[11](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,i.parentNode,i)):e=null}else r&&e.$set(c)},i(t){n||(e&&g(e.$$.fragment,t),n=!0)},o(t){e&&h(e.$$.fragment,t),n=!1},d(t){s[11](null),t&&E(i),e&&L(e,t)}}}function x(s){let e,i,n;var r=s[1][1];function _(t){return{props:{data:t[4],form:t[2]}}}return r&&(e=v(r,_(s)),s[10](e)),{c(){e&&k(e.$$.fragment),i=d()},l(t){e&&O(e.$$.fragment,t),i=d()},m(t,l){e&&R(e,t,l),w(t,i,l),n=!0},p(t,l){const c={};if(l&16&&(c.data=t[4]),l&4&&(c.form=t[2]),r!==(r=t[1][1])){if(e){A();const o=e;h(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=v(r,_(t)),t[10](e),k(e.$$.fragment),g(e.$$.fragment,1),R(e,i.parentNode,i)):e=null}else r&&e.$set(c)},i(t){n||(e&&g(e.$$.fragment,t),n=!0)},o(t){e&&h(e.$$.fragment,t),n=!1},d(t){s[10](null),t&&E(i),e&&L(e,t)}}}function V(s){let e,i=s[6]&&y(s);return{c(){e=G("div"),i&&i.c(),this.h()},l(n){e=H(n,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=J(e);i&&i.l(r),r.forEach(E),this.h()},h(){D(e,"id","svelte-announcer"),D(e,"aria-live","assertive"),D(e,"aria-atomic","true"),p(e,"position","absolute"),p(e,"left","0"),p(e,"top","0"),p(e,"clip","rect(0 0 0 0)"),p(e,"clip-path","inset(50%)"),p(e,"overflow","hidden"),p(e,"white-space","nowrap"),p(e,"width","1px"),p(e,"height","1px")},m(n,r){w(n,e,r),i&&i.m(e,null)},p(n,r){n[6]?i?i.p(n,r):(i=y(n),i.c(),i.m(e,null)):i&&(i.d(1),i=null)},d(n){n&&E(e),i&&i.d()}}}function y(s){let e;return{c(){e=K(s[7])},l(i){e=M(i,s[7])},m(i,n){w(i,e,n)},p(i,n){n&128&&Q(e,i[7])},d(i){i&&E(e)}}}function ee(s){let e,i,n,r,_;const t=[$,Z],l=[];function c(a,u){return a[1][1]?0:1}e=c(s),i=l[e]=t[e](s);let o=s[5]&&V(s);return{c(){i.c(),n=j(),o&&o.c(),r=d()},l(a){i.l(a),n=z(a),o&&o.l(a),r=d()},m(a,u){l[e].m(a,u),w(a,n,u),o&&o.m(a,u),w(a,r,u),_=!0},p(a,[u]){let b=e;e=c(a),e===b?l[e].p(a,u):(A(),h(l[b],1,1,()=>{l[b]=null}),P(),i=l[e],i?i.p(a,u):(i=l[e]=t[e](a),i.c()),g(i,1),i.m(n.parentNode,n)),a[5]?o?o.p(a,u):(o=V(a),o.c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},i(a){_||(g(i),_=!0)},o(a){h(i),_=!1},d(a){l[e].d(a),a&&E(n),o&&o.d(a),a&&E(r)}}}function te(s,e,i){let{stores:n}=e,{page:r}=e,{constructors:_}=e,{components:t=[]}=e,{form:l}=e,{data_0:c=null}=e,{data_1:o=null}=e;W(n.page.notify);let a=!1,u=!1,b=null;F(()=>{const f=n.page.subscribe(()=>{a&&(i(6,u=!0),i(7,b=document.title||"untitled page"))});return i(5,a=!0),f});function N(f){I[f?"unshift":"push"](()=>{t[1]=f,i(0,t)})}function S(f){I[f?"unshift":"push"](()=>{t[0]=f,i(0,t)})}function B(f){I[f?"unshift":"push"](()=>{t[0]=f,i(0,t)})}return s.$$set=f=>{"stores"in f&&i(8,n=f.stores),"page"in f&&i(9,r=f.page),"constructors"in f&&i(1,_=f.constructors),"components"in f&&i(0,t=f.components),"form"in f&&i(2,l=f.form),"data_0"in f&&i(3,c=f.data_0),"data_1"in f&&i(4,o=f.data_1)},s.$$.update=()=>{s.$$.dirty&768&&n.page.set(r)},[t,_,l,c,o,a,u,b,n,r,N,S,B]}class re extends C{constructor(e){super(),q(this,e,te,ee,U,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const oe=[()=>m(()=>import("../chunks/0.b1df4ed1.js"),["../chunks/0.b1df4ed1.js","../chunks/_layout.da46b06b.js","./_layout.svelte.900dc207.js","../chunks/index.7f717b3c.js","../chunks/stores.568552a9.js","../chunks/singletons.d0dcf706.js","../assets/_layout.3ffac6ac.css"],import.meta.url),()=>m(()=>import("../chunks/1.2bc7d180.js"),["../chunks/1.2bc7d180.js","./error.svelte.e62fae0f.js","../chunks/index.7f717b3c.js","../chunks/stores.568552a9.js","../chunks/singletons.d0dcf706.js"],import.meta.url),()=>m(()=>import("../chunks/2.9b0541c8.js"),["../chunks/2.9b0541c8.js","./_page.svelte.c7b8b950.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../assets/_page.cac71847.css"],import.meta.url),()=>m(()=>import("../chunks/3.30a0230f.js"),["../chunks/3.30a0230f.js","../chunks/_page.4e75cfda.js","./blog-page.svelte.4982695e.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css"],import.meta.url),()=>m(()=>import("../chunks/4.468d9d0b.js"),["../chunks/4.468d9d0b.js","../chunks/_page.0f37f272.js","./blog-hear-consume-think-ravage-page.svelte.c4133021.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/5.abf9de0f.js"),["../chunks/5.abf9de0f.js","../chunks/_page.07269909.js","./blog-joneses-page.svelte.6c55827d.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/6.c7a45c17.js"),["../chunks/6.c7a45c17.js","../chunks/_page.02520a22.js","./blog-longtermism-page.svelte.b1d3bfdc.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/7.bc3b4f64.js"),["../chunks/7.bc3b4f64.js","../chunks/_page.0724a837.js","./blog-ministry-for-the-future-page.svelte.78b783d0.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/8.d6852713.js"),["../chunks/8.d6852713.js","../chunks/_page.2f8d31e9.js","./blog-one-year-after-page.svelte.821f322c.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/9.d4a135ad.js"),["../chunks/9.d4a135ad.js","../chunks/_page.2b020568.js","./blog-overproduction-page.svelte.37ba0c4a.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/10.a7452ca1.js"),["../chunks/10.a7452ca1.js","../chunks/_page.1ee529e7.js","./blog-preview-good-life-for-all-within-planetary-boundaries-page.svelte.f6f571fa.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/11.aba86328.js"),["../chunks/11.aba86328.js","../chunks/_page.067bbf52.js","./blog-preview-imperial-mode-of-living-page.svelte.fb4c8950.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/12.64f52eab.js"),["../chunks/12.64f52eab.js","../chunks/_page.99e6d527.js","./blog-site-setup-page.svelte.79368175.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css","../chunks/BlogPost.c1c7b324.js"],import.meta.url),()=>m(()=>import("../chunks/13.0eb38831.js"),["../chunks/13.0eb38831.js","./stats-page.svelte.6c4be464.js","../chunks/index.7f717b3c.js","../chunks/stores.568552a9.js","../chunks/singletons.d0dcf706.js","../assets/_page.1caa1c91.css"],import.meta.url),()=>m(()=>import("../chunks/14.b57ed58f.js"),["../chunks/14.b57ed58f.js","../chunks/_page.ee2ef05e.js","./work-page.svelte.b79cf8fe.js","../chunks/index.7f717b3c.js","../chunks/Content.4adadccf.js","../assets/Content.fae460e4.css"],import.meta.url)],se=[],le={"/":[2],"/blog":[3],"/blog/hear-consume-think-ravage":[4],"/blog/joneses":[5],"/blog/longtermism":[6],"/blog/ministry-for-the-future":[7],"/blog/one-year-after":[8],"/blog/overproduction":[9],"/blog/preview-good-life-for-all-within-planetary-boundaries":[10],"/blog/preview-imperial-mode-of-living":[11],"/blog/site-setup":[12],"/stats":[13],"/work":[14]},ae={handleError:({error:s})=>{console.error(s)}};export{le as dictionary,ae as hooks,ne as matchers,oe as nodes,re as root,se as server_loads};
