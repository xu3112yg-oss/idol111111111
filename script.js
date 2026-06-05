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

// 发布动态
const fabPost         = $("#fabPost");
const composeOverlay  = $("#composeOverlay");
const composeCancel   = $("#composeCancel");
const composeSubmit   = $("#composeSubmit");
const composeText     = $("#composeText");
const composeImgInput = $("#composeImgInput");
const composeAddImg   = $("#composeAddImg");
const composePreview  = $("#composePreview");
const composePreviewImg = $("#composePreviewImg");
const composeRemoveImg  = $("#composeRemoveImg");
const composeImageArea  = $("#composeImageArea");
let composeImageData = null;

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
function avatarHtml(color, letter, role) {
  if (role) {
    var svg = wxPortrait(role);
    if (svg) return '<div class="chatlist-avatar chatlist-avatar-portrait">' + svg + '</div>';
  }
  return '<div class="chatlist-avatar" style="background:' + color + '">' + letter + '</div>';
}
function feedAvatarHtml(color, letter, role) {
  if (role) {
    var svg = wxPortrait(role);
    if (svg) return '<div class="feed-avatar feed-avatar-portrait">' + svg + '</div>';
  }
  return '<div class="feed-avatar" style="background:' + color + '">' + letter + '</div>';
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
    { user: "지수", color: "#FF6B6B", letter: "지", time: "2시간 전", body: "오늘 연습실에서 언니 직캠 찍었는데 진짜 미쳤다... 이건 꼭 올려야 해 🔥", tr: "今天在练习室拍了姐姐的直拍，真的疯了...这个一定要发 🔥", likes: "24", friendLikes: ["민지","댄서 오빠","매니저 오빠"], friendComments: [{user:"민지",text:"와 대박 ㅋㅋ 나도 이거 보면서 소름 돋았어"},{user:"댄서 오빠",text:"카메라 각도 미쳤다 ㄷㄷ"}] },
    { user: "민지", color: "#FFA726", letter: "민", time: "5시간 전", body: "주말 영화 추천 받아요! 요즘 대작 너무 많네요 🎬🍿", tr: "求推荐周末电影！最近大片太多了 🎬🍿", likes: "8", friendLikes: ["지수"], friendComments: [{user:"지수",text:"나랑 같이 보러 갈래? ㅎㅎ"}] },
    { user: "나", color: "#FEE500", letter: "✨", time: "8시간 전", body: "오늘 연습 정말 재밌었다! 팬들 생각하면서 열심히 했어요 💕 곧 좋은 소식 있을지도?", tr: "今天练习真的很开心！想着粉丝们努力练习了 💕 可能很快有好消息？", likes: "156", friendLikes: ["지수","민지","댄스팀 단톡","매니저 오빠","엄마"], friendComments: [{user:"지수",text:"언니 최고야!! 💕"},{user:"매니저 오빠",text:"수고했어요. 내일도 파이팅"},{user:"엄마",text:"우리 딸 너무 예뻐~ 건강 잘 챙기고"}] },
    { user: "댄서 오빠", color: "#5C6BC0", letter: "춤", time: "12시간 전", body: "이번 안무 포인트는 나비예요 🦋 다들 잘 따라와줘서 고마워요!", tr: "这次编舞的重点是蝴蝶 🦋 大家都跟得很好，谢谢！", likes: "42", friendLikes: ["나","지수","민지"], friendComments: [{user:"나",text:"오빠 설명이 진짜 이해 잘 됐어요!"},{user:"지수",text:"나비 동작 진짜 예뻐요 ㅠㅠ"}] },
    { user: "매니저 오빠", color: "#78909C", letter: "M", time: "15시간 전", body: "오늘 스케줄 끝! 내일은 드디어 쉬는 날~ 다들 고생했어요 👍", tr: "今天行程结束！明天终于休息日～大家都辛苦了 👍", likes: "31", friendLikes: ["나","지수"], friendComments: [{user:"나",text:"오빠도 고생 많으셨어요! 푹 쉬어요"}] },
    { user: "엄마", color: "#66BB6A", letter: "엄", time: "18시간 전", body: "우리 딸 TV에 나온 거 봤어요! 너무 자랑스러워요 이웃집 아줌마들한테 다 말했어요 ㅎㅎ", tr: "看到女儿上电视了！太自豪了，跟邻居阿姨们都说了 嘿嘿", likes: "89", friendLikes: ["나","지수","민지","매니저 오빠"], friendComments: [{user:"나",text:"엄마 ㅠㅠ 부끄러워요... 그래도 고마워요 💕"},{user:"지수",text:"어머님 최고예요 ㅋㅋㅋ"}] },
    { user: "나", color: "#FEE500", letter: "✨", time: "1일 전", body: "새벽 3시까지 연습하고 집 가는 길... 하늘에 별이 진짜 많다. 이런 날은 왠지 좋은 일이 생길 것 같아 🌙", tr: "练习到凌晨3点回家的路上...天上星星真的好多。这种日子总觉得会有好事发生 🌙", likes: "203", friendLikes: ["지수","민지","댄서 오빠","매니저 오빠","엄마"], friendComments: [{user:"민지",text:"언니 너무 늦게까지 하지 마요 ㅠㅠ"},{user:"매니저 오빠",text:"빨리 집에 가서 푹 쉬어요"},{user:"엄마",text:"밤길 조심해야 돼! 집에 가면 연락해"}] },
    { user: "댄스팀 단톡", color: "#AB47BC", letter: "팀", time: "2일 전", body: "이번 주 팀 연습 영상입니다! 모두 수고하셨어요 🔥", tr: "这周团队练习视频！大家都辛苦了 🔥", likes: "67", friendLikes: ["나","댄서 오빠","지수"], friendComments: [{user:"댄서 오빠",text:"팀워크 죽이네요"},{user:"지수",text:"다들 너무 멋있어요!!"}] },
  ],
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


