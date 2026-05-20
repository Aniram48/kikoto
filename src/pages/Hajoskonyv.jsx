import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, ChevronDown, ChevronRight, Download, Phone, Mail,
  MapPin, Building2, Shield, Anchor, AlertTriangle, Flame,
  Volume2, FlaskConical, HeartPulse, Globe, Calendar, ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import WaveStrip from '../components/WaveStrip'

// ─── adatok ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'tajek',    label: 'Tájékoztató' },
  { id: 'kepzes',  label: 'Képzés' },
  { id: 'koltseg', label: 'Díjak' },
  { id: 'vizsga',  label: 'Vizsga anyaga' },
  { id: 'kivaltas',label: 'Könyv kiváltása' },
  { id: 'kapcsolat',label: 'Kapcsolat' },
]

const IDOPONTOK = [
  { nap: '22', ho: 'Máj', cim: 'Elméleti képzés', leiras: 'Távoktatással, online, saját ütemben elvégezhető', accent: 'bg-accent' },
  { nap: '23', ho: 'Máj', cim: 'Gyakorlati oktatás', leiras: 'Szegedi Vitorlás Kikötőben, a Tiszán', accent: 'bg-sky' },
  { nap: '24', ho: 'Máj', cim: 'Gyakorlati oktatás és vizsga', leiras: 'Szegedi Vitorlás Kikötőben, független vizsgabiztos előtt', accent: 'bg-accent' },
]

const KOLTSEGEK_KEPZES = [
  { label: 'Tanfolyam díja', ertek: '50 000 Ft' },
  { label: 'Vizsgadíj', ertek: '20 000 Ft' },
]

const KOLTSEGEK_KAVK = [
  { label: 'Szolgálati könyv nyomtatvány', ertek: '5 400 Ft' },
  { label: 'Szolgálati könyv kiállítása', ertek: '12 000 Ft' },
  { label: 'Bejegyzés szolgálati könyvbe', ertek: '8 700 Ft' },
  { label: 'Utalandó összesen', ertek: '26 100 Ft', bold: true },
]

