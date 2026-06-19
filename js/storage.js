const STORAGE_KEY =
"homeInventoryManager";




const DEFAULT_CATEGORIES =
[
"食品",
"飲料",
"日用品",
"その他"
];





function getData()
{


const data =
localStorage.getItem(
STORAGE_KEY
);



if(!data)
{

return {

items:[],

categories:
[
...DEFAULT_CATEGORIES
]

};

}



try
{

return JSON.parse(data);

}

catch(e)
{

return {

items:[],

categories:
[
...DEFAULT_CATEGORIES
]

};

}


}







function saveData(data)
{

localStorage.setItem(

STORAGE_KEY,

JSON.stringify(data)

);

}







function getItems()
{

return getData().items;

}







function addItem(item)
{


const data =
getData();




item.id =
Date.now()
+
Math.floor(
Math.random()*1000
);



item.stock=true;



data.items.push(item);



saveData(data);

}







function updateItem(item)
{


const data =
getData();



const index =
data.items.findIndex(
x =>
x.id === item.id
);



if(index !== -1)
{

data.items[index]=item;

}



saveData(data);

}







function deleteItem(id)
{


const data =
getData();



data.items =
data.items.filter(
x =>
x.id !== id
);



saveData(data);

}







function moveItem(
id,
direction
)
{


const data =
getData();



const items =
data.items;



const index =
items.findIndex(
x =>
x.id===id
);



if(index===-1)
return;



const target =
index + direction;



if(
target < 0 ||
target >= items.length
)
return;



[
items[index],
items[target]

]=

[
items[target],
items[index]
];



saveData(data);

}








function getCategories()
{

return getData()
.categories;

}







function addCategory(name)
{


const data =
getData();



if(
!name ||
data.categories.includes(name)
)
return;



data.categories.push(name);



saveData(data);

}







function deleteCategory(name)
{


const data =
getData();



if(
!data.categories.includes(
"その他"
)
)
{

data.categories.push(
"その他"
);

}




data.categories =
data.categories.filter(
x =>
x !== name
);




data.items.forEach(
item =>
{

if(item.category===name)
{

item.category="その他";

}

});



saveData(data);

}