// WeChat 写实头像
function wxPortrait(role) {
  var svgs = {
    manager: \'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="mgr-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#4a5568"/><stop offset="100%" stop-color="#2d3748"/></linearGradient></defs><rect width="48" height="48" rx="8" fill="url(#mgr-bg2)"/><ellipse cx="24" cy="19" rx="9" ry="8" fill="#e2c9a8"/><ellipse cx="24" cy="40" rx="17" ry="15" fill="#4a5568"/><rect x="14" y="31" width="20" height="12" rx="2" fill="#5a6a7e"/><ellipse cx="24" cy="16" rx="7" ry="4.5" fill="#3d2b1f"/><rect x="15" y="10" width="18" height="6" rx="3" fill="#3d2b1f"/><circle cx="20" cy="18" r="1.5" fill="#fff"/><circle cx="28" cy="18" r="1.5" fill="#fff"/><circle cx="20.5" cy="18" r=".7" fill="#1a1a1a"/><circle cx="28.5" cy="18" r=".7" fill="#1a1a1a"/><path d="M21 21c2 1 4.5 1 6 0" fill="none" stroke="#c4956a" stroke-width="1" stroke-linecap="round"/><rect x="13" y="29" width="22" height="14" rx="3" fill="#718096"/><path d="M35 33 L40 33 L40 48 L35 48Z" fill="#4a5568"/></svg>\',
    mom: \'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="mom-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b8956e"/><stop offset="100%" stop-color="#8b654e"/></linearGradient></defs><rect width="48" height="48" rx="8" fill="url(#mom-bg2)"/><ellipse cx="24" cy="19" rx="10" ry="9" fill="#f5ddc0"/><ellipse cx="24" cy="40" rx="17" ry="14" fill="#c4956a"/><path d="M8 16 Q24 6 40 16" fill="#9b7b6b"/><ellipse cx="24" cy="16" rx="9" ry="6" fill="#9b7b6b"/><circle cx="20" cy="18" r="1.3" fill="#3a2a1a"/><circle cx="28" cy="18" r="1.3" fill="#3a2a1a"/><path d="M21 22c2.5 1.5 5 1.5 7.5 0" fill="none" stroke="#d4a080" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="21" cy="24" rx="3.5" ry="2" fill="#f0c0a0" opacity=".4"/><ellipse cx="28" cy="24" rx="3.5" ry="2" fill="#f0c0a0" opacity=".4"/><rect x="14" y="31" width="20" height="13" rx="4" fill="#e8d0b8"/></svg>\',
    prteam: \'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pr-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38a169"/><stop offset="100%" stop-color="#276749"/></linearGradient></defs><rect width="48" height="48" rx="8" fill="url(#pr-bg2)"/><ellipse cx="15" cy="17" rx="7" ry="6" fill="#f0ddc0"/><ellipse cx="33" cy="17" rx="7" ry="6" fill="#e8d5b0"/><ellipse cx="24" cy="33" rx="8" ry="7" fill="#e0cfa8"/><circle cx="12" cy="16" r="1" fill="#333"/><circle cx="17" cy="16" r="1" fill="#333"/><circle cx="30" cy="16" r="1" fill="#333"/><circle cx="35" cy="16" r="1" fill="#333"/><circle cx="21" cy="32" r="1" fill="#333"/><circle cx="27" cy="32" r="1" fill="#333"/><path d="M13 19c1.5 1 3 1 4.5 0" fill="none" stroke="#c99" stroke-width=".8" stroke-linecap="round"/><path d="M31 19c1.5 1 3 1 4.5 0" fill="none" stroke="#c99" stroke-width=".8" stroke-linecap="round"/><path d="M22 35c1.5 1 3 1 4.5 0" fill="none" stroke="#c99" stroke-width=".8" stroke-linecap="round"/></svg>\',
    fanclub: \'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="fan-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5b8dee"/><stop offset="100%" stop-color="#3b6dce"/></linearGradient></defs><rect width="48" height="48" rx="8" fill="url(#fan-bg2)"/><ellipse cx="24" cy="18" rx="9" ry="8" fill="#fdd9b5"/><ellipse cx="24" cy="40" rx="16" ry="13" fill="#5b8dee"/><path d="M10 13 Q24 2 38 13" fill="#2c1810"/><path d="M13 13 Q24 7 35 13" fill="#2c1810"/><ellipse cx="24" cy="15" rx="7" ry="4.5" fill="#2c1810"/><circle cx="20" cy="17" r="1.5" fill="#fff"/><circle cx="28" cy="17" r="1.5" fill="#fff"/><circle cx="20.5" cy="17" r=".7" fill="#2c1810"/><circle cx="28.5" cy="17" r=".7" fill="#2c1810"/><path d="M21 20c2.5 1.2 5 1.2 6.5 0" fill="none" stroke="#e8956a" stroke-width="1" stroke-linecap="round"/><ellipse cx="20" cy="22" rx="3" ry="2" fill="#ffb3b3" opacity=".4"/><ellipse cx="28" cy="22" rx="3" ry="2" fill="#ffb3b3" opacity=".4"/><rect x="14" y="30" width="20" height="13" rx="3" fill="#fff"/><text x="24" y="38" text-anchor="middle" font-size="6" fill="#5b8dee" font-weight="700">CLUB</text></svg>\',
    dancer: \'<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dance-bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#9b59b6"/><stop offset="100%" stop-color="#7b3996"/></linearGradient></defs><rect width="48" height="48" rx="8" fill="url(#dance-bg2)"/><ellipse cx="24" cy="18" rx="9" ry="8" fill="#f0c8a0"/><ellipse cx="24" cy="40" rx="16" ry="13" fill="#9b59b6"/><circle cx="24" cy="8" r="6" fill="#1a1a1a"/><ellipse cx="24" cy="14" rx="6" ry="3.5" fill="#1a1a1a"/><circle cx="20" cy="17" r="1.3" fill="#333"/><circle cx="28" cy="17" r="1.3" fill="#333"/><path d="M21 20c2.5 1.5 5 1.5 7 0" fill="none" stroke="#d4956a" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="24" cy="32" rx="10" ry="11" fill="#fff"/><rect x="11" y="33" width="26" height="12" rx="3" fill="#e0d0f0"/></svg>\',
  };
  return svgs[role] || \'\';
}

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
      id: "wx1", name: "经纪人周姐", role: "manager", preview: "明天的采访提纲发你了，记得看", time: "15:32", badge: 3,
      color: "#FF6D00", letter: "周",
      messages: [
        { from: "other", text: "花音，明天的采访提纲我发你邮箱了", tr: "花音，明天的采访提纲我发你邮箱了" },
        { from: "other", text: "大概有15个问题，你先看看有没有不想回答的", tr: "大概有15个问题，你先看看有没有不想回答的" },
        { from: "self",  text: "好的周姐，我今晚就看", tr: "好的周姐，我今晚就看" },
        { from: "other", text: "另外明天穿那套蓝色连衣裙，造型师已经准备好了", tr: "另外明天穿那套蓝色连衣裙，造型师已经准备好了" },
      ],
    },
    {
      id: "wx2", name: "妈妈", role: "mom", preview: "记得按时吃饭，看你又瘦了", time: "12:10", badge: 0,
      color: "#E91E63", letter: "妈",
      messages: [
        { from: "other", text: "花音啊，最近有没有好好吃饭？", tr: "花音啊，最近有没有好好吃饭？" },
        { from: "other", text: "我看你照片又瘦了，别太拼了", tr: "我看你照片又瘦了，别太拼了" },
        { from: "self",  text: "妈，我有好好吃的！只是最近运动量大了一点", tr: "妈，我有好好吃的！只是最近运动量大了一点" },
      ],
    },
    {
      id: "wx3", name: "宣传组工作群", role: "prteam", preview: "新海报设计方案已出，大家投票", time: "11:45", badge: 8,
      color: "#4CAF50", letter: "宣",
      messages: [
        { from: "other", text: "各位，新专辑宣传海报三个方案都出来了", tr: "各位，新专辑宣传海报三个方案都出来了" },
        { from: "other", text: "A方案偏甜美，B方案偏成熟，C方案走概念风", tr: "A方案偏甜美，B方案偏成熟，C方案走概念风" },
        { from: "self",  text: "三个都好棒！我个人倾向B，跟新歌风格比较搭", tr: "三个都好棒！我个人倾向B，跟新歌风格比较搭" },
      ],
    },
    {
      id: "wx4", name: "粉丝后援会会长", role: "fanclub", preview: "生日应援方案请确认一下", time: "昨天", badge: 0,
      color: "#2196F3", letter: "会",
      messages: [
        { from: "other", text: "花音你好！今年生日应援的方案我们整理好了", tr: "花音你好！今年生日应援的方案我们整理好了" },
        { from: "other", text: "有地铁广告、公益捐赠、还有咖啡车应援三个部分", tr: "有地铁广告、公益捐赠、还有咖啡车应援三个部分" },
        { from: "self",  text: "天哪太用心了！不过公益捐赠可以多一些，不用太铺张", tr: "天哪太用心了！不过公益捐赠可以多一些，不用太铺张" },
      ],
    },
    {
      id: "wx5", name: "舞蹈老师李姐", role: "dancer", preview: "新的编舞视频我发你了", time: "昨天", badge: 1,
      color: "#9C27B0", letter: "李",
      messages: [
        { from: "other", text: "花音，新歌的编舞框架出来了", tr: "花音，新歌的编舞框架出来了" },
        { from: "other", text: "这次加入了现代舞元素，你看下视频", tr: "这次加入了现代舞元素，你看下视频" },
        { from: "self",  text: "收到！我现在就看", tr: "收到！我现在就看" },
      ],
    },
  ],
  feedItems: [
    { user: "经纪人周姐", color: "#FF6D00", letter: "周", role: "manager", time: "1小时前", body: "今天录制非常顺利，感谢所有工作人员的配合！期待成品 ✨", tr: "今天录制非常顺利，感谢所有工作人员的配合！期待成品 ✨", likes: null, img: "🎬", friendLikes: ["我","宣传组小陈","舞蹈老师李姐"], friendComments: [{user:"我",text:"周姐辛苦了！"},{user:"宣传组小陈",text:"周姐组织得太好了 👍"}] },
    { user: "我", color: "#2BBF6A", letter: "花", time: "3小时前", body: "真的好喜欢今天录音室的感觉...新歌里有我想对粉丝说的所有话 💚", tr: "真的好喜欢今天录音室的感觉...新歌里有我想对粉丝说的所有话 💚", likes: "328", img: null, friendLikes: ["经纪人周姐","妈妈","宣传组小陈","粉丝后援会会长","舞蹈老师李姐"], friendComments: [{user:"妈妈",text:"加油！妈妈永远支持你 💕"},{user:"经纪人周姐",text:"这首歌真的很棒，期待发布"},{user:"粉丝后援会会长",text:"已经准备好刷榜了 🔥"}] },
    { user: "宣传组小陈", color: "#4CAF50", letter: "陈", time: "5小时前", body: "新海报定稿了！这一版真的太美了，迫不及待想让大家看到 😍", tr: "新海报定稿了！这一版真的太美了，迫不及待想让大家看到 😍", likes: "56", img: "🖼", friendLikes: ["我","经纪人周姐"], friendComments: [{user:"我",text:"太好看了吧！！"},{user:"经纪人周姐",text:"这次设计团队超水平发挥"}] },
    { user: "舞蹈老师李姐", color: "#9C27B0", letter: "李", role: "dancer", time: "昨天", body: "这次的编舞融入了很多故事性，不只是跳舞，是用身体在讲述 💃", tr: "这次的编舞融入了很多故事性，不只是跳舞，是用身体在讲述 💃", likes: "89", img: null, friendLikes: ["我","经纪人周姐","宣传组小陈"], friendComments: [{user:"我",text:"李姐的编舞每次都有灵魂 ✨"},{user:"宣传组小陈",text:"期待舞台呈现！"}] },
    { user: "妈妈", color: "#E91E63", letter: "妈", role: "mom", time: "昨天", body: "今天包了饺子 🥟 女儿最爱吃的韭菜鸡蛋馅的。虽然她忙得没空回来吃，但我冻了一盒给她留着。想你了宝贝 ❤️", tr: "今天包了饺子 🥟 女儿最爱吃的韭菜鸡蛋馅的。虽然她忙得没空回来吃，但我冻了一盒给她留着。想你了宝贝 ❤️", likes: "156", img: null, friendLikes: ["我","经纪人周姐","粉丝后援会会长"], friendComments: [{user:"我",text:"妈 😭😭😭 这周末一定回去吃！"},{user:"经纪人周姐",text:"阿姨您太暖了，花音最近表现特别好"}] },
    { user: "我", color: "#2BBF6A", letter: "花", time: "2天前", body: "今天在汉江边跑了一圈，风吹在脸上特别舒服。有时候需要放空自己，才能装下更多新的东西 🌿", tr: "今天在汉江边跑了一圈，风吹在脸上特别舒服。有时候需要放空自己，才能装下更多新的东西 🌿", likes: "267", img: null, friendLikes: ["妈妈","经纪人周姐","宣传组小陈","舞蹈老师李姐"], friendComments: [{user:"妈妈",text:"跑步也别忘了保暖，秋天风大"},{user:"舞蹈老师李姐",text:"运动完记得拉伸！"},{user:"经纪人周姐",text:"难得休息就好好享受吧～"}] },
    { user: "粉丝后援会会长", color: "#2196F3", letter: "会", role: "fanclub", time: "3天前", body: "生日应援的200个快递已经全部寄出啦！感谢所有参与的小伙伴们，花音一定会感受到我们的爱的 💙", tr: "生日应援的200个快递已经全部寄出啦！感谢所有参与的小伙伴们，花音一定会感受到我们的爱的 💙", likes: "432", img: null, friendLikes: ["我","宣传组小陈"], friendComments: [{user:"我",text:"天哪你们太用心了 😭💙 真的不知道怎么感谢"},{user:"宣传组小陈",text:"后援会的组织能力真的一流！"}] },
    { user: "经纪人周姐", color: "#FF6D00", letter: "周", role: "manager", time: "3天前", body: "下周行程已安排好，有惊喜活动哦～大家准备好 📋✨", tr: "下周行程已安排好，有惊喜活动哦～大家准备好 📋✨", likes: "198", img: null, friendLikes: ["我","宣传组小陈","粉丝后援会会长"], friendComments: [{user:"我",text:"什么惊喜？我也想知道 👀"},{user:"粉丝后援会会长",text:"已经开始期待了！！"}] },
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
  refreshFeed();
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
      ${avatarHtml(chat.color, chat.letter, chat.role)}
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
        ${feedAvatarHtml(item.color, item.letter, item.role)}
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

  // 智能回复
  setTimeout(function() {
    const t = document.getElementById("typing");
    if (t) t.remove();

    var fromField = currentApp === "bubble" ? "fan" : "other";
    var reply = smartReply(text, currentApp);
    renderConvMessage({ from: fromField, text: reply.text, tr: reply.tr });
    scrollConvBottom();
  }, 600 + Math.random() * 1000);
}


