import { useState, useRef, useEffect, useMemo  } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, SkipForward, Eye, BarChart2, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "./Navbar"

/* Kérdések típusonként*/
const OSSZES_KERDES = {
  szabalyzat: [
    { kerdes: "Mit értünk hajón a Szabályzat I. része alapján? Hajó", valaszok: ["a nagyhajó, a kishajó, a vízi sporteszköz és az úszómű.", "minden vízijármű és úszómunkagép.", "a belvízi hajó, beleértve a kishajót és kompot, továbbá a tengeri hajó és az úszómunkagép."], helyes: 2 },
 { kerdes: "Hány fő részből áll a Hajózási Szabályzat (HSz)?", valaszok: ["Egy.", "Három.", "Kettő."], helyes: 2 },
{ kerdes: "Hogyan nevezzük a HSz szerint az alkohol, kábítószer, illetve gyógyszer vagy más hasonló anyag fogyasztásának következtében fellépő állapotot?", valaszok: ["Bódult állapot.", "Beteg állapot.", "Kimerült állapot."], helyes: 0 },
{ kerdes: "Mi a kötelezettsége a kishajó vezetőjének a kishajón tartandó okmányokkal kapcsolatban?", valaszok: ["Elegendő az eredeti okmányok fénymásolatait a hajón tartani.", "Az illetékes hatóságok képviselőinek felszólítására be kell mutatni azokat.", "Ellenőrzésre előkészítve kell őket a kishajón tartani."], helyes: 1 },
{ kerdes: "Melyik válasz helyes a HSz alapján az alábbiak közül? A biztonságos sebesség olyan sebesség, amelynél a hajó ( )", valaszok: ["az adott körülmények és viszonyok között szükséges távolságon belül megállhat.", "nyugodtan közlekedhet, mert biztosan elkerüli az összeütközést.", "egyáltalán nem kelt maga mögött hullámzást."], helyes: 0 },
{ kerdes: "Minek tekintjük a HSz-ben azt a hajót, amely nem áll horgonyon vagy a parthoz kikötve, illetve nincs zátonyon fennakadva?", valaszok: ["Veszteglőnek.", "Sodródónak.", "Menetben lévőnek."], helyes: 2 },
{ kerdes: "Hogyan nevezzük a HSz szerint a nem kielégítő pihenés vagy betegség miatt fellépő, a magatartási normától való eltérésben és a reakcióidő növekedésében megnyilvánuló állapotot?", valaszok: ["Bódult állapot.", "Beteg állapot.", "Kimerült állapot."], helyes: 2 },
{ kerdes: "Milyen előírás vonatkozik a nyilvántartásra kötelezett kishajó vezetőjére az alábbiak közül? A vezetőnek ( )", valaszok: ["a kishajó vezetéséhez szükséges képesítéssel kell rendelkeznie.", "legalább kormányosi képesítéssel kell rendelkeznie.", "a hajón tartózkodók közül a legmagasabb képesítéssel kell rendelkeznie."], helyes: 0 },
{ kerdes: "A kishajó vezetőjének a HSz külön rendelkezése hiányában is meg kell tennie valamennyi elővigyázatossági intézkedést, hogy ( )", valaszok: ["elkerülje az emberéletet fenyegető veszélyt.", "elhárítson minden más hajó által okozott kárt.", "megóvja a személyzetének és minden más személynek testi épségét."], helyes: 0 },
{ kerdes: "A HSz melyik része tartalmaz a hazai víziutakra vonatkozó kiegészítő rendelkezéseket?", valaszok: ["III. rész.", "I. rész.", "II. rész."], helyes: 2 },
{ kerdes: "Kiterjed-e a HSz hatálya a tengeren közlekedő hajókra is?", valaszok: ["Nem.", "Igen."], helyes: 0 },
  ],
  hajovezetestan: [
   { kerdes: "Mi a vízbe merült laterálfelület szerepe a hajózásban?", valaszok: ["Az oldalcsúszást, a könnyebb haladás érdekében.", "A gyorsjáratú hajóknál a dinamikus felhajtóerő keletkezésének alapfeltétele.", "Az oldalcsúszás mértékét, a fordulékonyságot és az iránystabilitást."], helyes: 2 },
{ kerdes: "Mit jellemez a vízvonal alatti laterál felület és a kormánylapát felület viszonya?", valaszok: ["Azt, hogy mennyire lehet kitéríteni a kormánylapátot.", "Azt, hogy mekkora lesz az üzemanyag fogyasztása.", "Azt, hogy milyen lesz a kormányképessége a hajónak."], helyes: 2 },
{ kerdes: "Mi a csavarhatás vagy kerékhatás?", valaszok: ["A hajócsavar kavitációs hatását hívjuk így.", "A hajócsavar aktuális forgási iránya felé fog a hajó fara elmozdulni.", "A hajócsavar forgási irányával ellentétes irányban fog a hajó fara elmozdulni."], helyes: 1 },
{ kerdes: "A hajó azért úszóképes, mert ( )", valaszok: ["a felhajtóerő nagyobb, mint a súlyerő.", "a súlyerő nagyobb mint a felhajtóerő.", "a felhajóerő megegyezik, a súlyerővel."], helyes: 2 },
{ kerdes: "Mi a csatornahatás?", valaszok: ["Sekély és/vagy szűk mederkeresztmetszet esetén a hajó haladási sebességét, trimmhelyzetét és manőverképességét befolyásoló tényező.", "A kikötők behajózó csatornáinak hatása a hajóforgalomra.", "Az VHF rádiók csatornáin történő zajterhelés."], helyes: 0 },
{ kerdes: "Mit lehet tenni a csatornahatás minimalizálása érdekében?", valaszok: ["Sebességet kell csökkenteni a kormány- és manőverképesség megőrzéséig.", "A sebességet kell növelni a biztonságos legnagyobb sebességig.", "Az összes trimmlapot a legalsó pozícióba kell állítani."], helyes: 0 },
{ kerdes: "Mivel védekezhetünk a csatornahatás ellen?", valaszok: ["A hajó merülését az 1. vagy a 2. zónára méretezzük a 3. helyett.", "A kis meder/hajó keresztmetszeti arányhoz illeszkedő sebességgel és elegendő hajó-meder távolság tartásával.", "Nagy keresztmetszetű mellékvíz oldalirányú áramlásával szemben rákormányzással és sebességnöveléssel."], helyes: 1 },
{ kerdes: "Mi okozhat csatornahatást?", valaszok: ["A kis meder/hajó keresztmetszeti arányhoz nem illeszkedő sebesség.", "Nagy keresztmetszetű mellékvíz oldalirányú áramlása a fő mederben.", "A természetes állapotú folyó medrének kikövezése vagy -betonozása."], helyes: 0 },
{ kerdes: "Hol számíthat a csatornahatás fellépésére?", valaszok: ["Azokon a helyeken ahol a hajóút keresztmetszetéhez képest kicsi a hajó vízbemerült részének keresztmetszete.", "Azokon a helyeken ahol a hajóút keresztmetszetéhez képest nagy a hajó vízbemerült részének keresztmetszete.", "Azokon a helyeken ahol a hajóút keresztmetszetének négyzete egyenesen arányos a hajó vízbemerült részének keresztmetszetével."], helyes: 1 },
{ kerdes: "Számíthat-e a gázlóban csatornahatás fellépésére?", valaszok: ["Nem.", "Igen."], helyes: 1 },
 ],
  meteorologia: [
 { kerdes: "Hogyan azonosíthatók a folyami víziutak egyes pontjai az alábbiak közül?", valaszok: ["A parti objektumok viszonylagos helyzete alapján.", "Folyamkilométerek illetve földrajzi koordináták alapján.", "A medermélység és a parttávolság alapján."], helyes: 1 },
{ kerdes: "Honnan kezdődnek a Duna vízrendszerén a folyók folyamkilométer azonosítási pontjai?", valaszok: ["A folyó torkolatától.", "A folyó forrásától.", "A folyó hajózható szakaszának a forráshoz legközelebbi pontjától."], helyes: 0 },
{ kerdes: "Mit jelent az, hogy egy folyó 63. folyamkilométere a Duna vízrendszerének folyóin?", valaszok: ["A folyó forrásától légvonalban mért távolság 63. kilométer.", "A magyar határtól mért távolság 63 kilométer.", "A folyó torkolatától a sodorvonalban mért távolság 63 kilométer."], helyes: 2 },
{ kerdes: "Mit neveznek téli kitűzésnek?", valaszok: ["A vízen ilyenkor nincs úszó. A parti jeleket sűrítik.", "A világító bóják akkumulátorainak téliesítését.", "A jégzajlás veszélyes helyeit és a jégtorlódás lehetséges helyeit jelölik."], helyes: 0 },
{ kerdes: "Melyik rendszer szerint tűzik ki a folyókat és a tavakat az alábbiak közül?", valaszok: ["A folyókat multilaterális, a tavakat derivációs rendszerben.", "A folyókat kardinális, a tavakat laterális rendszerben.", "A folyókat laterális, a tavakat kardinális rendszerben."], helyes: 2 },
{ kerdes: "Mi jellemző a kardinális kitűzésre?", valaszok: ["A kardinális kitűzési rendszerben elhelyezett úszó azt jelöli, hogy melyik égtáj felől kell azt kerülni.", "A kardinális kitűzési rendszerben elhelyezett úszó azt jelöli, hogy folyásirány szerint melyik oldalról kell azt kerülni."], helyes: 0 },
{ kerdes: "Mi jellemző a laterális kitűzésre?", valaszok: ["A laterális jelzésben elhelyezett úszó jel azt jelöli, hogy melyik égtáj felől kell azt kerülni.", "A laterális kitűzési rendszerben elhelyezett úszó azt jelöli, hogy folyásirány szerint melyik oldalról kell azt kerülni."], helyes: 1 },
{ kerdes: "Melyik kitűzési rendszerben vannak a jelek égtáj szerint elhelyezve?", valaszok: ["Laterális rendszer.", "Kardinális rendszer."], helyes: 1 },
{ kerdes: "Melyik kitűzési rendszerben vannak a jelek a folyásirány szerint elhelyezve?", valaszok: ["Kardinális rendszer.", "Laterális rendszer."], helyes: 1 },
{ kerdes: "Mely vízterületen jellemző a hajóút helyének és mélységének esetenként gyors változása?", valaszok: ["Kis vízsebességű, nagy keresztmetszetű, laza mederanyagú, jelentős hordalékmozgású területen.", "Nagy vízsebességű, beágyazódott, kevéssé szabályozott, laza mederanyagú területen.", "Az erősen leszűkített medrű, változékony vízsebességű, jelentős hordalékmozgású területen."], helyes: 0 },
  ],
  hajogeptan: [
   { kerdes: "Mit jelent a hajó úszóképessége?", valaszok: ["A hajó önerőből képes haladni a vízen.", "A hajótest által kiszorított víz súlya megegyezik a hajó súlyával és a hajó nem merül el teljesen a vízben.", "A hajó teljes terheléssel sem merül annyira, hogy a mederfeneket érintse."], helyes: 1 },
{ kerdes: "Mi az úszóképesség fogalma?", valaszok: ["Az úszóképesség az úszni tudásról a hajó vezetőjének adott írásos igazolás.", "A testre ható felhajtóerő kiegyenlíti a súlyerőt és a test nem merül teljes egészében a folyadékba.", "A testre ható felhajtó erő nem egyenlíti ki a súlyerőt és a test teljes egészében a folyadékba merül."], helyes: 1 },
{ kerdes: "Úszóképes-e az a test, amelyre ugyanakkora felhajtó erő hat mint súlyerő?", valaszok: ["Nem, ez esetben elsüllyed a test.", "Igen, ha a test nem merül teljes egészében a vízbe.", "Igen, az úszóképességhez csak ennek a kritériumnak kell megfelelni."], helyes: 1 },
{ kerdes: "Minek nevezzük a hajó nyugalmi és megbillent helyzetének megfelelő felhajtó erők hatásvonalainak metszéspontját?", valaszok: ["Vízkiszorítás tömegközéppont.", "Metacentrum.", "Felhajtóerő támadáspont."], helyes: 1 },
{ kerdes: "Igaz-e hogy főként a tőkesúlyos hajók jellemzője az alakstabilitás?", valaszok: ["Igaz.", "Hamis."], helyes: 1 },
{ kerdes: "Igaz-e hogy főként a tőkesúly nélküli hajókra jellemző az alakstabilitás?", valaszok: ["Hamis.", "Igaz."], helyes: 1 },
{ kerdes: "Hajók esetében melyik tengelyre vonatkoztatjuk a stabilitás fogalmát?", valaszok: ["Függőleges tengely.", "Keresztirányú tengely.", "Hossztengely."], helyes: 2 },
{ kerdes: "Melyik a stabilitás hajózásban használt meghatározása?", valaszok: ["A hajó által kiszorított víz súlya megegyezik a hajó súlyával.", "A hajó azon tulajdonsága, hogy a billentő nyomatéknak ellenáll.", "A hajó hullámzó vízen is megfelelő iránytartó képessége."], helyes: 1 },
{ kerdes: "Minek nevezzük a hajó azon tulajdonságát, hogy a billentő nyomatéknak ellenáll?", valaszok: ["Hullámellenállás.", "Úszóképesség.", "Stabilitás."], helyes: 2 },
{ kerdes: "Mi a légszekrény?", valaszok: ["Kishajókban, csónakokban kialakított vízmentes rekesz az úszóképesség biztosítására, borulás, vízbetörés esetére.", "A hajózásban az üres nem használt szekrényeknek a neve, az újonnan beszállók pakolhatják bele a személyes dolgaikat.", "Egy szekrény méretű kollektív mentőeszköz, az oldalán kapaszkodó zsinórokkal."], helyes: 0 },
  ],
  jog: [
 { kerdes: "Mi a jelentősége a kishajó hajózásra alkalmasságának?", valaszok: ["Ennek fennállása esetén tartható üzemben a hajó.", "Ennek bemutatásával tud az üzemeltető fuvarszerződéseket vagy utasszállítási szerződést kötni a hajóra.", "A személyzet és az üzemeltető biztonságát szolgálja."], helyes: 0 },
{ kerdes: "Milyen célt szolgálnak a különféle hajólajstromok?", valaszok: ["A hajók tulajdoni és műszaki adatainak közhiteles nyilvántartását.", "A hajó üzemképességének igazolását.", "A hajó értékbecslését."], helyes: 0 },
{ kerdes: "Milyen formában tartják nyilván az arra kötelezett kishajót?", valaszok: ["A kishajó lajstromban.", "A vízi sporteszközök lajstromában.", "A hajólevéltárban."], helyes: 0 },
{ kerdes: "Mely szervezetnél tartják nyilván az arra kötelezett kishajót?", valaszok: ["A vízirendészet rendszerében.", "A lajstromozási hatóságnál.", "Az Európai Unió közlekedési igazgatóságán."], helyes: 1 },
{ kerdes: "Milyen alkalommal kell a kishajó üzemeltetőjének kérni az üzemképesség megállapítását és dokumentálását?", valaszok: ["Üzembe helyezéskor, jogszabályban meghatározott vagy a hajózási hatóság döntése szerinti időszakonként és üzemképességet befolyásoló káresemény következményeinek megszűntetése után.", "Évente, vagy a motor kormolási ciklusának végén.", "Öt évenként vagy ha a kishajó kora meghaladja a 20 évet, akkor 2 évente."], helyes: 0 },
{ kerdes: "Milyen döntéseket hozhat az alábbiak közül a hajózási hatóság vagy a vízirendészeti szerv, ha ellenőrzéskor a kishajó hajózásra alkalmasságát hiányosnak találja?", valaszok: ["Kijelölheti, hogy mely javító bázist kell a hajónak felkeresni a hiányosságok megszűntetése céljából.", "Figyelmeztetheti a hajó üzemeltetőjét a hiányosságokból származó veszélyekre és pótoktatást írhat elő.", "Megtilthatja a hajó további üzemeltetését a hiányosság megszűntetéséig."], helyes: 2 },
{ kerdes: "Mely szervezet(ek) ellenőrizhetik a kishajó hajózásra alkalmasságát?", valaszok: ["A NAV és a Katasztrófavédelmi hatóság.", "A hajózási hatóság és a vízirendészeti szervek.", "A Belügyminisztérium."], helyes: 1 },
{ kerdes: "Mely szervezet vagy jogszabály állapíthatja meg a kishajó személyzetének összetételét képesítés és létszám szerint, hol rögzíti azt?", valaszok: ["Azt a jogszabályok (Szemleszabályzat és Hajózási szabályzat) határozzák meg.", "A hajózási hatóság, amely hajólevélben vagy bizonyítványban rögzíti azt.", "A vízirendészet a vízijártassági bizonyítványban rögzíti."], helyes: 1 },
{ kerdes: "Mely szervezet állapíthatja meg a kishajó üzemképességét és miben tanúsítja azt?", valaszok: ["A vízirendészeti hatóság, amely hajólevélben tanúsítja azt.", "A Hajózási Hatóság, amely hajólevélben vagy bizonyítványban tanúsítja azt.", "A Nemzetgazdasági Minisztérium, amely határozatban tanúsítja azt."], helyes: 1 },
{ kerdes: "Melyik követelményt támasztja a hajó személyzetével szemben a víziközlekedésről szóló törvény az alábbiak közül?", valaszok: ["Hajót megfelelő képesítéssel rendelkező, egészségileg és a biztonságos munkavégzésre is alkalmas állapotban lévő személyzet működtethet.", "Gondoskodniuk kell a biztonságos, barátságos és higiénikus munkahelyi viszonyokról, nem lehetnek alkohol vagy kábítószer hatása alatt.", "A személyzet jogainak és kötelezettségeinek egyensúlyban kell lennie a hajó üzemeltetése során."], helyes: 0 },
  ],
  elsosegely: [
  { kerdes: "Mi az egyén törvény szerinti szerepe az elsősegélynyújtás tekintetében?", valaszok: ["Nincs erre vonatkozó szabályozás, egyéni megítélés alapján kell cselekedni.", "Csak a szakember segíthet hirtelen bekövetkezett egészségkárosodás esetén.", "Mindenkinek kötelessége a tőle elvárható módon segítséget nyújtani a bajba jutottnak, sérültnek."], helyes: 2 },
{ kerdes: "Köteles-e a hajó vezetője elsősegélyt nyújtani?", valaszok: ["Nem.", "Igen."], helyes: 1 },
{ kerdes: "Mi az elsősegélynyújtás célja?", valaszok: ["A mentőket riasztani, és még a mentők kiérkezése előtt a baleset helyszínére érni, hogy mi tájékoztathassuk a kiérkező mentőket.", "Az élet megmentése, további egészségkárosodás megakadályozása, gyógyulás elősegítése.", "A társadalmi és erkölcsi normának megfelelően viselkedni a balesetet szenvedett közelében."], helyes: 1 },
{ kerdes: "Köteles-e a hajó vezetője gondoskodni arról, hogy a beteg a legközelebbi alkalmas helyen, egészségügyi ellátásban részesülhessen?", valaszok: ["Nem.", "Igen."], helyes: 1 },
{ kerdes: "Változhat-e az újraélesztési protokoll?", valaszok: ["Igen, 5 évenként felülvizsgálják a statisztikák, klinikai tanulmányok, újabb eszközök és gyógyszerek alapján.", "Nem, mert a jól bevált módszeren nem kell és nem is szabad változtatni.", "Nincs újraélesztési protokoll, ezért nem is változhat."], helyes: 0 },
{ kerdes: "Milyen számon kell a mentőket értesíteni?", valaszok: ["105, vagy 112.", "104, vagy 112.", "107, vagy 112."], helyes: 1 },
{ kerdes: "Melyek az alapvető életfunkciók az alábbiak közül?", valaszok: ["Keringés és a légzés.", "Emésztőrendszer működés.", "Veseműködés."], helyes: 0 },
{ kerdes: "Mik az artériák?", valaszok: ["Verőerek.", "Nyirokerek.", "Gyűjtőerek."], helyes: 0 },
{ kerdes: "Mi a pulzus?", valaszok: ["A vérnyomás napi ingadozása.", "A visszerekben tapintható lüktetés.", "A szív által pumpált vér hullámszerű mozgása az ütőerekben."], helyes: 2 },
{ kerdes: "Mi a légzőrendszer legfontosabb feladata?", valaszok: ["Tápanyagcsere biztosítása.", "A környezetből oxigén felvétele és a termelődő széndioxid leadása.", "Széndioxid felvétele a környezetből, és oxigén leadása oda."], helyes: 1 },
  ],
  tengeri: [
    { kerdes: "Mit nevezünk hosszúsági köröknek?", valaszok: ["Az egyenlítővel párhuzamosak köröket, amelyek Greenwich-ben egy pontba futnak össze.", "Az Egyenlítővel párhuzamosak köröket, amelyek a pólusokon egy pontba futnak össze.", "Az Egyenlítő síkjára merőleges és a pólusokon áthaladó köröket."], helyes: 2 },
    { kerdes: "Mit nevezünk földrajzi hosszúságnak?", valaszok: ["Adott földrajzi ponton áthaladó hosszúsági kör síkjának a kezdő hosszúsági kör síkjával bezárt szögét.", "Két földrajzi pont közötti földfelszíni összekötő vonal hosszát.", "A földrajzi pontot a Föld középpontjával összekötő egyenes és az Egyenlítő síkja által bezárt szöget."], helyes: 0 },
{ kerdes: "Mi a definíciója a csomó mértékegységnek?", valaszok: ["Az egy óra alatt megtett távolságot jelenti tengeri mérföldben mérve.", "Az egy óra alatt megtett távolságot jelenti méterben mérve.", "Az egy óra alatt megtett távolságot jelenti kilométerben mérve."], helyes: 0 },
{ kerdes: "Mi az UTC fogalma?", valaszok: ["Ez a világidő, vagyis a 0 szélességi körnél lévő időpont.", "Ez a világidő, vagyis a mindenkori idő ami a hajón van, függetlenül annak helyzetétől.", "Az UTC az egyezményes koordinált világidő angol betűrövidítése. Ez az az időzóna, amelyikhez a Föld összes többi időzónáját viszonyítjuk."], helyes: 2 },
{ kerdes: "15 csomós sebességgel haladunk. Mennyi idő kell 3 tengeri mérföld megtételéhez?", valaszok: ["6 perc.", "12 perc.", "3 perc."], helyes: 1 },
{ kerdes: "Hogyan végezhetünk helymeghatározást iránylatok mérésével?", valaszok: ["A szélirány figyelembevételével kiszámítjuk a variációból és a deviációból a pozíciónkat.", "Kettő vagy több céltárgy valódi iránylatát felrajzoljuk a térképünkre és az így kapott vonalak metszéspontjában lesz a pozíciónk.", "A tengeráramlás figyelembevételével kiszámítjuk a variációból és a deviációból a pozíciónkat."], helyes: 1 },
{ kerdes: "Hogyan végezhetünk helymeghatározást, ha csak egy céltárgyat tudunk megfigyelni?", valaszok: ["A tengeráramlás figyelembevételével, és a variációval korrigálva számolunk pozíciót.", "A szélirány figyelembevételével kiszámítjuk a variációból és a deviációból a pozíciónkat.", "Orrszög kettőzéssel vagy csúsztatott helyzetvonallal."], helyes: 2 },
{ kerdes: "Egyenletes-e a föld felszínén a mágneses tér?", valaszok: ["Nem.", "Igen."], helyes: 0 },
{ kerdes: "Mit nevezünk variációnak?", valaszok: ["A hajó mágneses térereje befolyásolja az eltérést, ezt nevezzük variációnak.", "A mágneses északi irány és a tájoló által jelzett északi irány különbségét variációnak nevezzük.", "Az adott földrajzi helyen áthaladó mágneses erővonal, és a valódi északi irány szögeltérését nevezzük variációnak."], helyes: 2 },
{ kerdes: "Fejezze be a mondatot! A variáció ( )", valaszok: ["csak pozitív lehet.", "északi (N) vagy déli (S) lehet.", "keleti (E) vagy nyugati (W) lehet."], helyes: 2 },
  ],
  kisgephajo: [
    { kerdes: "Milyen előkészületeket kell tenni, kikötés előtt?", valaszok: ["Kihelyezni az ütköző ballonokat, előkészíteni a kikötő köteleket.", "Értesíteni a vízirendészetet az érkezésünkről.", "A kikötő kötélre kötélvég nyolcast kell kötni."], helyes: 0 },
{ kerdes: "Miben segít a hajócsavar forgásirányának ismerete? (1)", valaszok: ["Segít a manőverezésben.", "Segít az előzésben.", "Segíti a nagy sebességű kanyarodást."], helyes: 0 },
{ kerdes: "Miben segít a hajócsavar forgásirányának ismerete? (2)", valaszok: ["Segít az előzésben.", "Segíti az iránytartást.", "Segíti a nagy sebességű kanyarodást."], helyes: 1 },
{ kerdes: "Hogyan közelíti meg kikötéskor a mólót erős, a part irányából fújó szélben?", valaszok: ["5 - 10 fokos szögben.", "Közel merőlegesen.", "Csúszóra dobott horgonnyal."], helyes: 1 },
{ kerdes: "Kikötőhelyhez sodrással, vagy széllel szemben érkezve melyik kötél megkötésével kell kezdeni a kikötést?", valaszok: ["Az orrkötéllel.", "A horgonykötéllel.", "A farkötéllel."], helyes: 0 },
{ kerdes: "Milyen haladási sebesség mellett a leghatásosabb az orrsugárkormány?", valaszok: ["Csak kis, a kikötői manőverezéseknél használt sebességeknél.", "A hajó teljes sebességtartományában.", "Csak nagy sebességeknél."], helyes: 0 },
{ kerdes: "Kikötőben ledobott horgonyunkról a többi hajóvezető honnan szerez tudomást?", valaszok: ["Nem kell tudniuk a ledobott horgonyról, mert nem zavarja a kikötőben közlekedőket.", "A horgonyra kötött bójáról.", "Tilos bóját kötni a horgonyra, érkező, vagy induló hajót szóban kell figyelmeztetni a horgonyra, vagy a kikötőmestert kell tájékoztatni róla."], helyes: 1 },
{ kerdes: "Idegen kikötőben veszteglés esetén a kikötő üzemeltetője visszatarthatja/elkérheti a hajólevelet?", valaszok: ["A hajólevelet csak megnézheti, de nem tarthatja vissza.", "A hajólevelet elkérheti, és díjfizetésig visszatarthatja.", "A hajólevelet elkérheti, de nem tarthatja vissza."], helyes: 1 },
{ kerdes: "Kikötőben túl szűken bevett fordulónál, a hajó fara a partfalnak ütközik. Mi történhet külmotoros, illetve passzív kormányos hajó esetén ekkor?", valaszok: ["Külmotoros hajónál a kormánylapát, passzív kormányos hajónál a hajócsavar sérülhet.", "Külmotoros hajónál a hajócsavar, passzív kormányos hajónál a kormánylapát sérülhet.", "Mindkét esetben sérül a hajócsavar."], helyes: 1 },
{ kerdes: "Sodrással, vagy széllel szemben kikötött kishajónál melyik kötél elengedésével kell kezdeni az elindulás manővert?", valaszok: ["A farkötél.", "Az orrkötél.", "A horgonykötél."], helyes: 0 },
  ],
  vitorlas: [
   { kerdes: "Hová kell rögzíteni a vontató kötelet a vontatott vitorlás hajón?", valaszok: ["Az első bakhoz.", "Az árboc tövéhez.", "Az orron található korláthoz."], helyes: 1 },
{ kerdes: "Svertes kishajónkat kisgéphajó vontatja. Mi a teendőnk?", valaszok: ["Vontatókötelet az orrverethez rögzíteni, svertet félig felhúzni, úgy kormányozni, hogy a vontató sodrába ne kerüljünk be.", "Vontatókötelet az árbochoz gyorsan oldhatóan rögzíteni, a svertet teljesen leengedni, a kormányt felhúzni.", "Vontatókötelet az árbochoz gyorsan oldhatóan rögzíteni, orrvereten átfűzni, svertet felhúzni, kormányt középállásban rögzíteni."], helyes: 2 },
{ kerdes: "Célszerű horgonyt dobni köves, sziklás mederfenéken?", valaszok: ["Nem, mert a horgony beakadhat úgy, hogy nem lehet felszedni.", "Igen, mert a köves aljzatban jobban tart a horgony.", "Igen a köves aljzat az ideális horgonyzáshoz."], helyes: 0 },
{ kerdes: "Célszerű ismerni a mederjellemzőket horgonyzáskor?", valaszok: ["Nem, mert a mederjellemzők nem befolyásolják a horgonyzást.", "Csak hosszú időre lehorgonyzáshoz szükséges a mederjellemzők ismerete.", "Igen, mert a mederjellemzők nagyban befolyásolják a horgonyzást."], helyes: 2 },
{ kerdes: "Hogyan viselkedik a hajótest jobb forgású hajócsavarral hátramenetbe kapcsolva?", valaszok: ["A hajó orra bal oldalra kitér.", "A hajó fara bal oldalra kitér.", "A hajó fara jobb oldalra kitér."], helyes: 1 },
{ kerdes: "Jobbforgású hajócsavarral szerelt vitorlás fara merre mozdul el oldalirányban, ha álló helyzetében erőteljes gázt adunk röviden előremenetben?", valaszok: ["Jobbra.", "Semerre.", "Balra."], helyes: 0 },
{ kerdes: "Jobbforgású hajócsavarral szerelt vitorlás fara merre mozdul el oldalirányban, ha álló helyzetében erőteljes gázt adunk röviden hátramenetben?", valaszok: ["Semerre.", "Balra.", "Jobbra."], helyes: 1 },
{ kerdes: "Vízhez képest álló hajó, kitérített kormánylapátján ébred kormányerő?", valaszok: ["Igen.", "Nem."], helyes: 1 },
{ kerdes: "Mikor kell a hajó vezetőjének a hajón tartózkodnia?", valaszok: ["Mindaddig, amíg vezet és amíg veszély esetén az utolsó utas is elhagyta a hajót.", "Mindaddig, amíg a hajó menetben van.", "Mindaddig, amíg a hajó vízen van."], helyes: 1 },
{ kerdes: "Kell-e felelősség biztosítást kötni a kedvtelési célú kishajókra?", valaszok: ["Igen.", "Csak tőkesúlyos hajókra.", "Nem."], helyes: 2 },
  ],
}

