document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        render();

        setupEvents();
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

}




/*
--------------------------------
登録
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

        category:category,

        stock:true

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
全体表示
--------------------------------
*/

function render()
{

    const items =
        getItems();


    renderInventory(items);


    renderShopping(items);


    updateSummary(items);

}







/*
--------------------------------
在庫一覧
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



    if(items.length===0)
    {

        area.innerHTML =
        `
        <div class="empty">
        登録なし
        </div>
        `;

        return;

    }



    items.forEach(
        item =>
        {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "item";



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



            div.innerHTML =
`
<div class="item-info">


<span class="item-name">
${item.name}
</span>


<span class="item-category">
${item.category}
</span>


${status}


</div>


<div class="item-actions">


<button
class="small-button stock"
onclick="toggleStock(${item.id})">

${item.stock ? "在庫なし" : "在庫あり"}

</button>



<button
class="small-button delete"
onclick="removeItem(${item.id})">

削除

</button>


</div>
`;



            area.appendChild(div);


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
            x.id === id
        );



    if(!item)
    {
        return;
    }



    item.stock =
        !item.stock;



    /*
      在庫なしの場合
      買い物リストへ
    */

    if(item.stock)
    {
        item.shopping = false;
    }
    else
    {
        item.shopping = true;
    }



    updateItem(item);



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
買い物リスト
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
            item =>
            item.shopping
        );



    if(list.length===0)
    {

        area.innerHTML =
        `
        <div class="empty">
        買い物はありません
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
            item =>
            item.shopping
        )
        .length;



    document
    .getElementById(
        "shopping-count"
    )
    .textContent =
        `買い物 ${count}件`;

}