const TEMAKOROK = [
  {
    id: 't1',
    icon: Shield,
    cim: '1. Életmentő felszerelések és vízbeesés',
    accentLine: 'bg-accent',
    badge: 'Alap',
    badgeStyle: 'bg-yellow-400/10 text-yellow-700 border-yellow-400/30',
    kerdesek: [
      ['Milyen egyéni mentőeszközök találhatók a hajón?', 'Mentőmellény, mentőgyűrű, mentőpatkó, valamint egyéb személyes lebegési eszközök.'],
      ['Milyen csoportos mentőeszközök találhatók a hajón?', 'Mentőcsónak, felfújható mentőtutaj, mentőpad és mentőpárna.'],
      ['Mire szolgál a mentőgyűrű és mentőpatkó?', 'Vízbe esett személy megmentésére szolgál — a fedélzetről dobják a vízbe esett felé, aki kapaszkodik belé, majd a fedélzetről húzzák ki.'],
      ['Mire szolgál a mentőpad és mentőpárna?', 'Csoportos mentést segítenek elő, ha a hajó süllyed vagy felborult.'],
      ['Hogyan bocsátják vízre a mentőcsónakot?', 'Csörlők segítségével engedik le a hajó oldalán a vízre, majd eloldják a biztosítékokat.'],
      ['Mikor áll fenn fokozottan a vízbeesés kockázata?', 'Rossz időjárásban, nagy hullámzáskor, korlát nélküli fedélzeteken, manőverezés közben, sötétben, sikamlós fedélzeten és fáradtság esetén.'],
      ['Milyen veszélyt jelent az alacsony vízhőmérséklet?', 'Gyors lehűlést és hipotérmiát okozhat, amely rövid időn belül eszméletvesztéshez és halálhoz vezet.'],
      ['Milyen veszélyt jelent a gyorsan áramló víz?', 'A sodrás megakadályozza az úszást, elragadja az egyént és akadályokhoz sodorhatja.'],
      ['Milyen veszélyt jelent a nagy hajóforgalom?', 'A közlekedő hajók a vízbe esettet nem látják, légcsavar megsebezhet, hullámok elmeríthetik.'],
      ['Hogyan mentik ki a vízbe esett személyt?', 'Mentőgyűrűt dobnak, a hajót megállítják, kimentő horgot vagy létrát alkalmaznak, majd a fedélzetre emelik az illetőt.'],
      ['Melyek a hipotermia tünetei?', 'Remegés, zsibbadás, zavartság, koordinációzavar, majd eszméletvesztés és légzésleállás.'],
      ['Hogyan kell kezelni a kihűléses állapotban lévő sérültet?', 'Száraz, meleg helyre kell vinni, nedves ruháit le kell venni, be kell takarni, meleg italt adni (ha eszméleténél van), és orvost kell hívni.'],
      ['Hogyan függ össze a kihűlés és a sokk?', 'A kihűlés csökkenti a vérnyomást és a szívverés hatékonyságát, ami keringési sokkot idézhet elő.'],
      ['Hogyan kezelik a légzésleállt vízből kimentett személyt?', 'Azonnal újraélesztést (CPR) kell kezdeni: mellkaskompresszió és szájból-szájba lélegeztetés, amíg a mentők meg nem érkeznek.'],
      ['Mire szolgál a mentőmellény?', 'Arra, hogy a viselőjét vízben felszínen tartsa és fejét a víz felett tartsa, megakadályozva a fulladást.'],
      ['Milyen kialakítású a mentőmellény?', 'Habosított vagy felfújható belső résszel rendelkezik, csatolópántokkal és fényvisszaverő csíkokkal, esetenként jelzősíppal és visszaverő anyaggal.'],
      ['Milyen típusú mentőmellények léteznek?', 'Fix habos (automata felúszó), CO₂ patronos felfújható (automatikus és kézi), valamint kombinált típusok.'],
      ['Hogyan kell felvenni a mentőmellényt?', 'A mellényt fej felett kell átbújtatni, a pántokat a derék körül rögzíteni és szorosan megkötni.'],
      ['Milyen mentőmellény alkalmazható a hajózásban?', 'Legalább 150 N felhajtóerejű, CE-jelölésű, az érvényes szabványnak megfelelő mellény.'],
      ['Mit kell ellenőrizni a mentőmellényen használat előtt?', 'A felfúvó patron állapotát, a pántok épségét, a csatok működőképességét és a mellény általános állapotát.'],
    ],
  },
  {
    id: 't2',
    icon: AlertTriangle,
    cim: '2. Hajófedélzet — különleges munkakörnyezet',
    accentLine: 'bg-sky',
    badge: 'Biztonság',
    badgeStyle: 'bg-sky-400/10 text-sky-700 border-sky-400/30',
    kerdesek: [
      ['Milyen egyéni munkavédelmi eszközöket ismer?', 'Sisak, védőszemüveg, fülvédő, munkavédelmi cipő, kesztyű, munkaruha, biztonsági hám.'],
      ['Mi jellemzi a munkavédelmi cipőket?', 'Acélbetétes orruk, csúszásálló talpuk és olajálló anyaguk van, védelmet nyújtanak ejtett tárgyak és csúszás ellen.'],
      ['Milyen veszélye van a magasban végzett munkának?', 'Lezuhanás, tárgyak leesése, szédülés, és megfelelő biztosítás hiányában súlyos sérülés.'],
      ['A hajófedélzet mely területei veszélyesek?', 'Csúszós fedélzetfelület, korlát nélküli peremek, nyitott búvónyílások, gépek közelében lévő területek.'],
      ['Milyen veszélyei vannak a gépházi munkának?', 'Magas hőmérséklet, olajfolt, zajterhelés, mozgó alkatrészek, elektromos veszély.'],
      ['Hogyan végezzünk munkát antenna közelében?', 'Az antennát ki kell kapcsolni, szüneteltetni kell a rádióadást, és jelezni kell a hidasnak.'],
      ['Mire kell ügyelni mozgó alkatrészek közelében?', 'Laza ruhadarabok, hajzat és szerszámok ne kerüljenek a mozgó részek közelébe. Védőburkolatok legyenek a helyükön.'],
      ['Milyen veszélyei vannak a zárt térben végzett munkának?', 'Oxigénhiány, mérgező gázok felhalmozódása, tüzet okozó gőzök. Előzetes levegőmérés, biztonsági őr szükséges.'],
      ['Mi a hajófedélzeti vészhelyzeti tervek szerepe?', 'Meghatározzák a teendőket tűz, árvíz, vízbeesés és más vészhelyzetekben, megjelölik a gyülekezési pontokat.'],
      ['Hogyan zajlik a hajó vészhelyzeti kiürítése?', 'Jelzés után mindenki a kijelölt gyülekezési ponthoz vonul, a mentőmellényt felveszi, és a személyzet irányítása szerint cselekszik.'],
      ['Hogyan végzik a vízbeesett kimentését?', 'Mentőgyűrűt dobnak, a hajót megállítják, és a kezelési terv szerint a vízbeesett felé közelítenek.'],
      ['Hogyan kommunikálnak az utasokkal vészhelyzetben?', 'Hangszóróval, közvetlen utasításokkal, jelzőtáblákkal és higgadt, határozott kommunikációval irányítják az utasokat.'],
      ['Hogyan működik a kötélfeszítő csörlő?', 'Elektromos vagy hidraulikus meghajtással tekeri fel a kötelet, biztonsági fék és túlterhelés-védelem van rajta.'],
      ['Milyen veszélyei vannak a kötélfeszítő csörlőknek?', 'Becsípődés, visszapattanó kötél, csörlőmeghibásodás, feszülő kötél elvágása.'],
      ['Milyen munkavédelmi eszközök kellenek kötelekkel végzett munkához?', 'Kesztyű, biztonsági szemüveg, megfelelő cipő, védőkesztyű sodronykötelekhez.'],
      ['Milyen veszélyei vannak a sodronykötelekkel végzett munkának?', 'A kitörő szálak kesztyűn áthatolnak, a szakadt kötél visszacsapódhat, terhelés alatt nem szabad megközelíteni.'],
    ],
  },
  {
    id: 't3',
    icon: Flame,
    cim: '3. Tűzoltás a hajón',
    accentLine: '#e87a40',
    badge: 'Tűz',
    badgeStyle: 'bg-orange-400/10 text-orange-700 border-orange-400/30',
    kerdesek: [
      ['Milyen kézi tűzoltó berendezéseket ismer?', 'Poroltó, CO₂ oltókészülék, haboltó, vizes oltókészülék és tűzoltótakaró.'],
      ['Melyik tűzoltót mikor használjuk?', 'Elektromos tűznél CO₂ vagy poroltó; zsír/olajtűznél haboltó vagy tűzoltótakaró; általános égésnél vizes vagy poroltó.'],
      ['Hogyan működik a tűzoltóvíz-hálózat?', 'A szivattyú a hajó vízterétől vesz vizet és nyomás alatt juttatja el a tűzcsapokhoz a fedélzeten.'],
      ['Hogyan kell kezelni a kézi tűzoltó készüléket?', 'Biztosítót kihúzni, a fúvókát a tűz tövére irányítani, a kart lenyomni és oldalról haladva oltani.'],
      ['Mire kell ügyelni CO₂ oltókészülék használatakor?', 'Zárt térben csak rövid ideig szabad használni, mert a CO₂ kiszorítja az oxigént és fulladást okozhat. Védőkesztyű ajánlott a fagyott cső miatt.'],
    ],
  },
  {
    id: 't4',
    icon: Volume2,
    cim: '4. Zajterhelés a fedélzeten',
    accentLine: '#a8d5a2',
    badge: 'Zaj',
    badgeStyle: 'bg-green-400/10 text-green-700 border-green-400/30',
    kerdesek: [
      ['Melyek a hajófedélzeti zajforrások?', 'Motor, hajtómű, generátor, szél, hullámverés, csörlők, ventilátorok és egyéb gépészeti berendezések.'],
      ['Milyen egészségkárosító hatásai vannak a zajterhelésnek?', 'Rövid távon: fülzúgás, halláskárosodás. Hosszú távon: tartós hallásveszteség, stressz, szív- és érrendszeri problémák.'],
      ['Hogyan csökkenthetjük a zajterhelést a hajón?', 'Hangszigetelt gépterekkel, zajcsökkentő burkolatokkal, rendszeres karbantartással és a tartózkodási idő minimalizálásával zajban.'],
      ['Milyen egyéni zajvédő eszközök léteznek?', 'Fülvédő (füldugó és fülvédő tok), zajszigetelő sisakok és füles védősisakok.'],
    ],
  },
  {
    id: 't5',
    icon: FlaskConical,
    cim: '5. Veszélyes anyagok kezelése',
    accentLine: '#c4a8d5',
    badge: 'Vegyi',
    badgeStyle: 'bg-purple-400/10 text-purple-700 border-purple-400/30',
    kerdesek: [
      ['Milyen veszélyes anyagokkal találkozhat a hajón?', 'Üzemanyagok, kenőanyagok, akkumulátorsav, festékek, oldószerek, tisztítószerek és esetenként veszélyes rakományok.'],
      ['Hogyan tároljuk a veszélyes anyagokat?', 'Eredeti, jól zárt tartályban, szellőztetett, tűzbiztos raktárban, az anyagok összeférhetőségét figyelembe véve.'],
      ['Mire kell ügyelni vegyi anyagokkal való tisztításkor?', 'Kesztyűt, szemüveget viselni, jól szellőztetni, a vegyszert soha nem szabad tömény állapotban belélegezni.'],
      ['Milyen hatása lehet a veszélyes anyagoknak az emberi szervezetre?', 'Mérgezés, bőr- és szemégés, légúti irritáció, hosszú távon szervi károsodás, rák.'],
      ['Milyen előkészületek kellenek veszélyes anyagokkal végzett munkához?', 'Biztonsági adatlap ismerete, egyéni védőfelszerelés felvétele, megfelelő szellőzés biztosítása, mentőfelszerelés közelben tartása.'],
      ['Milyen egyéni munkavédelmi eszközöket kell használni?', 'Vegyszerálló kesztyű, védőszemüveg vagy arcvédő, légzésvédő maszk, vegyszerálló védőruha és csizma.'],
    ],
  },
  {
    id: 't6',
    icon: HeartPulse,
    cim: '6. Alapszintű elsősegélynyújtás',
    accentLine: '#e87070',
    badge: 'Elsősegély',
    badgeStyle: 'bg-red-400/10 text-red-700 border-red-400/30',
    kerdesek: [
      ['Hogyan ellenőrizzük az életfunkciókat?', 'Tudatállapot ellenőrzése (megszólítás, megrázás), légzés figyelése (látás, hallás, érzés 10 mp-ig), pulzus tapintása.'],
      ['Milyen vérzéstípusokat ismer?', 'Ütőeres (artériás), visszeres (vénás) és hajszáleres (kapilláris) vérzés.'],
      ['Hogyan ismeri fel a végtagtörést?', 'Fájdalom, duzzanat, deformitás, mozgáskorlátozottság, esetleg csontcsikorgás és rendellenes mozdulat.'],
      ['Hogyan látja el az ütőeres vérzéses sérültet?', 'Nyomókötést kell alkalmazni, a végtagnál leszorítást (tourniquet), majd sérültet azonnal orvoshoz kell juttatni.'],
      ['Hogyan látja el a hajszáleres vérzéses sérültet?', 'Sebet megtisztítani, nyomókötést felhelyezni, szükség esetén fertőtleníteni.'],
      ['Hogyan látja el a visszeres vérzéses sérültet?', 'Nyomókötés és a végtag megemelése a vérzés csillapításához.'],
      ['Mi a teendő gerincsérülés gyanúja esetén?', 'A sérültet mozgatni tilos, nyakát rögzíteni kell, és azonnal mentőt kell hívni.'],
      ['Hogyan látja el a sokkos állapotban lévő sérültet?', 'Vízszintesen fektetni, lábát felemelni, takarni, nyugtatni, és azonnal mentőt hívni.'],
      ['Hogyan működik az automata defibrillátor (AED)?', 'Bekapcsolás után hangutasításokat ad, az elektródákat a mellkasra kell helyezni, az eszköz elemzi a szívritmust és szükség esetén sokkot lead.'],
      ['Hogyan ismeri fel a mérgezés tüneteit?', 'Hányinger, hányás, görcs, légzési nehézség, tudatzavar, bőrelszíneződés.'],
      ['Mit jelent a stabil oldalfekvés?', 'A sérültet oldalt fektetik, hogy a légút szabad maradjon, és esetleges hányás ne okozzon fulladást. Eszméletlen, de légző sérülteknél alkalmazzák.'],
      ['Mikor végez mellkaskompressziót?', 'Ha a sérült nem lélegzik és nincs pulzusa — keringésleállás esetén azonnal.'],
      ['Hogyan végzi a mellkaskompressziót?', 'A szegycsont alsó harmadán 5–6 cm mélységű, percenként 100–120 nyomás, váltakozva 2 lélegeztetéssel (30:2 arány).'],
      ['Mit kell tenni sérült észlelése esetén?', 'Biztonságba helyezni, életfunkciókat ellenőrizni, mentőt hívni (112), elsősegélyt nyújtani.'],
      ['Melyek a szívinfarktus tünetei?', 'Mellkasi szorítás, fájdalom a karban/nyakban/állkapocsban, légszomj, izzadás, hányinger.'],
      ['Melyek a stroke tünetei?', 'Arcfél eltorzulása, kézgyengeség, beszédzavar, hirtelen fejfájás, látászavar, egyensúlyzavar.'],
    ],
  },
  {
    id: 't7',
    icon: Globe,
    cim: '7. Kommunikáció idegen nyelven',
    accentLine: 'bg-sky',
    badge: 'Nyelv',
    badgeStyle: 'bg-sky-400/10 text-sky-700 border-sky-400/30',
    kerdesek: [
      ['"There is a dangerous situation"', 'Veszélyes helyzet állt elő — általános vészhelyzet jelzésére használjuk.'],
      ['"The ship is on fire"', 'A hajó tüzet fogott — tűzvész jelzésére.'],
      ['"The ship is aground"', 'A hajó megfeneklett — zátonyra futás jelzésére.'],
      ['"The ship is collided"', 'A hajó összeütközött — ütközés jelzésére.'],
      ['"The ship is flooding"', 'A hajóba víz hatol be — süllyedés veszélyének jelzésére.'],
      ['"Someone has fallen overboard"', 'Valaki a vízbe esett — vízbeesés jelzésére.'],
      ['"I need assistance"', 'Segítségre van szükségem — általános segélykérés.'],
      ['"There is a medical emergency"', 'Orvosi vészhelyzet van — sürgős egészségügyi segítség kérésekor.'],
    ],
  },
]

