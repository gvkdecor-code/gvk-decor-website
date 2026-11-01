# Drive access: checked before media selection

All 14 supplied folder URLs were previously requested through the environment's configured
HTTPS proxy. Every request failed with `Tunnel connection failed: 403 Forbidden`.
This is an environment egress-policy denial, **not proof of a Drive permission
problem**. No filenames, photos, clips, file counts, metadata or downloads were
visible. No Drive media has been reviewed or ranked. The individual folder results
are recorded in drive-access-check.json.

Folders checked: April 2024; August 2023; Behind the scenes — raw footage 1;
December 2023; February 2024; January 2024; July 2024; May 2024; November 2023;
Photos — part 2; Raw footage 2; photos 1; September 2024; SM CONTENT.

A proposed `drive.google.com` network allowance was saved in the cloud environment
configuration draft. It is not yet an applied access change. Applying/publishing
that environment configuration is separate from publicly deploying this website.
Folder permissions and any additional download hostnames can only be checked
after the first request reaches Drive successfully.

## If uploading instead

Exact filenames cannot be requested because folder contents are inaccessible.
Please keep original filenames and start with these specific groups:

1. **Behind the scenes — raw footage 1** and **Raw footage 2**: original clips
   showing curtains moving, textiles, artisan hands, stitching, embroidery and
   room reveals. For large clips, provide short, high-quality excerpts with their
   source filename and time range; do not send heavily recompressed WhatsApp copies.
2. **SM CONTENT**: landscape room-reveal videos without baked-in social text or
   music, if present. Do not assume this folder contains those clips without checking.
3. **photos 1 / Photos — part 2**: original full-resolution landscape room photographs
   and matching textile details, grouped by project.
4. Monthly project folders: folder listings or contact sheets first, then the
   corresponding original photographs and clips. These let us identify exact
   filenames without pretending to have seen them already.
5. For any chosen project: approved name, location, furnishing scope, photographer
   and designer credits, and permission to publish. No project identity is invented.

The current opening is an animated **still-image sequence** using reviewed imagery
from the supplied pitch deck. It is not described as authentic motion footage.
The actual project-film requirement remains open until source clips can be reviewed.

## Atelier 05 access recheck

The current enforced policy still does not include drive.google.com, and a fresh
request to the supplied photos 1 folder returned the same proxy 403. No connected
Drive import tool is available in this session. File attachments (individual
originals or a ZIP per project) remain the supported import method. No new media
review is claimed from that failed request.
