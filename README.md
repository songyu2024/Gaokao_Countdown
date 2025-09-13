# Gaokao Countdown Glassmorphism Wallpaper

<div class="glass-container">
  <div class="language-switcher">
    <button id="cnBtn" class="glass-button active">中文</button>
    <button id="enBtn" class="glass-button">English</button>
  </div>

  <div class="cn-content">

## 项目介绍

一款精美的高考倒计时桌面壁纸，采用液态玻璃(Glassmorphism)设计风格，兼具实用性与美观性。

### 主要功能

- 📅 **精准高考倒计时**：实时显示距离2026年高考的剩余天数、小时、分钟和秒数
- 🌅 **动态壁纸切换**：自动轮换本地壁纸和网络API壁纸，比例为1:3
- 💬 **一言名句**：随机显示励志名言，每10分钟自动更新
- 🌤️ **天气显示**：实时显示当前天气状况和温度
- ⌨️ **键盘快捷键**：支持1-6键快速操作
- 🖱️ **交互体验**：点击卡片切换壁纸/刷新内容，长按跳转到下一张本地壁纸
- 🎨 **玻璃拟态设计**：半透明磨砂玻璃效果，现代简约美感
- 🖼️ **Wallpaper Engine支持**：完美兼容Steam Wallpaper Engine

### 快捷键说明

<div class="glass-table">
  <table>
    <tr>
      <th>快捷键</th>
      <th>功能描述</th>
    </tr>
    <tr>
      <td>1</td>
      <td>刷新fj API背景</td>
    </tr>
    <tr>
      <td>2</td>
      <td>刷新随机API背景（pc或moe）</td>
    </tr>
    <tr>
      <td>3</td>
      <td>刷新一言内容</td>
    </tr>
    <tr>
      <td>4</td>
      <td>显示随机本地壁纸</td>
    </tr>
    <tr>
      <td>5</td>
      <td>刷新pc API背景</td>
    </tr>
    <tr>
      <td>6</td>
      <td>刷新moe API背景</td>
    </tr>
  </table>
</div>

### 安装与使用

1. **本地使用**
   - 克隆或下载本项目
   - 双击 `index.html` 文件即可在浏览器中打开使用
   - 推荐使用Chrome或Edge浏览器以获得最佳体验

2. **Wallpaper Engine使用**
   - 下载并安装 [Steam Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)
   - 点击"从文件打开"，选择项目文件夹中的 `index.html` 文件
   - 壁纸将自动应用到您的桌面

### 自定义设置

1. **修改目标日期**
   - 打开 `script.js` 文件
   - 修改第一行的目标日期：`const targetDate = new Date("2026-06-07T00:00:00");`

2. **添加本地壁纸**
   - 将图片文件放入 `assets` 文件夹
   - 打开 `script.js` 文件
   - 在 `localWallpapers` 数组中添加新的图片路径

3. **调整壁纸比例**
   - 打开 `script.js` 文件
   - 找到 `getRandomWallpaperSource` 函数
   - 修改 `weightedOptions` 数组以调整本地壁纸和网络API壁纸的比例

### 技术栈

<div class="tech-stack">
  <div class="tech-item">
    <span class="tech-icon">📄</span>
    <span>HTML5</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🎨</span>
    <span>CSS3</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">⚙️</span>
    <span>JavaScript</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">📱</span>
    <span>响应式设计</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🪟</span>
    <span>Glassmorphism</span>
  </div>
</div>

### 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件

### 致谢

- 一言API提供随机句子内容
- Wallpaper Engine提供壁纸引擎支持
- 各类图片API提供网络壁纸资源

  </div>

  <div class="en-content" style="display: none;">

## Project Introduction

A beautiful Gaokao countdown desktop wallpaper with glassmorphism design style, combining practicality and aesthetics.

### Key Features

