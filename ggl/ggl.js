
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext("2d");
let isDrawing = false; // 是否正在绘制涂层
let lastX = 0; // 上一次绘制的X坐标
let lastY = 0; // 上一次绘制的Y坐标
let erasedPixels = 0; // 刮开的像素数

// 绘制灰色画布
function drawGreyCanvas() {
    isDrawing = false;
    lastX = 0;
    lastY = 0;
    erasedPixels = 0;
    context.fillStyle = "grey";
    context.fillRect(0, 0, 400, 300); // 设置画布大小
}

// 初始化时绘制灰色画布
drawGreyCanvas();

// 监听鼠标按下事件
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]; // 更新上一次绘制的坐标
});
//监听触摸按下事件
canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const touch = e.touches[0];
    [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop]; // 更新上一次绘制的坐标
});

// 监听鼠标移动事件
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return; // 如果没有按下鼠标，则不进行绘制

    const [x, y] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    context.globalCompositeOperation = "destination-out"; // 橡皮擦模式
    context.beginPath();
    context.moveTo(lastX, lastY); // 将起始点移动到上一次绘制的位置
    context.lineTo(x, y); // 从上一次绘制的位置画一条线到当前位置
    context.lineWidth = 40; // 设置刮刮乐线的宽度
    context.lineCap = "round"; // 设置线的末端为圆形
    context.stroke(); // 绘制路径

    // 统计刮开的像素数
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    erasedPixels = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] === 0) {
            erasedPixels++;
        }
    }

    [lastX, lastY] = [x, y]; // 更新上一次绘制的坐标

    // 判断刮开的区域是否超过95%
    if (erasedPixels / (canvas.width * canvas.height) >= 0.95) {
        //context.clearRect(0, 0, canvas.width, canvas.height);

    }
});

// 监听触摸移动事件
canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return; // 如果没有按下鼠标，则不进行绘制

    const touch = e.touches[0];
    const [x, y] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
    context.globalCompositeOperation = "destination-out"; // 橡皮擦模式
    context.beginPath();
    context.moveTo(lastX, lastY); // 将起始点移动到上一次绘制的位置
    context.lineTo(x, y); // 从上一次绘制的位置画一条线到当前位置
    context.lineWidth = 40; // 设置刮刮乐线的宽度
    context.lineCap = "round"; // 设置线的末端为圆形
    context.stroke(); // 绘制路径

    // 统计刮开的像素数
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    erasedPixels = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] === 0) {
            erasedPixels++;
        }
    }

    [lastX, lastY] = [x, y]; // 更新上一次绘制的坐标

    // 判断刮开的区域是否超过95%
    if (erasedPixels / (canvas.width * canvas.height) >= 0.95) {
        //context.clearRect(0, 0, canvas.width, canvas.height);

    }
});

// 监听鼠标松开事件
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

// 监听触摸松开事件
canvas.addEventListener("touchend", () => {
    isDrawing = false;
});

// 刷新按钮点击事件处理程序
function refresh() {
    // 移除之前的灰色画布元素
    canvas.parentNode.removeChild(canvas);

    // 创建新的画布元素
    canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width = 400;
    canvas.height = 300;

    //获取maindiv元素的位置，将canvas放到maindiv中
    const maindiv = document.getElementById('maindiv');
    maindiv.appendChild(canvas);

    // 重新获取上下文
    context = canvas.getContext("2d");

    // 绘制新的灰色画布
    drawGreyCanvas();

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]; // 更新上一次绘制的坐标
    });

    // 监听鼠标按下事件
    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]; // 更新上一次绘制的坐标
    });
    //监听触摸按下事件
    canvas.addEventListener("touchstart", (e) => {
        isDrawing = true;
        const touch = e.touches[0];
        [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop]; // 更新上一次绘制的坐标
    });

    // 监听鼠标移动事件
    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return; // 如果没有按下鼠标，则不进行绘制

        const [x, y] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
        context.globalCompositeOperation = "destination-out"; // 橡皮擦模式
        context.beginPath();
        context.moveTo(lastX, lastY); // 将起始点移动到上一次绘制的位置
        context.lineTo(x, y); // 从上一次绘制的位置画一条线到当前位置
        context.lineWidth = 40; // 设置刮刮乐线的宽度
        context.lineCap = "round"; // 设置线的末端为圆形
        context.stroke(); // 绘制路径

        // 统计刮开的像素数
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        erasedPixels = 0;
        for (let i = 3; i < pixelData.length; i += 4) {
            if (pixelData[i] === 0) {
                erasedPixels++;
            }
        }

        [lastX, lastY] = [x, y]; // 更新上一次绘制的坐标

        // 判断刮开的区域是否超过95%
        if (erasedPixels / (canvas.width * canvas.height) >= 0.95) {
            //context.clearRect(0, 0, canvas.width, canvas.height);

        }
    });

    // 监听触摸移动事件
    canvas.addEventListener("touchmove", (e) => {
        if (!isDrawing) return; // 如果没有按下鼠标，则不进行绘制

        const touch = e.touches[0];
        const [x, y] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
        context.globalCompositeOperation = "destination-out"; // 橡皮擦模式
        context.beginPath();
        context.moveTo(lastX, lastY); // 将起始点移动到上一次绘制的位置
        context.lineTo(x, y); // 从上一次绘制的位置画一条线到当前位置
        context.lineWidth = 40; // 设置刮刮乐线的宽度
        context.lineCap = "round"; // 设置线的末端为圆形
        context.stroke(); // 绘制路径

        // 统计刮开的像素数
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        erasedPixels = 0;
        for (let i = 3; i < pixelData.length; i += 4) {
            if (pixelData[i] === 0) {
                erasedPixels++;
            }
        }

        [lastX, lastY] = [x, y]; // 更新上一次绘制的坐标

        // 判断刮开的区域是否超过95%
        if (erasedPixels / (canvas.width * canvas.height) >= 0.95) {
            //context.clearRect(0, 0, canvas.width, canvas.height);

        }
    });

    // 监听鼠标松开事件
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    // 监听触摸松开事件
    canvas.addEventListener("touchend", () => {
        isDrawing = false;
    });

    document.getElementById("number").innerHTML = getRandomNumber(numbers, probabilities) + "元";
}