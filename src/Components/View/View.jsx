import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/Post';
import { firestore } from '../../firebase/config';
import { doc , getDoc } from 'firebase/firestore';

function View() {
  const [userDetails,setUserDetails] = useState(null)
  console.log("oairwjg;wr",userDetails);
  const {postDetails} = useContext(PostContext)
  console.log('postDetail1',postDetails);

  useEffect(() => {
    const userData = async () => {
      try {
        if (postDetails && postDetails.user) { 
          const { user } = postDetails;
          console.log('user',user);
          const docRef = doc(firestore, 'users', user);
          const snapshot =  getDoc(docRef);
          if (snapshot.exists()) {
            setUserDetails(snapshot.data());
          } else {
            alert("USER NOT FOUND");
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    userData();
  }, [postDetails]);
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toLocaleString()}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phoneNum}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
