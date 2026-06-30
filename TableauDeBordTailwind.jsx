import React, { useState } from "react";
import {
  ChevronRight,
  Bell,
  UserCircle,
  Calendar,
  Search,
  Plus,
  Menu,
  X,
} from "lucide-react";

/* =====================================================================
   TraceSafe — Tableau de bord
   Tailwind CSS · Responsive (mobile → desktop) · WCAG 2.1 niveau AA
   ===================================================================== */

export default function TableauDeBord() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <div className="font-sans text-gray-900 lg:p-1 lg:bg-slate-900">
      {/* Lien d'évitement clavier (WCAG 2.4.1) */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>

      <div className="overflow-hidden bg-white lg:rounded-xl">
        <Header menuOuvert={menuOuvert} setMenuOuvert={setMenuOuvert} />

        <div className="relative flex">
          {/* Overlay mobile */}
          {menuOuvert && (
            <div
              onClick={() => setMenuOuvert(false)}
              className="fixed inset-0 z-30 bg-black/40 lg:hidden"
              aria-hidden="true"
            />
          )}

          <Sidebar menuOuvert={menuOuvert} fermer={() => setMenuOuvert(false)} />

          <main id="contenu" className="min-w-0 flex-1 bg-white px-4 py-6 sm:px-6 lg:px-8">
            <Contenu />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- HEADER ----------------------------- */
function Header({ menuOuvert, setMenuOuvert }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-label={menuOuvert ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
          aria-expanded={menuOuvert}
          aria-controls="navigation-laterale"
          className="rounded-md p-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden"
        >
          {menuOuvert ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-md"
            style={{ background: "linear-gradient(180deg,#1a1a1a 0 50%,#e11d2a 50% 100%)" }}
            aria-hidden="true"
          />
          <span className="text-xl font-extrabold sm:text-2xl">TraceSafe</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <span className="hidden rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white sm:inline">
          Administrateur
        </span>

        <button
          type="button"
          className="relative rounded-md p-1 text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Notifications, messages non lus"
        >
          <Bell size={22} aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={30} strokeWidth={1.5} className="text-gray-500" aria-hidden="true" />
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold">Kouakou Lambertin</div>
            <button type="button" className="text-xs text-gray-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- SIDEBAR ----------------------------- */
const MENU = [
  { label: "Tableau de bord", children: ["Vue d'ensemble", "Statistiques"] },
  { label: "Campagne", children: ["Liste des campagnes", "Nouvelle campagne", "Planning"] },
  { label: "Site", children: ["Liste des sites", "Ajouter un site"] },
  { label: "Inventoriste", children: ["Liste", "Ajouter", "Affectations"] },
  { label: "Gestion QR code", children: ["Générer", "Scanner", "Historique"] },
  { label: "Gestion de biens", children: ["Liste des biens", "Catégories", "Importer / Exporter"] },
  { label: "Comptes", children: ["Utilisateurs", "Rôles & permissions", "Paramètres"] },
];

function Sidebar({ menuOuvert, fermer }) {
  const [ouvert, setOuvert] = useState("Tableau de bord");
  const [actif, setActif] = useState("Tableau de bord");

  const basculer = (item) => {
    if (item.children?.length) {
      setOuvert((p) => (p === item.label ? null : item.label));
    } else {
      setActif(item.label);
      fermer();
    }
  };

  return (
    <nav
      id="navigation-laterale"
      aria-label="Navigation principale"
      className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-gray-50 px-3 py-4 transition-transform duration-200 lg:static lg:z-auto lg:w-56 lg:translate-x-0 ${
        menuOuvert ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="flex flex-col gap-0.5">
        {MENU.map((item, i) => {
          const estOuvert = ouvert === item.label;
          const parentActif = actif === item.label;
          const aEnfants = !!item.children?.length;
          const idSous = `sous-menu-${i}`;

          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => basculer(item)}
                aria-expanded={aEnfants ? estOuvert : undefined}
                aria-controls={aEnfants ? idSous : undefined}
                aria-current={parentActif ? "page" : undefined}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  parentActif ? "bg-gray-200 font-semibold" : "font-medium hover:bg-gray-100"
                }`}
              >
                <ChevronRight
                  size={15}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-200 ${estOuvert ? "rotate-90" : ""}`}
                />
                <span>{item.label}</span>
              </button>

              {aEnfants && (
                <div
                  id={idSous}
                  aria-hidden={!estOuvert}
                  className={`grid transition-all duration-200 ${estOuvert ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <ul className="overflow-hidden">
                    {item.children.map((sous) => {
                      const sousActif = actif === sous;
                      return (
                        <li key={sous}>
                          <button
                            type="button"
                            tabIndex={estOuvert ? 0 : -1}
                            onClick={() => {
                              setActif(sous);
                              fermer();
                            }}
                            aria-current={sousActif ? "page" : undefined}
                            className={`w-full rounded-lg py-2 pl-9 pr-3 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                              sousActif ? "bg-gray-200 font-semibold text-gray-900" : "font-medium text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {sous}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ----------------------------- CONTENU ----------------------------- */
function Contenu() {
  return (
    <>
      <h1 className="mb-5 text-2xl font-extrabold sm:text-3xl">Tableau de bord</h1>

      {/* Période + bouton créer */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:w-64">
          <label htmlFor="periode" className="mb-1.5 block text-sm text-gray-700">
            Période
          </label>
          <div className="relative">
            <select
              id="periode"
              defaultValue="2026"
              className="w-full appearance-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <Calendar size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
        >
          <span aria-hidden="true">📦</span>
          Créer une campagne
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Cartes KPI */}
      <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard emoji="📦" titre="Campagnes" valeur="02" />
        <KpiCard emoji="🏬" titre="Sites" valeur="04" />
        <KpiCard emoji="👷" titre="Inventoristes" valeur="50" />
      </ul>

      {/* Campagnes en cours */}
      <h2 className="mb-3.5 text-lg font-bold sm:text-xl">Campagne en cours 2026</h2>
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CampagneCard
          titre="Campagnes Sem.1"
          statut="Terminé"
          statutClasse="text-green-700"
          fondClasse="bg-gray-100"
        />
        <CampagneCard
          titre="Campagnes Sem.2"
          statut="Se termine dans 45 j"
          statutClasse="text-blue-700"
          fondClasse="bg-blue-50"
          pause
        />
      </div>

      <StatistiquesSection />
    </>
  );
}

/* ----------------------------- KPI CARD ----------------------------- */
function KpiCard({ emoji, titre, valeur }) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-gray-200 px-4 py-4">
      <span className="text-4xl leading-none" aria-hidden="true">{emoji}</span>
      <div>
        <div className="text-base font-bold">{titre}</div>
        <div className="my-0.5 text-2xl font-bold" aria-label={`${valeur} ${titre.toLowerCase()}`}>{valeur}</div>
        <a href="#" className="text-sm text-gray-700 underline underline-offset-2 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
          Voir
        </a>
      </div>
    </li>
  );
}

/* ----------------------------- CAMPAGNE CARD ----------------------------- */
function CampagneCard({ titre, statut, statutClasse, fondClasse, pause }) {
  const ligne = (emoji, texte) => (
    <li className="flex items-center gap-2.5">
      <span className="text-sm" aria-hidden="true">{emoji}</span>
      <span className="text-sm font-medium">{texte}</span>
    </li>
  );

  return (
    <article className={`rounded-2xl ${fondClasse} px-4 pb-3 pt-4 sm:px-5`}>
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">📦</span>
        <h3 className="flex-1 pt-1.5 text-base font-bold sm:text-lg">{titre}</h3>
        <span className={`whitespace-nowrap pt-2 text-sm font-bold ${statutClasse}`}>{statut}</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-xl bg-white px-4 py-3.5">
        <ul className="flex flex-col gap-2.5">
          {ligne("📦", "4500 biens")}
          {ligne("📍", "04 sites")}
          {ligne("👤", "06 inventoristes")}
        </ul>
        <ChevronRight size={20} className="text-gray-400" aria-hidden="true" />
      </div>

      <div className="mt-2.5 flex justify-end gap-5">
        {pause && (
          <button type="button" className="text-sm font-medium text-gray-800 underline underline-offset-2 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
            Mettre en pause
          </button>
        )}
        <button type="button" className="text-sm font-medium text-gray-800 underline underline-offset-2 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
          Détails
        </button>
      </div>
    </article>
  );
}

/* ----------------------------- STATISTIQUES ----------------------------- */
function StatistiquesSection() {
  return (
    <section aria-labelledby="titre-stats">
      <h2 id="titre-stats" className="mb-4 text-lg font-bold sm:text-xl">
        Statistiques d'inventaires
      </h2>

      {/* Recherche */}
      <div className="mb-5 flex items-center gap-2.5 rounded-full border border-gray-300 px-4 py-2.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600">
        <label htmlFor="recherche" className="sr-only">Rechercher</label>
        <input
          id="recherche"
          type="search"
          placeholder="Rechercher"
          className="flex-1 bg-transparent text-sm placeholder:text-gray-500 focus:outline-none"
        />
        <Search size={18} className="text-gray-500" aria-hidden="true" />
      </div>

      {/* Filtres */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Filtre id="f-stat" label="Statistique" options={["Biens immo", "Biens consommables"]} />
        <Filtre id="f-camp" label="Trier par Campagne" options={["Campagne Sem.2", "Campagne Sem.1"]} />
        <Filtre id="f-site" label="Trier par site" placeholder="Ex : Siège SGCI" options={["Siège SGCI", "Agence Plateau"]} />
        <Filtre id="f-inv" label="Inventoriste(s)" placeholder="Ex : Jean Kacou" options={["Jean Kacou", "Awa Touré"]} />
      </div>

      {/* Panneau bleu */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-blue-50 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-5">
        <span className="text-base font-bold">Campagnes Sem.2</span>
        <span className="text-sm text-gray-700">Période</span>
        <div className="flex items-center gap-2.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm">
          <span>01/01/2026 - 31/06/2026</span>
          <Calendar size={15} className="text-gray-500" aria-hidden="true" />
        </div>
        <span className="text-sm font-bold text-blue-700 sm:ml-auto">Se termine dans 45 j</span>
      </div>

      <Graphique />
    </section>
  );
}

function Filtre({ id, label, options, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-700">{label}</label>
      <div className="relative">
        <select
          id={id}
          defaultValue={placeholder ? "" : options[0]}
          className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronRight size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-500" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ----------------------------- GRAPHIQUE ----------------------------- */
function Graphique() {
  const max = 5000;
  // Valeurs d'exemple — à brancher sur tes vraies données.
  const data = [
    { label: "Bien Scannés", valeur: 2400, barre: "bg-orange-100" },
    { label: "Biens en bons états", valeur: 1100, barre: "bg-green-100" },
    { label: "Biens endommagés", valeur: 1900, barre: "bg-red-100" },
  ];
  const ticks = [0, 1000, 2000, 3000, 4000, 5000];

  return (
    <figure className="m-0">
      <figcaption className="sr-only">Répartition des biens par état d'inventaire</figcaption>

      {/* Légende */}
      <ul className="mb-6 flex flex-wrap gap-3">
        <li className="rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-semibold text-gray-800">Biens scannés</li>
        <li className="rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-semibold text-gray-800">Biens en bons états</li>
        <li className="rounded-full bg-red-100 px-3.5 py-1.5 text-xs font-semibold text-gray-800">Biens endommagés</li>
      </ul>

      {/* Barres */}
      <div className="flex flex-col gap-4">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-24 shrink-0 text-right text-xs text-gray-700 sm:w-32 sm:text-sm">{d.label}</div>
            <div className="min-w-0 flex-1">
              <div
                className={`rounded-lg py-3.5 text-center text-sm font-semibold text-gray-800 ${d.barre}`}
                style={{ width: `${Math.max((d.valeur / max) * 100, 8)}%` }}
                role="img"
                aria-label={`${d.label} : ${d.valeur} biens`}
              >
                {d.valeur}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Axe X */}
      <div className="mt-3 flex items-center gap-3">
        <div className="w-24 shrink-0 text-right text-xs text-gray-700 sm:w-32 sm:text-sm">Nbre de biens</div>
        <div className="flex flex-1 justify-between">
          {ticks.map((t) => (
            <span key={t} className="text-xs text-gray-500">{t}</span>
          ))}
        </div>
      </div>
    </figure>
  );
}
