"use client";

import { useEffect } from "react";

export function VentureCapitalFilters() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("[data-vc-filters]");
    const grid = document.querySelector<HTMLElement>("[data-vc-grid]");
    const count = document.querySelector<HTMLElement>("[data-vc-count]");
    const reset = document.querySelector<HTMLButtonElement>("[data-vc-reset]");
    const search = document.querySelector<HTMLInputElement>("[data-vc-search]");
    if (!shell || !grid || !count || !reset || !search) return;

    const cards = [...grid.querySelectorAll<HTMLElement>(".vc-firm-card")];
    const selects = [...shell.querySelectorAll<HTMLSelectElement>("[data-vc-filter]")];

    const apply = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const matchesSearch = !query || (card.dataset.search || "").includes(query);
        const matchesFilters = selects.every((select) => {
          const key = select.dataset.vcFilter || "";
          return !select.value || card.dataset[key] === select.value;
        });
        const show = matchesSearch && matchesFilters;
        card.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = `Showing ${visible} ${visible === 1 ? "firm" : "firms"}`;
    };

    search.addEventListener("input", apply);
    selects.forEach((select) => select.addEventListener("change", apply));
    reset.addEventListener("click", () => {
      search.value = "";
      selects.forEach((select) => {
        select.value = "";
      });
      apply();
    });

    return () => {
      search.removeEventListener("input", apply);
      selects.forEach((select) => select.removeEventListener("change", apply));
    };
  }, []);

  return null;
}
