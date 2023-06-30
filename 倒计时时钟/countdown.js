var WINDOW_WIDTH = 1024
var WINDOW_HEIGHT = 768
var RADIUS = 8 // 代表每个小圆的半径
var MARGIN_TOP = 60 // 代表每个数字距离画布上边距的距离
var MARGIN_LEFT = 30  // 代表第一个数字距离画布左边距的距离


// var endTime = new Date() // 倒计时截至时间目前不超过4天

// setTime设置毫秒数，距离当前时间向后推一个小时
// endTime.setTime(endTime.getTime() + 3600 * 1000)

var curShowTimeSeconds = 0 // 表示现在倒计时需要多少秒

// 初始化所有小球
var balls = []
var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function () {

  WINDOW_WIDTH = document.body.clientWidth
  WINDOW_HEIGHT = document.body.clientHeight

  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1


  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)


  let canvas = document.getElementById('canvas')
  let context = canvas.getContext('2d')

  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT

  curShowTimeSeconds = getCurrentShowTimeSeconds()

  // 实现一个动画函数

  setInterval(function () {
    // 绘制
    render(context);
    // 渲染
    update()
  }, 50)


}


// 屏幕自适应
window.onresize = function () {

  WINDOW_WIDTH = document.body.clientWidth
  WINDOW_HEIGHT = document.body.clientHeight

  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1


  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)
}


function getCurrentShowTimeSeconds() {
  var curTime = new Date()

  // 今天过了多少秒---时钟
  var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds() // 返回现在的小时数

  return ret
}


// 动画+时间渲染
function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds()

  // 下次时分秒
  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
  var nextSeconds = nextShowTimeSeconds % 60

  // 当前时分秒
  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
  var curSeconds = curShowTimeSeconds % 60


  // 如果秒不相同
  if (nextSeconds != curSeconds) {
    // 时/十位
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10))
    }
    // 时/个位
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10))
    }

    // 分钟/十位
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10))
    }
    // 分钟/个位
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10))
    }

    // 秒钟/十位
    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10))
    }
    // 秒钟/个位
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10))
    }





    curShowTimeSeconds = nextShowTimeSeconds
  }

  // 更新小球
  updateBalls()

  console.log(balls.length)


}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx
    balls[i].y += balls[i].vy
    balls[i].vy += balls[i].g


    //碰撞检测
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS
      balls[i].vy = -balls[i].vy * 0.75
    }
  }



  // 性能优化---不在画布中的小球，从数组中删除
  var cnt = 0
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i]
    }
  }


  // 性能优化---只取300个小球
  while (balls.length > Math.min(300, cnt)) {
    balls.pop()
  }
}


// 添加小球
function addBalls(x, y, num) {

  for (let i = 0; i < digit[num].length; i++) {
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        var IaBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, // 4 / -4
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)] // 0-10不包含10的随机数
        }
        balls.push(IaBall)
      }
    }

  }

}




function render(ctx) {

  // 清除画布
  ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)


  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
  var seconds = curShowTimeSeconds % 60

  // 绘制小时的十位数
  // 7x10 宽度是7位 7*2*(R+1)+1
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)

  // 绘制小时的个位数
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)

  // 绘制冒号：
  // 4x10 宽度是4位 4*2*(R+1)+1
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)


  // 绘制分钟的十位数
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)

  // 绘制分钟的个位数
  // 7x10
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)

  // 绘制冒号：
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)


  // 绘制秒的十位数
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)

  // 绘制秒的个位数
  // 7x10
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)



  // 绘制所有小球
  for (let i = 0; i < balls.length; i++) {
    ctx.fillStyle = balls[i].color


    ctx.beginPath()
    ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
    ctx.closePath()

    ctx.fill()
  }
}


function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = 'rgba(0,102,153)'
  // i代表行数
  for (let i = 0; i < digit[num].length; i++) {
    // j代表列数
    for (let j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        ctx.beginPath()
        ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        ctx.closePath()

        ctx.fill()
      }
    }
  }
}

/**
 * 注：
 * i代表列数，j代表行数
 * 则第(i,j)个圆的圆心位置：
 * CenterX：x+j*2*(R+1)+(R+1)
 * CenterY：y+i*2*(R+1)+(R+1)
 */