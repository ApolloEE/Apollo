var countdown = 10; // 设置初始值
var countdownTimer = setInterval(function() {
  if (countdown <= 0) {
    clearInterval(countdownTimer);
    document.getElementById("countdown").innerHTML = "倒计时结束！"; // 修改结束文本提示
  } else {
    document.getElementById("countdown").innerHTML = countdown;
  }
  countdown -= 1;
}, 10); // 每隔1秒执行一次代码