// EDUTUBE ERROR DETECTOR

window.addEventListener("error", function(event) {
    console.error("JavaScript Error:", event.message);

    let box = document.getElementById("debugError");

    if (!box) {
        box = document.createElement("div");
        box.id = "debugError";

        box.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
            z-index: 999999;
            background: #7f1d1d;
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 13px;
        `;

        document.body.appendChild(box);
    }

    box.textContent =
        "ERROR: " + event.message +
        " | Line: " + event.lineno;
});

window.addEventListener("unhandledrejection", function(event) {
    console.error("Promise Error:", event.reason);
});







// Supabase connection: use your own Project URL and Publishable Key here.
const SUPABASE_URL = "https://gmqrkerbwgojcsrkrixw.supabase.co";
const SUPABASE_KEY = "sb_publishable_7-vykSxfOVju01fXo7ze2Q_i5f3CtzY";

const supabaseClient = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const $ = (id) => document.getElementById(id);

// Centralized page-scroll handling: prevents stale overflow locks on mobile.
let pageScrollY = 0;
function lockPageScroll() {
  pageScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add("scroll-locked");
  document.body.classList.add("scroll-locked");
}
function unlockPageScroll() {
  document.documentElement.classList.remove("scroll-locked");
  document.body.classList.remove("scroll-locked", "fake-lock", "menu-open");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  if (!document.getElementById("videoModal")?.classList.contains("hidden")) return;
  window.scrollTo(0, pageScrollY);
}
const STORAGE = {videos:"edutube_v4_videos", favorites:"edutube_v4_favorites", completed:"edutube_v4_completed", attempts:"edutube_v4_attempts", theme:"edutube_v4_theme", language:"edutube_v4_language"};
const translations = {
 en:{
  navHome:"Home",navLibrary:"Video Library",navExams:"Exam Center",navFavorites:"Favorites",navDashboard:"Dashboard",navAdmin:"Content Manager",student:"Student",workspace:"WORKSPACE",yourSpace:"YOUR SPACE",keepLearning:"Keep learning!",sidebarNote:"Small steps every day lead to big results.",heroEyebrow:"YOUR LEARNING SPACE",heroTitle:"Learn today.<br><em>Lead tomorrow.</em>",heroText:"A place to learn, practice, and prepare for your next big step.",exploreLessons:"Explore lessons",overview:"OVERVIEW",learningSnapshot:"Your learning snapshot",lessonsCompleted:"Lessons completed",quizzesTaken:"Quizzes taken",savedLessons:"Saved lessons",learningProgress:"Learning progress",chooseGrade:"CHOOSE YOUR LEVEL",gradesTitle:"Explore by grade",grade:"Grade",grade9Desc:"Build your foundations",grade10Desc:"Strengthen your skills",grade11Desc:"Prepare for what is next",grade12Desc:"Get ready for exams",quickAccess:"QUICK ACCESS",jumpBack:"Pick up where you left off",browseVideos:"Browse video lessons",browseVideosDesc:"Find a topic and start learning",practiceExams:"Practice exams",practiceExamsDesc:"Test what you have learned",viewProgress:"View your progress",viewProgressDesc:"See your learning activity",learningResources:"LEARNING RESOURCES",videoLibrary:"Video library",libraryIntro:"Explore lessons organized for your grade and subject.",searchLessons:"Search lessons...",allGrades:"All grades",allSubjects:"All subjects",noLessons:"No lessons found. Try another search or filter.",yourCollection:"YOUR COLLECTION",favoritesIntro:"Lessons you have saved for later.",noFavorites:"You have not saved any lessons yet.",testYourself:"TEST YOURSELF",examIntro:"Practice with short sample quizzes.",backToExams:"Back to exams",nextQuestion:"Next question",quizComplete:"QUIZ COMPLETE",yourResult:"Your result",tryAnother:"Try another quiz",yourActivity:"YOUR ACTIVITY",dashboardIntro:"A simple overview of your learning activity.",recentActivity:"Recent activity",manageContent:"MANAGE CONTENT",adminIntro:"Add lessons to this browser's local library.",adminWarning:"Demo mode: this page has no login or server database. Anyone using this browser can edit local content.",lessonTitle:"Lesson title",lessonTitlePlaceholder:"e.g. Introduction to algebra",subject:"Subject",youtubeUrl:"Vimeo URL",description:"Description",descriptionPlaceholder:"What will students learn?",addLesson:"Add lesson",currentLessons:"Current lessons",markComplete:"Mark as completed",openYouTube:"Open on Vimeo ↗",footerText:"Learn at your pace. Build your future.",watch:"Watch lesson",save:"Save",saved:"Saved",startExam:"Start quiz",minutes:"min",noActivity:"Your activity will appear here.",noAdminLessons:"No lessons have been added yet.",correct:"Correct!",incorrect:"Not quite. The correct answer is:",timeUp:"Time is up!",scoreMessage:"You answered {score} out of {total} correctly.",lessonAdded:"Lesson added.",invalidYoutube:"Enter a valid Vimeo video URL.",lessonDeleted:"Lesson deleted.",completedNotice:"Lesson marked as completed.",savedNotice:"Saved to favorites.",removedNotice:"Removed from favorites.",videoUnavailable:"This lesson has no valid Vimeo link yet.",confirmDelete:"Delete this lesson?",questionLabel:"QUESTION",watchOnYoutube:"Watch on Vimeo",progress:"Progress",attempts:"Quiz attempts",recentLesson:"Completed lesson",quizResult:"Quiz result",
  homeWhyEyebrow:"WHY ZSECRET",homeFeaturesTitle:"Everything you need to move forward",homeFeaturesText:"A connected learning space for lessons, practice, revision and progress.",homeFeatureVideos:"Video lessons",homeFeatureVideosDesc:"Explore lessons by grade and subject.",homeFeatureExams:"Practice exams",homeFeatureExamsDesc:"Check your understanding with quizzes.",homeFeatureNotes:"Study notes",homeFeatureNotesDesc:"Review learning materials and notes.",homeFeatureStudio:"Study Studio",homeFeatureStudioDesc:"Focus timer, tasks and flashcards.",homeFeatureProgress:"Progress tracking",homeFeatureProgressDesc:"See your completed lessons and activity.",homeFeatureFavorites:"Saved favorites",homeFeatureFavoritesDesc:"Keep useful lessons close at hand.",homePathEyebrow:"YOUR LEARNING PATH",homePathTitle:"Choose a grade. Build your future.",homePathText:"Jump straight into the learning level that matches you.",homePath9:"Build strong foundations",homePath9Desc:"Start with the essentials.",homePath10:"Grow your skills",homePath10Desc:"Practice and deepen your knowledge.",homePath11:"Prepare for what is next",homePath11Desc:"Strengthen subject understanding.",homePath12:"Get exam ready",homePath12Desc:"Revise and test your knowledge.",homeStudioEyebrow:"MAKE EVERY MINUTE COUNT",homeStudioTitle:"Your personal Study Studio",homeStudioText:"Plan your sessions, focus with a timer, build flashcards and keep your study tasks organized.",homeStudioButton:"Open Study Studio →",homeSubjectsEyebrow:"EXPLORE KNOWLEDGE",homeSubjectsTitle:"Find your next topic",homeSubjectsText:"Browse the subjects available in the video library.",homeCtaEyebrow:"YOUR NEXT STEP STARTS HERE",homeCtaTitle:"Ready to keep learning?",homeCtaText:"Choose a lesson, practice a question and make progress at your own pace.",homeCtaBrowse:"Explore video library →",homeCtaExam:"Try a practice exam"
 },
 am:{
  navHome:"መነሻ",navLibrary:"የቪዲዮ ቤተ-መጻሕፍት",navExams:"የፈተና ማዕከል",navFavorites:"የተወደዱ",navDashboard:"ዳሽቦርድ",navAdmin:"የይዘት አስተዳደር",student:"ተማሪ",workspace:"የስራ ቦታ",yourSpace:"የእርስዎ ቦታ",keepLearning:"መማርዎን ይቀጥሉ!",sidebarNote:"በየቀኑ ትንሽ መሻሻል ትልቅ ውጤት ያመጣል።",heroEyebrow:"የትምህርት ቦታዎ",heroTitle:"ዛሬ ይማሩ።<br><em>ነገን ይምሩ።</em>",heroText:"ለመማር፣ ለመለማመድ እና ለቀጣይ እርምጃዎ ለመዘጋጀት የተዘጋጀ ቦታ።",exploreLessons:"ትምህርቶችን ይመልከቱ",overview:"አጠቃላይ እይታ",learningSnapshot:"የትምህርት ሁኔታዎ",lessonsCompleted:"የተጠናቀቁ ትምህርቶች",quizzesTaken:"የተወሰዱ ፈተናዎች",savedLessons:"የተቀመጡ ትምህርቶች",learningProgress:"የትምህርት እድገት",chooseGrade:"ደረጃዎን ይምረጡ",gradesTitle:"በክፍል ይፈልጉ",grade:"ክፍል",grade9Desc:"መሠረታዊ እውቀትዎን ይገንቡ",grade10Desc:"ችሎታዎን ያጠናክሩ",grade11Desc:"ለቀጣዩ ደረጃ ይዘጋጁ",grade12Desc:"ለፈተና ይዘጋጁ",quickAccess:"ፈጣን መዳረሻ",jumpBack:"ከቀጠሉበት ይቀጥሉ",browseVideos:"የቪዲዮ ትምህርቶችን ይፈልጉ",browseVideosDesc:"ርዕስ ይምረጡና መማር ይጀምሩ",practiceExams:"የልምምድ ፈተናዎች",practiceExamsDesc:"የተማሩትን ይፈትሹ",viewProgress:"እድገትዎን ይመልከቱ",viewProgressDesc:"የትምህርት እንቅስቃሴዎን ይመልከቱ",learningResources:"የትምህርት ሀብቶች",videoLibrary:"የቪዲዮ ቤተ-መጻሕፍት",libraryIntro:"በክፍልና በትምህርት የተደራጁ ቪዲዮዎችን ይመልከቱ።",searchLessons:"ትምህርቶችን ይፈልጉ...",allGrades:"ሁሉም ክፍሎች",allSubjects:"ሁሉም ትምህርቶች",noLessons:"ምንም ትምህርት አልተገኘም። ሌላ ፍለጋ ወይም ማጣሪያ ይሞክሩ።",yourCollection:"የእርስዎ ስብስብ",favoritesIntro:"ለወደፊት ያስቀመጧቸው ትምህርቶች።",noFavorites:"እስካሁን ምንም ትምህርት አላስቀመጡም።",testYourself:"ራስዎን ይፈትሹ",examIntro:"በአጭር የልምምድ ፈተናዎች ይለማመዱ።",backToExams:"ወደ ፈተናዎች ተመለስ",nextQuestion:"ቀጣይ ጥያቄ",quizComplete:"ፈተናው ተጠናቋል",yourResult:"ውጤትዎ",tryAnother:"ሌላ ፈተና ይሞክሩ",yourActivity:"የእንቅስቃሴዎ",dashboardIntro:"የትምህርት እንቅስቃሴዎ አጠቃላይ ማጠቃለያ።",recentActivity:"የቅርብ ጊዜ እንቅስቃሴ",manageContent:"ይዘትን ያስተዳድሩ",adminIntro:"በዚህ ብራውዘር የአካባቢ ማከማቻ ላይ ትምህርቶችን ይጨምሩ።",adminWarning:"የሙከራ ሁኔታ፦ ይህ ገጽ የመግቢያ ስርዓት ወይም የServer ዳታቤዝ የለውም። ይህን ብራውዘር የሚጠቀም ሰው ይዘቱን ሊቀይር ይችላል።",lessonTitle:"የትምህርት ርዕስ",lessonTitlePlaceholder:"ለምሳሌ፦ የአልጀብራ መግቢያ",subject:"ትምህርት",youtubeUrl:"የYouTube አድራሻ",description:"መግለጫ",descriptionPlaceholder:"ተማሪዎች ምን ይማራሉ?",addLesson:"ትምህርት ጨምር",currentLessons:"ያሉ ትምህርቶች",markComplete:"ተጠናቋል ብለው ምልክት ያድርጉ",openYouTube:"በYouTube ይክፈቱ ↗",footerText:"በራስዎ ፍጥነት ይማሩ። ወደፊትዎን ይገንቡ።",watch:"ትምህርቱን ይመልከቱ",save:"አስቀምጥ",saved:"ተቀምጧል",startExam:"ፈተና ጀምር",minutes:"ደቂቃ",noActivity:"እንቅስቃሴዎ እዚህ ይታያል።",noAdminLessons:"እስካሁን ምንም ትምህርት አልተጨመረም።",correct:"ትክክል!",incorrect:"ትክክል አይደለም። ትክክለኛው መልስ፦",timeUp:"ጊዜው አልቋል!",scoreMessage:"ከ{total} ጥያቄዎች {score} በትክክል መልሰዋል።",lessonAdded:"ትምህርቱ ተጨምሯል።",invalidYoutube:"ትክክለኛ የYouTube ቪዲዮ አድራሻ ያስገቡ።",lessonDeleted:"ትምህርቱ ተሰርዟል።",completedNotice:"ትምህርቱ እንደተጠናቀቀ ተመዝግቧል።",savedNotice:"ወደ ተወዳጆች ተጨምሯል።",removedNotice:"ከተወዳጆች ተወግዷል።",videoUnavailable:"ይህ ትምህርት ትክክለኛ የYouTube አድራሻ የለውም።",confirmDelete:"ይህን ትምህርት ይሰርዙ?",questionLabel:"ጥያቄ",watchOnYoutube:"በYouTube ይመልከቱ",progress:"እድገት",attempts:"የፈተና ሙከራዎች",recentLesson:"የተጠናቀቀ ትምህርት",quizResult:"የፈተና ውጤት",
  homeWhyEyebrow:"ZSECRETን ለምን ይመርጣሉ?",homeFeaturesTitle:"ወደፊት ለመራመድ የሚያስፈልግዎ ሁሉ",homeFeaturesText:"ትምህርት፣ ልምምድ፣ ክለሳ እና እድገትን በአንድ ቦታ ያገኛሉ።",homeFeatureVideos:"የቪዲዮ ትምህርቶች",homeFeatureVideosDesc:"በክፍልና በትምህርት ይፈልጉ።",homeFeatureExams:"የልምምድ ፈተናዎች",homeFeatureExamsDesc:"እውቀትዎን በጥያቄዎች ይፈትሹ።",homeFeatureNotes:"የትምህርት ማስታወሻዎች",homeFeatureNotesDesc:"የትምህርት ማቴሪያሎችን ይከልሱ።",homeFeatureStudio:"የጥናት ስቱዲዮ",homeFeatureStudioDesc:"የትኩረት ሰዓት፣ ተግባሮች እና ፍላሽ ካርዶች።",homeFeatureProgress:"የእድገት ክትትል",homeFeatureProgressDesc:"የተጠናቀቁ ትምህርቶችዎን ይመልከቱ።",homeFeatureFavorites:"የተቀመጡ ተወዳጆች",homeFeatureFavoritesDesc:"ጠቃሚ ትምህርቶችን ያስቀምጡ።",homePathEyebrow:"የትምህርት ጉዞዎ",homePathTitle:"ክፍል ይምረጡ፤ ወደፊትዎን ይገንቡ።",homePathText:"ከእርስዎ ጋር የሚስማማውን የትምህርት ደረጃ ይምረጡ።",homePath9:"ጠንካራ መሠረት ይገንቡ",homePath9Desc:"ከመሠረታዊ ነገሮች ይጀምሩ።",homePath10:"ችሎታዎን ያሳድጉ",homePath10Desc:"ይለማመዱና እውቀትዎን ያጠናክሩ።",homePath11:"ለቀጣዩ ደረጃ ይዘጋጁ",homePath11Desc:"የትምህርት ግንዛቤዎን ያጠናክሩ።",homePath12:"ለፈተና ይዘጋጁ",homePath12Desc:"ይከልሱና እውቀትዎን ይፈትሹ።",homeStudioEyebrow:"እያንዳንዱን ደቂቃ በትክክል ይጠቀሙ",homeStudioTitle:"የግል የጥናት ስቱዲዮዎ",homeStudioText:"የጥናት ጊዜዎን ያቅዱ፣ በሰዓት ይተኩሩ፣ ፍላሽ ካርዶችን ይፍጠሩ።",homeStudioButton:"የጥናት ስቱዲዮን ይክፈቱ →",homeSubjectsEyebrow:"እውቀትን ያስሱ",homeSubjectsTitle:"ቀጣይ ርዕስዎን ያግኙ",homeSubjectsText:"በቪዲዮ ቤተ-መጻሕፍት ያሉትን ትምህርቶች ይፈልጉ።",homeCtaEyebrow:"ቀጣይ እርምጃዎ እዚህ ይጀምራል",homeCtaTitle:"መማርዎን ለመቀጠል ዝግጁ ነዎት?",homeCtaText:"ትምህርት ይምረጡ፣ ጥያቄ ይለማመዱ እና በራስዎ ፍጥነት ይሻሻሉ።",homeCtaBrowse:"የቪዲዮ ቤተ-መጻሕፍትን ይመልከቱ →",homeCtaExam:"የልምምድ ፈተና ይሞክሩ"
 }
};
let language = localStorage.getItem(STORAGE.language) || "en";
let videos = read(STORAGE.videos, [
 {id:"v1",title:"Introduction to Algebra",grade:"9",subject:"Mathematics",description:"Learn variables and simple algebraic expressions.",url:""},
 {id:"v2",title:"Newton's Laws of Motion",grade:"10",subject:"Physics",description:"Understand the foundations of classical mechanics.",url:""},
 {id:"v3",title:"Cell Structure and Function",grade:"11",subject:"Biology",description:"Explore the main parts of a living cell.",url:""},
 {id:"v4",title:"Chemical Bonding",grade:"12",subject:"Chemistry",description:"An introduction to ionic and covalent bonds.",url:""}
 ]);
let favorites = read(STORAGE.favorites, []);
let completed = read(STORAGE.completed, []);
let attempts = read(STORAGE.attempts, []);
let currentVideo = null, currentExam = null, questionIndex = 0, score = 0, selectedAnswer = null, secondsLeft = 300, timerId = null, toastTimer = null;

let exams = [];
let examBankLoaded = false;
let currentAnswers = [];


function read(key, fallback){try{const value=JSON.parse(localStorage.getItem(key));return value??fallback}catch{return fallback}}
function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
function t(key,vars={}){let value=(translations[language]&&translations[language][key])||translations.en[key]||key;Object.entries(vars).forEach(([k,v])=>value=value.replaceAll(`{${k}}`,v));return value}
function applyLanguage(){
 document.documentElement.lang=language;
 document.body.lang=language;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[language][key])el.innerHTML=translations[language][key]});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{const key=el.dataset.i18nPlaceholder;if(translations[language][key])el.placeholder=translations[language][key]});
 document.getElementById("languageButton").textContent=language==="en"?"አማ":"EN";
 document.getElementById("themeButton").title=language==="am"?"ገጽታ ቀይር":"Toggle theme";
 renderAll();
}
function notify(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function getVimeoId(url){
  if(!url) return null;
  try{
    const u=new URL(url);
    const host=u.hostname.toLowerCase().replace(/^www\./,'');
    if(host!=='vimeo.com' && host!=='player.vimeo.com' && !host.endsWith('.vimeo.com')) return null;
    const parts=u.pathname.split('/').filter(Boolean);
    const id=parts.find(part=>/^\d{6,}$/.test(part));
    return id||null;
  }catch{return null;}
}
function getVimeoEmbedUrl(url){
  const id=getVimeoId(url);if(!id)return null;
  try{
    const u=new URL(url),parts=u.pathname.split('/').filter(Boolean),idIndex=parts.indexOf(id);
    const hash=u.searchParams.get('h')||(idIndex>=0&&parts[idIndex+1]&&!/^\d+$/.test(parts[idIndex+1])?parts[idIndex+1]:"");
    const embed=new URL('https://player.vimeo.com/video/'+id);
    if(hash)embed.searchParams.set('h',hash);
    embed.searchParams.set('autoplay','1');
    embed.searchParams.set('playsinline','1');
    embed.searchParams.set('controls','1');
    embed.searchParams.set('title','0');
    embed.searchParams.set('byline','0');
    embed.searchParams.set('portrait','0');
    embed.searchParams.set('dnt','1');
    return embed.toString();
  }catch{return null;}
}

function showPage(name){
 const target=$("page-"+name);if(!target)return;
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));target.classList.add("active");
 document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
 $("sidebar").classList.remove("open");
 if(name!=="quiz"&&timerId)stopTimer();
 if(name==="library")renderVideos();if(name==="favorites")renderFavorites();if(name==="exams")renderExams();if(name==="dashboard")renderDashboard();if(name==="admin")renderAdmin();
 window.scrollTo({top:0,behavior:"smooth"});
}
function videoCard(video){
 const card=document.createElement("article");card.className="video-card";
 const vid=getVimeoId(video.url);
 const thumb=document.createElement("button");thumb.type="button";thumb.className="video-thumb";thumb.setAttribute("aria-label",video.title);
 if(video.thumbnail_url)thumb.style.backgroundImage=`linear-gradient(transparent 40%,#000b),url(${video.thumbnail_url})`;else thumb.style.backgroundImage="linear-gradient(135deg,#153f77,#071426)";
 thumb.addEventListener("click",()=>openVideo(video.id));
 const chip=document.createElement("span");chip.className="thumb-chip";chip.textContent="Grade "+video.grade;
 thumb.append(chip);
 if(completed.includes(video.id)){const d=document.createElement("span");d.className="thumb-done";d.textContent="✓ Done";thumb.append(d)}
 const pc=read(PCT,{})[video.id]||0;
 if(pc>0){const bar=document.createElement("i");bar.className="thumb-bar";const f=document.createElement("b");f.style.width=Math.min(pc,100)+"%";bar.append(f);thumb.append(bar)}
 const body=document.createElement("div");body.className="video-body";
 const meta=document.createElement("div");meta.className="video-meta";meta.textContent=`GRADE ${video.grade} · ${video.subject}`;
 const title=document.createElement("h3");title.textContent=video.title;
 const desc=document.createElement("p");desc.textContent=video.description||"";
 const actions=document.createElement("div");actions.className="card-actions";
 const watch=document.createElement("button");watch.className="small-button watch";watch.textContent=t("watch");watch.addEventListener("click",()=>openVideo(video.id));
 const save=document.createElement("button");save.className="small-button";save.textContent=favorites.includes(video.id)?t("saved"):t("save");save.addEventListener("click",()=>toggleFavorite(video.id));
 actions.append(watch,save);body.append(meta,title,desc,actions);card.append(thumb,body);return card;
}
function renderVideos(){
 const grid=$("videoGrid");if(!grid)return;grid.replaceChildren();
 const query=$("videoSearch").value.trim().toLowerCase(),grade=$("videoGrade").value,subject=$("videoSubject").value;
 const categoryList=videos.filter(v=>(grade==="all"||v.grade===grade)&&(subject==="all"||v.subject===subject));
 const list=categoryList.filter(v=>`${v.title} ${v.description} ${v.subject}`.toLowerCase().includes(query));
 list.forEach(v=>grid.append(videoCard(v)));
 const empty=$("videoEmpty");empty.classList.toggle("hidden",list.length>0);
 if(!list.length){
  empty.textContent=(!query&&subject!=="all"&&!categoryList.length)?"Not Available Now — Coming Soon":"No lessons found. Try another search or filter.";
 }
}
function renderFavorites(){const grid=$("favoriteGrid");grid.replaceChildren();const list=videos.filter(v=>favorites.includes(v.id));list.forEach(v=>grid.append(videoCard(v)));$("favoriteEmpty").classList.toggle("hidden",list.length>0)}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];write(STORAGE.favorites,favorites);renderAll();notify(favorites.includes(id)?t("savedNotice"):t("removedNotice"))}

function markComplete(){if(!currentVideo)return;if(!completed.includes(currentVideo.id)){completed.push(currentVideo.id);write(STORAGE.completed,completed)}closeVideo();renderAll();notify(t("completedNotice"))}
function loadExamBank(){
 fetch("exam-bank.json",{cache:"no-store"})
  .then(r=>{if(!r.ok)throw new Error("exam-bank.json not found");return r.json()})
  .then(data=>{
   if(!Array.isArray(data))throw new Error("Exam bank format is invalid");
   exams=data.map(e=>({...e,minutes:e.questions?.length||0}));
   examBankLoaded=true;refreshExamFilters();renderExams();setTimeout(()=>$("examSubject")?.dispatchEvent(new Event("change")),0);
  })
  .catch(err=>{
   examBankLoaded=false;const grid=$("examGrid");if(grid){grid.replaceChildren();const msg=document.createElement("div");msg.className="empty-state";msg.textContent="Exam bank is not installed yet. Upload exam-bank.json to the website repository, then refresh.";grid.append(msg);}
   console.warn("Exam bank load:",err.message);
  });
}
function refreshExamFilters(){
 const type=$("examType"),grade=$("examGrade"),subject=$("examSubject"),topic=$("examTopic");
 if(!type||!grade||!subject||!topic)return;
 const keep={type:type.value,grade:grade.value,subject:subject.value,topic:topic.value};
 const opts=(el,values,label)=>{el.replaceChildren();const all=document.createElement("option");all.value="all";all.textContent=label;el.append(all);values.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.append(o);});};
 opts(type,["UEE","Weekly"],"All exam types");
 if([...type.options].some(o=>o.value===keep.type))type.value=keep.type;
 const typeVal=type.value;
 const base=exams.filter(e=>(typeVal==="all"||e.category===typeVal)&&(keep.grade==="all"||e.grade===keep.grade));
 opts(grade,[...new Set(base.map(e=>e.grade))].sort((a,b)=>Number(a)-Number(b)),"All grades");
 if([...grade.options].some(o=>o.value===keep.grade))grade.value=keep.grade;
 const filtered=exams.filter(e=>(type.value==="all"||e.category===type.value)&&(grade.value==="all"||e.grade===grade.value));
 opts(subject,[...new Set(filtered.map(e=>e.subject))].sort(),"All subjects");
 if([...subject.options].some(o=>o.value===keep.subject))subject.value=keep.subject;
 const filtered2=filtered.filter(e=>subject.value==="all"||e.subject===subject.value);
 opts(topic,[...new Set(filtered2.map(e=>e.topic))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})),"All units / topics");
 if([...topic.options].some(o=>o.value===keep.topic))topic.value=keep.topic;
}
function renderExams(){
 const grid=$("examGrid");if(!grid)return;grid.replaceChildren();
 if(!examBankLoaded){grid.textContent="Loading exam bank…";return;}
 const type=$("examType")?.value||"all",grade=$("examGrade").value,subject=$("examSubject").value,topic=$("examTopic")?.value||"all";
 const selected=exams.filter(e=>(type==="all"||e.category===type)&&(grade==="all"||e.grade===grade)&&(subject==="all"||e.subject===subject)&&(topic==="all"||e.topic===topic));
 if(!selected.length){const msg=document.createElement("p");msg.className="empty-state";msg.textContent="No exam files match these filters.";grid.append(msg);return;}
 selected.forEach(exam=>{
  const card=document.createElement("article");card.className="exam-card";
  const meta=document.createElement("div");meta.className="video-meta";meta.textContent=exam.path.join(" › ");
  const h=document.createElement("h3");h.textContent=exam.title;
  const p=document.createElement("p");p.textContent=exam.questions.length+" questions in bank · 1 minute per question";
  const b=document.createElement("button");b.className="primary-button";b.textContent="Start simulation";b.addEventListener("click",()=>startExam(exam.id));
  card.append(meta,h,p,b);grid.append(card);
 });
}
function shuffleArray(arr){const copy=arr.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function startExam(id){
 const source=exams.find(e=>e.id===id);if(!source)return;
 const setting=$("examQuestionCount")?.value||"40";
 const take=setting==="all"?source.questions.length:Math.min(Number(setting)||40,source.questions.length);
 const selected=shuffleArray(source.questions).slice(0,take).map(q=>{
  const order=shuffleArray(q.a.map((text,i)=>({text,correct:i===q.correct})));
  return {...q,a:order.map(x=>x.text),correct:order.findIndex(x=>x.correct)};
 });
 currentExam={...source,questions:selected,minutes:selected.length};
 questionIndex=0;score=0;selectedAnswer=null;currentAnswers=Array(selected.length).fill(null);secondsLeft=selected.length*60;
 showPage("quiz");renderQuestion();startTimer();
}
function renderQuestion(){
 const q=currentExam.questions[questionIndex];
 $("questionCount").textContent="QUESTION "+(questionIndex+1)+" / "+currentExam.questions.length;
 $("questionText").textContent=q.q;
 const passage=$("examPassage");if(passage){passage.textContent=q.passage||"";passage.classList.toggle("hidden",!q.passage);}
 $("quizProgress").style.width=((questionIndex/currentExam.questions.length)*100)+"%";
 $("answerList").replaceChildren();$("quizFeedback").textContent="";
 const labels=["A","B","C","D"];
 q.a.forEach((answer,i)=>{
  const b=document.createElement("button");b.className="answer-option";b.textContent=labels[i]+". "+answer;
  if(currentAnswers[questionIndex]===i)b.classList.add("selected");
  b.addEventListener("click",()=>chooseAnswer(i));$("answerList").append(b);
 });
 const prev=$("prevQuestion");if(prev)prev.disabled=questionIndex===0;\n const prev=$("prevQuestion");if(prev)prev.disabled=questionIndex===0;
 const next=$("nextQuestion");next.disabled=false;
 next.textContent=questionIndex===currentExam.questions.length-1?"Submit exam":"Next question →";
}
function chooseAnswer(index){
 selectedAnswer=index;currentAnswers[questionIndex]=index;
 document.querySelectorAll(".answer-option").forEach((b,i)=>{b.classList.toggle("selected",i===index);b.disabled=false;});
 $("quizFeedback").textContent="Answer saved. You can change it before moving to the next question.";
}
function previousQuestion(){if(questionIndex<=0)return;questionIndex--;selectedAnswer=currentAnswers[questionIndex];renderQuestion();}
function nextQuestion(){
 if(questionIndex===currentExam.questions.length-1){finishExam();return;}
 questionIndex++;selectedAnswer=currentAnswers[questionIndex];renderQuestion();
}
function startTimer(){stopTimer();updateTimer();timerId=setInterval(()=>{secondsLeft--;updateTimer();if(secondsLeft<=0){stopTimer();finishExam(true)}},1000)}
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
function updateTimer(){$("quizTimer").textContent=`${String(Math.floor(secondsLeft/60)).padStart(2,"0")}:${String(secondsLeft%60).padStart(2,"0")}`}
function finishExam(timeUp=false){
 stopTimer();score=currentExam.questions.reduce((n,q,i)=>n+(currentAnswers[i]===q.correct?1:0),0);
 const total=currentExam.questions.length,percent=Math.round(score/total*100);
 attempts.unshift({title:currentExam.path.join(" › "),score,total,percent,date:new Date().toLocaleDateString()});write(STORAGE.attempts,attempts);
 $("resultScore").textContent=percent+"%";
 $("resultMessage").textContent=(timeUp?"Time is up. ":"")+score+" correct out of "+total+" · "+currentExam.path.join(" › ");
 const review=$("examReview");if(review){review.replaceChildren();currentExam.questions.forEach((q,i)=>{
  const item=document.createElement("article");item.className="exam-review-item";
  const passage=q.passage?document.createElement("p"):null;if(passage){passage.className="exam-review-passage";passage.textContent=q.passage;}const stem=document.createElement("h3");stem.textContent=(i+1)+". "+q.q;
  const chosen=document.createElement("p");chosen.textContent="Your answer: "+(currentAnswers[i]===null?"Not answered":q.a[currentAnswers[i]]);
  const correct=document.createElement("p");correct.textContent="Correct answer: "+q.a[q.correct];
  item.classList.add(currentAnswers[i]===q.correct?"review-correct":"review-incorrect");
  if(passage)item.append(passage);item.append(stem,chosen,correct);review.append(item);
 });}
 showPage("results");renderDashboard();
}
function renderDashboard(){const percent=videos.length?Math.round(completed.length/videos.length*100):0;[["dashLessons",completed.length],["homeLessons",completed.length],["dashQuizzes",attempts.length],["homeQuizzes",attempts.length],["dashFavorites",favorites.length],["homeFavorites",favorites.length],["dashProgress",percent+"%"],["homeProgress",percent+"%"]].forEach(([id,val])=>{if($(id))$(id).textContent=val});const list=$("recentActivity");list.replaceChildren();const entries=[...completed.map(id=>({label:videos.find(v=>v.id===id)?.title||t("recentLesson"),kind:t("recentLesson")})),...attempts.slice(0,5).map(a=>({label:a.title,kind:`${t("quizResult")}: ${a.percent}%`}))].slice(0,8);if(!entries.length){list.textContent=t("noActivity");return}entries.forEach(e=>{const row=document.createElement("div");row.className="activity-item";const a=document.createElement("span");a.textContent=e.label;const b=document.createElement("small");b.textContent=e.kind;row.append(a,b);list.append(row)})}
function renderAdmin(){const list=$("adminLessonList");list.replaceChildren();if(!videos.length){list.textContent=t("noAdminLessons");return}videos.forEach(v=>{const row=document.createElement("div");row.className="activity-item";const name=document.createElement("span");name.textContent=`${v.title} · Grade ${v.grade}`;const del=document.createElement("button");del.className="small-button delete-button";del.textContent=language==="am"?"ሰርዝ":"Delete";del.addEventListener("click",()=>{if(!confirm(t("confirmDelete")))return;videos=videos.filter(x=>x.id!==v.id);favorites=favorites.filter(x=>x!==v.id);completed=completed.filter(x=>x!==v.id);saveAll();renderAll();notify(t("lessonDeleted"))});row.append(name,del);list.append(row)})}
function saveAll(){write(STORAGE.videos,videos);write(STORAGE.favorites,favorites);write(STORAGE.completed,completed)}
function renderAll(){renderVideos();renderFavorites();renderExams();renderDashboard();renderAdmin()}
function toggleTheme(){document.body.classList.toggle("light");localStorage.setItem(STORAGE.theme,document.body.classList.contains("light")?"light":"dark")}
function toggleLanguage(){language=language==="en"?"am":"en";localStorage.setItem(STORAGE.language,language);applyLanguage();notify(language==="am"?"ቋንቋው ወደ አማርኛ ተቀይሯል።":"Language changed to English.")}
function toggleSidebar() {
  const sidebar = $("sidebar");
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle("open");
  $("menuButton")?.setAttribute("aria-expanded", String(isOpen));
}
function closeSidebar() {
  $("sidebar")?.classList.remove("open");
  $("menuButton")?.setAttribute("aria-expanded", "false");
}
document.addEventListener("click", (event) => {
  if (event.target.closest("[data-page]")) closeSidebar();
  if (event.target.closest("#sidebar") || event.target.closest("#menuButton")) return;
  closeSidebar();
});
window.addEventListener("pageshow", () => {
  if ($("videoModal")?.classList.contains("hidden")) unlockPageScroll();
});

document.addEventListener("DOMContentLoaded",()=>{
 $("year").textContent=new Date().getFullYear();
 loadExamBank();
 ["examType","examGrade","examSubject","examTopic"].forEach(id=>$(id)?.addEventListener("change",()=>{refreshExamFilters();renderExams()}));

 if(localStorage.getItem(STORAGE.theme)==="light")document.body.classList.add("light");
 document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
 document.querySelectorAll("[data-grade]").forEach(b=>b.addEventListener("click",()=>{$("videoGrade").value=b.dataset.grade;showPage("library");renderVideos()}));
 document.querySelectorAll("[data-home-subject]").forEach(b=>b.addEventListener("click",()=>{$("videoSubject").value=b.dataset.homeSubject;showPage("library");renderVideos()}));
 $("languageButton").addEventListener("click",toggleLanguage);$("themeButton").addEventListener("click",toggleTheme);$("menuButton").addEventListener("click",toggleSidebar);
 $("videoSearch").addEventListener("input",renderVideos);$("videoGrade").addEventListener("change",renderVideos);$("videoSubject").addEventListener("change",renderVideos);$("examGrade").addEventListener("change",renderExams);$("examSubject").addEventListener("change",renderExams);
 $("closePlayer").addEventListener("click",closeVideo);document.querySelector("[data-close-modal]").addEventListener("click",closeVideo);$("completeLesson").addEventListener("click",markComplete);$("nextQuestion").addEventListener("click",nextQuestion);$("prevQuestion")?.addEventListener("click",previousQuestion);
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("videoModal").classList.contains("hidden"))closeVideo()});
 window.addEventListener("pagehide",()=>{stopTimer()});
 applyLanguage();
});

