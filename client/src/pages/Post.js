import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { getAllPosts } from "./../slices/postSlice";
import PostModal from "./../components/PostModal";
import { loadUser } from "./../slices/userSlice";

const Post = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  //houni na7na sn3ana slice w mazidenhech lel store du cp mattla3ch fel
  //state
  //**bech tatla3 fel state il faut NB nzidoha fel stor */
  //ay 7aja tetsna3 fel slice nzidoha lel store bech tala3 fel state
  const { loading, postList, errors } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="top3 bg">
      {postList === "" && (
        <p>
          You don't have any Cars registred yet, please Add new cars to your
          Profile
        </p>
      )}
      {postList !== [] && loading && <p>loading...</p>}
      {errors && <p>{errors.msg}</p>}

      <h4 className="centerp lobster">Welcome {userInfo.name}</h4>
      {postList !== [] && (
        <h5 className="centern lobster">Here are you registred cars</h5>
      )}
      <PostModal />

      <div style={{ display: "flex", margin: " 0 50px", flexWrap: "wrap" }}>
        {postList !== [] &&
          Object.values(postList).map((post) => (
            <div className="btw" key={post._id}>
              <PostCard {...post} />

              <br></br>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
//idha loading true yafichi loading
//fi ay list 3ana map

//when you have an array of objects in map you need to take the values
//with Object.values

//soit nbadlou l variable fel intialState fel slice
//fi blaset object nbadlou array w hakek yetna7a mochkel l object
//fel .map dc il y a 2 façons

//pr faire apparaitre le design de bootstrap css il faut ajouter cdin
//link to the index in Public directory

//houni fel {...post} bech najem mba3ed ne5ou les param dc 3aditha propos lel PostCard
//w spreditha dc ye5ou title wa7dou wel desc wa7dou
