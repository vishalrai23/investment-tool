import { useState, useMemo } from "react";

// ─── Stable Money Brand Tokens (Light Theme) ───
const C = {
  // Backgrounds
  pageBg: "#F6F5FA",
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  surfaceBg: "#F0EFF5",
  // Primary purple
  purple: "#6C3CE0",
  purpleLight: "#8B5CF6",
  purpleBg: "#F0EBFF",
  purpleSoft: "#E8E0FF",
  // Accent neon green
  neon: "#00E676",
  neonDark: "#00C853",
  neonBg: "#E8FFF0",
  // Semantic
  green: "#10B981",
  greenBg: "#ECFDF5",
  amber: "#F59E0B",
  amberBg: "#FFFBEB",
  red: "#EF4444",
  redBg: "#FEF2F2",
  blue: "#3B82F6",
  blueBg: "#EFF6FF",
  gold: "#D97706",
  goldBg: "#FFF8E1",
  silver: "#64748B",
  // Text
  textPrimary: "#1E1B39",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
};

// ─── Product Catalog ───
const FD_PRODUCTS = [
  { id:"fd1", bank:"Suryoday SF Bank", rate:8.25, tenure:"12 months", minAmt:5000, maxAmt:5000000, payout:"Cumulative / Quarterly", liquidity:"Instant withdrawal", liquidityDays:0, dicgc:true, penalty:"0.5% on applicable rate", bankType:"Small Finance Bank", color:C.blue },
  { id:"fd2", bank:"Unity SF Bank", rate:7.75, tenure:"6 months", minAmt:5000, maxAmt:5000000, payout:"Cumulative / Monthly", liquidity:"Instant withdrawal", liquidityDays:0, dicgc:true, penalty:"0.5% on applicable rate", bankType:"Small Finance Bank", color:C.green },
  { id:"fd3", bank:"Shivalik SF Bank", rate:8.10, tenure:"12 months", minAmt:10000, maxAmt:5000000, payout:"Cumulative / Quarterly", liquidity:"1-2 business days", liquidityDays:2, dicgc:true, penalty:"1% on applicable rate", bankType:"Small Finance Bank", color:C.amber },
  { id:"fd4", bank:"IndusInd Bank", rate:7.25, tenure:"12 months", minAmt:10000, maxAmt:10000000, payout:"Cumulative / Quarterly / Monthly", liquidity:"1-2 business days", liquidityDays:2, dicgc:true, penalty:"1% on applicable rate", bankType:"Private Bank", color:"#06B6D4" },
  { id:"fd5", bank:"Bajaj Finance", rate:8.60, tenure:"12 months", minAmt:15000, maxAmt:20000000, payout:"Cumulative / Quarterly / Monthly", liquidity:"3-5 business days", liquidityDays:5, dicgc:false, penalty:"N/A (lock-in may apply)", bankType:"NBFC", color:C.purple },
  { id:"fd6", bank:"Shriram Finance", rate:8.90, tenure:"24 months", minAmt:5000, maxAmt:10000000, payout:"Cumulative / Monthly", liquidity:"3-5 business days", liquidityDays:5, dicgc:false, penalty:"2-3% on applicable rate", bankType:"NBFC", color:C.red },
  { id:"fd7", bank:"Utkarsh SF Bank", rate:8.50, tenure:"12 months", minAmt:1000, maxAmt:5000000, payout:"Cumulative / Quarterly", liquidity:"2-3 business days", liquidityDays:3, dicgc:true, penalty:"1% on applicable rate", bankType:"Small Finance Bank", color:"#7C3AED" },
];

const BOND_PRODUCTS = [
  { id:"b1", name:"Muthoot Finance NCD", rating:"AA", ratingColor:C.green, yield:9.25, tenure:"24 months", minAmt:10000, faceValue:1000, coupon:"9.25% annual", liquidity:"Secondary market (exchange-listed)", secured:"Secured", issuerType:"Gold NBFC", listingExchange:"BSE/NSE", color:C.amber },
  { id:"b2", name:"Shriram Transport NCD", rating:"AA", ratingColor:C.green, yield:9.50, tenure:"36 months", minAmt:10000, faceValue:1000, coupon:"9.50% annual", liquidity:"Secondary market (exchange-listed)", secured:"Secured", issuerType:"Vehicle NBFC", listingExchange:"BSE/NSE", color:C.red },
  { id:"b3", name:"IRFC 54EC Bond", rating:"AAA", ratingColor:C.purple, yield:5.25, tenure:"5 years", minAmt:10000, faceValue:10000, coupon:"5.25% annual", liquidity:"Lock-in (5 years)", secured:"Govt. backed", issuerType:"Govt. Enterprise", listingExchange:"N/A", color:C.blue },
  { id:"b4", name:"REC Ltd Bond", rating:"AAA", ratingColor:C.purple, yield:7.40, tenure:"10 years", minAmt:10000, faceValue:1000, coupon:"7.40% annual", liquidity:"Secondary market", secured:"Govt. backed", issuerType:"Govt. Enterprise", listingExchange:"BSE/NSE", color:C.blue },
  { id:"b5", name:"Bajaj Finance NCD", rating:"AAA", ratingColor:C.purple, yield:8.10, tenure:"36 months", minAmt:10000, faceValue:1000, coupon:"8.10% annual", liquidity:"Secondary market (exchange-listed)", secured:"Secured", issuerType:"NBFC", listingExchange:"BSE/NSE", color:C.purple },
  { id:"b6", name:"IIFL Finance NCD", rating:"AA-", ratingColor:C.amber, yield:9.80, tenure:"24 months", minAmt:10000, faceValue:1000, coupon:"9.80% annual", liquidity:"Secondary market", secured:"Secured", issuerType:"NBFC", listingExchange:"BSE", color:C.gold },
];