async function loadVideosFromSupabase() {
  if (!supabaseClient) { console.warn("Supabase CDN unavailable; using local lessons."); return; }
  const { data, error } = await supabaseClient
    .from("lessons")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    notify("Database ስህተት፦ lessons table / RLS / network ያረጋግጡ");
    return;
  }

  videos = data.map(v => ({
    id: "db" + v.id,
    title: v.title,
    grade: String(v.grade),
    subject: v.subject,
    description: v.description || "",
    url: v.youtube_url || "",
    download_url: v.download_url || "",
    thumbnail_url: v.thumbnail_url || "",
    published: v.is_published,
    dbId: v.id
  }));

  renderAll();
}

document.addEventListener("DOMContentLoaded", loadVideosFromSupabase);

const PROG="edutube_v4_progress",PCT="edutube_v4_pct";
let yt=null,vm=null,tick=null,seeking=false,lastTap=0,hideT=null,saveTick=0;
function nativeVideo(){const v=$("hostVideo");return v&&!v.hidden&&v.src?v:null;}
function nativeActive(){return !!nativeVideo();}
async function mediaTime(){const v=nativeVideo();if(v)return v.currentTime;return vm?await vm.getCurrentTime().catch(()=>0):0;}
async function mediaDuration(){const v=nativeVideo();if(v)return v.duration;return vm?await vm.getDuration().catch(()=>0):0;}
function mediaSeek(t){const v=nativeVideo();if(v){v.currentTime=Math.max(0,Math.min(t||0,v.duration||t||0));return true;}if(vm){vm.setCurrentTime(Math.max(0,t||0)).catch(()=>{});return true;}return false;}
function mediaSpeed(s){const v=nativeVideo();if(v){v.playbackRate=s;return;}if(vm)vm.setPlaybackRate(s).catch(()=>{});}
let speed=Number(localStorage.getItem("edutube_v4_speed"))||1;
const fmt=s=>{s=Math.floor(s||0);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
function loadVimeoSDK(){if(window.Vimeo&&window.Vimeo.Player)return Promise.resolve();if(window._eduVimeoPromise)return window._eduVimeoPromise;window._eduVimeoPromise=new Promise((resolve,reject)=>{const s=document.createElement("script");s.src="https://player.vimeo.com/api/player.js";s.onload=resolve;s.onerror=()=>reject(new Error("Vimeo SDK load failed"));document.head.appendChild(s);});return window._eduVimeoPromise;}
async function buildPlayer(url,start){await loadVimeoSDK();const frame=$("videoFrame"),host=$("ytHost"),embed=getVimeoEmbedUrl(url);if(!embed)throw new Error("Invalid Vimeo URL");host.innerHTML="";const iframe=document.createElement("iframe");iframe.src=embed;iframe.title="Vimeo player";iframe.allow="autoplay; fullscreen; picture-in-picture";iframe.allowFullscreen=true;iframe.setAttribute("referrerpolicy","strict-origin-when-cross-origin");host.appendChild(iframe);vm=new Vimeo.Player(iframe);await vm.ready();if(start>0)await vm.setCurrentTime(start).catch(()=>{});await vm.setPlaybackRate(speed).catch(()=>{});await vm.play().catch(()=>{});vm.on("play",()=>{frame.classList.add("playing");frame.classList.remove("loading");$("btnPlay").textContent="⏸";poster.classList.add("hidden");showControls();});vm.on("pause",()=>{$("btnPlay").textContent="▶";frame.classList.remove("playing");});vm.on("timeupdate",()=>update());vm.on("ended",()=>onVimeoEnded());vm.on("error",()=>notify("Vimeo player error"));frame.classList.remove("loading");}
function onVimeoEnded(){if(!currentVideo)return;const p=read(PROG,{}),q=read(PCT,{});delete p[currentVideo.id];q[currentVideo.id]=100;write(PROG,p);write(PCT,q);if(!completed.includes(currentVideo.id)){completed.push(currentVideo.id);write(STORAGE.completed,completed);renderAll();}if($("autoNext")&&$("autoNext").checked)startNextCountdown();else notify("ትምህርቱ ተጠናቀቀ!");}
async function update(){const v=nativeVideo();if(!v&&!vm)return;let d=0,c=0;if(v){d=v.duration||0;c=v.currentTime||0;$("btnPlay").textContent=v.paused?"▶":"⏸";$("videoFrame").classList.toggle("playing",!v.paused);$("btnMute").classList.toggle("is-muted",v.muted||v.volume===0);}else{try{d=await vm.getDuration();c=await vm.getCurrentTime();$("btnMute").classList.toggle("is-muted",await vm.getMuted());}catch{return;}}const pct=d?c/d:0;if(!seeking)$("seek").value=pct*1000;$("seek").style.setProperty("--p",pct*100+"%");$("timeLabel").textContent=fmt(c)+" / "+fmt(d);if(++saveTick%6===0)saveProgress();if(pct>=.9&&currentVideo&&!completed.includes(currentVideo.id)){completed.push(currentVideo.id);write(STORAGE.completed,completed);renderAll();notify(t("completedNotice"));}}
async function saveProgress(){if((!nativeVideo()&&!vm)||!currentVideo)return;const c=await mediaTime(),d=await mediaDuration(),p=read(PROG,{}),q=read(PCT,{});if(c>5&&d&&c<d-10){p[currentVideo.id]=Math.floor(c);q[currentVideo.id]=Math.round(c/d*100);}else delete p[currentVideo.id];write(PROG,p);write(PCT,q);}
function showControls(){const p=$("videoFrame");p.classList.add("show");clearTimeout(hideT);hideT=setTimeout(()=>p.classList.remove("show"),3000);}
function togglePlay(){const v=nativeVideo();if(v){v.paused?v.play().catch(()=>{}):v.pause();showControls();return;}if(!vm){notify("Vimeo player is loading…");return;}vm.getPaused().then(p=>p?vm.play():vm.pause()).catch(()=>{});showControls();}
function skip(d){if(!nativeVideo()&&!vm){notify("Player loading…");return;}mediaTime().then(t=>mediaSeek(t+d));const fx=$("skipFx");fx.textContent=(d<0?"⏪ ":"⏩ ")+Math.abs(d)+"s";fx.className="skip-fx "+(d<0?"l":"r");void fx.offsetWidth;fx.classList.add("go");showControls();}
function toggleMute(){const v=nativeVideo();if(v){v.muted=!v.muted;$("btnMute").setAttribute("aria-label",v.muted?"Unmute":"Mute");return;}if(vm)vm.getMuted().then(m=>vm.setMuted(!m)).catch(()=>{});}
function setSpeedButton(s){document.querySelectorAll(".speed-btn").forEach(b=>b.classList.toggle("active",Number(b.dataset.speed)===s));const label=$("currentSpeedLabel");if(label)label.textContent=s+"×";}
function playNext(){if(!currentVideo)return;const i=videos.findIndex(v=>v.id===currentVideo.id),n=videos.slice(i+1).find(v=>getVimeoEmbedUrl(v.url));if(!n){notify("ቀጣይ ትምህርት የለም");return;}saveProgress();openVideo(n.id);}
$("btnPlay").addEventListener("click",togglePlay);$("btnBack").addEventListener("click",()=>skip(-10));$("btnFwd").addEventListener("click",()=>skip(10));$("btnMute").addEventListener("click",toggleMute);$("btnFull").addEventListener("click",()=>toggleFull());$("nextLesson").addEventListener("click",playNext);
$("ppPlay2")?.addEventListener("click",togglePlay);$("ppNext")?.addEventListener("click",playNext);$("ppUpNext")?.addEventListener("click",playNext);$("ppPrev")?.addEventListener("click",()=>{if(!currentVideo)return;const i=videos.findIndex(v=>v.id===currentVideo.id);const prev=videos.slice(0,i).reverse().find(v=>getVimeoEmbedUrl(v.url));if(prev)openVideo(prev.id);else notify("ቀዳሚ ትምህርት የለም");});$("ppSpeed")?.addEventListener("click",()=>{const rates=[0.25,0.5,0.75,1,1.25,1.5,1.75,2],idx=rates.indexOf(speed),next=rates[(idx+1)%rates.length];speed=next;localStorage.setItem("edutube_v4_speed",String(speed));mediaSpeed(speed);$("ppSpeed").textContent=speed+"×";setSpeedButton(speed);});$("ppSettings")?.addEventListener("click",()=>{$("speedMenu").classList.toggle("hidden");});$("ppCC")?.addEventListener("click",()=>notify("Captions are available only if enabled for this Vimeo video."));
$("avVolume")?.addEventListener("input",async e=>{const vol=Number(e.target.value)/100;if(nativeVideo()){nativeVideo().volume=vol;nativeVideo().muted=vol===0;}else if(vm){await vm.setVolume(vol).catch(()=>{});await vm.setMuted(vol===0).catch(()=>{});}});
$("ppSave")?.addEventListener("click",()=>{if(currentVideo&&typeof toggleFavorite==="function")toggleFavorite(currentVideo.id);});
$("ppShare")?.addEventListener("click",async()=>{const url=location.href.split("#")[0];try{if(navigator.share)await navigator.share({title:currentVideo?.title||"EduTube",url});else await navigator.clipboard.writeText(url);}catch{}});
$("ppMore")?.addEventListener("click",()=>notify("More player options coming soon"));
$("seek").addEventListener("input",async()=>{if(!nativeVideo()&&!vm)return;seeking=true;mediaSeek((await mediaDuration())*Number($("seek").value)/1000);showControls();});$("seek").addEventListener("change",()=>{seeking=false;});
document.querySelectorAll(".speed-btn").forEach(b=>b.addEventListener("click",()=>{speed=Number(b.dataset.speed);localStorage.setItem("edutube_v4_speed",speed);mediaSpeed(speed);setSpeedButton(speed);$("speedMenu").classList.add("hidden");$("speedMenuButton").setAttribute("aria-expanded","false");}));
$("speedMenuButton").addEventListener("click",()=>{const menu=$("speedMenu"),open=menu.classList.contains("hidden");menu.classList.toggle("hidden",!open);$("speedMenuButton").setAttribute("aria-expanded",String(open));});
document.addEventListener("click",e=>{if(!e.target.closest(".speed-menu-wrap")){$("speedMenu").classList.add("hidden");$("speedMenuButton").setAttribute("aria-expanded","false");}});
$("tapLayer").addEventListener("click",e=>{const now=Date.now(),r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width;if(now-lastTap<300){lastTap=0;if(x<.4)skip(-10);else if(x>.6)skip(10);else togglePlay();return;}lastTap=now;setTimeout(()=>{if(lastTap===now){lastTap=0;togglePlay();}},300);});
document.addEventListener("keydown",e=>{if($("videoModal").classList.contains("hidden")||(!vm&&!nativeVideo()))return;const k=String(e.key||"").toLowerCase();if(k===" "||k==="k"){e.preventDefault();togglePlay();}else if(k==="arrowleft"||k==="j")skip(-10);else if(k==="arrowright"||k==="l")skip(10);else if(k==="f")toggleFull();else if(k==="m")toggleMute();});
document.addEventListener("fullscreenchange",()=>{if(!document.fullscreenElement&&screen.orientation&&screen.orientation.unlock)screen.orientation.unlock();});
// Vimeo API is loaded only when a lesson is opened.
function ensureUpNext(){if($("upNext"))return;const wrap=document.createElement("div");wrap.innerHTML='<div class="upnext-head"><h3>⏭ Up next</h3><label class="autoplay"><input type="checkbox" id="autoNext"> Autoplay</label></div><div id="upNext" class="upnext"></div>';document.querySelector("#videoModal .modal-footer").before(wrap);const cb=$("autoNext");cb.checked=localStorage.getItem("edutube_v4_auto")!=="0";cb.addEventListener("change",()=>localStorage.setItem("edutube_v4_auto",cb.checked?"1":"0"));}
function renderUpNext(){const box=$("upNext");if(!box)return;box.replaceChildren();if(!currentVideo)return;const i=videos.findIndex(v=>v.id===currentVideo.id),list=[...videos.slice(i+1),...videos.slice(0,i)].filter(v=>getVimeoEmbedUrl(v.url));if(!list.length){box.textContent="ሌላ ትምህርት የለም";return;}const pct=read(PCT,{});list.forEach(v=>{const row=document.createElement("button");row.type="button";row.className="up-item";const img=document.createElement("span");img.className="up-thumb";img.style.backgroundImage=v.thumbnail_url?"url("+v.thumbnail_url+")":"linear-gradient(135deg,#153f77,#071426)";if(pct[v.id]){const bar=document.createElement("i");bar.className="thumb-bar";const fill=document.createElement("b");fill.style.width=Math.min(pct[v.id],100)+"%";bar.append(fill);img.append(bar);}const txt=document.createElement("span");txt.className="up-text";const title=document.createElement("b");title.textContent=v.title;const meta=document.createElement("small");meta.textContent="Grade "+v.grade+" · "+v.subject+(completed.includes(v.id)?" · ✓":"");txt.append(title,meta);row.append(img,txt);row.addEventListener("click",()=>{saveProgress();openVideo(v.id);});box.append(row);});}
async function openVideo(id){const video=videos.find(v=>v.id===id);if(!video)return;if(!getVimeoId(video.url)){notify("This lesson requires a Vimeo link.");return;}ensureUpNext();currentVideo=video;const dlb=$("videoDownload");if(dlb){dlb.href="#";dlb.onclick=e=>{e.preventDefault();notify("Vimeo download is not available from the embed.");};}$("modalTitle").textContent=video.title;const start=read(PROG,{})[video.id]||0,frame=$("videoFrame");frame.classList.add("loading");frame.classList.remove("fallback","playing","hosted-player");frame.style.setProperty("--poster",video.thumbnail_url?"url("+video.thumbnail_url+")":"none");const fb=$("fbPlayer");if(fb)fb.src="";const nv=$("hostVideo"),ex=$("externalVideo");if(nv){nv.pause();nv.removeAttribute("src");nv.load();nv.hidden=true;nv.style.display="none";}if(ex){ex.src="";ex.hidden=true;ex.style.display="none";}showPoster(getVimeoId(video.url),video.title);$("videoModal").classList.remove("hidden");lockPageScroll();const mc=document.querySelector("#videoModal .modal-content");if(mc)mc.scrollTop=0;renderUpNext();const host=$("ytHost");host.style.display="";host.innerHTML="";if(vm){vm.destroy().catch(()=>{});vm=null;}yt=null;try{await buildPlayer(video.url,start);}catch(e){frame.classList.remove("loading");notify("Vimeo playback failed. Check Vimeo link and embed permissions.");}clearInterval(tick);tick=setInterval(update,500);}
function closeVideo(){saveProgress();clearInterval(tick);if(vm){vm.pause().catch(()=>{});vm.destroy().catch(()=>{});vm=null;}yt=null;const fb=$("fbPlayer");if(fb)fb.src="";const hv=$("hostVideo");if(hv){hv.pause();hv.removeAttribute("src");hv.load();hv.hidden=true;hv.style.display="none";}const ex=$("externalVideo");if(ex){ex.src="";ex.hidden=true;ex.style.display="none";}$("ytHost").style.display="";$("ytHost").innerHTML="";$("videoFrame").classList.remove("loading","fallback","hosted-player","playing");if(document.fullscreenElement)document.exitFullscreen();$("videoModal").classList.add("hidden");unlockPageScroll();currentVideo=null;renderVideos();}
/* ============ PLAYER PRO PATCH & SURPRISES ============ */
const poster=$("poster"),posterImg=$("posterImg"),posterTitle=$("posterTitle");
function showPoster(vid,title){if(currentVideo&&currentVideo.thumbnail_url)posterImg.src=currentVideo.thumbnail_url;else posterImg.removeAttribute("src");posterTitle.textContent=title;poster.classList.remove("hidden");$("videoFrame").classList.remove("playing");}
poster.addEventListener("click",()=>{if(vm){poster.classList.add("hidden");vm.play().catch(()=>{});}else notify("Vimeo player loading…");});
function showSpeedChip(txt){const c=$("speedChip");if(!c)return;c.textContent=txt;c.classList.add("show");clearTimeout(c._t);c._t=setTimeout(()=>c.classList.remove("show"),1100)}
document.querySelectorAll(".speed-btn").forEach(b=>b.addEventListener("click",()=>showSpeedChip(Number(b.dataset.speed)+"×")));
document.addEventListener("DOMContentLoaded",()=>{$("speedMenu").classList.add("hidden")});

/* Surprise 1: Long-press = 2× speed */
let holdT=null,holdOn=false,justHeld=false;
$("tapLayer").addEventListener("pointerdown",()=>{holdT=setTimeout(()=>{holdOn=true;justHeld=true;if(vm)vm.setPlaybackRate(2).catch(()=>{});$("holdFx").classList.add("show")},450)});
["pointerup","pointercancel","pointerleave"].forEach(ev=>$("tapLayer").addEventListener(ev,()=>{clearTimeout(holdT);if(holdOn){holdOn=false;if(vm)vm.setPlaybackRate(speed).catch(()=>{});$("holdFx").classList.remove("show")}}));
$("videoFrame").addEventListener("click",e=>{if(justHeld){justHeld=false;e.stopPropagation()}},true);

/* Surprise 2: Visibility pause */
document.addEventListener("visibilitychange",()=>{if(document.hidden&&currentVideo&&vm)vm.pause().catch(()=>{});});

if($("fbFull"))$("fbFull").addEventListener("click",()=>toggleFull());
document.addEventListener("fullscreenchange",()=>{
  const on=!!(document.fullscreenElement||document.webkitFullscreenElement);
  const page=$("videoModal")?.querySelector(".watch-content");
  if(page)page.classList.toggle("watch-fullscreen",on);
  if($("btnFull"))$("btnFull").innerHTML=on?'<i data-lucide="minimize" aria-hidden="true"></i>':'<i data-lucide="maximize" aria-hidden="true"></i>';refreshIcons();
  if(!on){
    $("videoModal")?.querySelector(".watch-content")?.classList.remove("fake-full-page","watch-fullscreen");
    document.body.classList.remove("fake-lock");
  }
});

async function toggleFull(){
  // Fullscreen the complete watch page, not just the video rectangle.
  const el=$("videoModal")?.querySelector(".watch-content");
  if(!el)return;
  if(document.fullscreenElement||document.webkitFullscreenElement||el.classList.contains("fake-full-page")){
    if(document.exitFullscreen||document.webkitExitFullscreen){
      try{await (document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}
    }
    el.classList.remove("fake-full-page","watch-fullscreen");
    document.body.classList.remove("fake-lock");
    return;
  }
  const req=el.requestFullscreen||el.webkitRequestFullscreen||el.mozRequestFullScreen;
  if(req){
    try{
      const result=req.call(el);if(result&&result.then)await result;
      el.classList.add("watch-fullscreen");
      return;
    }catch(e){/* use the in-page fullscreen fallback below */}
  }
  el.classList.add("fake-full-page","watch-fullscreen");
  document.body.classList.add("fake-lock");
}

function onState(){}

/* ============ WATCH PAGE v2 PATCH ============ */
(function(){
const M=$("videoModal");if(!M)return;
const wb=$("watchBack");
if(wb)wb.addEventListener("click",()=>closeVideo());

let vmodState=false;
const _openVideo=openVideo,_closeVideo=closeVideo;
openVideo=async function(id){
  const video=videos.find(v=>v.id===id);
  if(video){const vid=getVimeoId(video.url);if(vid&&$("poster")){$("posterImg").src=video.thumbnail_url||"";$("posterTitle").textContent=video.title;$("poster").classList.remove("hidden");}}
  const before=currentVideo;
  await _openVideo(id);
  if(currentVideo&&currentVideo!==before){
    if(!vmodState){vmodState=true;try{history.pushState({vmod:1},"")}catch(e){}}
    setWatermark();
  }
};
closeVideo=function(){
  _closeVideo();
  hideNextOverlay();
  if(vmodState){vmodState=false;try{if(history.state&&history.state.vmod)history.back()}catch(e){}}
};
window.addEventListener("popstate",()=>{
  if(!M.classList.contains("hidden")){vmodState=false;_closeVideo();}
});

document.addEventListener("contextmenu",e=>{
  if(e.target.closest("#videoModal")){e.preventDefault();notify("Menu በplayer ላይ ተከልክሏል።");}
});
document.addEventListener("dragstart",e=>{if(e.target.closest("#videoModal"))e.preventDefault()});
document.addEventListener("copy",e=>{if(e.target.closest("#videoModal"))e.preventDefault()});
document.addEventListener("keydown",e=>{
  const k=String(e.key||"").toLowerCase();
  if(e.key==="PrintScreen"){e.preventDefault();privacyFlash();return}
  if((e.ctrlKey||e.metaKey)&&["s","p","u"].includes(k)){e.preventDefault();notify("ይህ ተግባር ተከልክሏል።")}
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&["i","j","c"].includes(k)){e.preventDefault();notify("DevTools መክፈት ተከልክሏል።")}
  if(k==="f12")e.preventDefault();
});
let pfT=null;
function privacyFlash(){
  let f=$("privacyFlash");
  if(!f){f=document.createElement("div");f.id="privacyFlash";f.className="privacy-flash";
    f.innerHTML='<i data-lucide="shield-check" aria-hidden="true"></i> Screenshot ተከልክሏል';document.body.append(f)}
  f.classList.add("show");clearTimeout(pfT);
  pfT=setTimeout(()=>f.classList.remove("show"),700);
  if(vm)vm.pause().catch(()=>{});
}
function setWatermark(){
  const w=$("wm");if(!w||!currentVideo)return;
  const d=new Date();
  w.textContent=(currentVideo.title||"").slice(0,24)+" · ZSecret For Free · "+d.toLocaleDateString()+" "+
    String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}

let ncT=null,ncN=5;
function startNextCountdown(){
  const ov=$("nextOverlay");if(!ov)return;
  ov.classList.remove("hidden");ncN=5;$("nextCount").textContent=ncN;
  clearInterval(ncT);
  ncT=setInterval(()=>{ncN--;
    if(ncN<=0){clearInterval(ncT);hideNextOverlay();playNext()}
    else $("nextCount").textContent=ncN;},1000);
}
function hideNextOverlay(){const ov=$("nextOverlay");if(!ov)return;ov.classList.add("hidden");clearInterval(ncT)}
const nc=$("nextCancel"),nn=$("nextNow");
if(nc)nc.addEventListener("click",hideNextOverlay);
if(nn)nn.addEventListener("click",()=>{hideNextOverlay();playNext()});
})();

/* Secure Supabase Admin: Auth + CRUD */
let edutubeAdminUser = null;
renderAdmin = function() {}; 
const adminMsg = (message, isError=false) => { const box=$('adminNotice'); if(box){box.textContent=message;box.classList.toggle('admin-error',isError);} };
function isEdutubeAdmin(user){return Boolean(user&&user.app_metadata&&['admin','super_admin'].includes(user.app_metadata.role));}
function isEdutubeSuperAdmin(user){return Boolean(user&&user.app_metadata&&user.app_metadata.role==='super_admin');}
function updateAdminView(user){
  edutubeAdminUser=isEdutubeAdmin(user)?user:null;
  $('adminLoginForm')?.classList.toggle('hidden',!!edutubeAdminUser);
  $('adminWorkspace')?.classList.toggle('hidden',!edutubeAdminUser);
  if($('adminStatus'))$('adminStatus').textContent=edutubeAdminUser?(isEdutubeSuperAdmin(user)?'● Super Admin':'● Admin'):'● Signed out';
  if(edutubeAdminUser){loadAdminLessons();loadSuperAdminOverview();}
}

async function loadSuperAdminOverview(){
  if(!edutubeAdminUser||!supabaseClient)return;
  const checks=[
    ['profiles','superStudents'],
    ['lessons','superLessons'],
    ['notes','superNotes'],
    ['exam_attempts','superAttempts'],
    ['learning_progress','superProgress']
  ];
  const health=$('superHealthList');
  if(health)health.replaceChildren();
  const results=await Promise.all(checks.map(async ([table,id])=>{
    const {count,error}=await supabaseClient.from(table).select('*',{count:'exact',head:true});
    const node=$(id);
    if(node)node.textContent=error?'—':Number(count||0).toLocaleString();
    if(health){
      const row=document.createElement('div');row.className='super-health-item';
      const name=document.createElement('span');name.textContent=table;
      const state=document.createElement('strong');state.className='super-health-state'+(error?' failed':'');state.textContent=error?'CHECK RLS':'CONNECTED';
      row.append(name,state);health.append(row);
    }
    return {table,count,error};
  }));
  const {count:publishedCount,error:publishedError}=await supabaseClient.from('lessons').select('*',{count:'exact',head:true}).eq('is_published',true);
  if($('superPublished'))$('superPublished').textContent=publishedError?'—':Number(publishedCount||0).toLocaleString();
  if(health){
    const row=document.createElement('div');row.className='super-health-item';
    const name=document.createElement('span');name.textContent='Published lessons';
    const state=document.createElement('strong');state.className='super-health-state'+(publishedError?' failed':'');state.textContent=publishedError?'CHECK RLS':'CONNECTED';
    row.append(name,state);health.append(row);
  }
  await loadSuperStudentDirectory();
}
async function loadSuperStudentDirectory(){
  if(!edutubeAdminUser||!supabaseClient)return;
  const list=$('superStudentList');if(!list)return;
  list.textContent='Loading student profiles…';
  const {data,error}=await supabaseClient.from('profiles').select('id,display_name,updated_at').order('updated_at',{ascending:false}).limit(30);
  if(error){list.textContent='Could not read profiles. Check the admin SELECT policy for profiles.';return;}
  list.replaceChildren();
  if(!data?.length){list.textContent='No student profiles found yet.';return;}
  data.forEach(profile=>{
    const row=document.createElement('div');row.className='super-student-row';
    const avatar=document.createElement('span');avatar.className='super-avatar';avatar.textContent=(profile.display_name||'S').trim().slice(0,1).toUpperCase();
    const meta=document.createElement('div');meta.className='super-student-meta';
    const name=document.createElement('b');name.textContent=profile.display_name||'Student';
    const id=document.createElement('small');id.textContent=profile.id;
    meta.append(name,id);row.append(avatar,meta);list.append(row);
  });
  filterSuperStudents();
}
function filterSuperStudents(){
  const q=($('superStudentSearch')?.value||'').trim().toLowerCase();
  document.querySelectorAll('.super-student-row').forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(q);});
}

