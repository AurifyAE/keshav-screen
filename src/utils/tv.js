export function isLikelyAndroidTV() {
  if (typeof navigator === "undefined") return false;
  const ua = (navigator.userAgent || "").toLowerCase();

  // Common Android TV / Fire TV identifiers
  if (ua.includes("android") && (ua.includes("tv") || ua.includes("aft"))) {
    return true;
  }

  // Some SmartTV browsers expose this token
  if (ua.includes("smarttv") || ua.includes("smart-tv")) return true;

  return false;
}

