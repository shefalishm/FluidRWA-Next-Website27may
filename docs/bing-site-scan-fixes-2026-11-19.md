# Bing Site Scan fixes: November 19, 2026

## Exact scan scope

Scan `80046c4b-6f38-4324-a741-8d753c4a5562`, named `19th Nov`, scanned 1,000 URLs. It reported four HTTP errors and 193 warnings, not 193 HTTP errors.

- 189 title warnings: 163 distinct paths, including 27 query variants of the readiness tool. The unchanged Bing title URL export is stored alongside this report.
- Three image-alt warnings: homepage, /news, and /vendors/smart-contract-development-companies.
- One HTML-size warning: /web3vendorecosystem. Bing describes a soft limit of 1 MB.

## Corrections

1. Replaced internal links to the four missing category slugs in article sources, generated article HTML and use-case records. Added permanent redirects for existing crawled URLs and backlinks to the relevant DeFi, security, custody and institutional-trading directories. No redirect to the homepage and no new thin placeholder pages.
2. Added reviewed concise search titles only where the article title itself exceeded the limit; omitted the brand suffix where needed. Article headings, body copy, publication/review dates and evidence scope remain unchanged. The metadata routes and future blog generator consume the shared reviewed titles.
3. Shortened readiness-tool metadata, including its query variants. Existing clean canonical is preserved; attribution parameters are not discarded by redirects.
4. Added identifying alt text to Alchemy, Anchorage Digital, Alloy, Frax and Minddeft logos. News thumbnails are labelled as illustrations accompanying their headlines; the labels do not invent visual details.
5. Moved the unchanged 835-record vendor search index into a separate static JSON asset. Server-rendered vendor cards, category links and company-profile links remain in the HTML. Search shows a loading message while the index loads, updates the current query afterward, and provides a fallback message if loading fails. Generator output and asset parity checks guard against stale data.

## Verification

- Production build passed; all 189 reported title URLs resolve to generated titles shorter than 70 characters, with canonicals intact.
- Generated vendor-directory HTML fell from 2,047,781 bytes to 983,809 bytes. A deployed revision attribute can change this by a small number of bytes.
- All original 835 search-index rows are preserved. Browser checks found 10T Holdings, which is available through the full index rather than the server-rendered cards, and retained company-profile search for Chainstack.
- Four local permanent redirects returned 308 and their destinations returned 200.
- Buyer-route, search ranking, external-index failure handling and source checks accompany the release.

## Recheck

The old Bing report is a historical snapshot and will not clear merely because a deployment succeeds. Start a fresh scan after production checks, then compare the new result. These corrections do not establish the cause of the separate November AI-citation decline or guarantee ranking/citation recovery.
