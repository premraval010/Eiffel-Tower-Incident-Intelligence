# The Eiffel Tower Incident

**BAPS, SETE and the Reputational Intelligence Brief**

An independent, evidence-led analysis of the 5 September 2026 Eiffel Tower controversy in Paris:
what is established, what is disputed, what remains unknown, and how the story is being framed
across French, Indian, Gujarati and Hindi media.

Live: https://eiffel-tower-incident-intelligence.vercel.app

## What is in here

| File | Purpose |
|---|---|
| `index.html` | The full interactive brief. 13 sections, self-contained, no framework. |
| `eiffel-tower-incident-briefing.pdf` | Multi-page visual summary for circulation. |
| `og-image.png` | 1200x630 social share card. Tricolour Eiffel Tower cover photo (L. de Cockborne / bobostudio, credit intact). |
| `favicon.svg` | Site icon. |
| `scripts/stamp-updated.mjs` | Build step that stamps the deploy time into the "last updated" fields. |
| `vercel.json`, `robots.txt`, `sitemap.xml` | Deployment and indexing. |

## Sections

1. Dashboard — risk bands with stated methodology
2. Timeline — 3 to 11 September, each entry sourced
3. Narrative Comparison — both cases, scored by evidentiary strength
4. Known vs Unknown — 24 material facts, coded
5. Central Question — four distinctions that decide the matter
6. Claim Verification — 22 claims, filterable and sortable
7. Media & Framing — origination analysis plus Indian-language coverage
8. Sentiment & Stakeholders
9. Voices & Stances — 27 named figures across four countries, each linked
10. Diaspora & Backlash — how the story widened after 9 September
11. Language & Sentiment — term-frequency analysis of the two vocabularies
12. Contradictions & Risk
13. Sources — every claim traced to origin

## Standing of this document

Independent analysis compiled from public reporting. **Not commissioned, funded, reviewed or
endorsed by BAPS, SETE, any union, authority, media organisation or third party.** No party to
the matter was contacted, and no party has seen it. It contains no legal advice.

It is not a defence document. Where the evidence is unfavourable it says so, and where critics
have overstated things it says that too. Anyone circulating it should present it as a reading of
the public record, not as an authoritative account.

## Method

- Every material claim traces to a named, linked source. 180+ links.
- Reliability scale: 5 primary evidence, 4 official statement or direct interview,
  3 multiple independent reports, 2 single report, 1 social claim, 0 unsupported.
- Repetition is not corroboration. Wire republication is counted once, not once per outlet.
- Sentiment figures are analyst-coded source counts, **not survey data**, and must not be
  presented as measurements of public opinion.
- Where evidence is absent, that is stated rather than filled.

## Updating

`index.html` is a single self-contained file. No framework, no dependencies beyond Google Fonts.
Edit and redeploy.

The **"last updated" date is stamped automatically at deploy time.** On every Vercel build,
`scripts/stamp-updated.mjs` fills the four UI stamps (masthead, sidebar, mobile bar, PDF link)
and the two SEO fields (`article:modified_time`, JSON-LD `dateModified`) with the current time in
IST and CEST. It only rewrites the text between `<!--U:type-->…<!--/U-->` markers and the two date
attributes, so the analysis body — including the editorial "as of 11 September" cut-off claims —
is never touched. The step is fail-safe: any error is swallowed so a deploy can never break on it.

The date in the committed file is just a placeholder; the deployed page always shows the real
deploy time.
