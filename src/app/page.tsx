"use client";
import { connect, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [avaliable, setAvailable] = useState<boolean>(false);
  let socket: Socket;
  const clicked = (): void => {
    if (avaliable) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream: MediaStream) => {
          const videoSrc = document.getElementById(
            "video_content"
          )! as HTMLVideoElement;
          videoSrc.srcObject = stream;
          videoSrc.onloadedmetadata = (data) => {
            videoSrc.play();
            console.log(data);
          };
          console.log(stream.getVideoTracks());
          console.log(typeof stream);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    return;
  };

  useEffect(() => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      setAvailable(true);
    }
  }, []);

  useEffect(() => {
    const val = connect();
    socket = val;
    socket.on("connection", () => {
      console.log("connected");
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("true", (args) => {
        console.log(args);
      });
    }
  });

  return (
    <>
      <div className="text-xl text-green-600">
        this is where the DIV value will start from
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        <button onClick={clicked} className="px-4 py-3 bg-blue-600 mb-2">
          Start Streaming{" "}
        </button>

        <div className="h-80 bg-slate-400 w-1/2 ">
          <video id="video_content" className="h-full w-full"></video>
        </div>
      </div>
    </>
  );
}
