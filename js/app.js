const div =
document.createElement("div");



div.className =
"item-wrapper";




div.innerHTML =
`

<div class="swipe-delete">

×
</div>


<div class="item ${item.stock ? "" : "no-stock"}">


<div class="watermark">

${item.stock ? "" : "在庫なし"}

</div>



<div class="item-info">


<span class="item-name">

${item.name}

</span>


<span class="item-category">

${item.category}

</span>


</div>



</div>

`;





const card =
div.querySelector(".item");



let startX=0;



card.addEventListener(
"touchstart",
e =>
{

startX =
e.touches[0].clientX;

});




card.addEventListener(
"touchend",
e =>
{

let endX =
e.changedTouches[0].clientX;



if(startX-endX > 50)
{

card.classList.add(
"swiped"
);

}


if(endX-startX > 50)
{

card.classList.remove(
"swiped"
);

}

});






div.querySelector(
".swipe-delete"
)
.onclick =
() =>
{

if(confirm("削除しますか？"))
{

deleteItem(item.id);

render();

}

};







card.onclick =
() =>
{

if(
card.classList.contains("swiped")
)
{

card.classList.remove(
"swiped"
);

return;

}



toggleStock(item.id);

};








let timer;



card.addEventListener(
"mousedown",
() =>
{

timer =
setTimeout(
() =>
openMenu(item.id),
700
);

});



card.addEventListener(
"mouseup",
() =>
clearTimeout(timer)
);





area.appendChild(div);
