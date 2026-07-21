import { datadogRum } from "@datadog/browser-rum";

let initialized = false;

export function initDatadog() {
  if (initialized || typeof window === "undefined") return;

  const applicationId = import.meta.env.VITE_DATADOG_APPLICATION_ID;
  const clientToken = import.meta.env.VITE_DATADOG_CLIENT_TOKEN;
  const site = import.meta.env.VITE_DATADOG_SITE;

  if (!applicationId || !clientToken || !site) return;

  datadogRum.init({
    applicationId,
    clientToken,
    site,
    service: "portfolio",
    env: "production",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
  });

  datadogRum.startSessionReplayRecording();
  initialized = true;
}