// =============================================
// 本地智能回复引擎
// =============================================
var convMemory = {}; // 记录每个对话的最近回复，避免重复

// 关键词 → 话题分类
function detectTopic(text, appId) {
  var t = text.toLowerCase();
  var topics = [];

  // 通用关键词（中韩英）
  var kw = {
    greeting:  ["안녕","hi","hello","hey","在吗","早上好","晚上好","早安","晚安","하이","방가워요"],
    thanks:    ["谢谢","고마워","thank","감사","thanks","고맙","thx","谢谢你","谢谢啦"],
    tired:     ["累","피곤","tired","힘들","지쳤","exhaust","好累","辛苦了","수고"],
    food:      ["吃","먹","food","밥","맛있","好吃","肚子饿","배고파","dinner","lunch"],
    practice:  ["练习","연습","practice","rehearsal","排练","舞蹈","dance","안무","춤"],
    stage:     ["舞台","무대","stage","公演","concert","演唱会","공연","表演","直播"],
    miss:      ["想","보고 싶","miss","그리","想念","보고싶","好想你"],
    support:   ["加油","힘내","support","응원","fighting","파이팅","支持","love you"],
    schedule:  ["行程","스케줄","schedule","明天","내일","今天","오늘","这周","이번 주"],
    health:    ["身体","健康","건강","아파","sick","감기","cold","生病","不舒服","休息"],
    album:     ["专辑","앨범","album","新歌","new song","音乐","music","노래","comeback","컴백"],
    weather:   ["天气","날씨","weather","下雨","비","sunny","冷","추워","热","더워"],
    happy:     ["开心","좋아","happy","기분","신나","excited","太棒","최고","좋다"],
  };

  for (var topic in kw) {
    for (var i = 0; i < kw[topic].length; i++) {
      if (t.indexOf(kw[topic][i]) >= 0) {
        topics.push(topic);
        break;
      }
    }
  }
  return topics.length > 0 ? topics : ["general"];
}

// 上次使用的回复索引（避免重复）
function getConvKey() {
  return currentApp + "_" + (activeChat ? activeChat.id : "general");
}

var lastReplyIdx = {};

function pickReply(pool, convKey) {
  if (!lastReplyIdx[convKey]) lastReplyIdx[convKey] = -1;
  var idx;
  do {
    idx = Math.floor(Math.random() * pool.length);
  } while (idx === lastReplyIdx[convKey] && pool.length > 1);
  lastReplyIdx[convKey] = idx;
  return pool[idx];
}

