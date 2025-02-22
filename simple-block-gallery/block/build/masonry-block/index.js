(()=>{"use strict";var e,l=[,()=>{const e=window.wp.blocks,l=window.wp.i18n,i=window.wp.components,a=window.wp.blockEditor,r=window.wp.element,n=window.ReactJSXRuntime,s=JSON.parse('{"UU":"simple-block-gallery/masonry-block"}');(0,e.registerBlockType)(s.UU,{edit:function({attributes:e,setAttributes:s}){const o=(0,a.useBlockProps)();function t(e){let l=[];for(let i in e)l.push(e[i].id);return l}function c(l){let i="\x3c!-- wp:paragraph --\x3e";i+='<style type="text/css">',i+=".simple-block-gallery-masonry { columns: auto "+e.width+"px; column-gap: 0; margin: 0 auto; padding: 0; }",i+="</style>",i+='<div class="simple-block-gallery-masonry">';for(let a in l)i+='<style type="text/css">',i+="div#masonry"+l[0].id+" { display: block; padding-right: "+e.padding+"px; padding-bottom: "+e.padding+"px; margin: 0; line-height: 0; }",i+="div#masonry"+l[0].id+" img { max-width: 100%; height: auto; display: block; border-radius: "+e.r_images+"px; }",i+="</style>",i+='<div id="masonry'+l[0].id+'">',i+='\x3c!-- wp:image {"lightbox":{"enabled":'+e.link+'},"id":'+l[a].id+',"sizeSlug":"large","linkDestination":"none"} --\x3e<figure class="wp-block-image size-large">',i+='<img src="'+l[a].url+'">',i+="</figure>\x3c!-- /wp:image --\x3e</div>";return i+="</div>",i+="\x3c!-- /wp:paragraph --\x3e",i}e.list_images=c(e.image);const{preview:g}=e;if(g)return(0,n.jsx)("div",{className:"simple-block-gallery-block-preview",children:(0,n.jsx)("img",{src:simple_block_gallery_preview_masonry.url,alt:"Preview"})});const p=[];return p.push((0,n.jsx)(a.MediaUploadCheck,{children:(0,n.jsx)(a.MediaUpload,{title:(0,l.__)("Masonry Block","simple-block-gallery"),onSelect:e=>{s({image:e,images_ids:t(e),list_images:c(e)})},allowedTypes:"image",gallery:!0,multiple:!0,value:e.images_ids,render:({open:a})=>(0,n.jsx)(i.Button,{variant:"secondary",onClick:a,children:e.images_ids?(0,l.__)("Update gallery","simple-block-gallery"):(0,l.__)("Create Gallery","simple-block-gallery")})})})),(0,n.jsxs)("div",{...o,children:[(0,n.jsx)(r.RawHTML,{children:e.list_images}),p,(0,n.jsx)(a.InspectorControls,{children:(0,n.jsxs)(i.PanelBody,{title:(0,l.__)("Settings","simple-block-gallery"),initialOpen:!0,children:[p,(0,n.jsx)("hr",{}),(0,n.jsx)(i.RangeControl,{__nextHasNoMarginBottom:!0,label:(0,l.__)("Width","simple-block-gallery"),max:1e3,min:10,value:e.width,onChange:e=>s({width:e})}),(0,n.jsx)(i.RangeControl,{__nextHasNoMarginBottom:!0,label:(0,l.__)("Space","simple-block-gallery"),max:20,min:0,value:e.padding,onChange:e=>s({padding:e})}),(0,n.jsx)(i.RangeControl,{__nextHasNoMarginBottom:!0,label:(0,l.__)("Rounded Images","simple-block-gallery"),max:20,min:0,value:e.r_images,onChange:e=>s({r_images:e})}),(0,n.jsx)(i.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,l.__)("Expand on click","simple-block-gallery"),help:(0,l.__)("Scales the image with a lightbox effect","simple-block-gallery"),checked:e.link,onChange:e=>s({link:e})})]})})]})},save:function({attributes:e}){const l=a.useBlockProps.save();return(0,n.jsx)(r.Fragment,{...l,children:e.list_images&&(0,n.jsx)(r.RawHTML,{children:e.list_images})})}})}],i={};function a(e){var r=i[e];if(void 0!==r)return r.exports;var n=i[e]={exports:{}};return l[e](n,n.exports,a),n.exports}a.m=l,e=[],a.O=(l,i,r,n)=>{if(!i){var s=1/0;for(g=0;g<e.length;g++){i=e[g][0],r=e[g][1],n=e[g][2];for(var o=!0,t=0;t<i.length;t++)(!1&n||s>=n)&&Object.keys(a.O).every((e=>a.O[e](i[t])))?i.splice(t--,1):(o=!1,n<s&&(s=n));if(o){e.splice(g--,1);var c=r();void 0!==c&&(l=c)}}return l}n=n||0;for(var g=e.length;g>0&&e[g-1][2]>n;g--)e[g]=e[g-1];e[g]=[i,r,n]},a.o=(e,l)=>Object.prototype.hasOwnProperty.call(e,l),(()=>{var e={169:0,181:0};a.O.j=l=>0===e[l];var l=(l,i)=>{var r,n,s=i[0],o=i[1],t=i[2],c=0;if(s.some((l=>0!==e[l]))){for(r in o)a.o(o,r)&&(a.m[r]=o[r]);if(t)var g=t(a)}for(l&&l(i);c<s.length;c++)n=s[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(g)},i=self.webpackChunksimple_block_gallery=self.webpackChunksimple_block_gallery||[];i.forEach(l.bind(null,0)),i.push=l.bind(null,i.push.bind(i))})();var r=a.O(void 0,[181],(()=>a(1)));r=a.O(r)})();