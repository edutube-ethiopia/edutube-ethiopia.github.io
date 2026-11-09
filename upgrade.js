/* EduTube Ethiopia — Study Studio feature pack (local-first) */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const KEY = 'edutube_study_studio_v1';
  const today = () => new Date().toLocaleDateString('en-CA');
  const defaults = {goal:60, minutes:{}, streakDate:null, streak:0, sessions:0, tasks:[], notes:'', cards:[
    {q:'What is the formula for speed?',a:'Speed = distance ÷ time.'},
    {q:'What is Newton’s second law?',a:'The resultant force equals mass × acceleration (F = ma).'},
    {q:'What is photosynthesis?',a:'The process by which green plants use light energy to make glucose from carbon dioxide and water.'},
    {q:'What is the SI unit of force?',a:'Newton (N).'}
  ]};
  let state;
  try { state = {...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}')}; } catch { state = {...defaults}; }
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const minsToday = () => Number(state.minutes[today()] || 0);
  const updateStats = () => {
    const done = state.tasks.filter(t=>t.done).length;
    $('studioStreak').textContent = `${state.streak} day${state.streak===1?'':'s'}`;
    $('studioGoalValue').textContent = `${minsToday()} / ${state.goal} min`;
    $('studioSessions').textContent = state.sessions;
    $('studioTasksDone').textContent = done;
    $('goalInput').value = state.goal;
    $('goalBar').style.width = `${Math.min(100, minsToday()/Math.max(1,state.goal)*100)}%`;
    $('goalMessage').textContent = minsToday() >= state.goal ? '🎉 Daily goal completed. Amazing work!' : `${Math.max(0,state.goal-minsToday())} minutes left to reach your goal.`;
  };
  const addMinutes = n => {
    state.minutes[today()] = minsToday()+n;
    if (state.streakDate !== today()) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      state.streak = state.streakDate === yesterday.toLocaleDateString('en-CA') ? state.streak+1 : 1;
      state.streakDate = today();
    }
    save(); updateStats();
  };
  // Pomodoro timer
  let pomoSeconds=1500, pomoLength=25, pomoInterval=null;
  const displayPomo=()=> $('pomoDisplay').textContent = `${String(Math.floor(pomoSeconds/60)).padStart(2,'0')}:${String(pomoSeconds%60).padStart(2,'0')}`;
  const stopPomo=()=>{if(pomoInterval)clearInterval(pomoInterval);pomoInterval=null;$('pomoStart').textContent='Resume';};
  $('pomoStart').addEventListener('click',()=>{
    if(pomoInterval){stopPomo();return;}
    $('pomoStart').textContent='Pause';
    pomoInterval=setInterval(()=>{pomoSeconds--;displayPomo();if(pomoSeconds<=0){stopPomo();if(pomoLength===25){state.sessions++;addMinutes(25);$('pomoStatus').textContent='🎉 Focus session complete! Take a short break.';}else $('pomoStatus').textContent='Break complete. Ready for another round?';save();updateStats();$('pomoStart').textContent='Start';if(typeof window.edutubeTimerComplete==='function')window.edutubeTimerComplete('Pomodoro timer');}},1000);
  });
  $('pomoReset').addEventListener('click',()=>{stopPomo();pomoSeconds=pomoLength*60;displayPomo();$('pomoStart').textContent='Start';});
  document.querySelectorAll('[data-pomo]').forEach(b=>b.addEventListener('click',()=>{stopPomo();pomoLength=Number(b.dataset.pomo);pomoSeconds=pomoLength*60;displayPomo();$('pomoStart').textContent='Start';$('pomoStatus').textContent=pomoLength===25?'A completed focus session adds 25 minutes to your daily goal.':'Break timer selected.';}));
  $('saveGoal').addEventListener('click',()=>{state.goal=Math.max(10,Math.min(600,Number($('goalInput').value)||60));save();updateStats();toast('Daily goal saved!');});
  // Task list
  const renderTasks=()=>{$('taskList').replaceChildren();state.tasks.forEach((task,i)=>{const row=document.createElement('div');row.className='studio-task'+(task.done?' done':'');const cb=document.createElement('input');cb.type='checkbox';cb.checked=task.done;cb.setAttribute('aria-label','Complete task');cb.addEventListener('change',()=>{state.tasks[i].done=cb.checked;save();renderTasks();updateStats();});const label=document.createElement('span');label.textContent=task.text;const del=document.createElement('button');del.textContent='✕';del.setAttribute('aria-label','Delete task');del.addEventListener('click',()=>{state.tasks.splice(i,1);save();renderTasks();updateStats();});row.append(cb,label,del);$('taskList').append(row);});if(!state.tasks.length){const p=document.createElement('p');p.className='studio-hint';p.textContent='Your study tasks will appear here.';$('taskList').append(p);}};
  $('taskForm').addEventListener('submit',e=>{e.preventDefault();const text=$('taskInput').value.trim();if(!text)return;state.tasks.push({text,done:false});$('taskInput').value='';save();renderTasks();updateStats();});
  // Flashcards
  let cardIndex=0,flipped=false;
  const renderCard=()=>{const c=state.cards[cardIndex];$('flashcardText').textContent=c?(flipped?c.a:c.q):'Add your first flashcard below.';$('flashcardSide').textContent=flipped?'ANSWER · TAP TO FLIP':'QUESTION · TAP TO FLIP';};
  const flip=()=>{if(!state.cards.length)return;flipped=!flipped;renderCard();};
  $('flashcard').addEventListener('click',flip);$('flashcard').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}});$('flashFlip').addEventListener('click',flip);
  $('flashPrev').addEventListener('click',()=>{cardIndex=(cardIndex-1+state.cards.length)%state.cards.length;flipped=false;renderCard();});$('flashNext').addEventListener('click',()=>{cardIndex=(cardIndex+1)%state.cards.length;flipped=false;renderCard();});
  $('flashForm').addEventListener('submit',e=>{e.preventDefault();const q=$('flashQ').value.trim(),a=$('flashA').value.trim();if(!q||!a)return;state.cards.push({q,a});cardIndex=state.cards.length-1;flipped=false;$('flashQ').value='';$('flashA').value='';save();renderCard();toast('Flashcard added!');});
  // Notes autosave and download
  $('studioNotes').value=state.notes;$('studioNotes').addEventListener('input',()=>{state.notes=$('studioNotes').value;save();$('notesSaved').textContent='✓ Saved on this device';});
  $('downloadNotes').addEventListener('click',()=>download('edutube-study-notes.txt',state.notes||'No notes yet.','text/plain'));
  $('clearNotes').addEventListener('click',()=>{if(confirm('Clear all your study notes?')){$('studioNotes').value='';state.notes='';save();$('notesSaved').textContent='Notes cleared';}});
  // Focus mode
  const focus=()=>{document.body.classList.toggle('focus-mode');$('focusToggle').textContent=document.body.classList.contains('focus-mode')?'Exit focus mode':'Enter focus mode';};
  $('focusToggle').addEventListener('click',focus);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('focus-mode'))focus();});
  // Search bridge
  $('quickSearchGo').addEventListener('click',()=>{const q=$('quickLessonSearch').value.trim();const search=$('videoSearch');if(search)search.value=q;document.querySelector('[data-page="library"]')?.click();search?.dispatchEvent(new Event('input',{bubbles:true}));});
  $('quickLessonSearch').addEventListener('keydown',e=>{if(e.key==='Enter')$('quickSearchGo').click();});
  // Backup / restore
  function download(name,data,type){const blob=new Blob([data],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
  $('exportBackup').addEventListener('click',()=>{const keys=['edutube_v4_videos','edutube_v4_favorites','edutube_v4_completed','edutube_v4_attempts','edutube_v4_theme','edutube_v4_language',KEY];const backup={product:'EduTube Ethiopia',version:1,exportedAt:new Date().toISOString(),data:{}};keys.forEach(k=>{backup.data[k]=localStorage.getItem(k);});download('edutube-backup.json',JSON.stringify(backup,null,2),'application/json');$('backupStatus').textContent='Backup exported successfully.';});
  $('importBackup').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());if(data.product!=='EduTube Ethiopia'||!data.data)throw Error('This is not an EduTube backup.');if(!confirm('Import this backup? Existing local data for included items will be replaced.'))return;Object.entries(data.data).forEach(([k,v])=>{if(k.startsWith('edutube_')&&typeof v==='string')localStorage.setItem(k,v);});state={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')};$('studioNotes').value=state.notes;renderTasks();renderCard();updateStats();$('backupStatus').textContent='Backup restored. Reload the page to refresh all learning sections.';}catch(err){$('backupStatus').textContent='Import failed: '+err.message;}finally{e.target.value='';}});
  // Motivation & challenge cards
  const quotes=['Progress beats perfection.','One focused hour can change your whole day.','You are capable of learning difficult things.','Start where you are. Use what you have. Do what you can.','Every expert was once a beginner.'];
  const challenges=['Teach one concept aloud as if you were the teacher.','Solve three questions without checking the answers.','Summarize one lesson in five sentences.','Review yesterday’s notes for ten minutes.','Create two flashcards from today’s lesson.','Explain a difficult formula using a real-life example.'];
  $('newMotivation').addEventListener('click',()=>{$('motivationText').textContent=quotes[Math.floor(Math.random()*quotes.length)];});$('newChallenge').addEventListener('click',()=>{$('challengeText').textContent=challenges[Math.floor(Math.random()*challenges.length)];});
  function toast(msg){const el=$('toast');if(el){el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200);}}
  // Initialise
  $('studioQuote').textContent=quotes[Math.floor(Math.random()*quotes.length)];displayPomo();renderTasks();renderCard();updateStats();
})();
