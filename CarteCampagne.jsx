import React from "react";
import { Package, MapPin, User, ChevronRight } from "lucide-react";

/**
 * CarteCampagne — reproduction fidèle de la carte d'inventaire.
 * Styles 100% inline. Données passées en props avec valeurs par défaut.
 */
export default function CarteCampagne({
  titre = "Campagnes Sem.1",
  statut = "Terminé",
  biens = "4500",
  sites = "04",
  inventoristes = "06",
  onDetails = () => {},
  onOpen = () => {},
}) {
  const ligne = (Icone, texte) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Icone size={18} strokeWidth={1.9} color="#1f2937" />
      <span style={{ fontSize: 14.5, color: "#111827", fontWeight: 500 }}>
        {texte}
      </span>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#f3f4f4",
        borderRadius: 18,
        padding: "18px 20px 14px",
        width: 540,
        maxWidth: "100%",
        boxSizing: "border-box",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* En-tête : illustration + titre + statut */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <Illustration />

        <h3
          style={{
            margin: 0,
            flex: 1,
            fontSize: 20,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: -0.2,
            paddingTop: 8,
          }}
        >
          {titre}
        </h3>

        <span
          style={{
            color: "#16a34a",
            fontSize: 16,
            fontWeight: 700,
            paddingTop: 10,
            whiteSpace: "nowrap",
          }}
        >
          {statut}
        </span>
      </div>

      {/* Carte blanche interne */}
      <div
        onClick={onOpen}
        style={{
          marginTop: 12,
          backgroundColor: "#ffffff",
          borderRadius: 14,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {ligne(Package, `${biens} biens`)}
          {ligne(MapPin, `${sites} sites`)}
          {ligne(User, `${inventoristes} inventoristes`)}
        </div>

        <ChevronRight size={22} strokeWidth={2} color="#9ca3af" />
      </div>

      {/* Lien Détails */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <span
          onClick={onDetails}
          style={{
            fontSize: 13.5,
            color: "#1f2937",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Détails
        </span>
      </div>
    </div>
  );
}

/* Illustration : diable + cartons + loupe (SVG inline) */
function Illustration() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Diable (sack truck) */}
      <path
        d="M14 12 L18 12 L20 44 L40 44"
        stroke="#374151"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="50" r="3.4" stroke="#374151" strokeWidth="2.2" />
      <circle cx="38" cy="50" r="3.4" stroke="#374151" strokeWidth="2.2" />
      <path
        d="M21 44 L21 50 M41 44 L41 50"
        stroke="#374151"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Cartons empilés */}
      <rect x="20" y="28" width="18" height="14" rx="2" fill="#f59e0b" />
      <rect x="22" y="16" width="14" height="13" rx="2" fill="#fbbf24" />
      <path d="M20 33 H38 M27 16 V29 M29 28 H38" stroke="#b45309" strokeWidth="1.4" />

      {/* Loupe */}
      <circle cx="42" cy="24" r="9" fill="#ffffff" stroke="#374151" strokeWidth="2.4" />
      <path
        d="M49 31 L56 38"
        stroke="#374151"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