async function refreshPublicLessons(){if(!supabaseClient){console.warn('Supabase is unavailable; keeping local lessons.');return;}const {data,error}=await supabaseClient.from('lessons').select('*').eq('is_published',true).order('created_at',{ascending:false});if(error){console.error('Public lessons:',error);return;}videos=(data||[]).map(v=>({id:'db'+v.id,dbId:v.id,title:v.title,grade:String(v.grade),subject:v.subject,description:v.description||'',url:v.youtube_url||'',download_url:v.download_url||'',thumbnail_url:v.thumbnail_url||'',published:true}));renderAll();}
async function loadAdminLessons(){if(!edutubeAdminUser||!supabaseClient)return;const list=$('adminLessonList');list.textContent='Loading lessons…';const {data,error}=await supabaseClient.from('lessons').select('*').order('created_at',{ascending:false});if(error){console.error(error);list.textContent=error.message;adminMsg('Could not load admin lessons. Check admin RLS policies.',true);return;}list.replaceChildren();if(!data.length){list.textContent='No lessons yet. Add your first lesson above.';return;}data.forEach(row=>{const item=document.createElement('div');item.className='admin-lesson-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=row.title;const meta=document.createElement('small');meta.textContent=`Grade ${row.grade} · ${row.subject} · ${row.is_published?'Published':'Draft'}`;info.append(title,meta);const actions=document.createElement('div');actions.className='admin-row-actions';const toggle=document.createElement('button');toggle.type='button';toggle.className='small-button';toggle.textContent=row.is_published?'Unpublish':'Publish';toggle.addEventListener('click',()=>changePublishState(row.id,!row.is_published));const del=document.createElement('button');del.type='button';del.className='small-button delete-button';del.textContent='Delete';del.addEventListener('click',()=>deleteAdminLesson(row.id,row.title));actions.append(toggle,del);item.append(info,actions);list.append(item);});}
async function changePublishState(id,publish){if(!edutubeAdminUser||!supabaseClient)return;const {error}=await supabaseClient.from('lessons').update({is_published:publish}).eq('id',id);if(error){adminMsg('Update failed: '+error.message,true);return;}adminMsg(publish?'Lesson published for all students.':'Lesson moved to draft.');await loadAdminLessons();await refreshPublicLessons();}
async function deleteAdminLesson(id,title){if(!edutubeAdminUser||!supabaseClient||!confirm(`Permanently delete “${title}”?`))return;const {error}=await supabaseClient.from('lessons').delete().eq('id',id);if(error){adminMsg('Delete failed: '+error.message,true);return;}adminMsg('Lesson deleted.');await loadAdminLessons();await refreshPublicLessons();}
async function addAdminLesson(event){
  event.preventDefault();
  const form=event.currentTarget;
  const button=event.submitter||form.querySelector('button[type="submit"]');
  const originalText=button?.textContent||'Save lesson to Supabase';
  const show=(message,error=false)=>adminMsg(message,error);
  try{
    show('Publish button responded. Checking admin session…');
    if(!supabaseClient?.auth){show('Supabase is not loaded. Reload the page and try again.',true);return;}
    const {data,error:sessionError}=await supabaseClient.auth.getSession();
    if(sessionError)throw sessionError;
    const user=data?.session?.user;
    if(!isEdutubeAdmin(user)){show('Admin session not detected. Sign out, then sign in again using the authorized admin account.',true);return;}
    const title=$('lessonTitle')?.value.trim()||'';
    const url=$('lessonUrl')?.value.trim()||'';
    if(!title){show('Enter the lesson title.',true);$('lessonTitle')?.focus();return;}
    let parsed;try{parsed=new URL(url);}catch{}
    if(!parsed||!/^https?:$/.test(parsed.protocol)){show('Video link is invalid. Use a complete https:// or http:// URL.',true);$('lessonUrl')?.focus();return;}
    const vimeoId=getVimeoId(url);
    if(!vimeoId){show('Enter a valid Vimeo video URL.',true);$('lessonUrl')?.focus();return;}
    const thumb=$('lessonThumbnail')?.value.trim()||'';
    const payload={title,grade:Number($('lessonGrade')?.value),subject:$('lessonSubject')?.value,youtube_url:url,thumbnail_url:thumb||null,description:$('lessonDescription')?.value.trim()||'',is_published:$('lessonPublish')?.checked??true};
    const manualDl=$('lessonDownload')?.value.trim()||'';
    if(manualDl){let dl;try{dl=new URL(manualDl);}catch{}if(!dl||!/^https?:$/.test(dl.protocol)){show('Download override must be a valid HTTP(S) URL.',true);return;}payload.download_url=manualDl;}
    if(button){button.disabled=true;button.textContent='Saving lesson…';}
    // Download extraction is optional; it must never block lesson publishing.
    let downloadWarning='';
    if(vimeoId&&!manualDl){
      show('Saving lesson. Vimeo download-link lookup is optional…');
      try{
        const {data:downloadData,error:downloadError}=await supabaseClient.functions.invoke('vimeo-download',{body:{video_id:vimeoId}});
        if(!downloadError&&downloadData?.download_url)payload.download_url=downloadData.download_url;
        else downloadWarning=' Lesson saved, but Vimeo download link was not retrieved; playback link is still published.';
      }catch(downloadErr){console.warn('Optional Vimeo download lookup failed:',downloadErr);downloadWarning=' Lesson saved, but Vimeo download lookup failed; playback link is still published.';}
    }
    show('Inserting lesson into Supabase…');
    const {error:insertError}=await supabaseClient.from('lessons').insert(payload);
    if(insertError){show('Database insert failed: '+insertError.message,true);return;}
    form.reset();if($('lessonPublish'))$('lessonPublish').checked=true;
    show((payload.is_published?'SUCCESS: Lesson published.':'SUCCESS: Lesson saved as draft.')+downloadWarning);
    await loadAdminLessons();await refreshPublicLessons();
  }catch(err){console.error('Lesson publish handler error:',err);show('Publish failed: '+(err?.message||String(err)),true);}
  finally{if(button){button.disabled=false;button.textContent=originalText;}}
}
function bindLessonPublishHandler(){
  const form=$('lessonForm');
  if(!form||form.dataset.publishHandlerBound==='1')return;
  form.addEventListener('submit',addAdminLesson);
  form.dataset.publishHandlerBound='1';
}

async function initEdutubeAdmin(){
  if(!supabaseClient||!supabaseClient.auth){updateAdminView(null);adminMsg('Supabase library did not load. Check your internet connection, then reload.',true);return;}
  const lockKey='edutube_admin_login_lock_v1';
  const MAX_ATTEMPTS=5, WINDOW_MS=15*60*1000, LOCK_MS=15*60*1000;
  const readLock=()=>{try{return JSON.parse(localStorage.getItem(lockKey)||'{}')}catch{return {}}};
  const lockedUntil=()=>Number(readLock().lockedUntil||0);
  const isLocked=()=>lockedUntil()>Date.now();
  const remaining=()=>Math.max(0,Math.ceil((lockedUntil()-Date.now())/60000));
  const failed=()=>{
    const now=Date.now(),state=readLock(),recent=(state.failures||[]).filter(t=>now-t<WINDOW_MS);
    recent.push(now);
    if(recent.length>=MAX_ATTEMPTS){localStorage.setItem(lockKey,JSON.stringify({failures:[],lockedUntil:now+LOCK_MS}));return true;}
    localStorage.setItem(lockKey,JSON.stringify({failures:recent,lockedUntil:0}));return false;
  };
  const clearFailures=()=>localStorage.removeItem(lockKey);
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(session&&!isEdutubeAdmin(session.user)){updateAdminView(null);adminMsg('Signed in as a student. Admin tools are available only to authorized administrators.',true);}else updateAdminView(session?.user||null);
  supabaseClient.auth.onAuthStateChange((_event,newSession)=>{
    const user=newSession?.user||null;
    if(user&&!isEdutubeAdmin(user)){updateAdminView(null);adminMsg('This account does not have an administrator role.',true);}else updateAdminView(user);
  });
  $('adminChangePasswordForm')?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!edutubeAdminUser){adminMsg('Sign in as an administrator before changing the password.',true);return;}
    const newPassword=$('adminChangePassword').value,confirmPassword=$('adminConfirmChangePassword').value;
    if(newPassword.length<12){adminMsg('Choose a password with at least 12 characters.',true);return;}
    if(newPassword!==confirmPassword){adminMsg('The two passwords do not match.',true);return;}
    const button=e.submitter,oldLabel=button?.textContent;if(button){button.disabled=true;button.textContent='Updating…';}
    const {error}=await supabaseClient.auth.updateUser({password:newPassword});
    if(button){button.disabled=false;button.textContent=oldLabel||'Update admin password';}
    if(error){adminMsg('Password update failed: '+error.message,true);return;}
    $('adminChangePassword').value='';$('adminConfirmChangePassword').value='';
    adminMsg('Admin password updated successfully. Use the new password next time you sign in.');
  });
  $('adminLoginForm')?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(isLocked()){adminMsg('Login temporarily locked after repeated failed attempts. Try again in '+remaining()+' minute(s).',true);return;}
    const button=e.submitter,original=button?.textContent;
    if(button){button.disabled=true;button.textContent='Checking…';}
    const {data,error}=await supabaseClient.auth.signInWithPassword({email:$('adminEmail').value.trim(),password:$('adminPassword').value});
    if(button){button.disabled=false;button.textContent=original||'Sign in securely';}
    if(error){
      const didLock=failed();
      $('adminPassword').value='';
      adminMsg(didLock?'Too many failed attempts. Admin login is locked for 15 minutes.':'Sign-in failed. Check your email/password. Attempts remaining: '+Math.max(0,MAX_ATTEMPTS-(readLock().failures||[]).length),true);
      return;
    }
    if(!isEdutubeAdmin(data.user)){await supabaseClient.auth.signOut();failed();$('adminPassword').value='';adminMsg('Login succeeded, but this account does not have the admin role.',true);return;}
    clearFailures();$('adminPassword').value='';updateAdminView(data.user);adminMsg('Welcome to the secure admin workspace.');
  });
  $('adminSignOut')?.addEventListener('click',async()=>{await supabaseClient.auth.signOut();updateAdminView(null);adminMsg('Signed out.');});
}
document.addEventListener('DOMContentLoaded',()=>{bindLessonPublishHandler();initEdutubeAdmin();refreshPublicLessons();});

