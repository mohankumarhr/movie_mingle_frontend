import React, { useEffect, useState } from 'react'
import styles from '../CSS/communityList.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import InfoIcon from '@mui/icons-material/Info';
import LaunchIcon from '@mui/icons-material/Launch';
import Cookies from 'js-cookie';
import axios from 'axios';
import { base_url } from '../data';
import { useNavigate } from 'react-router-dom';

function CommunityList(props) {

  const [token] = useState(Cookies.get('token') || "")
  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("");
  const [handleListView, setListSection] = useState(true);
  const [ownedCommunityList, setOwnedCommunityList] = useState([]);
  const [memberedCommunities, setMenberedCommunities] = useState([]);

  const navigate  = useNavigate();

  const handleList = ()=>{
    setListSection(!handleListView)
    console.log(handleListView)
  }

  const handleLaunchIcon = (item)=>{
      navigate(`/communitydetails/${item.id}/`)
  }

  useEffect(()=>{
          console.log(token)
          axios.get(base_url+'/getuser',{
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {setUsername(response.data.username); setUserId(response.data.id)})
          .catch(error => console.error(error));
        },[token])
  
  useEffect(()=>{
    async function fetchData() {
      axios
      .get(base_url+`/community/ownedcommunities?name=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(responce => setOwnedCommunityList(responce.data))
      .catch(error => console.error(error));
  }
  fetchData()
  }, [username, token])

  useEffect(()=>{
    async function fetchData() {
      axios
      .get(base_url+`/community/communities?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(responce => setMenberedCommunities(responce.data))
      .catch(error => console.error(error));
  }
  fetchData()
  },[userId, token])

  // const templist = ["Block boster movies", "movie Buffs", "Thunder Movies", "Horrifing movies"]

  return (
    <div  className={`${handleListView?styles.showList:styles.collapseList} ${styles.communityListCont}`}  >
      <div className={!handleListView&&styles.listWrapper}>
        <div className={styles.communityMenu}>
          <div className={styles.communityListHead}>
          <p>Communities</p>
          <button onClick={props.handleJoinWindow} className={styles.createCommbtn} >Join</button>
          <button onClick={props.handleCreteWindow} className={styles.createCommbtn}>Create new</button>
          </div>
          <div className={styles.communityListBody}>
              {ownedCommunityList.map((item)=>{
                return <div onClick={()=>{props.handleActiveCommunity(item.id)}} className={styles.communityNameBtn}>
                  <div className={styles.commtitle}>
                  {item.name} <p>(Owner)</p>
                  </div>
                    <LaunchIcon titleAccess='more info' className={styles.launchIcon} onClick={()=>{handleLaunchIcon(item)}} />
                </div>
              })}
              {memberedCommunities.map((item)=>{
                return <div onClick={()=>{props.handleActiveCommunity(item.id)}} className={styles.communityNameBtn}>
                     <div className={styles.commtitle}>
                  {item.name} <p>(member)</p>
                  </div>
                    <LaunchIcon titleAccess='more info' className={styles.launchIcon} onClick={()=>{handleLaunchIcon(item)}} />
                     
                </div>
              })}
          </div>
        </div>
        
      </div>
      <div  className={`${styles.listHandleBtn} ${!handleListView&&styles.rotate}`} onClick={handleList}> 
        <ArrowBackIosIcon />
       </div> 
    </div>
  )
}

export default CommunityList