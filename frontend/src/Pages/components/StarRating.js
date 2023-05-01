import React, { useState } from "react";

import Axios from "axios";
import {useNavigate} from "react-router-dom";

const StarRating = (props) => {
  let navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const ratingURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/giveRating"
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= ( rating) ? "on" : "off"}
            onClick={(e) => {
              e.preventDefault();
              setRating(index);
              const requestBody = {
                ID: props.props.id,
                tutorID: props.props.tutor_id,
                gaveRating: "Yes",
                ratingValue: index
              }
              console.log(requestBody)
              Axios.post(ratingURL,requestBody)
                  .then( (response) => {
                    navigate(0)
                  }).catch((err) =>{
                alert(err);
              })
            }
          }
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;