import { dashboardData } from "./dashboard.functions/data"
import { sideNavRoutes } from "./dashboard.functions/routes"
import "./dashboard.scss"

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="side-nav-ar">
                {
                    sideNavRoutes.map((nl, i)=>{
                        return <div className="side-nav-link" key={i}>
                            <div className="side-nav">
                                {nl.icon}
                                <div className="title">{nl.title}</div>
                            </div>
                            <div className="sub-link">
                                {nl.subNav? nl.subNav.map((sn, i)=>{
                                    return <div className="sub-link">
                                        {sn.title}
                                    </div>
                                }) : null}
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="right-ar">
                {
                    dashboardData.orders.map((d, i)=>{
                        return <div className="order-card">
                            {d.icon}
                            <div className="title">{d.title}</div>
                            <div className="price">{d.value}</div>
                            <div className="percentage">
                                {d.percentage.icon} <div className="text">{d.percentage.text}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}