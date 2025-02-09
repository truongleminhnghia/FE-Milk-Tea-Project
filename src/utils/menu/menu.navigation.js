

export const MenuAdmin = [
    {
        title: "Dashboard",
        path: "dashboard",
        icon: "mdi:monitor-dashboard"
    },
    {
        title: "Products",
        path: "products",
        icon: "mdi:package-variant",
        attribute: [
            {
                index: 0,
                subTitle: "List Product",
                paht: "products",
            },
            {
                index: 1,
                subTitle: "Add New Product",
                paht: "create-product",
            },
            {
                index: 2,
                subTitle: "Category",
                paht: "category",
            },
        ]
    },
    {
        title: "Orders",
        path: "orders",
        icon: "mdi:shopping",
        attribute: [
            {
                index: 0,
                subTitle: "New Order",
                paht: "new-order",
            },
            {
                index: 1,
                subTitle: "List Order",
                paht: "orders",
            }
        ]
    },
    {
        title: "Recipes",
        path: "recipes",
        icon: "mdi:cog",
        attribute: [
            {
                index: 0,
                subTitle: "List Recipes",
                paht: "recipes",
            },
            {
                index: 1,
                subTitle: "New Recipe",
                paht: "create-recipe",
            }
        ]
    },
    {
        title: "Users",
        path: "users",
        icon: "mdi:cog",
        attribute: [
            {
                index: 0,
                subTitle: "List Users",
                paht: "users",
            },
            {
                index: 1,
                subTitle: "New User",
                paht: "create-user",
            }
        ]
    },
    {
        title: "Messages",
        path: "messages",
        icon: "mdi:cog"
    },
    {
        title: "Riviews & Ratings",
        path: "recipes",
        icon: "mdi:cog"
    },
];

export const MenuStaff = [
    {
        title: "Menu Staff",
        path: "/dashboard",
        icon: "mdi:monitor-dashboard"
    },
    {
        title: "Products",
        path: "/products",
        icon: "mdi:package-variant"
    },
    {
        title: "Orders",
        path: "/orders",
        icon: "mdi:shopping"
    },
    {
        title: "Categories",
        path: "/categories",
        icon: "mdi:package-variant"
    },
    {
        title: "Recipes",
        path: "/recipes",
        icon: "mdi:cog"
    },
    {
        title: "Users",
        path: "/users",
        icon: "mdi:cog"
    },
    {
        title: "Account",
        path: "/account",
        icon: "mdi:cog"
    },
    {
        title: "Messages",
        path: "/messages",
        icon: "mdi:cog"
    },
    {
        title: "Riviews & RatingS",
        path: "/recipes",
        icon: "mdi:cog"
    },
]
