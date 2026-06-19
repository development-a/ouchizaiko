document.addEventListener(
"DOMContentLoaded",
init
);


let currentFilter="all";

let dragId=null;

let placeholder=null;




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


render();

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



if(!name)
return;



addItem(
{
name,
category,
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



if(!select||!filter)
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



filter.value=currentFilter;

}









function renderInventory()
{

const area =
document
.getElementById("inventory-list");



area.innerHTML="";



let items =
getItems();





if(currentFilter!=="all")
{

items =
items.filter(
x =>
x.category===currentFilter
);

}







items.forEach(
item =>
{


const wrap =
document.createElement("div");



wrap.className =
"item-wrapper";



wrap.draggable=true;



wrap.dataset.id =
item.id;





wrap.ondragstart =
() =>
{

dragId=item.id;

};





wrap.ondragover =
e =>
{

e.preventDefault();



showPlaceholder(
wrap
);

};





wrap.ondrop =
() =>
{

reorder(
dragId,
item.id
);



placeholder?.remove();


placeholder=null;



render();

};







const card =
document.createElement("div");



card.className =
item.stock
?
"item"
:
"item no-stock";






card.onclick =
() =>
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

`;



wrap.appendChild(card);


area.appendChild(wrap);



});

}








function showPlaceholder(target)
{

if(!placeholder)
{

placeholder =
document.createElement("div");


placeholder.className =
"drag-line";

}



target.before(
placeholder
);

}








function reorder(from,to)
{

const data =
getData();



const items =
data.items;



const fromIndex =
items.findIndex(
x =>
x.id===from
);



const toIndex =
items.findIndex(
x =>
x.id===to
);




if(
fromIndex===-1 ||
toIndex===-1
)
return;




const move =
items.splice(
fromIndex,
1
)[0];



items.splice(
toIndex,
0,
move
);



saveData(data);

}









function toggleStock(id)
{

const item =
getItems()
.find(
x =>
x.id===id
);



if(!item)
return;



item.stock =
!item.stock;



updateItem(item);



render();

}









function updateCount()
{

const items =
getItems();



document
.getElementById("total-items")
.textContent =
`登録 ${items.length}件`;



document
.getElementById("shopping-count")
.textContent =
`買い物 ${
items.filter(
x=>!x.stock
).length
}件`;

}
