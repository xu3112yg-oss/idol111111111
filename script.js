// =============================================
// DOM 引用
// =============================================
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// 设定页
const setupScreen     = $("#setupScreen");
const phoneContainer  = $("#phoneContainer");
const setupBtn        = $("#setupBtn");
const setupHint       = $("#setupHint");
const homeGreeting    = $("#homeGreeting");
const homeSettingsBtn = $("#homeSettingsBtn");

// 设定表单字段
const setStageName = $("#setStageName");
const setRealName  = $("#setRealName");
const setAge       = $("#setAge");
const setHeight    = $("#setHeight");
const setDebutYear = $("#setDebutYear");
const setGroup     = $("#setGroup");

// 安装引导
const installBanner   = $("#installBanner");
const installBtn      = $("#installBtn");
const installTitle    = $("#installTitle");
const installDesc     = $("#installDesc");
// 全局安装条
const globalInstallBar = $("#globalInstallBar");
const gibText          = $("#gibText");
const gibBtn           = $("#gibBtn");

// 应用内
const homeScreen    = $("#homeScreen");
const appView       = $("#appView");
const navTitle      = $("#navTitle");
const navAction     = $("#navAction");
const chatlistItems = $("#chatlistItems");
const feedItems     = $("#feedItems");
const convMessages  = $("#convMessages");
const convInput     = $("#convInput");
const convSend      = $("#convSend");
const appTabs       = $("#appTabs");

const screens = {
  chatlist: $("#screenChatlist"),
  feed:     $("#screenFeed"),
  conv:     $("#screenConversation"),
};

let currentApp    = null;
let currentScreen = "chatlist";
let activeChat    = null;

// =============================================
// 工具函数
// =============================================
function avatarHtml(color, letter) {
  return `<div class="chatlist-avatar" style="background:${color}">${letter}</div>`;
}
function feedAvatarHtml(color, letter) {
  return `<div class="feed-avatar" style="background:${color}">${letter}</div>`;
}

// =============================================
// 模拟数据 —— KakaoTalk（韩文 + 中文翻译）
// =============================================
const data_kakaotalk = {
  tabs: [
    { id: "chatlist", icon: "💬", label: "채팅" },
    { id: "feed",     icon: "◉", label: "스토리" },
  ],
  chatList: [
    {
      id: "kt1", name: "지수", preview: "오늘 연습 잘했어? 완전 멋졌다!", time: "오후 3:21", badge: 2,
      color: "#FF6B6B", letter: "지",
      messages: [
        { from: "other", text: "언니 오늘 무대 영상 봤어!", tr: "姐姐我今天看了你的舞台视频！" },
        { from: "other", text: "완전 대박이야... 소름 돋았어 ㅠㅠ", tr: "太厉害了...我起鸡皮疙瘩了 ㅠㅠ" },
        { from: "self",  text: "고마워~ 오늘 컨디션이 좋았어!", tr: "谢谢～今天状态很好！" },
        { from: "other", text: "맞아맞아! 마지막 고음 부분에서 눈물 날 뻔했어", tr: "对对！最后高音部分我差点哭了" },
      ],
    },
    {
      id: "kt2", name: "민지", preview: "주말에 같이 영화 보러 갈래?", time: "오후 1:05", badge: 0,
      color: "#FFA726", letter: "민",
      messages: [
        { from: "other", text: "야~ 이번 주말에 시간 있어?", tr: "喂～这周末有空吗？" },
        { from: "self",  text: "응! 토요일은 비어있어", tr: "嗯！周六是空的" },
        { from: "other", text: "그럼 토요일에 영화 보러 가자! 신작 나왔더라", tr: "那周六去看电影吧！有新片上映了" },
      ],
    },
    {
      id: "kt3", name: "엄마", preview: "밥은 꼭 챙겨 먹고 다니는 거지?", time: "오전 10:32", badge: 1,
      color: "#66BB6A", letter: "엄",
      messages: [
        { from: "other", text: "아침은 먹었어?", tr: "早饭吃了吗？" },
        { from: "other", text: "요즘 너무 바빠 보이던데 건강이 제일 중요해", tr: "最近看你太忙了，健康最重要" },
        { from: "self",  text: "응 엄마, 오늘 아침도 잘 챙겨 먹었어! 걱정하지 마~", tr: "嗯妈妈，今天早饭也好好吃了！别担心～" },
      ],
    },
    {
      id: "kt4", name: "댄스팀 단톡", preview: "이번 주 안무 영상 올렸습니다 확인해주세요", time: "어제", badge: 12,
      color: "#AB47BC", letter: "팀",
      messages: [
        { from: "other", text: "이번 주 안무 영상 올렸습니다! 다들 확인 부탁드려요", tr: "这周的编舞视频上传了！请大家确认一下" },
        { from: "other", text: "특히 후렴 부분 포인트 안무 수정됐으니 꼭 봐주세요", tr: "特别是副歌部分的重点编舞修改了，一定要看" },
        { from: "self",  text: "확인했습니다! 내일 연습 때 맞춰볼게요", tr: "确认了！明天练习的时候会配合的" },
      ],
    },
    {
      id: "kt5", name: "매니저 오빠", preview: "내일 스케줄 변경됐어 확인해줘", time: "어제", badge: 0,
      color: "#78909C", letter: "M",
      messages: [
        { from: "other", text: "내일 오전 인터뷰가 오후 2시로 변경됐어", tr: "明天上午的采访改到下午2点了" },
        { from: "other", text: "대신 오전에 메이크업 테스트 먼저 진행할게", tr: "上午先进行化妆测试" },
        { from: "self",  text: "알겠습니다! 오빠도 고생 많으세요", tr: "知道了！哥哥也辛苦了" },
      ],
    },
  ],
  feedItems: [
    { user: "지수", color: "#FF6B6B", letter: "지", time: "2시간 전", body: "오늘 연습실에서 언니 직캠 찍었는데 진짜 미쳤다... 이건 꼭 올려야 해 🔥", tr: "今天在练习室拍了姐姐的直拍，真的疯了...这个一定要发 🔥", likes: "24" },
    { user: "민지", color: "#FFA726", letter: "민", time: "5시간 전", body: "주말 영화 추천 받아요! 요즘 대작 너무 많네요 🎬🍿", tr: "求推荐周末电影！最近大片太多了 🎬🍿", likes: "8" },
    { user: "나", color: "#FEE500", letter: "✨", time: "8시간 전", body: "오늘 연습 정말 재밌었다! 팬들 생각하면서 열심히 했어요 💕 곧 좋은 소식 있을지도?", tr: "今天练习真的很开心！想着粉丝们努力练习了 💕 可能很快有好消息？", likes: "156" },
    { user: "댄서 오빠", color: "#5C6BC0", letter: "춤", time: "12시간 전", body: "이번 안무 포인트는 '나비'예요 🦋 다들 잘 따라와줘서 고마워요!", tr: "这次编舞的重点是'蝴蝶' 🦋 大家都跟得很好，谢谢！", likes: "42" },
  ],
};

