"use client";

import { useEffect } from "react";

export function FamilyOfficeTable() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("[data-fo-filters]");
    const table = document.querySelector<HTMLTableElement>("[data-fo-table]");
    const count = document.querySelector<HTMLElement>("[data-fo-count]");
    const reset = document.querySelector<HTMLButtonElement>("[data-fo-reset]");
    const search = document.querySelector<HTMLInputElement>("[data-fo-search]");
    if (!shell || !table || !count || !reset || !search) return;

    const rows = [...table.querySelectorAll<HTMLTableRowElement>("tbody tr")];
    const selects = [...shell.querySelectorAll<HTMLSelectElement>("[data-fo-filter]")];
    const headers = [...table.querySelectorAll<HTMLButtonElement>("[data-fo-sort]")];
    let sortDirection = 1;
    let sortKey = "";

    const apply = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      rows.forEach((row) => {
        const matchesSearch = !query || (row.dataset.search || "").includes(query);
        const matchesFilters = selects.every((select) => {
          const key = select.dataset.foFilter || "";
          return !select.value || row.dataset[key] === select.value;
        });
        row.hidden = !(matchesSearch && matchesFilters);
        if (!row.hidden) visible += 1;
      });
      count.textContent = `Showing ${visible} ${visible === 1 ? "family office" : "family offices"}`;
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
    headers.forEach((button) => button.addEventListener("click", () => sort(button.dataset.foSort || "")));
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
