
const $=s=>document.querySelector(s);
const KEY='majorpromo_v2';let D={};try{D=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
function idbOpen(cb){try{const r=indexedDB.open('majorpromo',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>cb(r.result);r.onerror=()=>cb(null)}catch(e){cb(null)}}
function idbSet(v){idbOpen(db=>{if(!db)return;try{db.transaction('s','readwrite').objectStore('s').put(v,'D')}catch(e){}})}
function idbGet(cb){idbOpen(db=>{if(!db)return cb();try{const g=db.transaction('s').objectStore('s').get('D');g.onsuccess=()=>cb(g.result);g.onerror=()=>cb()}catch(e){cb()}})}
const save=()=>{D._saved=Date.now();const s=JSON.stringify(D);try{localStorage.setItem(KEY,s)}catch(e){}idbSet(s)};
const td=()=>new Date().toISOString().slice(0,10);
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L=k=>D[k]||(D[k]=[]);
const S1=['S1','S2','S3','S4','S5','S6'];
const M={
cours:{n:'Cours',f:[['titre','Cours / chapitre','t'],['ue','UE (ex : 2.1)','t'],['date','Date du cours (J+0)','d']]},
qcm:{n:'QCM',f:[['date','Date','d'],['ue','UE','t'],['chap','Chapitre','t'],['fait','QCM faits','n'],['ok','Réussis','n'],['err','Erreur récurrente / piège','a']]},
stages:{n:'Stages',f:[['lieu','Établissement / service','t'],['debut','Début','d'],['fin','Fin','d'],['obj','Objectifs (anatomie, physio, pharmaco, gestes)','a'],['journal','Journal : patient → problème → hypothèses → prise en charge → résultat','a'],['question','Question scientifique / à rechercher','a'],['bilan','Bilan : appris / incompris / compétences / lien médecine / lien recherche','a']]},
recherche:{n:'Recherche',f:[['sujet','Sujet / article','t'],['dom','Domaine','s',['Neurosciences','Cancérologie','Santé publique','Psychiatrie','Physiopathologie','IA en santé','Épidémiologie','Essais cliniques','Biologie','Tech médicales']],['q','Question','a'],['me','Méthode','a'],['re','Résultat','a'],['im','Implications','a'],['ret','Ce que je retiens','a'],['ev','Évolution possible','a'],['date','Date','d']]},
passerelle:{n:'Dossier passerelle',f:[['sem','Semestre','s',S1],['type','Type de preuve','s',['Notes','Classement','Stage','Évaluation','Compétence','Projet','Recherche','Formation','Responsabilité','Réflexion projet médical']],['titre','Titre','t'],['det','Détail / preuve de progression','a'],['date','Date','d']]},
finance:{n:'Finance',f:[['date','Date','d'],['type','Type','s',['Revenu','Dépense','Épargne','Investissement','Formation/compétences']],['mt','Montant (€)','n'],['lib','Libellé','t']]},
sante:{n:'Santé',f:[['date','Date','d'],['som','Sommeil (h)','n'],['en','Énergie (1-5)','s',['1','2','3','4','5']],['sport','Sport','s',['Aucun','Salle','Pilates','Boxe','Vélo','Course','Autre']],['note','Ce qui a dérapé / bien marché','a']]},
formations:{n:'Formations',f:[['titre','Formation / certification','t'],['pf','Plateforme','t'],['st','Statut','s',['À commencer','En cours','Terminée','Abandonnée']],['pr','Progression %','n'],['ut','Utilité pour le plan','t']]},
projets:{n:'Projets',f:[['titre','Projet','t'],['cat','Catégorie','s',['Site / code','Recherche','Revenu','Stage/réseau','Master','Autre']],['st','Statut','s',['Idée','En cours','Terminé','En pause']],['next','Prochaine action','t']]},
reseau:{n:'Réseau',f:[['nom','Nom','t'],['role','Rôle / service','t'],['ctx','Contexte de rencontre','t'],['date','Dernier contact','d'],['next','Prochaine étape','t']]},
td:{n:'TD',f:[['titre','TD','t'],['ue','UE','t'],['date','Échéance','d'],['type','Type','s',['TD simple','Suivi pédagogique']],['st','Statut','s',['À préparer','Préparé','Fait']]]},
edt:{n:'Emploi du temps',f:[['jour','Jour','s',['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']],['debut','Début (HH:MM)','t'],['fin','Fin (HH:MM)','t'],['titre','Bloc (cours, stage, sport…)','t'],['type','Type','s',['Fixe','Variable']]]},
hebdo:{n:'Pilotage dimanche',f:[['date','Semaine du','d'],['etu','Études : retards, erreurs','a'],['stg','Stages : compétences','a'],['rec','Recherche : article/question','a'],['fin','Finance : revenus/épargne','a'],['san','Santé : sommeil, sport','a'],['car','Carrière : une action','a'],['next','Priorités semaine suivante','a']]}
};
const SK=[['Sciences fondamentales + clinique',1],['Anglais scientifique',2],['Statistiques',3],['Recherche bibliographique',4],['Rédaction scientifique',5],['Excel / données',6],['Python',7],['IA en santé',8],['Communication scientifique',9]];
if(!D.comp)D.comp=SK.map(s=>0);
const TABS=[['home','🏠 Accueil'],['cours','📚 Cours'],['td','📝 TD'],['qcm','✅ QCM'],['planning','⏱ Planning'],['edt','🗓 EDT'],['stages','🏥 Stages'],['recherche','🔬 Recherche'],['passerelle','🩺 Passerelle'],['finance','💰 Finance'],['sante','🏃 Santé'],['comp','🧠 Compétences'],['formations','🎓 Formations'],['projets','🛠 Projets'],['reseau','🤝 Réseau'],['hebdo','🗓 Dimanche'],['plan','🧭 Plan 2026-36'],['data','💾 Données']];
let tab=D.tab||'home';
function go(t){tab=t;D.tab=t;save();render()}
function nav(){$('#nav').innerHTML=TABS.map(([k,l])=>`<button class="${k==tab?'on':''}" onclick="go('${k}')">${l}</button>`).join('')}
const J=[['j0',0],['j3',3],['j7',7],['j30',30]];
function cState(c){let o=[];J.forEach(([k,n])=>{const d=add(c.date,n);o.push({k,n,d,done:!!(c.done&&c.done[k]),st:c.done&&c.done[k]?'done':d<td()?'late':d==td()?'due':''})});return o}
function stats(){const cs=L('cours');let late=0,due=0,list=[];cs.forEach(c=>cState(c).forEach(s=>{if(!s.done&&s.st=='late'){late++;list.push([c,s])}if(!s.done&&s.st=='due'){due++;list.push([c,s])}}));
const q=L('qcm');const f=q.reduce((a,x)=>a+ +x.fait||0,0),o=q.reduce((a,x)=>a+ +x.ok||0,0);
const w=d=>d>=add(td(),-6);const sa=L('sante').filter(x=>w(x.date));const som=sa.filter(x=>x.som);const sleep=som.length?som.reduce((a,x)=>a+ +x.som,0)/som.length:null;
const sport=sa.filter(x=>x.sport&&x.sport!='Aucun').length;const rech=L('recherche').filter(x=>x.date&&w(x.date)).length;
const fin=L('finance');const sum=t=>fin.filter(x=>x.type==t).reduce((a,x)=>a+ +x.mt||0,0);
let streak=0;const ds=new Set(L('sante').map(x=>x.date));for(let i=0;ds.has(add(td(),-i));i++)streak++;
return{late,due,list,f,o,rate:f?Math.round(o/f*100):null,sleep,sport,rech,rev:sum('Revenu'),dep:sum('Dépense'),epa:sum('Épargne')+sum('Investissement'),streak}}
function home(){const s=stats();let sig=[[s.late==0,'Cours à jour'],[s.rate===null||s.rate>=75,'QCM ≥ 75 %'],[s.sleep===null||s.sleep>=7,'Sommeil ≥ 7 h'],[s.sport>=3,'Sport ≥ 3/sem'],[s.rech>=1,'Recherche ≥ 1/sem']];
const n=sig.filter(x=>x[0]).length;const col=n>=4?'#2e8b57':n>=2?'#d08a1a':'#c0392b';const lb=n>=4?'🟢 En avance':n>=2?'🟡 Stable':'🔴 Correction nécessaire';
const K=(v,l)=>`<div class="k"><b>${v}</b><span>${l}</span></div>`;
const tr=s.rev?Math.round(s.epa/s.rev*100)+' %':'—';
return `${bk()}<div class="traj" style="background:${col}">TRAJECTOIRE : ${lb}</div>
<p class="m">${sig.map(x=>(x[0]?'✓ ':'✗ ')+x[1]).join(' · ')}</p>
<h2>📚 Académique</h2><div class="grid">${K(s.late,'révisions en retard')}${K(s.due,'dues aujourd\'hui')}${K(s.rate===null?'—':s.rate+' %','réussite QCM')}${K(L('cours').length,'cours suivis')}${K(L('td').filter(x=>x.st=='À préparer').length,'TD à préparer')}</div>
<h2>🩺 Passerelle & science</h2><div class="grid">${K(L('passerelle').length,'preuves archivées')}${K(L('stages').length,'stages')}${K(L('recherche').length,'fiches recherche')}${K(s.rech,'articles cette semaine')}</div>
<h2>💰 Capital & santé</h2><div class="grid">${K(s.epa+' €','épargné/investi')}${K(tr,'taux d\'épargne')}${K(s.sleep===null?'—':s.sleep.toFixed(1)+' h','sommeil moy. 7j')}${K(s.sport,'séances 7j')}${K(s.streak,'jours de suivi santé')}</div>
<div class="card"><h3>🔁 À réviser en priorité</h3>${s.list.length?s.list.slice(0,10).map(([c,x])=>`<div>${esc(c.titre)} <span class="m">UE ${esc(c.ue)}</span> <span class="badge ${x.st}">J+${x.n} · ${x.d}</span></div>`).join(''):'<span class="m">Rien de dû. Ajoute tes cours dans l\'onglet Cours.</span>'}</div>
<div class="card"><h3>Règle des 5 niveaux</h3><p class="m">1 Obligatoire (cours/stages/examens) → 2 Stratégique (passerelle) → 3 Différenciation (recherche/réseau) → 4 Financier → 5 Bonus. Si le niveau 1 souffre, le niveau 5 disparaît immédiatement.</p></div>`}
function form(k){const m=M[k];return `<div class="card"><h3>Ajouter — ${m.n}</h3>${m.f.map(([f,l,t,o])=>`<label>${l}</label>`+(t=='a'?`<textarea id="f_${f}"></textarea>`:t=='s'?`<select id="f_${f}">${o.map(x=>`<option>${x}</option>`).join('')}</select>`:`<input id="f_${f}" type="${t=='d'?'date':t=='n'?'number':'text'}" ${t=='d'?`value="${td()}"`:''}>`)).join('')}<button class="btn" onclick="addI('${k}')">+ Ajouter</button></div>`}
function addI(k){const it={};M[k].f.forEach(([f])=>it[f]=$('#f_'+f).value);if(!Object.values(it).some(v=>v&&v!=td()))return;L(k).unshift(it);save();render()}
function del(k,i){if(confirm('Supprimer ?')){L(k).splice(i,1);save();render()}}
function tg(i,j){const c=L('cours')[i];c.done=c.done||{};c.done[j]=!c.done[j];save();render()}
function list(k){const m=M[k];const a=L(k);return a.map((x,i)=>{
if(k=='cours')return `<div class="card"><div class="row"><b>${esc(x.titre)} <span class="m">UE ${esc(x.ue)}</span></b><button class="btn s" onclick="del('cours',${i})">✕</button></div>${cState(x).map(s=>`<button class="badge ${s.st}" onclick="tg(${i},'${s.k}')">${s.done?'✓ ':''}J+${s.n} · ${s.d}</button>`).join('')}</div>`;
return `<div class="card"><div class="row"><b>${esc(x[m.f[0][0]])}</b><button class="btn s" onclick="del('${k}',${i})">✕</button></div>${m.f.slice(1).filter(([f])=>x[f]).map(([f,l])=>`<div class="m"><b>${l.split(' (')[0].split(' :')[0]} :</b> ${esc(x[f])}</div>`).join('')}</div>`}).join('')}
function extra(k){const a=L(k);if(k=='qcm'){const by={};a.forEach(x=>{const u=x.ue||'?';by[u]=by[u]||[0,0];by[u][0]+=+x.fait||0;by[u][1]+=+x.ok||0});return `<div class="card"><h3>Réussite par UE</h3>${Object.entries(by).map(([u,v])=>{const p=v[0]?Math.round(v[1]/v[0]*100):0;return `<div>UE ${esc(u)} — ${p} %<div class="bar"><i style="width:${p}%"></i></div></div>`}).join('')||'<span class="m">Aucune donnée</span>'}<p class="m">Objectif : > 17/20 sur les UE scientifiques (2.1, 2.2) dès le S1.</p></div>`}
if(k=='finance'){const s=stats();return `<div class="grid"><div class="k"><b>${s.rev} €</b><span>revenus</span></div><div class="k"><b>${s.dep} €</b><span>dépenses</span></div><div class="k"><b>${s.epa} €</b><span>épargne + invest.</span></div></div><p class="m">Ordre : sécurité → capital → compétences → zéro dette de consommation. Revenus secondaires ≤ énergie disponible. Données stockées uniquement dans ton navigateur.</p>`}
if(k=='passerelle'){const t=['Excellence académique','Compétence clinique','Cohérence : pourquoi médecine ?','Maturité : pourquoi maintenant ?','Projection : pourquoi médecin ?'];return `<div class="card"><h3>Le dossier doit raconter 5 choses</h3>${t.map((x,i)=>{const n=a.length;return `<div>① ${x}</div>`.replace('①',['①','②','③','④','⑤'][i])}).join('')}<p class="m">Récit : PASS difficile → réorientation réfléchie → excellence en sciences infirmières → clinique → recherche → projet médical. Le PASS n'est pas caché, il est expliqué. La passerelle : 2 candidatures possibles, procédure sélective — vérifier les règles au moment de candidater.</p><div>${S1.map(s=>`<span class="badge">${s} : ${a.filter(x=>x.sem==s).length}</span>`).join('')}</div></div>`}
if(k=='sante')return chart()+`<p class="m">Sommeil + sport + récupération = variables de performance, pas des récompenses.</p>`;
if(k=='stages')return `<p class="m">Avant : anatomie, physio, pathologies, pharmaco, gestes. Pendant : patient → problème → hypothèses → prise en charge → résultat → question scientifique.</p>`;
if(k=='recherche')return `<p class="m">1 article/semaine suffit en L1. Grille : Question → Méthode → Résultat → Implications → Retenu → Évolution.</p>`;
if(k=='cours')return `<p class="m">Clique un jalon pour le valider. Rouge = en retard, orange = aujourd'hui. J0 fiche de flux complète · J3 flux de mémoire sur brouillon · J7 titres et flèches · J30 concept central.</p>`;
return ''}
function comp(){return `<div class="card"><h3>Compétences à accumuler (priorité 1 → 9)</h3>${SK.map((s,i)=>`<label>${s[1]}. ${s[0]} — niveau ${D.comp[i]}/5</label><input type="range" min="0" max="5" value="${D.comp[i]}" onchange="D.comp[${i}]=+this.value;save();render()">`).join('')}</div><p class="m">Une certification terminée et maîtrisée > cinq commencées. Hiérarchie : notes/compétences > stages > recherche > projets > formations > extras.</p>`}
function plan(){const P=[['2026-27 · IFSI 1','Excellence : major/top niveau, système J, Anki/QCM, fiches de flux, stages, sport, sommeil, anglais, recherche légère, site opérationnel.'],['2027-28 · IFSI 2','Excellence + différenciation : stages stratégiques, premiers projets de recherche, statistiques, anglais scientifique, réseau hospitalo-universitaire, revenus, capital.'],['2028-29 · IFSI 3','Dossier passerelle : notes, stages cohérents, mémoire, recherche, projet médical clair, CV, lettre, oral, candidature.'],['2029+ · DEI','Passerelle acceptée → médecine. Sinon : emploi IDE + spécialisation/master + 2e candidature si autorisée. Branches parallèles : IADE (2 ans) ou IPA (grade master).'],['Médecine → Recherche','Spécialisation + master santé publique ou recherche → doctorat → CHU / Inserm / université / industrie. Master seul ≠ Inserm : il faut un doctorat.']];
return P.map(p=>`<div class="card"><h3>${p[0]}</h3><div class="m">${p[1]}</div></div>`).join('')+`<div class="card"><h3>Arbre de décision</h3><pre>DEI ─┬─ PASSERELLE → MÉDECINE → spé → master/recherche → doctorat → Inserm/CHU/industrie
     ├─ IADE (2 ans)
     └─ IPA + master</pre><p class="m">Les branches ne sont pas contradictoires : garder plusieurs options ouvertes jusqu'à ce que les données réelles (notes, stages, recherche, passerelle) tranchent.</p></div>
<div class="card"><h3>3 moteurs</h3><div class="m">🧠 Excellence · 🔬 Science · 💰 Capital — une étape principale, plusieurs capitaux en parallèle.</div></div>
<div class="card"><h3>5 méthodes d'élite</h3><div class="m">M1 Fiches de flux (zéro phrase, cause → effet, recto/verso) · M2 Tableau blanc (réécriture de mémoire, corrections en vert) · M3 Grille d'évaluation inversée (UE 4.1) · M4 Carnet de liaison clinique (mécanisme → symptômes → surveillance) · M5 Reverse engineering QCM (3 pièges en rouge) + réécriture espacée J0/J3/J7/J30.</div></div>
<div class="card"><h3>10 règles</h3><div class="m">1 Réussir brillamment l'IFSI · 2 Le site = système de pilotage · 3 Aucune dette de cours · 4 Chaque stage = compétence + question scientifique · 5 Dossier construit sur 3 ans · 6 PASS = preuve de progression · 7 Recherche tôt, faible dose · 8 Anglais, stats, data, IA progressifs · 9 Faibles dépenses = capital · 10 Options ouvertes jusqu'aux données.</div></div>`}
function data(){return `<div class="card"><h3>Sauvegarde</h3><p class="m" id="pinfo">…</p><p class="m">Les données restent dans ce navigateur. Exporte régulièrement.</p><button class="btn" onclick="ex()">📤 Exporter .json</button><label>Importer (remplace tout)</label><input type="file" accept=".json" onchange="im(this)"><button class="btn" style="background:var(--r)" onclick="if(confirm('Tout effacer ?')){D={};save();location.reload()}">Tout effacer</button></div>`}
function ex(){D._exp=Date.now();save();const b=new Blob([JSON.stringify(D)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='programme-major-'+td()+'.json';a.click()}
function im(i){const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{D=JSON.parse(r.result);save();location.reload()}catch(e){alert('Fichier invalide')}};r.readAsText(f)}
function render(){nav();let h='';if(tab=='home')h=home();else if(tab=='comp')h=comp();else if(tab=='plan')h=plan();else if(tab=='data'){h=data();setTimeout(pinfo,0)}else if(tab=='planning')h=planner();else h=`<h2>${TABS.find(t=>t[0]==tab)[1]}</h2>${extra(tab)}${form(tab)}${list(tab)}`;$('#main').innerHTML=h}
render();

/* ---- Ajouts v2 ---- */
function bk(){const t=D._exp||0;if(Date.now()-t<6048e5)return '';return `<div class="card" style="border-color:var(--o)">⚠️ Sauvegarde .json ${t?'ancienne (> 7 jours)':'jamais faite'}. <button class="btn" onclick="ex()">📤 Exporter maintenant</button></div>`}
function pinfo(){const e=$('#pinfo');if(!e)return;const s=D._saved?new Date(D._saved).toLocaleString('fr-FR'):'—';const p=navigator.storage&&navigator.storage.persisted?navigator.storage.persisted():Promise.resolve(false);p.then(v=>{e.innerHTML='Dernier enregistrement : '+s+' · Stockage protégé : '+(v?'oui ✅':'non (fais des exports)')+' · Dernier export : '+(D._exp?new Date(D._exp).toLocaleDateString('fr-FR'):'jamais')})}
function chart(){const days=[];for(let i=13;i>=0;i--)days.push(add(td(),-i));const v=days.map(d=>{const x=L('sante').find(s=>s.date==d&&s.som);return x?+x.som:0});const w=300/14;return `<div class="card"><h3>Sommeil — 14 jours</h3><svg viewBox="0 0 300 90" width="100%">${v.map((h,i)=>`<rect x="${i*w+2}" y="${80-h*8}" width="${w-4}" height="${h*8}" rx="2" fill="${h>=7?'#2e8b57':h?'#d08a1a':'none'}"/>`).join('')}<line x1="0" x2="300" y1="24" y2="24" stroke="#888" stroke-dasharray="3"/></svg><span class="m">Ligne = 7 h</span></div>`}
function planner(){return `<div class="card"><h3>Générateur de planning</h3><p class="m">Priorité : révisions en retard → dues aujourd'hui → nouveaux cours → QCM. J+0 = 45 min, J+3 = 20, J+7 = 10, J+30 = 5, nouveau cours = 60, QCM ≈ 30 s chacun.</p><label>Heure de début</label><input id="p_s" type="time" value="18:00"><label>Temps disponible (h)</label><input id="p_h" type="number" value="3" step="0.5"><label>Nouveaux cours</label><input id="p_n" type="number" value="1"><label>QCM à faire</label><input id="p_q" type="number" value="20"><button class="btn" onclick="genPlan()">🎯 Générer</button></div><div id="p_out"></div>`}
function fmt(m){m=Math.round(m);return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0')}
function genPlan(){const a=($('#p_s').value||'18:00').split(':').map(Number);let t=a[0]*60+a[1];const end=t+(+$('#p_h').value||0)*60;const dur={0:45,3:20,7:10,30:5};
const q=[...stats().list].sort((x,y)=>(x[1].st=='late'?0:1)-(y[1].st=='late'?0:1));const items=q.map(([c,s])=>['Révision J+'+s.n+' — '+c.titre,dur[s.n]]);
for(let i=0;i<(+$('#p_n').value||0);i++)items.push(['Nouveau cours (fiche de flux)',60]);
const nq=+$('#p_q').value||0;if(nq)items.push(['QCM × '+nq,Math.max(10,Math.round(nq*.5))]);
let out='',skip='';items.forEach(([n,d])=>{if(t+d<=end){out+=`<div class="card"><b>${fmt(t)}–${fmt(t+d)}</b> ${esc(n)}</div>`;t+=d}else skip+=`<div class="m">↪ reporté : ${esc(n)}</div>`});
const j=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][new Date().getDay()];const fx=L('edt').filter(e=>e.jour==j).map(e=>`<div class="m">📌 ${esc(e.debut)}–${esc(e.fin)} ${esc(e.titre)} (${esc(e.type)})</div>`).join('');
$('#p_out').innerHTML=(fx?`<div class="card"><h3>Blocs fixes aujourd'hui (${j})</h3>${fx}</div>`:'')+(out||'<p class="m">Rien à planifier.</p>')+skip}

/* Persistance durable */
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
if(!localStorage.getItem(KEY))idbGet(v=>{if(v){try{D=JSON.parse(v);if(!D.comp)D.comp=SK.map(s=>0);tab=D.tab||'home';render()}catch(e){}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)save()});
window.addEventListener('pagehide',save);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
