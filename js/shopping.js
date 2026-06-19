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



if(!area)
return;



area.innerHTML="";






let items =
getItems()
.filter(
item =>
item.stock === false
);






if(shoppingFilter !== "all")
{

items =
items.filter(
item =>
item.category === shoppingFilter
);

}








if(items.length === 0)
{

area.innerHTML =
`

<div class="empty">

買うものはありません

</div>

`;



updateShoppingCount();


return;

}







items.forEach(
item =>
{


const card =
document.createElement("div");



card.className =
"item";





card.innerHTML =
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









/*
--------------------------------
タップ
購入済みに戻す
--------------------------------
*/


card.onclick =
() =>
{


item.stock = true;



updateItem(item);



renderShopping();



};







area.appendChild(card);


});





updateShoppingCount();


}









function renderShoppingFilter()
{


const filter =
document
.getElementById("shopping-filter");



if(!filter)
return;



filter.innerHTML =
`

<option value="all">

すべて

</option>

`;







getCategories()
.forEach(
category =>
{


filter.innerHTML +=

`

<option value="${category}">

${category}

</option>

`;

});





filter.value =
shoppingFilter;


}









function updateShoppingCount()
{


const count =
getItems()
.filter(
item =>
item.stock === false
)
.length;





const target =
document
.getElementById("shopping-count");



if(target)
{

target.textContent =

`買い物 ${count}件`;

}


}
