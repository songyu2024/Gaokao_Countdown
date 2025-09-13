const targetDate = new Date("2026-06-07T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 简化的一言加载函数，使用多个备用API
function loadHitokoto() {
  // 定义一言API数组 - 按优先级排序
  const apiList = [
    // 官方一言API
    { 
      url: "https://v1.hitokoto.cn/",
      handler: (data) => data.hitokoto
    },
    // 备用API1 - vvhan的yiyan接口
    { 
      url: "international.v1.hitokoto.cn",
      handler: (data) => typeof data === 'string' ? data : (data.data || "今天也要加油鸭！")
    },
    // 备用API2 - oick.cn接口
    { 
      url: "https://api.oick.cn/yiyan/api.php",
      handler: (data) => data
    },
    // 备用API3 - 句子API
    { 
      url: "https://saying.api.azwcl.com/saying/get",
      handler: (data) => data.data.content
    },
    // 备用API4 - loliapi
    {
      url: "https://www.loliapi.com/acg/",
      handler: (data) => "随机图片" // 这个API返回图片，所以只显示固定文本
    }
  ];
  
  // 递归尝试API
  function tryApi(index) {
    if (index >= apiList.length) {
      // 所有API都失败了，显示默认消息
      document.getElementById("quote").textContent = "今天也要加油鸭！";
      return;
    }
    
    const api = apiList[index];
    console.log(`尝试获取一言 (${index + 1}/${apiList.length}): ${api.url}`);
    
    fetch(api.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API响应错误: ${response.status}`);
        }
        // 检查响应类型，有些API返回纯文本而不是JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(data => {
        try {
          // 如果返回的是字符串但需要JSON，尝试解析
          if (typeof data === 'string' && data.trim().startsWith('{')) {
            data = JSON.parse(data);
          }
          
          const quote = api.handler(data);
          if (quote) {
            document.getElementById("quote").textContent = quote;
          } else {
            throw new Error("无法从响应中获取一言");
          }
        } catch (err) {
          console.error("解析一言数据失败:", err);
          // 尝试下一个API
          tryApi(index + 1);
        }
      })
      .catch(err => {
        console.error(`API (${index + 1}/${apiList.length}) 失败:`, err.message);
        // 尝试下一个API
        tryApi(index + 1);
      });
  }
  
  // 开始尝试第一个API
  tryApi(0);
}

// 加载一言
loadHitokoto();

// 本地壁纸文件列表（支持自动轮换）
let localWallpapers = [
  'assets/1.jpeg',
  'assets/2.jpg',
  'assets/3.png',
  'assets/4.png',
  'assets/5.jpg',
  'assets/6.jpg',
  'assets/7.jpg',
  'assets/8.jpg',
  'assets/9.jpg',
  'assets/10.jpg',
  'assets/11.jpg',
  'assets/12.jpg'
];
let currentLocalWallpaperIndex = 0; // 当前本地壁纸索引

// 顺序获取下一张本地壁纸
function getNextLocalWallpaper() {
  if (localWallpapers.length === 0) {
    return null;
  }
  
  // 获取当前索引的壁纸
  const wallpaper = localWallpapers[currentLocalWallpaperIndex];
  
  // 更新索引，循环轮换
  currentLocalWallpaperIndex = (currentLocalWallpaperIndex + 1) % localWallpapers.length;
  
  return wallpaper;
}

// API壁纸配置 - 只保留fj和pc, moe, moez供天气卡片使用
const apiWallpapers = ["fj", "pc", "moe", "moez"];

// 背景图API状态跟踪
let currentBackgroundApi = "fj"; // 默认使用"fj" API

// 天气卡片点击时的API列表 - 修改为只包含pc和moe
const weatherBackgroundApis = ["pc", "moe"];

// 从数组中随机获取一个元素的辅助函数
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// 添加或更新本地壁纸
function addLocalWallpaper(filePath) {
  // 检查文件是否已经在列表中
  if (!localWallpapers.includes(filePath)) {
    localWallpapers.push(filePath);
    console.log('添加新本地壁纸:', filePath, '当前总数:', localWallpapers.length);
  }
}

// 按比例随机选择壁纸类型，本地壁纸和网络API壁纸比例为1:3
function getRandomWallpaperSource() {
  // 25%概率选择本地壁纸，75%概率选择网络API壁纸
  const weightedOptions = ['local', 'pc', 'fj', 'fj'];
  return getRandomElement(weightedOptions);
}

// 获取随机壁纸URL - 包含本地、fj API和pc API
function getRandomWallpaper() {
  const sourceType = getRandomWallpaperSource();
  
  if (sourceType === 'local') {
    // 返回本地壁纸
    const randomLocal = getRandomElement(localWallpapers);
    console.log('选择本地壁纸:', randomLocal);
    return {
      type: 'local',
      url: randomLocal
    };
  } else if (sourceType === 'pc') {
    // 返回pc API壁纸
    const apiUrl = `https://t.alcy.cc/pc?timestamp=${new Date().getTime()}`;
    console.log('选择pc API壁纸');
    return {
      type: 'api',
      url: apiUrl,
      api: 'pc'
    };
  } else {
    // 返回fj API壁纸
    const apiUrl = `https://t.alcy.cc/fj?timestamp=${new Date().getTime()}`;
    console.log('选择fj API壁纸');
    return {
      type: 'api',
      url: apiUrl,
      api: 'fj'
    };
  }
}

// 节流控制 - 记录上次操作时间
let lastBackgroundChange = 0;
let lastQuoteChange = 0;
const THROTTLE_DELAY = 2000; // 2秒内不重复操作

// 清除所有动画类的辅助函数
function clearAllAnimationClasses(element) {
  if (!element) return;
  element.classList.remove('click-animation', 'long-press-start', 'long-press-trigger', 'long-press-end', 'long-press-cancel');
}

// 点击动画函数 - 使用CSS类
function addClickAnimation(element) {
  if (!element) return;
  
  clearAllAnimationClasses(element);
  element.classList.add('click-animation');
  
  // 100ms后恢复原状
  setTimeout(() => {
    element.classList.remove('click-animation');
  }, 100);
}

// 长按开始动画函数 - 使用CSS类
function startLongPressAnimation(element) {
  if (!element) return;
  
  clearAllAnimationClasses(element);
  element.classList.add('long-press-start');
}

// 长按触发动画函数 - 使用CSS类
function triggerLongPressAnimation(element) {
  if (!element) return;
  
  clearAllAnimationClasses(element);
  element.classList.add('long-press-trigger');
  
  // 200ms后切换到稍微缩小的状态
  setTimeout(() => {
    if (element.classList.contains('long-press-trigger')) {
      element.classList.remove('long-press-trigger');
      element.classList.add('long-press-start');
    }
  }, 200);
}

// 长按结束动画函数 - 使用CSS类
function endLongPressAnimation(element) {
  if (!element) return;
  
  clearAllAnimationClasses(element);
  element.classList.add('long-press-end');
  
  // 400ms后完全恢复原状
  setTimeout(() => {
    element.classList.remove('long-press-end');
  }, 400);
}

// 取消长按动画函数 - 使用CSS类
function cancelLongPressAnimation(element) {
  if (!element) return;
  
  clearAllAnimationClasses(element);
  element.classList.add('long-press-cancel');
  
  // 300ms后恢复原状
  setTimeout(() => {
    element.classList.remove('long-press-cancel');
  }, 300);
}

// 点击更新背景图片
function refreshBackground(apiType, forceLocal = false) {
  const now = new Date().getTime();
  if (now - lastBackgroundChange < THROTTLE_DELAY) {
    console.log("操作太频繁，请稍后再试");
    return;
  }
  
  lastBackgroundChange = now;
  const bgImage = document.getElementById('bg');
  
  if (forceLocal) {
    // 强制使用本地壁纸
    if (localWallpapers.length > 0) {
      const wallpaper = getNextLocalWallpaper();
      bgImage.src = wallpaper;
      console.log('长按触发 - 跳转到下一张本地壁纸:', wallpaper);
    }
  } else if (apiType) {
    // 天气卡片指定API类型
    currentBackgroundApi = apiType;
    const apiUrl = `https://t.alcy.cc/${apiType}?timestamp=${new Date().getTime()}`;
    loadImageWithFallback(bgImage, apiUrl, apiType);
    console.log('天气卡片点击 - 采用指定API:', apiType);
  } else {
    // 根据权重选择壁纸类型，本地壁纸和网络API壁纸比例为1:3
    const rand = Math.random();
    
    if (rand < 0.25) {
      // 25%的概率使用本地壁纸
      if (localWallpapers.length > 0) {
        const randomIndex = Math.floor(Math.random() * localWallpapers.length);
        bgImage.src = localWallpapers[randomIndex];
        console.log('倒计时卡片点击 - 使用本地壁纸:', localWallpapers[randomIndex]);
      } else {
        // 如果没有本地壁纸，使用fj API
        currentBackgroundApi = 'fj';
        const apiUrl = `https://t.alcy.cc/fj?timestamp=${new Date().getTime()}`;
        loadImageWithFallback(bgImage, apiUrl, 'fj');
        console.log('倒计时卡片点击 - 仅使用fj API');
      }
    } else {
      // 75%的概率使用fj API
      currentBackgroundApi = 'fj';
      const apiUrl = `https://t.alcy.cc/fj?timestamp=${new Date().getTime()}`;
      loadImageWithFallback(bgImage, apiUrl, 'fj');
      console.log('倒计时卡片点击 - 仅使用fj API');
    }
  }
}

// 带备用API的图片加载函数
function loadImageWithFallback(imgElement, primaryUrl, apiType) {
  // 创建一个新的Image对象来测试图片加载
  const testImg = new Image();
  
  testImg.onload = function() {
    // 主API成功加载
    imgElement.src = primaryUrl;
    console.log(`${apiType} API 加载成功`);
  };
  
  testImg.onerror = function() {
    // 主API失败，使用备用API
    console.log(`${apiType} API 加载失败，使用备用 loliapi`);
    const fallbackUrl = `https://www.loliapi.com/acg/?timestamp=${new Date().getTime()}`;
    
    // 再次测试备用API
    const fallbackImg = new Image();
    
    fallbackImg.onload = function() {
      imgElement.src = fallbackUrl;
      console.log('备用 loliapi 加载成功');
    };
    
    fallbackImg.onerror = function() {
      // 备用API也失败，使用本地图片
      console.log('备用 loliapi 也失败，使用本地壁纸');
      const randomLocal = getRandomElement(localWallpapers);
      imgElement.src = randomLocal;
    };
    
    fallbackImg.src = fallbackUrl;
  };
  
  // 开始测试主API
  testImg.src = primaryUrl;
}

// 长按控制变量
let longPressTimer = null;
let isLongPress = false;
let longPressElement = null; // 存储长按的元素
const LONG_PRESS_DURATION = 1000; // 1秒

// 长按处理函数
function handleLongPress(element) {
  isLongPress = true;
  console.log("长按触发 - 跳转到下一张本地壁纸");
  triggerLongPressAnimation(element); // 长按触发动画
  refreshBackground(null, true); // forceLocal = true
  
  // 创建并显示提示信息
  const toast = document.createElement('div');
  toast.textContent = '已跳转到下一张本地壁纸';
  toast.style.position = 'fixed';
  toast.style.top = '50%';
  toast.style.left = '50%';
  toast.style.transform = 'translate(-50%, -50%)';
  toast.style.padding = '12px 24px';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = 'white';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '1000';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(toast);
  
  // 淡入显示
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // 3秒后淡出并移除
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// 开始长按计时
function startLongPress(element) {
  isLongPress = false;
  longPressElement = element;
  startLongPressAnimation(element); // 开始长按动画
  longPressTimer = setTimeout(() => handleLongPress(element), LONG_PRESS_DURATION);
}

// 取消长按计时
function cancelLongPress() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  
  // 如果长按已经触发，执行结束动画，否则执行取消动画
  if (longPressElement) {
    if (isLongPress) {
      endLongPressAnimation(longPressElement);
    } else {
      cancelLongPressAnimation(longPressElement);
    }
    longPressElement = null;
  }
}

// 为毛玻璃卡片添加点击和长按事件
document.addEventListener('DOMContentLoaded', function() {
  // 为倒计时卡片添加点击和长按事件
  const glassCard = document.querySelector('.glass-card');
  if (glassCard) {
    glassCard.style.cursor = 'pointer';
    
    // 鼠标事件
    glassCard.addEventListener('mousedown', function(e) {
      e.preventDefault();
      startLongPress(this); // 开始长按，不添加点击动画
    });
    
    glassCard.addEventListener('mouseup', function(e) {
      e.preventDefault();
      const wasLongPress = isLongPress;
      cancelLongPress();
      
      // 如果不是长按，执行普通点击
      if (!wasLongPress) {
        addClickAnimation(this); // 只在普通点击时添加点击动画
        setTimeout(() => {
          refreshBackground(); // 普通点击 - 使用fj API
        }, 50);
      }
    });
    
    glassCard.addEventListener('mouseleave', function() {
      cancelLongPress();
    });
    
    // 触摸事件（移动设备支持）
    glassCard.addEventListener('touchstart', function(e) {
      e.preventDefault();
      startLongPress(this); // 开始长按，不添加点击动画
    });
    
    glassCard.addEventListener('touchend', function(e) {
      e.preventDefault();
      const wasLongPress = isLongPress;
      cancelLongPress();
      
      // 如果不是长按，执行普通点击
      if (!wasLongPress) {
        addClickAnimation(this); // 只在普通点击时添加点击动画
        setTimeout(() => {
          refreshBackground(); // 普通点击 - 使用fj API
        }, 50);
      }
    });
    
    glassCard.addEventListener('touchcancel', function() {
      cancelLongPress();
    });
  }
  
  // 为天气卡片添加点击事件 - 从pc和moe中随机选择
  const weatherCard = document.querySelector('.weather-card');
  if (weatherCard) {
    weatherCard.style.cursor = 'pointer';
    weatherCard.addEventListener('click', function() {
      addClickAnimation(this); // 添加点击动画
      const randomApi = getRandomElement(weatherBackgroundApis); // 现在只包含pc和moe
      refreshBackground(randomApi);
    });
  }
  
  // 为一言卡片添加点击事件 - 刷新一言内容
  const quoteCard = document.querySelector('.quote-card');
  if (quoteCard) {
    quoteCard.style.cursor = 'pointer';
    quoteCard.addEventListener('click', function() {
      addClickAnimation(this); // 添加点击动画
      document.getElementById('quote').textContent = "加载中...";
      loadHitokoto();
    });
  }
});

// 天气获取和显示功能
function fetchWeather() {
  // 尝试主API
  fetch('https://api.vvhan.com/api/weather')
    .then(response => {
      if (!response.ok) {
        throw new Error(`天气API响应错误: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('天气数据:', data);
      
      // 检查是否有天气数据
      if (data && data.data) {
        // 获取天气类型
        const weatherType = data.data.type || '未知';
        
        // 获取温度（最高温/最低温）
        const highTemp = data.data.high || '--';
        const lowTemp = data.data.low || '--';
        
        // 更新显示
        document.getElementById('weather-type').textContent = weatherType;
        document.getElementById('weather-temp').textContent = `${highTemp}/${lowTemp}`;
      } else {
        throw new Error('无法获取天气数据');
      }
    })
    .catch(error => {
      console.error('获取天气失败:', error.message);
      // 改进错误处理，当API失败时保持上次的天气数据不变，而不是显示"获取失败"
      console.log('保持上次的天气数据不变');
      // 只在控制台显示错误，不更新UI，避免用户看到频繁的"获取失败"
    });
}

// 初始加载天气数据
fetchWeather();

// 设置1小时刷新一次天气
setInterval(fetchWeather, 60 * 60 * 1000);

// 为 Wallpaper Engine 添加支持
if (window.wallpaperRegisterAudioListener) {
  // 支持 Wallpaper Engine 音频可视化
  window.wallpaperRegisterAudioListener && window.wallpaperRegisterAudioListener(audioArray => {
    // 这里可以根据音频数据添加效果
    // audioArray 包含音频频谱数据
  });
}

// 添加全屏适配支持
window.addEventListener('resize', function() {
  // 页面调整大小时重新计算布局
  // 可以在这里添加代码调整元素大小或位置
});

// Wallpaper Engine 专用点击处理 - 更新长按动画逻辑
(function() {
  let isWallpaperEngine = false;

  if (window.wallpaperRegisterAudioListener || 
      window.wallpaperRegisterClickEvent) {
    isWallpaperEngine = true;
    console.log("检测到 Wallpaper Engine 环境");
  }

  window.onload = function() {
    const glassCard = document.querySelector('.glass-card');
    const weatherCard = document.querySelector('.weather-card');
    const quoteCard = document.querySelector('.quote-card');
    
    console.log("页面加载完成，元素状态:", {
      glassCard: !!glassCard,
      weatherCard: !!weatherCard,
      quoteCard: !!quoteCard,
      isWallpaperEngine: isWallpaperEngine
    });

    // Wallpaper Engine 环境下的长按支持
    let wallpaperLongPressTimer = null;
    let wallpaperIsLongPress = false;
    let wallpaperLongPressElement = null;

    if (isWallpaperEngine && window.wallpaperRegisterClickEvent) {
      console.log("注册 Wallpaper Engine 点击事件");
      
      try {
        // 注册鼠标按下事件
        if (window.wallpaperRegisterMouseDownEvent) {
          window.wallpaperRegisterMouseDownEvent(function(x, y) {
            if (isClickedOn(x, y, glassCard)) {
              wallpaperIsLongPress = false;
              wallpaperLongPressElement = glassCard;
              startLongPressAnimation(glassCard); // 开始长按动画
              wallpaperLongPressTimer = setTimeout(() => {
                wallpaperIsLongPress = true;
                console.log("Wallpaper Engine 长按触发");
                triggerLongPressAnimation(glassCard); // 长按触发动画
                refreshBackground(null, true); // 强制本地壁纸
              }, LONG_PRESS_DURATION);
            }
          });
        }

        // 注册鼠标释放/点击事件
        window.wallpaperRegisterClickEvent(function(x, y) {
          console.log("Wallpaper Engine 点击事件触发:", x, y);
          
          // 清除长按计时器
          if (wallpaperLongPressTimer) {
            clearTimeout(wallpaperLongPressTimer);
            wallpaperLongPressTimer = null;
          }
          
          // 处理长按动画结束
          if (wallpaperLongPressElement) {
            if (wallpaperIsLongPress) {
              endLongPressAnimation(wallpaperLongPressElement);
            } else {
              cancelLongPressAnimation(wallpaperLongPressElement);
            }
            wallpaperLongPressElement = null;
          }
          
          // 检查点击位置并执行相应操作
          if (isClickedOn(x, y, glassCard)) {
            if (!wallpaperIsLongPress) {
              console.log("Wallpaper Engine 普通点击 - 倒计时卡片");
              refreshBackground(); // 普通点击使用fj API
            }
          } 
          else if (isClickedOn(x, y, weatherCard)) {
            console.log("Wallpaper Engine 点击了天气卡片");
            const randomApi = getRandomElement(weatherBackgroundApis); // 只从pc和moe中选择
            refreshBackground(randomApi);
          }
          else if (isClickedOn(x, y, quoteCard)) {
            console.log("Wallpaper Engine 点击了一言卡片");
            document.getElementById('quote').textContent = "加载中...";
            loadHitokoto();
          }
        });
      } catch (e) {
        console.error("注册 Wallpaper Engine 事件失败:", e);
      }
    }
  };
  
  function isClickedOn(x, y, element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left && 
      x <= rect.right && 
      y >= rect.top && 
      y <= rect.bottom
    );
  }
})();

// 更新键盘快捷键支持
document.addEventListener('keydown', function(event) {
  // 按1键刷新fj API背景
  if (event.key === '1') {
    console.log("按键 1 - 刷新fj API背景");
    refreshBackground(); // 使用fj API
  }
  
  // 按2键刷新背景 (随机天气API - 现在只包含pc和moe)
  if (event.key === '2') {
    console.log("按键 2 - 刷新随机API背景");
    const randomApi = getRandomElement(weatherBackgroundApis);
    refreshBackground(randomApi);
  }
  
  // 按3键刷新一言
  if (event.key === '3') {
    console.log("按键 3 - 刷新一言");
    document.getElementById('quote').textContent = "加载中...";
    loadHitokoto();
  }
  
  // 按4键仅显示本地壁纸
  if (event.key === '4') {
    console.log("按键 4 - 随机本地壁纸");
    refreshBackground(null, true); // 使用新的强制本地壁纸参数
  }
  
  // 按5键刷新pc API背景
  if (event.key === '5') {
    console.log("按键 5 - 刷新pc API背景");
    refreshBackground('pc');
  }
  
  // 按6键刷新moe API背景
  if (event.key === '6') {
    console.log("按键 6 - 刷新moe API背景");
    refreshBackground('moe');
  }
});

// 自动刷新壁纸（每40分钟）- 本地壁纸和网络API壁纸比例为1:3
setInterval(function() {
  console.log("自动刷新壁纸（40分钟定时器）");
  
  // 直接调用refreshBackground函数
  refreshBackground();
  
  console.log('壁纸自动刷新已启动，每40分钟刷新一次');
}, 40 * 60 * 1000); // 40分钟 = 2400000毫秒

// 自动刷新一言（每10分钟）
setInterval(function() {
  console.log("自动刷新一言（10分钟定时器）");
  
  // 更新加载状态
  document.getElementById('quote').textContent = "加载中...";
  
  // 加载新一言
  loadHitokoto();
}, 10 * 60 * 1000); // 10分钟 = 600000毫秒

// 在页面加载完成后立即设置随机背景
window.addEventListener('load', function() {
  console.log("页面加载完成，设置初始背景");
  
  // 自动读取文件夹壁纸并轮换
  
  const wallpaper = getRandomWallpaper();
  const bgImage = document.getElementById('bg');
  
  if (wallpaper.type === 'local') {
    bgImage.src = wallpaper.url;
    console.log('设置初始本地壁纸:', wallpaper.url);
  } else {
    currentBackgroundApi = wallpaper.api;
    loadImageWithFallback(bgImage, wallpaper.url, wallpaper.api);
    console.log('设置初始API壁纸:', wallpaper.api);
  }
});
