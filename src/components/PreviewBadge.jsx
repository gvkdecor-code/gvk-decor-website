import version from "../../preview-version.json";
export default function PreviewBadge() {
  if (!import.meta.env.DEV) return null;
  return (
    <div
      className="preview-badge"
      aria-label={`Private preview version ${version.revision}`}
    >
      {version.revision}
      <span>PRIVATE PREVIEW</span>
    </div>
  );
}