// 智能回复主题库
var smartPools = {
  kakaotalk: {
    greeting:  [{text:"안녕~ 오늘도 예쁘게 지내고 있어?", tr:"嗨～今天也过得好吗？"},{text:"헐! 연락 고마워 ㅎㅎ 보고 싶었어!", tr:"哇！谢谢联系我 嘿嘿 想你了！"},{text:"안녕!! 오늘 하루 어땠어? 난 방금 연습 끝났어~", tr:"嗨！！今天过得怎么样？我刚练习完～"}],
    thanks:    [{text:"아이고 고마워~ 네가 더 예뻐!", tr:"哎呀谢谢～你更漂亮！"},{text:"칭찬 고마워! 힘이 난다 ㅎㅎ", tr:"谢谢夸奖！有力量了 哈哈"},{text:"에이~ 부끄럽게... 그래도 고마워 💕", tr:"哎呀～让人害羞...但还是谢谢 💕"}],
    tired:     [{text:"아~ 진짜? 나도 오늘 완전 힘들었어 ㅠㅠ 같이 힘내자!", tr:"啊～真的？我今天也超累的 ㅠㅠ 一起加油！"},{text:"맞아맞아... 그래도 네 메시지에 힘난다!", tr:"对对...不过你的消息给了我力量！"},{text:"푹 쉬어! 몸이 제일 중요해. 내일은 좀 나을 거야 💪", tr:"好好休息！身体最重要。明天会好一点的 💪"}],
    food:      [{text:"나 방금 떡볶이 먹었어! 완전 맛있었어 ㅋㅋ", tr:"我刚吃了炒年糕！超级好吃 哈哈"},{text:"밥은 꼭 챙겨 먹어! 건강이 제일 중요해~", tr:"一定要按时吃饭！健康最重要～"},{text:"아 배고파... 너 뭐 먹었어? 추천 좀 해줘!", tr:"啊好饿...你吃了什么？推荐一下！"}],
    practice:  [{text:"오늘 연습실에서 6시간 있었어 ㅠㅠ 다리가 안 움직여", tr:"今天在练习室待了6小时 ㅠㅠ 腿都动不了了"},{text:"새 안무 연습 중이야! 생각보다 어려운데 재밌어", tr:"在练新编舞！比想象中难但是很有趣"},{text:"연습할 때마다 느끼는 건데, 역시 노력이 답이야 💪", tr:"每次练习都感觉到，努力果然是答案 💪"}],
    stage:     [{text:"무대 생각만 해도 떨려! 하지만 설레기도 하고...", tr:"光是想到舞台就紧张！但也挺心动的..."},{text:"어제 무대에서 실수할 뻔 했는데 다행히 괜찮았어 ㅎㅎ", tr:"昨天舞台上差点失误了，幸好没事 哈哈"},{text:"팬들 함성소리 들으면 진짜 눈물 날 것 같아 ㅠㅠ", tr:"听到粉丝的欢呼声真的会想哭 ㅠㅠ"}],
    miss:      [{text:"나도 진짜 보고 싶어 ㅠㅠ 언제 만날 수 있을까?", tr:"我也真的好想你 ㅠㅠ 什么时候能见面？"},{text:"보고 싶다고 말해줘서 고마워... 진짜 힘이 돼", tr:"谢谢你告诉我想我...真的很有力量"},{text:"우리 꼭 조만간 만나자! 약속해!", tr:"我们一定很快见面的！约定！"}],
    support:   [{text:"파이팅 넘치게 응원해줘서 고마워! 나도 힘낼게!", tr:"谢谢你这么用力地支持我！我也会加油的！"},{text:"응원 소리 들으니까 더 열심히 해야겠다는 생각이 들어!", tr:"听到应援声就觉得要更加努力了！"},{text:"너의 응원이 내 원동력이야 진짜로! 🥺💕", tr:"你的应援真的是我的原动力！ 🥺💕"}],
    schedule:  [{text:"내일 스케줄? 아침부터 저녁까지 꽉 차있어 ㅠㅠ", tr:"明天的行程？从早到晚排满了 ㅠㅠ"},{text:"이번 주 진짜 바빠! 그래도 재밌는 일들이야", tr:"这周真的忙！不过都是有趣的事"},{text:"주말엔 좀 쉴 수 있을 것 같아! 영화 보러 갈까?", tr:"周末好像可以休息一下！去看电影吗？"}],
    health:    [{text:"걱정해줘서 고마워! 요즘 컨디션 관리 잘 하고 있어", tr:"谢谢关心！最近状态管理得很好"},{text:"감기 조심해! 나도 어제 목이 좀 아팠어...", tr:"小心感冒！我昨天嗓子也有点疼..."},{text:"비타민 꼭 챙겨 먹어! 건강이 제일이야", tr:"一定要吃维生素！健康第一"}],
    album:     [{text:"새 앨범? 흠... 말할 수 있는 건, 진짜 좋아! 🤫", tr:"新专辑？嗯...能说的是，真的很棒！ 🤫"},{text:"이번 앨범에 내가 작사한 곡이 있어! 기대해줘!", tr:"这次专辑里有我作词的歌！敬请期待！"},{text:"컴백 준비 열심히 하고 있어! 조금만 기다려줘 💕", tr:"在努力准备回归！再等我一下 💕"}],
    general:   [{text:"ㅋㅋㅋ 맞아맞아 완전 공감해!", tr:"哈哈哈对对完全同感！"},{text:"아~ 그렇구나! 나도 그런 적 있어", tr:"啊～原来如此！我也有过这样的经历"},{text:"얘기해줘서 고마워! 다음에 또 연락해~", tr:"谢谢你跟我说！下次再联系～"},{text:"진짜? 대박! 나도 완전 신나!", tr:"真的吗？太厉害了！我也超兴奋！"},{text:"좋은 하루 보내! 내일 또 연락할게 💜", tr:"过个好日子！明天再联系 💜"}],
  },

  instagram: {
    greeting:  [{text:"Hi there! Thanks for reaching out 💕 How are you?",tr:"嗨！谢谢你发来消息 💕 你好吗？"}],
    thanks:    [{text:"That's so kind of you! Really means the world 🥺",tr:"你太善良了！真的很重要 🥺"},{text:"Thank you for the love! You're amazing 💜",tr:"谢谢你的爱！你太棒了 💜"}],
    tired:     [{text:"Honestly same... been practicing all day. But your message helps!",tr:"说实话我也是...练了一整天。但你的消息有帮助！"},{text:"So tired but so worth it! The stage is calling 🎤",tr:"很累但是值得！舞台在呼唤 🎤"}],
    food:      [{text:"Just had some tteokbokki! Korean food is the best 😋",tr:"刚吃了炒年糕！韩国食物最棒了 😋"}],
    practice:  [{text:"Practicing new choreo! It's tough but I love it 💃",tr:"在练新编舞！很辛苦但我爱 💃"},{text:"Dance practice never ends lol. But that's the idol life!",tr:"舞蹈练习永远不会结束哈哈。但这就是偶像生活！"}],
    stage:     [{text:"Stage days are my favorite! The energy is unreal ✨",tr:"舞台日是我最喜欢的！能量不真实 ✨"}],
    miss:      [{text:"I miss you all too! Can't wait for the next concert 🥺",tr:"我也想你们！等不及下次演唱会了 🥺"}],
    support:   [{text:"Your support keeps me going. Seriously. Thank you 💜",tr:"你的支持让我继续前进。真的。谢谢你 💜"},{text:"I have the best fans in the world. Don't fight me on this!",tr:"我有世界上最好的粉丝。别跟我争这个！"}],
    album:     [{text:"Can't say much but... something special is coming 🤫",tr:"不能说太多但是...特别的东西要来了 🤫"}],
    general:   [{text:"Aww you're the sweetest! Made me smile 😊",tr:"哇你最甜了！让我笑了 😊"},{text:"Love that! Keep being awesome 💕",tr:"爱了！继续做最棒的 💕"},{text:"Honestly, fans like you are why I do this 🥺",tr:"说实话，像你这样的粉丝是我做这行的原因 🥺"},{text:"Sending you the biggest virtual hug! 🤗💜",tr:"给你最大的虚拟拥抱！ 🤗💜"}],
  },

  wechat: {
    greeting:  [{text:"早啊～今天也要元气满满！",tr:"早啊～今天也要元气满满！"}],
    thanks:    [{text:"客气啦，应该的～",tr:"客气啦，应该的～"},{text:"谢谢！你也是，辛苦了",tr:"谢谢！你也是，辛苦了"}],
    tired:     [{text:"确实有点累，不过还好，撑得住",tr:"确实有点累，不过还好，撑得住"},{text:"最近行程比较密，但忙得挺开心的",tr:"最近行程比较密，但忙得挺开心的"}],
    food:      [{text:"还没吃呢，练完就去。你吃了吗？",tr:"还没吃呢，练完就去。你吃了吗？"}],
    practice:  [{text:"刚练完舞，今天的编舞进度不错",tr:"刚练完舞，今天的编舞进度不错"},{text:"还在练习室呢，一会儿还要录一段",tr:"还在练习室呢，一会儿还要录一段"}],
    schedule:  [{text:"好的收到，我记下了！",tr:"好的收到，我记下了！"},{text:"没问题，时间我知道了，会准时到的",tr:"没问题，时间我知道了，会准时到的"}],
    health:    [{text:"放心，我有在注意身体的。你也多保重",tr:"放心，我有在注意身体的。你也多保重"},{text:"最近睡眠还行，比之前好多了",tr:"最近睡眠还行，比之前好多了"}],
    album:     [{text:"专辑在准备了，还不能说太多，但应该不会让大家失望",tr:"专辑在准备了，还不能说太多，但应该不会让大家失望"}],
    general:   [{text:"收到！我看看再回复你",tr:"收到！我看看再回复你"},{text:"好的好的，我知道了",tr:"好的好的，我知道了"},{text:"嗯嗯，辛苦了辛苦了！",tr:"嗯嗯，辛苦了辛苦了！"},{text:"没问题，你安排吧。我相信你",tr:"没问题，你安排吧。我相信你"},{text:"好的～谢谢你通知我",tr:"好的～谢谢你通知我"}],
  },

  twitter: {
    greeting:  [{text:"heyy! thanks for the dm 💙",tr:"嘿！谢谢你的私信 💙"}],
    thanks:    [{text:"fr thank you. means everything 🫶",tr:"真的谢谢你。意味着一切 🫶"},{text:"y'all are too kind. seriously 🤍",tr:"你们都太善良了。真的 🤍"}],
    tired:     [{text:"just finished a 6hr practice. my body is screaming lol",tr:"刚结束了6小时练习。我的身体在尖叫哈哈"}],
    stage:     [{text:"the energy tonight was INSANE. thank you all! 🔥",tr:"今晚的能量太疯狂了。谢谢大家！ 🔥"}],
    support:   [{text:"best fandom. no cap. love you all 🫶",tr:"最好的粉丝群。不骗人。爱你们所有人 🫶"}],
    album:     [{text:"👀 that's all i'm gonna say...",tr:"👀 我就说这么多..."},{text:"stay tuned. trust me on this one 🤫",tr:"敬请期待。相信我这一次 🤫"}],
    general:   [{text:"real ones know what's up 💯",tr:"懂的人都懂 💯"},{text:"haha fr fr. you get it",tr:"哈哈真的真的。你懂"},{text:"sending good vibes your way ✨",tr:"给你发送好的氛围 ✨"},{text:"this made my day. thank you 🥺",tr:"这让我开心了一整天。谢谢你 🥺"}],
  },

  bubble: {
    greeting:  [{text:"안녕! 오늘 하루 잘 보냈어요? 저는 방금 연습 끝났어요 ㅎㅎ",tr:"你好！今天过得好吗？我刚结束练习 嘿嘿"},{text:"우리 팬들~ 보고 싶어서 왔어요! 💕",tr:"我们的粉丝们～想你们了所以来了！ 💕"}],
    thanks:    [{text:"고마워요... 이런 말 들을 때마다 진짜 힘이 나요 💕",tr:"谢谢...每次听到这样的话就真的有力量 💕"},{text:"제가 더 감사하죠! 항상 곁에 있어줘서 고마워요 🥺",tr:"我更感谢才对！谢谢你一直在我身边 🥺"}],
    tired:     [{text:"솔직히 오늘 좀 힘들었어요... 그런데 팬들 생각하면서 버텼어요!",tr:"说实话今天有点累...但是想着粉丝们撑下来了！"},{text:"몸은 피곤한데 마음은 너무 행복해요. 여러분 덕분이에요 💕",tr:"身体很累但心里很幸福。多亏了你们 💕"}],
    food:      [{text:"오늘 저녁은 치킨이에요! 여러분은 뭐 드셨어요? ㅎㅎ",tr:"今天晚饭是炸鸡！大家吃了什么？嘿嘿"},{text:"맛있는 거 먹고 힘내요! 저도 방금 간식 먹었어요 🍰",tr:"吃点好吃的加油吧！我也刚吃了零食 🍰"}],
    practice:  [{text:"새 안무 연습 중인데 생각보다 어려워요 ㅠㅠ 그래도 재밌어요!",tr:"在练新编舞，比想象中难 ㅠㅠ 但是很有趣！"},{text:"오늘 연습실에서 8시간 있었어요... 다리가 후들거려요 ㅋㅋ",tr:"今天在练习室待了8小时...腿都在抖 哈哈"}],
    miss:      [{text:"저도 너무 보고 싶어요! 빨리 팬들 만나고 싶어요 ㅠㅠ 💕",tr:"我也好想你们！好想快点见到粉丝们 ㅠㅠ 💕"},{text:"보고 싶다는 말에 제 마음이 다 녹아요... 고마워요 🥺",tr:"听到想我这句话我的心都化了...谢谢你 🥺"}],
    support:   [{text:"여러분의 응원이 제 가장 큰 힘이에요! 진짜로요! 💪💕",tr:"大家的应援是我最大的力量！真的！ 💪💕"},{text:"팬들 덕분에 오늘도 웃을 수 있어요. 사랑해요 💜",tr:"多亏了粉丝今天也能笑着。爱你们 💜"}],
    health:    [{text:"걱정해줘서 고마워요! 비타민도 챙겨 먹고 잘 자고 있어요~",tr:"谢谢担心我！维生素也在吃，也在好好睡觉～"},{text:"여러분도 감기 조심하세요! 건강이 제일 중요해요",tr:"大家也要小心感冒！健康最重要"}],
    album:     [{text:"사실... 새 앨범 준비 중이에요! 조금만 기다려 주세요 🤫💕",tr:"其实...在准备新专辑！再等一下下哦 🤫💕"},{text:"이번에 정말 특별한 노래가 있어요. 빨리 들려주고 싶어요!",tr:"这次有一首非常特别的歌。好想快点让你们听到！"}],
    weather:   [{text:"오늘 날씨 진짜 좋지 않아요? 산책하고 싶어요 ☀️",tr:"今天天气真的很好不是吗？好想去散步 ☀️"},{text:"비 오는 날은 연습실에 있기 딱 좋아요 ㅎㅎ",tr:"下雨天待在练习室刚刚好 嘿嘿"}],
    general:   [{text:"오늘 하루도 수고했어요! 우리 팬들 최고예요 💕",tr:"今天一天也辛苦了！我们粉丝最棒了 💕"},{text:"항상 고맙고 사랑해요. 내일도 연락할게요! 🥰",tr:"一直都很感谢也很爱你们。明天也会联系的！ 🥰"},{text:"편지 읽으면서 진짜 많이 울었어요... 감동이에요 ㅠㅠ",tr:"读信的时候真的哭了很多...太感动了 ㅠㅠ"},{text:"여러분은 제 인생의 선물이에요. 진심으로요 💝",tr:"你们是我人生的礼物。真心的 💝"},{text:"오늘 꿈에 팬들 나왔어요! 보고 싶어서 그런가 봐요 ㅎㅎ",tr:"今天梦到粉丝们了！可能是太想你们了吧 嘿嘿"}],
  },
};

