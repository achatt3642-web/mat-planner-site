const repo = "achatt3642-web/mat-planner-site";
const releasesPage = `https://github.com/${repo}/releases`;

const releaseStatusEl = document.getElementById("releaseStatus");
const lastUpdatedEl = document.getElementById("lastUpdated");

const macLinkEl = document.getElementById("macDownload");
const windowsLinkEl = document.getElementById("windowsDownload");
const macMetaEl = document.getElementById("macMeta");
const windowsMetaEl = document.getElementById("windowsMeta");

function pickAsset(assets, includeWords) {
  const lowered = includeWords.map((word) => word.toLowerCase());
  return assets.find((asset) => {
    const name = asset.name.toLowerCase();
    return lowered.some((word) => name.includes(word));
  });
}

function formatBytes(size) {
  if (!size || size <= 0) return "size unavailable";
  const units = ["B", "KB", "MB", "GB"];
  let idx = 0;
  let value = size;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[idx]}`;
}

function wireAsset(linkEl, metaEl, asset, fallbackText) {
  if (!asset) {
    linkEl.href = releasesPage;
    metaEl.textContent = fallbackText;
    return;
  }

  linkEl.href = asset.browser_download_url;
  metaEl.textContent = `${asset.name} | ${formatBytes(asset.size)}`;
}

async function loadLatestRelease() {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { "Accept": "application/vnd.github+json" },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const release = await res.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];

    releaseStatusEl.textContent = `Latest release: ${release.name || release.tag_name || "unlabeled"}`;

    const macAsset = pickAsset(assets, ["mac", "darwin", ".dmg", ".pkg"]);
    const windowsAsset = pickAsset(assets, ["windows", "win", ".exe", ".msi"]);

    wireAsset(macLinkEl, macMetaEl, macAsset, "Installer not detected. Open full releases page.");
    wireAsset(windowsLinkEl, windowsMetaEl, windowsAsset, "Installer not detected. Open full releases page.");

    const published = release.published_at ? new Date(release.published_at) : null;
    if (published) {
      lastUpdatedEl.textContent = `Last updated: ${published.toLocaleString()}`;
    } else {
      lastUpdatedEl.textContent = "Last updated: release timestamp unavailable";
    }
  } catch (err) {
    releaseStatusEl.textContent = "Release metadata unavailable. Use the full releases page.";
    macLinkEl.href = releasesPage;
    windowsLinkEl.href = releasesPage;
    macMetaEl.textContent = "Open releases page";
    windowsMetaEl.textContent = "Open releases page";
    lastUpdatedEl.textContent = "Last updated: metadata check failed";
  }
}

loadLatestRelease();
