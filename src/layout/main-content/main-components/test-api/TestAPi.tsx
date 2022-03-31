import "./index.scss";
import React from 'react'
import axios from "axios";
import api from './../../../../services/api';

const TestAPi:React.FC = () => {
    const BASE_API="http://localhost:8080/";
    const handleGetPublicSongs=async(e:React.MouseEvent)=>{
        const res=await api.get(BASE_API+"songs");
        console.log("response", res);
    };
    const handleGetPrivateSongs=async(e:React.MouseEvent)=>{
        const res=await api.get(BASE_API + "api/private/songs");
        console.log("response", res);
    };
    const handleGetVipSongs=async(e:React.MouseEvent)=>{
        const res=await api.get(BASE_API + "api/vip/songs");
        console.log("response", res);
    };
    const handleGetPostSongs=async(e:React.MouseEvent)=>{
        const res=await api.post(BASE_API +"api/post/songs")
        console.log("response", res);
    }
  return (
    <div className="test-container">
       <div className="title">
           <h2>TEST API</h2>
       </div>
       <div className="test-content">
            <table>
                <thead>
                    <tr>
                       <th className="th-item">STT</th>
                       <th className="th-item">Name</th>
                       <th className="th-item">Method</th>
                       <th className="th-item">Private</th>
                       <th className="th-item">Description</th>
                       <th className="th-item">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="td-item">1</td>
                        <td className="td-item">List Songs</td>
                        <td className="td-item"><span>GET</span></td>
                        <td className="td-item">false</td>
                        <td className="td-item">Get list songs</td>
                        <td className="td-item"><span onClick={handleGetPublicSongs}>Action</span></td>
                    </tr>
                    <tr>
                        <td className="td-item">2</td>
                        <td className="td-item">List Private Songs</td>
                        <td className="td-item"><span>GET</span></td>
                        <td className="td-item">true</td>
                        <td className="td-item">Get list private songs</td>
                        <td className="td-item"><span onClick={handleGetPrivateSongs}>Action</span></td>
                    </tr>
                    <tr>
                        <td className="td-item">2</td>
                        <td className="td-item">List VIP Songs</td>
                        <td className="td-item"><span>GET</span></td>
                        <td className="td-item">true</td>
                        <td className="td-item">Get list vip songs</td>
                        <td className="td-item"><span onClick={handleGetVipSongs}>Action</span></td>
                    </tr>
                    <tr>
                        <td className="td-item">3</td>
                        <td className="td-item">Push Song</td>
                        <td className="td-item"><span>POST</span></td>
                        <td className="td-item">true</td>
                        <td className="td-item">Push song to list</td>
                        <td className="td-item"><span onClick={handleGetPostSongs}>Action</span></td>
                    </tr>
                </tbody>
            </table>
       </div>
    </div>
  )
}

export default TestAPi