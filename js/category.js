document.addEventListener(
"DOMContentLoaded",
()=>{

setup();

renderCategories();

}

);






function setup()
{

document
.getElementById("add-category")
?.addEventListener(
"click",
addNewCategory
);

}









function addNewCategory()
{


const input =
document
.getElementById("new-category");



const name =
input.value.trim();



if(name==="")
{

alert(
"ジャンル名を入力してください"
);

return;

}




addCategory(name);



input.value="";



renderCategories();

}









function renderCategories()
{


const area =
document
.getElementById("category-list");



if(!area)
return;



area.innerHTML="";




const categories =
getCategories();





if(categories.length===0)
{

area.innerHTML=
`

<div class="empty">

ジャンルなし

</div>

`;

return;

}






categories.forEach(
category=>
{


const div =
document.createElement("div");



div.className =
"category-item";




div.innerHTML =
`

<span>

${category}

</span>


<button>

削除

</button>

`;






div
.querySelector("button")
.addEventListener(
"click",
()=>{

removeCategory(category);

});





area.appendChild(div);


});

}









function removeCategory(name)
{


if(
!confirm(
`${name}を削除しますか？`
)
)
return;



deleteCategory(name);



renderCategories();

}