const GOLD_SILVER_MF = [
  { id:"g1", name:"SBI Gold Fund", type:"Gold Fund of Fund", returns1Y:24.5, returns3Y:11.2, expenseRatio:0.50, nav:21.45, aum:"₹2,340 Cr", benchmark:"Domestic Gold Price", minSIP:500, minLump:5000, exitLoad:"1% if <1yr", liquidity:"T+2 business days", metal:"Gold", riskLabel:"Moderate", color:C.gold },
  { id:"g2", name:"HDFC Gold Fund", type:"Gold Fund of Fund", returns1Y:23.8, returns3Y:10.8, expenseRatio:0.55, nav:19.87, aum:"₹1,890 Cr", benchmark:"Domestic Gold Price", minSIP:500, minLump:5000, exitLoad:"1% if <1yr", liquidity:"T+2 business days", metal:"Gold", riskLabel:"Moderate", color:"#B45309" },
  { id:"g3", name:"Nippon Gold BeES", type:"Gold ETF", returns1Y:25.1, returns3Y:12.1, expenseRatio:0.35, nav:58.20, aum:"₹3,100 Cr", benchmark:"Domestic Gold Price", minSIP:0, minLump:1000, exitLoad:"Nil", liquidity:"T+1 (exchange traded)", metal:"Gold", riskLabel:"Moderate", color:"#92400E" },
  { id:"g4", name:"ICICI Silver ETF", type:"Silver ETF", returns1Y:18.3, returns3Y:8.9, expenseRatio:0.45, nav:72.10, aum:"₹480 Cr", benchmark:"Domestic Silver Price", minSIP:0, minLump:1000, exitLoad:"Nil", liquidity:"T+1 (exchange traded)", metal:"Silver", riskLabel:"Moderately High", color:C.silver },
  { id:"g5", name:"Nippon Silver ETF", type:"Silver ETF", returns1Y:17.5, returns3Y:8.2, expenseRatio:0.40, nav:65.80, aum:"₹320 Cr", benchmark:"Domestic Silver Price", minSIP:0, minLump:1000, exitLoad:"Nil", liquidity:"T+1 (exchange traded)", metal:"Silver", riskLabel:"Moderately High", color:"#475569" },
];

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

const Pill = ({ children, bg, color, style }) => (
  <span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, background:bg, color, fontWeight:600, whiteSpace:"nowrap", ...style }}>{children}</span>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background:C.cardBg, borderRadius:16, padding:14, border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,0.04)", cursor: onClick ? "pointer" : "default", transition:"box-shadow 0.15s", ...style }}
    onMouseEnter={e => onClick && (e.currentTarget.style.boxShadow = "0 4px 12px rgba(108,60,224,0.1)")}
    onMouseLeave={e => onClick && (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}>
    {children}
  </div>
);

