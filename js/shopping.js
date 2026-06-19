document.addEventListener(
"DOMContentLoaded",
initShopping
);



let shoppingFilter="all";






function initShopping()
{

document
.getElementById("shopping-filter")
?.addEventListener(
"change",
e =>
{

shoppingFilter =
e.target.value;


renderShopping();

});


renderShopping();

}







function renderShopping()
{

renderShoppingFilter();


const area =
document
.getElementById("shopping-list");



area.innerHTML="";



let items =
getItems()
.filter(
x=>!x.stock
);






if(
shoppingFilter!=="all"
)
{

items =
items.filter(
x =>
x.category===shoppingFilter
);

}






if(items.length===0)
{

area.innerHTML =
`
<div class="empty">

買い物はありません

</div>
`;

updateCount();

return;

}








items.forEach(
item =>
{

const div =
document.createElement("div");



div.className =
"item no-stock";



div.onclick =
() =>
{

item.stock=true;

updateItem(item);

renderShopping();

};





div.innerHTML =
`

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



updateCount();

}







function renderShoppingFilter()
{

const filter =
document
.getElementById("shopping-filter");



if(!filter)
return;



const categories =
getCategories();



filter.innerHTML =
`
<option value="all">

すべて

</option>
`;




categories.forEach(
c =>
{

filter.innerHTML +=
`
<option value="${c}">

${c}

</option>
`;

});



filter.value =
shoppingFilter;

}








function updateCount()
{

const count =
getItems()
.filter(
x=>!x.stock
)
.length;



document
.getElementById("shopping-count")
.textContent =
`買い物 ${count}件`;

}