function smartReply(userText, appId) {
  var pool = smartPools[appId] || smartPools.kakaotalk;
  var topics = detectTopic(userText, appId);
  var convKey = getConvKey();

  // 优先匹配话题，30%概率随机（增加变化）
  var useRandom = Math.random() < 0.3;
  var topic = useRandom ? topics[Math.floor(Math.random() * topics.length)] : topics[0];

  // 确保话题存在，否则用 general
  if (!pool[topic]) topic = "general";

  return pickReply(pool[topic], convKey);
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
  $$("#idolType .opt-chip").forEach(function(chip) {
    chip.classList.toggle("active", chip.dataset.value === (data.idolType || "group"));
  });
  $$("#personality .opt-chip").forEach(function(chip) {
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

// =============================================
// 发布动态功能
// =============================================
function getUserPostsKey() {
  return "user_posts_" + currentApp;
}

function loadUserPosts() {
  try {
    return JSON.parse(localStorage.getItem(getUserPostsKey()) || "[]");
  } catch (e) { return []; }
}

function saveUserPosts(posts) {
  localStorage.setItem(getUserPostsKey(), JSON.stringify(posts));
}

function openComposer() {
  composeOverlay.classList.remove("hidden");
  composeText.value = "";
  composeImageData = null;
  composePreview.classList.add("hidden");
  composeImageArea.classList.remove("hidden");
  composeImgInput.value = "";
  composeSubmit.disabled = true;
  composeText.focus();
}

function closeComposer() {
  composeOverlay.classList.add("hidden");
}

composeText.addEventListener("input", function() {
  composeSubmit.disabled = !composeText.value.trim() && !composeImageData;
});

composeImgInput.addEventListener("change", function(e) {
  var file = e.target.files && e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    composeImageData = ev.target.result;
    composePreviewImg.src = composeImageData;
    composePreview.classList.remove("hidden");
    composeImageArea.classList.add("hidden");
    composeSubmit.disabled = false;
  };
  reader.readAsDataURL(file);
});

composeRemoveImg.addEventListener("click", function() {
  composeImageData = null;
  composePreview.classList.add("hidden");
  composeImageArea.classList.remove("hidden");
  composeImgInput.value = "";
  composeSubmit.disabled = !composeText.value.trim();
});

composeCancel.addEventListener("click", closeComposer);
composeOverlay.addEventListener("click", function(e) {
  if (e.target === composeOverlay) closeComposer();
});

fabPost.addEventListener("click", openComposer);

composeSubmit.addEventListener("click", function() {
  var text = composeText.value.trim();
  if (!text && !composeImageData) return;

  var post = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: text,
    image: composeImageData || null,
    time: "刚刚",
    timestamp: Date.now(),
    likes: 0,
    liked: false,
    comments: []
  };

  var posts = loadUserPosts();
  posts.unshift(post);
  saveUserPosts(posts);

  closeComposer();

  // 刷新动态页
  if (currentScreen === "feed") {
    refreshFeed();
  }
});

function renderUserPost(post) {
  var imgHtml = post.image
    ? '<div class="feed-image" style="height:auto;background:transparent;"><img src="' + post.image + '" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;" /></div>'
    : "";
  var timeStr = post.time;
  if (post.timestamp) {
    var elapsed = Math.floor((Date.now() - post.timestamp) / 1000 / 60);
    if (elapsed < 1) timeStr = "刚刚";
    else if (elapsed < 60) timeStr = elapsed + "分钟前";
    else if (elapsed < 1440) timeStr = Math.floor(elapsed / 60) + "小时前";
    else timeStr = Math.floor(elapsed / 1440) + "天前";
  }
  return '<div class="feed-item user-post" data-post-id="' + post.id + '">' +
    '<div class="feed-header">' +
      feedAvatarHtml("linear-gradient(135deg,#FF6BA6,#C44569)", "我") +
      '<div><div class="feed-user">我</div><div class="feed-time">' + timeStr + '</div></div>' +
    '</div>' +
    (post.text ? '<div class="feed-body">' + post.text + '</div>' : '') +
    imgHtml +
    '<div class="feed-actions">' +
      '<span class="feed-like-btn">♡ ' + (post.likes || 0) + '</span>' +
      '<span>💬 ' + (post.comments ? post.comments.length : 0) + '</span>' +
    '</div>' +
  '</div>';
}

// 公开平台（Twitter/IG/Bubble）vs 私密平台（KakaoTalk/微信）
function isPublicPlatform() {
  return currentApp === "twitter" || currentApp === "instagram" || currentApp === "bubble";
}

// 每条动态分配 15-25 条评论
function getCommentCount() { return 100 + Math.floor(Math.random() * 101); }

// 多语言粉丝评论池（精简版，实际生成时随机组合）
var fanNamesByLang = {
  en: ["@kpop_lover","@music_fan22","@hanon_stan","@idol_world","@stage_addict","@melody_heart","@global_fan","@bts_army","@blink_4ever","@korea_fan"],
  ko: ["@별빛소녀","@음악사랑","@아이돌팬","@서울하늘","@부산갈매기","@제주바다","@꽃길걷자","@달빛소년","@봄날의약속","@겨울연가"],
  jp: ["@東京LOVE","@大阪ファン","@札幌の星","@福岡もも","@名古屋ドリーム","@横浜ベイ","@京都はんなり","@神戸ビーナス","@沖縄サンセット","@仙台ずんだ"],
  zh: ["@追星少女","@娱乐圈观察","@今天也在磕","@打工人摸鱼","@吃瓜群众","@音乐发烧友","@舞台控","@路人甲","@铁粉不解释","@实力至上了"],
  es: ["@fan_latina","@kpop_mexico","@chile_idol","@peru_music","@brazil_kpop","@colombia_dance"],
  th: ["@ไทยเลิฟ","@กรุงเทพแฟน","@เชียงใหม่ติ่ง","@ภูเก็ตคลั่ง","@พัทยารัก"],
};

var positiveComments = {
  en: ["You're literally glowing! ✨","Best artist of this generation fr","I can't stop watching this","This made my whole day 💜","Iconic behavior honestly","No one is doing it like you","Stanning you was the best decision","Pure talent, no debate","My queen/king 👑","Literally crying tears of joy rn 😭","This is why you're my bias","Talented, brilliant, incredible, amazing","Period. 💅","Saving this forever","You never disappoint"],
  ko: ["진짜 미쳤다... 너무 예뻐요 ㅠㅠ","역시 최고예요! 💕","오늘도 반합니다...","이게 진정한 실력이지","팬이길 잘했다고 느끼는 순간","언니 완전 천재 아니에요?","심장이 아파요 너무 좋아서","매일매일 레전드 갱신 중","이번에도 역시 대박","존재 자체가 선물이야","인정할 수밖에 없는 실력","감동이에요 진짜 ㅠㅠ","무대 장악력 최고","이걸 어떻게 참아요","역대급 비주얼"],
  jp: ["本当に美しいです ✨","最高のアーティスト！","毎日癒されています 💕","天才すぎます...","ずっと応援します！","感動で涙が止まらない","完璧なパフォーマンス","日本から愛を込めて 🇯🇵","あなたの声が世界を変える","今日もお疲れ様でした！","こんなに素敵な人はいない","一目惚れしました","努力が報われて良かった","来月の公演楽しみです！","永遠にファンでいる"],
  zh: ["绝了，这就是实力 ✨","今天也被圈粉了","为什么这么好看我不理解","一天不看浑身难受","路人转粉只需要一张照片","我不允许有人没看过这个","这谁顶得住啊","天选之女/子","我宣布这是本月最佳","好看这两个字我已经说倦了","这种程度是真实存在的吗","每天都被惊艳到","不愧是你 👍","无法用语言形容的好","出道以来一直在进步"],
  es: ["Eres increíble! 💕","La mejor del mundo","Te amo con todo mi corazón","Nadie como tú, reina","Brasil te ama 🇧🇷","Colombia está contigo","México te apoya siempre","Qué talento, por Dios","Eres un ángel en la tierra","Simplemente perfecta"],
  th: ["ดีที่สุดในโลกเลย 💕","รักมากๆ ค่ะ","สวยมากกกก","เก่งที่สุดในสามโลก","คิดถึงจังเลย","วันนี้ก็สวยเหมือนเดิม","เป็นกำลังใจให้นะคะ","รอยยิ้มมีค่ามาก","ขอให้มีความสุขมากๆ","รักตั้งแต่วันแรก"],
};

var neutralComments = {
  en: ["Not bad","Is this new?","When is the next album coming?","I prefer the old style tbh","Interesting...","What song is this?","Can someone translate?","Has anyone seen the new teaser?","I'm new here, what's going on?","Just passing by","Who is this?","Reminds me of someone else","Not my cup of tea but ok","The production could be better","Needs more promo imo"],
  ko: ["오...","이번 컨셉은 뭐지?","솔직히 저번 게 더 좋았어요","신곡 언제 나와요?","음... 그냥 그래요","무대는 좋은데 노래가 아쉽","표정이 좀 어색한 것 같아요","다음엔 더 잘하길","기대보다는 별로","이 노래 제목이 뭐예요?","아이돌 이름이 뭐죠?","그냥 지나가다가","댓글 남기고 갑니다","무난무난하네요","호불호 갈릴 듯"],
  jp: ["うーん...普通かな","前の方が好きだった","新曲まだですか？","誰か翻訳して","この曲なんですか？","悪くはないけど...","期待してたのと違う","もっと練習してほしい","ちょっと微妙","通りすがりです","あんまり好みじゃない","衣装がイマイチ","もっと頑張ってほしい","なんか違うんだよなあ","次のアルバムに期待"],
  zh: ["还行吧","感觉不如上次","有没有人觉得一般","新歌什么时候出","纯路人，这是谁","说实话有点失望","造型不太行","风格变了不太适应","能听，但不够惊艳","pass","就那样吧","粉丝别喷我，一般般","需要更多好歌","上一个舞台更好","没有记忆点"],
};

var negativeComments = {
  en: ["Overrated af 🙄","This is so boring","Try harder next time","Not impressed at all","Stop trying so hard","Generic and forgettable","I've seen better from nugu groups","Lip sync is obvious","Auto-tune can't save this","Disappointing comeback tbh","Why is this trending?","Y'all praise anything these days","Mid at best","Copying someone else's style","Peaked already"],
  ko: ["별로다...","이게 왜 난리야","솔직히 못하네요","실력이 늘긴 하나요?","표정이 너무 과해요","과대평가됐네","립싱크 티나요","예전이 더 나았어요","이런 걸 왜 응원함","실망이에요 진짜","무대 매너가 별로","춤선이 안 예뻐요","가창력 좀 키우세요","팬들 눈이 삐었나","퇴보했네요"],
  jp: ["期待外れ...","下手になったね","リップシンクばればれ","つまらない","こんなの誰が聞くの","お金の無駄","ファンがかわいそう","全然ダメ","昔の方がマシ","やる気あるの？","もう引退したら","レベル低すぎ","恥ずかしくないの","どこがいいのかわからない","時間返して"],
  zh: ["这也太一般了","过誉了吧","粉丝滤镜太厚","说实话挺难听的","这也能吹上天","不知道在火什么","泯然众人矣","巅峰期过了吧","嘴型都对不上","越来越不行了","就这？","真的get不到","录音室歌手罢了","离开修音不能听","跳舞像广播体操"],
};

var replyToFanComments = {
  en: ["@kpop_lover totally agree!","@music_fan22 same here 💕","@hanon_stan fr fr","@idol_world you said it","Right? @stage_addict gets it","@melody_heart exactly my thoughts","This 100% @global_fan","Couldn't agree more @korea_fan"],
  ko: ["@별빛소녀 인정이요","@음악사랑 저도요!","@서울하늘 공감합니다","맞아요 @부산갈매기 님","@제주바다 진짜 그렇죠","@봄날의약속 인정 인정"],
  jp: ["@東京LOVE 同感です！","@大阪ファン そうですよね","@札幌の星 わかります"],
  zh: ["@追星少女 说得对","@娱乐圈观察 +1","@吃瓜群众 附议"],
};

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateComments(count) {
  var comments = [];
  var langs = isPublicPlatform() ? ["en","ko","jp","zh","es","th"] : ["zh"];
  // 语言权重：根据平台调整
  var weights;
  if (currentApp === "twitter") weights = { en: 35, ko: 20, jp: 10, zh: 10, es: 10, th: 5 };
  else if (currentApp === "instagram") weights = { en: 30, ko: 15, jp: 10, zh: 8, es: 15, th: 7 };
  else if (currentApp === "bubble") weights = { ko: 50, en: 15, jp: 15, zh: 15, es: 3, th: 2 };
  else weights = { zh: 100 };

  var totalW = 0; for (var l in weights) totalW += weights[l];

  for (var i = 0; i < count; i++) {
    // 随机选择语言
    var r = Math.random() * totalW;
    var lang = "en";
    for (var l in weights) { r -= weights[l]; if (r <= 0) { lang = l; break; } }

    // 50% 正面, 20% 中性, 15% 负面, 15% 粉丝互动回复
    var toneRand = Math.random();
    var tone, pool;
    if (toneRand < 0.5) { tone = "positive"; pool = positiveComments; }
    else if (toneRand < 0.8) { tone = "neutral"; pool = neutralComments; }
    else if (toneRand < 0.85) { tone = "negative"; pool = negativeComments; }
    else { tone = "reply"; pool = replyToFanComments; }

    var texts = pool[lang] || pool["en"];
    var names = fanNamesByLang[lang] || fanNamesByLang["en"];
    var text = randomFrom(texts);
    if (tone === "reply") text = randomFrom(replyToFanComments[lang] || replyToFanComments["en"]);

    var comment = {
      id: "c" + i,
      user: randomFrom(names),
      text: text,
      tone: tone,
      likes: tone === "positive" ? Math.floor(Math.random() * 45) + 3 :
             tone === "negative" ? Math.floor(Math.random() * 8) :
             Math.floor(Math.random() * 15),
      lang: lang,
    };

    // 部分评论有嵌套回复
    if (Math.random() < 0.15 && comments.length > 0) {
      var parent = comments[Math.floor(Math.random() * comments.length)];
      if (!parent.replies) parent.replies = [];
      parent.replies.push({
        id: comment.id + "r",
        user: randomFrom(names),
        text: tone === "reply" ? randomFrom(replyToFanComments[lang] || replyToFanComments["en"]) : randomFrom(neutralComments[lang] || neutralComments["en"]),
        likes: Math.floor(Math.random() * 8),
      });
    } else {
      comments.push(comment);
    }
  }
  return comments;
}

function renderComments(comments) {
  if (!comments || comments.length === 0) return "";
  var display = comments.slice(0, 30); // 最多显示30条
  var html = '<div class="feed-comments">';
  display.forEach(function(c) {
    html += '<div class="comment-item ' + (c.tone === "negative" ? "comment-negative" : "") + '">' +
      '<span class="comment-user">' + c.user + '</span>' +
      '<span class="comment-text">' + c.text + '</span>' +
      '<span class="comment-likes">♡ ' + c.likes + '</span>' +
    '</div>';
    if (c.replies) {
      c.replies.forEach(function(r) {
        html += '<div class="comment-item comment-reply">' +
          '<span class="comment-user">' + r.user + '</span>' +
          '<span class="comment-text">' + r.text + '</span>' +
          '<span class="comment-likes">♡ ' + r.likes + '</span>' +
        '</div>';
      });
    }
  });
  if (comments.length > 30) {
    html += '<div class="comment-more">查看全部 ' + comments.length + ' 条评论...</div>';
  }
  html += '</div>';
  return html;
}

// 评论缓存（同一次浏览保持一致）
var commentCache = {};

function refreshFeed() {
  var data = getAppData(currentApp);
  var mockItems = data.feedItems;
  var userPosts = loadUserPosts();
  var isPublic = isPublicPlatform();
  var allItems = [];

  // 用户帖子
  userPosts.forEach(function(p) {
    // 为用户帖子生成评论（仅公开平台）
    if (isPublic && !commentCache[p.id]) {
      commentCache[p.id] = generateComments(getCommentCount());
    }
    var comments = isPublic ? (commentCache[p.id] || []) : [];
    allItems.push({
      type: "user",
      html: renderUserPost(p, comments),
      id: p.id,
      post: p
    });
  });

  // Mock 数据
  mockItems.forEach(function(item, i) {
    var mockId = "mock_" + i;
    if (isPublic && !commentCache[mockId]) {
      commentCache[mockId] = generateComments(getCommentCount());
    }
    var comments = isPublic ? (commentCache[mockId] || []) : [];
    allItems.push({
      type: "mock",
      html: renderFeedItemHtml(item, comments),
      id: mockId
    });
  });

  feedItems.innerHTML = allItems.map(function(a) { return a.html; }).join("");

  // 点赞事件
  feedItems.querySelectorAll(".feed-like-btn").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      var postEl = btn.closest(".user-post");
      if (!postEl) return;
      var postId = postEl.dataset.postId;
      var posts = loadUserPosts();
      var post = posts.find(function(p) { return p.id === postId; });
      if (!post) return;
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      if (post.likes < 0) post.likes = 0;
      saveUserPosts(posts);
      btn.textContent = (post.liked ? "♥ " : "♡ ") + post.likes;
    });
  });

  // 评论展开/收起
  feedItems.querySelectorAll(".comment-toggle").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var commentsEl = btn.nextElementSibling;
      var isShowing = !commentsEl.classList.contains("hidden");
      if (isShowing) {
        commentsEl.classList.add("hidden");
        btn.textContent = "💬 查看评论";
      } else {
        commentsEl.classList.remove("hidden");
        btn.textContent = "💬 收起评论";
      }
    });
  });
}

