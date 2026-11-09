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
  navHome:"Home",navLibrary:"Video Library",navExams:"Exam Center",navFavorites:"Favorites",navDashboard:"Dashboard",navAdmin:"Content Manager",student:"Student",workspace:"WORKSPACE",yourSpace:"YOUR SPACE",keepLearning:"Keep learning!",sidebarNote:"Small steps every day lead to big results.",heroEyebrow:"YOUR LEARNING SPACE",heroTitle:"Learn today.<br><em>Lead tomorrow.</em>",heroText:"A place to learn, practice, and prepare for your next big step.",exploreLessons:"Explore lessons",overview:"OVERVIEW",learningSnapshot:"Your learning snapshot",lessonsCompleted:"Lessons completed",quizzesTaken:"Quizzes taken",savedLessons:"Saved lessons",learningProgress:"Learning progress",chooseGrade:"CHOOSE YOUR LEVEL",gradesTitle:"Explore by grade",grade:"Grade",grade9Desc:"Build your foundations",grade10Desc:"Strengthen your skills",grade11Desc:"Prepare for what is next",grade12Desc:"Get ready for exams",quickAccess:"QUICK ACCESS",jumpBack:"Pick up where you left off",browseVideos:"Browse video lessons",browseVideosDesc:"Find a topic and start learning",practiceExams:"Practice exams",practiceExamsDesc:"Test what you have learned",viewProgress:"View your progress",viewProgressDesc:"See your learning activity",learningResources:"LEARNING RESOURCES",videoLibrary:"Video library",libraryIntro:"Explore lessons organized for your grade and subject.",searchLessons:"Search lessons...",allGrades:"All grades",allSubjects:"All subjects",noLessons:"No lessons found. Try another search or filter.",yourCollection:"YOUR COLLECTION",favoritesIntro:"Lessons you have saved for later.",noFavorites:"You have not saved any lessons yet.",testYourself:"TEST YOURSELF",examIntro:"Practice with short sample quizzes.",backToExams:"Back to exams",nextQuestion:"Next question",quizComplete:"QUIZ COMPLETE",yourResult:"Your result",tryAnother:"Try another quiz",yourActivity:"YOUR ACTIVITY",dashboardIntro:"A simple overview of your learning activity.",recentActivity:"Recent activity",manageContent:"MANAGE CONTENT",adminIntro:"Add lessons to this browser's local library.",adminWarning:"Demo mode: this page has no login or server database. Anyone using this browser can edit local content.",lessonTitle:"Lesson title",lessonTitlePlaceholder:"e.g. Introduction to algebra",subject:"Subject",youtubeUrl:"YouTube URL",description:"Description",descriptionPlaceholder:"What will students learn?",addLesson:"Add lesson",currentLessons:"Current lessons",markComplete:"Mark as completed",openYouTube:"Open on YouTube ↗",footerText:"Learn at your pace. Build your future.",watch:"Watch lesson",save:"Save",saved:"Saved",startExam:"Start quiz",minutes:"min",noActivity:"Your activity will appear here.",noAdminLessons:"No lessons have been added yet.",correct:"Correct!",incorrect:"Not quite. The correct answer is:",timeUp:"Time is up!",scoreMessage:"You answered {score} out of {total} correctly.",lessonAdded:"Lesson added.",invalidYoutube:"Enter a valid YouTube video URL.",lessonDeleted:"Lesson deleted.",completedNotice:"Lesson marked as completed.",savedNotice:"Saved to favorites.",removedNotice:"Removed from favorites.",videoUnavailable:"This lesson has no valid YouTube link yet.",confirmDelete:"Delete this lesson?",questionLabel:"QUESTION",watchOnYoutube:"Watch on YouTube",progress:"Progress",attempts:"Quiz attempts",recentLesson:"Completed lesson",quizResult:"Quiz result",
  homeWhyEyebrow:"WHY EDUTUBE",homeFeaturesTitle:"Everything you need to move forward",homeFeaturesText:"A connected learning space for lessons, practice, revision and progress.",homeFeatureVideos:"Video lessons",homeFeatureVideosDesc:"Explore lessons by grade and subject.",homeFeatureExams:"Practice exams",homeFeatureExamsDesc:"Check your understanding with quizzes.",homeFeatureNotes:"Study notes",homeFeatureNotesDesc:"Review learning materials and notes.",homeFeatureStudio:"Study Studio",homeFeatureStudioDesc:"Focus timer, tasks and flashcards.",homeFeatureProgress:"Progress tracking",homeFeatureProgressDesc:"See your completed lessons and activity.",homeFeatureFavorites:"Saved favorites",homeFeatureFavoritesDesc:"Keep useful lessons close at hand.",homeFeatureCertificates:"Certificates",homeFeatureCertificatesDesc:"View your learning achievements.",homeFeatureHelper:"AI study helper",homeFeatureHelperDesc:"Open the study support workspace.",homePathEyebrow:"YOUR LEARNING PATH",homePathTitle:"Choose a grade. Build your future.",homePathText:"Jump straight into the learning level that matches you.",homePath9:"Build strong foundations",homePath9Desc:"Start with the essentials.",homePath10:"Grow your skills",homePath10Desc:"Practice and deepen your knowledge.",homePath11:"Prepare for what is next",homePath11Desc:"Strengthen subject understanding.",homePath12:"Get exam ready",homePath12Desc:"Revise and test your knowledge.",homeStudioEyebrow:"MAKE EVERY MINUTE COUNT",homeStudioTitle:"Your personal Study Studio",homeStudioText:"Plan your sessions, focus with a timer, build flashcards and keep your study tasks organized.",homeStudioButton:"Open Study Studio →",homeSubjectsEyebrow:"EXPLORE KNOWLEDGE",homeSubjectsTitle:"Find your next topic",homeSubjectsText:"Browse the subjects available in the video library.",homeCtaEyebrow:"YOUR NEXT STEP STARTS HERE",homeCtaTitle:"Ready to keep learning?",homeCtaText:"Choose a lesson, practice a question and make progress at your own pace.",homeCtaBrowse:"Explore video library →",homeCtaExam:"Try a practice exam"
 },
 am:{
  navHome:"መነሻ",navLibrary:"የቪዲዮ ቤተ-መጻሕፍት",navExams:"የፈተና ማዕከል",navFavorites:"የተወደዱ",navDashboard:"ዳሽቦርድ",navAdmin:"የይዘት አስተዳደር",student:"ተማሪ",workspace:"የስራ ቦታ",yourSpace:"የእርስዎ ቦታ",keepLearning:"መማርዎን ይቀጥሉ!",sidebarNote:"በየቀኑ ትንሽ መሻሻል ትልቅ ውጤት ያመጣል።",heroEyebrow:"የትምህርት ቦታዎ",heroTitle:"ዛሬ ይማሩ።<br><em>ነገን ይምሩ።</em>",heroText:"ለመማር፣ ለመለማመድ እና ለቀጣይ እርምጃዎ ለመዘጋጀት የተዘጋጀ ቦታ።",exploreLessons:"ትምህርቶችን ይመልከቱ",overview:"አጠቃላይ እይታ",learningSnapshot:"የትምህርት ሁኔታዎ",lessonsCompleted:"የተጠናቀቁ ትምህርቶች",quizzesTaken:"የተወሰዱ ፈተናዎች",savedLessons:"የተቀመጡ ትምህርቶች",learningProgress:"የትምህርት እድገት",chooseGrade:"ደረጃዎን ይምረጡ",gradesTitle:"በክፍል ይፈልጉ",grade:"ክፍል",grade9Desc:"መሠረታዊ እውቀትዎን ይገንቡ",grade10Desc:"ችሎታዎን ያጠናክሩ",grade11Desc:"ለቀጣዩ ደረጃ ይዘጋጁ",grade12Desc:"ለፈተና ይዘጋጁ",quickAccess:"ፈጣን መዳረሻ",jumpBack:"ከቀጠሉበት ይቀጥሉ",browseVideos:"የቪዲዮ ትምህርቶችን ይፈልጉ",browseVideosDesc:"ርዕስ ይምረጡና መማር ይጀምሩ",practiceExams:"የልምምድ ፈተናዎች",practiceExamsDesc:"የተማሩትን ይፈትሹ",viewProgress:"እድገትዎን ይመልከቱ",viewProgressDesc:"የትምህርት እንቅስቃሴዎን ይመልከቱ",learningResources:"የትምህርት ሀብቶች",videoLibrary:"የቪዲዮ ቤተ-መጻሕፍት",libraryIntro:"በክፍልና በትምህርት የተደራጁ ቪዲዮዎችን ይመልከቱ።",searchLessons:"ትምህርቶችን ይፈልጉ...",allGrades:"ሁሉም ክፍሎች",allSubjects:"ሁሉም ትምህርቶች",noLessons:"ምንም ትምህርት አልተገኘም። ሌላ ፍለጋ ወይም ማጣሪያ ይሞክሩ።",yourCollection:"የእርስዎ ስብስብ",favoritesIntro:"ለወደፊት ያስቀመጧቸው ትምህርቶች።",noFavorites:"እስካሁን ምንም ትምህርት አላስቀመጡም።",testYourself:"ራስዎን ይፈትሹ",examIntro:"በአጭር የልምምድ ፈተናዎች ይለማመዱ።",backToExams:"ወደ ፈተናዎች ተመለስ",nextQuestion:"ቀጣይ ጥያቄ",quizComplete:"ፈተናው ተጠናቋል",yourResult:"ውጤትዎ",tryAnother:"ሌላ ፈተና ይሞክሩ",yourActivity:"የእንቅስቃሴዎ",dashboardIntro:"የትምህርት እንቅስቃሴዎ አጠቃላይ ማጠቃለያ።",recentActivity:"የቅርብ ጊዜ እንቅስቃሴ",manageContent:"ይዘትን ያስተዳድሩ",adminIntro:"በዚህ ብራውዘር የአካባቢ ማከማቻ ላይ ትምህርቶችን ይጨምሩ።",adminWarning:"የሙከራ ሁኔታ፦ ይህ ገጽ የመግቢያ ስርዓት ወይም የServer ዳታቤዝ የለውም። ይህን ብራውዘር የሚጠቀም ሰው ይዘቱን ሊቀይር ይችላል።",lessonTitle:"የትምህርት ርዕስ",lessonTitlePlaceholder:"ለምሳሌ፦ የአልጀብራ መግቢያ",subject:"ትምህርት",youtubeUrl:"የYouTube አድራሻ",description:"መግለጫ",descriptionPlaceholder:"ተማሪዎች ምን ይማራሉ?",addLesson:"ትምህርት ጨምር",currentLessons:"ያሉ ትምህርቶች",markComplete:"ተጠናቋል ብለው ምልክት ያድርጉ",openYouTube:"በYouTube ይክፈቱ ↗",footerText:"በራስዎ ፍጥነት ይማሩ። ወደፊትዎን ይገንቡ።",watch:"ትምህርቱን ይመልከቱ",save:"አስቀምጥ",saved:"ተቀምጧል",startExam:"ፈተና ጀምር",minutes:"ደቂቃ",noActivity:"እንቅስቃሴዎ እዚህ ይታያል።",noAdminLessons:"እስካሁን ምንም ትምህርት አልተጨመረም።",correct:"ትክክል!",incorrect:"ትክክል አይደለም። ትክክለኛው መልስ፦",timeUp:"ጊዜው አልቋል!",scoreMessage:"ከ{total} ጥያቄዎች {score} በትክክል መልሰዋል።",lessonAdded:"ትምህርቱ ተጨምሯል።",invalidYoutube:"ትክክለኛ የYouTube ቪዲዮ አድራሻ ያስገቡ።",lessonDeleted:"ትምህርቱ ተሰርዟል።",completedNotice:"ትምህርቱ እንደተጠናቀቀ ተመዝግቧል።",savedNotice:"ወደ ተወዳጆች ተጨምሯል።",removedNotice:"ከተወዳጆች ተወግዷል።",videoUnavailable:"ይህ ትምህርት ትክክለኛ የYouTube አድራሻ የለውም።",confirmDelete:"ይህን ትምህርት ይሰርዙ?",questionLabel:"ጥያቄ",watchOnYoutube:"በYouTube ይመልከቱ",progress:"እድገት",attempts:"የፈተና ሙከራዎች",recentLesson:"የተጠናቀቀ ትምህርት",quizResult:"የፈተና ውጤት",
  homeWhyEyebrow:"EDUTUBEን ለምን ይመርጣሉ?",homeFeaturesTitle:"ወደፊት ለመራመድ የሚያስፈልግዎ ሁሉ",homeFeaturesText:"ትምህርት፣ ልምምድ፣ ክለሳ እና እድገትን በአንድ ቦታ ያገኛሉ።",homeFeatureVideos:"የቪዲዮ ትምህርቶች",homeFeatureVideosDesc:"በክፍልና በትምህርት ይፈልጉ።",homeFeatureExams:"የልምምድ ፈተናዎች",homeFeatureExamsDesc:"እውቀትዎን በጥያቄዎች ይፈትሹ።",homeFeatureNotes:"የትምህርት ማስታወሻዎች",homeFeatureNotesDesc:"የትምህርት ማቴሪያሎችን ይከልሱ።",homeFeatureStudio:"የጥናት ስቱዲዮ",homeFeatureStudioDesc:"የትኩረት ሰዓት፣ ተግባሮች እና ፍላሽ ካርዶች።",homeFeatureProgress:"የእድገት ክትትል",homeFeatureProgressDesc:"የተጠናቀቁ ትምህርቶችዎን ይመልከቱ።",homeFeatureFavorites:"የተቀመጡ ተወዳጆች",homeFeatureFavoritesDesc:"ጠቃሚ ትምህርቶችን ያስቀምጡ።",homeFeatureCertificates:"የምስክር ወረቀቶች",homeFeatureCertificatesDesc:"የትምህርት ስኬቶችዎን ይመልከቱ።",homeFeatureHelper:"AI የጥናት እገዛ",homeFeatureHelperDesc:"የትምህርት ድጋፍ ቦታውን ይክፈቱ።",homePathEyebrow:"የትምህርት ጉዞዎ",homePathTitle:"ክፍል ይምረጡ፤ ወደፊትዎን ይገንቡ።",homePathText:"ከእርስዎ ጋር የሚስማማውን የትምህርት ደረጃ ይምረጡ።",homePath9:"ጠንካራ መሠረት ይገንቡ",homePath9Desc:"ከመሠረታዊ ነገሮች ይጀምሩ።",homePath10:"ችሎታዎን ያሳድጉ",homePath10Desc:"ይለማመዱና እውቀትዎን ያጠናክሩ።",homePath11:"ለቀጣዩ ደረጃ ይዘጋጁ",homePath11Desc:"የትምህርት ግንዛቤዎን ያጠናክሩ።",homePath12:"ለፈተና ይዘጋጁ",homePath12Desc:"ይከልሱና እውቀትዎን ይፈትሹ።",homeStudioEyebrow:"እያንዳንዱን ደቂቃ በትክክል ይጠቀሙ",homeStudioTitle:"የግል የጥናት ስቱዲዮዎ",homeStudioText:"የጥናት ጊዜዎን ያቅዱ፣ በሰዓት ይተኩሩ፣ ፍላሽ ካርዶችን ይፍጠሩ።",homeStudioButton:"የጥናት ስቱዲዮን ይክፈቱ →",homeSubjectsEyebrow:"እውቀትን ያስሱ",homeSubjectsTitle:"ቀጣይ ርዕስዎን ያግኙ",homeSubjectsText:"በቪዲዮ ቤተ-መጻሕፍት ያሉትን ትምህርቶች ይፈልጉ።",homeCtaEyebrow:"ቀጣይ እርምጃዎ እዚህ ይጀምራል",homeCtaTitle:"መማርዎን ለመቀጠል ዝግጁ ነዎት?",homeCtaText:"ትምህርት ይምረጡ፣ ጥያቄ ይለማመዱ እና በራስዎ ፍጥነት ይሻሻሉ።",homeCtaBrowse:"የቪዲዮ ቤተ-መጻሕፍትን ይመልከቱ →",homeCtaExam:"የልምምድ ፈተና ይሞክሩ"
 }
};
let language = localStorage.getItem(STORAGE.language) || "en";
let videos = read(STORAGE.videos, [
 {id:"v1",title:"Introduction to Algebra",grade:"9",subject:"Mathematics",description:"Learn variables and simple algebraic expressions.",url:"https://www.youtube.com/watch?v=NybHckbien0"},
 {id:"v2",title:"Newton's Laws of Motion",grade:"10",subject:"Physics",description:"Understand the foundations of classical mechanics.",url:""},
 {id:"v3",title:"Cell Structure and Function",grade:"11",subject:"Biology",description:"Explore the main parts of a living cell.",url:""},
 {id:"v4",title:"Chemical Bonding",grade:"12",subject:"Chemistry",description:"An introduction to ionic and covalent bonds.",url:""}
 ]);
