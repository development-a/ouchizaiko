document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        setupEvents();

        render();
    }
);



/*
--------------------------------
イベント
--------------------------------
*/

function setupEvents()
{

    document
    .getElementById(
        "add-button"
    )
    .addEventListener(
        "click",
        addNewItem
    );



    document
    .getElementById(
        "add-category"
    )
    .addEventListener(
        "click",
        addNewCategory
    );



    document
    .getElementById(
        "filter-category"
    )
    .addEventListener(
        "change",
        render
    );

}




/*
--------------------------------
商品追加
--------------------------------
*/

function addNewItem()
{

    const name =
        document
        .getElementById(
            "item-name"
        )
        .value;



    const category =
        document
        .getElementById(
            "item-category"
        )
        .value;



    if(name === "")
    {
        alert(
            "商品名を入力してください"
        );

        return;
    }



    addItem(
    {

        name:name,

        category:category

    });



    document
    .getElementById(
        "item-name"
    )
    .value="";



    render();

}






/*
--------------------------------
ジャンル追加
--------------------------------
*/

function addNewCategory()
{

    const input =
        document
        .getElementById(
            "new-category"
        );



    addCategory(
        input.value
    );



    input.value="";


    render();

}






/*
--------------------------------
全体描画
--------------------------------
*/

function render()
{

    const items =
        getItems();



    renderCategorySelect();

    renderCategories();

    renderInventory(items);

    renderShopping(items);

    updateSummary(items);

}







/*
--------------------------------
ジャンル選択
--------------------------------
*/

function renderCategorySelect()
{

    const categories =
        getCategories();



    const select =
        document
        .getElementById(
            "item-category"
        );


    const filter =
        document
        .getElementById(
            "filter-category"
        );



    select.innerHTML="";

    filter.innerHTML =
    `
    <option value="all">
    すべて
    </option>
    `;




    categories.forEach(
        c =>
        {


            select.innerHTML +=
            `
            <option>
            ${c}
            </option>
            `;



            filter.innerHTML +=
            `
            <option>
            ${c}
            </option>
            `;

        }
    );

}





/*
--------------------------------
ジャンル管理
--------------------------------
*/

function renderCategories()
{

    const area =
        document
        .getElementById(
            "category-list"
        );



    area.innerHTML="";



    getCategories()
    .forEach(
        c =>
        {

            area.innerHTML +=
`
<div class="category-item">


<span>
${c}
</span>


<button
class="category-delete"
onclick="removeCategory('${c}')">

削除

</button>


</div>
`;

        }
    );

}



function removeCategory(name)
{

    if(
        confirm(
            "ジャンル削除しますか？"
        )
    )
    {

        deleteCategory(name);

        render();

    }

}






/*
--------------------------------
在庫表示
--------------------------------
*/

function renderInventory(items)
{

    const area =
        document
        .getElementById(
            "inventory-list"
        );



    area.innerHTML="";



    const filter =
        document
        .getElementById(
            "filter-category"
        )
        .value;



    if(filter !== "all")
    {

        items =
            items.filter(
                x =>
                x.category === filter
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




    const groups =
        {};



    items.forEach(
        item =>
        {

            if(!groups[item.category])
            {
                groups[item.category]=[];
            }


            groups[item.category]
            .push(item);

        }
    );





    Object.keys(groups)
    .forEach(
        category =>
        {


            area.innerHTML +=
`
<div class="group-title">

${category}

</div>
`;



            groups[category]
            .forEach(
                item =>
                {


const status =
item.stock
?
`
<span class="status stock-ok">
在庫あり
</span>
`
:
`
<span class="status stock-ng">
在庫なし
</span>
`;




area.innerHTML +=
`
<div class="item">


<div class="item-info">


<span class="item-name">
${item.name}
</span>


${status}


</div>




<div class="item-actions">



<button
class="stock-button ${item.stock ? "stock-off":"stock-on"}"
onclick="toggleStock(${item.id})">

${item.stock ? "在庫なし":"在庫あり"}

</button>



<button
class="move-button"
onclick="move(${item.id},-1)">

↑

</button>



<button
class="move-button"
onclick="move(${item.id},1)">

↓

</button>




<button
class="delete-button"
onclick="removeItem(${item.id})">

🗑

</button>



</div>


</div>
`;

                }
            );


        }
    );

}





/*
--------------------------------
在庫切替
--------------------------------
*/

function toggleStock(id)
{

    const items =
        getItems();



    const item =
        items.find(
            x =>
            x.id===id
        );



    item.stock =
        !item.stock;



    item.shopping =
        !item.stock;



    updateItem(item);



    render();

}







/*
--------------------------------
並び替え
--------------------------------
*/

function move(id,direction)
{

    moveItem(
        id,
        direction
    );


    render();

}






/*
--------------------------------
削除
--------------------------------
*/

function removeItem(id)
{

    if(
        confirm(
            "削除しますか？"
        )
    )
    {

        deleteItem(id);

        render();

    }

}






/*
--------------------------------
買い物
--------------------------------
*/

function renderShopping(items)
{

    const area =
        document
        .getElementById(
            "shopping-list"
        );



    area.innerHTML="";



    const list =
        items.filter(
            x =>
            x.shopping
        );



    if(list.length===0)
    {

        area.innerHTML =
        `
        <div class="empty">
        買い物なし
        </div>
        `;

        return;

    }




    list.forEach(
        item =>
        {

            area.innerHTML +=
`
<div class="shopping-item">

🛒 ${item.name}

</div>
`;

        }
    );

}






/*
--------------------------------
件数
--------------------------------
*/

function updateSummary(items)
{

    document
    .getElementById(
        "total-items"
    )
    .textContent =
    `登録 ${items.length}件`;



    const count =
        items.filter(
            x =>
            x.shopping
        )
        .length;



    document
    .getElementById(
        "shopping-count"
    )
    .textContent =
    `買い物 ${count}件`;

}
