document.addEventListener(
"DOMContentLoaded",
init
);


let currentFilter = "all";

let dragId = null;

let placeholder = null;




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

currentFilter =
this.value;


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
.value;



const category =
document
.getElementById("item-category")
.value;



if(name==="")
{
return;
}



addItem(
{
name:name,
category:category,
stock:true
}
);



document
.getElementById("item-name")
.value="";


render();

}









function renderSelect()
{

const categories =
getCategories();



const categorySelect =
document
.getElementById("item-category");



const filterSelect =
document
.getElementById("filter-category");



if(!categorySelect ||
!filterSelect)
{
return;
}



categorySelect.innerHTML="";

filterSelect.innerHTML =
`
<option value="all">

すべて

</option>
`;



categories.forEach(
category =>
{

categorySelect.innerHTML +=
`
<option value="${category}">

${category}

</option>
`;



filterSelect.innerHTML +=
`
<option value="${category}">

${category}

</option>
`;

});



filterSelect.value =
currentFilter;

}









function renderInventory()
{

const area =
document
.getElementById("inventory-list");



if(!area)
{
return;
}



area.innerHTML="";



let items =
getItems();





if(currentFilter !== "all")
{

items =
items.filter(
item =>
item.category === currentFilter
);

}






if(items.length===0)
{

area.innerHTML =
`
<div class="empty">

商品がありません

</div>
`;

return;

}







items.forEach(
item =>
{


const wrap =
document.createElement("div");



wrap.className =
"item-wrapper";





const card =
document.createElement("div");



card.className =
item.stock
?
"item"
:
"item no-stock";







card.onclick =
function()
{

toggleStock(
item.id
);

};







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




<button
class="delete-button">

×

</button>

`;






card
.querySelector(".delete-button")
.onclick =
function(e)
{

e.stopPropagation();



if(
confirm(
`${item.name}を削除しますか？`
)
)
{

deleteItem(
item.id
);


render();

}

};







wrap.appendChild(card);


area.appendChild(wrap);



});

}









function toggleStock(id)
{

const items =
getItems();



const item =
items.find(
x =>
x.id === id
);



if(!item)
{
return;
}



item.stock =
!item.stock;



updateItem(item);



render();

}









function updateCount()
{

const items =
getItems();



const total =
document
.getElementById("total-items");



if(total)
{

total.textContent =
`登録 ${items.length}件`;

}





const shopping =
document
.getElementById("shopping-count");



if(shopping)
{

shopping.textContent =
`買い物 ${
items.filter(
x=>!x.stock
).length
}件`;

}

}