let favorites = read(STORAGE.favorites, []);
let completed = read(STORAGE.completed, []);
let attempts = read(STORAGE.attempts, []);
let currentVideo = null, currentExam = null, questionIndex = 0, score = 0, selectedAnswer = null, secondsLeft = 300, timerId = null, toastTimer = null;

const exams = [
 {id:"math10",title:"Algebra basics",grade:"10",subject:"Mathematics",minutes:5,questions:[
  {q:"Solve: 2x + 4 = 12",a:["2","4","6","8"],correct:1},
  {q:"What is 5²?",a:["10","15","20","25"],correct:3},
  {q:"Simplify: 3a + 2a",a:["5","6a","5a","a"],correct:2}]},
 {id:"physics10",title:"Motion and forces",grade:"10",subject:"Physics",minutes:5,questions:[
  {q:"What is the SI unit of force?",a:["Joule","Newton","Watt","Pascal"],correct:1},
  {q:"Which law is written as F = ma?",a:["Newton's first law","Newton's second law","Newton's third law","Law of gravitation"],correct:1},
  {q:"Speed is calculated by:",a:["Distance ÷ time","Time ÷ distance","Mass × acceleration","Force ÷ area"],correct:0}]}
];

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
function getYouTubeId(url){
 try{const u=new URL(url);let id="";if(["youtube.com","www.youtube.com","m.youtube.com"].includes(u.hostname))id=u.searchParams.get("v")||"";else if(u.hostname==="youtu.be")id=u.pathname.slice(1);else if(u.hostname==="www.youtube-nocookie.com"||u.hostname==="youtube-nocookie.com")id=u.pathname.split("/").filter(Boolean).pop()||"";return /^[a-zA-Z0-9_-]{11}$/.test(id)?id:null}catch{return null}
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
 const vid=getYouTubeId(video.url);
 const thumb=document.createElement("button");
 thumb.type="button";thumb.className="video-thumb";thumb.setAttribute("aria-label",video.title);
 if(vid)thumb.style.backgroundImage=`linear-gradient(transparent 40%,#000b),url(https://i.ytimg.com/vi/${vid}/hqdefault.jpg)`;
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
 const list=videos.filter(v=>(grade==="all"||v.grade===grade)&&(subject==="all"||v.subject===subject)&&`${v.title} ${v.description} ${v.subject}`.toLowerCase().includes(query));
 list.forEach(v=>grid.append(videoCard(v)));$("videoEmpty").classList.toggle("hidden",list.length>0);
}
function renderFavorites(){const grid=$("favoriteGrid");grid.replaceChildren();const list=videos.filter(v=>favorites.includes(v.id));list.forEach(v=>grid.append(videoCard(v)));$("favoriteEmpty").classList.toggle("hidden",list.length>0)}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];write(STORAGE.favorites,favorites);renderAll();notify(favorites.includes(id)?t("savedNotice"):t("removedNotice"))}

