import{a as v,S as L,i as d}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();function m(i){return i.hits.map(({largeImageURL:t,webformatURL:r,tags:c,likes:e,views:s,comments:l,downloads:g})=>`<li>
  <a class="gallery-link" href="${t}">
    <img class="gallery-image" src="${r}" alt="${c}"/>
    <div class="text-div">
      <p>
        <b>Likes</b><br>${e}
      </p>
      <p>
        <b>Views</b><br>${s}
      </p>
      <p>
        <b>Comments</b><br>${l}
      </p>
      <p>
        <b>Downloads</b><br>${g}
      </p>
    </div>
  </a>
</li>
`).join("")}async function y(i,t){return(await v.get("https://pixabay.com/api/",{params:{key:"43920119-17be8655c7213217026175d69",q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"15",page:t}})).data}let f=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const p=document.querySelector(".search-image-form");let u=document.querySelector(".gallery");const a=document.querySelector(".loader"),o=document.querySelector(".show-more");let n=1,h=0;p.addEventListener("submit",b);o.addEventListener("click",w);async function b(i){i.preventDefault(),n=1,u.innerHTML="";const t=p.elements.input.value.trim();if(!t)return d.error({position:"topRight",message:"Search request must not be blank"});o.classList.add("visually-hidden"),a.classList.remove("visually-hidden");try{const r=await y(t,n);if(!r.total){d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a.classList.add("visually-hidden");return}if(h=Math.ceil(r.totalHits/15),u.innerHTML+=m(r),f.refresh(),a.classList.add("visually-hidden"),o.classList.remove("visually-hidden"),n===h){o.classList.add("visually-hidden"),a.classList.add("visually-hidden"),d.success({position:"topRight",message:"That's all results for this request."});return}}catch(r){console.log(`Error: ${r}`)}}async function w(){o.classList.add("visually-hidden"),a.classList.remove("visually-hidden"),n++;const i=p.elements.input.value.trim();try{const t=await y(i,n);if(u.innerHTML+=m(t),f.refresh(),n===h){o.classList.add("visually-hidden"),a.classList.add("visually-hidden"),d.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});return}a.classList.add("visually-hidden");const r=(u.firstChild.getBoundingClientRect().height+24)*2;window.scrollBy({top:r,behavior:"smooth"}),o.classList.remove("visually-hidden")}catch(t){console.log(`Error: ${t}`)}}
//# sourceMappingURL=commonHelpers.js.map
