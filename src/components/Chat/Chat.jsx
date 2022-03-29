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
  const [checkkeypress, setCheckkeypress] = useState(false);
  const [isLoadingChat, setLoadingChat] = useState(false);
  // const [isCountDown, setLoadingChat] = useState(false);
  const [chats, setChats] = useState({});
  const [lasttime, setlasttime] = useState(-1);
  const [content, setcontent] = useState("");
  // const [inCountdown, setinCountdown] = useState(false);
  const [oldChat, setoldChat] = useState(undefined);

  const myRef = createRef();
  useEffect(() => {
    if (checkkeypress) {
      console.log("ehhe");
      document.getElementById("chat-input").addEventListener(
        "keyup",
        function (e) {
          e.stopPropagation();
        },
        false
      );
      // document.getElementById("chat-input").addEventListener(
      //   "keydown",
      //   function (e) {
      //     onEnterPress(e);
      //     e.stopPropagation();
      //   },
      //   false
      // );
    }
  }, [checkkeypress]);
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
    e.stopPropagation();
    setCheckkeypress(true);
    console.log(e.keyCode);

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
            writeError: "Bình luận của bạn quá dài (" + send.length + "/300)",
          });
      } else setState({ ...state, writeError: "Bình luận trắng" });
    } else
      setState({
        ...state,
        writeError: "Vui lòng đợi vài giây trước khi gửi bình luận tiếp theo!",
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
      className="chat-component background-comment"
      // style={{ backgroundImage: `url(${backimg})` }}
    >
      {/* {console.log(state.lasttime)} */}
      {chats.length === 0 && (
        <span className="text-white background-item p-3 descriptions-comment">
          Chưa có bình luận nào, hãy là người đầu tiên cho ý kiến về bộ phim
          này!
        </span>
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
                  <div className="d-flex p-2">
                    <img
                      className="d-block mb-4 rounded-circle avatar-default"
                      src={
                        "https://static.fptplay.net/static/img/share/structure/08_05_2015/default_user_icon08-05-2015_16g50-27.jpg?w=200&mode=scale"
                      }
                      alt=""
                      width={50}
                      height={50}
                    />
                    <p
                      key={chat.timestamp}
                      className={
                        "chat-bubble chat-content no-bottom" +
                        (userInfo.email === chat.email ? "current-user" : "")
                      }
                    >
                      <div className="userAndTime">
                        {chat.username}
                        <span
                          className="chat-time float-right ms-3"
                          style={{ display: "inline-block" }}
                        >
                          {formatTime(chat.timestamp)}
                        </span>
                      </div>
                      <br></br>
                      <p
                        // style={{
                        //   float: "left",
                        //   textAlign: "left",
                        //   overflowWrap: "anywhere",
                        // }}
                        className="content-comment"
                      >
                        {" "}
                        {chat.content}
                      </p>
                    </p>
                  </div>
                ) : (
                  // chưa login => full float feft
                  <div className="d-flex">
                    <img
                      className="d-block mb-4 rounded-circle"
                      src={
                        "https://static.fptplay.net/static/img/share/structure/08_05_2015/default_user_icon08-05-2015_16g50-27.jpg?w=200&mode=scale"
                      }
                      alt=""
                      width={50}
                      height={50}
                    />
                    <p
                      // style={{ display: "block" }}
                      key={chat.timestamp}
                      className="chat-bubble chat-content no-bottom ms-3"
                    >
                      <div className="userAndTime">
                        {chat.username} (
                        <span
                          className="chat-time float-right ms-3"
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
                  </div>
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
        <div
          onSubmit={handleSubmit}
          className="d-flex background-input-chat mt-3"
        >
          <textarea
            className="input-chat text-white"
            name="content"
            id="chat-input"
            onChange={(e) => {
              setState({ limitLenght: false });
              console.log(e.target.value);
              setcontent(e.target.value);
            }}
            onKeyDown={onEnterPress}
            value={content}
            // maxle=ngth="300"
            placeholder={
              "Nhập bình luận của bạn"
              // "Chat với tên " + userInfo.displayName + " (tối đa 300 kí tự)"
            }
          ></textarea>
          {lasttime == -1 ? (
            <button type="submit" className="btn-comment">
              <i class="fa fa-paper-plane text-white" aria-hidden="true"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn-comment primary-color"
              disabled
            >
              {lasttime}
            </button>
          )}
        </div>
      ) : (
        <div className="d-block mx-auto w-fit text-light p-4">
          <span className="out-title-ipad">
            Vui lòng đăng nhập để được bình luận!
          </span>{" "}
          <Link
            to="/login"
            className="background-primary ms-4 btn outsign-ipad"
          >
            Đăng nhập ngay!
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
