import { useState, useEffect, useRef } from "react";

function OilTimeLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <circle cx="50" cy="50" r="46" stroke="#6366f1" strokeWidth="3" fill="#0f172a" />
      <path d="M50 22 C50 22 30 45 30 58 C30 70 39 78 50 78 C61 78 70 70 70 58 C70 45 50 22 50 22Z" fill="#6366f1" opacity="0.9" />
      <path d="M44 52 C44 52 40 58 40 63 C40 68 44 72 49 72" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" fill="none" />
      <circle cx="50" cy="58" r="2.2" fill="white" opacity="0.9" />
      <line x1="50" y1="58" x2="50" y2="47" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <line x1="50" y1="58" x2="57" y2="61" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180;
        return <line key={i} x1={50+42*Math.cos(rad)} y1={50+42*Math.sin(rad)} x2={50+38*Math.cos(rad)} y2={50+38*Math.sin(rad)} stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function AppNameHeader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:"10px 20px 6px", borderBottom:"1px solid #1e293b" }}>
      <OilTimeLogo size={28} />
      <span style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.5px", background:"linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        Oil Time
      </span>
    </div>
  );
}

const SCREENS = { LOGIN:"login", ONBOARDING:"onboarding", HOME:"home", DRIVING:"driving", REPORT:"report", HISTORY:"history", FEEDBACK:"feedback", ADMIN:"admin" };

