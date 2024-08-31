import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, SvgIcon, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CommentPopup from "./CommentPopup";
import "../assets/styles/components/songCard.css";
import { useAuthContext } from "../hooks/useAuthContext";

export default function SongCard({
  title,
  date,
  venue,
  city,
  state,
  comment,
  upvotes,
  id,
  externalComments,
  userName,
}) {
  const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
  const [upvoted, setUpvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);

  //get user
  const { user } = useAuthContext();

  let cardStyle = {
    width: "50dvw",
    margin: "20px 0 0 0",
    backgroundColor: "#c6c6c6",
  };

  //comment handler
  const handleClick = async () => {
    if (user) {
      const user = JSON.parse(localStorage.getItem("user"));
      const update = upvotes.push(user.email);
      const song = { upvotes: update, id };
      const token = user.token;
      const response = await fetch(
        `https://flockrank.onrender.com/api/songs/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(song),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUpvoteCount(upvoteCount + 1);
      setUpvoted(true);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        style={cardStyle}
        sx={{ display: "flex", alignItems: "center" }}
        className="songCard"
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#c6c6c6",
            }}
          >
            <Box
              sx={{
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#c6c6c6",
                flexDirection: "column",
              }}
            >
              <SvgIcon
                onClick={upvoted ? null : handleClick}
                component={ArrowCircleUpIcon}
                sx={{
                  cursor: "pointer",
                  ":hover": { color: "#394dcd", cursor: "pointer" },
                  color: upvoted ? "blue" : " ",
                }}
              ></SvgIcon>
              <Typography sx={{ backgroundColor: "#c6c6c6" }}>
                {upvoteCount}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ backgroundColor: "#c6c6c6" }}>
                {title} {date} {venue}
              </Typography>
              <Typography sx={{ backgroundColor: "#c6c6c6" }}>
                {city} {state}
              </Typography>
              <Typography sx={{ backgroundColor: "#c6c6c6" }}>
                {comment}
              </Typography>
              <div sx={{ backgroundColor: "#c6c6c6" }}>
                <ul
                  style={{
                    display: "flex",
                    backgroundColor: "#c6c6c6",
                    margin: "0",
                    listStyle: "none",
                    padding: "16px 0 0 0",
                    fontSize: "12px",
                    alignItems: "center",
                  }}
                  className="commentInterface"
                >
                  <li
                    style={{
                      ":hover": { color: "blue}" },
                      padding: "0",
                      backgroundColor: "#c6c6c6",
                      display: "block",
                      margin: "0",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowComments(!showComments)}
                  >
                    {externalComments ? externalComments.length : 0}{" "}
                    {externalComments.length === 1 ? "comment" : "comments"}
                  </li>
                  {user && (
                    <React.Fragment>
                      <li
                        style={{
                          padding: " 0 5px",
                          backgroundColor: "#c6c6c6",
                        }}
                        className="desktop"
                      >
                        {" "}
                        |{" "}
                      </li>
                      <li>
                        <CommentPopup
                          flavorText={"add a comment"}
                          songId={id}
                          externalComments={externalComments}
                        />
                      </li>
                    </React.Fragment>
                  )}
                  <li
                    style={{ padding: " 0 5px", backgroundColor: "#c6c6c6" }}
                    className="desktop"
                  >
                    {" "}
                    |{" "}
                  </li>
                  <li style={{ backgroundColor: "#c6c6c6" }}>
                    posted by:{" "}
                    <Typography
                      className="userLinkSC"
                      onClick={() =>
                        (window.location.href = `/user/${userName}`)
                      }
                      style={{
                        textDecoration: "none",
                        fontSize: "12px",
                        display: "inline",
                        cursor: "pointer",
                        backgroundColor: "#c6c6c6",
                      }}
                    >
                      {userName}
                    </Typography>{" "}
                  </li>
                </ul>
              </div>
            </Box>
          </Box>
          {showComments && externalComments.length > 0 && (
            <div style={{ padding: "20px 0 0 40px" }}>
              {externalComments.map((comment) => (
                <Typography sx={{ paddingTop: "10px" }}>
                  {comment[0]} <br />{" "}
                  <span style={{ fontSize: "10px" }}>
                    posted by:{" "}
                    <Typography
                      className="userLinkSC"
                      onClick={() =>
                        (window.location.href = `/user/${userName}`)
                      }
                      style={{
                        textDecoration: "none",
                        fontSize: "10px",
                        display: "inline",
                        cursor: "pointer",
                      }}
                    >
                      {comment[1]}
                    </Typography>
                  </span>
                </Typography>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
