"use client";

import { CSSProperties } from "react";
import { ScenarioOption } from "@/models/scenario";

type ScenarioSelectorModalProps = {
  isOpen: boolean;
  options: ScenarioOption[];
  onSelect: (option: ScenarioOption | null) => void;
  onClose?: () => void;
  allowNoScenario?: boolean;
  noScenarioLabel?: string;
  title?: string;
  description?: string;
};

const ScenarioSelectorModal = ({
  isOpen,
  options,
  onSelect,
  onClose,
  allowNoScenario = false,
  noScenarioLabel = "シナリオなしで始める",
  title = "シナリオを選択",
  description = "練習したいシナリオを選んでください。",
}: ScenarioSelectorModalProps) => {
  if (!isOpen) return null;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  };

  const modalStyle: CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    width: "min(640px, 100%)",
    padding: "28px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  const buttonBaseStyle: CSSProperties = {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div style={modalStyle} onClick={(event) => event.stopPropagation()}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111827" }}>{title}</h2>
          {description && <p style={{ margin: 0, color: "#4b5563", fontSize: "14px", lineHeight: 1.6 }}>{description}</p>}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              style={buttonBaseStyle}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#eef2ff";
                event.currentTarget.style.borderColor = "#c7d2fe";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "#f9fafb";
                event.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <span style={{ fontWeight: 700, color: "#111827", fontSize: "15px" }}>{option.title}</span>
              {option.description && <span style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5 }}>{option.description}</span>}
            </button>
          ))}

          {allowNoScenario && (
            <button
              type="button"
              onClick={() => onSelect(null)}
              style={{ ...buttonBaseStyle, backgroundColor: "#f3f4f6" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#e5e7eb";
                event.currentTarget.style.borderColor = "#d1d5db";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "#f3f4f6";
                event.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <span style={{ fontWeight: 700, color: "#1f2937", fontSize: "15px" }}>{noScenarioLabel}</span>
              <span style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5 }}>シナリオを使わず自由に練習します。</span>
            </button>
          )}
        </div>

        {onClose && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                border: "none",
                backgroundColor: "#e5e7eb",
                color: "#1f2937",
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "#d1d5db";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioSelectorModal;
