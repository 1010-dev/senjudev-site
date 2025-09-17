import { createRoute } from "honox/factory";

export const POST = createRoute(async (c) => {
  try {
    const { gistId, markers } = await c.req.json();

    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "senjudev-map-app",
      },
      body: JSON.stringify({
        files: {
          "adachi-markers.json": {
            content: JSON.stringify(markers, null, 2),
          },
        },
      }),
    });

    if (response.ok) {
      return c.json({ success: true }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      const errorText = await response.text();
      console.error("GitHub API Error:", response.status, errorText);
      return c.json({
        success: false,
        error: `GitHub API returned ${response.status}`
      }, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});

export const OPTIONS = createRoute(async (c) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
});