// =============================================
// Instagram（英文 + 中文翻译）
// =============================================
const data_instagram = {
  tabs: [
    { id: "chatlist", icon: "✉", label: "DM" },
    { id: "feed",     icon: "▣", label: "Feed" },
  ],
  chatList: [
    {
      id: "ig1", name: "kim_minjee", preview: "Your stage today was incredible!", time: "3m", badge: 2,
      color: "linear-gradient(135deg, #f09433,#e6683c,#dc2743)", letter: "K",
      messages: [
        { from: "other", text: "Hanon unnie!! I saw your fancam today 🔥", tr: "花音姐姐！！我今天看了你的直拍 🔥" },
        { from: "other", text: "The way you hit that high note... chills literally", tr: "你那个高音的处理方式...真的浑身起鸡皮疙瘩" },
        { from: "self",  text: "Aww thank you so much! I was so nervous today 😭", tr: "哇太感谢了！我今天超紧张的 😭" },
        { from: "other", text: "Nervous?? You looked so confident! Best stage yet fr", tr: "紧张？？你看起来超级自信！迄今为止最好的舞台" },
      ],
    },
    {
      id: "ig2", name: "hanon_global", preview: "New fan project details inside!", time: "1h", badge: 5,
      color: "linear-gradient(135deg, #833AB4,#5851DB,#405DE6)", letter: "H",
      messages: [
        { from: "other", text: "Hi! We're organizing a birthday project for you 💜", tr: "嗨！我们在为你组织生日应援项目 💜" },
        { from: "other", text: "Fans from 12 countries are participating! Would you like to see the plan?", tr: "来自12个国家的粉丝都在参与！你想看看计划吗？" },
        { from: "self",  text: "Oh wow... 12 countries?? I'm honestly speechless 🥺", tr: "哇...12个国家？？我真的说不出话了 🥺" },
      ],
    },
    {
      id: "ig3", name: "music_stan_07", preview: "Question about your new album", time: "3h", badge: 0,
      color: "linear-gradient(135deg, #FCAF45,#F77737)", letter: "M",
      messages: [
        { from: "other", text: "Hey! Is the new album going to have any English tracks?", tr: "嘿！新专辑会有英文歌吗？" },
        { from: "self",  text: "Hmm I can't spoil too much but... maybe? 👀", tr: "嗯我不能剧透太多但是...也许？ 👀" },
        { from: "other", text: "OMG THE WAY I SCREAMED", tr: "天哪我直接尖叫了" },
      ],
    },
    {
      id: "ig4", name: "fashion_idol", preview: "Where did you get that jacket?", time: "5h", badge: 0,
      color: "linear-gradient(135deg, #dc2743,#cc2366,#bc1888)", letter: "F",
      messages: [
        { from: "other", text: "That jacket from yesterday's airport photos... NEED", tr: "昨天机场照那件外套...必须拥有" },
        { from: "self",  text: "Haha it's from a Korean brand! I'll tag them on my next post", tr: "哈哈是一个韩国品牌！我下次发帖会标记他们的" },
      ],
    },
    {
      id: "ig5", name: "daily_hanon_jp", preview: "日本から応援しています！", time: "8h", badge: 1,
      color: "linear-gradient(135deg, #E1306C,#C13584)", letter: "日",
      messages: [
        { from: "other", text: "花音さん、こんにちは！日本のファンです！", tr: "花音小姐，你好！我是日本粉丝！" },
        { from: "other", text: "来月の東京公演、チケット当たりました！嬉しいです！", tr: "下个月东京公演，我抽中票了！好开心！" },
        { from: "self",  text: "わあ、ありがとうございます！東京で会いましょうね 💕", tr: "哇，谢谢！东京见吧 💕" },
      ],
    },
  ],
  feedItems: [
    { user: "hanon_official", color: "linear-gradient(135deg,#f09433,#dc2743)", letter: "✨", time: "2h",
      body: "Today's stage was so much fun! Thank you to all the fans who came 💜", tr: "今天的舞台太有趣了！感谢所有到场的粉丝 💜", likes: "23,481", img: "🎤✨" },
    { user: "music_stan_07", color: "linear-gradient(135deg,#FCAF45,#F77737)", letter: "M", time: "5h",
      body: "Just uploaded my reaction to Hanon's new stage on my story 📹", tr: "刚在快拍上传了我对花音新舞台的反应视频 📹", likes: "847", img: null },
    { user: "kpop_news_daily", color: "linear-gradient(135deg,#405DE6,#5851DB)", letter: "K", time: "8h",
      body: "BREAKING: Hanon's fancam hits 1M views in 6 hours, trending #2 worldwide 🌍🔥", tr: "快讯：花音直拍6小时破百万观看，全球趋势第2 🌍🔥", likes: "5,203", img: "📊" },
    { user: "hanon_stylist", color: "linear-gradient(135deg,#e6683c,#FCAF45)", letter: "S", time: "12h",
      body: "Today's stage outfit details 👗 Custom-made dress inspired by cherry blossoms 🌸", tr: "今天舞台服装细节 👗 樱花灵感定制连衣裙 🌸", likes: "3,102", img: "👗" },
  ],
};

