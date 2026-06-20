document.addEventListener(
    "DOMContentLoaded",
    initShopping
);

let shoppingFilter = "all";

let shoppingDragId = null;

let shoppingPlaceholder = null;

function initShopping()
{
    updateShoppingCount();

    document
    .getElementById("shopping-filter")
    ?.addEventListener(
        "change",
        e =>
        {
            shoppingFilter =
                e.target.value;

            renderShopping();
        }
    );

    renderShopping();
}

function renderShopping()
{
    updateShoppingCount();

    renderShoppingFilter();

    const area =
        document.getElementById(
            "shopping-list"
        );

    if (!area)
    {
        return;
    }

    area.innerHTML = "";

    let items =
        getItems()
        .filter(
            x =>
                x.stock === false
        );

    if (
        shoppingFilter !== "all"
    )
    {
        items =
            items.filter(
                x =>
                    x.category ===
                    shoppingFilter
            );
    }

    if (items.length === 0)
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
                document.createElement(
                    "div"
                );

            card.className =
                "item";

            card.draggable =
                true;

            card.dataset.id =
                item.id;

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

            // タップで購入済み

            card.onclick =
                () =>
                {
                    item.stock =
                        true;

                    updateItem(
                        item
                    );

                    renderShopping();
                };

            // ドラッグ開始

            card.addEventListener(
                "dragstart",
                () =>
                {
                    shoppingDragId =
                        item.id;

                    createShoppingPlaceholder();
                }
            );

            // ドラッグ中

            card.addEventListener(
                "dragover",
                e =>
                {
                    e.preventDefault();

                    const rect =
                        card.getBoundingClientRect();

                    if (
                        e.clientY <
                        rect.top +
                        rect.height / 2
                    )
                    {
                        card.before(
                            shoppingPlaceholder
                        );
                    }
                    else
                    {
                        card.after(
                            shoppingPlaceholder
                        );
                    }
                }
            );

            // ドロップ

            card.addEventListener(
                "drop",
                e =>
                {
                    e.preventDefault();

                    const target =
                        shoppingPlaceholder
                        ?.previousElementSibling;

                    if (
                        target
                    )
                    {
                        moveShoppingItem(
                            shoppingDragId,
                            Number(
                                target.dataset.id
                            )
                        );
                    }

                    renderShopping();
                }
            );

            // ドラッグ終了

            card.addEventListener(
                "dragend",
                () =>
                {
                    removeShoppingPlaceholder();
                }
            );

            area.appendChild(
                card
            );
        }
    );

    updateShoppingCount();
}

function createShoppingPlaceholder()
{
    if (
        shoppingPlaceholder
    )
    {
        return;
    }

    shoppingPlaceholder =
        document.createElement(
            "div"
        );

    shoppingPlaceholder.className =
        "drag-placeholder";

    shoppingPlaceholder.textContent =
        "----------";
}

function removeShoppingPlaceholder()
{
    if (
        shoppingPlaceholder
    )
    {
        shoppingPlaceholder.remove();

        shoppingPlaceholder =
            null;
    }
}

function moveShoppingItem(
    from,
    to
)
{
    const data =
        getData();

    const items =
        data.items;

    const fromIndex =
        items.findIndex(
            x =>
                x.id === from
        );

    const toIndex =
        items.findIndex(
            x =>
                x.id === to
        );

    if (
        fromIndex === -1 ||
        toIndex === -1
    )
    {
        return;
    }

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

    saveData(
        data
    );
}

function renderShoppingFilter()
{
    const filter =
        document.getElementById(
            "shopping-filter"
        );

    if (!filter)
    {
        return;
    }

    filter.innerHTML =
        `
        <option value="all">
            すべて
        </option>
        `;

    getCategories()
        .forEach(
            c =>
            {
                filter.innerHTML +=
                    `
                    <option value="${c}">
                        ${c}
                    </option>
                    `;
            }
        );

    filter.value =
        shoppingFilter;
}

function updateShoppingCount()
{
    const count =
        getItems()
        .filter(
            x =>
                x.stock === false
        )
        .length;

    const element =
        document.getElementById(
            "shopping-count"
        );

    if (!element)
    {
        return;
    }

    element.textContent =
        `買い物 ${count}件`;
}
