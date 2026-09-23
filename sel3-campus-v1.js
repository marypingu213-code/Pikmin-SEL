/* SEL3 校園真實情境題庫 v1 — 2026-09-23
   只負責 SEL3 四階段任務；不修改 SEL2/4/5。
   每題與每個答案都有固定 ID，預留未來 Firebase 歷程比較。 */
(function () {
  const SCENARIOS = [
    {
      id: 'SEL3-SC-01',
      title: '同學叫我不喜歡的綽號',
      situation: '同學叫了我一個不喜歡的綽號，我覺得很生氣，很想拿東西丟他。',
      stages: [
        { key:'see', label:'① 看見', help:'先找出真的看到、聽到的事情，不急著下結論。', question:'我真的看見或聽見了什麼？', options:[
          {id:'SEE-A',text:'同學用我不喜歡的綽號叫我。',kind:'best'},
          {id:'SEE-B',text:'同學就是故意想惹我生氣。',kind:'guess'},
          {id:'SEE-C',text:'同學討厭我。',kind:'guess'},
          {id:'SEE-D',text:'我不知道。',kind:'ok'}]},
        { key:'think', label:'② 猜想', help:'可以想幾種可能，但記得「猜想」不一定是真的。', question:'可能發生什麼事？', options:[
          {id:'THINK-A',text:'他可能不知道我不喜歡這個稱呼。',kind:'good'},
          {id:'THINK-B',text:'他可能故意想讓我生氣。',kind:'ok'},
          {id:'THINK-C',text:'可能還有其他原因，我現在還不知道。',kind:'best'},
          {id:'THINK-D',text:'他一定討厭我。',kind:'guess'}]},
        { key:'ask', label:'③ 問問看', help:'用安全、尊重的方式確認，也可以清楚說出自己的感受。', question:'我可以怎麼說或怎麼問？', options:[
          {id:'ASK-A',text:'「你為什麼這樣叫我？」',kind:'ok'},
          {id:'ASK-B',text:'「我不喜歡這個綽號，你可以不要這樣叫我嗎？」',kind:'best'},
          {id:'ASK-C',text:'不問，直接認定他是故意的。',kind:'guess'},
          {id:'ASK-D',text:'我不知道要怎麼說。',kind:'ok'}]},
        { key:'act', label:'④ 行動', help:'選擇安全、尊重自己也尊重別人的做法。', question:'接下來我可以怎麼做？', options:[
          {id:'ACT-A',text:'拿東西丟他。',kind:'unsafe'},
          {id:'ACT-B',text:'罵他或對他比中指。',kind:'unsafe'},
          {id:'ACT-C',text:'告訴他我不喜歡；如果他繼續，可以找老師協助。',kind:'best'},
          {id:'ACT-D',text:'先離開，讓自己冷靜一下，再處理。',kind:'good'}]}
      ]
    },
    {
      id: 'SEL3-SC-02',
      title: '樓梯上的同學',
      situation: '走樓梯時，前面的同學走得比較慢，我覺得他擋到我，很想拉他快一點。',
      stages: [
        {key:'see',label:'① 看見',help:'把「看到的事實」和「自己的猜想」分開。',question:'我真的看見了什麼？',options:[
          {id:'SEE-A',text:'前面的同學走得比較慢。',kind:'best'},
          {id:'SEE-B',text:'他故意擋住我。',kind:'guess'},
          {id:'SEE-C',text:'他就是不想讓我走。',kind:'guess'},
          {id:'SEE-D',text:'我不知道。',kind:'ok'}]},
        {key:'think',label:'② 猜想',help:'同一件事可能有很多原因。',question:'他走得比較慢，可能是什麼原因？',options:[
          {id:'THINK-A',text:'他可能需要比較多時間走樓梯。',kind:'good'},
          {id:'THINK-B',text:'他可能沒有注意到我在後面。',kind:'good'},
          {id:'THINK-C',text:'他可能故意要擋我。',kind:'ok'},
          {id:'THINK-D',text:'我還不知道原因。',kind:'best'}]},
        {key:'ask',label:'③ 問問看',help:'先用說的確認，不用手拉或推。',question:'我可以怎麼問？',options:[
          {id:'ASK-A',text:'「你需要幫忙嗎？」',kind:'best'},
          {id:'ASK-B',text:'「我可以先走嗎？」',kind:'best'},
          {id:'ASK-C',text:'「你為什麼走這麼慢？」',kind:'ok'},
          {id:'ASK-D',text:'不用問，直接拉他。',kind:'unsafe'}]},
        {key:'act',label:'④ 行動',help:'樓梯上先顧安全，再想怎麼前進。',question:'接下來怎麼做比較安全？',options:[
          {id:'ACT-A',text:'從後面拉他快一點。',kind:'unsafe'},
          {id:'ACT-B',text:'推他一下。',kind:'unsafe'},
          {id:'ACT-C',text:'保持安全距離，等一下或詢問能不能先走。',kind:'best'},
          {id:'ACT-D',text:'如果不知道怎麼處理，可以請老師協助。',kind:'good'}]}
      ]
    },
    {
      id: 'SEL3-SC-03',
      title: '我想碰同學',
      situation: '我很想靠近同學，也想摸摸他的身體，但是我還不知道他願不願意。',
      stages: [
        {key:'see',label:'① 看見',help:'先注意自己的想法，也分清楚哪些事還不知道。',question:'現在我真正知道的是什麼？',options:[
          {id:'SEE-A',text:'我現在很想靠近或碰同學。',kind:'best'},
          {id:'SEE-B',text:'同學一定想讓我碰。',kind:'guess'},
          {id:'SEE-C',text:'我們是同學，所以我可以碰他。',kind:'guess'},
          {id:'SEE-D',text:'我不知道對方願不願意。',kind:'good'}]},
        {key:'think',label:'② 猜想',help:'對方的身體感受要由對方自己決定。',question:'對方可能怎麼想？',options:[
          {id:'THINK-A',text:'他可能願意，也可能不願意。',kind:'best'},
          {id:'THINK-B',text:'只要我喜歡他，他就會願意。',kind:'guess'},
          {id:'THINK-C',text:'他沒有說不要，就代表可以。',kind:'guess'},
          {id:'THINK-D',text:'我不能只靠猜的。',kind:'best'}]},
        {key:'ask',label:'③ 問問看',help:'碰別人的身體以前，先清楚詢問。',question:'我可以怎麼問？',options:[
          {id:'ASK-A',text:'「我可以碰你的手嗎？」',kind:'best'},
          {id:'ASK-B',text:'先碰了再問。',kind:'unsafe'},
          {id:'ASK-C',text:'不用問，因為我們是朋友。',kind:'guess'},
          {id:'ASK-D',text:'我不知道怎麼問。',kind:'ok'}]},
        {key:'act',label:'④ 行動',help:'尊重對方說「可以」或「不要」，不確定就先不碰。',question:'接下來我可以怎麼做？',options:[
          {id:'ACT-A',text:'對方說可以，我再依照他同意的方式互動。',kind:'best'},
          {id:'ACT-B',text:'對方說不要，我就停止並保持距離。',kind:'best'},
          {id:'ACT-C',text:'對方說不要，我還是再碰一次看看。',kind:'unsafe'},
          {id:'ACT-D',text:'如果不確定，就先不要碰。',kind:'good'}]}
      ]
    }
  ];

  function boot(){
    const root=document.getElementById('sel3-real-interaction');
    if(!root) return;
    root.innerHTML=`
      <div class="flex items-center justify-between gap-3 mb-3">
        <button type="button" id="s3-home" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-black">← 回基地總部</button>
        <div id="s3-count" class="text-sm font-black text-emerald-700"></div>
      </div>
      <div id="s3-situation" class="text-3xl md:text-4xl font-black text-slate-900 text-left leading-snug mb-4"></div>
      <div class="text-center mb-3"><div class="text-2xl md:text-3xl font-black text-emerald-800">① 看見 → ② 猜想 → ③ 問問看 → ④ 行動</div><div class="text-base md:text-lg font-bold text-slate-600 mt-1">先看事實，再想可能；問清楚後，選擇安全又尊重的行動。</div></div>
      <div id="s3-columns" class="grid grid-cols-4 gap-3"></div>
      <div class="flex justify-between items-center mt-5"><div id="s3-summary" class="text-sm font-bold text-slate-600"></div><button type="button" id="s3-next" class="hidden px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black">下一題 ➜</button></div>`;
    let scenarioIndex=0; let answers={};
    const cls={see:'bg-sky-50 border-sky-200',think:'bg-violet-50 border-violet-200',ask:'bg-amber-50 border-amber-200',act:'bg-emerald-50 border-emerald-200'};
    function render(){
      answers={}; const s=SCENARIOS[scenarioIndex];
      root.querySelector('#s3-count').textContent=`情境 ${scenarioIndex+1} / ${SCENARIOS.length} · ${s.id}`;
      root.querySelector('#s3-situation').textContent=`情境｜${s.situation}`;
      const cols=root.querySelector('#s3-columns'); cols.innerHTML='';
      s.stages.forEach((stage,stageIndex)=>{
        const col=document.createElement('section'); col.className=`rounded-2xl border-2 p-3 min-w-0 ${cls[stage.key]}`;
        col.innerHTML=`<div class="text-xl font-black text-center text-slate-900">${stage.label}</div><div class="min-h-[52px] mt-1 text-sm font-bold text-slate-600 text-center flex items-center justify-center">${stage.help}</div><div class="mt-2 mb-2 text-base font-black text-slate-800">${stage.question}</div><div class="space-y-2" data-options></div><div class="mt-2 min-h-[44px] rounded-xl bg-white/70 p-2 text-sm font-black text-slate-700" data-answer>尚未選擇</div>`;
        const box=col.querySelector('[data-options]');
        stage.options.forEach(opt=>{
          const b=document.createElement('button'); b.type='button'; b.className='w-full rounded-xl border-2 border-white bg-white px-3 py-3 text-left text-sm md:text-base font-bold text-slate-800 shadow-sm hover:border-emerald-300 active:scale-[.99]'; b.textContent=opt.text;
          b.onclick=()=>{ answers[stage.key]={scenarioId:s.id,stage:stage.key,answerId:opt.id,answerText:opt.text,kind:opt.kind}; [...box.children].forEach(x=>x.classList.remove('ring-4','ring-emerald-300','border-emerald-500')); b.classList.add('ring-4','ring-emerald-300','border-emerald-500'); col.querySelector('[data-answer]').textContent=`我的答案：${opt.text}`; updateSummary(); };
          box.appendChild(b);
        }); cols.appendChild(col);
      });
      root.querySelector('#s3-next').classList.add('hidden'); root.querySelector('#s3-summary').textContent='從左到右完成四個步驟；選過的答案會留在畫面上。';
      if(window.lucide) lucide.createIcons();
    }
    function updateSummary(){ const n=Object.keys(answers).length; root.querySelector('#s3-summary').textContent=`已完成 ${n} / 4 個步驟`; if(n===4) root.querySelector('#s3-next').classList.remove('hidden'); }
    root.querySelector('#s3-next').onclick=()=>{ scenarioIndex=(scenarioIndex+1)%SCENARIOS.length; render(); };
    root.querySelector('#s3-home').onclick=()=>{ if(typeof window.switchTab==='function') window.switchTab('home'); };
    window.SEL3_CAMPUS_SCENARIOS_V1=SCENARIOS;
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();