// =============================================
// 微信（中文为主，翻译为中文显示相同内容）
// =============================================
const data_wechat = {
  tabs: [
    { id: "chatlist", icon: "💬", label: "微信" },
    { id: "feed",     icon: "◉", label: "朋友圈" },
  ],
  chatList: [
    {
      id: "wx1", name: "经纪人周姐", preview: "明天的采访提纲发你了，记得看", time: "15:32", badge: 3,
      color: "#FF6D00", letter: "周",
      messages: [
        { from: "other", text: "花音，明天的采访提纲我发你邮箱了", tr: "花音，明天的采访提纲我发你邮箱了" },
        { from: "other", text: "大概有15个问题，你先看看有没有不想回答的", tr: "大概有15个问题，你先看看有没有不想回答的" },
        { from: "self",  text: "好的周姐，我今晚就看", tr: "好的周姐，我今晚就看" },
        { from: "other", text: "另外明天穿那套蓝色连衣裙，造型师已经准备好了", tr: "另外明天穿那套蓝色连衣裙，造型师已经准备好了" },
      ],
    },
    {
      id: "wx2", name: "妈妈", preview: "记得按时吃饭，看你又瘦了", time: "12:10", badge: 0,
      color: "#E91E63", letter: "妈",
      messages: [
        { from: "other", text: "花音啊，最近有没有好好吃饭？", tr: "花音啊，最近有没有好好吃饭？" },
        { from: "other", text: "我看你照片又瘦了，别太拼了", tr: "我看你照片又瘦了，别太拼了" },
        { from: "self",  text: "妈，我有好好吃的！只是最近运动量大了一点", tr: "妈，我有好好吃的！只是最近运动量大了一点" },
      ],
    },
    {
      id: "wx3", name: "宣传组工作群", preview: "新海报设计方案已出，大家投票", time: "11:45", badge: 8,
      color: "#4CAF50", letter: "宣",
      messages: [
        { from: "other", text: "各位，新专辑宣传海报三个方案都出来了", tr: "各位，新专辑宣传海报三个方案都出来了" },
        { from: "other", text: "A方案偏甜美，B方案偏成熟，C方案走概念风", tr: "A方案偏甜美，B方案偏成熟，C方案走概念风" },
        { from: "self",  text: "三个都好棒！我个人倾向B，跟新歌风格比较搭", tr: "三个都好棒！我个人倾向B，跟新歌风格比较搭" },
      ],
    },
    {
      id: "wx4", name: "粉丝后援会会长", preview: "生日应援方案请确认一下", time: "昨天", badge: 0,
      color: "#2196F3", letter: "会",
      messages: [
        { from: "other", text: "花音你好！今年生日应援的方案我们整理好了", tr: "花音你好！今年生日应援的方案我们整理好了" },
        { from: "other", text: "有地铁广告、公益捐赠、还有咖啡车应援三个部分", tr: "有地铁广告、公益捐赠、还有咖啡车应援三个部分" },
        { from: "self",  text: "天哪太用心了！不过公益捐赠可以多一些，不用太铺张", tr: "天哪太用心了！不过公益捐赠可以多一些，不用太铺张" },
      ],
    },
    {
      id: "wx5", name: "舞蹈老师李姐", preview: "新的编舞视频我发你了", time: "昨天", badge: 1,
      color: "#9C27B0", letter: "李",
      messages: [
        { from: "other", text: "花音，新歌的编舞框架出来了", tr: "花音，新歌的编舞框架出来了" },
        { from: "other", text: "这次加入了现代舞元素，你看下视频", tr: "这次加入了现代舞元素，你看下视频" },
        { from: "self",  text: "收到！我现在就看", tr: "收到！我现在就看" },
      ],
    },
  ],
  feedItems: [
    { user: "经纪人周姐", color: "#FF6D00", letter: "周", time: "1小时前", body: "今天录制非常顺利，感谢所有工作人员的配合！期待成品 ✨", tr: "今天录制非常顺利，感谢所有工作人员的配合！期待成品 ✨", likes: null, img: "🎬" },
    { user: "我", color: "#2BBF6A", letter: "花", time: "3小时前", body: "真的好喜欢今天录音室的感觉...新歌里有我想对粉丝说的所有话 💚", tr: "真的好喜欢今天录音室的感觉...新歌里有我想对粉丝说的所有话 💚", likes: "328", img: null },
    { user: "宣传组小陈", color: "#4CAF50", letter: "陈", time: "5小时前", body: "新海报定稿了！这一版真的太美了，迫不及待想让大家看到 😍", tr: "新海报定稿了！这一版真的太美了，迫不及待想让大家看到 😍", likes: "56", img: "🖼" },
    { user: "舞蹈老师李姐", color: "#9C27B0", letter: "李", time: "昨天", body: "这次的编舞融入了很多故事性，不只是跳舞，是用身体在讲述 💃", tr: "这次的编舞融入了很多故事性，不只是跳舞，是用身体在讲述 💃", likes: "89", img: null },
  ],
};

// =============================================
// X（英文 + 中文翻译）
// =============================================
const data_twitter = {
  tabs: [
    { id: "chatlist", icon: "✉", label: "Messages" },
    { id: "feed",     icon: "🏠", label: "Timeline" },
  ],
  chatList: [
    {
      id: "x1", name: "@hanon_updates", preview: "Your fancam is going viral rn", time: "2m", badge: 4,
      color: "#1d9bf0", letter: "@",
      messages: [
        { from: "other", text: "Did you see?? The fancam from today has 800k already 🔥", tr: "你看到了吗？？今天的直拍已经80万观看了 🔥" },
        { from: "other", text: "People are going crazy over the high note part", tr: "大家都在为那个高音疯狂" },
        { from: "self",  text: "Wait really?? I just finished the show omg", tr: "等等真的吗？？我刚结束表演天哪" },
      ],
    },
    {
      id: "x2", name: "@music_review_kr", preview: "Would love to interview you!", time: "1h", badge: 0,
      color: "#F91880", letter: "@",
      messages: [
        { from: "other", text: "Hi Hanon! I'm a music journalist from Seoul Beats. Would you be interested in a short interview?", tr: "嗨花音！我是首尔Beats的音乐记者。你有兴趣做一次简短的采访吗？" },
        { from: "self",  text: "Oh sure! Let me connect you with my manager", tr: "当然！让我帮你联系我的经纪人" },
      ],
    },
    {
      id: "x3", name: "@global_fanbase", preview: "Birthday project update 🌸", time: "3h", badge: 2,
      color: "#00ba7c", letter: "@",
      messages: [
        { from: "other", text: "The birthday billboard in Times Square is confirmed!! 🎉", tr: "时代广场的生日广告牌确认了！！ 🎉" },
        { from: "other", text: "It'll run for 3 days starting from your birthday", tr: "从你生日开始连播三天" },
        { from: "self",  text: "TIMES SQUARE?? You guys are insane... (in the best way) 😭💕", tr: "时代广场？？你们疯了吧...（褒义） 😭💕" },
      ],
    },
    {
      id: "x4", name: "@stage_designer", preview: "Concepts for your next tour", time: "5h", badge: 0,
      color: "#8B5CF6", letter: "@",
      messages: [
        { from: "other", text: "Here are some initial concepts for the tour stage. Thoughts?", tr: "这是巡演舞台的一些初步概念。你觉得怎么样？" },
        { from: "self",  text: "These look amazing! I love the one with the floating platforms", tr: "这些看起来太棒了！我喜欢那个有悬浮平台的设计" },
      ],
    },
    {
      id: "x5", name: "@jpn_fanclub", preview: "日本ツアーの準備進んでいます！", time: "12h", badge: 1,
      color: "#EF4444", letter: "@",
      messages: [
        { from: "other", text: "花音さん！日本ツアーのフラワースタンド企画が始まりました！", tr: "花音小姐！日本巡演的花篮企划开始了！" },
        { from: "self",  text: "本当にありがとうございます！皆さんの応援が力になります 🌸", tr: "真的非常感谢！大家的支持是我的力量 🌸" },
      ],
    },
  ],
  feedItems: [
    { user: "@kcharts_today", color: "#1d9bf0", letter: "@", time: "2h",
      body: "#Hanon's new stage fancam surpasses 1.2M views in 4 hours, currently #5 trending on YouTube Korea 🔥📈",
      tr: "#花音 新舞台直拍4小时破120万观看，目前韩国YouTube趋势第5 🔥📈", likes: "2.4K", rt: "890" },
    { user: "@fan_account", color: "#F91880", letter: "@", time: "4h",
      body: "i literally cannot stop watching this performance. the vocals, the dance, the stage presence... hanon was BORN for this 😭✨",
      tr: "我真的停不下来反复看这个舞台。唱功、舞蹈、舞台表现力...花音天生就是为舞台而生的 😭✨", likes: "567", rt: "123" },
    { user: "@idol_news_daily", color: "#00ba7c", letter: "@", time: "6h",
      body: "EXCLUSIVE: Hanon hints at new album during backstage interview — \"This one is really personal, I wrote most of the lyrics myself\"",
      tr: "独家：花音在后台采访中暗示新专辑——\"这次真的很私人，大部分歌词都是我自己写的\"", likes: "3.1K", rt: "1.2K" },
    { user: "@me", color: "#1d9bf0", letter: "✨", time: "8h",
      body: "thank you for all the love today. reading your messages backstage made me tear up a little. you're the reason I do this 🤍",
      tr: "谢谢今天所有的爱。在后台读到你们的消息让我有点泪目。你们是我做这一切的理由 🤍", likes: "15.8K", rt: "4.2K" },
  ],
};

