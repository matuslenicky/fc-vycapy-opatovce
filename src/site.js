// Statický generátor webu FC Výčapy-Opatovce: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-18 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Pás kariet“: úvod otvára veľký citát piesne „Majme sa radi, chlapci…“ (hymna po zápase s Törekvésom 1940),
// pod ním pás s najbližším zápasom a dva pásy kariet – program a výsledky. Na telefóne sa karty posúvajú vodorovne,
// na počítači sú v mriežke. Potom tabuľka ligy. Biela, teplá sivá, červená z erbu, žltá len v detailoch.
// Písmo Bodoni Moda (titulky, citát) a Schibsted Grotesk (text).
const SKIN = {
  nav: 'bar', theme: '#b8232b', brand: 'FC Výčapy-Opatovce', brandSub: 'futbal od rokov 1929 – 1930',
  fonts: ['bodoni-moda-400i.woff', 'schibsted-grotesk-400.woff', 'schibsted-grotesk-600.woff'],
  sources: 'História futbalu podľa monografie obce (1999) na webe obce Výčapy-Opatovce.',
  adminHero: 'Majme sa radi, chlapci',
  adminFacts: club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })),
  links: [[club.obecKlub, 'Klub na webe obce']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – futbal vo Výčapoch-Opatovciach od rokov ${club.zaciatky}. Zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže. Víťaz VII. ligy ObFZ Nitra 2025/26.`;

// karta zápasu do pásu: dátum a tím, erb súpera, súper, výsledok alebo čas výkopu
function kc(m, R) {
  const href = m.detail || !m.past ? `${R}${m.url}` : '';
  const tag = href ? 'a' : 'div';
  const d = dObj(m.date);
  const val = m.past ? sc(m) : `<span class="kc-t">${esc(m.time || '–')}</span>`;
  return `<li class="kc${m.teamObj === A ? '' : ' kc--y'}"><${tag} class="kc-a"${href ? ` href="${href}"` : ''}>
  <span class="kc-top"><time datetime="${m.date}">${dDay(m.date)} ${d.getUTCDate()}. ${d.getUTCMonth() + 1}.</time><span class="kc-team">${esc(m.teamObj.short)}</span></span>
  ${logo(m.oppSpace, m.opponent, R, 44)}
  <span class="kc-o">${esc(m.opponent)}</span>
  <span class="kc-m">${m.home ? 'doma' : 'vonku'} · ${esc(m.cup ? m.comp : m.roundName || m.comp)}</span>
  <span class="kc-v">${val}</span>
</${tag}></li>`;
}
const rail = (list, R, label) => `<ol class="rail" aria-label="${label}">${list.map((m) => kc(m, R)).join('')}</ol>`;

add('', {
  title: `futbal od rokov ${club.zaciatky}`, active: '', bodyClass: 'home',
  body: (R) => {
    const n = nextA;
    const wl = winterLine();
    const up = homeUp(8, nextA);
    const res = homeRes(8);
    return `<section class="vo-hero"><div class="wrap vo-hero-in">
  <h1 class="vo-h1">FC Výčapy-Opatovce</h1>
  <p class="vo-q">„Majme sa radi, chlapci…“</p>
  <p class="vo-cap">Pieseň, ktorú si futbalisti v roku 1940 zaspievali s hosťami z bratislavského Törekvésu, sa potom roky spievala po každom zápase.</p>
</div></section>
${n ? `<section class="vo-next" aria-labelledby="n-h"><div class="wrap vo-next-in">
  <h2 class="vo-next-k" id="n-h">Najbližší zápas áčka</h2>
  <p class="vo-next-m"><b>${n.home ? `<span class="nw">Výčapy-Opatovce</span> – ${glueAbbr(esc(n.opponent))}` : `${glueAbbr(esc(n.opponent))} – <span class="nw">Výčapy-Opatovce</span>`}</b> <span><time datetime="${n.date}">${dLong(n.date)}</time>${n.time ? `, ${esc(n.time)}` : ''}</span></p>
  ${wl ? `<p class="vo-next-w">Zimná prestávka do marca.</p>` : `<p class="vo-next-w"><span class="cd" data-kickoff="${isoLocal(n.date, n.time)}" hidden></span></p>`}
  <a class="btn btn--line" href="${R}kalendar/zapas-${n.id}.ics" download>${I.cal}Do kalendára</a>
</div></section>` : ''}
<section class="sec sec--first sec--rail" aria-labelledby="p-h"><div class="wrap">
  <div class="vo-head"><h2 class="h2" id="p-h">Program</h2>${more(`${R}zapasy/`, 'Všetky zápasy')}</div>
  ${up.length ? rail(up, R, 'Program áčka a žiakov') : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}
</div></section>
<section class="sec sec--rail" aria-labelledby="r-h"><div class="wrap">
  <div class="vo-head"><h2 class="h2" id="r-h">Výsledky</h2>${more(`${R}zapasy/#z-vys`, 'Všetky výsledky')}</div>
  ${rail(res, R, 'Posledné výsledky áčka a žiakov')}
</div></section>
${A.table ? `<section class="sec sec--tint" aria-labelledby="t-h"><div class="wrap vo-table">
  <div class="vo-head"><h2 class="h2" id="t-h">${esc(A.leagueName)}</h2>${more(`${R}tabulky/`, 'Všetky tabuľky')}</div>
  ${tableHtml(A.table, R)}
</div></section>` : ''}`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: futbal od rokov ${club.zaciatky}, zápas s Törekvésom 1940, postup do krajskej súťaže 1990/91, ročníky áčka, ihrisko a obec.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}, futbal v obci od rokov ${club.zaciatky}. Farby z erbu: ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap cols2">
  <div><h2 class="h2">Sedemdesiat rokov futbalu</h2>${facts(club.kronika.zoznam.map((x) => ({ k: x.rok, t: x.text })))}</div>
  <div><h2 class="h2">Ročníky áčka</h2>${seasonsTable(club.rocniky.zoznam)}
    <h2 class="h2 h2--gap">Úspechy</h2>${facts(club.uspechy.map((u) => ({ k: u.rok, t: u.text })))}</div>
</div></section>
<section class="sec sec--tint"><div class="wrap cols2">
  <div><h2 class="h2">Ihrisko</h2>${facts(ST.fakty)}</div>
  <div><h2 class="h2">Výčapy-Opatovce</h2>${facts(club.obec.fakty)}<p class="note">Zdroje: web obce Výčapy-Opatovce (Šport, História obce), monografia Výčapy – Opatovce (1999), Sportnet.</p></div>
</div></section>`,
});
