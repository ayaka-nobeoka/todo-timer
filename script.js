
//✅ TODOリストを追加して、タスクごとにタイマーを追加する
const inputTask = document.getElementById("input-task");
const addBtn =document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const inputTime = document.getElementById("input-time");


// ローカルストレージからタスクを取得
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks") || []);
}

// ローカルストレージにタスクを保存
function saveTasks(tasks) {
    console.log('保存するタスク:', tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// タスクをHTMLに追加する関数
function addTaskToDOM(task) {
    // タスクの要素を作成
    const li = document.createElement("li");

    // タスクが追加されるやつの名前
    const taskText = document.createElement("span");
    taskText.textContent = task.text;  // task.text に変更

    // タイマー表示
    const timerDisplay = document.createElement("span");
    timerDisplay.textContent = `${task.time}分00秒`; // ⏳ ユーザーが選択した時間をセット

    // スタートボタン
    const startBtn = document.createElement("button");
    startBtn.textContent = "スタート";

    // ストップボタン
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "ストップ";

    // 一時停止ボタン
    const pauseBtn = document.createElement("button");
    pauseBtn.textContent = "一時停止";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";  // 削除ボタンの作成

    // タイマー機能
    let timeLeft = task.time * 60; // 25分を秒に変換←初期値
    let intervalId = null;

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}分${String(seconds).padStart(2, "0")}秒`;
    }

    startBtn.addEventListener("click", () => {
        if (intervalId === null) {
            intervalId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(intervalId);
                    intervalId = null;
                    alert(`${task.text} の時間が終わったのでリストから消します！`);
                    taskList.removeChild(li);

                    // ローカルストレージから削除
                    const tasks = getTasks().filter(t => t.text !== task.text);
                    saveTasks(tasks);
                }
            }, 1000);
        }
    });

    stopBtn.addEventListener("click", () => {
        clearInterval(intervalId);
        intervalId = null;
        timeLeft = task.time * 60; // 初期値にリセット
        updateTimer();
    });

    pauseBtn.addEventListener("click", () => {
        clearInterval(intervalId);
        intervalId = null;
    });

// 削除ボタンをクリックした時の処理
    deleteBtn.addEventListener("click", () => {
// タスクをローカルストレージから削除
     const tasks = getTasks().filter(t => t.text !== task.text);
    saveTasks(tasks);

// タスクをHTMLから削除
    taskList.removeChild(li);
});

    li.appendChild(taskText);
    li.appendChild(timerDisplay);
    li.appendChild(startBtn);
    li.appendChild(stopBtn);
    li.appendChild(pauseBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// ページ読み込み時にローカルストレージから復元
window.addEventListener("load", () => {
    getTasks().forEach(task => addTaskToDOM(task));
});

// ボタンクリック時の処理
addBtn.addEventListener("click", () => {
    const taskValue = inputTask.value.trim();
    const taskTime = parseInt(inputTime.value, 10);

    if (taskValue === "" || isNaN(taskTime) || taskTime <= 0) return;

    const newTask = { text: taskValue, time: taskTime };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    addTaskToDOM(newTask);  // HTMLに追加

    inputTask.value = "";
});





// addBtn.addEventListener("click", () => {
//     const taskValue = inputTask.value.trim();
//     const taskTime = parseInt(inputTime.value,10);
//     if(taskValue === "" || isNaN(taskTime) || taskTime <= 0) return;

//     //タスクの要素を作成
//     const li = document.createElement("li");

//     //タスクが追加されるやつの名前
//     const taskText = document.createElement("span");
//     taskText.textContent = taskValue;

//     //タイマー表示
//     const timerDisplay =document.createElement("span");
//     timerDisplay.textContent = `${taskTime}分00秒`; // ⏳ ユーザーが選択した時間をセット

//     //スタートボタン
//     const startBtn = document.createElement("button");
//     startBtn.textContent = "スタート"

//     //ストップボタン
//     const stopBtn = document.createElement("button");
//     stopBtn.textContent = "ストップ";

//     //一時停止ボタン
//     const pauseBtn = document.createElement("button");
//     pauseBtn.textContent = "一時停止";

//     //タイマー機能
//     let timeLeft = taskTime * 60; // 25分を秒に変換←初期値
//     let intervalId = null;

//     function updateTimer() {
//         let minutes = Math.floor(timeLeft / 60);
//         let seconds = timeLeft % 60;
//         timerDisplay.textContent = `${String(minutes).padStart(2, "0")}分${String(seconds).padStart(2, "0")}秒`;
//     }

//     startBtn.addEventListener("click", () => {
//         if (intervalId === null) {
//             intervalId = setInterval(() => {
//                 if (timeLeft > 0) {
//                     timeLeft--;
//                     updateTimer();
//                 } else {
//                     clearInterval(intervalId);
//                     intervalId = null;
//                     alert(`${taskValue} の時間が終わったのでリストから消します！`);
//                     taskList.removeChild(li);
//                 }
//             }, 1000);//この 1000 があるからこそ、1秒ごとßのカウントダウンになるわけです！
//         }
//     });

//     stopBtn.addEventListener("click", () => {
//         clearInterval(intervalId);
//         intervalId = null;
//         timeLeft = taskTime * 60; // ⏳ 初期値にリセット！
//         updateTimer();
//     });

//     pauseBtn.addEventListener("click", () => {
//         clearInterval(intervalId);
//         intervalId = null;
//     });

//     // タスク要素に追加
//     li.appendChild(taskText);
//     li.appendChild(timerDisplay);
//     li.appendChild(startBtn);
//     li.appendChild(stopBtn);
//     li.appendChild(pauseBtn);

//     taskList.appendChild(li);
//     }
//     window.addEventListener("load", () => {
//         getTasks().forEach(task => addTaskToDOM(task));
//     });
//     inputTask.value = "";
// });

//💡 次にやりたい実像
// カウントダウン終了時にタスクを自動削除する✅
// ローカルストレージを使ってタスクを保存する
// 一時停止ボタンを追加する✅

// カウントダウンを25分以外にも変更できるようにする👇✅
//時間を選択するための <input type="number"> を追加
//ユーザーが選択した時間を取得
//選択した時間を基にタイマーを設定


// taskList.innerHTML = "";//=== は比較、 = は代入！ タスクを消したいなら = を使う 🚀
//これだと全部のリストを消しちゃう


// タスクをローカルストレージで保存したい
// 🎯 やりたいこと
// タスクを追加 したらローカルストレージに保存する
// ページを再読み込み してもタスクが残るようにする
// タスクを削除 したらローカルストレージからも削除する