function refreshIcons(root=document) {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons({ root });
  }
}
document.addEventListener("DOMContentLoaded", () => refreshIcons());
const iconObserver = new MutationObserver(records => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType === 1) refreshIcons(node);
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  iconObserver.observe(document.body, { childList: true, subtree: true });
});

/* ===== SCROLL FREEZE & LOCK FIX ===== */
(function () {
  const modalOpen = () => {
    const m = document.getElementById("videoModal");
    return m && !m.classList.contains("hidden");
  };

  function forceUnlock() {
    const de = document.documentElement, b = document.body;
    de.classList.remove("scroll-locked");
    b.classList.remove("scroll-locked", "fake-lock", "menu-open");
    de.style.overflow = "";
    b.style.overflow = "";
    b.style.position = "";
    b.style.top = "";
    b.style.width = "";
    document.getElementById("videoFrame")?.classList.remove("fake-full");
  }

  function check() {
    if (modalOpen()) return;
    const de = document.documentElement, b = document.body;
    if (
      de.classList.contains("scroll-locked") ||
      b.classList.contains("scroll-locked") ||
      b.classList.contains("fake-lock") ||
      b.classList.contains("menu-open") ||
      b.style.overflow === "hidden" ||
      b.style.position === "fixed"
    ) forceUnlock();
  }

  const _sp = saveProgress;
  saveProgress = function () { try { _sp(); } catch (e) {} };

  const modal = document.getElementById("videoModal");
  if (modal) {
    new MutationObserver(check).observe(modal, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  ["touchstart", "pointerdown", "click", "pageshow", "focus", "resize", "orientationchange"]
    .forEach(ev => window.addEventListener(ev, check, { passive: true, capture: true }));
  document.addEventListener("visibilitychange", check);
})();


/* ============================================================
   EDUTUBE FEATURE PACK: student auth, cloud progress, exams,
   notifications, leaderboard, certificates and study helper.
   Supabase schema is provided in supabase_setup.sql.
   ============================================================ */
(function initEduTubeFeatures(){
  const FKEY={notifications:'edutube_notifications_v1',authMode:'edutube_auth_mode'};
  let authMode='login';
  let studentSession=null;
  const el=id=>document.getElementById(id);
  const safeText=(value)=>String(value??'');
  const localNotes=()=>{try{return JSON.parse(localStorage.getItem(FKEY.notifications)||'[]')}catch{return[]}};
  const saveNotes=items=>localStorage.setItem(FKEY.notifications,JSON.stringify(items.slice(0,50)));
  function addNotification(title,body){
    const item={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),title,body,created_at:new Date().toISOString(),read:false};
    const all=localNotes();all.unshift(item);saveNotes(all);renderNotifications();
    if(typeof notify==='function')notify(title);
    if(studentSession&&supabaseClient){supabaseClient.from('notifications').insert({user_id:studentSession.user.id,title,body}).then(({error})=>{if(error)console.warn('Notification sync:',error.message)})}
  }
  function renderNotifications(){
    const list=el('notificationList');if(!list)return;list.replaceChildren();const items=localNotes();
    el('notificationDot')?.classList.toggle('hidden',items.length===0||items.every(x=>x.read));
    if(!items.length){list.textContent='No notifications yet.';return;}
    items.forEach(item=>{const row=document.createElement('div');row.className='activity-item';const text=document.createElement('span');const strong=document.createElement('strong');strong.textContent=item.title;const small=document.createElement('small');small.textContent=' · '+item.body+' · '+new Date(item.created_at).toLocaleString();text.append(strong,small);row.append(text);list.append(row)});
    saveNotes(items.map(x=>({...x,read:true})));el('notificationDot')?.classList.add('hidden');
  }
  async function loadRemoteNotifications(){
    if(!studentSession||!supabaseClient)return;
    const {data,error}=await supabaseClient.from('notifications').select('id,title,body,created_at').eq('user_id',studentSession.user.id).order('created_at',{ascending:false}).limit(50);
    if(error){console.warn('Student notifications could not load:',error.message);return;}
    const local=localNotes(),remote=(data||[]).map(x=>({...x,read:false}));
    const merged=[...remote,...local.filter(x=>!remote.some(r=>r.title===x.title&&r.body===x.body))].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
    saveNotes(merged);renderNotifications();
  }
  async function renderLeaderboard(){
    const list=el('leaderboardList');if(!list)return;list.replaceChildren();
    if(!supabaseClient){el('leaderboardStatus').textContent='Supabase is unavailable. Check your internet connection.';list.textContent='Leaderboard service is offline.';return;}
    if(!studentSession){el('leaderboardStatus').textContent='Global leaderboard is unavailable because student accounts have been removed for free public access.';list.textContent='Global rankings are disabled.';return;}
    el('leaderboardStatus').textContent='Showing shared learning activity from the ZSecret For Free database.';
    const {data,error}=await supabaseClient.rpc('get_student_leaderboard');
    if(error){el('leaderboardStatus').textContent='Leaderboard database view is not ready. Run supabase_setup.sql, then refresh.';list.textContent=error.message;return;}
    if(!data?.length){list.textContent='No ranked students yet. Complete lessons and exams to get started.';return;}
    data.forEach((student,index)=>{const row=document.createElement('div');row.className='activity-item rank-row';const rank=document.createElement('span');rank.className='rank-number';rank.textContent=String(index+1);const name=document.createElement('strong');name.textContent=student.display_name||'Student';const meta=document.createElement('span');meta.className='rank-meta';meta.textContent=`${student.points||0} pts · ${student.completed_lessons||0} lessons · ${Math.round(student.average_score||0)}% avg`;row.append(rank,name,meta);list.append(row)});
  }
  function patchActivityHooks(){
    const originalComplete=markComplete;
    markComplete=function(){const before=completed.length;const title=currentVideo?.title||'a lesson';originalComplete();if(completed.length>before){addNotification('Lesson completed','You completed '+title+'.');}};
    const originalFinish=finishExam;
    finishExam=function(timeUp=false){const before=attempts.length;originalFinish(timeUp);if(attempts.length>before){const latest=attempts[0];addNotification('Exam result saved',`${latest.title}: ${latest.percent}%`);}};
    const originalSaveProgress=saveProgress;
    saveProgress=function(){originalSaveProgress();if(studentSession&&currentVideo&&vm){Promise.all([vm.getCurrentTime(),vm.getDuration()]).then(([seconds,duration])=>{if(duration>0)supabaseClient.from('learning_progress').upsert({user_id:studentSession.user.id,lesson_key:String(currentVideo.dbId||currentVideo.id),completed:completed.includes(currentVideo.id),progress_seconds:Math.floor(seconds||0),progress_percent:Math.min(100,Math.round(seconds/duration*100)),updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_key'}).then(({error})=>{if(error)console.warn('Watch progress sync:',error.message)});}).catch(()=>{});}};
    const originalRenderDashboard=renderDashboard;
    renderDashboard=function(){originalRenderDashboard();if(el('accountSignedIn')&&!el('accountSignedIn').classList.contains('hidden')){el('accountCompleted').textContent=completed.length;el('accountAttempts').textContent=attempts.length}};
  }
  document.addEventListener('DOMContentLoaded',()=>{
    // Student login/signup UI removed.
    
    el('clearNotifications')?.addEventListener('click',()=>{saveNotes([]);renderNotifications()});
    el('notificationShortcut')?.addEventListener('click',renderNotifications);
    document.querySelectorAll('[data-page="leaderboard"]').forEach(b=>b.addEventListener('click',renderLeaderboard));
    
    el('adminSignOut')?.addEventListener('click',()=>{});
    patchActivityHooks();renderNotifications();
  });
})();




/* ZSecret For Free — Secure PDF Notes module
   Students: published read-only viewer. Admin: PDF upload and publication controls.
   Storage bucket: edutube-notes (PRIVATE). */
(function () {
  "use strict";
  const BUCKET = "edutube-notes";
  const MAX_PDF_BYTES = 20 * 1024 * 1024;
  const SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Geography", "History", "Economics", "Computer Science", "SAT"];
  const GRADES = ["9", "10", "11", "12"];
  let notes = [];
  const state = { type: null, grade: null, subject: null, unit: null, note: null };
  const $ = id => document.getElementById(id);
  const client = () => typeof supabaseClient !== "undefined" ? supabaseClient : null;
  const isAdmin = () => { try { return typeof isEdutubeAdmin === "function" && isEdutubeAdmin(window.__edutubeSessionUser); } catch (_) { return false; } };
  function h(tag, cls, value) { const e=document.createElement(tag); if(cls)e.className=cls; if(value!=null)e.textContent=value; return e; }
  function msg(value, error=false) { const m=$("noteAdminMsg"); if(m){m.textContent=value;m.classList.toggle("admin-error",error);} }
  function t(key) { try { return typeof window.t === "function" ? window.t(key) : key; } catch (_) { return key; } }
  function typeName(v){return v==="competency"?"Competency Based Notes":"Video Notes";}
  function filtered(){return notes.filter(n=>n.note_type===state.type&&String(n.grade)===state.grade&&n.subject===state.subject);}
  function render(){
    const root=$("notesRoot"); if(!root)return; root.replaceChildren();
    const crumb=h("div","notes-crumbs"); const levels=[{v:"Notes",reset:()=>Object.assign(state,{type:null,grade:null,subject:null,unit:null,note:null})}];
    if(state.type)levels.push({v:typeName(state.type),reset:()=>Object.assign(state,{grade:null,subject:null,unit:null,note:null})});
    if(state.grade)levels.push({v:"Grade "+state.grade,reset:()=>Object.assign(state,{subject:null,unit:null,note:null})});
    if(state.subject)levels.push({v:state.subject,reset:()=>Object.assign(state,{unit:null,note:null})});
    if(state.unit)levels.push({v:state.unit,reset:()=>state.note=null});
    levels.forEach((x,i)=>{if(i)crumb.append(" › ");if(i===levels.length-1)crumb.append(h("span","current",x.v));else{const b=h("button","",x.v);b.type="button";b.onclick=()=>{x.reset();render();};crumb.append(b);}}); root.append(crumb);
    if(state.note){
      const n=state.note, panel=h("article","note-article"); panel.append(h("span","eyebrow",`${typeName(n.note_type)} · Grade ${n.grade} · ${n.subject} · ${n.unit}`),h("h2","",n.title));
      const status=h("p","pdf-viewer-status","Preparing secure in-page PDF reader…");panel.append(status);
      const reader=h("section","eu-pdf-reader");reader.innerHTML=`<div class="eu-pdf-toolbar"><button type="button" data-pdf="close" aria-label="Close reader">✕ Exit</button><button type="button" data-pdf="prev">←</button><label>Page <input data-pdf="page" type="number" min="1" value="1"> <span data-pdf="total">/ —</span></label><button type="button" data-pdf="next">→</button><i></i><button type="button" data-pdf="minus">−</button><span data-pdf="zoom">100%</span><button type="button" data-pdf="plus">＋</button><button type="button" data-pdf="fit">Fit width</button><button type="button" data-pdf="rotate">↻</button><button type="button" data-pdf="fullscreen">⛶</button></div><div class="eu-pdf-search"><input data-pdf="find" type="search" placeholder="Find text in this PDF"><button type="button" data-pdf="search">Find</button><span data-pdf="searchstatus" aria-live="polite"></span></div><div class="eu-pdf-stage"><canvas data-pdf="canvas"></canvas></div><div class="eu-pdf-footer"><span data-pdf="progress">Reading progress: 0%</span></div>`;
      panel.append(reader);const actions=h("div","pdf-view-actions");if(n.video_url&&/^https:\/\//i.test(n.video_url)){const a=h("a","small-button","Related video ↗");a.href=n.video_url;a.target="_blank";a.rel="noopener noreferrer";actions.append(a);}panel.append(actions);root.append(panel);loadPdfForViewer(n,reader,status,actions);
    } else if(!state.type){root.append(h("h2","notes-step-title","Choose note collection"));const g=h("div","notes-grid wide");[["video","Video Notes","Notes linked to video lessons"],["competency","Competency Based Notes","Curriculum-aligned competency notes"]].forEach(([v,a,b])=>g.append(makeCard(a,b,()=>{state.type=v;render();})));root.append(g);
    } else if(!state.grade){root.append(h("h2","notes-step-title","Choose grade"));const g=h("div","notes-grid");GRADES.forEach(v=>g.append(makeCard("Grade "+v,"",()=>{state.grade=v;render();})));root.append(g);
    } else if(!state.subject){root.append(h("h2","notes-step-title","Choose subject"));const g=h("div","notes-grid");SUBJECTS.forEach(v=>{const count=new Set(notes.filter(n=>n.note_type===state.type&&String(n.grade)===state.grade&&n.subject===v).map(n=>n.unit)).size;g.append(makeCard(v,count+" unit(s)",()=>{state.subject=v;render();}));});root.append(g);
    } else if(!state.unit){root.append(h("h2","notes-step-title","Choose unit"));const units=[...new Set(filtered().map(n=>n.unit))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));if(!units.length)root.append(h("div","empty-state","No published PDF notes are available in this section yet."));const g=h("div","notes-grid");units.forEach(v=>g.append(makeCard(v,"",()=>{state.unit=v;render();})));root.append(g);
    } else {root.append(h("h2","notes-step-title","Available PDF notes"));const g=h("div","notes-grid wide");filtered().filter(n=>n.unit===state.unit).forEach(n=>{const w=h("div","zs-note-item");w.append(makeCard("▤  "+n.title,"PDF learning material",()=>{state.note=n;render();}));if(n.allow_download){const d=h("button","small-button zs-download","⬇ Download PDF");d.type="button";d.onclick=()=>downloadNote(n,d);w.append(d);}g.append(w);});root.append(g);}
    if(state.type){const back=h("button","small-button notes-back","← Back");back.type="button";back.onclick=()=>{if(state.note)state.note=null;else if(state.unit)state.unit=null;else if(state.subject)state.subject=null;else if(state.grade)state.grade=null;else state.type=null;render();};root.append(back);}
  }
  async function downloadNote(note,btn){
    const c=client();if(!c){alert("Download service is not configured.");return;}
    const old=btn?btn.textContent:"";if(btn){btn.disabled=true;btn.textContent="Preparing…";}
    try{
      const {data:sd}=await c.auth.getSession();if(!sd?.session){alert("Please sign in to download notes.");return;}
      const name=((note.title||"ZSecret-Note").replace(/[\\/:*?"<>|]+/g,"-"))+".pdf";
      const {data,error}=await c.storage.from(note.pdf_bucket||BUCKET).createSignedUrl(note.pdf_path,300,{download:name});
      if(error||!data?.signedUrl)throw error||new Error("No download link returned.");
      const a=document.createElement("a");a.href=data.signedUrl;a.download=name;a.rel="noopener noreferrer";document.body.append(a);a.click();a.remove();
    }catch(e){console.error("Note download failed",e);alert("Download failed: "+String(e?.message||e));}
    finally{if(btn){btn.disabled=false;btn.textContent=old;}}
  }
  function makeCard(title,desc,fn){const b=h("button","notes-card");b.type="button";b.append(h("b","",title));if(desc)b.append(h("small","",desc));b.onclick=fn;return b;}
  async function loadPdfForViewer(note,reader,status,actions){
    const c=client();if(!c){status.textContent="PDF service is not configured.";return;}
    try{
      const {data:sessionData,error:sessionError}=await c.auth.getSession();if(sessionError)throw sessionError;
      if(!sessionData?.session){status.textContent="Please sign in with your student account to read this PDF.";return;}
      if(!note.pdf_path){status.textContent="This note has no PDF file path. Ask an administrator to upload it again.";return;}
      const {data,error}=await c.storage.from(note.pdf_bucket||BUCKET).createSignedUrl(note.pdf_path,3600);if(error)throw error;
      if(!data?.signedUrl)throw new Error("Supabase did not return a signed PDF URL.");
      if(!window.pdfjsLib){await new Promise((resolve,reject)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";s.onload=resolve;s.onerror=()=>reject(new Error("PDF reader library could not load"));document.head.append(s);});}
      const pdfjs=window.pdfjsLib;pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      const pdf=await pdfjs.getDocument({url:data.signedUrl}).promise;
      const $p=k=>reader.querySelector(`[data-pdf="${k}"]`),canvas=$p("canvas"),ctx=canvas.getContext("2d");
       $p("close").onclick=()=>{document.body.classList.remove("notes-reading-mode");state.note=null;render();};
      let page=1,scale=1,rotation=0,renderTask=null,fit=true;
      const saved=Number(localStorage.getItem("edutube_pdf_page_"+note.id));if(saved>0&&saved<=pdf.numPages)page=saved;
      $p("total").textContent="/ "+pdf.numPages;$p("page").max=pdf.numPages;
      async function draw(){
        if(renderTask){try{renderTask.cancel()}catch(_){}}
        const pg=await pdf.getPage(page),stage=reader.querySelector(".eu-pdf-stage"),base=pg.getViewport({scale:1,rotation});
        if(fit)scale=Math.max(.45,Math.min(2.5,(stage.clientWidth-28)/base.width));
        const vp=pg.getViewport({scale,rotation});const dpr=Math.min(window.devicePixelRatio||1,2);
        canvas.width=Math.floor(vp.width*dpr);canvas.height=Math.floor(vp.height*dpr);canvas.style.width=vp.width+"px";canvas.style.height=vp.height+"px";
        renderTask=pg.render({canvasContext:ctx,viewport:vp,transform:dpr!==1?[dpr,0,0,dpr,0,0]:null});await renderTask.promise;
        $p("page").value=page;$p("zoom").textContent=Math.round(scale*100)+"%";$p("progress").textContent="Reading progress: "+Math.round(page/pdf.numPages*100)+"%";
        localStorage.setItem("edutube_pdf_page_"+note.id,String(page));
      }
      const safeDraw=()=>draw().catch(e=>{if(e?.name!=="RenderingCancelledException")status.textContent="Unable to render this page: "+e.message;});
      $p("prev").onclick=()=>{if(page>1){page--;safeDraw()}};$p("next").onclick=()=>{if(page<pdf.numPages){page++;safeDraw()}};
      $p("page").onchange=()=>{page=Math.max(1,Math.min(pdf.numPages,Number($p("page").value)||1));safeDraw()};
      $p("minus").onclick=()=>{fit=false;scale=Math.max(.4,scale-.15);safeDraw()};$p("plus").onclick=()=>{fit=false;scale=Math.min(3,scale+.15);safeDraw()};
      $p("fit").onclick=()=>{fit=true;safeDraw()};$p("rotate").onclick=()=>{rotation=(rotation+90)%360;safeDraw()};
      $p("fullscreen").onclick=()=>{if(!document.fullscreenElement)reader.requestFullscreen?.();else document.exitFullscreen?.()};
      $p("search").onclick=async()=>{const q=$p("find").value.trim().toLowerCase();if(!q)return;const out=$p("searchstatus");out.textContent="Searching…";for(let i=1;i<=pdf.numPages;i++){const pg=await pdf.getPage(i),txt=await pg.getTextContent(),all=txt.items.map(x=>x.str).join(" ").toLowerCase();if(all.includes(q)){page=i;out.textContent="Found on page "+i;safeDraw();return;}}out.textContent="No match found.";};
      $p("find").addEventListener("keydown",e=>{if(e.key==="Enter")$p("search").click()});
      
      window.addEventListener("resize",safeDraw,{passive:true});
      if(note.allow_download){const d=h("button","small-button zs-download","⬇ Download PDF");d.type="button";d.onclick=()=>downloadNote(note,d);actions.append(d);}
      status.textContent=`PDF ready · ${pdf.numPages} pages · Secure in-page reader. Your last page is saved on this device.`;
      await draw();
    }catch(error){console.error("EduTube PDF viewer error:",error);status.textContent="PDF unavailable: "+String(error?.message||error)+". Check sign-in, Storage bucket and Storage SELECT policy.";}
  }
  async function loadPublicNotes(){const c=client();if(!c)return;const {data,error}=await c.from("notes").select("id,note_type,grade,subject,unit,title,video_url,is_published,pdf_path,pdf_bucket,allow_download").eq("is_published",true).not("pdf_path","is",null).order("created_at",{ascending:false});if(error){console.warn("PDF notes could not load",error.message);return;}notes=(data||[]);render();}
  async function requireAdmin(){const c=client();if(!c?.auth)return null;const {data}=await c.auth.getSession();const user=data?.session?.user;return user&&typeof isEdutubeAdmin==="function"&&isEdutubeAdmin(user)?user:null;}
  async function savePdf(event){event.preventDefault();const c=client();if(!c){msg("Supabase is unavailable.",true);return;}const user=await requireAdmin();if(!user){msg("Admin sign-in required. Students cannot upload or edit notes.",true);return;}
    const file=$("notePdfFile")?.files?.[0];if(!file){msg("Choose a PDF file first.",true);return;}if(file.type!=="application/pdf"&&!file.name.toLowerCase().endsWith(".pdf")){msg("Only PDF files are accepted.",true);return;}if(file.size>MAX_PDF_BYTES){msg("PDF is larger than the 20 MB limit.",true);return;}
    const title=$("noteTitle").value.trim(),unit=$("noteUnit").value.trim();if(!title||!unit){msg("Enter the PDF title and unit.",true);return;}
    const btn=event.submitter;if(btn){btn.disabled=true;btn.textContent="Uploading PDF…";}
    const safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,"_");const path=`${user.id}/${Date.now()}-${safeName}`;
    try{const up=await c.storage.from(BUCKET).upload(path,file,{contentType:"application/pdf",upsert:false});if(up.error)throw up.error;
      const payload={note_type:$("noteType").value,grade:Number($("noteGrade").value),subject:$("noteSubject").value,unit,title,video_url:$("noteVideoUrl").value.trim()||null,content:"",pdf_path:path,pdf_bucket:BUCKET,allow_download:$("noteAllowDownload").checked,is_published:$("notePublish").checked,created_by:user.id};
      const ins=await c.from("notes").insert(payload);if(ins.error){await c.storage.from(BUCKET).remove([path]);throw ins.error;}
      $("noteForm").reset();msg(payload.is_published?"PDF uploaded and published successfully.":"PDF uploaded as a draft.");await loadAdminNotes();await loadPublicNotes();
    }catch(e){msg("Upload failed: "+(e.message||"Unknown error"),true);}finally{if(btn){btn.disabled=false;btn.textContent="Upload PDF Note";}}
  }
  async function loadAdminNotes(){const list=$("adminNoteList");if(!list)return;const user=await requireAdmin();if(!user){list.textContent="Sign in with an administrator account to manage PDF notes.";return;}const c=client();list.textContent="Loading PDF library…";const {data,error}=await c.from("notes").select("id,title,note_type,grade,subject,unit,is_published,allow_download,pdf_path").not("pdf_path","is",null).order("created_at",{ascending:false});if(error){list.textContent="Could not load notes: "+error.message;return;}list.replaceChildren();if(!data?.length){list.textContent="No PDF notes uploaded yet.";return;}
    data.forEach(row=>{const item=h("div","admin-lesson-row"),info=h("div");info.append(h("strong","",row.title),h("small","",`${typeName(row.note_type)} · Grade ${row.grade} · ${row.subject} · ${row.unit} · ${row.is_published?"Published":"Draft"} · Downloads ${row.allow_download?"On":"Off"}`));const actions=h("div","admin-row-actions");const pub=h("button","small-button",row.is_published?"Unpublish":"Publish");pub.type="button";pub.onclick=async()=>{const r=await c.from("notes").update({is_published:!row.is_published}).eq("id",row.id);if(r.error){msg(r.error.message,true);return;}await loadAdminNotes();await loadPublicNotes();};const dl=h("button","small-button",row.allow_download?"Disable download":"Allow download");dl.type="button";dl.onclick=async()=>{const r=await c.from("notes").update({allow_download:!row.allow_download}).eq("id",row.id);if(r.error){msg(r.error.message,true);return;}loadAdminNotes();};const del=h("button","small-button delete-button","Delete");del.type="button";del.onclick=async()=>{if(!confirm(`Delete PDF note “${row.title}”?`))return;const r=await c.from("notes").delete().eq("id",row.id);if(r.error){msg(r.error.message,true);return;}const rm=await c.storage.from(BUCKET).remove([row.pdf_path]);if(rm.error)msg("Record deleted, but stored PDF cleanup failed: "+rm.error.message,true);await loadAdminNotes();await loadPublicNotes();};actions.append(pub,dl,del);item.append(info,actions);list.append(item);});
  }
  function setupContact(){const f=$("contactForm");if(!f)return;f.addEventListener("submit",e=>{e.preventDefault();const name=$("contactName").value.trim(),email=$("contactEmail").value.trim(),subject=$("contactSubject").value.trim(),body=$("contactMessage").value.trim();const mailto="mailto:support.edutubeethiopia@gmail.com?subject="+encodeURIComponent("ZSecret For Free: "+subject)+"&body="+encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${body}`);const status=$("contactStatus");status.textContent="Opening your email application…";window.location.href=mailto;});}
  document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll('[data-page="notes"]').forEach(b=>b.addEventListener("click",()=>{Object.assign(state,{type:null,grade:null,subject:null,unit:null,note:null});render();}));
    $("noteForm")?.addEventListener("submit",savePdf);$("refreshAdminNotes")?.addEventListener("click",loadAdminNotes);setupContact();render();loadPublicNotes();loadAdminNotes();
    const c=client();if(c?.auth)c.auth.onAuthStateChange(()=>{loadAdminNotes();});
  });
})();
