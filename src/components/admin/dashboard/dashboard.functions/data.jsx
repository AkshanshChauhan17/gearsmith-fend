import { BiCart, BiShoppingBag } from "react-icons/bi";
import { BsBag, BsBagFill, BsCartFill, BsGraphDownArrow, BsGraphUpArrow, BsRocketFill } from "react-icons/bs";
import { PiShoppingBagFill } from "react-icons/pi";

export const dashboardData = {
    orders: [
        {
            icon: <BsBagFill />,
            title: "Total Sales",
            value: "₹75,890,97",
            percentage: {
                icon: <div className="up"><BsGraphUpArrow className="icon" />12.00%</div>,
                text: "from June"
            }
        },
        {
            icon: <BsCartFill />,
            title: "Total Orders",
            value: "98",
            percentage: {
                icon: <div className="up"><BsGraphUpArrow className="icon" />5.50%</div>,
                text: "from June"
            }
        },
        {
            icon: <PiShoppingBagFill />,
            title: "Avg Order Value",
            value: "₹89097",
            percentage: {
                icon: <div className="down"><BsGraphDownArrow className="icon" />10.07%</div>,
                text: "from June"
            }
        },
        {
            icon: <BsRocketFill />,
            title: "Conversion Rate",
            value: "98.56%",
            percentage: {
                icon: <div className="up"><BsGraphUpArrow className="icon" />2.50%</div>,
                text: "from June"
            }
        }
    ]
}