function markComplete(){if(!currentVideo)return;if(!completed.includes(currentVideo.id)){completed.push(currentVideo.id);write(STORAGE.completed,completed)}closeVideo();renderAll();notify(t("completedNotice"))}
function renderExams(){const grid=$("examGrid");grid.replaceChildren();const grade=$("examGrade").value,subject=$("examSubject").value;exams.filter(e=>(grade==="all"||e.grade===grade)&&(subject==="all"||e.subject===subject)).forEach(exam=>{const card=document.createElement("article");card.className="exam-card";const meta=document.createElement("div");meta.className="video-meta";meta.textContent=`GRADE ${exam.grade} · ${exam.subject}`;const h=document.createElement("h3");h.textContent=exam.title;const p=document.createElement("p");p.textContent=`${exam.questions.length} questions · ${exam.minutes} ${t("minutes")}`;const b=document.createElement("button");b.className="primary-button";b.textContent=t("startExam");b.addEventListener("click",()=>startExam(exam.id));card.append(meta,h,p,b);grid.append(card)})}
function startExam(id){currentExam=exams.find(e=>e.id===id);if(!currentExam)return;questionIndex=0;score=0;selectedAnswer=null;secondsLeft=currentExam.minutes*60;showPage("quiz");renderQuestion();startTimer()}
function renderQuestion(){const q=currentExam.questions[questionIndex];$("questionCount").textContent=`${t("questionLabel")} ${questionIndex+1} / ${currentExam.questions.length}`;$("questionText").textContent=q.q;$("quizProgress").style.width=`${questionIndex/currentExam.questions.length*100}%`;$("answerList").replaceChildren();$("quizFeedback").textContent="";$("nextQuestion").disabled=true;$("nextQuestion").textContent=questionIndex===currentExam.questions.length-1?(language==="am"?"ውጤት አሳይ":"Show result"):t("nextQuestion");q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer-option";b.textContent=answer;b.addEventListener("click",()=>chooseAnswer(i));$("answerList").append(b)})}
function chooseAnswer(index){if(selectedAnswer!==null)return;selectedAnswer=index;const q=currentExam.questions[questionIndex];document.querySelectorAll(".answer-option").forEach((b,i)=>{b.disabled=true;if(i===index)b.classList.add("selected")});const correct=index===q.correct;if(correct)score++;$("quizFeedback").textContent=correct?t("correct"):`${t("incorrect")} ${q.a[q.correct]}`;$("nextQuestion").disabled=false}
function nextQuestion(){if(selectedAnswer===null)return;questionIndex++;selectedAnswer=null;if(questionIndex>=currentExam.questions.length){finishExam();return}renderQuestion()}
function startTimer(){stopTimer();updateTimer();timerId=setInterval(()=>{secondsLeft--;updateTimer();if(secondsLeft<=0){stopTimer();finishExam(true)}},1000)}
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
function updateTimer(){$("quizTimer").textContent=`${String(Math.floor(secondsLeft/60)).padStart(2,"0")}:${String(secondsLeft%60).padStart(2,"0")}`}
function finishExam(timeUp=false){
  stopTimer();
  const total=currentExam.questions.length;
  const percent=Math.round(score/total*100);
  attempts.unshift({title:currentExam.title,score,total,percent,date:new Date().toLocaleDateString()});
  write(STORAGE.attempts,attempts);
  $("resultScore").textContent=`${percent}%`;
  $("resultMessage").textContent=timeUp?t("timeUp")+" "+t("scoreMessage",{score,total}):t("scoreMessage",{score,total});
  showPage("results");
  renderDashboard();
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
 if(localStorage.getItem(STORAGE.theme)==="light")document.body.classList.add("light");
 document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
 document.querySelectorAll("[data-grade]").forEach(b=>b.addEventListener("click",()=>{$("videoGrade").value=b.dataset.grade;showPage("library");renderVideos()}));
 document.querySelectorAll("[data-home-subject]").forEach(b=>b.addEventListener("click",()=>{$("videoSubject").value=b.dataset.homeSubject;showPage("library");renderVideos()}));
 $("languageButton").addEventListener("click",toggleLanguage);$("themeButton").addEventListener("click",toggleTheme);$("menuButton").addEventListener("click",toggleSidebar);
 $("videoSearch").addEventListener("input",renderVideos);$("videoGrade").addEventListener("change",renderVideos);$("videoSubject").addEventListener("change",renderVideos);$("examGrade").addEventListener("change",renderExams);$("examSubject").addEventListener("change",renderExams);
 $("closePlayer").addEventListener("click",closeVideo);document.querySelector("[data-close-modal]").addEventListener("click",closeVideo);$("completeLesson").addEventListener("click",markComplete);$("nextQuestion").addEventListener("click",nextQuestion);
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
    thumbnail_url: v.thumbnail_url || "",
    published: v.is_published,
    dbId: v.id
  }));

  renderAll();
}

