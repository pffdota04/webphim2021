import React, { Component, createRef, useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";
import firebase from "firebase/app";
import "./Chat.css";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

const Chat = (props) => {
  const userInfo = useSelector((state) => state.userData.curentUser);
  const { place, backimg } = props;
  const [state, setState] = useState({
    user: userInfo,
    chats: [],
    oldchat: "",
    content: "",
    lasttime: -1,
    limitLenght: false,
    readError: null,
    writeError: null,
    loadingChats: false,
  });
  const [isLoadingChat, setLoadingChat] = useState(false);
  // const [isCountDown, setLoadingChat] = useState(false);
  const [chats, setChats] = useState({});
  const [lasttime, setlasttime] = useState(-1);
  const [content, setcontent] = useState("");
  // const [inCountdown, setinCountdown] = useState(false);
  const [oldChat, setoldChat] = useState(undefined);

  const myRef = createRef();

  useEffect(() => {
    setState({ ...state, readError: null, loadingChats: true });
    let fixbugCoundown = false;
    if (userInfo.checkUser !== "init") {
      const chatArea = myRef.current;
      try {
        let lasttime1 = -1;
        db.ref("chats/" + place)
          .limitToLast(50)
          .on("value", (snapshot) => {
            let chats = [];
            let count = 0;

            snapshot.forEach((snap) => {
              count++;
              chats.push(snap.val());
              if (
                userInfo.checkUser != "init" &&
                userInfo.checkUser != "not" &&
                userInfo.email == snap.val().email &&
                fixbugCoundown == false
              ) {
                lasttime1 = Date.now() - snap.val().timestamp;
              }
              if (count == 1) setoldChat(snap.key);
            });

            if (
              lasttime1 != -1 &&
              lasttime1 / 1000 < 20 &&
              fixbugCoundown == false
            ) {
              fixbugCoundown = true;
              // setinCountdown(true);
              countDown(Math.round(lasttime1 / 1000));
            } else setLoadingChat(true);

            setChats(chats);
            chatArea.scrollBy(0, chatArea.scrollHeight);
            setState({ ...state, loadingChats: false });
          });
      } catch (error) {
        setState({ ...state, readError: error.message, loadingChats: false });
      }
    }
  }, [userInfo]);

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const countDown = async (lt) => {
    // setinCountdown(true);
    let inter = await setInterval(() => {
      if (lt <= 20) {
        setLoadingChat(true);
        setlasttime(20 - lt);
        lt = lt + 1;
      } else {
        {
          setlasttime(-1);
          // setinCountdown(false);
          clearInterval(inter);
        }
      }
    }, 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let limit = 20;
    if (place == "home") limit = 40;
    if (lasttime == -1) {
      setState({ ...state, writeError: null });
      const chatArea = myRef.current;
      let send = content;
      send = send.replace(/  +/g, " ");
      if (send != "" && send != " ") {
        if (send.length < 300) {
          // censor
          const badWords = [
            "cặc",
            "lồn",
            "cặt",
            "đụ ",
            "địt",
            "duma",
            "ditme",
            "ditconme",
            "cailonma",
            "cailon",
            "cái lồn",
            "bú cu",
            "đm",
            "đcm",
            "3que",
            "cá cược",
            "đỉ ",
            "đĩ",
            "cave",
            "cộng sản",
            "nứng",
            "ba que",
            "cá độ",
          ];
          let b = "";
          badWords.forEach((a) => {
            b = b + a + "|";
          });
          const badWordsRegexString = "(" + b + ")";
          const badWordsRegex = new RegExp(badWordsRegexString, "ig");

          send = send.replace(badWordsRegex, (badWord) =>
            "*".repeat(badWord.length)
          );

          try {
            await db.ref("chats/" + place).push({
              content: send,
              timestamp: Date.now(),
              email: userInfo.email,
              username: userInfo.displayName,
            });
            countDown(0);
            // console.log(chats.length + " === " + oldChat);

            if (chats.length >= 50) {
              await db.ref("chats/" + place + "/" + oldChat).remove();
            }

            setlasttime(limit);
            setcontent("");
            setState({ ...state, writeError: null });

            chatArea.scrollBy(0, chatArea.scrollHeight);
          } catch (error) {
            setState({ ...state, writeError: error.message });
          }
        } else
          setState({
            ...state,
            writeError: "tin nhắn dài hơn quy định (" + send.length + "/300)",
          });
      } else setState({ ...state, writeError: "tin nhắn trống" });
    } else
      setState({
        ...state,
        writeError: "Chờ vài giây trước khi gửi tin nhắn tiếp theo",
      });
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };
  return (
    <div
      className="chat-component w-100 pb-1 "
      style={{ backgroundImage: `url(${backimg})` }}
    >
      {/* {console.log(state.lasttime)} */}
      {chats.length === 0 && (
        <p className="text-dark">
          Chưa có tin nhắn nào, hãy là người mở đầu cuộc trò chuyện!
        </p>
      )}

      <div className="chat-area" ref={myRef}>
        {state.loadingChats ? (
          <div class="d-block w-fit ps-1 mx-auto">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* chat area */}
        {!!chats.length &&
          chats.map((chat) => {
            return (
              <div>
                {userInfo != null ? (
                  // đã login =>> check tn để float right
                  <p
                    key={chat.timestamp}
                    className={
                      "chat-bubble chat-content no-bottom " +
                      (userInfo.email === chat.email ? "current-user" : "")
                    }
                  >
                    <div className="userAndTime">
                      {chat.username} (
                      <span
                        className="chat-time float-right"
                        style={{ display: "inline-block" }}
                      >
                        {formatTime(chat.timestamp)}
                      </span>
                      ):
                    </div>
                    <br></br>
                    <p
                      style={{
                        float: "left",
                        textAlign: "left",
                        overflowWrap: "anywhere",
                      }}
                      className="no-bottom"
                    >
                      {" "}
                      {chat.content}
                    </p>
                  </p>
                ) : (
                  // chưa login => full float feft
                  <p
                    // style={{ display: "block" }}
                    key={chat.timestamp}
                    className="chat-bubble chat-content no-bottom "
                  >
                    <div className="userAndTime">
                      {chat.username} (
                      <span
                        className="chat-time float-right"
                        style={{ display: "inline-block" }}
                      >
                        {formatTime(chat.timestamp)}
                      </span>
                      ):
                    </div>
                    <br></br>
                    <p
                      style={{
                        float: "left",
                        textAlign: "left",
                        overflowWrap: "anywhere",
                      }}
                      className="no-bottom"
                    >
                      {chat.content}
                    </p>
                  </p>
                )}
              </div>
            );
          })}
      </div>

      {userInfo.checkUser == "init" || !isLoadingChat ? (
        <div class="d-block w-fit ps-1 mx-auto">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : userInfo.checkUser != "not" ? (
        <form onSubmit={handleSubmit} className="mx-3">
          <textarea
            className="form-control"
            name="content"
            onChange={(e) => {
              setState({ limitLenght: false });
              setcontent(e.target.value);
            }}
            onKeyDown={onEnterPress}
            value={content}
            // maxle=ngth="300"
            placeholder={
              "Chat với tên " + userInfo.displayName + " (tối đa 300 kí tự)"
            }
          ></textarea>
          {lasttime == -1 ? (
            <button
              type="submit"
              className="btn btn-submit btn-success px-5 d-block mx-auto mt-2 mb-2"
            >
              Gửi
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-secondary px-5 d-block mx-auto mt-2 mb-2"
              disabled
            >
              {lasttime}
            </button>
          )}
        </form>
      ) : (
        <div className="d-block mx-auto bg-danger  w-fit text-light ps-1 pe-1">
          Login to comment{" "}
          <Link to="/login" className="text-light">
            Login now
          </Link>
        </div>
      )}

      <div class="bg-light d-block text-danger w-fit ps-1">
        {state.writeError}
      </div>
    </div>
  );
};

export default Chat;
