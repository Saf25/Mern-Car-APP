import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewPost, updatePost } from "../slices/postSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../App.css";
//<e will use props here to deal with if it's edit or newpost
function PostModal({
  check,
  Car_Manufacturer,
  Model,
  Engine_capacity,
  Horse_Power,
  id,
}) {
  //show & hide the model teb3in l copy paste ta3 lmodal boot
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //we jsut need useForm from react hook form, it's not register fct
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  //fonction s'ajout new Post fel front
  //benesba lel postslice houa elli ya7ki ma3 lback
  //houni juste affichahe

  const addPost = (data) => {
    //feha l update zeda
    check ? dispatch(updatePost({ ...data, id })) : dispatch(addNewPost(data));
    handleClose();
  };

  //const { errors, isAuth } = useSelector((state) => state.user);

  return (
    <div>
      <Button className="centerx" id="mrg" variant="dark" onClick={handleShow}>
        {/* we will pass propos to modal here */}
        {check ? <i class="fas fa-edit" /> : "Add Vehicle"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form className="center " onSubmit={handleSubmit(addPost)}>
          <label className="lbl">Car_Manufacturer</label>
          <select className="clr width3" {...register("Car_Manufacturer")}>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Porsche">Porsche</option>
          </select>

          <br></br>
          <label className="lbl">Model</label>
          <br></br>
          <select className="clr width3" {...register("Model")}>
            <option value="BMW 2 Series">BMW 2 Series</option>
            <option value="BMW 3 Series">BMW 3 Series</option>
            <option value="BMW 3 Series">BMW 4 Series</option>
            <option value="BMW 3 Series">BMW 5 Series</option>
            <option value="BMW 3 Series">BMW 7 Series</option>
            <option value="MB Classe A">MB Classe A</option>
            <option value="MB Classe C">MB Classe C</option>
            <option value="MB Classe E">MB Classe E</option>
            <option value="MB Classe S">MB Classe S</option>
            <option value="Porsche Panemera">Porsche Panamera</option>
            <option value="Porsche Cayenne">Porsche Cayenne</option>
            <option value="Porsche Macan">Porsche Macan</option>
          </select>
          <br></br>

          <label className="lbl">Engine_capacity</label>
          <select className="clr width3" {...register("Engine_capacity")}>
            <option value="V4 2.0L">V4 2.0L</option>
            <option value="V4 1.6L">V4 1.6L</option>
            <option value="V6 2.0L">V6 2.0L</option>
            <option value="V6 2.5L">V6 2.5L</option>
            <option value="V6 3.0L">V6 3.0L</option>
            <option value="V6 3.5L">V6 3.5L</option>
          </select>
          <br></br>

          <label className="lbl">Horse_Power</label>
          <select
            className="clr width3"
            type="text"
            {...register("Horse_Power")}
          >
            <option value="110 PS">110 PS</option>
            <option value="150 PS">150 PS</option>
            <option value="195 PS">195 PS</option>
            <option value="225 PS">225 PS</option>
            <option value="385 PS">385 PS</option>
          </select>

          <br></br>
          <br></br>
          <button className="clr width2" type="submit">
            {check ? "Update you car Infos" : "Add Vehicle"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default PostModal;
// adding new Post with inputs
//using register Car_Manufacturer and Model are the same existing in the post schema in DB
// idha maste3amalnech l hook form ywali ya3ref bel name ta3 input

//pr faire l update il faut passer les nvelles infos à travers le modal
//dc on va prendre Car_Manufacturer et Model et les faire passer au input pr l update
//welli houma bech yetbadlou fel post modal
//kima 3additlou check bech nemchi n3adilou les infos ta3 lpost
//eni fel Modal mnin bech njib les infos ta3 lpost lazem yet3adew ka props
