document.addEventListener(
"DOMContentLoaded",
init
);



let currentFilter="all";





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
e =>
{

currentFilter =
e.target.value;


renderInventory();

}
);



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



if(!name)
return;



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



const select =
document
.getElementById("item-category");



const filter =
document
.getElementById("filter-category");



if(!select || !filter)
return;




select.innerHTML="";

filter.innerHTML =
`
<option value="all">
すべて
</option>
`;



categories.forEach(
category =>
{

select.innerHTML +=
`
<option value="${category}">
${category}
</option>
`;



filter.innerHTML +=
`
<option value="${category}">
${category}
</option>
`;

});



filter.value =
currentFilter;

}








function renderInventory()
{

const area =
document
.getElementById("inventory-list");



if(!area)
return;



area.innerHTML="";



let items =
getItems();





if(
currentFilter !== "all"
)
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

商品なし

</div>
`;

return;

}








items.forEach(
item =>
{

const div =
document.createElement("div");



div.className =
item.stock
?
"item"
:
"item no-stock";





div.onclick =
() =>
{

toggleStock(
item.id
);

};







div.innerHTML =
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



area.appendChild(div);



});

}









function toggleStock(id)
{

const items =
getItems();



const item =
items.find(
x =>
x.id===id
);



if(!item)
return;



item.stock =
!item.stock;



updateItem(item);



renderInventory();


updateCount();

}








function updateCount()
{

const items =
getItems();




document
.getElementById("total-items")
.textContent =
`登録 ${items.length}件`;




const count =
items.filter(
x =>
!x.stock
).length;




document
.getElementById("shopping-count")
.textContent =
`買い物 ${count}件`;

}