// ─── Phone Frame ───
const Phone = ({ children }) => (
  <div style={{ maxWidth:430, margin:"0 auto" }}>
    <div style={{ background:C.pageBg, borderRadius:36, border:"2px solid #E0DDE8", padding:"44px 0 0", overflow:"hidden", boxShadow:"0 20px 60px rgba(108,60,224,0.08)" }}>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", top:-32, left:"50%", transform:"translateX(-50%)", width:110, height:26, borderRadius:13, background:"#1E1B39" }} />
      </div>
      <div style={{ padding:"0 18px 16px", minHeight:580, maxHeight:620, overflowY:"auto" }}>
        {children}
      </div>
      <div style={{ display:"flex", justifyContent:"space-around", padding:"10px 16px 20px", borderTop:`1px solid ${C.border}`, background:C.white }}>
        {[
          { l:"Home", icon:"⌂", active:false },
          { l:"Invest", icon:"↗", active:true },
          { l:"Portfolio", icon:"◧", active:false },
          { l:"Support", icon:"◉", active:false },
          { l:"More", icon:"≡", active:false },
        ].map((t,i) => (
          <div key={i} style={{ textAlign:"center" }}>
            <div style={{ fontSize:18, color:t.active ? C.purple : C.textMuted }}>{t.icon}</div>
            <div style={{ fontSize:9, marginTop:1, color:t.active ? C.purple : C.textMuted, fontWeight:t.active ? 700 : 400 }}>{t.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ textAlign:"center", padding:"14px 12px 6px", color:C.textMuted, fontSize:9, lineHeight:1.6 }}>
      Stable Money — SmartInvest Discovery Tool<br/>
      For informational purposes only. Not investment advice. Not a recommendation.<br/>
      Stable Money (Stable Finserv Pvt. Ltd.) is a distributor, not a SEBI-registered investment advisor.
    </div>
  </div>
);

// ─── SCREEN 1: Setup ───
function ScreenSetup({ onNext }) {
  const [amount, setAmount] = useState("250000");
  const [returnGoal, setReturnGoal] = useState("balanced");
  const [liquidityNeed, setLiquidityNeed] = useState("some");
  const [minRating, setMinRating] = useState("AA");
  const parsed = parseInt(amount.replace(/,/g,""),10) || 0;
  const display = parsed > 0 ? parsed.toLocaleString("en-IN") : "";
  const presets = [100000,250000,500000,1000000];

  const Section = ({ label, children }) => (
    <div style={{ marginBottom:16 }}>
      <div style={{ color:C.textMuted, fontSize:10, fontWeight:700, letterSpacing:"0.06em", marginBottom:6 }}>{label}</div>
      {children}
    </div>
  );

  const OptionCard = ({ selected, color, icon, label, desc, onClick }) => (
    <Card onClick={onClick} style={{ marginBottom:6, border:`1.5px solid ${selected ? color : C.border}`, background: selected ? `${color}08` : C.white, display:"flex", alignItems:"center", gap:10, padding:10 }}>
      <span style={{ fontSize:20, width:28, textAlign:"center" }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ color:C.textPrimary, fontSize:12, fontWeight:600 }}>{label}</div>
        <div style={{ color:C.textSecondary, fontSize:10, marginTop:1 }}>{desc}</div>
      </div>
      <div style={{ width:18, height:18, borderRadius:9, border:`2px solid ${selected ? color : "#D1D5DB"}`, background:selected ? color : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {selected && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
    </Card>
  );

  const OptionPill = ({ selected, color, label, desc, onClick }) => (
    <div onClick={onClick} style={{ flex:1, background:selected ? `${color}08` : C.white, borderRadius:12, padding:"10px 6px", border:`1.5px solid ${selected ? color : C.border}`, cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
      <div style={{ color:selected ? color : C.textPrimary, fontSize:11, fontWeight:700 }}>{label}</div>
      <div style={{ color:C.textSecondary, fontSize:9, marginTop:2, lineHeight:1.3 }}>{desc}</div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:C.purpleBg, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14 }}>✦</span>
          </div>
          <span style={{ color:C.purple, fontSize:11, fontWeight:700, letterSpacing:"0.06em" }}>SMARTINVEST</span>
        </div>
        <div style={{ color:C.textPrimary, fontSize:20, fontWeight:800, lineHeight:1.3 }}>Tell us what matters to you</div>
        <div style={{ color:C.textSecondary, fontSize:12, marginTop:4, lineHeight:1.5 }}>We'll show you FDs, Bonds, and Gold/Silver MFs that match — with every detail upfront.</div>
      </div>

      <Card style={{ padding:"10px 12px", marginBottom:16, background:C.purpleBg, border:`1px solid ${C.purpleSoft}` }}>
        <div style={{ fontSize:10, color:C.purple, lineHeight:1.5 }}>
          <strong>ℹ️ Your discovery tool.</strong> Every product is shown with its actual parameters — ratings, returns, liquidity, fees. You decide what fits.
        </div>
      </Card>

      <Card style={{ padding:"8px 12px", marginBottom:16, background:C.surfaceBg, border:`1px solid ${C.border}` }}>
        <div style={{ fontSize:9, color:C.textSecondary, lineHeight:1.6 }}>
          <strong style={{ color:C.textPrimary }}>Important:</strong> This tool provides product information for your independent evaluation. It does not constitute investment advice, a recommendation, or an offer to buy or sell any financial product. Stable Money is a distributor and does not provide personalised financial advice. Please assess suitability based on your own financial situation, or consult a SEBI-registered investment advisor.
        </div>
      </Card>

      <Section label="HOW MUCH ARE YOU EXPLORING?">
        <Card style={{ padding:12, marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ color:C.purple, fontSize:26, fontWeight:800 }}>₹</span>
            <input value={display} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g,""))}
              placeholder="2,50,000" style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.textPrimary, fontSize:26, fontWeight:800, fontFamily:"inherit" }} />
          </div>
        </Card>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {presets.map(p => (
            <button key={p} onClick={() => setAmount(String(p))} style={{ padding:"5px 14px", borderRadius:20, border:`1.5px solid ${parsed===p ? C.purple : C.border}`, background:parsed===p ? C.purpleBg : C.white, color:parsed===p ? C.purple : C.textSecondary, fontSize:11, fontWeight:600, cursor:"pointer" }}>
              {fmt(p)}
            </button>
          ))}
        </div>
      </Section>

      <Section label="RETURN GOAL">
        <OptionCard selected={returnGoal==="conservative"} color={C.green} icon="🛡️" label="Lower return, higher safety" desc="Prioritize DICGC-insured FDs and AAA bonds" onClick={() => setReturnGoal("conservative")} />
        <OptionCard selected={returnGoal==="balanced"} color={C.purple} icon="⚖️" label="Balanced return & safety" desc="Mix of FDs, rated bonds, and Gold MFs" onClick={() => setReturnGoal("balanced")} />
        <OptionCard selected={returnGoal==="growth"} color={C.amber} icon="📈" label="Higher return potential" desc="Higher-yield NCDs, Gold/Silver MFs" onClick={() => setReturnGoal("growth")} />
      </Section>

      <Section label="LIQUIDITY NEED">
        <div style={{ display:"flex", gap:6 }}>
          <OptionPill selected={liquidityNeed==="high"} color={C.amber} label="Quick access" desc="Instant / 1-2 days" onClick={() => setLiquidityNeed("high")} />
          <OptionPill selected={liquidityNeed==="some"} color={C.purple} label="Flexible" desc="Some locked, some liquid" onClick={() => setLiquidityNeed("some")} />
          <OptionPill selected={liquidityNeed==="low"} color={C.green} label="Can lock" desc="Comfortable with 1-5 yr" onClick={() => setLiquidityNeed("low")} />
        </div>
      </Section>

      <Section label="MINIMUM BOND RATING">
        <div style={{ display:"flex", gap:6, marginBottom:6 }}>
          <OptionPill selected={minRating==="AAA"} color={C.green} label="AAA only" desc="Highest safety" onClick={() => setMinRating("AAA")} />
          <OptionPill selected={minRating==="AA"} color={C.purple} label="AA & above" desc="High safety" onClick={() => setMinRating("AA")} />
          <OptionPill selected={minRating==="all"} color={C.amber} label="A & below" desc="All available bonds" onClick={() => setMinRating("all")} />
        </div>
        <div style={{ background:C.surfaceBg, borderRadius:10, padding:"8px 10px", marginBottom:14 }}>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", alignItems:"center" }}>
            {["AAA","AA+","AA","AA-","A+","A","BBB"].map(r => {
              const isAAA = r==="AAA";
              const isAA = ["AA+","AA","AA-"].includes(r);
              const isABelow = ["A+","A","BBB"].includes(r);
              let highlighted, bg, color;
              if (minRating==="AAA") {
                highlighted = isAAA;
              } else if (minRating==="AA") {
                highlighted = isAAA || isAA;
              } else {
                highlighted = isABelow;
              }
              bg = highlighted ? (isAAA ? "#ECFDF5" : isAA ? "#F0EBFF" : "#FFFBEB") : C.white;
              color = highlighted ? (isAAA ? C.green : isAA ? C.purple : C.amber) : "#D1D5DB";
              return <span key={r} style={{ fontSize:10, padding:"2px 8px", borderRadius:12, background:bg, color, fontWeight:highlighted ? 700 : 400, border:`1px solid ${highlighted ? "transparent" : "#E5E7EB"}` }}>{r}</span>;
            })}
          </div>
          <div style={{ fontSize:9, color:C.textSecondary, marginTop:6, lineHeight:1.5 }}>
            {minRating==="AAA" ? "Only sovereign-backed and AAA-rated bonds. FDs filtered to DICGC-insured banks only." : minRating==="AA" ? "Bonds rated AA- and above. FDs include both DICGC-insured banks and select NBFCs." : "Includes A+, A, and BBB-rated bonds alongside higher-rated ones. Higher yields, but check each bond\u2019s credit rating before investing."}
          </div>
        </div>
      </Section>

      <button onClick={() => parsed >= 5000 && onNext({ amount:parsed, returnGoal, liquidityNeed, minRating })}
        disabled={parsed < 5000}
        style={{ width:"100%", padding:14, borderRadius:14, border:"none", background: parsed >= 5000 ? C.purple : "#D1D5DB", color:"#fff", fontSize:15, fontWeight:700, cursor: parsed >= 5000 ? "pointer" : "default", boxShadow: parsed >= 5000 ? "0 4px 14px rgba(108,60,224,0.3)" : "none" }}>
        Explore products →
      </button>
    </div>
  );
}