// =============================================
// Bubble —— 偶像视角（使用者是偶像，收到粉丝消息）
// =============================================
const data_bubble = {
  tabs: [
    { id: "chatlist", icon: "💬", label: "Chats" },
    { id: "feed",     icon: "♡", label: "Bubble" },
  ],
  chatList: [
    // 这些是订阅了使用者（花音）Bubble 的粉丝
    {
      id: "bb1", name: "별하나", preview: "언니 오늘 무대 완전 최고였어요!", time: "방금", badge: 3,
      color: "linear-gradient(135deg, #a18cd1, #fbc2eb)", letter: "별",
      role: "fan", // 标记：这是粉丝
      messages: [
        { from: "fan", text: "언니! 오늘 무대 진짜 최고였어요 ㅠㅠ", tr: "姐姐！今天的舞台真的太棒了 ㅠㅠ" },
        { from: "fan", text: "특히 마지막 곡에서 눈물 날 뻔했어요...", tr: "特别是最后一首歌差点哭了..." },
        { from: "self", text: "고마워요~ 오늘 정말 신경 많이 썼는데 그렇게 말해줘서 힘이 나요 💕", tr: "谢谢～今天真的很用心准备了，听到你这么说给了我力量 💕" },
        { from: "fan", text: "다음 주 팬싸인회에서 꼭 만나요! 제가 쓴 편지 꼭 읽어주세요!", tr: "下周签售会一定要见面！我写的信一定要读哦！" },
        { from: "self", text: "기대할게요! 편지 꼭 읽을게요 약속! 🤙💕", tr: "我会期待的！信一定会读的，约定！ 🤙💕" },
      ],
    },
    {
      id: "bb2", name: "민트초코", preview: "보고 싶어요... 내일 브이라이브 하나요?", time: "5분 전", badge: 1,
      color: "linear-gradient(135deg, #a8e6cf, #88d8b0)", letter: "민",
      role: "fan",
      messages: [
        { from: "fan", text: "언니 안녕하세요! 오늘 하루 어떻게 보내셨어요?", tr: "姐姐你好！今天一天过得怎么样？" },
        { from: "self", text: "오늘은 연습실에서 하루 종일 안무 연습했어요~ 좀 힘들었지만 재밌었어요 ㅎㅎ", tr: "今天在练习室练了一整天舞～虽然有点累但很有趣 嘿嘿" },
        { from: "fan", text: "와... 진짜 고생하셨어요! 제가 커피라도 보내드리고 싶어요 ☕", tr: "哇...真的辛苦了！我想给您送杯咖啡 ☕" },
        { from: "self", text: "아이고 마음만 받을게요~ 그 마음이 더 따뜻해요 💕", tr: "哎呀心意我收下了～这份心意更温暖 💕" },
      ],
    },
    {
      id: "bb3", name: "도쿄팬", preview: "花音さん！日本から応援しています！", time: "15분 전", badge: 0,
      color: "linear-gradient(135deg, #ffd89b, #f7a072)", letter: "東",
      role: "fan",
      messages: [
        { from: "fan", text: "花音さん、こんにちは！いつも応援しています！", tr: "花音小姐，你好！一直在支持你！" },
        { from: "self", text: "ありがとうございます！日本語でメッセージ嬉しいです 🥰", tr: "谢谢！收到日文消息很开心 🥰" },
        { from: "fan", text: "来月の東京コンサート、チケット取れました！初めて生で見られます！", tr: "下个月东京演唱会我抢到票了！第一次能看现场！" },
        { from: "self", text: "わぁ！初めてなんですね！特別な夜にしましょうね 💕", tr: "哇！是第一次啊！让它成为一个特别的夜晚吧 💕" },
      ],
    },
    {
      id: "bb4", name: "서울팬_영희", preview: "팬아트 그렸어요! 확인해주세요 🎨", time: "1시간 전", badge: 0,
      color: "linear-gradient(135deg, #fbc2eb, #fda085)", letter: "영",
      role: "fan",
      messages: [
        { from: "fan", text: "언니! 제가 팬아트 그렸어요! 한번 봐주세요 🎨", tr: "姐姐！我画了饭绘！请您看一下 🎨" },
        { from: "self", text: "세상에... 이거 정말 예뻐요! 진짜 저인가요? 너무 잘 그리셨어요 😍", tr: "天哪...这太好看了！这真的是我吗？画得太好了 😍" },
        { from: "fan", text: "진짜요? 칭찬 감사합니다 ㅠㅠ 다음에 또 그릴게요!", tr: "真的吗？谢谢夸奖 ㅠㅠ 下次还会再画的！" },
      ],
    },
    {
      id: "bb5", name: "LA_Fan_Jessica", preview: "Sending love from California! 🌴", time: "3시간 전", badge: 2,
      color: "linear-gradient(135deg, #a1c4fd, #c2e9fb)", letter: "LA",
      role: "fan",
      messages: [
        { from: "fan", text: "Hi Hanon! I'm a huge fan from LA! 🌴", tr: "嗨花音！我是来自洛杉矶的铁粉！ 🌴" },
        { from: "fan", text: "Your music got me through some really tough times. Thank you for being you 💜", tr: "你的音乐帮我度过了非常艰难的时期。谢谢你做自己 💜" },
        { from: "self", text: "This means so much to me... really. Sending big hugs to LA! 🤗💕", tr: "这对我意义太大了...真的。给洛杉矶大大的拥抱！ 🤗💕" },
      ],
    },
  ],
  feedItems: [
    // 这里是偶像（使用者）的公开 Bubble 消息，所有订阅者都能看到
    { user: "나 (花音)", color: "linear-gradient(135deg,#FF6BA6,#C44569)", letter: "花", time: "방금",
      body: "오늘 연습 끝나고 하늘 보니까 너무 예뻐서 찍었어요. 여러분도 같이 봐요 🌅", tr: "今天练习结束后看到天空太美了就拍下来了。大家一起看吧 🌅", likes: "3.2K", img: "🌅" },
    { user: "나 (花音)", color: "linear-gradient(135deg,#FF6BA6,#C44569)", letter: "花", time: "3시간 전",
      body: "스포 하나 할까요...? 새 앨범에 정말 특별한 곡이 있어요. 제가 제일 좋아하는 곡이에요 🤫", tr: "剧透一下...？新专辑里有一首非常特别的歌。是我最喜欢的歌 🤫", likes: "8.7K", img: null },
    { user: "나 (花音)", color: "linear-gradient(135deg,#FF6BA6,#C44569)", letter: "花", time: "어제",
      body: "여러분이 보내준 편지들 다 읽었어요. 밤새 읽다가 울컥했어요... 항상 고맙고 사랑해요 💌", tr: "大家寄来的信我都读了。熬夜读着读着就鼻酸了...一直很感谢也很爱你们 💌", likes: "12.1K", img: null },
    { user: "나 (花音)", color: "linear-gradient(135deg,#FF6BA6,#C44569)", letter: "花", time: "2일 전",
      body: "팬송 작업 중인데 가사 쓰면서 진짜 많이 울었어요 ㅠㅠ 팬들 생각하면서 썼어요", tr: "在写粉丝颂，写歌词的时候真的哭了很多次 ㅠㅠ 想着粉丝们写的", likes: "15.3K", img: "✍️" },
  ],
};

