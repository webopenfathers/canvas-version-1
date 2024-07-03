<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  .scroll-container {
    overflow: auto;
    height: 200px;
    /* 根据需要设置容器高度 */
    position: relative;
    border: 1px solid #ccc;
  }


  p {
    margin: 0;
    line-height: 1.5em;
    /* 根据需要设置行高 */
  }
</style>

<body>
  <div id="scroll-container" class="scroll-container">
    <div class="scroll-content">
      <!-- 数据内容 -->
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </div>
  </div>
</body>
<script>
  const scrollContainer = document.getElementById('scroll-container');
  let autoScrollInterval = null;


  let scrollTop = 0;
  function startAutoScroll() {
    // 清除之前的滚动定时器
    clearInterval(autoScrollInterval);

    // 设定滚动速度（像素/毫秒）
    const scrollSpeed = 2;

    // 获取内容总高度和容器可见高度
    const scrollContent = scrollContainer.querySelector('.scroll-content');
    const scrollHeight = scrollContent.scrollHeight;
    const containerHeight = scrollContainer.offsetHeight;
    // console.log(scrollHeight, containerHeight);

    // 初始化滚动位置


    // 滚动函数
    autoScrollInterval = setInterval(() => {
      // 如果到达底部，则回到顶部
      if (scrollTop >= scrollHeight - containerHeight) {
        scrollTop = 0;
      } else {
        scrollTop += scrollSpeed;
      }

      // 设置滚动位置
      scrollContainer.scrollTop = scrollTop;
    }, 100); // 设置滚动间隔时间（毫秒）
  }

  // 开始自动滚动
  startAutoScroll();



  // 监听鼠标移入事件
  scrollContainer.addEventListener('mouseenter', () => {
    // 清除自动滚动定时器
    scrollTop = scrollContainer.scrollTop
    clearInterval(autoScrollInterval);
  });


  // 监听鼠标移出事件
  scrollContainer.addEventListener('mouseleave', () => {
    // 恢复自动滚动
    startAutoScroll();
  });

  // 监听滚轮事件，允许用户滚动
  scrollContainer.addEventListener('wheel', (e) => {
    console.log(scrollContainer.scrollTop);
    // 这里可以根据滚轮的方向来控制滚动的方向和速度
    // 但由于已经阻止默认行为，滚动将由浏览器处理
  });


</script>

</html>
