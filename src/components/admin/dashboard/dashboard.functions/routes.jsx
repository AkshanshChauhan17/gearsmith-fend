import { BiCart, BiRupee, BiSolidDashboard, BiTrendingUp } from "react-icons/bi";

export const sideNavRoutes = [{
            "title": "Dashboard",
            "link": "/dashboard",
            "icon": <BiSolidDashboard className="icon" />
        },
        {
            "title": "Orders",
            "link": "/orders",
            "icon": <BiCart className="icon" /> ,
            "subNav": [{
                    "title": "All Orders",
                    "link": "/orders/all"
                },
                {
                    "title": "Completed Orders",
                    "link": "/orders/completed"
                },
                {
                    "title": "Pending Orders",
                    "link": "/orders/pending"
                },
                {
                    "title": "Cancelled Orders",
                    "link": "/orders/cancelled"
                }
            ]
        },
        {
            "title": "Sales",
            "link": "/sales",
            "icon": <BiRupee className="icon" />,
            "subNav": [{
                    "title": "Today's Sales",
                    "link": "/sales/today"
                },
                {
                    "title": "This Week's Sales",
                    "link": "/sales/this_week"
                },
                {
                    "title": "This Month's Sales",
                    "link": "/sales/this_month"
                },
                {
                    "title": "This Year's Sales",
                    "link": "/sales/this_year"
                }
            ]
        },
        {
            "title": "Profit",
            "link": "/profit",
            "icon": <BiTrendingUp className="icon"/>,
            "subNav": [{
                    "title": "Today's Profit",
                    "link": "/profit/today"
                },
                {
                    "title": "This Week's Profit",
                    "link": "/profit/this_week"
                },
                {
                    "title": "This Month's Profit",
                    "link": "/profit/this_month"
                },
                {
                    "title": "This Year's Profit",
                    "link": "/profit/this_year"
                }
            ]
        }
    ];