// ─── SCREEN 2: Results ───
function ScreenResults({ prefs, onBack, onProduct }) {
  const { amount, returnGoal, liquidityNeed, minRating } = prefs;
  const [expanded, setExpanded] = useState("fds");
  const [sortBy, setSortBy] = useState("default");
  const [customMode, setCustomMode] = useState(false);

  const suggested = useMemo(() => {
    let fd=50, bond=30, gold=20;
    if (returnGoal==="conservative") { fd=70; bond=20; gold=10; }
    if (returnGoal==="growth") { fd=25; bond=30; gold=45; }
    if (liquidityNeed==="high") { fd+=15; bond-=10; gold-=5; }
    if (liquidityNeed==="low") { fd-=10; bond+=10; }
    const s=fd+bond+gold; fd=Math.round(fd/s*100); bond=Math.round(bond/s*100); gold=100-fd-bond;
    return { fd, bond, gold };
  }, [returnGoal, liquidityNeed]);

  const [fdPct, setFdPct] = useState(suggested.fd);
  const [bondPct, setBondPct] = useState(suggested.bond);
  const [goldPct, setGoldPct] = useState(suggested.gold);

  const handleSlider = (which, val) => {
    setCustomMode(true);
    const v = Number(val);
    if (which==="fd") { const r=100-v; const os=bondPct+goldPct||1; setFdPct(v); setBondPct(Math.round(r*bondPct/os)); setGoldPct(r-Math.round(r*bondPct/os)); }
    else if (which==="bond") { const r=100-v; const os=fdPct+goldPct||1; setBondPct(v); setFdPct(Math.round(r*fdPct/os)); setGoldPct(r-Math.round(r*fdPct/os)); }
    else { const r=100-v; const os=fdPct+bondPct||1; setGoldPct(v); setFdPct(Math.round(r*fdPct/os)); setBondPct(r-Math.round(r*fdPct/os)); }
  };
  const resetSugg = () => { setFdPct(suggested.fd); setBondPct(suggested.bond); setGoldPct(suggested.gold); setCustomMode(false); };

  const alloc = { fd:fdPct, bond:bondPct, gold:goldPct,
    fdAmt:Math.round(amount*fdPct/100), bondAmt:Math.round(amount*bondPct/100),
    goldAmt:amount-Math.round(amount*fdPct/100)-Math.round(amount*bondPct/100) };

  const filteredFDs = useMemo(() => { let f=[...FD_PRODUCTS]; if(minRating==="AAA") f=f.filter(x=>x.dicgc); if(liquidityNeed==="high") f=f.filter(x=>x.liquidityDays<=2); if(sortBy==="rate") f.sort((a,b)=>b.rate-a.rate); else if(sortBy==="liquidity") f.sort((a,b)=>a.liquidityDays-b.liquidityDays); return f; }, [minRating,liquidityNeed,sortBy]);
  const filteredBonds = useMemo(() => { let b=[...BOND_PRODUCTS]; if(minRating==="AAA") b=b.filter(x=>x.rating==="AAA"); if(minRating==="AA") b=b.filter(x=>["AAA","AA+","AA","AA-"].includes(x.rating)); if(sortBy==="rate") b.sort((a,b)=>b.yield-a.yield); return b; }, [minRating,sortBy]);
  const filteredGold = useMemo(() => { let g=[...GOLD_SILVER_MF]; if(sortBy==="rate") g.sort((a,b)=>b.returns3Y-a.returns3Y); return g; }, [sortBy]);

  const cats = [
    { key:"fds", icon:"🔒", label:"Fixed Deposits", pct:alloc.fd, amt:alloc.fdAmt, color:C.blue, count:filteredFDs.length },
    { key:"bonds", icon:"📊", label:"Bonds & NCDs", pct:alloc.bond, amt:alloc.bondAmt, color:C.purple, count:filteredBonds.length },
    { key:"gold", icon:"🟡", label:"Gold & Silver MFs", pct:alloc.gold, amt:alloc.goldAmt, color:C.gold, count:filteredGold.length },
  ];

  const Donut = () => {
    const r=44, circ=2*Math.PI*r; let off=0;
    const segs=[{p:alloc.fd,c:C.blue},{p:alloc.bond,c:C.purple},{p:alloc.gold,c:C.gold}];
    return (<svg viewBox="0 0 120 120" width="110" height="110">
      <circle cx="60" cy="60" r={r} fill="none" stroke={C.borderLight} strokeWidth="14" />
      {segs.map((s,i) => { const d=(s.p/100)*circ, g=circ-d, o=off; off+=d; return s.p > 0 ? <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={s.c} strokeWidth="14" strokeDasharray={`${d} ${g}`} strokeDashoffset={-o} strokeLinecap="round" /> : null; })}
      <text x="60" y="56" textAnchor="middle" fill={C.textPrimary} fontSize="13" fontWeight="800">{fmt(amount)}</text>
      <text x="60" y="69" textAnchor="middle" fill={C.textMuted} fontSize="8">total investment</text>
    </svg>);
  };

  const SliderRow = ({ icon, label, pct, color, onVal }) => (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:13 }}>{icon}</span>
          <span style={{ color:C.textPrimary, fontSize:11, fontWeight:600 }}>{label}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color, fontSize:14, fontWeight:800, minWidth:32, textAlign:"right" }}>{pct}%</span>
          <span style={{ color:C.textMuted, fontSize:10 }}>{fmt(Math.round(amount*pct/100))}</span>
        </div>
      </div>
      <div style={{ position:"relative", height:22, display:"flex", alignItems:"center" }}>
        <div style={{ position:"absolute", left:0, right:0, height:6, borderRadius:3, background:C.surfaceBg }} />
        <div style={{ position:"absolute", left:0, width:`${pct}%`, height:6, borderRadius:3, background:color, transition:"width 0.1s" }} />
        <input type="range" min={0} max={100} step={5} value={pct} onChange={e => onVal(e.target.value)}
          style={{ position:"absolute", left:0, right:0, width:"100%", height:22, opacity:0, cursor:"pointer", margin:0 }} />
        <div style={{ position:"absolute", left:`calc(${pct}% - 9px)`, width:18, height:18, borderRadius:9, background:C.white, border:`3px solid ${color}`, boxShadow:`0 2px 6px ${color}40`, pointerEvents:"none", transition:"left 0.1s" }} />
      </div>
    </div>
  );

  const ProductCard = ({ children, onClick }) => (
    <div onClick={onClick} style={{ background:C.surfaceBg, borderRadius:12, padding:12, marginBottom:6, cursor:"pointer", transition:"background 0.15s, transform 0.1s", border:`1px solid transparent` }}
      onMouseEnter={e => { e.currentTarget.style.background = C.purpleBg; e.currentTarget.style.borderColor = C.purpleSoft; }}
      onMouseLeave={e => { e.currentTarget.style.background = C.surfaceBg; e.currentTarget.style.borderColor = "transparent"; }}>
      {children}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", marginTop:6 }}>
        <span style={{ color:C.purple, fontSize:10, fontWeight:600 }}>View details →</span>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div onClick={onBack} style={{ width:32, height:32, borderRadius:10, background:C.surfaceBg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:C.textSecondary }}>←</div>
        <div style={{ color:C.textPrimary, fontSize:17, fontWeight:700 }}>Your exploration</div>
      </div>

      <Card style={{ padding:"10px 12px", marginBottom:12, background:C.purpleBg, border:`1px solid ${C.purpleSoft}` }}>
        <div style={{ fontSize:10, color:C.purple, lineHeight:1.5 }}>
          <strong>ℹ️</strong> Starting point based on your preferences. Adjust sliders to make it yours — tap any product for full details.
        </div>
        <div style={{ fontSize:9, color:C.textSecondary, lineHeight:1.5, marginTop:4, paddingTop:4, borderTop:`1px solid ${C.purpleSoft}` }}>
          The allocation shown is illustrative and not a recommendation. It does not account for your complete financial situation. You may choose any split, including 0% in any category.
        </div>
      </Card>

      {/* Allocation card */}
      <Card style={{ padding:14, marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
          <Donut />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ color:C.textMuted, fontSize:9, fontWeight:700, letterSpacing:"0.06em" }}>{customMode ? "YOUR SPLIT" : "SUGGESTED SPLIT"}</span>
              {customMode && <span onClick={resetSugg} style={{ color:C.purple, fontSize:9, fontWeight:600, cursor:"pointer" }}>↻ Reset</span>}
            </div>
            {cats.map(c => (
              <div key={c.key} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                <div style={{ width:10, height:10, borderRadius:5, background:c.color }} />
                <span style={{ color:C.textSecondary, fontSize:10, flex:1 }}>{c.label}</span>
                <span style={{ color:c.color, fontSize:12, fontWeight:800 }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
          <div style={{ color:C.textMuted, fontSize:9, fontWeight:700, letterSpacing:"0.06em", marginBottom:8 }}>ADJUST ALLOCATION</div>
          <SliderRow icon="🔒" label="Fixed Deposits" pct={fdPct} color={C.blue} onVal={v => handleSlider("fd",v)} />
          <SliderRow icon="📊" label="Bonds & NCDs" pct={bondPct} color={C.purple} onVal={v => handleSlider("bond",v)} />
          <SliderRow icon="🟡" label="Gold & Silver MFs" pct={goldPct} color={C.gold} onVal={v => handleSlider("gold",v)} />
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>
            {[{l:"Conservative",fd:70,bond:20,gold:10},{l:"Equal",fd:34,bond:33,gold:33},{l:"Growth",fd:20,bond:30,gold:50},{l:"FD only",fd:100,bond:0,gold:0}].map(p => (
              <button key={p.l} onClick={() => { setFdPct(p.fd); setBondPct(p.bond); setGoldPct(p.gold); setCustomMode(true); }}
                style={{ padding:"4px 10px", borderRadius:20, border:`1px solid ${fdPct===p.fd&&bondPct===p.bond ? C.purple : C.border}`, background:fdPct===p.fd&&bondPct===p.bond ? C.purpleBg : C.white, color:fdPct===p.fd&&bondPct===p.bond ? C.purple : C.textMuted, fontSize:9, fontWeight:600, cursor:"pointer" }}>{p.l}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Sort */}
      <div style={{ display:"flex", gap:5, marginBottom:10, alignItems:"center" }}>
        <span style={{ color:C.textMuted, fontSize:10, fontWeight:600 }}>Sort:</span>
        {[["default","Relevant"],["rate","Returns ↓"],["liquidity","Liquidity ↑"]].map(([k,l]) => (
          <button key={k} onClick={() => setSortBy(k)} style={{ padding:"4px 12px", borderRadius:20, border:`1.5px solid ${sortBy===k?C.purple:C.border}`, background:sortBy===k?C.purpleBg:C.white, color:sortBy===k?C.purple:C.textSecondary, fontSize:10, fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {/* Product Accordions */}
      {cats.map(cat => (
        <div key={cat.key} style={{ marginBottom:8 }}>
          <Card onClick={() => setExpanded(expanded===cat.key?null:cat.key)} style={{ borderRadius: expanded===cat.key?"14px 14px 0 0":14, border:`1.5px solid ${expanded===cat.key?cat.color+"40":C.border}`, borderBottom:expanded===cat.key?"none":undefined, display:"flex", alignItems:"center", gap:10, padding:12 }}>
            <span style={{ fontSize:20 }}>{cat.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ color:C.textPrimary, fontSize:13, fontWeight:700 }}>{cat.label}</div>
              <div style={{ color:C.textSecondary, fontSize:10 }}>{cat.count} products · {cat.pct}% · {fmt(cat.amt)}</div>
            </div>
            <span style={{ color:C.textMuted, fontSize:14, transition:"transform 0.2s", transform:expanded===cat.key?"rotate(180deg)":"rotate(0)" }}>▾</span>
          </Card>
          {expanded===cat.key && (
            <div style={{ background:C.white, borderRadius:"0 0 14px 14px", padding:"8px 10px 10px", border:`1.5px solid ${cat.color}40`, borderTop:"none" }}>
              {cat.key==="fds" && filteredFDs.map(fd => (
                <ProductCard key={fd.id} onClick={() => onProduct("fd",fd)}>
                  <div style={{ color:C.textPrimary, fontSize:12, fontWeight:700, marginBottom:4 }}>{fd.bank}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:6 }}>
                    <Pill bg={C.blueBg} color={C.blue}>{fd.rate}% p.a.</Pill>
                    <Pill bg={fd.dicgc?C.greenBg:C.redBg} color={fd.dicgc?C.green:C.red}>{fd.dicgc?"DICGC ✓":"No DICGC"}</Pill>
                    <Pill bg={C.surfaceBg} color={C.textSecondary}>{fd.tenure}</Pill>
                  </div>
                  <div style={{ display:"flex", gap:10, fontSize:10, color:C.textSecondary }}>
                    <span>💧 {fd.liquidity}</span><span>Min {fmt(fd.minAmt)}</span>
                  </div>
                </ProductCard>
              ))}
              {cat.key==="bonds" && filteredBonds.map(b => (
                <ProductCard key={b.id} onClick={() => onProduct("bond",b)}>
                  <div style={{ color:C.textPrimary, fontSize:12, fontWeight:700, marginBottom:4 }}>{b.name}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:6 }}>
                    <Pill bg={b.rating==="AAA"?C.purpleBg:b.rating.startsWith("AA")?C.greenBg:C.amberBg} color={b.ratingColor} style={{ fontWeight:800 }}>{b.rating}</Pill>
                    <Pill bg={C.purpleBg} color={C.purple}>{b.yield}% yield</Pill>
                    <Pill bg={C.surfaceBg} color={C.textSecondary}>{b.tenure}</Pill>
                    <Pill bg={C.surfaceBg} color={C.textSecondary}>{b.secured}</Pill>
                  </div>
                  <div style={{ display:"flex", gap:10, fontSize:10, color:C.textSecondary }}>
                    <span>🏢 {b.issuerType}</span><span>Min {fmt(b.minAmt)}</span>
                  </div>
                </ProductCard>
              ))}
              {cat.key==="gold" && filteredGold.map(g => (
                <ProductCard key={g.id} onClick={() => onProduct("gold",g)}>
                  <div style={{ color:C.textPrimary, fontSize:12, fontWeight:700, marginBottom:4 }}>{g.name}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:6 }}>
                    <Pill bg={C.goldBg} color={C.gold}>{g.metal}</Pill>
                    <Pill bg={C.greenBg} color={C.green}>{g.returns3Y}% (3Y)</Pill>
                    <Pill bg={C.surfaceBg} color={C.textSecondary}>{g.type}</Pill>
                    <Pill bg={C.surfaceBg} color={C.textSecondary}>Exp {g.expenseRatio}%</Pill>
                  </div>
                  <div style={{ display:"flex", gap:10, fontSize:10, color:C.textSecondary }}>
                    <span>📊 1Y: {g.returns1Y}%</span><span>AUM {g.aum}</span>
                  </div>
                </ProductCard>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SCREEN 3: Detail ───
function ScreenDetail({ type, product:p, onBack }) {
  const Row = ({ label, value, highlight }) => (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${C.borderLight}` }}>
      <span style={{ color:C.textSecondary, fontSize:11 }}>{label}</span>
      <span style={{ color: highlight || C.textPrimary, fontSize:11, fontWeight:600, textAlign:"right", maxWidth:"55%" }}>{value}</span>
    </div>
  );

  const title = type==="fd" ? p.bank : p.name;
  const subtitle = type==="fd" ? "Fixed Deposit" : type==="bond" ? "Bond / NCD" : "Mutual Fund";

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
        <div onClick={onBack} style={{ width:32, height:32, borderRadius:10, background:C.surfaceBg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:C.textSecondary }}>←</div>
        <div>
          <div style={{ color:C.textPrimary, fontSize:16, fontWeight:700 }}>{title}</div>
          <div style={{ color:C.textMuted, fontSize:11 }}>{subtitle}</div>
        </div>
      </div>

      {/* Hero pills */}
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
        {type==="fd" && <><Pill bg={C.blueBg} color={C.blue}>{p.rate}% p.a.</Pill><Pill bg={p.dicgc?C.greenBg:C.redBg} color={p.dicgc?C.green:C.red}>{p.dicgc?"DICGC Insured":"No DICGC"}</Pill><Pill bg={C.surfaceBg} color={C.textSecondary}>{p.bankType}</Pill></>}
        {type==="bond" && <><Pill bg={C.purpleBg} color={p.ratingColor} style={{fontWeight:800,fontSize:12}}>{p.rating}</Pill><Pill bg={C.purpleBg} color={C.purple}>{p.yield}% yield</Pill><Pill bg={C.surfaceBg} color={C.textSecondary}>{p.secured}</Pill></>}
        {type==="gold" && <><Pill bg={C.goldBg} color={C.gold}>{p.metal}</Pill><Pill bg={C.greenBg} color={C.green}>{p.returns3Y}% (3Y)</Pill><Pill bg={C.surfaceBg} color={C.textSecondary}>{p.type}</Pill></>}
      </div>

      <Card style={{ padding:14, marginBottom:12 }}>
        <div style={{ color:C.textMuted, fontSize:10, fontWeight:700, letterSpacing:"0.06em", marginBottom:6 }}>
          {type==="fd" ? "FD PARAMETERS" : type==="bond" ? "BOND PARAMETERS" : "FUND PARAMETERS"}
        </div>
        {type==="fd" && <>
          <Row label="Interest Rate" value={`${p.rate}% per annum`} highlight={C.blue} />
          <Row label="Tenure" value={p.tenure} /><Row label="Minimum Amount" value={fmt(p.minAmt)} /><Row label="Maximum Amount" value={fmt(p.maxAmt)} />
          <Row label="Payout Options" value={p.payout} /><Row label="Liquidity / Withdrawal" value={p.liquidity} highlight={p.liquidityDays===0?C.green:undefined} />
          <Row label="Premature Withdrawal Penalty" value={p.penalty} /><Row label="DICGC Insurance" value={p.dicgc?"Covered up to ₹5L per depositor":"Not covered"} highlight={p.dicgc?C.green:C.red} />
          <Row label="Bank Type" value={p.bankType} />
        </>}
        {type==="bond" && <>
          <Row label="Credit Rating" value={p.rating} highlight={p.ratingColor} /><Row label="Yield to Maturity" value={`${p.yield}%`} highlight={C.purple} />
          <Row label="Coupon" value={p.coupon} /><Row label="Tenure" value={p.tenure} /><Row label="Face Value" value={fmt(p.faceValue)} />
          <Row label="Min Investment" value={fmt(p.minAmt)} /><Row label="Secured / Unsecured" value={p.secured} /><Row label="Issuer Type" value={p.issuerType} />
          <Row label="Liquidity" value={p.liquidity} /><Row label="Listed On" value={p.listingExchange} />
        </>}
        {type==="gold" && <>
          <Row label="Fund Type" value={p.type} /><Row label="Metal" value={p.metal} /><Row label="1-Year Return" value={`${p.returns1Y}%`} highlight={C.green} />
          <Row label="3-Year Avg Return" value={`${p.returns3Y}%`} highlight={C.green} /><Row label="Expense Ratio" value={`${p.expenseRatio}%`} />
          <Row label="NAV" value={`₹${p.nav}`} /><Row label="AUM" value={p.aum} /><Row label="Benchmark" value={p.benchmark} />
          <Row label="Min SIP" value={p.minSIP>0?fmt(p.minSIP):"N/A (ETF)"} /><Row label="Min Lumpsum" value={fmt(p.minLump)} />
          <Row label="Exit Load" value={p.exitLoad} /><Row label="Redemption" value={p.liquidity} /><Row label="Risk Category" value={p.riskLabel} />
        </>}
      </Card>

      {type==="bond" && (
        <Card style={{ padding:12, marginBottom:12 }}>
          <div style={{ color:C.textMuted, fontSize:10, fontWeight:700, letterSpacing:"0.06em", marginBottom:8 }}>CREDIT RATING SCALE</div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {["AAA","AA+","AA","AA-","A+","A","BBB"].map(r => (
              <Pill key={r} bg={r===p.rating?C.purpleBg:C.surfaceBg} color={r===p.rating?C.purple:C.textMuted} style={{ border:r===p.rating?`1.5px solid ${C.purple}`:"1.5px solid transparent" }}>{r}</Pill>
            ))}
          </div>
          <div style={{ color:C.textSecondary, fontSize:9, marginTop:8, lineHeight:1.5 }}>
            AAA = Highest safety · AA = High safety · A = Adequate safety · BBB = Moderate safety
          </div>
        </Card>
      )}

      {type==="fd" && !p.dicgc && (
        <Card style={{ padding:12, marginBottom:12, background:C.redBg, border:`1px solid #FECACA` }}>
          <div style={{ fontSize:10, color:C.red, lineHeight:1.5 }}>
            <strong>⚠️ NBFC deposit</strong> — not covered under DICGC insurance (which protects bank FDs up to ₹5 lakh). Returns depend on the company's financial strength. Check the credit rating before investing.
          </div>
        </Card>
      )}

      {type==="gold" && (
        <Card style={{ padding:12, marginBottom:12, background:C.amberBg, border:`1px solid #FDE68A` }}>
          <div style={{ fontSize:10, color:C.gold, lineHeight:1.5 }}>
            Past returns are not indicative of future performance. {p.metal} prices fluctuate with global markets. Read the scheme document before investing.
          </div>
        </Card>
      )}

      <Card style={{ padding:12, marginBottom:12, background:C.surfaceBg }}>
        <div style={{ fontSize:9, color:C.textSecondary, lineHeight:1.6 }}>
          <strong style={{ color:C.textPrimary }}>Disclaimer:</strong> Information presented here is sourced from the respective issuers and is for informational purposes only. It does not constitute investment advice or a recommendation. Verify all details directly with the issuer. Stable Money acts solely as a distributor and does not guarantee returns, liquidity timelines, or any outcomes that depend on the issuer or market conditions. Past performance is not indicative of future results. Please read all scheme/offer documents carefully and consider consulting a SEBI-registered investment advisor before investing.
        </div>
      </Card>

      <button onClick={onBack} style={{ width:"100%", padding:12, borderRadius:14, border:`1.5px solid ${C.purple}`, background:C.white, color:C.purple, fontSize:13, fontWeight:700, cursor:"pointer" }}>
        ← Back to all products
      </button>
    </div>
  );
}

// ─── App ───
export default function App() {
  const [screen, setScreen] = useState("setup");
  const [prefs, setPrefs] = useState(null);
  const [detail, setDetail] = useState(null);

  return (
    <div style={{ padding:"16px 12px", fontFamily:"'Inter',system-ui,-apple-system,sans-serif", background:"#EEEAF5", minHeight:"100vh" }}>
      <Phone>
        {screen==="setup" && <ScreenSetup onNext={p => { setPrefs(p); setScreen("results"); }} />}
        {screen==="results" && prefs && <ScreenResults prefs={prefs} onBack={() => setScreen("setup")} onProduct={(t,p) => { setDetail({type:t,product:p}); setScreen("detail"); }} />}
        {screen==="detail" && detail && <ScreenDetail type={detail.type} product={detail.product} onBack={() => setScreen("results")} />}
      </Phone>
    </div>
  );
}