- 📅 **Precise Gaokao Countdown**: Real-time display of days, hours, minutes and seconds remaining until the 2026 college entrance examination
- 🌅 **Dynamic Wallpaper Switching**: Automatically rotate local wallpapers and network API wallpapers in a 1:3 ratio
- 💬 **Hitokoto Quotes**: Randomly display inspirational quotes, auto-refresh every 10 minutes
- 🌤️ **Weather Display**: Show current weather conditions and temperature
- ⌨️ **Keyboard Shortcuts**: Support 1-6 key quick operations
- 🖱️ **Interactive Experience**: Click cards to switch wallpapers/refresh content, long press to jump to next local wallpaper
- 🎨 **Glassmorphism Design**: Translucent frosted glass effect, modern minimalist aesthetic
- 🖼️ **Wallpaper Engine Support**: Perfectly compatible with Steam Wallpaper Engine

### Shortcut Keys

<div class="glass-table">
  <table>
    <tr>
      <th>Key</th>
      <th>Function Description</th>
    </tr>
    <tr>
      <td>1</td>
      <td>Refresh fj API background</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Refresh random API background (pc or moe)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Refresh Hitokoto content</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Show random local wallpaper</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Refresh pc API background</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Refresh moe API background</td>
    </tr>
  </table>
</div>

### Installation & Usage

1. **Local Use**
   - Clone or download this project
   - Double-click the `index.html` file to open it in a browser
   - Chrome or Edge browser is recommended for the best experience

2. **Wallpaper Engine Use**
   - Download and install [Steam Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/)
   - Click "Open from file" and select the `index.html` file in the project folder
   - The wallpaper will be automatically applied to your desktop

### Customization

1. **Modify Target Date**
   - Open the `script.js` file
   - Modify the target date in the first line: `const targetDate = new Date("2026-06-07T00:00:00");`

2. **Add Local Wallpapers**
   - Place image files in the `assets` folder
   - Open the `script.js` file
   - Add new image paths to the `localWallpapers` array

3. **Adjust Wallpaper Ratio**
   - Open the `script.js` file
   - Find the `getRandomWallpaperSource` function
   - Modify the `weightedOptions` array to adjust the ratio of local wallpapers to network API wallpapers

### Technology Stack

<div class="tech-stack">
  <div class="tech-item">
    <span class="tech-icon">📄</span>
    <span>HTML5</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🎨</span>
    <span>CSS3</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">⚙️</span>
    <span>JavaScript</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">📱</span>
    <span>Responsive Design</span>
  </div>
  <div class="tech-item">
    <span class="tech-icon">🪟</span>
    <span>Glassmorphism</span>
  </div>
</div>

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Acknowledgements

- Hitokoto API for providing random quotes
- Wallpaper Engine for providing wallpaper engine support
- Various image APIs for providing network wallpaper resources

  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const cnBtn = document.getElementById('cnBtn');
    const enBtn = document.getElementById('enBtn');
    const cnContent = document.querySelector('.cn-content');
    const enContent = document.querySelector('.en-content');
    
    cnBtn.addEventListener('click', function() {
      cnContent.style.display = 'block';
      enContent.style.display = 'none';
      cnBtn.classList.add('active');
      enBtn.classList.remove('active');
    });
    
    enBtn.addEventListener('click', function() {
      cnContent.style.display = 'none';
      enContent.style.display = 'block';
      enBtn.classList.add('active');
      cnBtn.classList.remove('active');
    });
  });
</script>

<style>
  /* 全局样式 */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
    overflow-x: hidden;
  }
  
  /* 液态玻璃容器 */
  .glass-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  
  /* 语言切换器 */
  .language-switcher {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }
  
  .glass-button {
    padding: 0.75rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .glass-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
  }
  
  .glass-button.active {
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
  }
  
  /* 标题样式 */
  h1, h2, h3 {
    text-align: center;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  h3 {
    font-size: 1.4rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  /* 内容样式 */
  p, li {
    line-height: 1.6;
    color: white;
  }
  
  ul, ol {
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  /* 玻璃表格 */
  .glass-table {
    width: 100%;
    margin: 1.5rem 0;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .glass-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .glass-table th,
  .glass-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .glass-table th {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
  }
  
  .glass-table tr:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* 技术栈样式 */
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  
  .tech-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .tech-item:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .tech-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  /* 链接样式 */
  a {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  a:hover {
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .glass-container {
      margin: 1rem;
      padding: 1.5rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.2rem;
    }
    
    .tech-stack {
      flex-direction: column;
      align-items: center;
    }
    
    .tech-item {
      width: 80%;
      justify-content: center;
    }
  }
</style>