document.addEventListener("DOMContentLoaded", loadVideosFromSupabase);

const PROG="edutube_v4_progress";
let yt=null,tick=null,seeking=false,lastTap=0,hideT=null,saveTick=0;
let speed=Number(localStorage.getItem("edutube_v4_speed"))||1;
const fmt=s=>{s=Math.floor(s||0);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};

function fallbackEmbed(vid,start){
  const frame=$("videoFrame");
  let f=$("fbPlayer");
  if(!f){
    f=document.createElement("iframe");f.id="fbPlayer";
    f.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen=true;frame.append(f);
  }
  f.src=`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1&playsinline=1&start=${Math.floor(start)}`;
}

function buildPlayer(vid,start){
  if(yt&&yt.loadVideoById){yt.loadVideoById({videoId:vid,startSeconds:start});return}
  yt=new YT.Player("ytHost",{videoId:vid,host:"https://www.youtube-nocookie.com",
    playerVars:{autoplay:1,controls:0,rel:0,modestbranding:1,playsinline:1,fs:0,iv_load_policy:3,disablekb:1,start:Math.floor(start)},
    events:{
      onReady:()=>$("videoFrame").classList.remove("loading"),
      onStateChange:e=>{
        if([1,2,3,5].includes(e.data))$("videoFrame").classList.remove("loading");
        onState(e);
      },
      onError:()=>{$("videoFrame").classList.remove("loading");notify("ይህ ቪዲዮ እዚህ ሊጫወት አይችልም")}
    }});
}

function update(){
  if(!yt||!yt.getDuration)return;
  const d=yt.getDuration()||0,c=yt.getCurrentTime()||0,pct=d?c/d:0;
  if(!seeking)$("seek").value=pct*1000;
  $("seek").style.setProperty("--p",pct*100+"%");
  $("timeLabel").textContent=fmt(c)+" / "+fmt(d);
  if(++saveTick%6===0)saveProgress();
  if(pct>=.9&&currentVideo&&!completed.includes(currentVideo.id)){
    completed.push(currentVideo.id);write(STORAGE.completed,completed);renderAll();notify(t("completedNotice"));
  }
}
function saveProgress(){
  if(!yt||!yt.getCurrentTime||!currentVideo)return;
  const c=yt.getCurrentTime(),d=yt.getDuration(),p=read(PROG,{}),q=read(PCT,{});
  if(c>5&&d&&c<d-10){p[currentVideo.id]=Math.floor(c);q[currentVideo.id]=Math.round(c/d*100)}
  else delete p[currentVideo.id];
  write(PROG,p);write(PCT,q);
}
function showControls(){const p=$("videoFrame");p.classList.add("show");clearTimeout(hideT);hideT=setTimeout(()=>p.classList.remove("show"),3000)}
function togglePlay(){yt.getPlayerState()===1?yt.pauseVideo():yt.playVideo();showControls()}
function skip(d){
  yt.seekTo(Math.max(0,yt.getCurrentTime()+d),true);
  const f=$("skipFx");f.textContent=(d<0?"⏪ ":"⏩ ")+Math.abs(d)+"s";
  f.className="skip-fx "+(d<0?"l":"r");void f.offsetWidth;f.classList.add("go");showControls();
}
function toggleMute(){if(yt.isMuted()){yt.unMute();$("btnMute").innerHTML='<i data-lucide="volume-2" aria-hidden="true"></i>';refreshIcons()}else{yt.mute();$("btnMute").innerHTML='<i data-lucide="volume-x" aria-hidden="true"></i>';refreshIcons()}}

function setSpeedButton(s){
  document.querySelectorAll(".speed-btn").forEach(b=>b.classList.toggle("active",Number(b.dataset.speed)===s));
  const label=$("currentSpeedLabel");if(label)label.textContent=s+"×";
}
function playNext(){
  if(!currentVideo)return;
  const i=videos.findIndex(v=>v.id===currentVideo.id);
  const n=videos.slice(i+1).find(v=>getYouTubeId(v.url));
  if(!n){notify("ቀጣይ ትምህርት የለም");return}
  saveProgress();openVideo(n.id);
}

$("btnPlay").addEventListener("click",togglePlay);
$("btnBack").addEventListener("click",()=>skip(-10));
$("btnFwd").addEventListener("click",()=>skip(10));
$("btnMute").addEventListener("click",toggleMute);
$("btnFull").addEventListener("click",()=>toggleFull());
$("nextLesson").addEventListener("click",playNext);
$("seek").addEventListener("input",()=>{if(!yt||!yt.getDuration||!yt.seekTo)return;seeking=true;yt.seekTo(yt.getDuration()*$("seek").value/1000,true);showControls()});
$("seek").addEventListener("change",()=>{seeking=false});
document.querySelectorAll(".speed-btn").forEach(b=>b.addEventListener("click",()=>{
  speed=Number(b.dataset.speed);localStorage.setItem("edutube_v4_speed",speed);
  if(yt&&yt.setPlaybackRate)yt.setPlaybackRate(speed);
  setSpeedButton(speed);
  $("speedMenu").classList.add("hidden");
  $("speedMenuButton").setAttribute("aria-expanded","false");
}));
$("speedMenuButton").addEventListener("click",()=>{
  const menu=$("speedMenu"),willOpen=menu.classList.contains("hidden");
  menu.classList.toggle("hidden",!willOpen);
  $("speedMenuButton").setAttribute("aria-expanded",String(willOpen));
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".speed-menu-wrap")){
    $("speedMenu").classList.add("hidden");
    $("speedMenuButton").setAttribute("aria-expanded","false");
  }
});
$("tapLayer").addEventListener("click",e=>{
  const now=Date.now(),r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width;
  if(now-lastTap<300){lastTap=0;if(x<.4)skip(-10);else if(x>.6)skip(10);else togglePlay();return}
  lastTap=now;setTimeout(()=>{if(lastTap===now){lastTap=0;togglePlay()}},300);
});
document.addEventListener("keydown",e=>{
  if($("videoModal").classList.contains("hidden")||!yt)return;
  const k=String(e.key||"").toLowerCase();
  if(k===" "||k==="k"){e.preventDefault();togglePlay()}
  else if(k==="arrowleft"||k==="j")skip(-10);
  else if(k==="arrowright"||k==="l")skip(10);
  else if(k==="f")toggleFull();
  else if(k==="m")toggleMute();
});
document.addEventListener("fullscreenchange",()=>{if(!document.fullscreenElement&&screen.orientation&&screen.orientation.unlock)screen.orientation.unlock()});

