import SidebarItem from "./SidebarItem"
import items from "../../data/sidebar.json"


export default function SideBar(){
    return (

      <div className="sticky">
      <div className="main-menu main-sidebar main-sidebar-sticky side-menu">
        <div className="main-sidebar-header main-container-1 active">
          <div className="sidemenu-logo">
            <a className="main-logo" href="index.html">
              <img
                src="./assets/img/brand/logo-light.png"
                className="header-brand-img desktop-logo"
                alt="logo"
              />
              <img
                src="./assets/img/brand/icon-light.png"
                className="header-brand-img icon-logo"
                alt="logo"
              />
              <img
                src="./assets/img/brand/logo.png"
                className="header-brand-img desktop-logo theme-logo"
                alt="logo"
              />
              <img
                src="./assets/img/brand/icon.png"
                className="header-brand-img icon-logo theme-logo"
                alt="logo"
              />
            </a>
          </div>
          <div className="main-sidebar-body main-body-1">
            <div className="slide-left disabled" id="slide-left">
              <i className="fe fe-chevron-left"></i>
            </div>

            { items.map((item, index) => <SidebarItem key={index} item={item} />) }
          
            <div className="slide-right" id="slide-right">
              <i className="fe fe-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      </div>


      
    )
}