function renderUserPost(post, comments) {
  var isPublic = isPublicPlatform();
  var imgHtml = post.image
    ? '<div class="feed-image" style="height:auto;background:transparent;"><img src="' + post.image + '" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;" /></div>'
    : "";

  var elapsed = post.timestamp ? Math.floor((Date.now() - post.timestamp) / 1000 / 60) : 0;
  var timeStr = post.time || (elapsed < 1 ? "刚刚" : elapsed < 60 ? elapsed + "分钟前" : elapsed < 1440 ? Math.floor(elapsed / 60) + "小时前" : Math.floor(elapsed / 1440) + "天前");

  var actionsHtml = isPublic
    ? '<span class="feed-like-btn">' + (post.liked ? "♥ " : "♡ ") + (post.likes || 0) + '</span><span class="comment-toggle" style="cursor:pointer;">💬 查看评论</span>'
    : '';

  return '<div class="feed-item user-post" data-post-id="' + post.id + '">' +
    '<div class="feed-header">' +
      feedAvatarHtml("linear-gradient(135deg,#FF6BA6,#C44569)", "我") +
      '<div><div class="feed-user">我</div><div class="feed-time">' + timeStr + '</div></div>' +
    '</div>' +
    (post.text ? '<div class="feed-body">' + post.text + '</div>' : '') +
    imgHtml +
    (actionsHtml ? '<div class="feed-actions">' + actionsHtml + '</div>' : '') +
    (isPublic ? '<div class="feed-comments hidden">' + renderComments(comments) + '</div>' : '') +
  '</div>';
}

