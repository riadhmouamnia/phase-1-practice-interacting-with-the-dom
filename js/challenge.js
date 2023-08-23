const counter = document.querySelector("#counter");
const pause = document.querySelector("#pause");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const heart = document.querySelector("#heart");
const commentForm = document.querySelector("#comment-form");
const commentslist = document.querySelector("#list");

// create time
let time = 0;

// create timer function
const createTimer = () => {
  let timerID = null;
  timerID = setInterval(displayTimer, 1000);
  pause.addEventListener("click", () => {
    if (timerID) {
      clearInterval(timerID);
      pause.textContent = "resume";
      timerID = null;
    } else {
      timerID = setInterval(displayTimer, 1000);
      pause.textContent = "pause";
    }
  });
};

// add one to the timer on click plus
plus.addEventListener("click", () => {
  time++;
  counter.textContent = time;
});
// subtract one from the timer on click minus
minus.addEventListener("click", () => {
  time--;
  counter.textContent = time;
});

// render the timer
const displayTimer = () => {
  time++;
  counter.textContent = time;
};

// render comment
const renderComment = (e) => {
  e.preventDefault();
  const comment = e.target.children[0].value;
  const p = document.createElement("p");
  p.textContent = comment;
  commentslist.appendChild(p);
};

// liker function
const likesData = {}; // Object to store likes for each time

const liker = () => {
  let currentTime = time;

  // Initialize likes for the current time if it's not in the object
  if (!likesData[currentTime]) {
    likesData[currentTime] = 0;
  }
  likesData[currentTime]++;
  const likes = document.querySelector(".likes");
  const existedLi = likes.querySelector(`li[data-time="${currentTime}"]`);
  if (existedLi) {
    existedLi.textContent = `${currentTime} liked ${likesData[currentTime]}`;
  } else {
    const li = document.createElement("li");
    li.textContent = `${currentTime} liked ${likesData[currentTime]}`;
    li.setAttribute("data-time", currentTime);
    likes.appendChild(li);
  }
};

// event for the comments and likes
commentForm.addEventListener("submit", renderComment);
heart.addEventListener("click", liker);

createTimer();
