# Source content review

Migration source: `multiscale-lab.rar`. The main `index.php` is the primary source for visible content. Smaller separate PHP pages are retained verbatim in `source-reference/` because they contain conflicting or less complete text. No extra achievements, people, publication links, contact details or partnerships were invented.

## Items the client needs to confirm

| Item | Supplied value / problem | Action before public launch |
| --- | --- | --- |
| Lab head | `Dr. [Name] (Principal Investigator)` | Provide confirmed name and title |
| Phone | `+92-21-99261261-8 Ext: 2208` followed by `(or relevant extension)` | Confirm the extension |
| Email | `mmslab@neduet.edu.pk` | Confirm it is a working, authorized address |
| Award | Best Research Lab in Mechanical Engineering (2024) | The standalone achievements page calls this a placeholder; confirm or remove |
| Publications count | Over 50 papers | The standalone achievements page calls this a placeholder; confirm or remove |
| Grants | National and international research grants | Confirm wording/evidence; standalone page only says national grants |
| Open-source tools | Supplied on homepage | Supply the repository URL or confirm wording |
| Publication entries | Two titles, author names, journals and years | Confirm details and supply DOI/URLs |
| Dr. Tariq Jamil authors | Homepage says `Dr. Tariq Jamil et al.`; papers.php says `Dr. Tariq Jamil` | Homepage wording retained; confirm author list |
| Composite project | Homepage: `Composite Material Reinforcement`; projects.php: `Material Reinforcement Studies` | Homepage title and fuller description retained; confirm preferred wording |
| Projects | Three on homepage, two on standalone page | Homepage's three projects retained; confirm all are real/current |
| Client identities | Six image files with generic and sometimes conflicting alt text | Identify each organization and approve the relationship; client image 1 visually says KE but source alt text says Meekat International |
| Standalone client text | Company A, University B and an unnamed government agency | Preserved in source-reference, not presented as new factual partners |
| Downloads | All resource links use `#`; no PDF or equipment list files supplied | Upload real resources in Studio or enter working URLs |
| Social links | Website, Google Scholar, GitHub all use `#` | Supply real URLs; hidden until configured |
| Logo vs text spelling | Logo says “Modeling”; source headings say “Modelling” | Original logo pixels and original heading spelling retained |

## Original branding

The original PNG files are copied byte-for-byte. The source CSS defines dark blue `#00008B`, orange `#FF8C00`, light grey `#F8F9FA` and white. The logo's dominant coloured pixels are orange `#F7941D`, blue `#2E3192`, and purple-blue `#2A178D`; these remain unchanged in the original image. The new interface uses the source palette plus these original logo accents. The original gradient navigation has been replaced with white navigation and a dark blue university strip, keeping the same colours.

## Exact source preservation

The eight original PHP files and `styles.css` are retained in `source-reference/`. The frontend's eight original PNG files remain in `frontend-ui/public/images/`. Original Bootstrap libraries and maps are not runtime dependencies of the React version.

## Redesign changes

The source email and phone are now blank placeholders pending client confirmation. A new headline, conceptual scale explanation and resource descriptions are proposed editorial copy and should be reviewed in the client questionnaire. Page introductions and section headings are editable in Sanity. Publications now include fields for full authors, DOI, abstract and permitted PDF uploads; the source provides none of these missing details. Do not invent them to fill the interface.
