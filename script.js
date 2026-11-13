const toast = document.getElementById('toast');
const pageWrap = document.querySelector('.page-wrap');
const overviewMarkup = pageWrap.innerHTML;
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('modalBackdrop');
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

const seed = {
  Students: [
    {name:'Aarav Kapoor', id:'NS2401', class:'Grade 8 · A', guardian:'Neha Kapoor', phone:'98765 12001', status:'Active'},
    {name:'Anaya Iyer', id:'NS2402', class:'Grade 6 · B', guardian:'Ravi Iyer', phone:'98765 12002', status:'Active'},
    {name:'Kabir Shah', id:'NS2403', class:'Grade 10 · A', guardian:'Meera Shah', phone:'98765 12003', status:'Active'},
    {name:'Diya Nair', id:'NS2404', class:'Grade 4 · C', guardian:'Arun Nair', phone:'98765 12004', status:'Active'},
    {name:'Vivaan Rao', id:'NS2405', class:'Grade 7 · A', guardian:'Sonia Rao', phone:'98765 12005', status:'Active'},
    {name:'Saanvi Menon', id:'NS2406', class:'Grade 9 · B', guardian:'Kiran Menon', phone:'98765 12006', status:'On leave'}
  ],
  Faculty: [
    {name:'Priya Desai', id:'FAC-018', department:'Science', role:'Department head', phone:'98765 44018', status:'On campus'},
    {name:'Rahul Sharma', id:'FAC-024', department:'Mathematics', role:'Senior teacher', phone:'98765 44024', status:'On campus'},
    {name:'Meera Krishnan', id:'FAC-031', department:'Languages', role:'Teacher', phone:'98765 44031', status:'On campus'},
    {name:'Dev Patel', id:'FAC-036', department:'Sports', role:'Coach', phone:'98765 44036', status:'On leave'},
    {name:'Anita Bose', id:'FAC-042', department:'Humanities', role:'Teacher', phone:'98765 44042', status:'On campus'}
  ],
  Attendance: [
    {name:'Aarav Kapoor', id:'NS2401', class:'Grade 8 · A', date:new Date().toISOString().slice(0,10), status:'Present'},
    {name:'Anaya Iyer', id:'NS2402', class:'Grade 6 · B', date:new Date().toISOString().slice(0,10), status:'Present'},
    {name:'Kabir Shah', id:'NS2403', class:'Grade 10 · A', date:new Date().toISOString().slice(0,10), status:'Absent'},
    {name:'Diya Nair', id:'NS2404', class:'Grade 4 · C', date:new Date().toISOString().slice(0,10), status:'Present'},
    {name:'Vivaan Rao', id:'NS2405', class:'Grade 7 · A', date:new Date().toISOString().slice(0,10), status:'Late'},
    {name:'Saanvi Menon', id:'NS2406', class:'Grade 9 · B', date:new Date().toISOString().slice(0,10), status:'Present'}
  ],
  Academics: [
    {name:'Term 1 examinations', id:'EX-2026-01', class:'Grades 1–5', subject:'All subjects', date:'2026-09-14', status:'Completed'},
    {name:'Term 1 examinations', id:'EX-2026-02', class:'Grades 6–8', subject:'All subjects', date:'2026-09-21', status:'Completed'},
    {name:'Mid-term assessment', id:'EX-2026-03', class:'Grades 9–12', subject:'All subjects', date:'2026-11-23', status:'Upcoming'},
    {name:'Science practicals', id:'EX-2026-04', class:'Grades 9–10', subject:'Science', date:'2026-11-27', status:'Upcoming'}
  ],
  Timetable: [
    {name:'Morning assembly', id:'08:30', class:'All school', subject:'Auditorium', date:'Monday–Friday', status:'Scheduled'},
    {name:'Mathematics', id:'09:00', class:'Grade 8 · A', subject:'Rahul Sharma · Room 204', date:'Monday, Wednesday, Friday', status:'Scheduled'},
    {name:'Science', id:'10:00', class:'Grade 8 · A', subject:'Priya Desai · Lab 2', date:'Tuesday, Thursday', status:'Scheduled'},
    {name:'English', id:'11:15', class:'Grade 6 · B', subject:'Meera Krishnan · Room 108', date:'Monday–Friday', status:'Scheduled'},
    {name:'Physical education', id:'14:00', class:'Grade 7 · A', subject:'Dev Patel · Sports ground', date:'Tuesday, Thursday', status:'Scheduled'}
  ],
  'Fees & finance': [
    {name:'Aarav Kapoor', id:'NS2401', class:'Grade 8 · A', amount:'₹24,500', due:'2026-11-20', status:'Due'},
    {name:'Anaya Iyer', id:'NS2402', class:'Grade 6 · B', amount:'₹18,000', due:'2026-11-15', status:'Overdue'},
    {name:'Kabir Shah', id:'NS2403', class:'Grade 10 · A', amount:'₹32,000', due:'2026-12-01', status:'Due'},
    {name:'Diya Nair', id:'NS2404', class:'Grade 4 · C', amount:'₹16,500', due:'2026-11-30', status:'Paid'},
    {name:'Vivaan Rao', id:'NS2405', class:'Grade 7 · A', amount:'₹21,000', due:'2026-11-18', status:'Overdue'}
  ],
  Transport: [
    {name:'Route 01 · North Park', id:'BUS-01', class:'32 students', subject:'S. Kumar · 98765 30201', date:'06:45 AM · 07:30 AM', status:'On route'},
    {name:'Route 02 · Lake View', id:'BUS-02', class:'28 students', subject:'R. Singh · 98765 30202', date:'06:50 AM · 07:35 AM', status:'On route'},
    {name:'Route 03 · Green Valley', id:'BUS-03', class:'26 students', subject:'A. Das · 98765 30203', date:'07:00 AM · 07:40 AM', status:'On route'},
    {name:'Route 04 · City Center', id:'BUS-04', class:'30 students', subject:'M. Ali · 98765 30204', date:'06:40 AM · 07:25 AM', status:'At school'}
  ],
  Announcements: [
    {name:'Mid-term assessments begin November 23', id:'Academic office', class:'Students & parents', subject:'Please check the updated examination timetable.', date:'2026-11-09', status:'Published'},
    {name:'School closed for regional holiday', id:'Administration', class:'All school', subject:'Campus will reopen on the next working day.', date:'2026-11-06', status:'Published'},
    {name:'Science club registration is open', id:'Priya Desai', class:'Grades 6–10', subject:'Register with your class teacher by November 18.', date:'2026-11-02', status:'Published'}
  ]
};
const schoolOptions={
  'northstar-west':{name:'Northstar Academy',campus:'West Campus'},
  'northstar-east':{name:'Northstar Academy',campus:'East Campus'},
  'greenfield-main':{name:'Greenfield Public School',campus:'Main Campus'}
};
let activeSchool='northstar-west';
function schoolStorageKey(type,school=activeSchool){return `school-erp:${school}:${type}`;}
function loadSchoolData(school){
  let saved=null;
  try{saved=JSON.parse(localStorage.getItem(schoolStorageKey('data',school))||'null');}catch{}
  if(!saved&&school==='northstar-west'){
    try{saved=JSON.parse(localStorage.getItem('northstar-erp-data')||'null');}catch{}
  }
  const result=saved||JSON.parse(JSON.stringify(seed));
  Object.keys(seed).forEach(key=>{if(!Array.isArray(result[key]))result[key]=JSON.parse(JSON.stringify(seed[key]));});
  return result;
}
let data=loadSchoolData(activeSchool);
function saveData(){localStorage.setItem(schoolStorageKey('data'),JSON.stringify(data));}
let reportHistory=[];
try { reportHistory=JSON.parse(localStorage.getItem(schoolStorageKey('reports'))) || []; } catch {}
const starterAssignments=[
  {id:'ASG-001',title:'Algebra practice set',subject:'Mathematics',teacher:'Rahul Sharma',class:'Grade 8 · A',due:'2026-11-16',description:'Complete the assigned algebra practice questions.',submitted:false,status:'Open',pending:0},
  {id:'ASG-002',title:'Lab report: plant cells',subject:'Science',teacher:'Priya Desai',class:'Grade 8 · A',due:'2026-11-18',description:'Upload your plant cell lab report.',submitted:false,status:'Open',pending:2},
  {id:'ASG-003',title:'Reading journal · Chapter 6',subject:'English',teacher:'Meera Krishnan',class:'Grade 8 · A',due:'2026-11-20',description:'Write a short journal response to chapter six.',submitted:false,status:'Open',pending:0},
  {id:'ASG-004',title:'Energy and ecosystems quiz',subject:'Science',teacher:'Priya Desai',class:'Grade 9 · B',due:'2026-11-20',description:'Complete the ecosystems quiz.',submitted:false,status:'Open',pending:0}
];
function loadAssignments(){
  try{const saved=JSON.parse(localStorage.getItem(schoolStorageKey('assignments'))||'null');if(Array.isArray(saved))return saved;}catch{}
  return JSON.parse(JSON.stringify(starterAssignments));
}
let assignments=loadAssignments();
function saveAssignments(){localStorage.setItem(schoolStorageKey('assignments'),JSON.stringify(assignments));}
function currentSchoolInfo(){return schoolOptions[activeSchool]||schoolOptions['northstar-west'];}
const columns = {
  Students:[['name','Student'],['id','Student ID'],['class','Class'],['guardian','Parent / guardian'],['phone','Contact'],['status','Status']],
  Faculty:[['name','Faculty member'],['id','Staff ID'],['department','Department'],['role','Role'],['phone','Contact'],['status','Status']],
  Attendance:[['name','Student'],['id','Student ID'],['class','Class'],['date','Date'],['status','Attendance']],
  Academics:[['name','Assessment'],['id','Reference'],['class','Classes'],['subject','Subjects'],['date','Date'],['status','Status']],
  Timetable:[['id','Time'],['name','Class / activity'],['class','Class'],['subject','Teacher / location'],['date','Days'],['status','Status']],
  'Fees & finance':[['name','Student'],['id','Student ID'],['class','Class'],['amount','Amount due'],['due','Due date'],['status','Payment status']],
  Transport:[['name','Route'],['id','Vehicle'],['class','Students'],['subject','Driver / contact'],['date','Pickup · drop'],['status','Status']],
  Announcements:[['name','Announcement'],['id','Posted by'],['class','Audience'],['subject','Details'],['date','Published'],['status','Status']]
};
const descriptions = {
  Students:'Manage student records, class placement, and family contacts.',
  Faculty:'Keep staff records, departments, and campus availability up to date.',
  Attendance:'Record daily attendance and review student presence by class.',
  Academics:'Plan assessments and keep the academic calendar in one place.',
  Timetable:'Coordinate class periods, rooms, and teacher schedules.',
  'Fees & finance':'Track fee dues and record payments against student accounts.',
  Transport:'Manage school routes, vehicles, and daily pickup information.',
  Announcements:'Share timely updates with students, families, and faculty.'
};
const fields = {
  Students:[['name','Student full name'],['id','Student ID'],['class','Class / section'],['guardian','Parent / guardian'],['phone','Contact number'],['status','Status','select','Active,On leave,Graduated']],
  Faculty:[['name','Faculty full name'],['id','Staff ID'],['department','Department'],['role','Role'],['phone','Contact number'],['status','Status','select','On campus,On leave']],
  Attendance:[['name','Student name'],['id','Student ID'],['class','Class / section'],['date','Date','date'],['status','Attendance','select','Present,Absent,Late,Excused']],
  Academics:[['name','Assessment name'],['id','Reference'],['class','Classes'],['subject','Subjects'],['date','Assessment date','date'],['status','Status','select','Upcoming,Completed,In progress']],
  Timetable:[['id','Start time','time'],['name','Class / activity'],['class','Class / section'],['subject','Teacher / location'],['date','Days'],['status','Status','select','Scheduled,Cancelled']],
  'Fees & finance':[['name','Student name'],['id','Student ID'],['class','Class / section'],['amount','Amount due'],['due','Due date','date'],['status','Payment status','select','Due,Overdue,Paid']],
  Transport:[['name','Route name'],['id','Vehicle ID'],['class','Students on route'],['subject','Driver / contact'],['date','Pickup · drop times'],['status','Status','select','On route,At school,Delayed']],
  Announcements:[['name','Announcement title'],['id','Posted by'],['class','Audience'],['subject','Message'],['date','Publish date','date'],['status','Status','select','Published,Draft']]
};
const meta = {
  Students:['1,248','Enrolled students','Active records'], Faculty:['86','Faculty members','Across 12 departments'],
  Attendance:['94.9%','Present today','Attendance rate'], Academics:['12','Assessments','This academic year'],
  Timetable:['38','Class sections','Weekly schedule'], 'Fees & finance':['₹18.4L','Collected this month','78% of monthly target'],
  Transport:['4','Active routes','116 students assigned'], Announcements:['3','Published updates','Visible to school community']
};
function badge(text) {
  const key = String(text).toLowerCase();
  let kind = 'neutral';
  if (/active|present|paid|published|scheduled|on campus|on route|at school|completed/.test(key)) kind='good';
  if (/absent|overdue|delayed|cancelled/.test(key)) kind='bad';
  if (/late|leave|upcoming|progress|draft|due/.test(key)) kind='warn';
  return `<span class="erp-badge ${kind}"><i></i>${escapeHtml(text)}</span>`;
}
function renderTable(page, rows=data[page]) {
  const config=columns[page];
  if (!rows.length) return `<div class="erp-empty"><span>⌕</span><b>No records found</b><small>Try changing your search or add a new record.</small></div>`;
  return `<div class="erp-table-scroll"><table class="erp-table"><thead><tr>${config.map(([,title])=>`<th>${escapeHtml(title)}</th>`).join('')}<th></th></tr></thead><tbody>${rows.map(row=>{const index=data[page].indexOf(row);return `<tr>${config.map(([key])=>`<td>${key==='status'?badge(row[key]):`<span title="${escapeHtml(row[key])}">${escapeHtml(row[key])}</span>`}</td>`).join('')}<td class="erp-actions"><button class="row-action" data-action="edit" data-index="${index}" aria-label="Edit record">✎</button><button class="row-action delete" data-action="delete" data-index="${index}" aria-label="Delete record">×</button>${page==='Fees & finance'&&row.status!=='Paid'?`<button class="pay-action" data-action="pay" data-index="${index}">Record payment</button>`:''}</td></tr>`;}).join('')}</tbody></table></div>`;
}
function renderWorkspace(page) {
  const school=currentSchoolInfo();
  const records=data[page]||[];
  const m=meta[page]||[];
  let tools='';
  if(page==='Attendance') tools='<button class="erp-secondary" data-action="bulk-present">✓ Mark all present</button>';
  if(page==='Fees & finance') tools='<button class="erp-secondary" data-action="export">⇩ Export dues</button>';
  if(page==='Announcements') tools='<button class="erp-secondary" data-action="export">⇩ Export list</button>';
  const rows=records;
  pageWrap.innerHTML=`<section class="erp-page-head"><div><div class="eyebrow">${escapeHtml(school.name.toUpperCase())} <span class="live-dot"></span> ${escapeHtml(page.toUpperCase())}</div><h1>${escapeHtml(page)}</h1><p>${escapeHtml(descriptions[page]||'')}</p></div><button class="primary-button" data-action="add"><span>＋</span>${page==='Announcements'?'New announcement':page==='Attendance'?'Add attendance':page==='Fees & finance'?'Add fee record':`Add ${page==='Students'?'student':page==='Faculty'?'faculty':'record'}`}</button></section>
  <section class="erp-metrics">${m.map((v,i)=>`<article class="erp-metric"><div class="stat-top"><span>${escapeHtml(v[1])}</span><span class="stat-icon ${['lilac','mint','peach'][i]}">${['◫','◷','↗'][i]}</span></div><strong>${escapeHtml(v[0])}</strong><small>${escapeHtml(v[2])}</small></article>`).join('')}</section>
  <section class="panel erp-records"><div class="erp-record-head"><div><h2>${page==='Attendance'?"Today's register":page==='Fees & finance'?'Fee ledger':page==='Timetable'?'Weekly schedule':page==='Announcements'?'School updates':`${page} directory`}</h2><p>${records.length} records · Updated just now</p></div><div class="erp-controls">${tools}<label class="erp-search"><span>⌕</span><input type="search" id="tableSearch" placeholder="Search ${page.toLowerCase()}..." /></label><select id="statusFilter" aria-label="Filter by status"><option value="">All statuses</option>${[...new Set(records.map(row=>row.status))].map(v=>`<option>${escapeHtml(v)}</option>`).join('')}</select></div></div><div id="tableMount">${renderTable(page,rows)}</div></section>
  <footer class="footer"><span>© ${new Date().getFullYear()} ${escapeHtml(school.name)}</span><span>School operations, all in one place <b>✳</b></span><a href="#help" data-action="help">Help center ↗</a></footer>`;
  bindWorkspace(page);
}
function renderReports(){
  const school=currentSchoolInfo();
  const reportCards=[['Attendance summary','Daily, weekly, or term attendance by class.','◷'],['Student enrollment','Enrollment totals, class distribution, and new admissions.','♧'],['Fee collection','Collections, pending dues, and overdue accounts.','＄'],['Faculty overview','Staff count by department and availability.','♙']];
  const history=reportHistory.length?`<div class="erp-table-scroll"><table class="erp-table"><thead><tr><th>Report</th><th>Generated</th><th>Records</th></tr></thead><tbody>${reportHistory.map(item=>`<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.date)}</td><td>${escapeHtml(item.count)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="erp-empty"><span>▤</span><b>No reports generated yet</b><small>Choose a report above to create your first summary.</small></div>`;
  pageWrap.innerHTML=`<section class="erp-page-head"><div><div class="eyebrow">${escapeHtml(school.name.toUpperCase())} <span class="live-dot"></span> INSIGHTS</div><h1>Reports</h1><p>Build clear summaries from your school's day-to-day records.</p></div></section><section class="erp-report-grid">${reportCards.map(([title,desc,icon])=>`<article class="panel report-card"><span class="report-icon">${icon}</span><h2>${title}</h2><p>${desc}</p><button data-action="report" data-report="${title}">Generate report <span>→</span></button></article>`).join('')}</section><section class="panel erp-records report-history"><div class="erp-record-head"><div><h2>Report history</h2><p>Recently generated reports</p></div></div>${history}</section><footer class="footer"><span>© ${new Date().getFullYear()} ${escapeHtml(school.name)}</span><span>School operations, all in one place <b>✳</b></span><a href="#help" data-action="help">Help center ↗</a></footer>`;
}
function renderSettings(){
  const school=currentSchoolInfo();
  const saved=JSON.parse(localStorage.getItem(schoolStorageKey('settings'))||'{}');
  pageWrap.innerHTML=`<section class="erp-page-head"><div><div class="eyebrow">${escapeHtml(school.name.toUpperCase())} <span class="live-dot"></span> ADMINISTRATION</div><h1>Settings</h1><p>Manage school profile and local portal preferences.</p></div></section><form id="settingsForm" class="panel settings-panel"><div class="erp-record-head"><div><h2>School profile</h2><p>This information identifies your campus in the portal.</p></div></div><div class="settings-fields"><label>School name<input name="school" value="${escapeHtml(saved.school||school.name)}" required></label><label>Campus<input name="campus" value="${escapeHtml(saved.campus||school.campus)}" required></label><label>Academic year<input name="year" value="${escapeHtml(saved.year||'2026–2027')}" required></label><label>Administrator email<input name="email" type="email" value="${escapeHtml(saved.email||'admin@northstar.academy')}" required></label><label>Contact number<input name="phone" value="${escapeHtml(saved.phone||'+91 80 4567 8900')}" required></label><label>School address<input name="address" value="${escapeHtml(saved.address||'24 North Park Road, Bengaluru')}" required></label></div><div class="settings-footer"><small>Settings are stored in this browser for this school.</small><button class="primary-button" type="submit">Save changes</button></div></form><footer class="footer"><span>© ${new Date().getFullYear()} ${escapeHtml(school.name)}</span><span>School operations, all in one place <b>✳</b></span><a href="#help" data-action="help">Help center ↗</a></footer>`;
  document.getElementById('settingsForm').addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(event.currentTarget));localStorage.setItem(schoolStorageKey('settings'),JSON.stringify(values));notify('School profile saved');});
}
function renderWorkspacePage(page){
  if(page==='Overview'&&activeUser&&activeUser.role!=='principal'){renderRoleDashboard(activeUser.role);}
  else if(activeUser&&activeUser.role!=='principal'){renderRolePage(activeUser.role,page);}
  else if(page==='Overview'){pageWrap.innerHTML=overviewMarkup;bindOverview();}
  else if(page==='Reports')renderReports();
  else if(page==='Settings')renderSettings();
  else renderWorkspace(page);
  document.getElementById('crumb').textContent=page;
}
const roleLabels={student:'Student',teacher:'Teacher',principal:'Principal'};
const roleMenus={
  student:[['Overview','Overview','◫'],['My attendance','My attendance','◷'],['Assignments','Assignments','▤'],['Timetable','Timetable','▦'],['Fees & finance','Fees & finance','＄'],['Announcements','Announcements','♧']],
  teacher:[['Overview','Overview','◫'],['My classes','My classes','♧'],['Attendance','Class attendance','◷'],['Assignments','Assignments','▤'],['Timetable','Timetable','▦'],['Announcements','Announcements','♧']],
  principal:[['Overview','Overview','◫'],['Students','Students','♧'],['Faculty','Faculty','♙'],['Attendance','Attendance','◷'],['Academics','Academics','▤'],['Timetable','Timetable','▦'],['Fees & finance','Fees & finance','＄'],['Transport','Transport','▱'],['Announcements','Announcements','♧'],['Reports','Reports','▥'],['Settings','Settings','⚙']]
};
function renderRoleMenu(role){
  const links=roleMenus[role];
  document.querySelector('.main-nav[aria-label="Main navigation"]').innerHTML=links.map(([label,page,icon])=>`<a class="nav-item ${page==='Overview'?'active':''}" href="#${page.toLowerCase().replaceAll(' ','-')}" data-page="${escapeHtml(page)}"><span class="nav-icon">${icon}</span><span>${escapeHtml(label)}</span></a>`).join('');
  document.querySelector('.management-label').style.display=role==='principal'?'':'none';
  const mgmt=document.querySelector('.main-nav[aria-label="Management navigation"]');
  mgmt.style.display=role==='principal'?'':'none';
  document.querySelector('.settings-link').style.display=role==='principal'?'':'none';
  const school=schoolOptions[activeUser.school]||schoolOptions['northstar-west'];
  document.querySelector('.school-switch b').textContent=school.name;
  document.querySelector('.school-switch small').textContent=`${school.campus} · ${roleLabels[role]} portal`;
  document.querySelector('.user-profile b').textContent=activeUser.name;
  document.querySelector('.user-profile small').textContent=roleLabels[role];
  document.querySelector('.avatar-user').textContent=activeUser.name.split(' ').map(part=>part[0]).join('').slice(0,2).toUpperCase();
  document.querySelectorAll('.nav-item[data-page]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();const page=link.dataset.page;
    document.querySelectorAll('.nav-item[data-page]').forEach(item=>item.classList.toggle('active',item===link));
    history.replaceState(null,'',link.getAttribute('href'));sidebar.classList.remove('open');renderWorkspacePage(page);
  }));
}
function roleShell(title,subtitle,body){
  const school=currentSchoolInfo();
  pageWrap.innerHTML=`<section class="role-greeting"><div><div class="eyebrow">${escapeHtml(school.name.toUpperCase())} · ${escapeHtml(school.campus.toUpperCase())} <span class="live-dot"></span> ${new Date().toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'}).toUpperCase()}</div><h1>${title}</h1><p>${subtitle}</p></div><span class="role-greeting-mark">✳</span></section>${body}<footer class="footer"><span>© ${new Date().getFullYear()} ${escapeHtml(school.name)}</span><span>Thoughtfully made for better school days <b>✳</b></span><a href="#help" data-role-action="help">Help center ↗</a></footer>`;
  pageWrap.querySelector('[data-role-action="help"]')?.addEventListener('click',event=>{event.preventDefault();notify('Contact the school office for help.');});
}
function roleStat(label,value,detail,icon,kind){return `<article class="role-stat"><div><small>${label}</small><strong>${value}</strong><span>${detail}</span></div><i class="${kind}">${icon}</i></article>`;}
function openRoleModal(title,copy,content,onReady){
  const modal=document.querySelector('.modal');
  modal.innerHTML=`<button class="modal-close" id="modalClose" aria-label="Close">×</button><div class="modal-symbol">✳</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p>${content}`;
  document.getElementById('modalClose').addEventListener('click',closeModal);onReady?.();backdrop.classList.add('open');
}
function renderStudentAssignments(){
  const work=assignments.filter(item=>item.class==='Grade 8 · A');
  roleShell('My assignments','Keep track of your work and upcoming due dates.',`<section class="panel role-panel"><div class="panel-heading"><div><h2>Upcoming work</h2><p>${work.filter(item=>!item.submitted).length} assignments need your attention</p></div></div><div class="assignment-list large">${work.map(item=>`<div><span class="assignment-icon purple">${escapeHtml(item.subject[0])}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.subject)} · ${escapeHtml(item.teacher)} · ${escapeHtml(item.description)}</small></span><em class="${item.submitted?'':'due-soon'}">${item.submitted?'Submitted':`Due ${escapeHtml(item.due)}`}</em><button data-assignment="${escapeHtml(item.id)}">${item.submitted?'View':'Open'}</button></div>`).join('')||'<div class="erp-empty"><b>No assignments yet</b></div>'}</div></section>`);
  pageWrap.querySelectorAll('[data-assignment]').forEach(button=>button.addEventListener('click',()=>{
    const assignment=assignments.find(item=>item.id===button.dataset.assignment);if(!assignment)return;
    openRoleModal(assignment.title,`${assignment.subject} · ${assignment.teacher} · Due ${assignment.due}`,`<div class="assignment-detail"><p>${escapeHtml(assignment.description)}</p><div><b>Class</b><span>${escapeHtml(assignment.class)}</span></div><div><b>Submission</b><span>${assignment.submitted?'Already submitted':'Not submitted yet'}</span></div><button class="primary-button modal-submit" id="submitAssignment" ${assignment.submitted?'disabled':''}>${assignment.submitted?'Submitted ✓':'Mark as submitted'}</button></div>`,()=>document.getElementById('submitAssignment').addEventListener('click',()=>{assignment.submitted=true;saveAssignments();closeModal();renderRolePage('student','Assignments');notify('Assignment submitted');}));
  }));
}
function renderTeacherAssignments(){
  const myAssignments=assignments.filter(item=>item.teacher===activeUser.name||item.teacher===activeUser.loginId);
  roleShell('Assignments','Create class work and review student submissions.',`<section class="panel role-panel"><div class="panel-heading"><div><h2>Active assignments</h2><p>${myAssignments.length} assignments · ${myAssignments.reduce((sum,item)=>sum+Number(item.pending||0),0)} submissions waiting for review</p></div><button class="primary-button" id="newAssignment">＋ New assignment</button></div><div class="assignment-list large">${myAssignments.map(item=>`<div><span class="assignment-icon purple">${escapeHtml(item.class.replace('Grade ','').replace(' · ','').slice(0,3))}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.class)} · Due ${escapeHtml(item.due)}</small></span><em class="${item.pending?'due-soon':''}">${item.pending?`${item.pending} to review`:'On track'}</em><button data-review="${escapeHtml(item.id)}">${item.pending?'Review':'View'}</button></div>`).join('')||'<div class="erp-empty"><b>No assignments yet</b><small>Create an assignment for one of your classes.</small></div>'}</div></section>`);
  document.getElementById('newAssignment').addEventListener('click',()=>{
    openRoleModal('Create an assignment','Add class work for your students.',`<form id="newAssignmentForm" class="assignment-form"><label class="field-label">Assignment title<input name="title" required></label><label class="field-label">Subject<input name="subject" value="Science" required></label><label class="field-label">Class<select name="class"><option>Grade 8 · A</option><option>Grade 9 · B</option><option>Grade 6 · B</option><option>Grade 10 · A</option></select></label><label class="field-label">Due date<input name="due" type="date" required></label><label class="field-label full-field">Instructions<textarea name="description" rows="3" required></textarea></label><button class="primary-button modal-submit" type="submit">Publish assignment <span>→</span></button></form>`,()=>document.getElementById('newAssignmentForm').addEventListener('submit',event=>{
      event.preventDefault();const form=Object.fromEntries(new FormData(event.currentTarget));assignments.unshift({id:`ASG-${Date.now()}`,title:form.title,subject:form.subject,teacher:activeUser.name,class:form.class,due:form.due,description:form.description,submitted:false,status:'Open',pending:0});saveAssignments();closeModal();renderTeacherAssignments();notify('Assignment published');
    }));
  });
  pageWrap.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>{
    const item=assignments.find(entry=>entry.id===button.dataset.review);if(!item)return;
    openRoleModal(item.title,`${item.class} · Due ${item.due}`,`<div class="submission-list"><p>${item.pending||0} submissions waiting for review.</p>${['Aarav Kapoor','Anaya Iyer','Kabir Shah'].slice(0,item.pending||1).map(name=>`<div><span>${escapeHtml(name)}</span><b>Submitted</b></div>`).join('')}<button class="primary-button modal-submit" id="markReviewed">${item.pending?'Mark reviewed':'Close review'}</button></div>`,()=>document.getElementById('markReviewed').addEventListener('click',()=>{item.pending=0;saveAssignments();closeModal();renderTeacherAssignments();notify('Submissions reviewed');}));
  }));
}
function renderClassRoster(grade){
  const students=data.Students.filter(item=>item.class===grade);
  roleShell(`${grade} roster`,'Student list and family contact details for this class.',`<section class="panel role-panel"><div class="panel-heading"><div><h2>${grade} · ${students.length} students</h2><p>Class advisor · Priya Desai</p></div><button class="erp-secondary" id="backToClasses">← My classes</button></div>${students.length?`<div class="erp-table-scroll"><table class="erp-table"><thead><tr><th>Student</th><th>Student ID</th><th>Parent / guardian</th><th>Contact</th><th>Status</th></tr></thead><tbody>${students.map(item=>`<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.id)}</td><td>${escapeHtml(item.guardian||'—')}</td><td>${escapeHtml(item.phone||'—')}</td><td>${badge(item.status)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="erp-empty"><b>No students are listed in this section.</b></div>'}</section>`);
  document.getElementById('backToClasses').addEventListener('click',()=>renderRolePage('teacher','My classes'));
}
function renderRoleDashboard(role){
  if(role==='student'){
    const myWork=assignments.filter(item=>item.class==='Grade 8 · A').slice(0,3);
    const workCards=myWork.map(item=>`<div><span class="assignment-icon purple">${escapeHtml(item.subject[0])}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.subject)} · ${escapeHtml(item.teacher)}</small></span><em class="${item.submitted?'':'due-soon'}">${item.submitted?'Submitted':`Due ${escapeHtml(item.due)}`}</em></div>`).join('');
    const attendanceRows=data.Attendance.filter(item=>item.id===activeUser.loginId);
    const attendancePercent=attendanceRows.length?Math.round(attendanceRows.filter(item=>item.status==='Present').length/attendanceRows.length*100):'—';
    const feeRecord=data['Fees & finance'].find(item=>item.id===activeUser.loginId||item.name===activeUser.name);
    roleShell(`Good morning, ${escapeHtml(activeUser.name.split(' ')[0])} <span class="wave">✦</span>`,'Ready for a great day of learning? Here’s your school day at a glance.',`<section class="role-stats">${roleStat('Attendance recorded',`${attendancePercent}${attendancePercent==='—'?'':'%'}`,`${attendanceRows.length} recorded school days`,'◷','violet')}${roleStat('Assignments due',myWork.filter(item=>!item.submitted).length,`${myWork.filter(item=>!item.submitted).length} to complete`,'▤','orange')}${roleStat('Fee account',feeRecord?.status||'Clear',feeRecord?`${feeRecord.amount} · due ${feeRecord.due}`:'No balance due','＄',feeRecord?.status==='Paid'?'green':'orange')}</section><section class="role-columns"><article class="panel role-panel"><div class="panel-heading"><div><h2>Today’s classes</h2><p>Friday schedule · Grade 8 A</p></div><button class="text-link" data-go="Timetable">Full timetable →</button></div><div class="role-list"><div><time>09:00</time><i class="subject-dot purple-dot"></i><span><b>Mathematics</b><small>Room 204 · Rahul Sharma</small></span><em>Period 1</em></div><div><time>10:00</time><i class="subject-dot blue-dot"></i><span><b>Science</b><small>Laboratory 2 · Priya Desai</small></span><em>Period 2</em></div><div><time>11:15</time><i class="subject-dot orange-dot"></i><span><b>English</b><small>Room 108 · Meera Krishnan</small></span><em>Period 3</em></div><div><time>14:00</time><i class="subject-dot green-dot"></i><span><b>Physical education</b><small>Sports ground · Dev Patel</small></span><em>Period 5</em></div></div></article><article class="panel role-panel"><div class="panel-heading"><div><h2>Assignments</h2><p>A little progress goes a long way</p></div><button class="text-link" data-go="Assignments">View all →</button></div><div class="assignment-list">${workCards||'<div class="erp-empty"><small>No assignments</small></div>'}</div><div class="role-announcement"><span>✦</span><p><b>Science club registrations are open</b><small>Sign up with your class teacher by Nov 18.</small></p></div></article></section>`);
  } else {
    const owned=assignments.filter(item=>item.teacher===activeUser.name||item.teacher===activeUser.loginId);
    const pending=owned.reduce((sum,item)=>sum+Number(item.pending||0),0);
    roleShell(`Good morning, ${escapeHtml(activeUser.name.split(' ')[0])} <span class="wave">✦</span>`,'Here’s your teaching day at a glance.',`<section class="role-stats">${roleStat('My students','126','Across 5 class sections','♧','violet')}${roleStat('Attendance to review','2 classes','Grade 8 A · Grade 6 B','◷','orange')}${roleStat('Assignments',`${owned.length} active`,`${pending} submissions to review`,'▤','green')}</section><section class="role-columns"><article class="panel role-panel"><div class="panel-heading"><div><h2>Today’s teaching schedule</h2><p>Friday · ${escapeHtml((schoolOptions[activeSchool]||schoolOptions['northstar-west']).campus)}</p></div><button class="text-link" data-go="Timetable">Full timetable →</button></div><div class="role-list"><div><time>09:00</time><i class="subject-dot purple-dot"></i><span><b>Science · Grade 8 A</b><small>Room 204 · 28 students</small></span><em>Period 1</em></div><div><time>10:00</time><i class="subject-dot blue-dot"></i><span><b>Science · Grade 9 B</b><small>Laboratory 2 · 26 students</small></span><em>Period 2</em></div><div><time>11:15</time><i class="subject-dot orange-dot"></i><span><b>Planning period</b><small>Faculty room</small></span><em>Free</em></div><div><time>13:00</time><i class="subject-dot green-dot"></i><span><b>Science · Grade 6 B</b><small>Room 108 · 25 students</small></span><em>Period 4</em></div></div></article><article class="panel role-panel"><div class="panel-heading"><div><h2>Quick actions</h2><p>Keep your classes moving</p></div></div><div class="teacher-actions"><button data-go="Class attendance"><i>◷</i><span><b>Take attendance</b><small>Record today’s class register</small></span><em>→</em></button><button data-go="Assignments"><i>▤</i><span><b>Review assignments</b><small>${pending} submissions are waiting</small></span><em>→</em></button><button data-go="My classes"><i>♧</i><span><b>My classes</b><small>View your class rosters</small></span><em>→</em></button></div><div class="role-announcement"><span>✦</span><p><b>Staff meeting · 3:30 PM</b><small>Conference room · All faculty</small></p></div></article></section>`);
  }
  pageWrap.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>{
    const page=button.dataset.go;document.querySelectorAll('.nav-item[data-page]').forEach(item=>item.classList.toggle('active',item.dataset.page===page));renderWorkspacePage(page);
  }));
}
function renderRolePage(role,page){
  if(role==='student'&&page==='My attendance'){
    const records=data.Attendance.filter(item=>item.id===activeUser.loginId).sort((a,b)=>b.date.localeCompare(a.date));
    const present=records.filter(item=>item.status==='Present').length;
    const rate=records.length?`${Math.round(present/records.length*100)}%`:'—';
    roleShell('My attendance','Your attendance record for this school year.',`<section class="role-stats">${roleStat('Attendance rate',rate,`${records.length} recorded school days`,'◷','green')}${roleStat('Days present',present,'Based on saved class registers','✓','violet')}${roleStat('Other marks',records.length-present,'Absent, late, or excused','–','orange')}</section><section class="panel role-panel"><div class="panel-heading"><div><h2>Recent attendance</h2><p>Your latest class register entries</p></div></div><div class="role-list">${records.map(item=>`<div><time>${escapeHtml(item.date)}</time><i class="subject-dot ${item.status==='Present'?'green-dot':'orange-dot'}"></i><span><b>${escapeHtml(item.status)}</b><small>${escapeHtml(item.class)} · ${item.status==='Present'?'Full school day':'See your teacher for details'}</small></span></div>`).join('')||'<div class="erp-empty"><b>No attendance records yet</b><small>Your class register will appear here.</small></div>'}</div></section>`);return;
  }
  if(role==='student'&&page==='Assignments'){
    renderStudentAssignments();return;
  }
  if(role==='student'&&page==='Fees & finance'){
    const fee=data['Fees & finance'].find(item=>item.id===activeUser.loginId||item.name===activeUser.name);
    roleShell('My fees','View your account summary and current school fees.',`<section class="role-stats">${roleStat('Account status',fee?.status||'Clear',fee?`${fee.amount} outstanding`:'No balance due',fee?.status==='Paid'?'✓':'＄',fee?.status==='Paid'?'green':'orange')}${roleStat('Payment due',fee?.amount||'₹0',fee?`Due ${fee.due}`:'No upcoming payment','＄','violet')}${roleStat('Academic year','2026–27','Tuition and activities','▤','orange')}</section><section class="panel role-panel"><div class="panel-heading"><div><h2>Fee ledger</h2><p>Charges and payment status on your account</p></div><button class="erp-secondary" id="downloadFeeStatement">⇩ Download statement</button></div><div class="role-list">${fee?`<div><time>${escapeHtml(fee.due)}</time><i class="subject-dot ${fee.status==='Paid'?'green-dot':'orange-dot'}"></i><span><b>Term fee · ${escapeHtml(fee.class)}</b><small>${escapeHtml(fee.status)} · Student ID ${escapeHtml(fee.id)}</small></span><em>${escapeHtml(fee.amount)}</em></div>`:'<div class="erp-empty"><b>No fee records found</b><small>Contact the school office if you need help.</small></div>'}</div></section>`);
    document.getElementById('downloadFeeStatement')?.addEventListener('click',()=>exportCsv('Fees & finance',fee?[fee]:[],'student-fee-statement.csv'));return;
  }
  if(role==='teacher'&&page==='Class attendance'){
    roleShell('Class attendance','Mark the class register for today.',`<section class="panel role-panel"><div class="role-attendance-head"><div><h2>Grade 8 · A</h2><p>Science · 28 students · Today, ${new Date().toLocaleDateString()}</p></div><button class="erp-secondary" id="markAllPresent">✓ Mark all present</button></div><div class="role-student-list">${['Aarav Kapoor','Ishita Verma','Rohan Mehta','Anaya Iyer','Dev Malhotra','Tara Nair'].map((name,index)=>`<div><span class="role-student-avatar">${name.split(' ').map(x=>x[0]).join('')}</span><b>${name}</b><small>NS24${String(index+1).padStart(2,'0')}</small><select aria-label="Attendance for ${name}"><option>Present</option><option>Absent</option><option>Late</option><option>Excused</option></select></div>`).join('')}</div><div class="attendance-save"><span>Showing 6 of 28 students</span><button class="primary-button" id="saveAttendance">Save attendance</button></div></section>`);
    try{
      const saved=JSON.parse(localStorage.getItem(schoolStorageKey('teacher-attendance'))||'[]');
      pageWrap.querySelectorAll('.role-student-list>div').forEach(row=>{const entry=saved.find(item=>item.name===row.querySelector('b').textContent);if(entry)row.querySelector('select').value=entry.status;});
    }catch{}
    document.getElementById('markAllPresent').addEventListener('click',()=>pageWrap.querySelectorAll('.role-student-list select').forEach(select=>select.value='Present'));
    document.getElementById('saveAttendance').addEventListener('click',()=>{
      const entries=[...pageWrap.querySelectorAll('.role-student-list>div')].map(row=>({name:row.querySelector('b').textContent,id:row.querySelector('small').textContent,class:'Grade 8 · A',date:new Date().toISOString().slice(0,10),status:row.querySelector('select').value}));
      const day=entries[0]?.date;
      entries.forEach(entry=>{const old=data.Attendance.find(item=>item.id===entry.id&&item.date===day);if(old)Object.assign(old,entry);else data.Attendance.unshift(entry);});
      saveData();localStorage.setItem(schoolStorageKey('teacher-attendance'),JSON.stringify(entries));notify('Class attendance saved for today');
    });return;
  }
  if(role==='teacher'&&page==='My classes'){
    roleShell('My classes','Your class sections and student rosters.',`<section class="erp-report-grid role-class-grid">${[['Grade 8 · A','Science','28 students','Room 204'],['Grade 9 · B','Science','26 students','Laboratory 2'],['Grade 6 · B','Science','25 students','Room 108'],['Grade 10 · A','Science','24 students','Laboratory 1']].map(([grade,subject,count,room])=>`<article class="panel report-card"><span class="report-icon">♧</span><h2>${grade}</h2><p>${subject} · ${count}<br>${room}</p><button data-class="${grade}">Open class roster <span>→</span></button></article>`).join('')}</section>`);pageWrap.querySelectorAll('[data-class]').forEach(button=>button.addEventListener('click',()=>renderClassRoster(button.dataset.class)));return;
  }
  if(page==='Timetable'){
    const student=role==='student';
    roleShell(student?'My timetable':'My teaching timetable','Your week at Northstar Academy.',`<section class="panel role-panel"><div class="panel-heading"><div><h2>Friday schedule</h2><p>${student?'Grade 8 · A':'West Campus · Faculty schedule'}</p></div></div><div class="role-list"><div><time>09:00</time><i class="subject-dot purple-dot"></i><span><b>${student?'Mathematics · Grade 8 A':'Science · Grade 8 A'}</b><small>Room 204</small></span><em>Period 1</em></div><div><time>10:00</time><i class="subject-dot blue-dot"></i><span><b>${student?'Science · Grade 8 A':'Science · Grade 9 B'}</b><small>Laboratory 2</small></span><em>Period 2</em></div><div><time>11:15</time><i class="subject-dot orange-dot"></i><span><b>${student?'English · Grade 8 A':'Planning period'}</b><small>${student?'Room 108':'Faculty room'}</small></span><em>Period 3</em></div><div><time>14:00</time><i class="subject-dot green-dot"></i><span><b>${student?'Physical education':'Science · Grade 6 B'}</b><small>${student?'Sports ground':'Room 108'}</small></span><em>Period 5</em></div></div></section>`);return;
  }
  if(page==='Announcements'){
    roleShell('Announcements','The latest updates from Northstar Academy.',`<section class="panel role-panel"><div class="role-list"><div><time>Nov 09</time><i class="subject-dot purple-dot"></i><span><b>Mid-term assessments begin November 23</b><small>Please check the updated examination timetable.</small></span><em>Academic office</em></div><div><time>Nov 06</time><i class="subject-dot blue-dot"></i><span><b>School closed for regional holiday</b><small>Campus will reopen on the next working day.</small></span><em>Administration</em></div><div><time>Nov 02</time><i class="subject-dot green-dot"></i><span><b>Science club registration is open</b><small>Register with your class teacher by November 18.</small></span><em>Priya Desai</em></div></div></section>`);return;
  }
  if(role==='teacher'&&page==='Assignments'){
    renderTeacherAssignments();return;
  }
  renderRoleDashboard(role);
}
function bindWorkspace(page){
  const search=document.getElementById('tableSearch'), filter=document.getElementById('statusFilter');
  const refresh=()=>{
    const q=search.value.trim().toLowerCase(), status=filter.value;
    const rows=data[page].filter(row=>(!status||row.status===status)&&Object.values(row).some(v=>String(v).toLowerCase().includes(q)));
    document.getElementById('tableMount').innerHTML=renderTable(page,rows);
  };
  search.addEventListener('input',refresh);filter.addEventListener('change',refresh);
  document.getElementById('tableMount').addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button)return;
    const index=Number(button.dataset.index),action=button.dataset.action;
    if(action==='edit')openRecordModal(page,index);
    if(action==='delete'){
      if(!confirm(`Delete this ${page==='Students'?'student':page==='Faculty'?'faculty record':'record'}?`))return;
      data[page].splice(index,1);saveData();renderWorkspace(page);notify('Record deleted');
    }
    if(action==='pay'){data[page][index].status='Paid';saveData();renderWorkspace(page);notify('Payment recorded');}
  });
  pageWrap.querySelector('[data-action="add"]')?.addEventListener('click',()=>openRecordModal(page));
  pageWrap.querySelectorAll('[data-action="bulk-present"]').forEach(button=>button.addEventListener('click',()=>{data.Attendance.forEach(r=>r.status='Present');saveData();renderWorkspace('Attendance');notify('All listed students marked present');}));
  pageWrap.querySelectorAll('[data-action="export"]').forEach(button=>button.addEventListener('click',()=>exportCsv(page)));
}
function openRecordModal(page,index=null){
  const record=index===null?{}:{...data[page][index]};
  const labels=fields[page];
  document.getElementById('modalTitle').textContent=index===null?`Add ${page==='Students'?'student':page==='Faculty'?'faculty member':page==='Announcements'?'announcement':'record'}`:`Edit ${page==='Students'?'student':page==='Faculty'?'faculty record':'record'}`;
  document.getElementById('modalCopy').textContent=`Enter the details for ${page.toLowerCase()}.`;
  const modal=document.querySelector('.modal');
  modal.innerHTML=`<button class="modal-close" id="modalClose" aria-label="Close">×</button><div class="modal-symbol">✳</div><h2 id="modalTitle">${index===null?'Add record':'Edit record'}</h2><p id="modalCopy">Enter the details below.</p><form id="recordForm" class="record-form">${labels.map(([key,label,type,opts])=>`<label class="field-label">${escapeHtml(label)}${type==='select'?`<select name="${key}">${opts.split(',').map(v=>`<option ${record[key]===v?'selected':''}>${v}</option>`).join('')}</select>`:`<input name="${key}" type="${type||'text'}" value="${escapeHtml(record[key]||(type==='date'?new Date().toISOString().slice(0,10):''))}" ${index===null?'required':''}>`}</label>`).join('')}<button class="primary-button modal-submit" type="submit">${index===null?'Save record':'Save changes'} <span>→</span></button></form>`;
  document.getElementById('modalClose').addEventListener('click',closeModal);
  document.getElementById('recordForm').addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(event.currentTarget));if(index===null)data[page].unshift(values);else data[page][index]=values;saveData();closeModal();renderWorkspace(page);notify(index===null?'Record added':'Changes saved');});
  backdrop.classList.add('open');
}
function closeModal(){backdrop.classList.remove('open');}
function exportCsv(page,rows=data[page],filename=null){
  const config=columns[page];
  const csv=[config.map(([,label])=>`"${label.replaceAll('"','""')}"`).join(','),...rows.map(row=>config.map(([key])=>`"${String(row[key]??'').replaceAll('"','""')}"`).join(','))].join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename||`northstar-${page.toLowerCase().replaceAll(' ','-').replaceAll('&','and')}.csv`;a.click();URL.revokeObjectURL(url);notify('CSV downloaded');
}
function bindOverview(){
  const today=new Date();
  const longDate=today.toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const shortDate=today.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'short',year:'numeric'});
  const dateButton=document.querySelector('.date-button');
  if(dateButton)dateButton.innerHTML=`<span>▣</span> ${escapeHtml(shortDate)} <span class="chevron">⌄</span>`;
  const eyebrow=document.querySelector('.welcome-row .eyebrow');
  if(eyebrow)eyebrow.innerHTML=`${escapeHtml(shortDate.toUpperCase())} <span class="live-dot"></span> SCHOOL IS IN SESSION`;
  const scheduleDate=document.querySelector('.schedule-panel .panel-heading p');
  if(scheduleDate)scheduleDate.innerHTML=`${escapeHtml(today.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'short'}))} <span class="schedule-today">TODAY</span>`;
  const copyright=document.querySelector('.page-wrap > .footer > span:first-child');
  if(copyright)copyright.textContent=`© ${today.getFullYear()} Northstar Academy`;
  document.getElementById('reportBtn')?.addEventListener('click',()=>renderWorkspacePage('Reports'));
  document.getElementById('announceBtn')?.addEventListener('click',()=>{renderWorkspacePage('Announcements');setTimeout(()=>openRecordModal('Announcements'),0);});
  document.getElementById('periodBtn')?.addEventListener('click',event=>{event.currentTarget.textContent=event.currentTarget.textContent.includes('week')?'This month   ⌄':'This week   ⌄';notify('Attendance period updated');});
  document.getElementById('scheduleLink')?.addEventListener('click',()=>renderWorkspacePage('Timetable'));
  document.getElementById('activityLink')?.addEventListener('click',()=>renderWorkspacePage('Reports'));
  document.getElementById('supportBtn')?.addEventListener('click',()=>notify('Support: support@northstar.academy'));
  document.querySelector('.notification-btn')?.addEventListener('click',()=>notify('You’re all caught up on notifications'));
  document.querySelector('.date-button')?.addEventListener('click',()=>notify(longDate));
}
document.querySelectorAll('.nav-item[data-page]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();const page=link.dataset.page;
  document.querySelectorAll('.nav-item[data-page]').forEach(item=>item.classList.toggle('active',item===link));
  history.replaceState(null,'',link.getAttribute('href'));sidebar.classList.remove('open');renderWorkspacePage(page);
}));
document.querySelector('.brand')?.addEventListener('click',event=>{event.preventDefault();document.querySelectorAll('.nav-item[data-page]').forEach(item=>item.classList.toggle('active',item.dataset.page==='Overview'));history.replaceState(null,'','#overview');renderWorkspacePage('Overview');});
document.getElementById('menuBtn').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('modalClose').addEventListener('click',closeModal);
backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeModal();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape')closeModal();
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.getElementById('globalSearch').focus();}
});
document.getElementById('globalSearch').addEventListener('keydown',event=>{
  if(event.key!=='Enter')return;const q=event.currentTarget.value.trim().toLowerCase();if(!q)return;
  const match=Object.keys(data).find(page=>data[page].some(row=>Object.values(row).some(value=>String(value).toLowerCase().includes(q))));
  if(match){const link=document.querySelector(`.nav-item[data-page="${CSS.escape(match)}"]`);link?.click();const tableSearch=document.getElementById('tableSearch');if(tableSearch){tableSearch.value=event.currentTarget.value;tableSearch.dispatchEvent(new Event('input'));}}
  else notify(`No school records found for “${event.currentTarget.value.trim()}”`);
});
pageWrap.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-action="report"]');if(trigger){
    const type=trigger.dataset.report;
    const page=type==='Student enrollment'?'Students':type==='Faculty overview'?'Faculty':type==='Fee collection'?'Fees & finance':'Attendance';
    const rows=type==='Fee collection'?data[page].filter(x=>x.status!=='Paid'):data[page];
    reportHistory.unshift({name:type,date:new Date().toLocaleString(),count:rows.length});
    reportHistory=reportHistory.slice(0,8);localStorage.setItem(schoolStorageKey('reports'),JSON.stringify(reportHistory));
    exportCsv(page,rows,`${type.toLowerCase().replaceAll(' ','-')}.csv`);renderReports();
  }
});
const demoAccounts=[
  {loginId:'NS2401',email:'student@northstar.edu',name:'Aarav Kapoor',role:'student'},
  {loginId:'FAC-018',email:'teacher@northstar.edu',name:'Priya Desai',role:'teacher'},
  {loginId:'ADMIN-001',email:'principal@northstar.edu',name:'Arjun Mehta',role:'principal'}
];
let activeUser=null;
function activateUser(user){
  activeUser=user;activeSchool=schoolOptions[user.school]?user.school:'northstar-west';
  data=loadSchoolData(activeSchool);
  assignments=loadAssignments();
  try{reportHistory=JSON.parse(localStorage.getItem(schoolStorageKey('reports'))) || [];}catch{reportHistory=[];}
  document.body.classList.add('authenticated');
  document.getElementById('loginScreen').style.display='none';
  renderRoleMenu(user.role);renderWorkspacePage('Overview');
}
document.getElementById('togglePassword').addEventListener('click',event=>{
  const input=document.getElementById('loginPassword');const show=input.type==='password';input.type=show?'text':'password';event.currentTarget.textContent=show?'Hide':'Show';
});
document.getElementById('loginForm').addEventListener('submit',event=>{
  event.preventDefault();
  const loginId=document.getElementById('loginEmail').value.trim().toLowerCase();
  const password=document.getElementById('loginPassword').value;
  const account=demoAccounts.find(item=>item.loginId.toLowerCase()===loginId||item.email===loginId);
  if(!account||password!=='northstar123'){
    document.getElementById('loginError').textContent='Check your login ID and password, or ask your school administrator for help.';return;
  }
  const selectedSchool=document.getElementById('schoolSelect').value;
  const session={...account,school:selectedSchool};
  if(document.querySelector('.login-options input').checked)localStorage.setItem('northstar-session',JSON.stringify(session));
  else sessionStorage.setItem('northstar-session',JSON.stringify(session));
  activateUser(session);
});
document.getElementById('logoutBtn').addEventListener('click',()=>{
  localStorage.removeItem('northstar-session');sessionStorage.removeItem('northstar-session');
  document.body.classList.remove('authenticated');document.getElementById('loginScreen').style.display='';
  document.getElementById('loginEmail').value='NS2401';document.getElementById('loginPassword').value='northstar123';
});
document.getElementById('forgotPassword').addEventListener('click',event=>{event.preventDefault();document.getElementById('loginError').textContent='Ask your school administrator to reset your demo password.';});
try{
  const savedSession=JSON.parse(localStorage.getItem('northstar-session')||sessionStorage.getItem('northstar-session')||'null');
  if(savedSession&&demoAccounts.some(account=>account.role===savedSession.role))activateUser(savedSession);
}catch{}
