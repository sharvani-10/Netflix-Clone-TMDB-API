import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_Access_Key } from "../../config";

const Player = (props) => {
  const state = props.location;
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTk3NTA0MmQ5YTRhNmQ5YmQ3MzA5N2UzNzkyN2MyMyIsIm5iZiI6MTczNDUzODYzMS45NDksInN1YiI6IjY3NjJmNTg3Y2MyYjZkOWZjY2FiMDZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXRh_rh1Vo9BQtGvuqIzA7BxxQV32pCJGRq8vDkAWsE",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
    console.log(props);
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{state}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;