function renderFriendInteractions(item) {
  var html = '';
  var names = item.friendLikes || [];
  var comments = item.friendComments || [];
  if (names.length > 0) {
    var likeStr = names.slice(0, 5).join(', ');
    if (names.length > 5) likeStr += ' 等' + names.length + '人';
    html += '<div class="friend-likes">❤️ ' + likeStr + '</div>';
  }
  if (comments.length > 0) {
    html += '<div class="friend-comments">';
    comments.forEach(function(c) {
      html += '<div class="fc-item"><b>' + c.user + '</b>：' + c.text + '</div>';
    });
    html += '</div>';
  }
  return html;
}

function renderFeedItemHtml(item, comments) {
  var isPublic = isPublicPlatform();
  var actionsHtml;
  if (isPublic) {
    actionsHtml = '<div class="feed-actions"><span>♡ ' + (item.likes || 0) + '</span>' + (item.rt ? '<span>↺ ' + item.rt + '</span>' : '') + '<span class="comment-toggle" style="cursor:pointer;">💬 查看评论</span></div>';
  } else {
    actionsHtml = renderFriendInteractions(item);
    if (!actionsHtml && item.likes) actionsHtml = '<div class="feed-actions"><span>♡ ' + item.likes + '</span></div>';
  }
  return '<div class="feed-item">' +
    '<div class="feed-header">' +
      feedAvatarHtml(item.color, item.letter, item.role) +
      '<div><div class="feed-user">' + item.user + '</div><div class="feed-time">' + item.time + '</div></div>' +
    '</div>' +
    (item.img ? '<div class="feed-image">' + item.img + '</div>' : '') +
    '<div class="feed-body">' +
      '<span class="feed-text-orig">' + item.body + '</span>' +
      (item.tr && item.tr !== item.body
        ? '<button class="msg-translate-btn" onclick="var t=this.nextElementSibling;t.classList.toggle('show');this.textContent=t.classList.contains('show')?'收起':'译'">译</button><div class="msg-translation">' + item.tr + '</div>'
        : '') +
    '</div>' +
    actionsHtml +
    (isPublic ? '<div class="feed-comments hidden">' + renderComments(comments) + '</div>' : '') +
  '</div>';
}

