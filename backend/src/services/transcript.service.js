import ResponseError from "../middleware/error-handler.js";

export async function fetchParamsTranscript(videoId) {
  try {
    const response = await fetch(
      "https://www.youtube.com/youtubei/v1/next?prettyPrint=false",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          Pragma: "no-cache",
          Priority: "u=1, i",
          "Sec-CH-UA": `"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"`,
          "Sec-CH-UA-Arch": `"x86"`,
          "Sec-CH-UA-Bitness": `"64"`,
          "Sec-CH-UA-Form-Factors": `"Desktop"`,
          "Sec-CH-UA-Full-Version": `"141.0.7390.123"`,
          "Sec-CH-UA-Full-Version-List": `"Google Chrome";v="141.0.7390.123", "Not?A_Brand";v="8.0.0.0", "Chromium";v="141.0.7390.123"`,
          "Sec-CH-UA-Mobile": "?0",
          "Sec-CH-UA-Model": `""`,
          "Sec-CH-UA-Platform": `"Windows"`,
          "Sec-CH-UA-Platform-Version": `"19.0.0"`,
          "Sec-CH-UA-Wow64": "?0",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "same-origin",
          "Sec-Fetch-Site": "same-origin",

          // Custom YouTube headers
          "X-Browser-Channel": "stable",
          "X-Browser-Copyright":
            "Copyright 2025 Google LLC. All rights reserved.",
          "X-Browser-Validation": "AGaxImjg97xQkd0h3geRTArJi8Y=",
          "X-Browser-Year": "2025",
          "X-Goog-Visitor-Id":
            "CgtiR0puankzY3VnQSi67pPIBjIKCgJJRBIEGgAgJw%3D%3D",
          "X-YouTube-Bootstrap-Logged-In": "false",
          "X-YouTube-Client-Name": "1",
          "X-YouTube-Client-Version": "2.20251030.01.00",

          // Session cookies (⚠️ sesuaikan dengan cookie aktif milikmu)
          cookie: [
            "YSC=Bt_-Us8q2HI",
            "VISITOR_INFO1_LIVE=bGJnjy3cugA",
            "VISITOR_PRIVACY_METADATA=CgJJRBIEGgAgJw%3D%3D",
            "__Secure-ROLLOUT_TOKEN=CMS-8NiD4qqhmwEQ-eCBgMfOkAMYvJO5gcfOkAM%3D",
            "PREF=f6=40000000&tz=Asia.Jakarta&f7=100",
            "GPS=1",
          ].join("; "),

          Referer: `https://www.youtube.com/watch?v=${videoId}`,
        },

        // Request body in JSON format
        body: JSON.stringify({
          context: {
            client: {
              hl: "en",
              gl: "ID",
              remoteHost: "114.10.76.137",
              visitorData: "CgtiR0puankzY3VnQSi67pPIBjIKCgJJRBIEGgAgJw%3D%3D",
              userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36,gzip(gfe)",
              clientName: "WEB",
              clientVersion: "2.20251030.01.00",
              osName: "Windows",
              osVersion: "10.0",
              platform: "DESKTOP",
              clientFormFactor: "UNKNOWN_FORM_FACTOR",
              mainAppWebInfo: {
                graftUrl: "/watch?v=7Q17ubqLfaM",
              },
            },
            user: {
              lockedSafetyMode: false,
            },
            request: {
              useSsl: true,
            },
            clickTracking: {
              clickTrackingParams:
                "CPYBENTEDBgEIhMI-deEq4DPkAMV0wCDAx0dQzCRMgdyZWxhdGVkSOCR3bHazqXf4gGaAQUIARD4HcoBBNTlIaU=",
            },
          },
          videoId: videoId,
          racyCheckOk: false,
          contentCheckOk: false,
          captionsRequested: false,
        }),
      }
    );

    if (!response.ok) throw new ResponseError(400, "Failed to fetch params");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

