import { useState } from "react"
import { Waves } from "lucide-react"
import Navbar from "../components/Navbar"
import WaveStrip from '../components/WaveStrip'

const sections = [
    {
    id: "bevezeto",
    title: "kurzus",
    videoId: "",
    content: `SZTE VITORLÁZÁS TESTNEVELÉS KURZUS
Az SZTE hallgatók számára díjtalan.
A féléves kurzust végzők vagy a két féléves kötelező testnevelés 1 félévéről teljesítés igazolást kapnak
A kurzus felvételének egyedüli előfeltétele az úszni tudás.
Kezdők és haladók egyaránt választhatják a kurzust.
A testnevelés kurzus keretében a hallgatók elméleti és gyakorlati képzésben részesülnek.
 A vitorlázás testnevelési kurzus elméleti előadásainak témája: a vitorlázás elmélete, kinetikai alapjai, meteorológiai, vízrajzi, hajózási ismeretek, a vízi közlekedés alapvető szabályai.
Az elméleti előadások az SZTE Sportközpontban, a gyakorlatok a Szegedi Vitorlás Kikötőben, a Tiszán lesznek ( Szegedi Partfürdő és Camping. )
A foglalkozások időpontjai:
I. kurzus Csütörtök 14:00 – 15:30 -ig
II. kurzus Csütörtök 16:00 – 17:30 -ig
Az alapszintű elméleti ismeretek elsajátítása után, az időjárástól függő ütemezésben kerül sor a gyakorlati oktatásra.
Kedvezőtlen időjárási viszonyok esetén az SZTE Sportközpontjában tartjuk meg a foglalkozást.
Mivel a kurzus tematikája megegyezik a kishajós képzés tananyagával, így azok a hallgatók, akik teljesítették a kurzust és
NEMZETKÖZI KEDVTELÉSI CÉLÚ KISHAJÓ VEZETŐI BIZONYÍTVÁNYT
szeretnének – külön előadásokon – már csak a képzés hiányzó részét ( Hajózási Szabályzat ) kell megtanulják és a KAVK szakemberei előtt vizsgát tehetnek. Eredményes vizsga esetén folyókra, tavakra, csatornákra, Európa belvizeire érvényes nemzetközi kishajó-vezetői bizonyítványt kapnak.
A vizsgára jelentkezésnek további előfeltételei ( az úszni tudáson túl ) az orvosi alkalmasság.
A vitorlás kishajós képzés díja  50 000,- Ft, melyből a vitorlázás testnevelési kurzust teljesítő hallgatók 40%, azaz

20 000,- Ft engedményt kapnak!
Így a vitorlás kishajós képzés díja  30 000,- Ft (+ vizsgadíjak).
A kisgéphajó vezető vizsgával közösen végezve további engedmények érvényesíthetők!

Előzetesen részletes információk kérhetők Kipper György oktatótól:
Mobiltelefon: +36-30-978-6313
E-mail: kipper.gyorgy@gmail.com
Skype: kippergyorgy`,
    facebook: true
  },
  {
    id: "miert",
    title: "Miért válasszuk?",
    videoId: "FRyCZMrtW90",
    content: `Régóta érdekelnek a vitorlások, régi vagy korunkbeli az nem számít, csak vitorlás legyen. Szeretem a vizet és lenyűgöz az a tudat, hogy szárazföldi teremtményekként vízre szállunk egy teknőben, amire fel vannak húzva a nagymama vászonjai egy árbocra és a szél erejével haladunk kitéve magunkat és a hajót a természet viszontakságainak.

Ezen a kurzuson a jelentkezőknek lehetőségük van bepattanni egy igazi vitorlás hajóba és akció közben elsajátítani a hajó kötélzetének kezelését. Az oktatás természetesen az alapokkal kezdődik, melyeket szárazföldön sajátítunk el, mint például csomók, kötélrend, hajó részei, hajó felkészítése, stb. Mindezekre nagyon oda kell figyelni és esetleg egyik kézzel jegyzetelni, míg a másikkal csomózik az ember, mert ezek rendkívül fontos dolgok, ha valaki hamar meg szeretné tanulni a vitorlás kezelését. Érdemes odafigyelni az oktatóra, mert nagyon érti a dolgát, viszont nem szereti ismételgetni magát, de hát ez legyen a legnagyobb bajunk, nem igaz?

Én az őszi félévben jártam erre a kurzusra és az elején, mikor ki tudtunk menni, akkor vízre is szálltunk, amint tehettük, ezért az elméleti oktatásra kevesebb idő jutott, de végül is a gyakorlatban is meg lehet tanulni mindent szépen, csak az embernek eleinte kicsit lassan bootol a rendszer a fejében. A tavaszi félévben nyilván az elején lenne az elméleti oktatás része és csak a jobb idő beköszöntével szállnának a hallgatók vízre. Feltehetőleg jobb az, ha az ember először megismeri elméletben a dolgokat, de ez az én véleményem. Az, hogy melyik félévben érdemes felvenni és kinek mi a jobb tanulási időszak azt döntse el mindenki maga. Hatalmas élmény elsőnek beszállni a hajóba és megtapasztalni, hogy milyen is vitorlázni, milyen az, mikor a vitorlába kap a szél és megindul a hajó. Semmihez sem fogható élmény volt számomra, amit fokozott a hétről hétre gyarapodó tudás, így mindig jobban és jobban tudtuk kezelni a hajót.

Mindent összevetve egy izgalmas és érdekes kurzus, ahol egy nem épp hétköznapi, sőt tovább megyek, egy menő dologgal találkozhatnak a hallgatók. Na jó szelet minden kedves ide látogatónak!

Keresztes Milán Dávid
képalkotás`
  },
  {
    id: "gyakorlat",
    title: "Gyakorlati oktatás",
    videoId: "QbYfa51ybxM",
    content: `A gyakorlati órát a Partfürdőn, a vitorlás kikötőben tartják. Célszerű gumitalpú cipőben és kényelmes, sportos ruhában menni, valamint váltás száraz ruhát is pakoni az esetleges beborulás miatt. A part melletti konténer előtt szokott lenni a gyülekező, majd a személyes holmijainkat is itt rakjuk le és kapunk mentőmellényt, amit kötelező a vízen viselni. Miután ez megtörtént és az időjárás engedi, lemegyünk a mólóra és előkészítjük a vitorlás(oka)t, (ha nincs szél, sárkányhajót) majd vízre tesszük. Egyszerre három ember szokott a hajóban tartózkodni, a tanár, és a két mannschaft/tanuló. Minden turnus két kört megy a vízen, aztán csere következik az óra végéig. Az óra végén le kell szerelni a hajót, csak ezután lehet elmenni. A gyakorlat folyamán azok az emberek akik nincsenek éppen a hajóban a mólón gyakorolhatják a csomózási technikákat. Ha hirtelen mégis nagyon rossz idő lenne, akkor a konténerben lehet csomózgatni.

Dorogi Zsófia Anna
biomérnöki`
  },
  {
    id: "hajoszerkezet",
    title: "Hajószerkezet",
    videoId: "cgbcS_L2fMI",
    content: `Ahhoz, hogy a vitorlás kurzuson aktívan részt tudj venni, nem árt, ha tisztában vagy néhány fogalommal és természetesen a hajó részeivel, hiszen a vitorlásoknak saját szaknyelvük van.


Alba: A baum lehúzására szolgáló kötéláttétel

Állókötélzet: Az árbocot a helyén tartó és merevítő kötelek rendszere

Alsó szél: A vitorla alsó, a fedélzettel nagyjából párhuzamos éle

Árboc: A vitorlázat “tartóoszlopa”

Balcsapás: Egy vitorlás balcsapáson halad, amikor a szelet bal oldala felől kapja. Ilyenkor a nagyvitorlája jobb oldalon van

Baum: Nagyjából vízszintesen üzemelő rúd, mely az adott vitorla alsó élének kifeszítésére és a vitorla szélhez való megfelelő szögbe állítására szolgál

Bika: A kötél megfogatására, rögzítésére szolgáló szerkezet

Bilge: Hajófenék

Bilgepumpa: Fenékvíz- szivattyú

Cockpit: Munkatér, a hajó fedélzetének biztonságos, mélyített része, ahol a legénység a hajókezelés feladatainak többségét végzi

Cirkálás: Szél ellen történő vitorlázás

Deck: Hajó fedélzete

Élesedés, luvolás: Szél felé kanyarodás

Flaute: Szélcsend

Fockshot: Az orrvitorla behúzókötele

Fordulás: A hajó irányváltoztatása szél felé, melynek során a haladási iránya túlhalad a szél tengelyén és a vitorlás csapást vált

Forstág: A hajó orra és az árbóc valamely magasabb pontja között feszülő merevítő kötél, mely az árbocot a hátra dőlés ellen tartja

Génua: Az árboc vonala mögé nyúló elővitorla

Gross: Nagyvitorla

Grószshot: A nagyvitorla behúzására szolgáló kötél

Hajozóút: Korlátozott vizeken a hajók közlekedésére kijelölt csatorna

Halzolás: A hajó irányváltoztatása elfele a széltől, melynek során a hajó iránya – farával a szél felé mutatva – túlhalad a széltengelyen és a vitorlás csapást vált

Hátszél: A hajó tükre, fara felől fújó szélirány

Jolle: Uszonyos, tőkesúly nélküli vitorlás

Jobbcsapás: Egy vitorláshajó jobb csapáson halad, amikor a szelet jobb oldala felől kapva baumjával a bal oldalon vitorlázik

Kiel: Tőkesúly, feladata a hajó dőlésének korlátozása és az oldalcsúszás megakadályozása

Cirkálás: A széllel szemben fordulgatva, cikcakkban történő előrejutás a szél felé eső cél elérése érdekében

Látszólagos szél: A valóságos szél és a menetszél összetevőiből érzékelt szélirány és erő

Luvolás: Irányváltoztatás a szél felé

Mancsaft: Egy vitorláshajó legénysége vagy a legénység egy tagja

Raum: Háromnegyedszél. Bő szeles vitorlázóirány, a félszél és a hátszél közötti tartományban

Schwert: Jolle vagy akár nagyobb uszonyos hajó leengedhető uszonya, oldalsodródás ellen

Sólya: A hajó vízbejuttatására alkalmas ferde, a vízbe nyúló rámpa

Spinakker: Könnyű anyagból készült hátszélvitorla

Tat: A hajó fara, a hajótestnek a kormánylap mögé nyúló része

Vantni: Hajótest és az árboc között kifeszített merevítő kötél, melynek elsődleges feladata, hogy az árbocot az oldalra dőlés ellen tartsa

Asztalos Johanna
gyógyszerész`
  },
  {
    id: "szel",
    title: "A szél",
    videoId: "UN-pckPvJ7A",
    content: ` „A gondolat a szél. Az elménk a vitorla. Jó utat!”

 A vitorlás hajó elsősorban a szél erejével hajtott, árbócra szerelt vitorlával (vagy vitorlázattal) ellátott hajó.

A vitorla az árbóchoz és/vagy a rudazat egyéb elemeihez (baum, gaffrúd, keresztrúd, vagy maga a hajótest) erősített és kifeszített, nagyfelületű, de viszonylag vékony anyagdarab, amely a szél erejének kiaknázásával a hajónak mozgási energiát kölcsönöz.

A szárnyprofil két oldalán ébredő nyomáskülönbség miatt a vitorlán a szélirányra közel merőleges irányú felhajtóerő ébred. Ez a felhajtóerő teszi lehetővé, hogy a korszerű vitorlázatú hajó a látszólagos szélhez képest mintegy 30-45 fokban képes legyen haladni, azaz szél felé tudjon vitorlázni. A 20. század elejéig ezt a képességet a hajók csak nagyon korlátozottan voltak képesek kihasználni, a keresztvitorlázatú hajók a látszólagos szélhez képest legfeljebb 90 fokra tudtak haladni.

A szelet ereje és iránya jellemzi. A szél irányát arról a földrajzi irányról nevezzük el, ahonnét fúj. A szélerősség mérésére egy 12 fokozatú tapasztalati skálát, a Beaufort-skálát használjuk.

A hajó szél felőli oldalának idegen neve: luv oldal.

A hajó szél alatti oldalának idegen neve: lee („lé”) oldal.

A főbb szélirányok:

Szembeszél: szemből, vagy közel szemből érkező szél, a hajó orrától nézve kb. 0-40 fok közötti tartomány. A hajó nem halad, de fékezésre és a vitorlák fel- és lehúzására a szembeszél az alkalmas szélirány.
Negyedszél („kreutz” ejtsd: krajc): ferdén elölről érkező szél, kb. 45 fokban. A hajó a szél felé vitorlázva eddig a szögtartományig képes vitorlázni, élesebben már nem.
Félszél („oldalszél”): oldalról érkező szél, kb. 90 fokban.
Háromnegyedszél („raum”): ferdén, hátulról érkező szél, kb. 135 fokban.
Hátszél: teljesen hátulról érkező szél, 180 fokban. Bő szélneknevezzük a hátszelet és raumot.
A vitorlán hátszélben tolóerő hat, a többi szélirányban a vitorla két oldala között nyomáskülönbség, azaz felhajtóerő keletkezik. A vitorlázat átadja hajótestnek a keletkező erőt, a hajótest víz alatti része, azaz laterálfelülete alakítja át ezt az erőt előremutató irányú vektorrá, így halad előre a vitorlás hajó. A vitorlákat úgy kell beállítani, hogy felezzék a hajó hossztengelye és a szélirány által bezárt szöget.

Ha a vitorlák lobognak, akkor a hajó sebessége csökken, a vitorlákon a behúzó kötelek (sottok) segítségével húzni kell. A szembeszél csak fékezésre és a vitorlák fel és lehúzására alkalmas, haladásra nem. Legalább 45 fokos szögben érkező szélre van szükségünk ahhoz, hogy a vitorlák képesek legyenek befogni a szelet. Ha a szél útirányunk felől, azaz teljesen szemből fúj, egyenesen nem tudunk arrafelé haladni, hanem csak 45-45 fokos szögben (azaz 90 fokos irányváltoztatásokkal) cirkálva tudjuk megközelíteni úticélunkat.

Álló hajóra a valódi szél hat, de haladás hatására a keletkező menetszél ún. látszólagos szelet alakít ki, mely mindig „élesebb” azaz kisebb szögű, mint a valódi szél. A valódi szél és a látszólagos szél haladás közben csakis teljesen szemből (pl. motorozva), vagyis a hajó hossztengelyével párhuzamosan fújva lesz azonos irányú. Hátszélben a valódi szél és a menetszél egymás ellen hatnak. A valódi szél iránya a parton lévő zászlók, lobogók állásából könnyen meghatározható, illetve álló hajó széljelzői pontosan mutatják; haladó hajón mindig a kissé élesebb látszólagos szelet érzékeljük.

Menetirány szerinti jobb oldal: steuerboard („stajerbord”)

Menetirány szerinti bal oldal: backboard („bekbord”)

Ha a hajó jobbról kapja a szelet, akkor bal oldalára dőlve halad, tehát backboardon megy.

Csapásirány: ahonnét a szél „belecsap” a vitorlákba.

Jobbcsapás: a szél jobbról érkezik, a hajó bal oldalára dől (backboard), a bum balra áll. Útjogos helyzet találkozáskor.
Balcsapás: a szél balról érkezik, a hajó jobb oldalára dől (steuerboard), a bum balra áll. Kitérésre kötelezett helyzet találkozáskor.
élesedés (luvolás) kanyarodás a szél felé
ejtés (leesés) elkanyarodás a széltől
fordulás, azaz csapásváltás a szél felé
perdülés (halzolás) csapásváltás a széltől el
Személyes tapasztalatok: rendkívül érdekes volt kipróbálni egy ilyen számomra nem mindennapi sportot, nagyon élveztem az órákat. Mindenkinek ajánlom, ami meg az időjárást jelenti, valóban fontos tényező így elhagyhatatlan annak pontos ismerete, az előrejelzések figyelése. Azt kell mondanom, hogy annak ellenére, hogy az őszi félévben vettem fel, elég sokat voltunk vízen, sokat kedvezett nekünk az idő.

Rácz Nikolett
gyógyszerész`
  },
  {
    id: "borulas",
    title: "borulás",
    videoId: "FdSq7CrQrJY",
    content: `Kiss Csenge Kata
molekuláris bionika mérnöki BSc

Ha erős szélben vitorlázunk, a hajó igencsak képes megdőlni.  Abban az esetben, amikor az egyensúlyt nem tudjuk megtartani, nem teljesen idegen az az opció tehát, hogy beleborulunk a vízbe. Van is egy mondás a versenyvitorlázók közt, miszerint az nyeri a versenyt, aki a legkevesebbszer borul.

Szél hatására a hajóra kifejtett húzóerő nagyban függ a (szélre) merőleges vitorlafelület nagyságától.  Amennyiben megdől a vitorlás, csak a függőleges felület lesz hatásos, így tehát a húzóerő a dőlésszög cos-ával változik.

Köztudott, hogy a szimmetrikus aerodinamikájú testek ellenállása menet közben kisebb, mint az aszimmetrikusoké. Ha a hajó megdől, a vízben lévő része aszimmetrikussá válik. Emiatt lassul a hajónk sebessége (fékezőerő nő).

A vízbe merülő nagy felületű tőkesúlyra eső ellenállás megakadályozza, hogy a hajó oldalra dőljön.

Ha érzékeljük, hogy dől a hajó, a legénység a saját testsúlyának ellennyomatékát felhasználva kiülheti a vitorlást. Egyszemélyes hajózáskor igaz az, hogy minél messzebb esik az emberünk súlypontja a hajótól, annál eredményesebb a kiülés. Némelyik hajó árbocához drótkötelek vannak rögzítve, végén az úgynevezett trapéz, amibe be tudja akasztani a mannschaft a mellényének hevederét, majd belekapaszkodva, kiállhat a hajó szélére. Másik módja a trapézolásnak az, hogy a mannschaft belekapaszkodik a trapézba és kiülés közben a lábát a schwertszekrénybe akasztva, úgymond felfekszik a víz fölé.

Borulásveszélyt jelenthet a vitorlák nem megfelelő beállítása is, például ha az optimális szögnél jobban behúzzuk. Ekkor rohamosan növekszik a döntőerő. Fontos itt megjegyezni, hogy az előbb említett helytelen beállítás nagyságrendileg nagyobb hiba, mint az, ha az optimálisnál jobban kiengedjük a vitorlákat.

Ha megtörtént a borulás, fontos, hogy a hajót fel is tudjuk állítani. Tőkesúlyos hajók nem, míg a Jolle-típusúak könnyedén fel tudnak borulni erős szélben.

Egyszemélyes Jollénál a vitorlázó kiáll a schwertre, megkapaszkodik a hajótestbe, és magára húzza azt. A súlyánál fogva visszabillen. Nem szabad hagyni, hogy lecápázzon a hajó. Ez azt jelenti, hogy a vitorla leér az aljzatig, beleszúródik az iszapba, esetleg el is görbül, innen már szerencsétlen esetben, esélytelen visszahozni egyenesbe a hajót. Ha szerencsésen visszaállítottuk a hajót, széllel szembe beállítjuk, beülünk a hajóba, kimerjük a vizet, ráhúzunk a großshottra, és már mehetünk is tovább.

Kétszemélyesnél az egyik személy elúszik gyorsan az árboc végééig és megtartja azt, hogy az előbb említett helyzet ne tudjon kialakulni. Másik személy pedig ugyanazt csinálja, mint az egyszemélyesnél. Majd bemászik a legénység hátul, vagy pedig a hajó két oldalán. Ezután már csak ki kell nyitni a ventileket, vagy kimerni a vizet, fővitorlára húzni, és indulás.

Célszerű az árbocelmerülés megelőzése végett egy felfújható, könnyű dolgot tenni a végére, hogy ne merüljön a víz alá.

A gyakorlatokra ilyen esetek miatt erősen ajánlott váltóruhát vinni, valamint már gumitalpú cipőben érkezni a vitorlás kikötőbe.`
  },
  {
    id: "csapatepites",
    title: "csapatépítés",
    videoId: "1ZM5dOBR7KM&t",
    content: `A vitorlázás egy kiváló sport, ha csapatépítésről van szó, hiszen bizalomépítő hatása van. Bizalmat kell adj csapattársaidnak, hogy figyelmesen és pontosan végzik feladatuk, ugyanakkor egy csodálatos időtöltés barátaiddal kint a szabadban.

Jól hangzik egy délutáni beszélgetés a barátokkal, de ha ehhez hozzáadjuk, hogy közben napsütéses időben valamelyik folyón vitorláztok, akkor már egészen kivételes emlék is lehet belőle. Különösen akkor, ha egy érdekes szituációba kerültök ahonnan egyik társad segít ki. Mekkora lesz az öröm és nem azon fog járni az eszetek, hogy ki a hibás hanem, hogy milyen jó, hogy ki tudtátok segíteni egymást.

A vitorlázás kurzust ajánlom barátokkal felvenni. Próbáljátok ki milyen együtt vitorlázni, egy új élményt együtt megtapasztalni, szórakozni és sportolni ugyanis nagyon jó kombináció. Ha mégis csak egyedül jönnél azt is bátran ajánlom, gyorsan össze lehet rázódni idegenekkel is, akikkel egy idő után ugyanolyan élvezetes lesz a vitorlázás, barátias.

Mivel lehetőség van a kurzus után lerakni kedvezményesen a kishajós vizsgát is. Utána akár több napos kirándulásokra is elmehettek barátokkal, szórakozás és csapatépítés céljából, ha pedig már nagyon sikerült összeszokni versenyekre is lehet járni.

Összességében ha egy olyan sportra vágysz amit a szabadban is lehet művelni barátokkal, csodás látvánnyal és izgalmakkal, akkor a vitorlázás tökéletes választás.

Ilyés Levente
programtervező informatikus BSc`
  },
  {
    id: "szabadterisport",
    title: "szabadtéri sport",
    videoId: "eU_PldAO7LA",
    content: `Vitorlás kurzus, mint szabadtéri sport

5 ok, miért válaszd a vitorlázást, mint testnevelési kurzust

Az elkövetkezendő pontokban azt fogjuk megvizsgálni, nekünk egyetemistáknak miért jó dolog a vitorlázást választanunk testnevelési kurzusnak.

1. Képzeljünk el egy hosszú napot, amit végig az iskolapadban vagy az egyetemi könyvtárban könyvek és előadások között töltöttünk el. Nyilván minden egyetemista számára ismerős az érzés, amikor már zsibbad minden tagod, a fejed zúg és csak ki akarod szellőztetni azt. A hosszú ülő tevékenységet végzőknek amúgy is ajánlatos valamilyen sport beiktatása, de ennél még jobb megoldás az, ha mindezt a szabadban tesszük. A vitorlás testnevelési kurzus erre tökéletes. A szabad ég alatt végezhető, a hideg és a szél sem lehet akadály, maximum a csapadékosabb vagy szélsőségesebb időjárási körülmények okozhatnak problémát, ez az időszak viszont tökéletes átvenni pár elméleti dolgot, szakszavakat, kötési technikát, ami hosszútávon elengedhetetlen ezen sport végzéséhez.

2. Nem szabad elfeledkeznünk a helyszínről, ahol maga az oktatás zajlik.  A Tisza újszegedi oldalán, a Partfürdőn a vitorlás kikötőből csodálatos látvány nyúlik Szeged városára, ami szintén nem elhanyagolható szempont a kurzus mellett. Így miközben a napi sportadagunkat teljesítjük még gyönyörködhetünk is a Napfény városában!

3. Minden ember más, van aki kifejezetten a téli sportok szerelmese, míg más a futásra esküszik. Azoknak akik kifejezetten szeretik a víz közelségét, mindenképpen ajánljuk a vitorlás kurzus. Szabad levegőn eltölteni a vízen egy egyetemi oktatást, így már nem is annyira kötelezettség, nem? 🙂

4. A vitorlás testnevelési kurzus tökéletesen jó arra is, hogy új kapcsolatokra tegyél szert. Egy teremben tartott edzésen nem feltétlen nyúlik lehetősége az embernek beszélgetni, ez kifejezetten akadályozó tényező is lehet a teljesítmény szempontjából, míg a vízen barátságok köttethetnek, szorosabb emberi kapcsolatok alakulhatnak ki, nem véletlen a mondás „Egy hajóban evezünk”.

5. A kurzus végére olyan tudásra tehetünk szert, amivel már csak pár lépés a vitorlás vagy akár a kishajó vezetői jogosítvány, ami hasznos lehet a vízi sportok szerelmeseinek.

Szász Evelin
jogász`
  }
]