// =============================================
// 设定页提交按钮
// =============================================
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

  // 全局悬浮安装条
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

function handleInstallClick() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result) {
      if (result.outcome === "accepted") {
        if (globalInstallBar) globalInstallBar.classList.add("dismissed");
        globalBarDismissed = true;
      }
      deferredPrompt = null;
    });
    return;
  }
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

safeClick(gibBtn, handleInstallClick);

window.addEventListener("beforeinstallprompt", function(e) {
  e.preventDefault();
  deferredPrompt = e;
  if (gibText && gibBtn) {
    gibText.textContent = "一键安装到桌面";
    gibBtn.textContent = "立即安装";
    if (globalInstallBar) globalInstallBar.classList.remove("dismissed");
  }
});

// =============================================
// 实时时间 + 电量同步
// =============================================
function syncStatusBar() {
  var timeEl = document.getElementById("liveTime");
  var batEl  = document.getElementById("liveBattery");
  if (!timeEl && !batEl) return;

  function updateTime() {
    if (!timeEl) return;
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    timeEl.textContent = h + ":" + (m < 10 ? "0" + m : m);
  }

  function updateBattery(level, charging) {
    if (!batEl) return;
    var pct = Math.round(level * 100);
    var blocks = Math.round(pct / 10);
    var bar = "";
    for (var i = 0; i < 10; i++) {
      bar += i < blocks ? "▮" : "▯";
    }
    batEl.textContent = bar + " " + pct + "%";
    if (charging) batEl.textContent += " ⚡";
  }

  updateTime();
  setInterval(updateTime, 30000); // 每30秒更新

  if (navigator.getBattery) {
    navigator.getBattery().then(function(bat) {
      updateBattery(bat.level, bat.charging);
      bat.addEventListener("levelchange", function() { updateBattery(bat.level, bat.charging); });
      bat.addEventListener("chargingchange", function() { updateBattery(bat.level, bat.charging); });
    });
  } else if (batEl) {
    // 不支持 Battery API 时保留默认显示
    batEl.textContent = "▮▮▮▮ ▮▮▮▮ --";
  }
}

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

  // 实时时间电量
  syncStatusBar();

  // 检查是否有已保存的偶像资料
  var profile = loadProfile();
  if (profile && profile.stageName) {
    fillForm(profile);
    enterPhone();
  } else {
    showSetupScreen(false);
  }
})();