const PCT="edutube_v4_pct";
let ytApiPromise=null;

function loadYTApi(){
  if(window.YT&&YT.Player)return Promise.resolve();
  if(!ytApiPromise){
    ytApiPromise=new Promise((resolve,reject)=>{
      if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
        const s=document.createElement("script");
        s.src="https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
      let n=0;
      const iv=setInterval(()=>{
        if(window.YT&&YT.Player){clearInterval(iv);resolve()}
        else if(++n>75){clearInterval(iv);ytApiPromise=null;reject(new Error("timeout"))}
      },200);
    });
  }
  return ytApiPromise;
}
loadYTApi().catch(()=>{});

function ensureUpNext(){
  if($("upNext"))return;
  const wrap=document.createElement("div");
  wrap.innerHTML='<div class="upnext-head"><h3>⏭ Up next</h3><label class="autoplay"><input type="checkbox" id="autoNext"> Autoplay</label></div><div id="upNext" class="upnext"></div>';
  document.querySelector("#videoModal .modal-footer").before(wrap);
  const cb=$("autoNext");
  cb.checked=localStorage.getItem("edutube_v4_auto")!=="0";
  cb.addEventListener("change",()=>localStorage.setItem("edutube_v4_auto",cb.checked?"1":"0"));
}

function renderUpNext(){
  const box=$("upNext");if(!box)return;
  box.replaceChildren();
  if(!currentVideo)return;
  const i=videos.findIndex(v=>v.id===currentVideo.id);
  const list=[...videos.slice(i+1),...videos.slice(0,i)].filter(v=>getYouTubeId(v.url));
  if(!list.length){box.textContent="ሌላ ትምህርት የለም";return}
  const pct=read(PCT,{});
  list.forEach(v=>{
    const row=document.createElement("button");row.type="button";row.className="up-item";
    const img=document.createElement("span");img.className="up-thumb";
    img.style.backgroundImage=`url(https://i.ytimg.com/vi/${getYouTubeId(v.url)}/mqdefault.jpg)`;
    if(pct[v.id]){const bar=document.createElement("i");bar.className="thumb-bar";const f=document.createElement("b");f.style.width=Math.min(pct[v.id],100)+"%";bar.append(f);img.append(bar)}
    const txt=document.createElement("span");txt.className="up-text";
    const h=document.createElement("b");h.textContent=v.title;
    const m=document.createElement("small");m.textContent=`Grade ${v.grade} · ${v.subject}`+(completed.includes(v.id)?" · ✓":"");
    txt.append(h,m);row.append(img,txt);
    row.addEventListener("click",()=>{saveProgress();openVideo(v.id)});
    box.append(row);
  });
}

async function openVideo(id){
  const video=videos.find(v=>v.id===id);if(!video)return;
  const vid=getYouTubeId(video.url);
  if(!vid){notify(t("videoUnavailable"));return}
  ensureUpNext();currentVideo=video;
  $("modalTitle").textContent=video.title;
  const start=read(PROG,{})[video.id]||0;
  const frame=$("videoFrame");
  frame.style.setProperty("--poster",`url(https://i.ytimg.com/vi/${vid}/hqdefault.jpg)`);
  frame.classList.remove("fallback");frame.classList.add("loading");
  const fb=$("fbPlayer");if(fb)fb.src="";
  showPoster(vid,video.title);
  $("videoModal").classList.remove("hidden");
  lockPageScroll();
  const mc=document.querySelector("#videoModal .modal-content");if(mc)mc.scrollTop=0;
  renderUpNext();
  if(!(window.YT&&YT.Player)){
    try{await Promise.race([loadYTApi(),new Promise((_,rej)=>setTimeout(()=>rej(new Error("slow")),9000))])}
    catch(e){
      if(currentVideo!==video)return;
      frame.classList.remove("loading");frame.classList.add("fallback");
      $("poster").classList.add("hidden");fallbackEmbed(vid,start);return;
    }
  }
  if(currentVideo!==video)return;
  setSpeedButton(speed);buildPlayer(vid,start);
  clearInterval(tick);tick=setInterval(update,500);
  if(start>5)notify("▶ "+fmt(start)+" ላይ ቀጥሏል");
}

function closeVideo(){
  saveProgress();clearInterval(tick);
  if(yt&&yt.stopVideo)yt.stopVideo();
  const fb=$("fbPlayer");if(fb)fb.src="";
  $("videoFrame").classList.remove("loading","fallback");
  if(document.fullscreenElement)document.exitFullscreen();
  $("videoModal").classList.add("hidden");
  unlockPageScroll();currentVideo=null;
  renderVideos();
}

