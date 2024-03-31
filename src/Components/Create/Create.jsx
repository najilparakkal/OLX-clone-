import {Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { getStorage, ref, uploadBytes ,getDownloadURL } from 'firebase/storage'; 
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/config";

const Create = () => {

  const { firebaseApp } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const currentDate = Timestamp.now();
    const storage = getStorage(firebaseApp); 
    const storageRef = ref(storage, `/images/${image.name}`); 
    uploadBytes(storageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        return addDoc(collection(firestore, 'products'), {
          name: name,
          category: category,
          price: price,
          url: url,
          user: user.uid,
          createdAt: currentDate,
        });
      })
      .then((docRef) => {
        console.log('Document added with ID: ', docRef.id);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              id="fname"
              name="Price"
            />
            <br />
          <br />
          <img alt="Posts"  width="150px"  height="150px" src={image ? URL.createObjectURL(image):''}></img>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])}  type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;