export function extractParamsTranscript(json) {
  let data = json;
  if (typeof json === "string") {
    try {
      data = JSON.parse(json);
    } catch (err) {
      throw new Error(
        "Invalid JSON string provided to extractTranscriptParamsFromJson"
      );
    }
  }

  let found = "";
  function recurse(obj) {
    if (!obj || typeof obj !== "object") return;
    if (Object.prototype.hasOwnProperty.call(obj, "getTranscriptEndpoint")) {
      const g = obj.getTranscriptEndpoint;
      if (
        g &&
        typeof g === "object" &&
        Object.prototype.hasOwnProperty.call(g, "params")
      ) {
        found = g.params;
      }
    }
    for (const k of Object.keys(obj)) {
      try {
        recurse(obj[k]);
      } catch (e) {
        // ignore deep traversal errors
      }
    }
  }

  recurse(data);
  return found;
}

export async function fetchYoutubeTranscript(videoId, paramsId) {
  const url =
    "https://www.youtube.com/youtubei/v1/get_transcript?prettyPrint=false";

  const headers = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    pragma: "no-cache",
    "x-youtube-client-name": "1",
    "x-youtube-client-version": "2.20251030.01.00",
    "x-youtube-bootstrap-logged-in": "false",
    "x-goog-visitor-id": "CgtiR0puankzY3VnQSjj4pPIBjIKCgJJRBIEGgAgJw%3D%3D",
    cookie:
      "YSC=Bt_-Us8q2HI; VISITOR_INFO1_LIVE=bGJnjy3cugA; VISITOR_PRIVACY_METADATA=CgJJRBIEGgAgJw%3D%3D; PREF=f6=40000000&tz=Asia.Jakarta&f7=100;",
    Referer: `https://www.youtube.com/watch?v=${videoId}`,
  };

  const body = {
    context: {
      client: {
        hl: "en",
        gl: "ID",
        clientName: "WEB",
        clientVersion: "2.20251030.01.00",
        osName: "Windows",
        osVersion: "10.0",
        platform: "DESKTOP",
        browserName: "Chrome",
        browserVersion: "141.0.0.0",
        timeZone: "Asia/Jakarta",
        utcOffsetMinutes: 420,
      },
    },
    params: paramsId,
    externalVideoId: videoId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw new ResponseError(400, "Failed to fetch transcript");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

export function extractTranscriptText(data) {
  const texts = [];

  const segments =
    data?.actions?.[0]?.updateEngagementPanelAction?.content?.transcriptRenderer
      ?.content?.transcriptSearchPanelRenderer?.body
      ?.transcriptSegmentListRenderer?.initialSegments;

  if (!Array.isArray(segments)) {
    throw new ResponseError(400, "No transcript segments found");
  }

  for (const segment of segments) {
    const runs = segment?.transcriptSegmentRenderer?.snippet?.runs || [];

    for (const run of runs) {
      if (run?.text) texts.push(run.text);
    }
  }

  return texts.join(" ");
}

export function getVideoIdFromUrl(url) {
  const pattern =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(pattern);
  if (!match) throw new ResponseError(400, "Invalid youtube video URL");
  return match[1];
}

export function promptSummarization(transcript) {
  const prompt = `
  Ringkasan 3–5 paragraf singkat yang menjelaskan konteks video, ide utama, serta kesimpulan.
  Gunakan bahasa yang padat, jelas, dan informatif dengan template ringkasan dibawah ini.

  - [Poin penting #1]
  - [Poin penting #2]
  - [Poin penting #3]
  - [Tambahkan jika perlu]

  1. [Pesan inti atau pelajaran utama #1]
  2. [Pesan inti atau pelajaran utama #2]
  3. [Pesan inti atau pelajaran utama #3]

  [3–5 kata kunci penting dari isi video]

  Berikut adalah transcriptnya ${transcript}`;
  return prompt;
}
