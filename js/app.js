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
イベント設定
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



    const count =
        document
        .getElementById(
            "item-count"
        )
        .value;



    const category =
        document
        .getElementById(
            "item-category"
        )
        .value;



    const limit =
        document
        .getElementById(
            "item-limit"
        )
        .value;



    if(
        name === "" ||
        count === ""
    )
    {
        alert(
            "商品名と数量を入力してください"
        );

        return;
    }



    addItem(
    {

        name:name,

        count:Number(count),

        category:category,

        limit:limit

    });



    clearInput();


    render();

}






/*
--------------------------------
表示更新
--------------------------------
*/

function render()
{

    const items =
        getItems();



    renderInventory(items);

    renderShopping(items);

    renderExpire(items);

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
        document.getElementById(
            "inventory-list"
        );


    area.innerHTML="";



    if(items.length===0)
    {

        area.innerHTML =
            `<div class="empty">
            在庫がありません
            </div>`;

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



            div.innerHTML =
`
<div class="item-info">

<span class="item-name">
${item.name}
</span>

<span>
残り ${item.count}
</span>

<span class="item-category">
${item.category}
</span>

</div>


<div class="item-actions">

<button
class="small-button buy"
onclick="useItem(${item.id})">

使用

</button>


<button
class="small-button"
onclick="addShopping(${item.id})">

買物

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
使用
--------------------------------
*/

function useItem(id)
{

    const items =
        getItems();



    const item =
        items.find(
            x =>
            x.id===id
        );



    if(item && item.count>0)
    {

        item.count--;

        updateItem(item);

    }



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

function addShopping(id)
{

    toggleShopping(id);

    render();

}



function renderShopping(items)
{

    const area =
        document.getElementById(
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
        買い物リストは空です
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
期限チェック
--------------------------------
*/

function renderExpire(items)
{

    const area =
        document.getElementById(
            "expire-list"
        );


    area.innerHTML="";



    const today =
        new Date();



    const warning =
        items.filter(
            item =>
            {

                if(!item.limit)
                {
                    return false;
                }


                const date =
                    new Date(
                        item.limit
                    );


                const diff =
                    (date-today)
                    /
                    (1000*60*60*24);


                return diff <= 3;

            }
        );



    if(warning.length===0)
    {

        area.innerHTML =
        `
        <div class="empty">
        問題ありません
        </div>
        `;

        return;

    }



    warning.forEach(
        item =>
        {

            area.innerHTML +=
`
<div class="expire-warning">

⚠ ${item.name}

期限:
${item.limit}

</div>
`;

        }
    );

}






/*
--------------------------------
件数表示
--------------------------------
*/

function updateSummary(items)
{

    document
    .getElementById(
        "total-items"
    )
    .textContent =
        `在庫 ${items.length}件`;



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






/*
--------------------------------
入力クリア
--------------------------------
*/

function clearInput()
{

    document
    .getElementById(
        "item-name"
    )
    .value="";



    document
    .getElementById(
        "item-count"
    )
    .value="";



    document
    .getElementById(
        "item-limit"
    )
    .value="";

}
