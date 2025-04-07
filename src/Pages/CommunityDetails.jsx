import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import BackgroundLetterAvatars from '../Components/Avathar'
import styles from '../CSS/communityDetails.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../data'


function CommunityDetails() {

  const navigate = useNavigate()
  const [isOwner, setOwner] = useState(true);
  const [communityData, setCommunityData] = useState();
  const [username, setUsername] = useState("hr")
  const [token] = useState(Cookies.get('token') || "")
  const [membersList, setMembersList] = useState([])
  const {id} = useParams();


  const exitfromComm = async (membername)=>{
      await axios.post(base_url+"/community/exitcommunity" ,null, {
        params: {
          communityId: id,
          membername : membername
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        navigate("/community")
      })
      .catch(error => {
        console.error("There was an error exiting the community!", error);
      });
  }

  const deleteCommunity = async ()=>{
    await axios.delete(base_url+"/community/deletecommunity", {
      params: {
        communityId: id,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      navigate("/community")
    })
    .catch(error => {
      console.error("There was an error deleting the community!", error);
    });
  }
  

  useEffect(()  => {
    axios.get(base_url+'/community/getdetails', {
      params: {
        communityId: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setCommunityData(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the community details!", error);
    });
  }, [id, token]);


  useEffect(()  => {
    axios.get(base_url+'/community/members', {
      params: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setMembersList(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the community details!", error);
    });
  }, [id, token]);

  useEffect(()=>{
    console.log(token)
    axios.get(base_url+'/getuser',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {setUsername(response.data.username);})
    .catch(error => console.error(error));
  },[token])

  useEffect(() => {
    if (communityData && username) {
      if (username === communityData.owner.username) {
        setOwner(true);
      }else {
        setOwner(false);
      }
    }
  }, [communityData, username]);

  return (
    <div>
        <NavBar />
        <div className={styles.commDetailWrapper}>
            <h2>{communityData&&communityData.name}</h2>
            <p>created by {!isOwner?communityData&&communityData.owner.username:"You"}</p>
            <h4>members</h4>
            <div className={styles.membersList}>
                            {membersList.length > 0?membersList.map((item)=>{
                              return <div className={styles.membersName}>
                              <BackgroundLetterAvatars 
                                  name = {item.username}
                              /><p>{item.username}</p>
                              {isOwner&&<button className={styles.removeBtn}
                                onClick={()=>{exitfromComm(item.username)}}
                              >Remove</button>}
                              </div>
                            }):<p>Members Not present</p>}
            </div>
            {isOwner?<button onClick={deleteCommunity} className={styles.deletorexit}>Delete</button>:<button onClick={()=>{exitfromComm(username)}} className={styles.deletorexit}>Exit</button>}
        </div>
    </div>
  )
}

export default CommunityDetails