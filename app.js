const $=s=>document.querySelector(s);
const KEY='majorpromo_v2';let D={};try{D=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){D={}}
function idbOpen(cb){try{const r=indexedDB.open('majorpromo',1);r.onupgradeneeded=e=>{e.target.result.createObjectStore('s')};r.onsuccess=e=>cb(e.target.result)}catch(e){}}
function idbSet(v){idbOpen(db=>{if(!db)return;try{db.transaction('s','readwrite').objectStore('s').put(v,'d')}catch(e){}})}
function idbGet(cb){idbOpen(db=>{if(!db)return cb();try{const g=db.transaction('s').objectStore('s').get('d');g.onsuccess=()=>cb(g.result)}catch(e){cb()}})}
const save=()=>{D._saved=Date.now();const s=JSON.stringify(D);try{localStorage.setItem(KEY,s)}catch(e){}idbSet(s)};
const td=()=>new Date().toISOString().slice(0,10);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=k=>D[k]||(D[k]=[]);

const M={
  stages:{n:'Stages',f:[['lieu','Établissement / service','t'],['debut','Début','d'],['fin','Fin','d'],['notes','Apports / remarques','a']]},
  recherche:{n:'Recherche',f:[['sujet','Sujet / article','t'],['dom','Domaine','t'],['avancement','Avancement','s',['A lire','En cours','Fiche faite']],['notes','Résumé','a']]},
  publications:{n:'Publications & Posters',f:[['titre','Titre du poster / article','t'],['revue','Revue / Congrès','t'],['type','Type','s',['Poster','Article','Oral']],['date','Date','d'],['lien','Lien DOI','t']]},
  passerelle:{n:'Dossier passerelle',f:[['sem','Semestre','s',['S1','S2','S3','S4','S5','S6']],['type','Type de preuve','s',['Note','Stage','Projet','Recherche','Lettre','Autre']],['titre','Titre de la preuve','t'],['lien','Lien / Fichier','t'],['impact','Intérêt pour le dossier','a']]},
  finance:{n:'Finance',f:[['date','Date','d'],['type','Type','s',['Revenu','Dépense','Investissement']],['cat','Catégorie','t'],['m','Montant (€)','n'],['note','Remarque','t']]},
  sante:{n:'Santé',f:[['date','Date','d'],['som','Sommeil (h)','n'],['en','Énergie /10','n'],['spo','Séance sport ?','s',['Non','Oui']],['note','Notes','t']]},
  formations:{n:'Formations',f:[['titre','Formation / certification','t'],['plat','Plateforme / Organisme','t'],['stat','Statut','s',['À commencer','En cours','Validé']],['prog','Progression %','n'],['util','Utilité pour le plan','a']]}
};

const SK=[
  ['Sciences fondamentales + clinique',1],
  ['Anglais scientifique',2],
  ['Méthodologie de recherche',3],
  ['Réseau & publications',4],
  ['Discipline personnelle & santé',5]
];
if(!D.comp) D.comp=SK.map(()=>0);

const TABS=[
  ['home','🏠 Accueil'],
  ['stages','🏥 Stages'],
  ['recherche','🔬 Recherche'],
  ['publications','📄 Publications'],
  ['passerelle','🩺 Passerelle'],
  ['finance','💰 Finance'],
  ['sante','🏃 Santé'],
  ['formations','🎓 Formations'],
  ['portfolio','📋 Portfolio / CV']
];

let tab=D.tab||'home';
function go(t){tab=t;D.tab=t;save();render()}

function nav(){
  const el=$('#nav');
  if(el) el.innerHTML=TABS.map(([k,l])=>`<button class="${k===tab?'active':''}" onclick="go('${k}')">${l}</button>`).join('');
}

function setComp(i, v){
  D.comp[i]=Number(v);
  save();
  render();
}

