document.addEventListener(
"DOMContentLoaded",
init
);


let currentFilter="all";

let pressTimer=null;



function init()
{

document
.getElementById("add-button")
?.addEventListener(
"click",
addItemForm
);



document
.getElementById("filter-category")
?.addEventListener(
"change",
function()
{

currentFilter=this.value;

renderInventory();

});



render();

}





function render()
{

renderSelect();

renderInventory();

updateCount();

}







function addItemForm()
{

const name =
document
.getElementById("item-name")
.value.trim();



const category =
document
.getElementById("item-category")
.value;



if(name==="")
return;



addItem({

name:name,

category:category,

stock:true

});



document
.getElementById("item-name")
.value="";



render();

}








function renderSelect()
{


const categories =
getCategories();



const itemSelect =
document
.getElementById("item-category");



const filterSelect =
document
.getElementById("filter-category");



if(!itemSelect || !filterSelect)
return;



itemSelect.innerHTML="";


filterSelect.innerHTML=
`
<option value="all">
すべて
</option>
`;




categories.forEach(
c=>
{

itemSelect.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;



filterSelect.innerHTML+=
`
<option value="${c}">
${c}
</option>
`;

});



filterSelect.value=currentFilter;

}









function renderInventory()
{


const area =
document
.getElementById("inventory-list");



if(!area)
return;



area.innerHTML="";



let items=getItems();



if(currentFilter!=="all")
{

items =
items.filter(
i=>i.category===currentFilter
);

}



if(items.length===0)
{

area.innerHTML=
`
<div class="empty">

商品がありません

</div>
`;

return;

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




card.innerHTML=
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


`;







/*
クリック
在庫切替
*/

card.onclick=
()=>{

toggleStock(item.id);

};







/*
長押し
*/

card.addEventListener(
"mousedown",
()=>{

pressTimer =
setTimeout(
()=>{

showMenu(item);

},
700
);

});



card.addEventListener(
"mouseup",
()=>{

clearTimeout(pressTimer);

});



card.addEventListener(
"mouseleave",
()=>{

clearTimeout(pressTimer);

});






area.appendChild(card);


});

}





function showMenu(item)
{


const action =
prompt(
`${item.name}\n\n1:編集\n2:削除`
);



if(action==="1")
{

editItem(item);

}



if(action==="2")
{

deleteItem(item.id);

render();

}

}





function editItem(item)
{

const name =
prompt(
"商品名",
item.name
);



if(!name)
return;



item.name=name;



updateItem(item);


render();

}







function toggleStock(id)
{

const items=getItems();



const item =
items.find(
x=>x.id===id
);



if(!item)
return;



item.stock=!item.stock;



updateItem(item);



render();

}






function updateCount()
{


const items=getItems();



const total =
document
.getElementById("total-items");



if(total)
{

total.textContent=
`登録 ${items.length}件`;

}





const shopping =
document
.getElementById("shopping-count");



if(shopping)
{

const count =
items.filter(
x=>x.stock===false
).length;



shopping.textContent=
`買い物 ${count}件`;

}


}
