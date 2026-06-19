let dragId = null;
let placeholder = null;



function renderInventory()
{

const area =
document.getElementById("inventory-list");


area.innerHTML="";



let items=getItems();



if(currentFilter!=="all")
{
items =
items.filter(
x=>x.category===currentFilter
);
}





items.forEach(
item=>
{


const card =
document.createElement("div");


card.className =
item.stock
?
"item"
:
"item no-stock";



card.draggable=true;

card.dataset.id=item.id;




card.innerHTML =
`

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



<button class="delete-button">
削除
</button>

`;





// 在庫切替

card.onclick=e=>
{

if(
e.target.classList.contains("delete-button")
)
return;


toggleStock(item.id);

};






// 削除

card
.querySelector(".delete-button")
.onclick=e=>
{

e.stopPropagation();


if(confirm(`${item.name}を削除しますか？`))
{

deleteItem(item.id);

render();

}

};







// ドラッグ開始

card.addEventListener(
"dragstart",
()=>
{

dragId=item.id;

createPlaceholder();

setTimeout(
()=>{
card.style.display="none";
},
0
);

});







card.addEventListener(
"dragend",
()=>
{

card.style.display="flex";

removePlaceholder();

});






card.addEventListener(
"dragover",
e=>
{

e.preventDefault();


const rect =
card.getBoundingClientRect();


const middle =
rect.top + rect.height / 2;



if(e.clientY < middle)
{

card.before(
placeholder
);

}
else
{

card.after(
placeholder
);

}

});





card.addEventListener(
"drop",
e=>
{

e.preventDefault();


const target =
placeholder.nextElementSibling
||
placeholder.previousElementSibling;



if(target)
{

moveItem(
dragId,
Number(
target.dataset.id
)
);

}



render();


});






area.appendChild(card);


});

}







function createPlaceholder()
{

if(placeholder)
return;


placeholder =
document.createElement("div");


placeholder.className =
"drag-placeholder";


placeholder.textContent =
"----------";

}





function removePlaceholder()
{

if(placeholder)
{

placeholder.remove();

placeholder=null;

}

}