function renderHome(){
  const st=L('stages').length;
  const re=L('recherche').length;
  const pu=L('publications').length;
  const fo=L('formations').filter(x=>x.stat==='Validé').length;
  const pa=L('passerelle').length;
  
  // Progression globale basée sur les compétences et items
  const compAvg = D.comp.reduce((a,b)=>a+b,0) / (SK.length * 5) * 100;
  const itemsScore = Math.min(100, (st*15)+(re*10)+(pu*20)+(fo*10)+(pa*10));
  const score = Math.round((compAvg * 0.4) + (itemsScore * 0.6));

  const compList = SK.map(([lbl], i)=>`
    <div style="margin-top:8px;">
      <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:2px;">
        <span>${lbl}</span>
        <span><strong>${D.comp[i]||0}/5</strong></span>
      </div>
      <input type="range" min="0" max="5" value="${D.comp[i]||0}" onchange="setComp(${i}, this.value)" style="width:100%;">
    </div>
  `).join('');

  return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="margin:0;">🎯 Passerelle & Science</h2>
          <p style="margin:4px 0 0 0; opacity:0.8;">Tableau de bord stratégique du parcours</p>
        </div>
        <button onclick="exportData()" class="btn-primary" style="padding:6px 12px; font-size:12px;">💾 Exporter .json</button>
      </div>

      <!-- Progression / Chance -->
      <div style="margin-top:15px; background:rgba(255,255,255,0.05); padding:12px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong>📊 Estimation de préparation du dossier</strong>
          <span><strong>${score}%</strong></span>
        </div>
        <div style="width:100%; background:rgba(255,255,255,0.1); height:10px; border-radius:5px; overflow:hidden;">
          <div style="width:${score}%; background:var(--accent, #4CAF50); height:100%;"></div>
        </div>
      </div>

      <!-- Statistiques clés -->
      <div class="dash-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:10px; margin-top:15px;">
        <div class="card stat-card" style="text-align:center; padding:10px;"><div class="stat-n" style="font-size:18px; font-weight:bold;">${st}</div><div class="stat-l" style="font-size:11px;">stages validés</div></div>
        <div class="card stat-card" style="text-align:center; padding:10px;"><div class="stat-n" style="font-size:18px; font-weight:bold;">${re}</div><div class="stat-l" style="font-size:11px;">fiches recherche</div></div>
        <div class="card stat-card" style="text-align:center; padding:10px;"><div class="stat-n" style="font-size:18px; font-weight:bold;">${pu}</div><div class="stat-l" style="font-size:11px;">publications</div></div>
        <div class="card stat-card" style="text-align:center; padding:10px;"><div class="stat-n" style="font-size:18px; font-weight:bold;">${pa}</div><div class="stat-l" style="font-size:11px;">preuves dossier</div></div>
      </div>

      <!-- Auto-évaluation compétences -->
      <div style="margin-top:20px;">
        <h3>🧠 Auto-évaluation des Compétences Clés</h3>
        ${compList}
      </div>
    </div>
  `;
}

function renderPortfolio(){
  const stages = L('stages').map(x => `<li><strong>${esc(x.lieu||'Service')}</strong> (${esc(x.debut||'')} à ${esc(x.fin||'')}) : ${esc(x.notes||'')}</li>`).join('') || '<p style="opacity:0.6;">Aucun stage renseigné.</p>';
  const pubs = L('publications').map(x => `<li><strong>[${esc(x.type||'Poster')}]</strong> ${esc(x.titre||'')} — <em>${esc(x.revue||'')}</em> (${esc(x.date||'')}) ${x.lien ? `<a href="${esc(x.lien)}" target="_blank">🔗 Lien</a>` : ''}</li>`).join('') || '<p style="opacity:0.6;">Aucune publication enregistrée.</p>';
  const forms = L('formations').map(x => `<li><strong>${esc(x.titre||'')}</strong> (${esc(x.plat||'')}) — Statut : ${esc(x.stat||'')} (${esc(x.prog||0)}%)</li>`).join('') || '<p style="opacity:0.6;">Aucune formation renseignée.</p>';

  return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>📋 Portfolio & Synthèse de Progression</h2>
        <button onclick="window.print()" class="btn-primary" style="padding:6px 12px;">🖨️ Imprimer / Exporter PDF</button>
      </div>
      <div style="margin-top:20px;">
        <h3>🏥 Stages & Expériences Cliniques</h3>
        <ul>${stages}</ul>
        <hr style="opacity:0.2; margin:15px 0;">
        <h3>🔬 Publications, Posters & Interventions</h3>
        <ul>${pubs}</ul>
        <hr style="opacity:0.2; margin:15px 0;">
        <h3>🎓 Certifications & Formations</h3>
        <ul>${forms}</ul>
      </div>
    </div>
  `;
}

function renderForm(key){
  const conf=M[key];
  if(!conf) return '';
  const fields = conf.f.map(([k,l,t,opt])=>{
    if(t==='s') return `<label style="display:block; margin-top:8px;">${l}<select id="f_${k}" style="width:100%; padding:8px; margin-top:4px;">${(opt||[]).map(o=>`<option value="${o}">${o}</option>`).join('')}</select></label>`;
    if(t==='a') return `<label style="display:block; margin-top:8px;">${l}<textarea id="f_${k}" style="width:100%; padding:8px; margin-top:4px; height:60px;"></textarea></label>`;
    return `<label style="display:block; margin-top:8px;">${l}<input type="${t==='d'?'date':t==='n'?'number':'text'}" id="f_${k}" style="width:100%; padding:8px; margin-top:4px;"></label>`;
  }).join('');

  const items = L(key).map((item, idx)=>`
    <div style="background:rgba(255,255,255,0.05); padding:10px; margin-top:10px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        ${conf.f.map(([k,l])=>item[k]?`<div><strong>${l}:</strong>${esc(item[k])}</div>`:'').join('')}
      </div>
      <button onclick="delItem('${key}',${idx})" style="background:none; border:none; color:#ff5555; cursor:pointer; font-size:16px;">✕</button>
    </div>
  `).join('');

  return `
    <div class="card">
      <h2>${conf.n}</h2>
      <form onsubmit="addItem(event,'${key}')" style="margin-top:10px;">
        ${fields}
        <button type="submit" class="btn-primary" style="margin-top:12px; width:100%; padding:10px;">+ Ajouter</button>
      </form>
      <div style="margin-top:20px;">${items}</div>
    </div>
  `;
}

function addItem(e, key){
  e.preventDefault();
  const obj={};
  M[key].f.forEach(([k])=>{
    const el=$(`#f_${k}`);
    if(el) obj[k]=el.value;
  });
  L(key).push(obj);
  save();
  render();
}

function delItem(key, idx){
  L(key).splice(idx,1);
  save();
  render();
}

function exportData(){
  const blob=new Blob([JSON.stringify(D,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`LIFE-PROJECT_backup_${td()}.json`;
  a.click();
}

function render(){
  nav();
  const main=$('#main');
  if(!main) return;
  if(tab==='home') main.innerHTML=renderHome();
  else if(tab==='portfolio') main.innerHTML=renderPortfolio();
  else main.innerHTML=renderForm(tab);
}

document.addEventListener('DOMContentLoaded', ()=>{
  idbGet(data=>{
    if(data && !D._saved){try{D=JSON.parse(data)}catch(e){}}
    render();
  });
});