export default function Kurzus() {
  const [active, setActive] = useState("miert")

  const activeSection = sections.find(s => s.id === active)

  return (
    <div className=" min-h-screen bg-slate-300 text-slate-950 pt-16">
      <Navbar />
      {/* HERO */}
      <div className=" relative bg-slate-100 border-b border-slate-900/10 overflow-hidden ">
        <div className="max-w-4xl mx-auto px-6 pt-14 pb-14 text-center">

          <div className="  inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-slate-700 uppercase mb-5">
            <Waves className="w-4 h-4" />
            Testnevelési kurzus
          </div>

          <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
            SZTE vitorlázás - testnevelési kurzus
          </h1>

          <p className=" mt-5 text-slate-600 max-w-2xl mx-auto leading-relaxed">
             <span className="block sm:inline">
                Vitorlázás és vízi sportok alapjai
              </span>
              <span className="block sm:inline">
                elméletben és gyakorlatban a Tisza közegében.
              </span>
          </p>

          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
        <img
          src="/boat.png"
          alt="boat"
          className="
            absolute
            right-0 md:right-4 lg:right-24 xl:right-44
            -bottom-4 md:-bottom-6
            w-20 md:w-20 lg:w-28 xl:w-44
            h-auto
            animate-boat
            pointer-events-none
            opacity-90
          "
          />
          
      </div>

      {/* BUBORÉK MENÜ */}
      <div className="flex flex-wrap gap-3 justify-center my-8 px-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={` px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition
              ${
                active === s.id
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* TARTALOM */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow mb-6 border border-navy/10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
          {activeSection?.content}
        </pre>
      </div>

      {/* VIDEÓ */}
      {activeSection?.videoId && (
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow border border-slate-900/10">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeSection.videoId}`}
              title="Kurzus videó"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {activeSection?.facebook && (
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-6 text-center shadow">

          <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-700 mb-3">
            Kipper György profil oldala
          </h3>

          <p className="text-slate-600 text-sm mb-6">
            A kurzus oktatója online elérhető, ahol további információk, szakmai háttér
            és friss bejegyzések találhatók a vitorlázásról és a kapcsolódó képzésekről.
          </p>

          <a
            href="https://www.facebook.com/profile.php?id=100002149104218"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 bg-slate-900 text-white rounded-full text-sm hover:bg-slate-700 transition"
          >
            Facebook oldal megnyitása
          </a>

        </div>
      </div>
      )}
        <div className="mt-auto">
          <WaveStrip />
        </div>
    </div>
  )
}