// =============================================
// App 配置
// =============================================
function getAppData(appId) {
  const map = { kakaotalk: data_kakaotalk, instagram: data_instagram, wechat: data_wechat, twitter: data_twitter, bubble: data_bubble };
  return map[appId];
}

function getAppConfig(appId) {
  return {
    kakaotalk: { name: "KakaoTalk", theme: "theme-kakaotalk", navAction: "+", trLabel: "译" },
    instagram: { name: "Instagram", theme: "theme-instagram", navAction: "✎", trLabel: "译" },
    wechat:    { name: "微信",      theme: "theme-wechat",    navAction: "+", trLabel: "译" },
    twitter:   { name: "X",         theme: "theme-twitter",   navAction: "✎", trLabel: "译" },
    bubble:    { name: "Bubble",    theme: "theme-bubble",    navAction: "",  trLabel: "译" },
  }[appId];
}

// =============================================
// App 生命周期
// =============================================
function openApp(appId) {
  currentApp = appId;
  currentScreen = "chatlist";
  activeChat = null;

  const data   = getAppData(appId);
  const config = getAppConfig(appId);

  appView.className = `app-view active ${config.theme}`;
  navTitle.textContent = config.name;
  navAction.textContent = config.navAction || "";

  renderChatList(data.chatList);
  renderFeed(data.feedItems);
  renderTabs(data.tabs);

  showScreen("chatlist");
  homeScreen.classList.add("hidden");
  convInput.value = "";
}

function closeApp() {
  appView.classList.remove("active");
  homeScreen.classList.remove("hidden");
  currentApp = null;
}

// =============================================
// 屏幕切换
// =============================================
function showScreen(id) {
  currentScreen = id;
  Object.keys(screens).forEach((key) => {
    screens[key].classList.toggle("hidden", key !== id);
  });
}

// =============================================
// 聊天列表渲染
// =============================================
function renderChatList(list) {
  chatlistItems.innerHTML = list.map((chat) => `
    <div class="chatlist-item" data-chat-id="${chat.id}">
      ${avatarHtml(chat.color, chat.letter)}
      <div class="chatlist-info">
        <div class="chatlist-name">${chat.name}</div>
        <div class="chatlist-preview">${chat.preview}</div>
      </div>
      <div class="chatlist-meta">
        <div class="chatlist-time">${chat.time}</div>
        ${chat.badge > 0 ? `<span class="chatlist-badge">${chat.badge}</span>` : ""}
      </div>
    </div>
  `).join("");

  chatlistItems.querySelectorAll(".chatlist-item").forEach((el) => {
    el.addEventListener("click", () => {
      openConversation(el.dataset.chatId);
    });
  });
}

// =============================================
// 动态/朋友圈渲染
// =============================================
function renderFeed(items) {
  feedItems.innerHTML = items.map((item) => `
    <div class="feed-item">
      <div class="feed-header">
        ${feedAvatarHtml(item.color, item.letter)}
        <div>
          <div class="feed-user">${item.user}</div>
          <div class="feed-time">${item.time}</div>
        </div>
      </div>
      ${item.img ? `<div class="feed-image">${item.img}</div>` : ""}
      <div class="feed-body">
        <span class="feed-text-orig">${item.body}</span>
        ${item.tr && item.tr !== item.body ? `
          <button class="msg-translate-btn feed-tr-btn" onclick="toggleFeedTr(this)">${getAppConfig(currentApp).trLabel}</button>
          <div class="msg-translation feed-tr-text">${item.tr}</div>
        ` : ""}
      </div>
      <div class="feed-actions">
        ${item.likes ? `<span>♡ ${item.likes}</span>` : ""}
        ${item.rt ? `<span>↺ ${item.rt}</span>` : ""}
        <span>💬</span>
      </div>
    </div>
  `).join("");
}