// ── 차종 데이터 (carData.js 분리 예정) ────────────────────────────
const CAR_DATA = [
  { maker:"현대", models:[
    {name:"아반떼",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","LPG","하이브리드"],oilSpec:"5W-30"},
    {name:"소나타",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","LPG","하이브리드"],oilSpec:"5W-30"},
    {name:"그랜저",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","LPG","하이브리드"],oilSpec:"5W-30"},
    {name:"투싼",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"싼타페",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-40"},
    {name:"팰리세이드",years:[2024,2023,2022,2021,2020,2019,2018],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"코나",years:[2024,2023,2022,2021,2020,2019,2018,2017],fuel:["가솔린","전기","하이브리드"],oilSpec:"5W-30"},
    {name:"아이오닉5",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
    {name:"아이오닉6",years:[2024,2023,2022],fuel:["전기"],oilSpec:"-"},
    {name:"스타리아",years:[2024,2023,2022,2021],fuel:["가솔린","디젤","LPG"],oilSpec:"5W-30"},
    {name:"베뉴",years:[2024,2023,2022,2021,2020,2019],fuel:["가솔린"],oilSpec:"5W-30"},
    {name:"캐스퍼",years:[2024,2023,2022,2021],fuel:["가솔린","전기"],oilSpec:"0W-20"},
    {name:"벨로스터",years:[2019,2018,2017,2016,2015,2014,2013,2012,2011],fuel:["가솔린"],oilSpec:"5W-30"},
  ]},
  { maker:"기아", models:[
    {name:"K3",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012],fuel:["가솔린","LPG"],oilSpec:"5W-30"},
    {name:"K5",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","LPG","하이브리드"],oilSpec:"5W-30"},
    {name:"K8",years:[2024,2023,2022,2021],fuel:["가솔린","LPG","하이브리드"],oilSpec:"5W-30"},
    {name:"K9",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012],fuel:["가솔린","LPG"],oilSpec:"5W-30"},
    {name:"스포티지",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"쏘렌토",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"카니발",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014],fuel:["가솔린","디젤","LPG"],oilSpec:"5W-30"},
    {name:"셀토스",years:[2024,2023,2022,2021,2020,2019],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"니로",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016],fuel:["하이브리드","전기","LPG"],oilSpec:"0W-20"},
    {name:"EV6",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
    {name:"EV9",years:[2024,2023],fuel:["전기"],oilSpec:"-"},
    {name:"모하비",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["디젤"],oilSpec:"5W-40"},
    {name:"스팅어",years:[2023,2022,2021,2020,2019,2018,2017],fuel:["가솔린"],oilSpec:"5W-30"},
    {name:"레이",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011],fuel:["가솔린","LPG","전기"],oilSpec:"5W-30"},
    {name:"모닝",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","LPG"],oilSpec:"5W-30"},
  ]},
  { maker:"제네시스", models:[
    {name:"G70",years:[2024,2023,2022,2021,2020,2019,2018,2017],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"G80",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016],fuel:["가솔린","전기"],oilSpec:"5W-30"},
    {name:"G90",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린","LPG"],oilSpec:"5W-30"},
    {name:"GV70",years:[2024,2023,2022,2021,2020],fuel:["가솔린","디젤","전기"],oilSpec:"5W-30"},
    {name:"GV80",years:[2024,2023,2022,2021,2020],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"GV60",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
  ]},
  { maker:"쌍용(KG모빌리티)", models:[
    {name:"티볼리",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"코란도",years:[2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","전기"],oilSpec:"5W-40"},
    {name:"렉스턴",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["디젤"],oilSpec:"5W-40"},
    {name:"렉스턴스포츠",years:[2024,2023,2022,2021,2020,2019,2018],fuel:["디젤"],oilSpec:"5W-40"},
    {name:"토레스",years:[2024,2023,2022],fuel:["가솔린","전기"],oilSpec:"5W-30"},
  ]},
  { maker:"르노코리아", models:[
    {name:"SM6",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016],fuel:["가솔린","LPG"],oilSpec:"5W-40"},
    {name:"QM6",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016],fuel:["가솔린","LPG","디젤"],oilSpec:"5W-40"},
    {name:"XM3",years:[2024,2023,2022,2021,2020],fuel:["가솔린","하이브리드"],oilSpec:"5W-40"},
    {name:"SM5",years:[2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","LPG"],oilSpec:"5W-40"},
    {name:"SM3",years:[2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","전기"],oilSpec:"5W-40"},
  ]},
  { maker:"BMW", models:[
    {name:"1시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"0W-30"},
    {name:"3시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-30"},
    {name:"5시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-30"},
    {name:"7시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-30"},
    {name:"X1",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","전기"],oilSpec:"0W-30"},
    {name:"X3",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-30"},
    {name:"X5",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-40"},
    {name:"X7",years:[2024,2023,2022,2021,2020,2019],fuel:["가솔린","디젤","하이브리드"],oilSpec:"0W-40"},
    {name:"iX",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
    {name:"i4",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
    {name:"4시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013],fuel:["가솔린","디젤"],oilSpec:"0W-30"},
    {name:"2시리즈",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013],fuel:["가솔린","디젤"],oilSpec:"0W-30"},
  ]},
  { maker:"벤츠", models:[
    {name:"A클래스",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"C클래스",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"E클래스",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"S클래스",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"GLC",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"GLE",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-30"},
    {name:"CLA",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"GLB",years:[2024,2023,2022,2021,2020,2019],fuel:["가솔린","디젤"],oilSpec:"5W-30"},
    {name:"EQS",years:[2024,2023,2022,2021],fuel:["전기"],oilSpec:"-"},
    {name:"EQE",years:[2024,2023,2022],fuel:["전기"],oilSpec:"-"},
  ]},
  { maker:"아우디", models:[
    {name:"A3",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"A4",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"A5",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"A6",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"Q3",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"Q5",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤","하이브리드"],oilSpec:"5W-40"},
    {name:"Q7",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"Q8",years:[2024,2023,2022,2021,2020,2019,2018],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
    {name:"e-tron",years:[2024,2023,2022,2021,2020,2019],fuel:["전기"],oilSpec:"-"},
    {name:"A7",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","디젤"],oilSpec:"5W-40"},
  ]},
  { maker:"도요타", models:[
    {name:"캠리",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"RAV4",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"프리우스",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["하이브리드"],oilSpec:"0W-20"},
    {name:"하이랜더",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"알파드",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"코롤라",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"bZ4X",years:[2024,2023,2022],fuel:["전기"],oilSpec:"-"},
    {name:"시에나",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
  ]},
  { maker:"혼다", models:[
    {name:"어코드",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"CR-V",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"시빅",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
    {name:"HR-V",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015],fuel:["가솔린"],oilSpec:"0W-20"},
    {name:"파일럿",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016],fuel:["가솔린"],oilSpec:"0W-20"},
    {name:"오디세이",years:[2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010],fuel:["가솔린"],oilSpec:"0W-20"},
    {name:"ZR-V",years:[2024,2023],fuel:["가솔린","하이브리드"],oilSpec:"0W-20"},
  ]},
];

const MAKERS = CAR_DATA.map(d => d.maker);
function getModels(maker) { return (CAR_DATA.find(d=>d.maker===maker)||{models:[]}).models; }
function getYears(maker, model) { return (getModels(maker).find(m=>m.name===model)||{years:[]}).years; }
function getFuels(maker, model) { return (getModels(maker).find(m=>m.name===model)||{fuel:[]}).fuel; }
function getOilSpec(maker, model) { return (getModels(maker).find(m=>m.name===model)||{}).oilSpec || null; }
function getRecommendedKm(fuel) { return fuel==="디젤"?15000:fuel==="전기"||fuel==="수소"?null:10000; }

const MOCK_USERS = [
  { uid:"admin_001", email:"admin@oiltime.app", name:"관리자", isAdmin:true },
  { uid:"user_001", email:"kim@gmail.com", name:"김민준", isAdmin:false, car:{maker:"현대",model:"아반떼",year:"2022",fuel:"가솔린"}, health:79, accumulated:{km:3240,engineHour:48.5,daysSince:127} },
  { uid:"user_002", email:"lee@gmail.com", name:"이수진", isAdmin:false, car:{maker:"기아",model:"K5",year:"2021",fuel:"가솔린"}, health:52, accumulated:{km:7800,engineHour:112,daysSince:290} },
  { uid:"user_003", email:"park@gmail.com", name:"박지영", isAdmin:false, car:{maker:"BMW",model:"320i",year:"2023",fuel:"가솔린"}, health:91, accumulated:{km:1200,engineHour:18,daysSince:45} },
];

const INIT_FEEDBACK = [
  { id:"fb_001", uid:"user_001", name:"김민준", date:"2024-11-12", text:"저속 구간 가중치를 사용자가 직접 조정할 수 있으면 좋겠어요.", read:false },
  { id:"fb_002", uid:"user_002", name:"이수진", date:"2024-11-18", text:"블루투스 연결이 가끔 끊기는데 재연결 알림이 있으면 좋을 것 같아요.", read:true },
  { id:"fb_003", uid:"user_003", name:"박지영", date:"2024-12-01", text:"엔진오일 교체 후 정비소 기록도 같이 저장할 수 있으면 좋겠습니다.", read:false },
];

const HC = (v) => v > 70 ? "#4ade80" : v > 40 ? "#facc15" : "#f87171";
const SC = { 저속:"#f87171", 일반:"#facc15", 고속:"#4ade80" };

function fmt(sec) {
  const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=sec%60;
  if(h>0) return `${h}시간 ${m}분`;
  if(m>0) return `${m}분 ${s}초`;
  return `${s}초`;
}

function remaining(health, acc, fuel) {
  const kmLimit = fuel==="디젤"?15000:10000;
  const kmLeft = kmLimit - acc.km;
  const dayLeft = 365 - acc.daysSince;
  if(health<20||kmLeft<0||dayLeft<0) return "교체 필요";
  return `약 ${Math.max(0,Math.min(dayLeft,Math.floor(kmLeft/30),Math.floor(health*2)))}일 후`;
}

// ── Login ─────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [showAccounts, setShowAccounts] = useState(false);
  const [loading, setLoading] = useState(false);

  function select(u) {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(u); }, 800);
  }

  return (
    <div style={S.loginWrap}>
      <div style={S.loginCard}>
        <OilTimeLogo size={80} />
        <div style={S.loginTitle}>Oil Time</div>
        <div style={S.loginSub}>스마트 엔진오일 관리 파트너</div>

        {!showAccounts ? (
          <button style={S.googleBtn} onClick={() => setShowAccounts(true)}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.32-8.16 2.32-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google로 계속하기
          </button>
        ) : loading ? (
          <div style={S.loadingText}>로그인 중...</div>
        ) : (
          <div style={S.accountList}>
            <div style={S.accountListLabel}>계정 선택</div>
            {MOCK_USERS.map(u => (
              <button key={u.uid} style={S.accountItem} onClick={() => select(u)}>
                <div style={S.accountAvatar}>{u.name[0]}</div>
                <div>
                  <div style={S.accountName}>
                    {u.name}
                    {u.isAdmin && <span style={S.adminBadge}>관리자</span>}
                  </div>
                  <div style={S.accountEmail}>{u.email}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        <div style={S.loginNotice}>로그인 시 서비스 이용약관에 동의하게 됩니다</div>
      </div>
    </div>
  );
}

// ── Onboarding ────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ maker:"", model:"", year:"", fuel:"" });

  const models = form.maker ? getModels(form.maker).map(m=>m.name) : [];
  const years  = form.model ? getYears(form.maker, form.model).map(String) : [];
  const fuels  = form.model ? getFuels(form.maker, form.model) : [];
  const oilSpec = form.model ? getOilSpec(form.maker, form.model) : null;
  const isEV = form.fuel === "전기" || form.fuel === "수소";

  const steps = [
    { label:"제조사 선택", field:"maker", options:MAKERS },
    { label:"차종 선택",   field:"model", options:models  },
    { label:"연식 선택",   field:"year",  options:years   },
    { label:"연료 타입",   field:"fuel",  options:fuels   },
  ];

  const cur = steps[step];
  const ok = form[cur.field] !== "";

  function pickOption(o) {
    const next = {...form, [cur.field]: o};
    // 제조사 바뀌면 하위 초기화
    if(cur.field === "maker") next.model = next.year = next.fuel = "";
    if(cur.field === "model") next.year = next.fuel = "";
    setForm(next);
  }

  function goNext() {
    if(step < steps.length - 1) setStep(step + 1);
    else onComplete({...form, oilSpec, isEV, recommendedKm: getRecommendedKm(form.fuel)});
  }

  function goBack() { if(step > 0) setStep(step - 1); }

  return (
    <div style={S.onboardWrap}>
      <div style={S.onboardCard}>
        <div style={S.onboardTop}>
          <OilTimeLogo size={72} />
          <div style={S.onboardTitle}>차량 등록</div>
          <div style={S.onboardSub}>내 차량 정보를 입력하면<br/>최적의 교체 주기를 계산해드려요</div>
        </div>

        {/* Step indicator */}
        <div style={S.stepBar}>{steps.map((_,i)=>(
          <div key={i} style={{...S.stepDot, background:i<step?"#6366f1":i===step?"#818cf8":"#334155", transform:i===step?"scale(1.3)":"scale(1)", transition:"all 0.3s"}}/>
        ))}</div>

        {/* Breadcrumb */}
        {step > 0 && (
          <div style={S.breadcrumb}>
            {step>=1&&<span style={S.breadcrumbChip}>{form.maker}</span>}
            {step>=2&&<span style={S.breadcrumbChip}>{form.model}</span>}
            {step>=3&&<span style={S.breadcrumbChip}>{form.year}년</span>}
          </div>
        )}

        <div style={S.onboardLabel}>{cur.label}</div>

        {/* 오일 스펙 표시 (4단계에서) */}
        {step === 3 && oilSpec && oilSpec !== "-" && (
          <div style={S.oilSpecBadge}>권장 오일: <strong>{oilSpec}</strong></div>
        )}
        {step === 3 && isEV && (
          <div style={{...S.oilSpecBadge, background:"rgba(74,222,128,0.1)", borderColor:"rgba(74,222,128,0.3)", color:"#4ade80"}}>전기차는 엔진오일이 필요 없어요 ⚡</div>
        )}

        <div style={S.optionGrid}>
          {cur.options.map(o => (
            <button key={o}
              style={{...S.optBtn,...(form[cur.field]===o?S.optBtnActive:{})}}
              onClick={() => pickOption(o)}
            >{o}</button>
          ))}
        </div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          {step > 0
            ? <button style={{...S.secondaryBtn,flex:"unset",padding:"5px 15px",fontSize:13,borderRadius:10}} onClick={goBack}>‹ 이전</button>
            : <div/>
          }
          <button style={{...S.primaryBtn,flex:"unset",padding:"5px 15px",fontSize:14,borderRadius:10,opacity:ok?1:0.4}} onClick={ok?goNext:undefined}>
            {step < steps.length-1 ? "다음 ›" : "등록 완료"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────
function Home({ user, car, health, acc, lastReport, onDrive, onHistory, onFeedback }) {
  const kmLimit = car.fuel==="디젤"?15000:10000;
  const kmPct = Math.min((acc.km/kmLimit)*100,100);
  const dayPct = Math.min((acc.daysSince/365)*100,100);
  const alert = health<30||kmPct>=100||dayPct>=100;

  return (
    <div style={S.screen}>
      <div style={S.userRow}>
        <div style={S.uAvatar}>{user.name[0]}</div>
        <div style={{flex:1}}>
          <div style={S.uName}>{user.name}님</div>
          <div style={S.uEmail}>{user.email}</div>
        </div>
        <div style={{...S.remainBadge,borderColor:HC(health),background:health>70?"rgba(74,222,128,0.1)":health>40?"rgba(250,204,21,0.1)":"rgba(248,113,113,0.1)"}}>
          <div style={{fontSize:10,color:"#64748b"}}>교체까지</div>
          <div style={{fontSize:13,fontWeight:700,color:HC(health)}}>{remaining(health,acc,car.fuel)}</div>
        </div>
      </div>

      <div style={S.healthCard}>
        <div style={S.healthTop}>
          <span style={S.healthLabel}>오일 건강도</span>
          <span style={{...S.healthPct,color:HC(health)}}>{health}%</span>
        </div>
        <div style={S.gaugeWrap}><div style={{...S.gaugeFill,width:`${health}%`,background:HC(health)}}/></div>
        {alert && <div style={S.alertBanner}>⚠ 엔진오일 교체가 필요합니다</div>}
      </div>

      <div style={S.statsRow}>
        {[
          {val:acc.km.toLocaleString(),unit:"km",label:"누적 주행",pct:kmPct,sub:`${kmLimit.toLocaleString()}km 기준`},
          {val:acc.daysSince,unit:"일",label:"교체 후 경과",pct:dayPct,sub:"365일 기준"},
          {val:acc.engineHour.toFixed(1),unit:"h",label:"엔진부담시간",pct:Math.min((acc.engineHour/200)*100,100),sub:"200h 기준"},
        ].map((s,i)=>(
          <div key={i} style={S.statCard}>
            <div style={S.statVal}>{s.val}<span style={S.statUnit}>{s.unit}</span></div>
            <div style={S.statLabel}>{s.label}</div>
            <div style={S.miniGaugeWrap}><div style={{...S.miniGaugeFill,width:`${s.pct}%`,background:s.pct>80?"#f87171":"#6366f1"}}/></div>
            <div style={S.statSub}>{s.sub}</div>
          </div>
        ))}
      </div>

      {lastReport && (
        <div style={S.lastCard} onClick={onHistory}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,color:"#64748b",fontWeight:600}}>최근 주행 리포트</span>
            <span style={{color:"#6366f1",fontSize:18}}>›</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#94a3b8"}}>
            <span>{lastReport.km}km · {lastReport.time}</span>
            <span style={{color:HC(lastReport.afterHealth)}}>건강도 {lastReport.afterHealth}%</span>
          </div>
        </div>
      )}

      <button style={S.driveBtn} onClick={onDrive}><span style={{fontSize:20}}>🚗</span><span>주행 시작</span></button>
      <button style={S.replaceBtn}>엔진오일 교체 완료</button>
      <button style={S.feedbackBtn} onClick={onFeedback}>💬 건의하기</button>
    </div>
  );
}

// ── Driving ───────────────────────────────────────────────────────
function Driving({ onEnd }) {
  const [elapsed,setElapsed]=useState(0);
  const [km,setKm]=useState(0);
  const [speed,setSpeed]=useState(0);
  const [log,setLog]=useState({low:0,mid:0,high:0});
  const ref=useRef(null);
  useEffect(()=>{
    ref.current=setInterval(()=>{
      setElapsed(e=>e+1);
      setKm(k=>+(k+Math.random()*0.05).toFixed(2));
      const s=Math.floor(Math.random()*120);
      setSpeed(s);
      if(s<20) setLog(l=>({...l,low:l.low+1}));
      else if(s<80) setLog(l=>({...l,mid:l.mid+1}));
      else setLog(l=>({...l,high:l.high+1}));
    },1000);
    return()=>clearInterval(ref.current);
  },[]);
  const total=log.low+log.mid+log.high||1;
  const lp=Math.round((log.low/total)*100), mp=Math.round((log.mid/total)*100), hp=100-lp-mp;
  const eb=+((log.low*1.3+log.mid*1.0+log.high*0.8)/3600).toFixed(2);
  return (
    <div style={S.screen}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,paddingTop:8}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 0 4px rgba(74,222,128,0.2)"}}/>
        <span style={{fontSize:16,fontWeight:700,color:"#f1f5f9",flex:1}}>주행 중</span>
        <span style={{fontSize:14,color:"#64748b"}}>{fmt(elapsed)}</span>
      </div>
      <div style={S.speedCard}>
        <div style={{fontSize:72,fontWeight:900,color:"#f1f5f9",letterSpacing:-3,lineHeight:1}}>{speed}</div>
        <div style={{fontSize:14,color:"#64748b"}}>km/h</div>
        <div style={{fontSize:14,color:"#94a3b8",marginTop:8}}>{speed<20?"🔴 저속 구간":speed<80?"🟡 일반 구간":"🟢 고속 구간"}</div>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <div style={S.dStatCard}><div style={{fontSize:22,fontWeight:800,color:"#6366f1"}}>{km.toFixed(1)} km</div><div style={{fontSize:11,color:"#64748b",marginTop:4}}>주행 거리</div></div>
        <div style={S.dStatCard}><div style={{fontSize:22,fontWeight:800,color:"#6366f1"}}>{eb} h</div><div style={{fontSize:11,color:"#64748b",marginTop:4}}>엔진부담시간</div></div>
      </div>
      <div style={{...S.reportCard,marginBottom:16}}>
        <div style={S.distLabel}>속도 구간 분포</div>
        <div style={S.distBar}>
          <div style={{width:`${lp}%`,background:SC["저속"],height:"100%",borderRadius:"4px 0 0 4px",transition:"width 0.5s"}}/>
          <div style={{width:`${mp}%`,background:SC["일반"],height:"100%"}}/>
          <div style={{width:`${hp}%`,background:SC["고속"],height:"100%",borderRadius:"0 4px 4px 0"}}/>
        </div>
        <div style={S.distLegend}><span style={{color:SC["저속"]}}>저속 {lp}%</span><span style={{color:SC["일반"]}}>일반 {mp}%</span><span style={{color:SC["고속"]}}>고속 {hp}%</span></div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <div style={{...S.statusChip,background:"#1e3a2f"}}>🔵 블루투스 연결됨</div>
        <div style={{...S.statusChip,background:"#1e3a2f"}}>🟢 GPS 정상</div>
      </div>
      <button style={S.endBtn} onClick={()=>{clearInterval(ref.current);onEnd({km:+km.toFixed(1),elapsed,lowPct:lp,midPct:mp,highPct:hp,engineBurden:eb});}}>주행 종료</button>
    </div>
  );
}

// ── Report ────────────────────────────────────────────────────────
function Report({ data, beforeHealth, onConfirm }) {
  const after=Math.max(beforeHealth-Math.floor(data.lowPct*0.15+data.midPct*0.05+data.highPct*0.02),0);
  const [editKm,setEditKm]=useState(data.km);
  const [editing,setEditing]=useState(false);
  const comments=[];
  if(data.lowPct>40) comments.push("도심 정체 구간 비율이 높아 오일 열화가 다소 빠르게 진행되었습니다.");
  if(data.highPct>40) comments.push("고속 정속 구간이 많아 엔진 부담이 낮은 운행이었습니다.");
  if(!comments.length) comments.push("전반적으로 안정적인 주행 패턴이었습니다.");
  const bl=data.lowPct>50?"다소 높음":data.highPct>50?"낮음":"보통";
  const bc=data.lowPct>50?"#f87171":data.highPct>50?"#4ade80":"#facc15";
  return (
    <div style={S.screen}>
      <div style={{paddingTop:8,marginBottom:20}}><div style={{fontSize:22,fontWeight:800,color:"#f1f5f9"}}>AI 주행 리포트</div><div style={{fontSize:12,color:"#64748b",marginTop:4}}>{new Date().toLocaleDateString("ko-KR")}</div></div>
      <div style={S.reportCard}>
        {[["총 주행 거리", editing?<input key="i" style={S.editInput} value={editKm} onChange={e=>setEditKm(e.target.value)}/>:`${data.km} km`],["총 주행 시간",fmt(data.elapsed)],["엔진부담시간",`${data.engineBurden} h`],["엔진 부담도",<span key="b" style={{color:bc}}>{bl}</span>]].map(([l,v],i)=>(
          <div key={i} style={S.reportRow}><span style={S.rLabel}>{l}</span><span style={S.rVal}>{v}</span></div>
        ))}
      </div>
      <div style={S.reportCard}>
        <div style={S.distLabel}>속도 구간별 비율</div>
        <div style={S.distBar}>
          <div style={{width:`${data.lowPct}%`,background:SC["저속"],height:"100%",borderRadius:"4px 0 0 4px"}}/>
          <div style={{width:`${data.midPct}%`,background:SC["일반"],height:"100%"}}/>
          <div style={{width:`${data.highPct}%`,background:SC["고속"],height:"100%",borderRadius:"0 4px 4px 0"}}/>
        </div>
        <div style={S.distLegend}><span style={{color:SC["저속"]}}>저속 {data.lowPct}%</span><span style={{color:SC["일반"]}}>일반 {data.midPct}%</span><span style={{color:SC["고속"]}}>고속 {data.highPct}%</span></div>
      </div>
      <div style={S.reportCard}>
        <div style={S.distLabel}>오일 건강도 변화</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"8px 0"}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:HC(beforeHealth)}}>{beforeHealth}%</div><div style={{fontSize:11,color:"#64748b",marginTop:2}}>주행 전</div></div>
          <div style={{fontSize:20,color:"#334155"}}>→</div>
          <div style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:HC(after)}}>{after}%</div><div style={{fontSize:11,color:"#64748b",marginTop:2}}>주행 후</div></div>
          <div style={{background:"rgba(248,113,113,0.1)",color:"#f87171",padding:"4px 10px",borderRadius:8,fontSize:13,fontWeight:700}}>-{beforeHealth-after}%</div>
        </div>
      </div>
      <div style={S.aiCard}>
        <div style={S.aiLabel}>🤖 AI 해석</div>
        {comments.map((c,i)=><div key={i} style={S.aiComment}>"{c}"</div>)}
      </div>
      <div style={{display:"flex",gap:8}}>
        {editing?<button style={S.secondaryBtn} onClick={()=>setEditing(false)}>수정 완료</button>:<button style={S.secondaryBtn} onClick={()=>setEditing(true)}>기록 수정</button>}
        <button style={S.primaryBtn} onClick={()=>onConfirm(after,editing?+editKm:data.km)}>확인 완료</button>
      </div>
    </div>
  );
}

// ── History ───────────────────────────────────────────────────────
function History({ records, onBack }) {
  return (
    <div style={S.screen}>
      <div style={S.subHeader}><button style={S.backBtn} onClick={onBack}>‹</button><div style={S.subTitle}>주행 기록</div></div>
      {!records.length&&<div style={S.empty}>아직 주행 기록이 없습니다.</div>}
      {records.map((r,i)=>(
        <div key={i} style={S.reportCard}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}><span style={{color:"#64748b"}}>{r.date}</span><span style={{color:HC(r.afterHealth)}}>건강도 {r.afterHealth}%</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#94a3b8",marginBottom:10}}><span>{r.km} km</span><span>{r.time}</span><span style={{color:"#6366f1"}}>부담 {r.engineBurden}h</span></div>
          <div style={S.distBar}>
            <div style={{width:`${r.lowPct}%`,background:SC["저속"],height:"100%",borderRadius:"4px 0 0 4px"}}/>
            <div style={{width:`${r.midPct}%`,background:SC["일반"],height:"100%"}}/>
            <div style={{width:`${100-r.lowPct-r.midPct}%`,background:SC["고속"],height:"100%",borderRadius:"0 4px 4px 0"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Feedback ──────────────────────────────────────────────────────
function Feedback({ user, onBack, onSubmit }) {
  const [text,setText]=useState("");
  const [sent,setSent]=useState(false);
  function submit() {
    if(!text.trim()) return;
    onSubmit({id:`fb_${Date.now()}`,uid:user.uid,name:user.name,date:new Date().toLocaleDateString("ko-KR"),text:text.trim(),read:false});
    setSent(true);
  }
  return (
    <div style={S.screen}>
      <div style={S.subHeader}><button style={S.backBtn} onClick={onBack}>‹</button><div style={S.subTitle}>건의하기</div></div>
      {sent ? (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>✅</div>
          <div style={{fontSize:18,fontWeight:700,color:"#f1f5f9",marginBottom:8}}>건의가 전달되었어요</div>
          <div style={{fontSize:13,color:"#64748b",marginBottom:24}}>소중한 의견 감사합니다. 빠르게 검토하겠습니다.</div>
          <button style={{...S.primaryBtn,flex:"unset",padding:"10px 28px"}} onClick={onBack}>홈으로</button>
        </div>
      ) : (
        <>
          <div style={S.reportCard}>
            <div style={{fontSize:13,color:"#94a3b8",marginBottom:12,lineHeight:1.5}}>개선하고 싶은 기능이나 불편한 점을 알려주세요</div>
            <textarea style={S.textarea} placeholder="예) 블루투스 연결이 자주 끊겨요. 가중치 직접 설정하고 싶어요." value={text} onChange={e=>setText(e.target.value)} rows={6}/>
            <div style={{textAlign:"right",fontSize:11,color:"#475569",marginTop:6}}>{text.length} / 500</div>
          </div>
          <button style={{...S.primaryBtn,opacity:text.trim()?1:0.4}} onClick={text.trim()?submit:undefined}>건의 제출</button>
        </>
      )}
    </div>
  );
}

// ── Admin ─────────────────────────────────────────────────────────
function Admin({ onLogout, feedbackList, onMarkRead }) {
  const [tab,setTab]=useState("users");
  const users=MOCK_USERS.filter(u=>!u.isAdmin);
  const unread=feedbackList.filter(f=>!f.read).length;
  return (
    <div style={S.screen}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingTop:8}}>
        <div style={{fontSize:20,fontWeight:800,color:"#f1f5f9"}}>관리자 콘솔</div>
        <button style={S.logoutBtn} onClick={onLogout}>로그아웃</button>
      </div>
      <div style={S.tabBar}>
        {[["users","회원 관리"],["feedback","건의함"]].map(([k,l])=>(
          <button key={k} style={{...S.tab,borderBottom:tab===k?"2px solid #6366f1":"2px solid transparent",color:tab===k?"#818cf8":"#64748b"}} onClick={()=>setTab(k)}>
            {l}{k==="feedback"&&unread>0&&<span style={S.unreadBadge}>{unread}</span>}
          </button>
        ))}
      </div>

      {tab==="users"&&(
        <div>
          <div style={S.sectionLabel}>전체 회원 {users.length}명</div>
          {users.map(u=>(
            <div key={u.uid} style={S.adminCard}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={S.uAvatar}>{u.name[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#f1f5f9"}}>{u.name}</div>
                  <div style={{fontSize:11,color:"#64748b",marginTop:1}}>{u.email}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#64748b"}}>교체까지</div>
                  <div style={{fontSize:13,fontWeight:700,color:HC(u.health)}}>{remaining(u.health,u.accumulated,u.car.fuel)}</div>
                </div>
              </div>
              <div style={{display:"flex",background:"#0f172a",borderRadius:10,overflow:"hidden",marginBottom:10}}>
                {[["차량",`${u.car.maker} ${u.car.model}`],["건강도",<span key="h" style={{color:HC(u.health),fontWeight:700}}>{u.health}%</span>],["주행",`${u.accumulated.km.toLocaleString()}km`]].map(([l,v],i)=>(
                  <div key={i} style={{flex:1,padding:"8px 10px",borderRight:i<2?"1px solid #1e293b":"none",textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#64748b",marginBottom:3}}>{l}</div>
                    <div style={{fontSize:12,color:"#94a3b8"}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{height:4,background:"#0f172a",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,width:`${u.health}%`,background:HC(u.health),transition:"width 0.5s"}}/></div>
            </div>
          ))}
        </div>
      )}

      {tab==="feedback"&&(
        <div>
          <div style={S.sectionLabel}>건의 내역 {feedbackList.length}건</div>
          {!feedbackList.length&&<div style={S.empty}>건의 내역이 없습니다.</div>}
          {feedbackList.map(f=>(
            <div key={f.id} style={{...S.adminCard,opacity:f.read?0.55:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={S.uAvatar}>{f.name[0]}</div>
                  <div><div style={{fontSize:13,fontWeight:600,color:"#f1f5f9"}}>{f.name}</div><div style={{fontSize:11,color:"#475569"}}>{f.date}</div></div>
                </div>
                {!f.read?<button style={S.markReadBtn} onClick={()=>onMarkRead(f.id)}>읽음</button>:<span style={{fontSize:11,color:"#475569"}}>읽음</span>}
              </div>
              <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.6,background:"#0f172a",borderRadius:8,padding:"10px 12px"}}>{f.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────
function BottomNav({ screen, go }) {
  if([SCREENS.LOGIN,SCREENS.ONBOARDING,SCREENS.DRIVING,SCREENS.REPORT,SCREENS.ADMIN].includes(screen)) return null;
  const tabs=[["home","🏠","홈"],["history","📋","기록"],["feedback","💬","건의"]];
  return (
    <div style={S.bottomNav}>
      {tabs.map(([k,icon,label])=>(
        <button key={k} style={{...S.navBtn,color:screen===k?"#6366f1":"#64748b"}} onClick={()=>go(k)}>
          <div style={{fontSize:22}}>{icon}</div><div>{label}</div>
        </button>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState(SCREENS.LOGIN);
  const [user,setUser]=useState(null);
  const [car,setCar]=useState(null);
  const [health,setHealth]=useState(85);
  const [acc,setAcc]=useState({km:3240,engineHour:48.5,daysSince:127});
  const [driveData,setDriveData]=useState(null);
  const [records,setRecords]=useState([]);
  const [lastReport,setLastReport]=useState(null);
  const [feedbackList,setFeedbackList]=useState(INIT_FEEDBACK);

  function login(u) {
    setUser(u);
    if(u.isAdmin) { setScreen(SCREENS.ADMIN); return; }
    if(u.car) { setCar(u.car); setHealth(u.health); setAcc(u.accumulated); setScreen(SCREENS.HOME); }
    else setScreen(SCREENS.ONBOARDING);
  }
  function logout() { setUser(null); setCar(null); setScreen(SCREENS.LOGIN); }
  function onboard(form) { setCar(form); setScreen(SCREENS.HOME); }
  function driveEnd(d) { setDriveData(d); setScreen(SCREENS.REPORT); }
  function confirm(newH,km) {
    setHealth(newH);
    setAcc(a=>({...a,km:a.km+km,engineHour:+(a.engineHour+ +driveData.engineBurden).toFixed(2)}));
    const r={date:new Date().toLocaleDateString("ko-KR"),km,time:fmt(driveData.elapsed),engineBurden:driveData.engineBurden,lowPct:driveData.lowPct,midPct:driveData.midPct,afterHealth:newH};
    setRecords(rs=>[r,...rs]);
    setLastReport({km,time:fmt(driveData.elapsed),afterHealth:newH});
    setScreen(SCREENS.HOME);
  }

  return (
    <div style={S.app}>
      <div style={S.phone}>
        <div style={S.notch}/>
        {screen!==SCREENS.LOGIN&&<AppNameHeader/>}
        <div style={S.content}>
          {screen===SCREENS.LOGIN&&<LoginScreen onLogin={login}/>}
          {screen===SCREENS.ONBOARDING&&<Onboarding onComplete={onboard}/>}
          {screen===SCREENS.HOME&&car&&<Home user={user} car={car} health={health} acc={acc} lastReport={lastReport} onDrive={()=>setScreen(SCREENS.DRIVING)} onHistory={()=>setScreen(SCREENS.HISTORY)} onFeedback={()=>setScreen(SCREENS.FEEDBACK)}/>}
          {screen===SCREENS.DRIVING&&<Driving onEnd={driveEnd}/>}
          {screen===SCREENS.REPORT&&driveData&&<Report data={driveData} beforeHealth={health} onConfirm={confirm}/>}
          {screen===SCREENS.HISTORY&&<History records={records} onBack={()=>setScreen(SCREENS.HOME)}/>}
          {screen===SCREENS.FEEDBACK&&user&&<Feedback user={user} onBack={()=>setScreen(SCREENS.HOME)} onSubmit={f=>setFeedbackList(l=>[f,...l])}/>}
          {screen===SCREENS.ADMIN&&<Admin onLogout={logout} feedbackList={feedbackList} onMarkRead={id=>setFeedbackList(l=>l.map(f=>f.id===id?{...f,read:true}:f))}/>}
        </div>
        <BottomNav screen={screen} go={setScreen}/>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const S = {
  app:{ minHeight:"100vh", background:"linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Pretendard','Noto Sans KR',sans-serif", padding:"20px 0" },
  phone:{ width:390, minHeight:780, background:"#0f172a", borderRadius:44, boxShadow:"0 40px 120px rgba(0,0,0,0.7),inset 0 0 0 1px rgba(255,255,255,0.05)", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" },
  notch:{ width:120, height:28, background:"#0f172a", borderRadius:"0 0 20px 20px", margin:"0 auto", zIndex:10, boxShadow:"inset 0 -2px 0 rgba(255,255,255,0.05)" },
  content:{ flex:1, overflowY:"auto", overflowX:"hidden", scrollbarWidth:"none" },
  screen:{ padding:"16px 20px 100px", color:"#e2e8f0" },

  loginWrap:{ minHeight:740, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  loginCard:{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:12 },
  loginTitle:{ fontSize:32, fontWeight:900, margin:0, letterSpacing:"-1px", background:"linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  loginSub:{ fontSize:14, color:"#64748b", margin:0, marginBottom:8 },
  googleBtn:{ display:"flex", alignItems:"center", gap:12, background:"#fff", border:"none", borderRadius:14, padding:"13px 24px", fontSize:15, fontWeight:600, color:"#1e293b", cursor:"pointer", width:"100%", justifyContent:"center", marginTop:8 },
  loadingText:{ color:"#64748b", fontSize:14, padding:20 },
  accountList:{ width:"100%", background:"#1e293b", borderRadius:16, border:"1px solid #334155", overflow:"hidden", marginTop:8 },
  accountListLabel:{ fontSize:11, color:"#64748b", padding:"12px 16px 8px", fontWeight:600, textTransform:"uppercase", letterSpacing:1 },
  accountItem:{ display:"flex", alignItems:"center", gap:12, width:"100%", background:"none", border:"none", borderTop:"1px solid #0f172a", padding:"12px 16px", cursor:"pointer", textAlign:"left" },
  accountAvatar:{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#fff", flexShrink:0 },
  accountName:{ fontSize:14, fontWeight:600, color:"#f1f5f9", display:"flex", alignItems:"center", gap:6 },
  accountEmail:{ fontSize:12, color:"#64748b", marginTop:2 },
  adminBadge:{ background:"rgba(99,102,241,0.2)", color:"#818cf8", fontSize:10, padding:"2px 6px", borderRadius:6, fontWeight:600 },
  loginNotice:{ fontSize:11, color:"#334155", textAlign:"center", margin:0, marginTop:4 },

  userRow:{ display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingTop:8 },
  uAvatar:{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#fff", flexShrink:0 },
  uName:{ fontSize:14, fontWeight:700, color:"#f1f5f9" },
  uEmail:{ fontSize:11, color:"#64748b" },
  remainBadge:{ marginLeft:"auto", border:"1px solid", borderRadius:10, padding:"6px 10px", textAlign:"center" },

  healthCard:{ background:"linear-gradient(135deg,#1e293b,#0f172a)", border:"1px solid #334155", borderRadius:20, padding:20, marginBottom:16 },
  healthTop:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 },
  healthLabel:{ fontSize:13, color:"#94a3b8", fontWeight:600 },
  healthPct:{ fontSize:32, fontWeight:800, letterSpacing:-1 },
  gaugeWrap:{ height:8, background:"#1e293b", borderRadius:4, overflow:"hidden" },
  gaugeFill:{ height:"100%", borderRadius:4, transition:"width 0.8s,background 0.5s" },
  alertBanner:{ marginTop:12, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#f87171", textAlign:"center" },

  statsRow:{ display:"flex", gap:8, marginBottom:16 },
  statCard:{ flex:1, background:"#1e293b", borderRadius:16, padding:"14px 12px", border:"1px solid #334155" },
  statVal:{ fontSize:20, fontWeight:800, color:"#f1f5f9" },
  statUnit:{ fontSize:11, fontWeight:400, color:"#64748b", marginLeft:2 },
  statLabel:{ fontSize:10, color:"#64748b", margin:"4px 0" },
  miniGaugeWrap:{ height:3, background:"#0f172a", borderRadius:2, overflow:"hidden", marginBottom:4 },
  miniGaugeFill:{ height:"100%", borderRadius:2, transition:"width 0.5s" },
  statSub:{ fontSize:9, color:"#475569" },

  lastCard:{ background:"#1e293b", border:"1px solid #334155", borderRadius:16, padding:16, marginBottom:16, cursor:"pointer" },
  driveBtn:{ width:"100%", padding:"18px 0", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:20, color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:10, boxShadow:"0 8px 32px rgba(99,102,241,0.35)" },
  replaceBtn:{ width:"100%", padding:"14px 0", background:"transparent", border:"1px solid #334155", borderRadius:16, color:"#64748b", fontSize:14, cursor:"pointer", marginBottom:10 },
  feedbackBtn:{ width:"100%", padding:"12px 0", background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:14, color:"#818cf8", fontSize:14, cursor:"pointer" },
  primaryBtn:{ flex:1, padding:"14px 0", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:16, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" },
  secondaryBtn:{ flex:1, padding:"14px 0", background:"transparent", border:"1px solid #334155", borderRadius:16, color:"#94a3b8", fontSize:14, cursor:"pointer" },

  speedCard:{ background:"#1e293b", border:"1px solid #334155", borderRadius:24, padding:32, textAlign:"center", marginBottom:16 },
  dStatCard:{ flex:1, background:"#1e293b", border:"1px solid #334155", borderRadius:16, padding:16, textAlign:"center" },
  distCard:{ background:"#1e293b", border:"1px solid #334155", borderRadius:16, padding:16, marginBottom:16 },
  distLabel:{ fontSize:12, color:"#64748b", marginBottom:10, fontWeight:600 },
  distBar:{ height:8, borderRadius:4, display:"flex", overflow:"hidden", background:"#0f172a", marginBottom:8 },
  distLegend:{ display:"flex", justifyContent:"space-around", fontSize:11 },
  statusChip:{ flex:1, borderRadius:10, padding:"8px 12px", fontSize:11, color:"#94a3b8", display:"flex", alignItems:"center", gap:6, border:"1px solid #334155" },
  endBtn:{ width:"100%", padding:"16px 0", background:"linear-gradient(135deg,#ef4444,#dc2626)", border:"none", borderRadius:18, color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" },

  reportCard:{ background:"#1e293b", border:"1px solid #334155", borderRadius:16, padding:16, marginBottom:12 },
  reportRow:{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #0f172a" },
  rLabel:{ fontSize:13, color:"#64748b" },
  rVal:{ fontSize:14, fontWeight:700, color:"#f1f5f9" },
  editInput:{ background:"#0f172a", border:"1px solid #6366f1", borderRadius:8, color:"#f1f5f9", padding:"4px 8px", fontSize:14, width:80 },
  aiCard:{ background:"linear-gradient(135deg,#1e1b4b,#1e293b)", border:"1px solid #4338ca", borderRadius:16, padding:16, marginBottom:16 },
  aiLabel:{ fontSize:12, color:"#818cf8", fontWeight:700, marginBottom:10 },
  aiComment:{ fontSize:13, color:"#c7d2fe", lineHeight:1.6, marginBottom:6, fontStyle:"italic" },

  subHeader:{ display:"flex", alignItems:"center", gap:12, marginBottom:20, paddingTop:8 },
  backBtn:{ background:"none", border:"none", color:"#6366f1", fontSize:24, cursor:"pointer" },
  subTitle:{ fontSize:18, fontWeight:700, color:"#f1f5f9" },
  empty:{ textAlign:"center", color:"#475569", padding:40 },
  textarea:{ width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:12, color:"#f1f5f9", padding:"12px 14px", fontSize:14, resize:"none", outline:"none", boxSizing:"border-box", fontFamily:"inherit", lineHeight:1.6 },

  logoutBtn:{ background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#94a3b8", fontSize:12, padding:"6px 12px", cursor:"pointer" },
  tabBar:{ display:"flex", borderBottom:"1px solid #1e293b", marginBottom:16 },
  tab:{ flex:1, background:"none", border:"none", padding:"10px 0", fontSize:14, fontWeight:600, cursor:"pointer" },
  unreadBadge:{ background:"#ef4444", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:10, marginLeft:6 },
  sectionLabel:{ fontSize:11, color:"#64748b", fontWeight:600, textTransform:"uppercase", letterSpacing:1, marginBottom:12 },
  adminCard:{ background:"#1e293b", border:"1px solid #334155", borderRadius:16, padding:16, marginBottom:10 },
  markReadBtn:{ background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:8, color:"#818cf8", fontSize:11, padding:"4px 10px", cursor:"pointer" },

  onboardWrap:{ minHeight:780, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
  onboardCard:{ width:"100%" },
  onboardTop:{ textAlign:"center", marginBottom:32 },
  onboardTitle:{ fontSize:24, fontWeight:800, color:"#f1f5f9", margin:0 },
  onboardSub:{ fontSize:14, color:"#64748b", marginTop:8, lineHeight:1.6 },
  stepBar:{ display:"flex", gap:6, justifyContent:"center", marginBottom:28 },
  stepDot:{ width:8, height:8, borderRadius:"50%", transition:"background 0.3s" },
  onboardLabel:{ fontSize:13, color:"#94a3b8", fontWeight:600, marginBottom:12 },
  breadcrumb:{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 },
  breadcrumbChip:{ background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:8, padding:"3px 10px", fontSize:12, color:"#818cf8" },
  oilSpecBadge:{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#94a3b8", marginBottom:12 },
  optionGrid:{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 },
  optBtn:{ padding:"10px 14px", background:"#1e293b", border:"1px solid #334155", borderRadius:12, color:"#94a3b8", fontSize:13, cursor:"pointer" },
  optBtnActive:{ background:"rgba(99,102,241,0.15)", border:"1px solid #6366f1", color:"#818cf8" },
  onboardInput:{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:14, color:"#f1f5f9", padding:"14px 16px", fontSize:16, marginBottom:24, boxSizing:"border-box", outline:"none" },

  bottomNav:{ position:"absolute", bottom:0, left:0, right:0, background:"#0f172a", borderTop:"1px solid #1e293b", display:"flex", padding:"8px 0 20px" },
  navBtn:{ flex:1, background:"none", border:"none", cursor:"pointer", fontSize:10, display:"flex", flexDirection:"column", alignItems:"center", gap:3 },
};
