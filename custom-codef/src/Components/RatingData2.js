import React, { useEffect, useState } from "react";
import Axios from "axios";
import "chartjs-plugin-zoom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import { Line } from "react-chartjs-2";
import { createPost } from "../actions/posts";

function RatingData2() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  var datal = [];
  var label = [];
  const [results, setResults] = useState([0]);
  const [user, setUser] = useState("");
  var min = Math.floor(results[0]?.ratingUpdateTimeSeconds / 60 / 60 / 24);
  var max = Math.floor(
    results[results.length - 1]?.ratingUpdateTimeSeconds / 60 / 60 / 24
  );

  var curr = min;
  var i = 0;
  while (results && curr <= max) {
    if (
      curr === Math.floor(results[i]?.ratingUpdateTimeSeconds / 60 / 60 / 24)
    ) {
      datal.push(results[i]?.newRating);
      var name = results[i]?.contestName;
      label.push(
        name[0] === "E"
          ? name.substring(28, 33)
          : name[0] === "C"
          ? name.substring(16, 21)
          : name
      );

      i++;
    } else {
      datal.push(null);
      label.push(".");
      curr++;
    }
  }
  const KPOP = () => {
    Axios.get(`https://codeforces.com/api/user.rating?handle=${user}`)
      .then((res) => {
        setResults(res.data.result);
      })
      .catch((err) => {
        alert("User '" + user + "' does not exist");
      });
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Rating",
        data: datal,
        borderColor: ["purple"],
        borderWidth: 1.5,
      },
    ],
  };
  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    spanGaps: true,
  };
  return (
    <div className="PAP">
      <input
        onChange={(e) => {
          setUser(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          if (user !== "") {
            KPOP();
          }
        }}
      >
        SEARCH
      </button>
      <button
        onClick={() => {
          Axios.get(`https://codeforces.com/api/user.rating?handle=${user}`)
            .then((res) => {
              setResults(res.data.result);
              var found = posts.find((ele) => {
                return ele.name === user;
              });
              if (!found) {
                dispatch(createPost({ name: user }));
              } else {
                alert("already exists");
              }
            })
            .catch((err) => {
              alert("User '" + user + "' does not exist");
            });
        }}
      >
        SAVE
      </button>
      <div className="Chart">
        <Line height={200} data={data} options={options} />
        <div className="list">
          {posts.map((val, key) => {
            return (
              <div
                className="item"
                key={key}
                onClick={() => {
                  Axios.get(
                    `https://codeforces.com/api/user.rating?handle=${val.name}`
                  ).then((res) => {
                    setResults(res.data.result);
                  });
                }}
              >
                {val.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RatingData2;