const CIMEK = {
  szabalyzat: "Hajózási szabályzat, IV. szint",
  hajovezetestan: "Hajóvezetéstan, IV. szint",
  meteorologia: "Hajózási földrajz, vízrajz, meteorológia",
  hajogeptan: "Hajóelmélet és hajógéptan",
  jog: "Jog és rendeletismeret",
  elsosegely: "Elsősegély és tűzvédelem",
  tengeri: "Tengeri IV. osztályú kishajós kérdéssor",
  kisgephajo: "Hajózási ismeretek – Kisgéphajó",
  vitorlas: "Hajózási ismeretek – Vitorlás kishajó",
}

function saveTestResult(type, correct, wrong) {
  const progress = getProgress()

  progress[type] = {
    answered: correct + wrong,
    correct,
    wrong,
    lastScore: Math.round((correct / (correct + wrong)) * 100),
    lastPlayed: new Date().toISOString()
  }

  saveProgress(progress)
}
const LS_KEY = "kishajos_progress"

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}")
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

export default function VizsgaKerdessor({ tipus: tiusProp, proba }) {
  const { tipus: tipusParam } = useParams()
  const tipus = tiusProp ?? tipusParam
  const navigate = useNavigate()
  const [kilepesMegerosites, setKilepesMegerosites] = useState(false)
  const OSSZES = OSSZES_KERDES[tipus] ?? OSSZES_KERDES["szabalyzat"]
  const KERDESEK = useMemo(() => {
    if (!proba) return OSSZES
    const shuffled = [...OSSZES].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [tipus, proba])
  const CIM = CIMEK[tipus] ?? "Kérdéssor"

  const [aktualis, setAktualis] = useState(0)
  const [valasztott, setValasztott] = useState({})
  const [allapot, setAllapot] = useState({})
  const [ellenorzott, setEllenorzott] = useState({})
  const [osszesito, setOsszesito] = useState(false)

  const k = KERDESEK[aktualis]
  const kiVan = valasztott[aktualis] !== undefined
  const ellenőrizveVan = !!ellenorzott[aktualis]

  const [ido, setIdo] = useState(60)
  const timerRef = useRef(null)
  const aktualasRef = useRef(0) 

  /* időzítő: 60 mp visszaszámlálás, lejáratkor automatikus ugrás */
      useEffect(() => {
      aktualasRef.current = aktualis
    }, [aktualis])

    useEffect(() => {
      setIdo(60)
      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = setInterval(() => {
        setIdo((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            const idx = aktualasRef.current
            setAllapot((prevState) => ({
              ...prevState,
              [idx]: prevState[idx] ?? "atugrott"
            }))
            setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timerRef.current)
    }, [aktualis])

/*  kérdésre ugrás + timer reset */
  function ugrasKerdesre(i) {
    if (timerRef.current) clearInterval(timerRef.current) 
    setOsszesito(false)
    setAllapot((prev) => ({ ...prev, [aktualis]: prev[aktualis] ?? "atugrott" }))
    setAktualis(i)
  }

  function valasszon(vi) {
    if (ellenőrizveVan) return
    setValasztott((prev) => ({ ...prev, [aktualis]: vi }))
    setAllapot((prev) =>
      prev[aktualis] === "helyes" || prev[aktualis] === "hibas"
        ? prev
        : { ...prev, [aktualis]: undefined }
    )
  }

/*  válasz ellenőrzése (helyes/hibás) */
  function ellenorzes() {
    if (!kiVan) return
    const jo = valasztott[aktualis] === k.helyes
    setAllapot((prev) => ({ ...prev, [aktualis]: jo ? "helyes" : "hibas" }))
    setEllenorzott((prev) => ({ ...prev, [aktualis]: true }))
  }

  function helyes() {
    setValasztott((prev) => ({ ...prev, [aktualis]: k.helyes }))
    setAllapot((prev) => ({ ...prev, [aktualis]: "megtekintett" }))
    setEllenorzott((prev) => ({ ...prev, [aktualis]: true }))
  }

  function kihagy() {
  if (timerRef.current) clearInterval(timerRef.current) 
  setAllapot((prev) => ({ ...prev, [aktualis]: "atugrott" }))
  setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
  }


  function elozo() {
    if (timerRef.current) clearInterval(timerRef.current) 
    if (aktualis > 0) setAktualis((p) => p - 1)
  }

/*  helyes / hibás / megválaszolt kérdések számolása */
  const helyes_db = Object.values(allapot).filter((v) => v === "helyes").length
  const hibas_db = Object.values(allapot).filter((v) => v === "hibas").length
  const valasz_db = helyes_db + hibas_db

/* eredmény mentése localStorage-ba a teszt végén */
    useEffect(() => {
    if (osszesito) {
      saveTestResult(tipus, helyes_db, hibas_db)
    }
  }, [osszesito])

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-6 pt-20 px-4">

        {/* Fejléc */}
            <div className="bg-slate-50 border border-slate-900/10 rounded-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setKilepesMegerosites(true)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition font-semibold">
                  <ChevronLeft className="w-4 h-4" /> Kilépés
                </button>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-slate-500">{CIM}</div>
                  <div className="text-sm text-slate-700 mt-0.5">
                    Kérdés: <span className="font-bold text-slate-950">{aktualis + 1} / {KERDESEK.length}</span>
                  </div>
                  <div className={`text-xs font-bold ${ido <= 10 ? "text-red-600" : "text-slate-700"}`}>
                    Idő: {ido}mp
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" /> Megtekintett</span>
                <span className="flex items-center gap-1 text-yellow-600"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> Kihagyott</span>
                <span className="flex items-center gap-1 text-red-600"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> Hibás</span>
                <span className="flex items-center gap-1 text-green-600"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" /> Helyes</span>
              </div>
            </div>

            {kilepesMegerosites && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl space-y-4">
                  <p className="text-slate-800 font-semibold text-base">Biztosan ki szeretnél lépni?</p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setKilepesMegerosites(false)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold tracking-widest uppercase transition"
                    >
                      Maradok
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold tracking-widest uppercase transition"
                    >
                      Kilépés
                    </button>
                  </div>
                </div>
              </div>
            )}
        {/* Kérdésrács */}
        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-4">
          <div className="flex flex-wrap gap-1.5">
            {KERDESEK.map((_, i) => {
              const a = allapot[i]
              const aktiv = i === aktualis
              const base =
                a === "helyes" ? "bg-green-400 text-white border-green-500" :
                a === "hibas" ? "bg-red-500 text-white border-red-600" :
                a === "atugrott" ? "bg-yellow-400 text-slate-900 border-yellow-500" :
                valasztott[i] !== undefined ? "bg-blue-400 text-white border-blue-500" :
                "bg-slate-200 text-slate-700 border-slate-300"
              return (
                <button key={i} onClick={() => ugrasKerdesre(i)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold border transition ${base} ${aktiv ? "ring-2 ring-slate-950 ring-offset-1" : "hover:opacity-80"}`}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

        {/* Kérdés panel */}
        {!osszesito ? (
          <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
                {aktualis + 1}. kérdés
              </div>
              <p className="text-base text-slate-800 leading-relaxed">{k.kerdes}</p>
            </div>

            <div className="space-y-3">
              {k.valaszok.map((v, vi) => {
                const kivalasztva = valasztott[aktualis] === vi
                let stilus = "w-full text-left px-5 py-3.5 rounded-xl border text-sm transition flex items-center gap-3 "
                if (ellenőrizveVan) {
                  if (vi === k.helyes) stilus += "bg-green-50 border-green-400 text-green-800 font-semibold"
                  else if (kivalasztva) stilus += "bg-red-50 border-red-400 text-red-700"
                  else stilus += "bg-slate-100 border-slate-200 text-slate-500"
                } else {
                  stilus += kivalasztva
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }
                return (
                  <button key={vi} onClick={() => valasszon(vi)} className={stilus}>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                      ${ellenőrizveVan && vi === k.helyes ? "border-green-500" :
                        ellenőrizveVan && kivalasztva ? "border-red-400" :
                        kivalasztva ? "border-white" : "border-slate-300"}`}>
                      {kivalasztva && !ellenőrizveVan && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                      {ellenőrizveVan && vi === k.helyes && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {ellenőrizveVan && kivalasztva && vi !== k.helyes && <XCircle className="w-4 h-4 text-red-400" />}
                    </span>
                    {v}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <div className="flex gap-2">
                <button onClick={kihagy} disabled={ellenőrizveVan}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  <SkipForward className="w-4 h-4" /> Kihagyás
                </button>
                <button onClick={() => setOsszesito(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold tracking-widest uppercase transition">
                  <BarChart2 className="w-4 h-4" /> Összesítő
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={helyes} disabled={ellenőrizveVan}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  <Eye className="w-4 h-4" /> Helyes válasz
                </button>
                <button onClick={ellenorzes} disabled={!kiVan || ellenőrizveVan}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  Ellenőrzés
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <button onClick={elozo} disabled={aktualis === 0}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 disabled:opacity-30 transition font-semibold">
                <ChevronLeft className="w-4 h-4" /> Előző
              </button>
              <button
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current) 
                  setAllapot((prev) => ({
                    ...prev,
                    [aktualis]: prev[aktualis] ?? "atugrott"
                  }))
                  setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
                }}
                disabled={aktualis === KERDESEK.length - 1}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 disabled:opacity-30 transition font-semibold">
                Következő <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 space-y-6">
            <div className="text-sm font-semibold tracking-widest uppercase text-slate-500">Kérdés összesítő</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Összes", value: KERDESEK.length, color: "text-slate-800" },
                { label: "Megválaszolt", value: valasz_db, color: "text-blue-600" },
                { label: "Helyes", value: helyes_db, color: "text-green-600" },
                { label: "Hibás", value: hibas_db, color: "text-red-600" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-100 rounded-xl p-4 text-center border border-slate-200">
                  <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
            {valasz_db > 0 && (
              <div>
                <div className="text-xs text-slate-500 mb-2 font-semibold tracking-widest uppercase">Eredmény</div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-green-400 transition-all" style={{ width: valasz_db ? `${(helyes_db / valasz_db) * 100}%` : '0%'}} />
                </div>
                <div className="text-right text-xs text-slate-500 mt-1">{Math.round((helyes_db / valasz_db) * 100)}% helyes</div>
              </div>
            )}
            <button onClick={() => setOsszesito(false)}
              className="mt-2 bg-slate-950 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition">
              Vissza a kérdésekhez
            </button>
          </div>
        )}
      </div>
    </div>
  )
}