/* ============ PLAYER PRO PATCH & SURPRISES ============ */
const poster=$("poster"),posterImg=$("posterImg"),posterTitle=$("posterTitle");
function showPoster(vid,title){
  posterImg.src=`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
  posterTitle.textContent=title;poster.classList.remove("hidden");
  $("videoFrame").classList.remove("playing");
}
poster.addEventListener("click",()=>{
  if(yt&&yt.playVideo){poster.classList.add("hidden");yt.playVideo()}
  else notify("⏳ Player እየተጫነ ነው...");
});
function showSpeedChip(txt){const c=$("speedChip");if(!c)return;c.textContent=txt;c.classList.add("show");clearTimeout(c._t);c._t=setTimeout(()=>c.classList.remove("show"),1100)}
document.querySelectorAll(".speed-btn").forEach(b=>b.addEventListener("click",()=>showSpeedChip(Number(b.dataset.speed)+"×")));
document.addEventListener("DOMContentLoaded",()=>{$("speedMenu").classList.add("hidden")});

/* Surprise 1: Long-press = 2× speed */
let holdT=null,holdOn=false,justHeld=false;
$("tapLayer").addEventListener("pointerdown",()=>{holdT=setTimeout(()=>{holdOn=true;justHeld=true;if(yt&&yt.setPlaybackRate)yt.setPlaybackRate(2);$("holdFx").classList.add("show")},450)});
["pointerup","pointercancel","pointerleave"].forEach(ev=>$("tapLayer").addEventListener(ev,()=>{clearTimeout(holdT);if(holdOn){holdOn=false;if(yt&&yt.setPlaybackRate)yt.setPlaybackRate(speed);$("holdFx").classList.remove("show")}}));
$("videoFrame").addEventListener("click",e=>{if(justHeld){justHeld=false;e.stopPropagation()}},true);

/* Surprise 2: Visibility pause */
document.addEventListener("visibilitychange",()=>{if(document.hidden&&currentVideo&&yt&&yt.pauseVideo)yt.pauseVideo()});

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

function onState(e){
  const playing=e.data===YT.PlayerState.PLAYING;
  $("btnPlay").textContent=playing?"⏸":"▶";
  const frame=$("videoFrame");
  frame.classList.toggle("playing",playing);
  if([1,2,3,5].includes(e.data))frame.classList.remove("loading");
  if(playing){poster.classList.add("hidden");showControls();
    if(yt.getPlaybackRate&&yt.getPlaybackRate()!==speed)yt.setPlaybackRate(speed)}
  if(e.data===YT.PlayerState.ENDED&&currentVideo){
    const p=read(PROG,{}),q=read(PCT,{});
    delete p[currentVideo.id];q[currentVideo.id]=100;write(PROG,p);write(PCT,q);
    if(!completed.includes(currentVideo.id)){completed.push(currentVideo.id);write(STORAGE.completed,completed);renderAll()}
    if($("autoNext")&&$("autoNext").checked)startNextCountdown();
    else notify("ትምህርቱ ተጠናቀቀ!");
  }
}

/* ============ WATCH PAGE v2 PATCH ============ */
(function(){
const M=$("videoModal");if(!M)return;
const wb=$("watchBack");
if(wb)wb.addEventListener("click",()=>closeVideo());

let vmodState=false;
const _openVideo=openVideo,_closeVideo=closeVideo;
openVideo=async function(id){
  const video=videos.find(v=>v.id===id);
  if(video){const vid=getYouTubeId(video.url);
    if(vid&&$("poster")){
      $("posterImg").src=`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
      $("posterTitle").textContent=video.title;
      $("poster").classList.remove("hidden");
    }}
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
  if(yt&&yt.pauseVideo)yt.pauseVideo();
}
function setWatermark(){
  const w=$("wm");if(!w||!currentVideo)return;
  const d=new Date();
  w.textContent=(currentVideo.title||"").slice(0,24)+" · EduTube · "+d.toLocaleDateString()+" "+
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

async function refreshPublicLessons(){if(!supabaseClient){console.warn('Supabase is unavailable; keeping local lessons.');return;}const {data,error}=await supabaseClient.from('lessons').select('*').eq('is_published',true).order('created_at',{ascending:false});if(error){console.error('Public lessons:',error);return;}videos=(data||[]).map(v=>({id:'db'+v.id,dbId:v.id,title:v.title,grade:String(v.grade),subject:v.subject,description:v.description||'',url:v.youtube_url||'',thumbnail_url:v.thumbnail_url||'',published:true}));renderAll();}
async function loadAdminLessons(){if(!edutubeAdminUser||!supabaseClient)return;const list=$('adminLessonList');list.textContent='Loading lessons…';const {data,error}=await supabaseClient.from('lessons').select('*').order('created_at',{ascending:false});if(error){console.error(error);list.textContent=error.message;adminMsg('Could not load admin lessons. Check admin RLS policies.',true);return;}list.replaceChildren();if(!data.length){list.textContent='No lessons yet. Add your first lesson above.';return;}data.forEach(row=>{const item=document.createElement('div');item.className='admin-lesson-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=row.title;const meta=document.createElement('small');meta.textContent=`Grade ${row.grade} · ${row.subject} · ${row.is_published?'Published':'Draft'}`;info.append(title,meta);const actions=document.createElement('div');actions.className='admin-row-actions';const toggle=document.createElement('button');toggle.type='button';toggle.className='small-button';toggle.textContent=row.is_published?'Unpublish':'Publish';toggle.addEventListener('click',()=>changePublishState(row.id,!row.is_published));const del=document.createElement('button');del.type='button';del.className='small-button delete-button';del.textContent='Delete';del.addEventListener('click',()=>deleteAdminLesson(row.id,row.title));actions.append(toggle,del);item.append(info,actions);list.append(item);});}
async function changePublishState(id,publish){if(!edutubeAdminUser||!supabaseClient)return;const {error}=await supabaseClient.from('lessons').update({is_published:publish}).eq('id',id);if(error){adminMsg('Update failed: '+error.message,true);return;}adminMsg(publish?'Lesson published for all students.':'Lesson moved to draft.');await loadAdminLessons();await refreshPublicLessons();}
async function deleteAdminLesson(id,title){if(!edutubeAdminUser||!supabaseClient||!confirm(`Permanently delete “${title}”?`))return;const {error}=await supabaseClient.from('lessons').delete().eq('id',id);if(error){adminMsg('Delete failed: '+error.message,true);return;}adminMsg('Lesson deleted.');await loadAdminLessons();await refreshPublicLessons();}
async function addAdminLesson(event){event.preventDefault();if(!supabaseClient){adminMsg('Supabase is unavailable. Check your internet connection and CDN access.',true);return;}if(!edutubeAdminUser){adminMsg('Please sign in with an authorized admin account.',true);return;}const url=$('lessonUrl').value.trim();const videoId=getYouTubeId(url);if(!videoId){adminMsg('Enter a valid YouTube video URL.',true);return;}const payload={title:$('lessonTitle').value.trim(),grade:Number($('lessonGrade').value),subject:$('lessonSubject').value,youtube_url:url,thumbnail_url:$('lessonThumbnail').value.trim()||`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,description:$('lessonDescription').value.trim(),is_published:$('lessonPublish').checked};const button=event.submitter;if(button){button.disabled=true;button.textContent='Saving…';}const {error}=await supabaseClient.from('lessons').insert(payload);if(button){button.disabled=false;button.textContent='＋ Save lesson to Supabase';}if(error){adminMsg('Could not save lesson: '+error.message,true);return;}event.target.reset();$('lessonPublish').checked=true;adminMsg(payload.is_published?'Lesson saved and published. Students can now see it.':'Lesson saved as a draft.');await loadAdminLessons();await refreshPublicLessons();}
async function initEdutubeAdmin(){
  if(!supabaseClient||!supabaseClient.auth){updateAdminView(null);adminMsg('Supabase library did not load. Check your internet connection, then reload.',true);return;}
  const recoveryRequested=new URLSearchParams(window.location.search).get('password-recovery')==='1';
  const recoveryForm=$('adminRecoveryForm');
  const showRecoveryForm=()=>{recoveryForm?.classList.remove('hidden');$('adminLoginForm')?.classList.add('hidden');adminMsg('Recovery link accepted. Choose a new password below.');};
  const {data:{session}}=await supabaseClient.auth.getSession();
  if(recoveryRequested&&session)showRecoveryForm();
  if(session&&!isEdutubeAdmin(session.user)){updateAdminView(null);adminMsg('Signed in as a student. Admin tools require a separate account with the admin role.',true);}else updateAdminView(session?.user||null);
  supabaseClient.auth.onAuthStateChange((event,newSession)=>{
    if(event==='PASSWORD_RECOVERY'){showRecoveryForm();return;}
    const user=newSession?.user||null;
    if(user&&!isEdutubeAdmin(user)){updateAdminView(null);adminMsg('Student account active. Admin tools are available only to authorized administrators.',true);}else updateAdminView(user);
  });
  $('adminForgotPassword')?.addEventListener('click',async()=>{
    const email=$('adminEmail')?.value.trim();
    if(!email){adminMsg('Enter your existing admin email address first, then choose Forgot password.',true);$('adminEmail')?.focus();return;}
    const redirectTo=window.location.origin+window.location.pathname+'?password-recovery=1';
    const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo});
    if(error){adminMsg('Could not send recovery email: '+error.message,true);return;}
    adminMsg('If this email belongs to an account, Supabase has sent a password recovery link. Check Inbox and Spam.');
  });
  recoveryForm?.addEventListener('submit',async e=>{
    e.preventDefault();const password=$('adminNewPassword').value;const confirmPassword=$('adminConfirmPassword').value;
    if(password.length<8){adminMsg('Use a password with at least 8 characters.',true);return;}
    if(password!==confirmPassword){adminMsg('The two passwords do not match.',true);return;}
    const button=e.submitter;if(button){button.disabled=true;button.textContent='Saving…';}
    const {error}=await supabaseClient.auth.updateUser({password});
    if(button){button.disabled=false;button.textContent='Save new password';}
    if(error){adminMsg('Password update failed: '+error.message,true);return;}
    recoveryForm.classList.add('hidden');$('adminLoginForm')?.classList.remove('hidden');$('adminNewPassword').value='';$('adminConfirmPassword').value='';history.replaceState({},document.title,window.location.pathname);adminMsg('Password updated. Sign in using your new password.');
  });
  $('adminLoginForm')?.addEventListener('submit',async e=>{e.preventDefault();const {data,error}=await supabaseClient.auth.signInWithPassword({email:$('adminEmail').value.trim(),password:$('adminPassword').value});if(error){adminMsg('Sign-in failed: '+error.message,true);return;}if(!isEdutubeAdmin(data.user)){await supabaseClient.auth.signOut();adminMsg('Login succeeded, but this account does not have the admin role.',true);return;}$('adminPassword').value='';updateAdminView(data.user);adminMsg('Welcome to the secure admin workspace.');});
  $('adminSignOut')?.addEventListener('click',async()=>{await supabaseClient.auth.signOut();updateAdminView(null);adminMsg('You have signed out.');});
  $('lessonForm')?.addEventListener('submit',addAdminLesson);$('refreshAdmin')?.addEventListener('click',loadAdminLessons);$('refreshSuperOverview')?.addEventListener('click',loadSuperAdminOverview);$('superStudentSearch')?.addEventListener('input',filterSuperStudents);
}
document.addEventListener('DOMContentLoaded',()=>{initEdutubeAdmin();refreshPublicLessons();});

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
  function setAuthMode(mode){authMode=mode;document.querySelectorAll('[data-auth-mode]').forEach(b=>b.classList.toggle('active',b.dataset.authMode===mode));el('studentName').closest('label').classList.toggle('hidden',mode!=='signup');el('studentAuthSubmit').textContent=mode==='signup'?'Create account':'Sign in';el('authHint').textContent=mode==='signup'?'A confirmation email may be sent before you can sign in.':'Use your student account. Email confirmation may be required.';}
  function updateStudentView(session){
    studentSession=session;const user=session?.user||null;const adminUser=!!(user&&typeof isEdutubeAdmin==="function"&&isEdutubeAdmin(user));el('accountSignedOut')?.classList.toggle('hidden',!!user);el('accountSignedIn')?.classList.toggle('hidden',!user);
    const displayName=adminUser?(user.app_metadata?.role==="super_admin"?"Super Admin":"Admin"):(user?.user_metadata?.full_name||user?.email?.split('@')[0]||'Account');
    el('accountLabel').textContent=user?displayName:'Sign in';el('accountShortcut')?.setAttribute('aria-label',user?(adminUser?'Administrator account':'Student account'):'Sign in');
    if(user){const name=displayName;el('studentDisplayName').textContent=name;el('studentDisplayEmail').textContent=(adminUser?'Administrator account · ':'')+(user.email||'');el('studentAvatar').textContent=adminUser?'A':name.charAt(0).toUpperCase();el('accountSignedIn')?.classList.toggle('admin-account-view',adminUser);el('accountCompleted').textContent=completed.length;el('accountAttempts').textContent=attempts.length;syncLocalActivity();loadRemoteNotifications();}
  }
  async function syncCompletedLessons(){
    if(!studentSession||!supabaseClient)return;
    const uid=studentSession.user.id;
    const progressRows=completed.map(videoId=>{const video=videos.find(v=>v.id===videoId);return {user_id:uid,lesson_key:String(video?.dbId||videoId),completed:true,progress_seconds:0,progress_percent:100,updated_at:new Date().toISOString()}});
    if(progressRows.length){const {error}=await supabaseClient.from('learning_progress').upsert(progressRows,{onConflict:'user_id,lesson_key'});if(error)console.warn('Progress sync:',error.message)}
  }
  async function syncExamAttempt(attempt){
    if(!studentSession||!supabaseClient||!attempt)return;
    const {error}=await supabaseClient.from('exam_attempts').insert({user_id:studentSession.user.id,exam_title:attempt.title,score:Number(attempt.score)||0,total:Number(attempt.total)||0,percent:Number(attempt.percent)||0});
    if(error)console.warn('Exam sync:',error.message);
  }
  async function loadStudentProfile(){
    if(!studentSession)return;
    const name=studentSession.user.user_metadata?.full_name||studentSession.user.email?.split('@')[0]||'Student';
    const {error}=await supabaseClient.from('profiles').upsert({id:studentSession.user.id,display_name:name,updated_at:new Date().toISOString()},{onConflict:'id'});
    if(error)console.warn('Profile sync (run setup SQL):',error.message);
  }
  async function initStudentAuth(){
    if(!supabaseClient||!supabaseClient.auth)return;
    try{const {data,error}=await supabaseClient.auth.getSession();if(error)throw error;updateStudentView(data.session);if(data.session){loadStudentProfile();syncCompletedLessons();}
      supabaseClient.auth.onAuthStateChange((_event,session)=>{updateStudentView(session);if(session){loadStudentProfile();syncCompletedLessons()}});
    }catch(error){console.error(error);notify('Account service unavailable. Check internet and Supabase settings.');}
  }
  async function submitStudentAuth(event){
    event.preventDefault();if(!supabaseClient||!supabaseClient.auth){notify('Account service is unavailable. Check your internet connection and Supabase CDN.');return;}
    const email=el('studentEmail').value.trim(),password=el('studentPassword').value,name=el('studentName').value.trim();
    const button=el('studentAuthSubmit');button.disabled=true;
    try{
      if(authMode==='signup'){
        const {data,error}=await supabaseClient.auth.signUp({email,password,options:{data:{full_name:name||'Student'}}});if(error)throw error;
        if(data.session){notify('Account created successfully.');showPage('dashboard')}else notify('Account created. Check your email to confirm, then sign in.');
      }else{
        const {data,error}=await supabaseClient.auth.signInWithPassword({email,password});if(error)throw error;notify('Signed in successfully.');showPage('dashboard');
      }
      el('studentPassword').value='';
    }catch(error){notify(error.message||'Account request failed.');}finally{button.disabled=false;}
  }
  async function signOutStudent(){if(!supabaseClient||!supabaseClient.auth)return;const {error}=await supabaseClient.auth.signOut();if(error)notify(error.message);else{updateStudentView(null);notify('Signed out.')}}
  async function renderLeaderboard(){
    const list=el('leaderboardList');if(!list)return;list.replaceChildren();
    if(!supabaseClient){el('leaderboardStatus').textContent='Supabase is unavailable. Check your internet connection.';list.textContent='Leaderboard service is offline.';return;}
    if(!studentSession){el('leaderboardStatus').textContent='Sign in to join the leaderboard. Rankings are shared only after the database setup is complete.';list.textContent='Sign in to view the student leaderboard.';return;}
    el('leaderboardStatus').textContent='Showing shared learning activity from the EduTube database.';
    const {data,error}=await supabaseClient.rpc('get_student_leaderboard');
    if(error){el('leaderboardStatus').textContent='Leaderboard database view is not ready. Run supabase_setup.sql, then refresh.';list.textContent=error.message;return;}
    if(!data?.length){list.textContent='No ranked students yet. Complete lessons and exams to get started.';return;}
    data.forEach((student,index)=>{const row=document.createElement('div');row.className='activity-item rank-row';const rank=document.createElement('span');rank.className='rank-number';rank.textContent=String(index+1);const name=document.createElement('strong');name.textContent=student.display_name||'Student';const meta=document.createElement('span');meta.className='rank-meta';meta.textContent=`${student.points||0} pts · ${student.completed_lessons||0} lessons · ${Math.round(student.average_score||0)}% avg`;row.append(rank,name,meta);list.append(row)});
  }
  function renderCertificates(){
    const root=el('certificateList');if(!root)return;root.replaceChildren();
    const milestones=[{id:'starter',title:'Learning Starter',need:1,desc:'Completed your first lesson.'},{id:'focused',title:'Focused Learner',need:5,desc:'Completed five lessons.'},{id:'scholar',title:'Dedicated Scholar',need:10,desc:'Completed ten lessons.'}];
    milestones.forEach(m=>{const card=document.createElement('article');card.className='certificate-card';const status=completed.length>=m.need;const title=document.createElement('h3');title.textContent=m.title;const desc=document.createElement('p');desc.textContent=m.desc;const progress=document.createElement('p');progress.textContent=status?'Milestone achieved':`${completed.length} / ${m.need} lessons completed`;const btn=document.createElement('button');btn.className='small-button';btn.textContent=status?'Print certificate':'Not yet available';btn.disabled=!status;btn.addEventListener('click',()=>printCertificate(m.title));card.append(title,desc,progress,btn);root.append(card)});
    if(!completed.length){const note=document.createElement('p');note.className='admin-hint';note.textContent='Complete lessons to unlock your certificates.';root.append(note)}
  }
  function printCertificate(title){
    document.querySelector('.print-certificate')?.remove();const name=studentSession?.user?.user_metadata?.full_name||studentSession?.user?.email?.split('@')[0]||'Learner';
    const paper=document.createElement('section');paper.className='print-certificate';paper.innerHTML='<div style="font-size:18px;letter-spacing:4px">EDUTUBE ETHIOPIA</div><h1>Certificate of Achievement</h1><p>This certificate is presented to</p><h2></h2><p>in recognition of achieving the learning milestone</p><h2 class="cert-title"></h2><p>Issued on '+new Date().toLocaleDateString()+'</p><p>Keep learning. Build your future.</p>';paper.querySelector('h2').textContent=name;paper.querySelector('.cert-title').textContent=title;document.body.append(paper);window.print();paper.remove();
  }
  function addAiMessage(text,role){const node=document.createElement('div');node.className='ai-message '+role;node.textContent=text;el('aiMessages').append(node);el('aiMessages').scrollTop=el('aiMessages').scrollHeight;}
  function localStudyReply(prompt){
    const p=prompt.toLowerCase();
    if(/newton|force|f\s*=\s*ma/.test(p))return 'Newton’s Second Law: the net force on an object equals its mass multiplied by its acceleration (F = ma).\nExample: a 2 kg object accelerating at 3 m/s² has a net force of 6 N.\nStudy steps: define force, identify mass and acceleration, choose SI units, then calculate.';
    if(/algebra|equation|solve|variable/.test(p))return 'Algebra uses symbols such as x to represent unknown values.\nExample: 2x + 4 = 12 → subtract 4 from both sides → 2x = 8 → divide by 2 → x = 4.\nTry checking by substituting 4 back into the original equation.';
    if(/study plan|schedule|plan/.test(p))return 'A practical 45-minute study cycle:\n1. 5 min: review the learning goal.\n2. 20 min: study one small concept.\n3. 10 min: close your notes and recall the idea.\n4. 10 min: solve two practice questions and correct mistakes.\nTake a short break before the next cycle.';
    if(/python|programming|javascript|html|css/.test(p))return 'For programming, learn in this order: variables and data types → conditions → loops → functions → arrays/objects → small projects. Write and run a tiny example for each concept, then explain what every line does.';
    return 'I can help you organize this topic, but this offline starter does not generate open-ended AI answers yet. Try asking for a definition, a worked example, or a short study plan. For accurate subject-specific explanations, include your grade and the exact topic.';
  }
  function submitAi(event){event.preventDefault();const prompt=el('aiPrompt').value.trim();if(!prompt)return;addAiMessage(prompt,'user');el('aiPrompt').value='';setTimeout(()=>addAiMessage(localStudyReply(prompt),'assistant'),180);}
  function patchActivityHooks(){
    const originalComplete=markComplete;
    markComplete=function(){const before=completed.length;const title=currentVideo?.title||'a lesson';originalComplete();if(completed.length>before){addNotification('Lesson completed','You completed '+title+'.');syncCompletedLessons()}renderCertificates()};
    const originalFinish=finishExam;
    finishExam=function(timeUp=false){const before=attempts.length;originalFinish(timeUp);if(attempts.length>before){const latest=attempts[0];addNotification('Exam result saved',`${latest.title}: ${latest.percent}%`);syncExamAttempt(latest)}renderCertificates()};
    const originalSaveProgress=saveProgress;
    saveProgress=function(){originalSaveProgress();if(studentSession&&currentVideo&&yt?.getCurrentTime&&yt?.getDuration){const seconds=Math.floor(yt.getCurrentTime()||0),duration=yt.getDuration()||0;if(duration>0){supabaseClient.from('learning_progress').upsert({user_id:studentSession.user.id,lesson_key:String(currentVideo.dbId||currentVideo.id),completed:completed.includes(currentVideo.id),progress_seconds:seconds,progress_percent:Math.min(100,Math.round(seconds/duration*100)),updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_key'}).then(({error})=>{if(error)console.warn('Watch progress sync:',error.message)})}}};
    const originalRenderDashboard=renderDashboard;
    renderDashboard=function(){originalRenderDashboard();if(el('accountSignedIn')&&!el('accountSignedIn').classList.contains('hidden')){el('accountCompleted').textContent=completed.length;el('accountAttempts').textContent=attempts.length}};
  }
  document.addEventListener('DOMContentLoaded',()=>{
    setAuthMode('login');document.querySelectorAll('[data-auth-mode]').forEach(b=>b.addEventListener('click',()=>setAuthMode(b.dataset.authMode)));
    el('studentAuthForm')?.addEventListener('submit',submitStudentAuth);el('studentSignOut')?.addEventListener('click',signOutStudent);
    el('clearNotifications')?.addEventListener('click',()=>{saveNotes([]);renderNotifications()});el('aiForm')?.addEventListener('submit',submitAi);
    el('notificationShortcut')?.addEventListener('click',renderNotifications);
    document.querySelectorAll('[data-page="leaderboard"]').forEach(b=>b.addEventListener('click',renderLeaderboard));
    document.querySelectorAll('[data-page="certificates"]').forEach(b=>b.addEventListener('click',renderCertificates));
    el('adminSignOut')?.addEventListener('click',()=>{});
    patchActivityHooks();renderNotifications();renderCertificates();initStudentAuth();
  });
})();




/* EduTube Ethiopia — Secure PDF Notes module
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
    } else {root.append(h("h2","notes-step-title","Available PDF notes"));const g=h("div","notes-grid wide");filtered().filter(n=>n.unit===state.unit).forEach(n=>g.append(makeCard("▤  "+n.title,"PDF learning material",()=>{state.note=n;render();})));root.append(g);}
    if(state.type){const back=h("button","small-button notes-back","← Back");back.type="button";back.onclick=()=>{if(state.note)state.note=null;else if(state.unit)state.unit=null;else if(state.subject)state.subject=null;else if(state.grade)state.grade=null;else state.type=null;render();};root.append(back);}
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
      if(note.allow_download){const a=h("a","small-button","Download PDF");a.href=data.signedUrl;a.download=(note.title||"EduTube-Note")+".pdf";a.rel="noopener noreferrer";actions.append(a);}
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
  function setupContact(){const f=$("contactForm");if(!f)return;f.addEventListener("submit",e=>{e.preventDefault();const name=$("contactName").value.trim(),email=$("contactEmail").value.trim(),subject=$("contactSubject").value.trim(),body=$("contactMessage").value.trim();const mailto="mailto:support.edutubeethiopia@gmail.com?subject="+encodeURIComponent("EduTube: "+subject)+"&body="+encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${body}`);const status=$("contactStatus");status.textContent="Opening your email application…";window.location.href=mailto;});}
  document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll('[data-page="notes"]').forEach(b=>b.addEventListener("click",()=>{Object.assign(state,{type:null,grade:null,subject:null,unit:null,note:null});render();}));
    $("noteForm")?.addEventListener("submit",savePdf);$("refreshAdminNotes")?.addEventListener("click",loadAdminNotes);setupContact();render();loadPublicNotes();loadAdminNotes();
    const c=client();if(c?.auth)c.auth.onAuthStateChange(()=>{loadAdminNotes();});
  });
})();
