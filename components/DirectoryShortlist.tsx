"use client";

import { Check, GitCompareArrows, ListPlus, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ShortlistItem = {
  id: string;
  name: string;
  bestFor: string;
  details: string;
};

const maximumItems = 3;

function cleanText(value?: string | null) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function readCard(card: HTMLElement): ShortlistItem | null {
  const name = cleanText(card.querySelector("h3")?.textContent);
  if (!name) return null;
  const bestFor = cleanText(card.querySelector(".bc-best, .bc-best-fit")?.textContent).replace(/^Best for\s*/i, "");
  const meta = Array.from(card.querySelectorAll(".bc-company-meta div, .bc-details dl div"))
    .slice(0, 3)
    .map((item) => {
      const label = cleanText(item.querySelector("dt")?.textContent);
      const value = cleanText(item.querySelector("dd")?.textContent);
      return label && value ? `${label}: ${value}` : cleanText(item.textContent);
    })
    .filter(Boolean)
    .join(" · ");
  const description = cleanText(card.querySelector(".bc-desc, [itemprop='description']")?.textContent);
  return {
    id: card.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    bestFor: bestFor || description || "Review provider fit against your requirements.",
    details: meta || description || "Confirm services, jurisdictions, integrations and commercial terms directly."
  };
}

export function DirectoryShortlist() {
  const pathname = usePathname();
  const [items, setItems] = useState<ShortlistItem[]>([]);
  const [open, setOpen] = useState(false);
  const storageKey = `fluidrwa.shortlist:${pathname}`;
  const isDirectory = pathname.startsWith("/vendors/");

  useEffect(() => {
    if (!isDirectory) return;
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) setItems(saved.slice(0, maximumItems));
    } catch {
      sessionStorage.removeItem(storageKey);
    }
  }, [isDirectory, storageKey]);

  useEffect(() => {
    if (!isDirectory) return;
    sessionStorage.setItem(storageKey, JSON.stringify(items));
  }, [isDirectory, items, storageKey]);

  useEffect(() => {
    if (!isDirectory) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".bc-company-card"));
    if (cards.length < 2) return;
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const item = readCard(card);
      if (!item || card.querySelector("[data-shortlist-toggle]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "directory-shortlist-toggle";
      button.dataset.shortlistToggle = item.id;
      button.setAttribute("aria-pressed", "false");
      button.textContent = "Shortlist";
      const handleClick = () => {
        setItems((current) => {
          const exists = current.some((entry) => entry.id === item.id);
          if (exists) {
            window.fluidRwaTrackEvent?.("directory_shortlist_remove", { vendor_name: item.name, directory_path: pathname });
            return current.filter((entry) => entry.id !== item.id);
          }
          if (current.length >= maximumItems) {
            setOpen(true);
            return current;
          }
          window.fluidRwaTrackEvent?.("directory_shortlist_add", { vendor_name: item.name, directory_path: pathname });
          return [...current, item];
        });
      };
      button.addEventListener("click", handleClick);
      let actions = card.querySelector(".bc-company-actions, .vendor-card-actions");
      if (!actions) {
        actions = document.createElement("div");
        actions.className = "vendor-card-actions";
        card.appendChild(actions);
      }
      actions.appendChild(button);
      cleanups.push(() => {
        button.removeEventListener("click", handleClick);
        button.remove();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [isDirectory, pathname]);

  useEffect(() => {
    document.querySelectorAll<HTMLButtonElement>("[data-shortlist-toggle]").forEach((button) => {
      const selected = items.some((item) => item.id === button.dataset.shortlistToggle);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      button.textContent = selected ? "Shortlisted" : "Shortlist";
    });
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.classList.add("has-directory-shortlist");
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("has-directory-shortlist");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const projectHref = useMemo(() => {
    const category = pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "Vendor shortlist";
    const params = new URLSearchParams({
      category,
      source: "directory-shortlist",
      shortlist: items.map((item) => item.name).join(", ")
    });
    return `/submit-requirement?${params.toString()}`;
  }, [items]);

  if (!isDirectory || items.length === 0) return null;

  return (
    <>
      <aside className="directory-shortlist-bar" aria-label="Provider shortlist">
        <span className="directory-shortlist-count"><ListPlus aria-hidden="true" size={18} /> {items.length} of {maximumItems} shortlisted</span>
        <div>
          <button type="button" className="directory-shortlist-clear" onClick={() => setItems([])}><Trash2 aria-hidden="true" size={16} /> Clear</button>
          <button type="button" className="directory-shortlist-review" onClick={() => {
            setOpen(true);
            window.fluidRwaTrackEvent?.("directory_shortlist_open", { shortlist_count: items.length, directory_path: pathname });
          }}><GitCompareArrows aria-hidden="true" size={17} /> Compare</button>
        </div>
      </aside>

      {open ? (
        <div className="directory-shortlist-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section className="directory-shortlist-dialog" role="dialog" aria-modal="true" aria-labelledby="directory-shortlist-title">
            <button className="directory-shortlist-close" type="button" aria-label="Close shortlist comparison" onClick={() => setOpen(false)}><X aria-hidden="true" size={20} /></button>
            <p className="directory-shortlist-kicker">Your research shortlist</p>
            <h2 id="directory-shortlist-title">Compare provider fit</h2>
            <p className="directory-shortlist-intro">Use this as a starting point, then confirm evidence, coverage, integrations and commercial terms directly.</p>
            <div className="directory-shortlist-table-wrap">
              <table className="directory-shortlist-table">
                <thead><tr><th>Provider</th><th>Best fit</th><th>Details to verify</th><th><span className="sr-only">Remove</span></th></tr></thead>
                <tbody>{items.map((item) => (
                  <tr key={item.id}>
                    <th scope="row"><Check aria-hidden="true" size={16} /> {item.name}</th>
                    <td data-label="Best fit">{item.bestFor}</td>
                    <td data-label="Details to verify">{item.details}</td>
                    <td><button type="button" aria-label={`Remove ${item.name} from shortlist`} onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}><X aria-hidden="true" size={17} /></button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {items.length < 2 ? <p className="directory-shortlist-hint">Add another provider for a more useful comparison.</p> : null}
            <div className="directory-shortlist-actions">
              <button type="button" onClick={() => setOpen(false)}>Keep researching</button>
              <a href={projectHref} onClick={() => window.fluidRwaTrackEvent?.("directory_shortlist_submit_intent", { shortlist_count: items.length, directory_path: pathname })}>Get shortlist guidance</a>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
