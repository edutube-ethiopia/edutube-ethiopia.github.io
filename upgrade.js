/* EduTube Ethiopia — Security, Admin UX and reader upgrades */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const sb = () => (typeof supabaseClient !== "undefined" ? supabaseClient : null);
  const isAdminUser = u => !!(u && ["admin","super_admin"].includes(String(u.app_metadata?.role||"").toLowerCase()));
  const STUDENT_LIMIT = 24 * 60 * 60 * 1000;
  const ADMIN_IDLE = 60 * 1000;
  let adminTimer = 0, studentTimer = 0, signingOut = false;

  async function forceSignOut(reason) {
    if (signingOut || !sb()?.auth) return;
    signingOut = true;
    try { await sb().auth.signOut(); } catch(e) { console.warn("Automatic sign out:",e); }
    localStorage.removeItem("edutube_student_signed_at");
    localStorage.removeItem("edutube_admin_last_activity");
    if (typeof window.notify === "function") window.notify(reason);
    else alert(reason);
    signingOut = false;
  }
  function stopTimers(){clearTimeout(adminTimer);clearTimeout(studentTimer);}
  function startStudentTimer(){
    clearTimeout(studentTimer);
    const key="edutube_student_signed_at";
    let at=Number(localStorage.getItem(key));
    if(!at || !Number.isFinite(at) || at>Date.now()+60000){at=Date.now();localStorage.setItem(key,String(at));}
    const left=STUDENT_LIMIT-(Date.now()-at);
    if(left<=0){forceSignOut("Your 24-hour student session has expired. Please sign in again.");return;}
    studentTimer=setTimeout(()=>forceSignOut("Your 24-hour student session has expired. Please sign in again."),left);
  }
  function resetAdminIdle(){
    clearTimeout(adminTimer);
    if(!window.__edutubeSessionUser || !isAdminUser(window.__edutubeSessionUser)) return;
    localStorage.setItem("edutube_admin_last_activity",String(Date.now()));
    adminTimer=setTimeout(()=>forceSignOut("Admin signed out after 1 minute of inactivity."),ADMIN_IDLE);
  }
  function applySession(session){
    stopTimers();
    const user=session?.user||null;
    window.__edutubeSessionUser=user;
    if(!user){localStorage.removeItem("edutube_student_signed_at");localStorage.removeItem("edutube_admin_last_activity");return;}
    if(isAdminUser(user)){
      const last=Number(localStorage.getItem("edutube_admin_last_activity"))||Date.now();
      if(Date.now()-last>=ADMIN_IDLE){setTimeout(()=>forceSignOut("Admin session expired after 1 minute of inactivity."),0);return;}
      resetAdminIdle();
    } else startStudentTimer();
  }
  function initSecurity(){
    if(!sb()?.auth)return;
    sb().auth.getSession().then(({data})=>applySession(data?.session)).catch(console.warn);
    sb().auth.onAuthStateChange((_event,session)=>applySession(session));
    ["pointerdown","keydown","touchstart","mousemove","scroll","click"].forEach(ev=>
      document.addEventListener(ev,()=>{if(window.__edutubeSessionUser&&isAdminUser(window.__edutubeSessionUser))resetAdminIdle();},{passive:true,capture:true})
    );
    document.addEventListener("visibilitychange",()=>{
      if(document.visibilityState==="visible" && window.__edutubeSessionUser && isAdminUser(window.__edutubeSessionUser)){
        const last=Number(localStorage.getItem("edutube_admin_last_activity"))||0;
        if(Date.now()-last>=ADMIN_IDLE) forceSignOut("Admin signed out after 1 minute of inactivity.");
        else resetAdminIdle();
      }
    });
  }

  function addAdminNotificationStudio(){
    const workspace=$("adminWorkspace"); if(!workspace || $("adminNotificationStudio"))return;
    const section=document.createElement("section");
    section.id="adminNotificationStudio";section.className="dashboard-panel eu-notify-studio";
    section.innerHTML=`
      <div class="admin-toolbar"><div><span class="eyebrow">COMMUNICATION CENTER</span><h2>🔔 Super Advanced Notification Studio</h2><p>Send a message to every registered student or selected student accounts.</p></div><span class="eu-live">● READY</span></div>
      <form id="euBroadcastForm" class="admin-form">
        <div class="form-row"><label>Notification type<select id="euNoticeType"><option>Announcement</option><option>New lesson</option><option>New PDF note</option><option>Important update</option><option>Maintenance</option></select></label>
        <label>Audience<select id="euNoticeAudience"><option value="all">All students</option><option value="recent">All registered profiles</option></select></label></div>
        <label>Notification title<input id="euNoticeTitle" maxlength="100" required placeholder="e.g. New Grade 12 Physics lesson"></label>
        <label>Message<textarea id="euNoticeBody" rows="4" maxlength="1000" required placeholder="Write your announcement..."></textarea></label>
        <div class="eu-notice-preview"><b>Live preview</b><strong id="euPreviewTitle">Your title will appear here</strong><span id="euPreviewBody">Your message preview...</span></div>
        <div class="eu-notice-actions"><span id="euNoticeStatus" role="status" aria-live="polite">Messages are delivered through the Supabase notifications table.</span><button class="primary-button" type="submit">🚀 Send notification</button></div>
      </form>`;
    workspace.append(section);
    const title=$("euNoticeTitle"),body=$("euNoticeBody");
    const preview=()=>{$("euPreviewTitle").textContent=title.value||"Your title will appear here";$("euPreviewBody").textContent=body.value||"Your message preview...";};
    title.addEventListener("input",preview);body.addEventListener("input",preview);
    $("euBroadcastForm").addEventListener("submit",async e=>{
      e.preventDefault();const client=sb(),status=$("euNoticeStatus");
      if(!client||!window.__edutubeSessionUser||!isAdminUser(window.__edutubeSessionUser)){status.textContent="Admin authentication required.";return;}
      const btn=e.submitter;btn.disabled=true;status.textContent="Preparing delivery…";
      try{
        const {data:profiles,error}=await client.from("profiles").select("id,updated_at");
        if(error)throw error;
        const recentOnly=$("euNoticeAudience").value==="recent";
        const cutoff=Date.now()-30*24*60*60*1000;
        const recipients=(profiles||[]).filter(p=>!recentOnly||(p.updated_at&&new Date(p.updated_at).getTime()>=cutoff)).map(p=>p.id).filter(Boolean);
        if(!recipients.length)throw new Error("No student profiles found.");
        const type=$("euNoticeType").value, titleText=$("euNoticeTitle").value.trim(), bodyText=$("euNoticeBody").value.trim();
        const rows=recipients.map(user_id=>({user_id,title:`${type}: ${titleText}`,body:bodyText}));
        let sent=0;
        for(let i=0;i<rows.length;i+=100){
          const {error:insertError}=await client.from("notifications").insert(rows.slice(i,i+100));
          if(insertError)throw insertError;sent+=Math.min(100,rows.length-i);
        }
        status.textContent=`✓ Sent ${sent} notification${sent===1?"":"s"} successfully.`;
        $("euBroadcastForm").reset();preview();
      }catch(err){status.textContent="Could not send: "+(err.message||"Check profiles/notifications RLS policies.");}
      finally{btn.disabled=false;}
    });
  }

  function makeAdminTables(){
    const specs=[
      {list:"adminLessonList",prefix:"euLessons",label:"Lessons"},
      {list:"adminNoteList",prefix:"euNotes",label:"PDF notes"}
    ];
    specs.forEach(s=>{
      const list=$(s.list);if(!list||$(""+s.prefix+"Tools"))return;
      const tools=document.createElement("div");tools.id=s.prefix+"Tools";tools.className="eu-table-tools";
      tools.innerHTML=`<input type="search" id="${s.prefix}Search" placeholder="Search ${s.label.toLowerCase()}..." aria-label="Search ${s.label}"><select id="${s.prefix}Status"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select><select id="${s.prefix}PageSize"><option>10</option><option>25</option><option>50</option><option>100</option></select><span id="${s.prefix}Count"></span>`;
      list.parentElement.insertBefore(tools,list);
      const pager=document.createElement("div");pager.id=s.prefix+"Pager";pager.className="eu-pager";
      pager.innerHTML=`<button type="button" class="small-button" data-dir="-1">← Previous</button><span>Page <b>1</b></span><button type="button" class="small-button" data-dir="1">Next →</button>`;
      list.after(pager);
      pager.addEventListener("click",e=>{const b=e.target.closest("button[data-dir]");if(!b)return;const current=Number(pager.dataset.page||1);pager.dataset.page=String(Math.max(1,current+Number(b.dataset.dir)));applyTableFilter(s);});
      ["input","change"].forEach(ev=>tools.addEventListener(ev,()=>{pager.dataset.page="1";applyTableFilter(s);}));
      const observer=new MutationObserver(()=>{convertToTable(s);applyTableFilter(s);});observer.observe(list,{childList:true,subtree:false});
      s.pager=pager;s.tools=tools;
    });
  }
  function convertToTable(s){
    const list=$(s.list);if(!list||list.dataset.euConverting)return;
    const source=[...list.children].filter(x=>x.classList.contains("admin-lesson-row"));
    if(!source.length)return;
    list.dataset.euConverting="1";
    const table=document.createElement("table");table.className="eu-admin-table";
    table.innerHTML="<thead><tr><th>Content title</th><th>Details</th><th>Status</th><th>Actions</th></tr></thead><tbody></tbody>";
    const body=table.querySelector("tbody");
    source.forEach(item=>{
      const info=item.firstElementChild,actions=item.lastElementChild;
      const title=info?.querySelector("strong")?.textContent||"Untitled";
      const meta=info?.querySelector("small")?.textContent||"";
      const tr=document.createElement("tr");tr.dataset.search=(title+" "+meta).toLowerCase();
      const tdTitle=document.createElement("td");const strong=document.createElement("strong");strong.textContent=title;tdTitle.append(strong);
      const tdMeta=document.createElement("td");tdMeta.textContent=meta;
      const tdStatus=document.createElement("td");const status=document.createElement("span");status.className="eu-status-pill";status.textContent=/published/i.test(meta)?"Published":"Draft";tdStatus.append(status);
      const tdActions=document.createElement("td");tdActions.className="eu-table-actions";if(actions)while(actions.firstChild)tdActions.append(actions.firstChild);
      tr.append(tdTitle,tdMeta,tdStatus,tdActions);body.append(tr);
    });
    list.replaceChildren(table);delete list.dataset.euConverting;
  }
  function applyTableFilter(s){
    const list=$(s.list),tools=s.tools,pager=s.pager;if(!list||!tools||!pager)return;
    const q=$(s.prefix+"Search").value.trim().toLowerCase(),status=$(s.prefix+"Status").value;
    const rows=[...list.querySelectorAll("tbody tr")];
    const filtered=rows.filter(row=>(!q||row.dataset.search.includes(q))&&(status==="all"||(status==="published"?/published/i.test(row.dataset.search):/\bdraft\b/i.test(row.dataset.search))));
    const size=Number($(s.prefix+"PageSize").value)||10,pages=Math.max(1,Math.ceil(filtered.length/size));
    const page=Math.min(Number(pager.dataset.page||1),pages);pager.dataset.page=String(page);
    rows.forEach(r=>r.hidden=true);filtered.slice((page-1)*size,page*size).forEach(r=>r.hidden=false);
    $(s.prefix+"Count").textContent=`${filtered.length} total`;
    pager.querySelector("span").innerHTML=`Page <b>${page}</b> of ${pages}`;
    pager.querySelector('[data-dir="-1"]').disabled=page<=1;pager.querySelector('[data-dir="1"]').disabled=page>=pages;
  }

  function roundLogo(){
    const style=document.createElement("style");
    style.textContent=`.brand-logo{border-radius:50%!important;object-fit:cover;aspect-ratio:1/1;overflow:hidden;border:1px solid rgba(255,255,255,.18);box-shadow:0 2px 12px rgba(0,0,0,.16)}.eu-notify-studio{margin-top:22px}.eu-live{font-size:11px;color:#35c995;font-weight:800}.eu-notice-preview{display:grid;gap:7px;padding:15px;border:1px solid var(--border-color,rgba(255,255,255,.15));border-radius:14px;background:rgba(100,130,255,.07)}.eu-notice-preview span,.eu-notice-actions span{color:var(--muted,#9aa0aa);font-size:12px}.eu-notice-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.eu-table-tools{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin:12px 0}.eu-table-tools input{flex:1;min-width:170px}.eu-table-tools select,.eu-table-tools input{padding:10px 12px;border:1px solid var(--border-color,rgba(255,255,255,.16));border-radius:10px;background:var(--card-bg,rgba(255,255,255,.04));color:var(--text)}.eu-table-tools span{font-size:12px;color:var(--muted)}.eu-pager{display:flex;align-items:center;justify-content:center;gap:14px;padding:12px}.eu-pager span{font-size:12px;color:var(--muted)}.admin-lesson-row[hidden]{display:none!important}@media(max-width:600px){.eu-notice-actions{align-items:stretch;flex-direction:column}.eu-notice-actions .primary-button{width:100%}}`;
    document.head.append(style);
  }

  document.addEventListener("DOMContentLoaded",()=>{
    roundLogo();initSecurity();
    const run=()=>{addAdminNotificationStudio();makeAdminTables();};
    run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
    // Refresh data-driven table filters after the original scripts finish rendering.
    setTimeout(run,500);
  });
})();
