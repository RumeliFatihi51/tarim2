# AgroMax / Cinematic 2.0 — production bible

## Audit
The previous release has an adequate static architecture (11 prerendered routes, content registers, root Vercel deployment), but its art direction is too repetitive: large italic second lines, the same Tuscany photo across most pages, thin/flat mineral discs, and a Filiz still manipulated with CSS. SVG drawing and image scaling do not constitute the requested cinematic production. There is no actual video. Navigation is functional but visually incidental. These are the redesign targets; content truthfulness and static page access remain intact.

## Eight concepts explored before implementation
| Concept / product idea | Metaphor and camera | Geometry / materials / lighting | Scroll and format | Mobile / cost / assessment |
|---|---|---|---|---|
| 01 Terrain as an instrument / observation | A macro camera glides over sculpted agricultural relief, revealing a bronze observation arc | Detailed displaced terrain, cultivated lines, limestone/soil, raking warm sunlight | Actual Blender camera sequence + WebGL observation ribbon; reversible native scroll | Cropped MP4/WebM and poster; medium 1–3 MB. Selected as signature: strongly tied to place rather than generic tech |
| 02 Context loom / Filiz | Independent porcelain ribbons approach and weave into a coherent aperture, camera arcs through its open centre | Bespoke continuous surfaces, olive glass, porcelain, bronze edge, moving key light | Blender transform/material/camera animation, looped video, scroll-controlled 3D counterpart | Mobile encoded video, no WebGL requirement; medium. Selected: tangible orchestration without a chatbot avatar |
| 03 Light through evidence / traceability | Camera passes through aligned optical apertures as reflected light travels between them | Mineral ribs, optical glass, restrained caustic-like highlights | Camera dolly and light choreography, video | Poster for reduced motion; medium. Selected for Platform with a different architectural rhythm |
| 04 Spectral prism garden / spectral sources | Light splits through a family of physically separated mineral fins | Original curved fins with roughness/transmission differences; controlled studio lighting | Real geometry, scroll reverses separation and camera progression | Poster fallback; GPU budget <1.5 DPR. Selected as technology real-time scene |
| 05 Temporal textile / time | Woven terrain changes material response without inventing dates | Continuous UV surface with two natural mineral palettes | Material interpolation, fixed-reference camera; shader | Reduced-motion static midpoint; medium. Reserve: must not suggest real seasonal measurements |
| 06 Observation horizon / perspective | Low horizon opens from haze into a wide land composition | High-quality authored landscape imagery, CGI relief and volumetric depth | Video/CGI hybrid with spatial typography | Separate portrait crop; low–medium. Selected for home editorial composition |
| 07 Seed archive / solutions | A physical archive of organic impressions, each tied to a professional question | Deep relief, warm plaster, soil and imprint details | Editorial cuts rather than endless 3D | Static authored crops; low. Selected as solutions art direction |
| 08 Living wordmark / brand | AgroMax letterforms emerge from the same contour rhythm as the land | Custom contour paths and offset engraved forms | Geometry and type choreography linked to scene progress | Static typographic signature; low. Selected for navigation/footer, without a long intro |

## Selected storyboard
Home: immediate full-bleed authored terrain poster → slowly rendered camera flight → editorial observation thesis → sculptural interactive signature (native reversible scroll) → Filiz context film → typographic closing.
Platform: large split typography → evidence-aperture camera film → six-step story recast as editorial rail → existing truthful product content.
Technology: asymmetrical scientific title + interactive optical mineral scene → source catalogue and quality distinctions.
Filiz: immersive porcelain/glass moving sculpture, oversized upright title rather than repeated italic heading → four context dimensions → evidence limits.
Solutions: full-width field artwork with large numbered professional questions; no customer assertions.
About: manifesto typography with narrow landscape strip and engraved brand gesture.
Contact: warm, spacious typographic composition with honest channel status, no fake form.

## Reference limitations
Reference URLs were opened again. Vertex3D and Edolus returned no readable HTML through the text browser. Live visual/browser inspection is recorded separately; no claim to having inspected their motion follows from the text fetch. Sleep Well exposes a multi-chapter structure; only rhythm, expressive scale and scene continuity inform this work. No competitor asset or code is copied.

## Production truth
The new landscape imagery is generated conceptual art, not an AgroMax satellite observation. Blender sequences are actual frame renders, not still photographs moved with CSS. Encoding, frame count, dimensions and scene sources are recorded after generation. Render limits and any unfinished production will be reported explicitly.

## Final production selection (supersedes the exploratory storyboard)

| Concept | Actual implementation |
|---|---|
| 01 Terrain instrument | Replaced as the 3D signature by the stronger sculptural Context Loom. Terrain remains original generated conceptual artwork; no terrain-flight video is claimed. |
| 02 Context / Filiz | Real camera, object and lighting animation in `filiz-motion-v2.blend`; separate portrait and landscape encoded films. |
| 03 Evidence apertures | Not selected for a new film. The pre-existing authored evidence still remains in the platform content; it is not reported as new animated production. |
| 04 Spectral / information material | New 9-surface Context Loom geometry, real GLB camera/layer/light progression and rendered film. Technology uses the existing mineral mesh with a revised real-time camera, separation and lighting sequence. |
| 05 Temporal textile | Reserved; no date-based simulation or fake seasonal movie added. |
| 06 Observation horizon | Generated terrain artwork, immersive opening typography and an actual CGI film inset. The image itself is not called a video. |
| 07 Seed/material archive | Original generated physical material artwork in Solutions, closing composition and navigation. |
| 08 Signature identity | New contour-A mark, full desktop/mobile exploration menu, new typography and closing wordmark treatment; no 3D lettering video claimed. |

### Actual page storyboards
Home: immersive terrain artwork and moving CGI inset → contextual thesis → sticky real-time Context Loom (or rendered film fallback) → Filiz camera film → editorial principles → material archive closing.
Platform: new landscape framing → six truthful workflow concepts → rendered Context Loom material/camera film → existing evidence artwork and future vision.
Technology: asymmetric opening with actual real-time mineral geometry and moving light/camera → curated source rows → method catalogue and scientific limits.
Filiz: upright oversized identity and dedicated real camera film with independently moving ribbons → context and reliability → planned status.
Other pages: their own typographic scale and crops, authored material/terrain artwork, no forced 3D or fictitious company content.

## Implementation review
React review covered client-only media effects, SSR-safe first render, lazy heavy imports, paused/reduced-motion media state, native anchor navigation, cleanup of IntersectionObservers/event listeners/GPU resources, and focus trapping/return in the exploration menu. No frontend library was added for a decorative feature. The enlarged glyphs are actual editable text, not rasterized headlines. Critical image decoding and page-specific preload choices were updated; hidden navigation art is lazy.

Native browser view transitions provide the page masks/short entrance without intercepting navigation. CSS sticky is limited to the signature study, not an enforced site-wide story. Desktop menu remains optional alongside direct page links; mobile gives all seven destinations immediately.