// ─── kis komponensek ──────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-slate-500 mb-1">
      {children}
    </p>
  )
}

function InfoCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-900/10 bg-slate-50 p-6 ${className}`}>
      {children}
    </div>
  )
}

function DownloadLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-water transition-colors group"
    >
      <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      {children}
    </a>
  )
}

function AccordionItem({ kerdes, valasz }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-900/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-slate-800 leading-snug">{kerdes}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 py-3.5 text-sm text-slate-600 leading-relaxed border-t border-slate-900/10 bg-white">
          {valasz}
        </div>
      )}
    </div>
  )
}

function TemakörCard({ temakör }) {
  const [open, setOpen] = useState(false)
  const Icon = temakör.icon
  return (
    <div
      className="group relative cursor-pointer rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden"
    >
      {/* fejléc */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 hover:bg-slate-100 transition-colors text-left"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950/5 flex-shrink-0">
          <Icon className="w-5 h-5 text-slate-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 mb-0.5">
            <span className={`inline-block px-2 py-0.5 rounded-full border text-[9px] ${temakör.badgeStyle}`}>
              {temakör.badge}
            </span>
          </p>
          <h3 className="text-base font-semibold text-slate-950 leading-snug">{temakör.cim}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{temakör.kerdesek.length} kérdés</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* kérdések */}
      {open && (
        <div className="px-5 pb-5 flex flex-col gap-2">
          {temakör.kerdesek.map(([k, v], i) => (
            <AccordionItem key={i} kerdes={k} valasz={v} />
          ))}
        </div>
      )}

      {/* accent vonal */}
      <div
        className={`h-[3px] transition-all duration-300 ${
          open ? temakör.accentLine : 'bg-transparent'
        }`}
      />
    </div>
  )
}

// ─── fő oldal ─────────────────────────────────────────────────────────────────

export default function Hajoskonyv() {
  const [activeTab, setActiveTab] = useState('tajek')

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 flex flex-col pt-8">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-slate-700 uppercase mb-5">
            <BookOpen className="w-4 h-4 opacity-70" />
            Autoinfo Hungary EC
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight mb-4">
            Hajós{' '}
            <span className="font-semibold text-water">Szolgálati Könyv</span>
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
            ÉKM által akkreditált biztonsági alapképzés és kompetencia vizsga a hajóskönyv kiváltásához.
          </p>
          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
      </div>

      {/* Tab navigáció */}
      <div className="bg-slate-50 border-b border-slate-900/10 overflow-x-auto">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex py-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-water text-water'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tartalom */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-20">

        {/* ── TÁJÉKOZTATÓ ── */}
        {activeTab === 'tajek' && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>Változások</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                A hajóskönyv kiváltásának <span className="font-semibold text-water">változásai</span>
              </h2>
            </div>

            <InfoCard>
              <p className="text-sm text-slate-600 leading-relaxed">
                A szolgálati, kereseti célú hajózás, a hajón történő munkavégzés dokumentálása a{' '}
                <strong className="text-slate-800">Hajós Szolgálati Könyvben</strong> történik.
                Az EU jogharmonizáció eredményeként a könyv kiváltása fokozatosan szigorodott.
              </p>
            </InfoCard>

            {/* Időrend kártyák */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { ev: 'Korábban', leiras: 'Egyszerű megvásárlással lehetett hozzájutni a hajóskönyvhöz.', accent: '#94a3b8' },
                { ev: '2022-től', leiras: 'A KAV vizsgabiztosai által lebonyolított vizsgát is igényelt, amelyre önállóan lehetett felkészülni.', accent: 'bg-accent' },
                { ev: '2023-tól', leiras: 'Kötelező ISO minősítésű, ÉKM által akkreditált képző szervnél tanfolyam és független vizsgabiztos előtt vizsga.', accent: '#1a3a5c' },
              ].map(({ ev, leiras, accent }) => (
                <div
                  key={ev}
                  className="rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden flex flex-col"
                >
                  <div className="p-5 flex-1">
                    <p className={`text-xs font-bold tracking-[0.25em] uppercase mb-2 ${accent}`}>{ev}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{leiras}</p>
                  </div>
                  <div className={`h-[3px] ${accent}`} />
                </div>
              ))}
            </div>

            <InfoCard>
              <SectionLabel>A változások előnye</SectionLabel>
              <p className="text-sm text-slate-600 leading-relaxed">
                A — változatlanul a KAV által kiadott — Hajós Szolgálati Könyv{' '}
                <strong className="text-slate-800">gyakornok bejegyzéssel</strong> kerül kiállításra,
                amely sok munkakörben az azonnali munkába állást is lehetővé teszi, és alapjául szolgál
                a magasabb hajós képesítések eléréséhez a szolgálati idő igazolására.
              </p>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Jogszabályi alap</SectionLabel>
              <p className="text-sm text-slate-800 font-semibold mb-1">12/2022.(IV.14.) ITM rendelet</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                A rendelet a hajós szolgálati könyv megszerzéséhez biztonsági kompetencia vizsga
                letételét írja elő.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                A képzést az <strong className="text-slate-800">AUTOINFO HUNGARY EC</strong> végzi,{' '}
                <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded">HHF/27262-3/2023-ÉKM</span>{' '}
                számon engedélyezett tanfolyamon.
              </p>
            </InfoCard>
          </div>
        )}

        {/* ── KÉPZÉS ── */}
        {activeTab === 'kepzes' && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>Aktuális időpontok</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                Képzési <span className="font-semibold text-water">program</span>
              </h2>
            </div>

            {/* Dátumos kártyák */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {IDOPONTOK.map(({ nap, ho, cim, leiras, accent }) => (
                <div
                  key={nap}
                  className="rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden flex flex-col"
                >
                  <div className="p-5 flex gap-4 flex-1">
                    <div
                      className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 bg-water"
                    >
                      <span className="text-xl font-bold text-white leading-none">{nap}</span>
                      <span className="text-[9px] font-semibold tracking-widest uppercase text-white/50 mt-0.5">{ho}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-snug mb-1">{cim}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{leiras}</p>
                    </div>
                  </div>
                  <div className={`h-[3px] ${accent}`} />
                </div>
              ))}
            </div>

            <InfoCard>
              <SectionLabel>A tanfolyam felépítése</SectionLabel>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                A képzés <strong className="text-slate-800">20 óra</strong> elméleti és túlnyomóan
                gyakorlati képzésből áll, három nap alatt kerül lebonyolításra.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Az elméleti képzés anyaga oktató videóként a{' '}
                <a href="https://www.autoinfo.hu" target="_blank" rel="noopener noreferrer"
                   className="text-water underline underline-offset-2">
                  www.autoinfo.hu
                </a>{' '}
                serveren érhető el. A megállapodás e-mailben való megküldése után az oktató videó
                azonnal hozzáférhetővé válik.
              </p>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Oktatási témakörök</SectionLabel>
              <ul className="mt-2 flex flex-col gap-2">
                {[
                  'Életmentő eszközök használata a fulladás megelőzésére',
                  'A különleges munkakörnyezet a hajón',
                  'Tűzoltás a vízi járművön',
                  'Zaj okozta kockázatok a fedélzeten',
                  'Veszélyes anyagok kezelése a vízi járműveken',
                  'Alapvető elsősegély-nyújtási intézkedések',
                ].map(t => (
                  <li key={t} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Részvételi feltételek</SectionLabel>
              <ul className="mt-2 flex flex-col gap-3">
                {[
                  'A vizsgára jelentkezés feltétele a 16. életév betöltése',
                  'Orvosi alkalmasság igazolása, melyet a szakorvosi névjegyzékben szereplő orvos állíthat ki',
                  'Nyilatkozat a biztonságos úszni tudásról',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-950 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Letölthető dokumentumok</SectionLabel>
              <div className="mt-2 flex flex-col gap-3">
                <DownloadLink href="https://autoinfo.hu/szvk/wp-content/uploads/2024/03/orvosi_alkalmassag_igazolasa_2024_03.doc">
                  Orvosi alkalmassági nyomtatvány
                </DownloadLink>
                <DownloadLink href="https://autoinfo.hu/szvk/wp-content/uploads/2026/05/megallapodas_alap_kompetencia_vizsga_iktatoszamos_2026_05.doc">
                  Megállapodás letöltése
                </DownloadLink>
                <DownloadLink href="https://autoinfo.hu/szvk/wp-content/uploads/2026/01/vizsgarend_tervezet_2026.xls">
                  2026. évi tervezett vizsgaidőpontok
                </DownloadLink>
                <DownloadLink href="https://autoinfo.hu/szvk/wp-content/uploads/2026/02/tajekoztato_alap_kompetencia_vizsga_2026_01.doc">
                  Tájékoztató letöltése (A/4)
                </DownloadLink>
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed border-t border-slate-900/10 pt-4">
                A megállapodást személyigazolvány és lakcímkártya adataival pontosan egyezően,
                számítógéppel kitöltve — Word dokumentumban (.doc/.docx), valamint kinyomtatva és
                aláírva (.jpg/.pdf) — kell a{' '}
                <a href="mailto:kipper@kipper.hu" className="text-water underline underline-offset-2">kipper@kipper.hu</a>{' '}
                e-mail címre megküldeni.
              </p>
            </InfoCard>
          </div>
        )}

        {/* ── DÍJAK ── */}
        {activeTab === 'koltseg' && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>Pénzügyek</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                Díjak és <span className="font-semibold text-water">költségek</span>
              </h2>
            </div>

            <InfoCard>
              <SectionLabel>Tanfolyam és vizsga</SectionLabel>
              <div className="mt-2 flex flex-col divide-y divide-slate-900/10">
                {KOLTSEGEK_KEPZES.map(({ label, ertek }) => (
                  <div key={label} className="flex justify-between items-center py-3">
                    <span className="text-sm text-slate-600">{label}</span>
                    <span className="text-sm font-semibold text-slate-900">{ertek}</span>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard>
              <SectionLabel>KAVK okmánykiadási díjak</SectionLabel>
              <div className="mt-2 flex flex-col divide-y divide-slate-900/10">
                {KOLTSEGEK_KAVK.map(({ label, ertek, bold }) => (
                  <div key={label} className={`flex justify-between items-center py-3 ${bold ? 'font-semibold' : ''}`}>
                    <span className={`text-sm ${bold ? 'text-slate-900' : 'text-slate-600'}`}>{label}</span>
                    <span className={`text-sm ${bold ? 'text-water' : 'text-slate-900'}`}>{ertek}</span>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard>
              <SectionLabel>KAVK bankszámlaszám</SectionLabel>
              <p className="mt-1 text-sm font-semibold text-slate-800">OTP Bank Nyrt.</p>
              <p className="font-mono text-base tracking-wide text-water mt-1">
                11711003-21463062-00000000
              </p>
              <a
                href="https://vizsgakozpont.hu/hajozas/banki-atutalasi-tajekoztato"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-water mt-3 transition-colors"
              >
                További info a vizsgakozpont.hu oldalon <ArrowRight className="w-3 h-3" />
              </a>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Számlázás</SectionLabel>
              <p className="text-sm text-slate-600 leading-relaxed">
                Az akkreditált képzésről és vizsgáról <strong className="text-slate-800">e-számla</strong> kerül
                kiállításra, amelyet a regisztrációban megadott e-mail címre küldenek meg.
              </p>
            </InfoCard>
          </div>
        )}

        {/* ── VIZSGA ANYAGA ── */}
        {activeTab === 'vizsga' && (
          <div className="flex flex-col gap-4">
            <div>
              <SectionLabel>Kompetencia vizsga</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                Vizsgakérdések <span className="font-semibold text-water">témakörei</span>
              </h2>
              <p className="text-sm text-slate-500">Kattints egy témakörre a kérdések megtekintéséhez.</p>
            </div>

            {TEMAKOROK.map(t => (
              <TemakörCard key={t.id} temakör={t} />
            ))}
          </div>
        )}

        {/* ── KÖNYV KIVÁLTÁSA ── */}
        {activeTab === 'kivaltas' && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>Ügyintézés</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                A hajóskönyv <span className="font-semibold text-water">kiváltása</span>
              </h2>
            </div>

            <InfoCard>
              <SectionLabel>Ahol igényelhető</SectionLabel>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                A hajós szolgálati könyv igénylésére a{' '}
                <strong className="text-slate-800">KAVK irodákban</strong> (Budapest, Siófok, Mohács)
                személyesen, vagy a szükséges bizonylatok <strong className="text-slate-800">postai úton</strong>{' '}
                történő megküldésével van lehetőség.
              </p>
              <div className="rounded-xl bg-slate-200/60 border border-slate-900/10 px-4 py-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  A szegedi KAVK-nál személyes ügyintézésre nincs lehetőség — legegyszerűbb a kérelem
                  postai úton történő megküldése.
                </p>
              </div>
            </InfoCard>

            <InfoCard>
              <SectionLabel>A kérelemnek tartalmaznia kell</SectionLabel>
              <ul className="mt-3 flex flex-col gap-3">
                {[
                  'Személyigazolvány és lakcímkártya adataival egyezően kitöltött kérelem lap',
                  'Szakorvos által kiállított orvosi alkalmassági igazolás fénymásolata (az eredeti a megküldésre kerülő könyvben kell legyen)',
                  'Az eredményes vizsga után átadott képzési és vizsga igazolás',
                  '2 db 35×45 mm-es szabványos színes igazolványkép',
                  '26 100 Ft KAVK számlájára történő átutalását igazoló bizonylat',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-950 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Ügyintézési idő</SectionLabel>
              <p className="text-sm text-slate-600 leading-relaxed">
                A KAVK-nak <strong className="text-slate-800">30 nap</strong> áll rendelkezésére a
                hajós szolgálati könyv kiállítására. Normál esetben az igénylés után{' '}
                <strong className="text-slate-800">2–3 héten belül</strong> postán, ajánlott küldeményben
                megérkezik a könyv. A könyv{' '}
                <strong className="text-slate-800">gyakornok képesítés bejegyzéssel</strong> kerül kiadásra.
              </p>
            </InfoCard>

            <InfoCard>
              <SectionLabel>Letölthető dokumentumok</SectionLabel>
              <div className="mt-2 flex flex-col gap-3">
                <DownloadLink href="https://autoinfo.hu/szvk/wp-content/uploads/2024/02/1b_adatlap_kepesiteses_hszk_kiallitasahoz_2023.xls">
                  1B adatlap (képesítéses HSZK kiállításához)
                </DownloadLink>
              </div>
            </InfoCard>
          </div>
        )}

        {/* ── KAPCSOLAT ── */}
        {activeTab === 'kapcsolat' && (
          <div className="flex flex-col gap-5">
            <div>
              <SectionLabel>Elérhetőség</SectionLabel>
              <h2 className="text-2xl font-light text-slate-950 mb-1">
                <span className="font-semibold text-water">Kapcsolat</span>
              </h2>
            </div>

            {/* Kipper György */}
            <div
              className="group relative cursor-default rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden flex flex-col hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-slate-950/5 group-hover:bg-white/10 transition-colors">
                    <Anchor className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-600 group-hover:text-white/50 transition-colors">
                      Kapcsolattartó
                    </p>
                    <h3 className="text-xl font-semibold text-slate-950 group-hover:text-white transition-colors">
                      Kipper György
                    </h3>
                  </div>
                </div>

                {[
                  { icon: Phone, label: 'Mobil', value: '+36 30 978 6313', href: 'tel:+36309786313' },
                  { icon: Phone, label: 'Telefon', value: '+36 62 547 000', href: 'tel:+3662547000' },
                  { icon: Mail, label: 'E-mail', value: 'kipper@kipper.hu', href: 'mailto:kipper@kipper.hu' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-white/40 transition-colors flex-shrink-0" />
                    <span className="text-xs text-slate-500 group-hover:text-white/40 transition-colors min-w-[60px]">{label}</span>
                    <a
                      href={href}
                      className="text-sm font-semibold text-slate-700 group-hover:text-sky transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
             <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-accent" />
            </div>

            {/* Képző szerv */}
            <div
              className="group relative cursor-default rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden flex flex-col hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-slate-950/5 group-hover:bg-white/10 transition-colors">
                    <Building2 className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-600 group-hover:text-white/50 transition-colors">
                      Képző szerv
                    </p>
                    <h3 className="text-xl font-semibold text-slate-950 group-hover:text-white transition-colors">
                      AUTOINFO HUNGARY EC
                    </h3>
                  </div>
                </div>

                {[
                  { icon: MapPin, label: 'Cím', value: '6720 Szeged, Kazinczy u. 12.' },
                  { icon: Calendar, label: 'Engedélyszám', value: 'HHF/27262-3/2023-ÉKM' },
                  { icon: Globe, label: 'Web', value: 'www.autoinfo.hu', href: 'https://www.autoinfo.hu' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-white/40 transition-colors flex-shrink-0" />
                    <span className="text-xs text-slate-500 group-hover:text-white/40 transition-colors min-w-[80px]">{label}</span>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                         className="text-sm font-semibold text-slate-700 group-hover:text-sky transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-white transition-colors">{value}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-sky" />
            </div>

            <p className="text-xs text-slate-500 text-center leading-relaxed px-4">
              Kérjük, hogy a hajózás iránt érdeklődő ismerőseidnek ajánld a Szegedi Vitorlás Kikötő kínálta lehetőségeket!
            </p>
          </div>
        )}
      </div>
      <div className="mt-auto">
              <WaveStrip />
            </div>
    </div>
  )
}