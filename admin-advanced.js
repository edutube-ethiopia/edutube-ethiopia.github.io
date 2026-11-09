/* EduTube Ethiopia Advanced Admin Command Center.
   Uses the existing authenticated Supabase client and database RLS. */
(() => {
'use strict';
const $=id=>document.getElementById(id), KEY='edutube_admin_audit_v1';
let lessons=[],notes=[],profiles=[],selected=new Set(),busy=false,sessionAt=Date.now();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const admin=u=>!!(u?.app_metadata&&['admin','super_admin'].includes(u.app_metadata.role));
const fmt=n=>Number(n||0).toLocaleString();
const when=v=>v?new Date(v).toLocaleString():'—';
function audit(action,detail=''){try{let a=JSON.parse(localStorage.getItem(KEY)||'[]');a.unshift({action,detail,at:new Date().toISOString()});localStorage.setItem(KEY,JSON.stringify(a.slice(0,100)));renderAudit();}catch{}}
function download(name,data,type){const b=new Blob([data],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function toast(s){let t=$('aaToast');if(!t){t=document.createElement('div');t.id='aaToast';t.className='toast';document.body.append(t);}t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400);}
function mount(){
 const w=$('adminWorkspace');if(!w||$('adminAdvancedPanel'))return;
 const p=document.createElement('section');p.id='adminAdvancedPanel';p.className='admin-advanced';
 p.innerHTML=`
 <header class="aa-head"><div><span class="eyebrow">EDUTUBE · ADMIN PRO</span><h2>⚡ Advanced Admin Command Center</h2><p>Monitor, audit, organize and manage your learning platform.</p></div><div class="aa-head-actions"><span class="aa-chip" id="aaHealthBadge">Connecting…</span><button class="small-button" id="aaRefresh">↻ Refresh all</button></div></header>
 <div class="aa-kpis">
 ${[['Lessons','aaLessons','Published + drafts'],['Published','aaPublished','Visible to students'],['Drafts','aaDrafts','Awaiting review'],['Notes','aaNotes','Learning resources'],['Students','aaStudents','Profiles available'],['Exam attempts','aaAttempts','Submitted records']].map(x=>`<article><small>${x[0]}</small><strong id="${x[1]}">—</strong><span>${x[2]}</span></article>`).join('')}
 </div>
 <div class="aa-grid">
 <article class="aa-card"><div class="aa-card-title"><div><span class="eyebrow">01 · HEALTH</span><h3>System health</h3></div></div><div id="aaHealth" class="aa-list">Waiting for admin sign-in…</div></article>
 <article class="aa-card"><div class="aa-card-title"><div><span class="eyebrow">02 · QUALITY</span><h3>Content audit</h3><button class="small-button" id="aaAuditBtn">Run audit</button></div></div><div id="aaAudit" class="aa-list">Refresh to inspect content.</div></article></div>
 <article class="aa-card aa-wide"><div class="aa-card-title"><div><span class="eyebrow">03 · CONTENT OPERATIONS</span><h3>Lesson control center</h3><p>Search, filter, select and bulk-publish. Supabase RLS still controls permissions.</p></div><div class="aa-actions"><button class="small-button" id="aaCsv">Export CSV</button><button class="small-button" id="aaJson">Export JSON</button><button class="small-button" id="aaPrint">Print report</button></div></div>
 <div class="aa-filters"><input id="aaSearch" type="search" placeholder="Search title, subject or description"><select id="aaStatus"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts only</option></select><select id="aaGrade"><option value="all">All grades</option><option>9</option><option>10</option><option>11</option><option>12</option></select><select id="aaSubject"><option value="all">All subjects</option></select></div>
 <div class="aa-bulk"><label><input type="checkbox" id="aaSelectAll"> Select visible</label><span id="aaSelected">0 selected</span><button class="small-button" id="aaPublish">Publish selected</button><button class="small-button" id="aaDraft">Move to drafts</button><button class="small-button" id="aaClear">Clear selection</button></div><div id="aaTable" class="aa-table-wrap"><p class="admin-hint">Sign in to load lessons.</p></div></article>
 <div class="aa-grid"><article class="aa-card"><span class="eyebrow">04 · ANALYTICS</span><h3>Lessons by grade</h3><div id="aaGrades" class="aa-bars"></div></article><article class="aa-card"><span class="eyebrow">05 · ANALYTICS</span><h3>Lessons by subject</h3><div id="aaSubjects" class="aa-bars"></div></article></div>
 <div class="aa-grid"><article class="aa-card"><div class="aa-card-title"><div><span class="eyebrow">06 · NOTES</span><h3>Notes inventory</h3></div><input id="aaNoteSearch" class="aa-inline" placeholder="Filter notes"></div><div id="aaNotes" class="aa-list"></div></article>
 <article class="aa-card"><div class="aa-card-title"><div><span class="eyebrow">07 · STUDENTS</span><h3>Read-only student directory</h3></div><input id="aaProfileSearch" class="aa-inline" placeholder="Find student"></div><div id="aaProfiles" class="aa-list"></div><p class="admin-hint">Account creation, deletion and role changes require a trusted server-side function.</p></article></div>
 <div class="aa-grid"><article class="aa-card"><span class="eyebrow">08 · WORKFLOW</span><h3>Quick actions</h3><div class="aa-quick"><button data-jump="lessonForm">＋ Add lesson</button><button data-jump="noteForm">▤ Add notes</button><button id="aaDraftQueue">Review draft queue</button><button id="aaValidate">Validate YouTube URL</button><button id="aaAuditExport">Download activity log</button><button id="aaHealthRefresh">Run health checks</button></div><p id="aaQuickMessage" class="admin-hint">Use the existing secure publishing forms.</p></article>
 <article class="aa-card"><div class="aa-card-title"><div><span class="eyebrow">09 · AUDIT TRAIL</span><h3>Recent admin activity</h3></div><span class="aa-chip">This browser</span></div><div id="aaActivity" class="aa-list"></div></article></div>
 <footer class="aa-foot"><span>Session duration: <b id="aaAge">00:00</b></span><span>Local activity log · Database actions protected by Supabase RLS</span></footer>`;
 w.prepend(p);
 p.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>$(b.dataset.jump)?.scrollIntoView({behavior:'smooth'}));
 $('aaRefresh').onclick=refresh;$('aaHealthRefresh').onclick=refresh;
 ['aaSearch','aaStatus','aaGrade','aaSubject'].forEach(id=>$(id).addEventListener(id==='aaSearch'?'input':'change',renderTable));
 $('aaSelectAll').onchange=e=>{visible().forEach(x=>e.target.checked?selected.add(String(x.id)):selected.delete(String(x.id)));renderTable();};
 $('aaPublish').onclick=()=>bulk(true);$('aaDraft').onclick=()=>bulk(false);$('aaClear').onclick=()=>{selected.clear();renderTable();};
 $('aaCsv').onclick=()=>download('edutube-lessons.csv',toCsv(lessons),'text/csv');
 $('aaJson').onclick=()=>download('edutube-admin-export.json',JSON.stringify({exportedAt:new Date().toISOString(),lessons,notes},null,2),'application/json');
 $('aaPrint').onclick=()=>window.print();$('aaAuditBtn').onclick=runAudit;
 $('aaNoteSearch').oninput=renderNotes;$('aaProfileSearch').oninput=renderProfiles;
 $('aaDraftQueue').onclick=()=>{$('aaStatus').value='draft';renderTable();$('aaTable').scrollIntoView({behavior:'smooth'});};
 $('aaValidate').onclick=()=>{const u=prompt('Paste a YouTube URL:');if(u!==null)$('aaQuickMessage').textContent=/(youtube\.com|youtu\.be)/i.test(u)?'✓ YouTube domain recognized.':'⚠ This does not look like a YouTube URL.';};
 $('aaAuditExport').onclick=()=>download('edutube-admin-activity.json',localStorage.getItem(KEY)||'[]','application/json');
 renderAudit();
}
function visible(){const q=$('aaSearch').value.toLowerCase().trim(),st=$('aaStatus').value,g=$('aaGrade').value,s=$('aaSubject').value;return lessons.filter(x=>(st==='all'||(st==='published'?x.is_published:!x.is_published))&&(g==='all'||String(x.grade)===g)&&(s==='all'||x.subject===s)&&(!q||[x.title,x.subject,x.description,x.youtube_url].some(v=>String(v||'').toLowerCase().includes(q))));}
function renderTable(){
 const root=$('aaTable'),rows=visible();$('aaSelected').textContent=selected.size+' selected';
 const subs=[...new Set(lessons.map(x=>x.subject).filter(Boolean))].sort(),old=$('aaSubject').value;
 $('aaSubject').innerHTML='<option value="all">All subjects</option>'+subs.map(x=>`<option>${esc(x)}</option>`).join('');if(subs.includes(old))$('aaSubject').value=old;
 root.innerHTML=rows.length?`<table class="aa-table"><thead><tr><th></th><th>Lesson</th><th>Grade / Subject</th><th>Status</th><th>Updated</th></tr></thead><tbody>${rows.map(x=>`<tr><td><input type="checkbox" data-id="${esc(x.id)}" ${selected.has(String(x.id))?'checked':''}></td><td><b>${esc(x.title)}</b><small>${esc(x.description||'No description')}</small></td><td>Grade ${esc(x.grade)}<small>${esc(x.subject)}</small></td><td><span class="aa-status ${x.is_published?'pub':'draft'}">${x.is_published?'Published':'Draft'}</span></td><td>${esc(when(x.updated_at||x.created_at))}</td></tr>`).join('')}</tbody></table>`:'<p class="admin-hint">No lessons match these filters.</p>';
 root.querySelectorAll('[data-id]').forEach(c=>c.onchange=()=>{c.checked?selected.add(c.dataset.id):selected.delete(c.dataset.id);$('aaSelected').textContent=selected.size+' selected';});
 $('aaSelectAll').checked=rows.length>0&&rows.every(x=>selected.has(String(x.id)));
}
async function bulk(publish){if(!selected.size)return toast('Select lessons first.');if(!confirm(`${publish?'Publish':'Move to draft'} ${selected.size} lessons?`))return;const ids=[...selected];const {error}=await supabaseClient.from('lessons').update({is_published:publish}).in('id',ids);if(error)return toast('Update failed: '+error.message);audit(publish?'Bulk publish':'Bulk unpublish',ids.length+' lessons');selected.clear();await refresh();toast('Selected lessons updated.');}
function bars(id,data){const root=$(id),max=Math.max(1,...Object.values(data));root.innerHTML=Object.entries(data).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="aa-bar"><span>${esc(k)}</span><div><i style="width:${v/max*100}%"></i></div><b>${v}</b></div>`).join('')||'<p class="admin-hint">No data yet.</p>';}
function renderNotes(){const q=$('aaNoteSearch').value.toLowerCase();const a=notes.filter(x=>[x.title,x.subject,x.unit,x.content].some(v=>String(v||'').toLowerCase().includes(q)));$('aaNotes').innerHTML=a.slice(0,35).map(x=>`<div class="aa-row"><b>${esc(x.title||'Untitled note')}</b><small>Grade ${esc(x.grade||'—')} · ${esc(x.subject||'—')} · ${x.is_published?'Published':'Draft'}</small></div>`).join('')||'<p class="admin-hint">No matching notes.</p>';}
function renderProfiles(){const q=$('aaProfileSearch').value.toLowerCase();const a=profiles.filter(x=>[x.display_name,x.id].some(v=>String(v||'').toLowerCase().includes(q)));$('aaProfiles').innerHTML=a.slice(0,35).map(x=>`<div class="aa-row"><b>${esc(x.display_name||'Student')}</b><small>${esc(x.id)}</small></div>`).join('')||'<p class="admin-hint">No matching profiles.</p>';}
function renderAudit(){const a=JSON.parse(localStorage.getItem(KEY)||'[]');if($('aaActivity'))$('aaActivity').innerHTML=a.slice(0,10).map(x=>`<div class="aa-row"><b>${esc(x.action)}</b><small>${esc(x.detail)} · ${esc(when(x.at))}</small></div>`).join('')||'<p class="admin-hint">Actions performed in this browser appear here.</p>';}
function runAudit(){const drafts=lessons.filter(x=>!x.is_published).length,missing=lessons.filter(x=>!x.thumbnail_url||!x.description).length,dupes=lessons.filter((x,i,a)=>a.findIndex(y=>String(y.title||'').trim().toLowerCase()===String(x.title||'').trim().toLowerCase())!==i).length,bad=lessons.filter(x=>!/(youtube\.com|youtu\.be)/i.test(x.youtube_url||'')).length;const items=[['Draft lessons',drafts],['Missing thumbnail/description',missing],['Possible duplicate titles',dupes],['Unrecognized video URLs',bad]];$('aaAudit').innerHTML=items.map(([k,v])=>`<div class="aa-row"><span>${k}</span><b class="${v?'aa-warn':'aa-good'}">${v}</b></div>`).join('');audit('Content audit',items.map(x=>x[1]).join(' / ')+' findings');}
function toCsv(rows){if(!rows.length)return '';const keys=[...new Set(rows.flatMap(x=>Object.keys(x)))];return [keys.join(','),...rows.map(x=>keys.map(k=>'"'+String(x[k]??'').replace(/"/g,'""')+'"').join(','))].join('\r\n');}
async function refresh(){
 if(busy)return;busy=true;$('aaHealthBadge').textContent='Refreshing…';
 try{
 const c=supabaseClient;
 const [l,n,p,a]=await Promise.all([c.from('lessons').select('*').order('created_at',{ascending:false}).limit(1000),c.from('notes').select('*').order('created_at',{ascending:false}).limit(1000),c.from('profiles').select('id,display_name,updated_at').order('updated_at',{ascending:false}).limit(200),c.from('exam_attempts').select('id',{count:'exact',head:true})]);
 lessons=l.error?[]:(l.data||[]);notes=n.error?[]:(n.data||[]);profiles=p.error?[]:(p.data||[]);
 $('aaLessons').textContent=l.error?'—':lessons.length;$('aaPublished').textContent=l.error?'—':lessons.filter(x=>x.is_published).length;$('aaDrafts').textContent=l.error?'—':lessons.filter(x=>!x.is_published).length;$('aaNotes').textContent=n.error?'—':notes.length;$('aaStudents').textContent=p.error?'—':profiles.length;$('aaAttempts').textContent=a.error?'—':a.count||0;
 const checks=[['Lessons',l.error],['Notes',n.error],['Profiles',p.error],['Exam attempts',a.error]];$('aaHealth').innerHTML=checks.map(([k,e])=>`<div class="aa-row"><span>${k}</span><b class="${e?'aa-warn':'aa-good'}">${e?'CHECK ACCESS':'CONNECTED'}</b></div>`).join('');
 const bad=[l,n,p,a].some(x=>x.error);$('aaHealthBadge').textContent=bad?'Some checks need attention':'All checks passed';$('aaHealthBadge').classList.toggle('aa-warn',bad);
 renderTable();renderNotes();renderProfiles();const g={},s={};lessons.forEach(x=>{g['Grade '+(x.grade||'?')]=(g['Grade '+(x.grade||'?')]||0)+1;s[x.subject||'Other']=(s[x.subject||'Other']||0)+1;});bars('aaGrades',g);bars('aaSubjects',s);runAudit();audit('Dashboard refresh',lessons.length+' lessons, '+notes.length+' notes');
 }catch(e){$('aaHealthBadge').textContent='Offline';$('aaHealth').textContent=e.message;}finally{busy=false;}
}
function boot(){mount();if(!supabaseClient?.auth)return;const check=async()=>{const {data:{session}}=await supabaseClient.auth.getSession();const ok=admin(session?.user);$('adminAdvancedPanel')?.classList.toggle('hidden',!ok);if(ok){sessionAt=Date.now();refresh();}};check();supabaseClient.auth.onAuthStateChange((_e,s)=>{const ok=admin(s?.user);$('adminAdvancedPanel')?.classList.toggle('hidden',!ok);if(ok){sessionAt=Date.now();refresh();}});setInterval(()=>{const el=$('aaAge');if(el){const n=Math.floor((Date.now()-sessionAt)/1000);el.textContent=String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}},1000);document.addEventListener('keydown',e=>{if(e.altKey&&e.key.toLowerCase()==='r'&&!$('adminAdvancedPanel')?.classList.contains('hidden')){e.preventDefault();refresh();}});}
document.addEventListener('DOMContentLoaded',boot);
})();