function toggleFeedTr(btn) {
  const textEl = btn.nextElementSibling;
  const isShowing = textEl.classList.contains("show");
  if (isShowing) {
    textEl.classList.remove("show");
    btn.textContent = getAppConfig(currentApp).trLabel;
  } else {
    textEl.classList.add("show");
    btn.textContent = "收起";
  }
}

// =============================================
// Tab 渲染
// =============================================
function renderTabs(tabs) {
  appTabs.innerHTML = tabs.map((tab) => `
    <div class="tab-item ${tab.id === "chatlist" ? "active" : ""}" data-screen="${tab.id}">
      <span class="tab-icon">${tab.icon}</span>
      <span>${tab.label}</span>
    </div>
  `).join("");

  appTabs.querySelectorAll(".tab-item").forEach((el) => {
    el.addEventListener("click", () => {
      const screenId = el.dataset.screen;
      appTabs.querySelectorAll(".tab-item").forEach((t) => t.classList.remove("active"));
      el.classList.add("active");
      showScreen(screenId);
      if (activeChat && screenId === "chatlist") {
        activeChat = null;
        navTitle.textContent = getAppConfig(currentApp).name;
      }
    });
  });
}

// =============================================
// 对话页
// =============================================
function openConversation(chatId) {
  const data = getAppData(currentApp);
  const chat = data.chatList.find((c) => c.id === chatId);
  if (!chat) return;

  activeChat = chat;
  navTitle.textContent = chat.name;
  showScreen("conv");

  convMessages.innerHTML = "";
  chat.messages.forEach((msg) => {
    renderConvMessage(msg);
  });
  scrollConvBottom();
  convInput.focus();
}

function renderConvMessage(msg) {
  // from: "self" | "other" | "fan" | "idol"
  let cls = "conv-msg ";
  if (msg.from === "self" || msg.from === "idol") {
    cls += "to";
  } else {
    cls += "from";
  }

  const div = document.createElement("div");
  div.className = cls;

  // 消息正文
  const textSpan = document.createElement("span");
  textSpan.className = "msg-text-orig";
  textSpan.textContent = msg.text;
  div.appendChild(textSpan);

  // 翻译按钮
  if (msg.tr) {
    const btn = document.createElement("button");
    btn.className = "msg-translate-btn";
    btn.textContent = getAppConfig(currentApp).trLabel;
    btn.addEventListener("click", function () {
      const trDiv = this.nextElementSibling;
      const isShowing = trDiv.classList.contains("show");
      if (isShowing) {
        trDiv.classList.remove("show");
        this.textContent = getAppConfig(currentApp).trLabel;
      } else {
        trDiv.classList.add("show");
        this.textContent = "收起";
      }
    });
    div.appendChild(btn);

    const trDiv = document.createElement("div");
    trDiv.className = "msg-translation";
    trDiv.textContent = msg.tr;
    div.appendChild(trDiv);
  }

  convMessages.appendChild(div);
}

function scrollConvBottom() {
  convMessages.scrollTop = convMessages.scrollHeight;
}

function sendMessage() {
  const text = convInput.value.trim();
  if (!text || !activeChat) return;

  // 用户消息（中文）
  const userMsg = { from: currentApp === "bubble" ? "self" : "self", text: text, tr: text };
  renderConvMessage(userMsg);
  convInput.value = "";
  scrollConvBottom();

  // "输入中..."
  const typingEl = document.createElement("div");
  typingEl.className = "conv-msg from";
  typingEl.textContent = "...";
  typingEl.style.opacity = ".4";
  typingEl.style.fontStyle = "italic";
  typingEl.id = "typing";
  convMessages.appendChild(typingEl);
  scrollConvBottom();

  // 模拟回复（保留原应用语言风格）
  setTimeout(() => {
    const t = document.getElementById("typing");
    if (t) t.remove();

    const reply = generateReply(text);
    const fromField = currentApp === "bubble" ? "fan" : "other";
    renderConvMessage({ from: fromField, text: reply.text, tr: reply.tr });
    scrollConvBottom();
  }, 800 + Math.random() * 1500);
}

// =============================================
// 回复生成（各语言风格 + 翻译）
// =============================================
const replyPool = {
  kakaotalk: [
    { text: "응응! 맞아 완전 대박이야~", tr: "嗯嗯！对啊超厉害的～" },
    { text: "ㅋㅋㅋ 진짜 웃겨", tr: "哈哈哈真的好好笑" },
    { text: "고마워~ 신경 써줘서", tr: "谢谢～费心了" },
    { text: "알겠어! 그때 봐~", tr: "知道了！到时候见～" },
    { text: "나도 보고 싶었어 ㅠㅠ", tr: "我也好想你 ㅠㅠ" },
    { text: "오늘 진짜 피곤한데 네 메시지에 힘나!", tr: "今天真的很累但你的消息给了我力量！" },
    { text: "좋은 생각이야! 그렇게 하자!", tr: "好主意！就这么办吧！" },
    { text: "맞아맞아 완전 공감해 ㅋㅋ", tr: "对对完全同感 哈哈" },
  ],
  instagram: [
    { text: "Thank you so much!! That really means a lot 💕", tr: "太感谢了！！这真的很重要 💕" },
    { text: "Aww you're so sweet! Made my day 🥺", tr: "哇你太甜了！让我开心了一整天 🥺" },
    { text: "Haha yes! I was so happy today!", tr: "哈哈是的！我今天太开心了！" },
    { text: "I'll try to share more behind the scenes soon 💜", tr: "我会尽快分享更多幕后内容 💜" },
    { text: "Your support means everything to me!", tr: "你的支持对我来说意味着一切！" },
    { text: "OMG really?? You're the best! ✨", tr: "天哪真的吗？？你是最棒的！ ✨" },
    { text: "This made me smile so much. Thank you 🫶", tr: "这让我笑了好久。谢谢你 🫶" },
  ],
  wechat: [
    { text: "好的，收到！我会注意的", tr: "好的，收到！我会注意的" },
    { text: "谢谢关心～你也是", tr: "谢谢关心～你也是" },
    { text: "嗯嗯，我知道了，放心", tr: "嗯嗯，我知道了，放心" },
    { text: "没问题，你安排就好", tr: "没问题，你安排就好" },
    { text: "今天辛苦了！好好休息", tr: "今天辛苦了！好好休息" },
    { text: "好的好的，我马上去看", tr: "好的好的，我马上去看" },
  ],
  twitter: [
    { text: "thank you!! this means the world 🔥", tr: "谢谢！！这太重要了 🔥" },
    { text: "haha yep that was a wild one today", tr: "哈哈对今天真的很疯狂" },
    { text: "oh wow I didn't even notice that 😭", tr: "哇我都没注意到 😭" },
    { text: "working on it!! stay tuned fr", tr: "正在努力！！敬请期待" },
    { text: "you guys are the absolute best 🤍", tr: "你们绝对是最棒的 🤍" },
    { text: "this is so sweet, thank you for sharing 🫶", tr: "这太暖了，感谢分享 🫶" },
  ],
  bubble: [
    // Bubble: 偶像回复粉丝（韩文 + 中文翻译）
    { text: "고마워요~ 덕분에 힘이 나요! 💕", tr: "谢谢～多亏了你我有了力量！ 💕" },
    { text: "맞아요! 오늘 진짜 신나는 하루였어요 ㅎㅎ", tr: "对啊！今天真的是很开心的一天 嘿嘿" },
    { text: "여러분 생각하면서 열심히 준비했어요!", tr: "想着大家努力准备了！" },
    { text: "우리 팬들 최고예요 진짜 ㅠㅠ", tr: "我们粉丝最棒了真的 ㅠㅠ" },
    { text: "비밀인데... 곧 좋은 소식 있을 거예요 🤫", tr: "秘密哦...很快会有好消息 🤫" },
    { text: "저도 보고 싶어요! 빨리 만나고 싶다~", tr: "我也好想你们！好想快点见面～" },
    { text: "편지 잘 받았어요! 너무 감동이에요 🥺", tr: "信收到了！太感动了 🥺" },
    { text: "오늘 하루도 파이팅! 내일 또 연락할게요 💜", tr: "今天也加油！明天会再联系的 💜" },
  ],
};

