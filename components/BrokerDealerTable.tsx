"use client";

import { useEffect } from "react";

export function BrokerDealerTable() {
  useEffect(() => {
    const filters = document.querySelector<HTMLElement>("[data-bd-filters]");
    const table = document.querySelector<HTMLTableElement>("[data-bd-table]");
    const count = document.querySelector<HTMLElement>("[data-bd-count]");
    const reset = document.querySelector<HTMLButtonElement>("[data-bd-reset]");
    const search = document.querySelector<HTMLInputElement>("[data-bd-search]");
    if (!filters || !table || !count || !reset || !search) return;

    const rows = [...table.querySelectorAll<HTMLTableRowElement>("tbody tr")];
    const selects = [...filters.querySelectorAll<HTMLSelectElement>("[data-bd-filter]")];
    const sortButtons = [...table.querySelectorAll<HTMLButtonElement>("[data-bd-sort]")];
    let sortDirection = 1;
    let sortKey = "";

    const apply = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;

      rows.forEach((row) => {
        const matchesSearch = !query || (row.dataset.search || "").includes(query);
        const matchesFilters = selects.every((select) => {
          const key = select.dataset.bdFilter || "";
          return !select.value || row.dataset[key] === select.value;
        });
        row.hidden = !(matchesSearch && matchesFilters);
        if (!row.hidden) visible += 1;
      });

      count.textContent = `Showing ${visible} ${visible === 1 ? "broker-dealer" : "broker-dealers"}`;
    };

    const sort = (key: string) => {
      sortDirection = sortKey === key ? sortDirection * -1 : 1;
      sortKey = key;
      rows
        .sort((a, b) => (a.dataset[key] || "").localeCompare(b.dataset[key] || "") * sortDirection)
        .forEach((row) => table.tBodies[0].appendChild(row));
    };

    search.addEventListener("input", apply);
    selects.forEach((select) => select.addEventListener("change", apply));
    sortButtons.forEach((button) => button.addEventListener("click", () => sort(button.dataset.bdSort || "")));
    reset.addEventListener("click", () => {
      search.value = "";
      selects.forEach((select) => (select.value = ""));
      apply();
    });

    return () => {
      search.removeEventListener("input", apply);
      selects.forEach((select) => select.removeEventListener("change", apply));
    };
  }, []);

  return null;
}
