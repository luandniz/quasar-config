/*!
 * Quasar Framework v2.13.0
 * (c) 2015-present Razvan Stoenescu
 * Released under the MIT License.
 */
(function(e,s){"object"===typeof exports&&"undefined"!==typeof module?module.exports=s():"function"===typeof define&&define.amd?define(s):(e="undefined"!==typeof globalThis?globalThis:e||self,e.Quasar=e.Quasar||{},e.Quasar.lang=e.Quasar.lang||{},e.Quasar.lang.hu=s())})(this,function(){"use strict";var e={isoName:"hu",nativeName:"Magyar",label:{clear:"Törlés",ok:"OK",cancel:"Mégsem",close:"Bezárás",set:"Beállítás",select:"Kiválasztás",reset:"Visszaállítás",remove:"Eltávolítás",update:"Módosítás",create:"Létrehozás",search:"Keresés",filter:"Szűrés",refresh:"Frissítés",expand:e=>e?`A "${e}" kiterjesztése`:"Kiterjed",collapse:e=>e?`A "${e}" összecsukása`:"Összeomlás"},date:{days:"Vasárnap_Hétfő_Kedd_Szerda_Csütörtök_Péntek_Szombat".split("_"),daysShort:"Vas_Hét_Ke_Sze_Csü_Pén_Szo".split("_"),months:"Január_Február_Március_Április_Május_Június_Július_Augusztus_Szeptember_Október_November_December".split("_"),monthsShort:"Jan_Feb_Már_Ápr_Máj_Jún_Júl_Aug_Szep_Okt_Nov_Dec".split("_"),firstDayOfWeek:1,format24h:!0,pluralDay:"nap"},table:{noData:"Nincs elérhető adat",noResults:"Nincsenek egyező találatok",loading:"Betöltés...",selectedRecords:e=>1===e?"1 kiválasztott elem.":(0===e?"Nincs":e)+" kiválasztott elem.",recordsPerPage:"Elemek száma oldalanként:",allRows:"Összes",pagination:(e,s,t)=>e+"-"+s+" / "+t,columns:"Oszlopok"},editor:{url:"URL",bold:"Félkövér",italic:"Dőlt",strikethrough:"Áthúzott",underline:"Aláhúzott",unorderedList:"Felsorolás",orderedList:"Számozás",subscript:"Alsó index",superscript:"Felső index",hyperlink:"Hivatkozás",toggleFullscreen:"Teljes képernyő",quote:"Idézet",left:"Balra igazítás",center:"Középre igazítás",right:"Jobbra igazítás",justify:"Sorkizárás",print:"Nyomtatás",outdent:"Behúzás csökkentése",indent:"Behúzás növelése",removeFormat:"Formázás törlése",formatting:"Formázás",fontSize:"Betűméret",align:"Igazítás",hr:"Vízszintes elválasztó beillesztése",undo:"Visszavonás",redo:"Mégis",heading1:"Címsor 1",heading2:"Címsor 2",heading3:"Címsor 3",heading4:"Címsor 4",heading5:"Címsor 5",heading6:"Címsor 6",paragraph:"Paragrafus",code:"Kód",size1:"Nagyon kicsi",size2:"Kicsi",size3:"Normál",size4:"Közepesen nagy",size5:"Nagy",size6:"Nagyon nagy",size7:"Maximális",defaultFont:"Alapértelmezett betűtípus",viewSource:"Forrás megtekintése"},tree:{noNodes:"Nincsenek elérhető elemek",noResults:"Nincsenek egyező találatok"}};return e});