function generateReply(_userText) {
  const pool = replyPool[currentApp] || replyPool.kakaotalk;
  return pool[Math.floor(Math.random() * pool.length)];
}

// =============================================
// 导航返回
// =============================================
function handleBack() {
  if (currentScreen === "conv") {
    const data = getAppData(currentApp);
    navTitle.textContent = getAppConfig(currentApp).name;
    showScreen("chatlist");
    activeChat = null;
    appTabs.querySelectorAll(".tab-item").forEach((t) => {
      t.classList.toggle("active", t.dataset.screen === "chatlist");
    });
  } else {
    closeApp();
  }
}

// =============================================
// 事件绑定
// =============================================
$$(".app-item").forEach((item) => {
  item.addEventListener("click", () => {
    const appId = item.dataset.app;
    if (appId) openApp(appId);
  });
});

$("#navBack").addEventListener("click", handleBack);

convSend.addEventListener("click", sendMessage);
convInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// =============================================
// 偶像资料管理（localStorage）
// =============================================
const PROFILE_KEY = "idol_profile";

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) { return null; }
}

function saveProfile(data) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

// 回填表单
function fillForm(data) {
  setStageName.value = data.stageName || "";
  setRealName.value  = data.realName || "";
  setAge.value       = data.age || "";
  setHeight.value    = data.height || "";
  setDebutYear.value = data.debutYear || "";
  setGroup.value     = data.group || "";
  // 身份类型
  $$("#idolType .opt-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.value === (data.idolType || "group"));
  });
  // 性格
  $$("#personality .opt-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.value === (data.personality || "energetic"));
  });
}

// 读取表单数据
function readForm() {
  const idolType = $("#idolType .opt-chip.active")?.dataset?.value || "group";
  const personality = $("#personality .opt-chip.active")?.dataset?.value || "energetic";
  return {
    stageName:   setStageName.value.trim(),
    realName:    setRealName.value.trim(),
    age:         parseInt(setAge.value, 10) || 0,
    height:      parseInt(setHeight.value, 10) || 0,
    debutYear:   parseInt(setDebutYear.value, 10) || 0,
    group:       setGroup.value.trim(),
    idolType,
    personality,
  };
}

// =============================================
// 设定页逻辑
// =============================================
function showSetupScreen(editMode) {
  setupScreen.classList.remove("hidden");
  phoneContainer.classList.remove("ready");
  setupHint.textContent = "";

  if (editMode) {
    const profile = loadProfile();
    if (profile) fillForm(profile);
    setupBtn.textContent = "✦ 保存修改并进入";
    setupHint.textContent = "正在修改「" + (profile?.stageName || "") + "」的身份设定";
  } else {
    setupBtn.textContent = "✦ 进入我的偶像生活";
  }
}

function enterPhone() {
  const profile = loadProfile();
  if (!profile) return;

  setupScreen.classList.add("hidden");
  phoneContainer.classList.add("ready");
  updateGreeting(profile.stageName);
}

function updateGreeting(name) {
  if (homeGreeting) homeGreeting.textContent = name || "偶像";
}

// 表单验证
function validateForm(data) {
  if (!data.stageName) return "请输入艺名";
  if (data.stageName.length < 1 || data.stageName.length > 12) return "艺名长度应为 1-12 个字符";
  if (!data.age || data.age < 15 || data.age > 35) return "请输入合理的年龄（15-35）";
  if (!data.debutYear || data.debutYear < 2010 || data.debutYear > 2026) return "请输入合理的出道年份（2010-2026）";
  if (data.height && (data.height < 145 || data.height > 195)) return "请输入合理的身高（145-195cm）";
  return null;
}

// 提交设定
function submitProfile() {
  const data = readForm();
  const error = validateForm(data);
  if (error) {
    setupHint.textContent = "⚠ " + error;
    setupHint.style.color = "#FF6B6B";
    return;
  }
  saveProfile(data);
  setupHint.style.color = "";
  enterPhone();
}

// =============================================
// 选项芯片点击
// =============================================
$$(".option-row").forEach((row) => {
  row.querySelectorAll(".opt-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      row.querySelectorAll(".opt-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
});

// 设定页提交按钮
setupBtn.addEventListener("click", submitProfile);

// 回车提交
[setStageName, setRealName, setAge, setHeight, setDebutYear, setGroup].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitProfile();
  });
});

// 首页设置按钮 → 返回修改设定
homeSettingsBtn.addEventListener("click", () => {
  showSetupScreen(true);
});

// =============================================
// PWA 安装引导（简化版，全浏览器兼容）
// =============================================
let deferredPrompt = null;
let globalBarDismissed = false;
let installHandled = false;

