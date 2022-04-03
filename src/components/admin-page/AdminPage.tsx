import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import TokenService from './../../services/token.service';
import AdminPageSidebar from './admin-page-sidebar/AdminPageSidebar';
import styles from "./admin-styles-module/admin.module.scss";
type profileType={
  id: string,
  userName: string,
  email: string,
  phoneNumber: number|null,
  roles: []|string
}
const AdminPage:React.FC<{profile: profileType}> =({profile})=>{
  // const token=TokenService.getLocalAccessToken();
  // let location = useLocation();
  // if(!token || profile.roles!=="admin"){
  //   return <Navigate to="/login" state={{ from: location }} />
  // }
  return (
    <div className={styles['container']}>
      <AdminPageSidebar/>
    </div>
  )
}

export default AdminPage