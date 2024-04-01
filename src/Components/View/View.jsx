import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { PostContext } from "../../store/Post";
import { firestore } from "../../firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    const userData = async () => {
      try {
        if (postDetails) {
          const { user } = postDetails;
          const docRef = doc(firestore, "users", user);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            setUserDetails(snapshot.data());
          } else {
            alert("USER NOT FOUND");
          }
        } else {
          const querySnapshot = await getDocs(
            collection(firestore, "products")
          );
          querySnapshot.docs.forEach((doc) => {
            if (doc.id === id) {
              setPostDetails({ id: doc.id, ...doc.data() });
            }
          });
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
        <img src={postDetails && postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails.price} </p>
          <span>{postDetails && postDetails.name}</span>
          <p>{postDetails && postDetails.category}</p>
          <span>
            {/* {new Date(
              postDetails && postDetails.createdAt.seconds * 1000
            ).toLocaleString()} */}
          </span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