function detectPlatform() {
  var ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return { os: "ios", browser: /CriOS/.test(ua) ? "chrome" : /FxiOS/.test(ua) ? "firefox" : /EdgiOS/.test(ua) ? "edge" : "safari" };
  }
  if (/Android/.test(ua)) {
    return { os: "android", browser: /SamsungBrowser/.test(ua) ? "samsung" : /Firefox/.test(ua) && !/Chrome/.test(ua) ? "firefox" : /Chrome/.test(ua) ? "chrome" : "other" };
  }
  return { os: "desktop", browser: /Edg\//.test(ua) ? "edge" : /Chrome/.test(ua) ? "chrome" : /Safari/.test(ua) ? "safari" : "other" };
}

function showTip(title, html) {
  var old = document.querySelector(".install-tip-overlay");
  if (old) old.remove();
  var div = document.createElement("div");
  div.className = "install-tip-overlay";
  div.style.cssText = "position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.88);display:flex;align-items:flex-end;justify-content:center;padding:16px;";
  div.innerHTML = '<div style="background:#1e1e32;border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:28px 24px 20px;width:100%;max-width:340px;text-align:center;color:#fff;animation:tipUp .3s ease;">' +
    '<div style="font-size:40px;margin-bottom:10px;">📱</div>' +
    '<div style="font-size:17px;font-weight:700;margin-bottom:10px;">' + title + '</div>' +
    '<div style="color:rgba(255,255,255,.5);font-size:13px;line-height:2;text-align:left;">' + html + '</div>' +
    '<button id="tipCloseBtn" style="margin-top:18px;padding:12px 0;width:100%;border-radius:14px;border:none;background:linear-gradient(135deg,#FF6BA6,#C44569);color:#fff;font-size:15px;font-weight:600;">知道了</button>' +
    '</div>';
  document.body.appendChild(div);
  div.addEventListener("click", function(e) { if (e.target === div) div.remove(); });
  var closeBtn = document.getElementById("tipCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", function() { div.remove(); });
}

// 为元素安全添加点击事件
function safeClick(el, fn) {
  if (el) el.addEventListener("click", fn);
}

function setupInstallUI() {
  if (installHandled) return;
  installHandled = true;

  var p = detectPlatform();
  var os = p.os;
  var browser = p.browser;

  // ---- 设定页安装横幅 ----
  if (installTitle && installBtn) {
    if (os === "ios") {
      installTitle.textContent = "添加到主屏幕";
      installDesc.textContent = "点击分享按钮 → 添加到主屏幕";
      installBtn.textContent = "查看教程";
      installBtn.className = "install-banner-btn ios-guide";
    } else if (os === "android") {
      installTitle.textContent = "安装到桌面";
      installDesc.textContent = "像原生 App 一样打开使用";
      installBtn.textContent = "安装";
      installBtn.className = "install-banner-btn";
    } else {
      installTitle.textContent = "安装为桌面 App";
      installDesc.textContent = "独立窗口打开，无浏览器边框";
      installBtn.textContent = "安装";
      installBtn.className = "install-banner-btn";
    }
    installBanner.classList.remove("dismissed");
  }

  // ---- 全局悬浮安装条 ----
  if (globalInstallBar && gibText && gibBtn) {
    if (os === "ios") {
      gibText.textContent = "添加到主屏幕，像 App 一样使用";
      gibBtn.textContent = "教程";
    } else {
      gibText.textContent = "安装到桌面，像原生 App 一样打开";
      gibBtn.textContent = "安装";
    }
    globalInstallBar.classList.remove("dismissed");
  }
}

// 统一安装按钮处理
function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result) {
      if (result.outcome === "accepted") {
        if (installBanner) installBanner.classList.add("dismissed");
        if (globalInstallBar) globalInstallBar.classList.add("dismissed");
        globalBarDismissed = true;
      }
      deferredPrompt = null;
    });
    return;
  }
  // 兜底：显示手动教程
  var p = detectPlatform();
  if (p.os === "ios") {
    showTip("添加到主屏幕",
      "<b>1.</b> 点击浏览器底部中间的 <b>分享按钮</b> ⎋<br>" +
      "<b>2.</b> 向下滑动找到 <b>「添加到主屏幕」</b><br>" +
      "<b>3.</b> 确认名称后点击右上角 <b>「添加」</b><br>" +
      "<b>4.</b> 回到桌面即可看到 <b>idol</b> 图标 ✨");
  } else if (p.os === "android") {
    showTip("添加到主屏幕",
      "<b>1.</b> 点击浏览器右上角 <b>菜单按钮 ⋮</b><br>" +
      "<b>2.</b> 找到 <b>「添加到主屏幕」</b> 或 <b>「安装应用」</b><br>" +
      "<b>3.</b> 确认后桌面出现 <b>idol</b> 图标 ✨<br>" +
      "<span style='font-size:11px;opacity:.35;'>提示：使用 Chrome 浏览器打开可一键安装</span>");
  } else {
    showTip("安装到桌面",
      "<b>1.</b> 使用 <b>Chrome</b> 或 <b>Edge</b> 浏览器打开此页面<br>" +
      "<b>2.</b> 地址栏右侧点击 <b>⊕ 安装图标</b><br>" +
      "<b>3.</b> 桌面出现 <b>idol</b> 独立应用窗口 ✨");
  }
}

// 绑定事件（安全检查）
safeClick(installBtn, handleInstallClick);
safeClick(gibBtn, handleInstallClick);

// 原生 PWA 安装事件
window.addEventListener("beforeinstallprompt", function(e) {
  e.preventDefault();
  deferredPrompt = e;
  if (installTitle && installBtn) {
    installTitle.textContent = "安装为独立 App";
    installDesc.textContent = "一键安装到桌面";
    installBtn.textContent = "立即安装";
    installBtn.className = "install-banner-btn";
    installBanner.classList.remove("dismissed");
  }
  if (gibText && gibBtn) {
    gibText.textContent = "一键安装到桌面";
    gibBtn.textContent = "立即安装";
    if (globalInstallBar) globalInstallBar.classList.remove("dismissed");
  }
});

// =============================================
// 启动流程
// =============================================
(function init() {
  // 呼吸灯动画
  var style = document.createElement("style");
  style.textContent = [
    "@keyframes pulse-glow {",
    "  0%, 100% { box-shadow: 0 4px 12px rgba(0,0,0,.35); }",
    "  50% { box-shadow: 0 4px 24px rgba(255,107,166,.5), 0 0 40px rgba(255,107,166,.2); }",
    "}",
    ".app-icon.bubble { animation: pulse-glow 2s ease-in-out infinite; }"
  ].join("\n");
  document.head.appendChild(style);

  // 安装引导
  setupInstallUI();

  // 检查是否有已保存的偶像资料
  var profile = loadProfile();
  if (profile && profile.stageName) {
    fillForm(profile);
    enterPhone();
  } else {
    showSetupScreen(false);
  }
})();
