import React from 'react';
import './index.less';
import { withRouter, NavLink } from 'react-router-dom';
import pagesConfig from '@/routes/config';
function Header(props)  {
  return (
    <div className="header-box">
      <div className="logo-box">
        <div className="title">市县数据展示平台</div>
      </div>
      {/* <div className="menu-box">
        {
          pagesConfig.routes.menus.map(item =>
            <NavLink to={item.route} key={item.route} className={`menu-div ${props.location.pathname.indexOf(item.route) > -1 ? 'active' : ''}`}>
              <div className="menu-nav">
                {item.title}
              </div>
            </NavLink>
          )
        }
      </div> */}
    </div>
  );
}

export default withRouter(Header)
