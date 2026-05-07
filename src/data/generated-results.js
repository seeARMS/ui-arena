export const generatedAt = "2026-05-07T03:21:16.690Z";
export const generatedModelSlots = [
  {
    "id": "gpt-5-5",
    "displayName": "GPT-5.5",
    "family": "OpenAI",
    "accent": "#e04f2f",
    "accentSoft": "#f7d9cd",
    "gatewayModel": "openai/gpt-5.5"
  },
  {
    "id": "claude-opus-4-6",
    "displayName": "Claude Opus 4.6",
    "family": "Anthropic",
    "accent": "#8b4f28",
    "accentSoft": "#eddacb",
    "gatewayModel": "anthropic/claude-opus-4.6"
  },
  {
    "id": "claude-opus-4-5",
    "displayName": "Claude Opus 4.5",
    "family": "Anthropic",
    "accent": "#5a4c8f",
    "accentSoft": "#dfd9f0",
    "gatewayModel": "anthropic/claude-opus-4.5"
  },
  {
    "id": "claude-sonnet-4-5",
    "displayName": "Claude Sonnet 4.5",
    "family": "Anthropic",
    "accent": "#0c8f83",
    "accentSoft": "#c9ebe4",
    "gatewayModel": "anthropic/claude-sonnet-4.5"
  },
  {
    "id": "gemini-3-1-pro-preview",
    "displayName": "Gemini 3.1 Pro Preview",
    "family": "Google",
    "accent": "#276fc2",
    "accentSoft": "#d5e4f7",
    "gatewayModel": "google/gemini-3.1-pro-preview"
  },
  {
    "id": "gemini-3-flash-preview",
    "displayName": "Gemini 3 Flash Preview",
    "family": "Google",
    "accent": "#c56b14",
    "accentSoft": "#f3dfc8",
    "gatewayModel": "google/gemini-3-flash-preview"
  },
  {
    "id": "grok-4-3",
    "displayName": "Grok 4.3",
    "family": "xAI",
    "accent": "#2d2a24",
    "accentSoft": "#dfd6c5",
    "gatewayModel": "x-ai/grok-4.3"
  },
  {
    "id": "gemini-3-1-flash-lite-preview",
    "displayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "accent": "#6b8f1f",
    "accentSoft": "#e0ebbf",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview"
  }
];
export const generatedResults = [
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z",
    "interfaceId": "pricing-ai-coding-assistant",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1778124062-fe1HXN2TUsJ1uZCOpuEr",
    "providerName": "Google AI Studio",
    "status": "complete",
    "createdAt": "2026-05-07T03:21:02.136Z",
    "completedAt": "2026-05-07T03:21:16.690Z",
    "execution": {
      "startedAt": "2026-05-07T03:21:02.136Z",
      "completedAt": "2026-05-07T03:21:16.690Z",
      "durationMs": 14553,
      "modelStartedAt": "2026-05-07T03:21:02.137Z",
      "modelCompletedAt": "2026-05-07T03:21:08.417Z",
      "modelDurationMs": 6280,
      "generationTimeMs": 5945,
      "latencyMs": 438
    },
    "usage": {
      "source": "openrouter:generation",
      "promptTokens": 673,
      "completionTokens": 1799,
      "totalTokens": 2655,
      "nativePromptTokens": 550,
      "nativeCompletionTokens": 2105,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.003295,
      "upstreamInferenceCost": 0.003295,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 550,
        "completion_tokens": 2105,
        "total_tokens": 2655,
        "cost": 0.003295,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.003295,
          "upstream_inference_prompt_cost": 0.0001375,
          "upstream_inference_completions_cost": 0.0031575
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "design-hygiene": {
        "id": "design-hygiene",
        "displayName": "Design Hygiene",
        "status": "complete",
        "version": "1.0.0",
        "completedAt": "2026-05-07T03:31:34.170Z",
        "durationMs": 1050,
        "scores": {
          "discipline": {
            "label": "Design hygiene",
            "score": 1,
            "value": 100,
            "displayValue": "100"
          }
        },
        "metrics": {
          "fontFamilyCount": 2,
          "fontSizeCount": 7,
          "paletteColorCount": 10,
          "spacingGridFit": 1,
          "radiusCount": 2,
          "shadowCount": 1,
          "visibleElementCount": 104
        },
        "summary": {
          "viewport": {
            "width": 1440,
            "height": 1100
          },
          "visibleElementCount": 104,
          "textElementCount": 67,
          "fontFamilyCount": 2,
          "fontSizeCount": 7,
          "paletteColorCount": 10,
          "spacingSampleCount": 98,
          "spacingGridFit": 1,
          "radiusCount": 2,
          "shadowCount": 1,
          "topFontFamilies": [
            "-apple-system",
            "ui-monospace"
          ],
          "topFontSizes": [
            12,
            14,
            16,
            18,
            20,
            24,
            36
          ],
          "disciplineScore": 100
        },
        "issues": [],
        "artifacts": {},
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z/",
      "source": "/sources/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z/source.txt",
      "sourceJson": "/sources/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.cjs",
        "postcss.config.js",
        "src/App.jsx",
        "src/arena.css",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.cjs",
        "tailwind.config.js"
      ],
      "desktopScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z__desktop.png",
      "mobileScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-07T03-21-02-136Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-07T03-18-02-308Z",
    "interfaceId": "pricing-ai-coding-assistant",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": null,
    "providerName": null,
    "status": "error",
    "createdAt": "2026-05-07T03:18:02.308Z",
    "completedAt": "2026-05-07T03:20:43.974Z",
    "execution": {
      "startedAt": "2026-05-07T03:18:02.308Z",
      "completedAt": "2026-05-07T03:20:43.974Z",
      "durationMs": 10501,
      "modelStartedAt": null,
      "modelCompletedAt": null,
      "modelDurationMs": null,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": null,
    "evaluations": null,
    "repairs": null,
    "artifacts": {
      "preview": null,
      "source": null,
      "sourceJson": null,
      "sourceFormat": null,
      "sourceFiles": null,
      "desktopScreenshot": null,
      "mobileScreenshot": null
    },
    "error": {
      "phase": "model",
      "message": "fetch failed"
    }
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-flash-preview__2026-05-07T03-18-02-308Z",
    "interfaceId": "pricing-ai-coding-assistant",
    "modelId": "gemini-3-flash-preview",
    "modelDisplayName": "Gemini 3 Flash Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3-flash-preview",
    "gatewayGenerationId": "gen-1778123882-P3jRhyAvnf7tVbIK3k6n",
    "providerName": "Google",
    "status": "complete",
    "createdAt": "2026-05-07T03:18:02.308Z",
    "completedAt": "2026-05-07T03:18:37.451Z",
    "execution": {
      "startedAt": "2026-05-07T03:18:02.308Z",
      "completedAt": "2026-05-07T03:18:37.451Z",
      "durationMs": 35143,
      "modelStartedAt": "2026-05-07T03:18:02.309Z",
      "modelCompletedAt": "2026-05-07T03:18:26.821Z",
      "modelDurationMs": 24512,
      "generationTimeMs": 24231,
      "latencyMs": 944
    },
    "usage": {
      "source": "openrouter:generation",
      "promptTokens": 673,
      "completionTokens": 4793,
      "totalTokens": 5859,
      "nativePromptTokens": 548,
      "nativeCompletionTokens": 5311,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.016207,
      "upstreamInferenceCost": 0.016207,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 548,
        "completion_tokens": 5311,
        "total_tokens": 5859,
        "cost": 0.016207,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.016207,
          "upstream_inference_prompt_cost": 0.000274,
          "upstream_inference_completions_cost": 0.015933
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-07T03:20:32.567Z",
        "durationMs": 7202,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.83,
            "value": 83
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.76,
            "value": 76
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1816.1199,
            "score": 0.38
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1816.1199,
            "score": 0.69
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.8 s",
            "numericValue": 1816.1199,
            "score": 0.7
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:62178/previews/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/",
          "finalUrl": "http://127.0.0.1:62178/previews/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/",
          "fetchTime": "2026-05-07T03:20:28.246Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "button-name",
            "title": "Buttons do not have an accessible name",
            "score": 0,
            "displayValue": null,
            "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name)."
          },
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "heading-order",
            "title": "Heading elements are not in a sequentially-descending order",
            "score": 0,
            "displayValue": null,
            "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/lighthouse/report.html",
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-07T03:20:33.473Z",
        "durationMs": 903,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 3,
          "passCount": 25,
          "incompleteCount": 1,
          "inapplicableCount": 64,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 1,
            "serious": 1,
            "moderate": 1,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "button-name",
            "impact": "critical",
            "help": "Buttons must have discernible text",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright",
            "description": "Ensure buttons have discernible text",
            "nodeCount": 1,
            "targets": [
              ".w-12"
            ]
          },
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 16,
            "targets": [
              ".gap-4.justify-center.items-center > .font-medium.text-slate-500",
              ".rounded-2xl.p-8.duration-300:nth-child(1) > .space-y-4.flex-grow > .tracking-wider.uppercase.text-xs",
              ".ring-2 > .space-y-4.flex-grow > .tracking-wider.uppercase.text-xs",
              ".rounded-2xl.p-8.duration-300:nth-child(3) > .space-y-4.flex-grow > .tracking-wider.uppercase.text-xs"
            ]
          },
          {
            "id": "heading-order",
            "impact": "moderate",
            "help": "Heading levels should only increase by one",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",
            "description": "Ensure the order of headings is semantically correct",
            "nodeCount": 2,
            "targets": [
              ".rounded-2xl.p-8.duration-300:nth-child(1) > .mb-8:nth-child(1) > h3",
              ".p-6.glass-card.rounded-xl:nth-child(1) > .mb-3.justify-between"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/axe/axe.json"
        },
        "error": null
      },
      "design-hygiene": {
        "id": "design-hygiene",
        "displayName": "Design Hygiene",
        "status": "complete",
        "version": "1.0.0",
        "completedAt": "2026-05-07T03:31:34.174Z",
        "durationMs": 1054,
        "scores": {
          "discipline": {
            "label": "Design hygiene",
            "score": 0.9820895522388059,
            "value": 98.2,
            "displayValue": "98"
          }
        },
        "metrics": {
          "fontFamilyCount": 1,
          "fontSizeCount": 10,
          "paletteColorCount": 12,
          "spacingGridFit": 0.94,
          "radiusCount": 5,
          "shadowCount": 2,
          "visibleElementCount": 252
        },
        "summary": {
          "viewport": {
            "width": 1440,
            "height": 1100
          },
          "visibleElementCount": 252,
          "textElementCount": 170,
          "fontFamilyCount": 1,
          "fontSizeCount": 10,
          "paletteColorCount": 12,
          "spacingSampleCount": 335,
          "spacingGridFit": 0.94,
          "radiusCount": 5,
          "shadowCount": 2,
          "topFontFamilies": [
            "inter"
          ],
          "topFontSizes": [
            10,
            12,
            14,
            16,
            18,
            20,
            24,
            30,
            36,
            60
          ],
          "disciplineScore": 98.2
        },
        "issues": [],
        "artifacts": {},
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/",
      "source": "/sources/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/source.txt",
      "sourceJson": "/sources/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.cjs",
        "src/App.jsx",
        "src/arena.css",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.cjs",
        "tailwind.config.js",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z__desktop.png",
      "mobileScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-flash-preview__2026-05-07T03-18-02-308Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-flash-preview__2026-05-04T03-04-04-338Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-flash-preview",
    "modelDisplayName": "Gemini 3 Flash Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3-flash-preview",
    "gatewayGenerationId": "gen-1777863844-NK6P05kz3FHiWRTTSTaN",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T03:04:04.338Z",
    "completedAt": "2026-05-04T03:04:47.942Z",
    "execution": {
      "startedAt": "2026-05-04T03:04:04.338Z",
      "completedAt": "2026-05-04T03:04:47.942Z",
      "durationMs": 43603,
      "modelStartedAt": "2026-05-04T03:04:04.339Z",
      "modelCompletedAt": "2026-05-04T03:04:36.032Z",
      "modelDurationMs": 31692,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 562,
      "completionTokens": 6624,
      "totalTokens": 7186,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.020153,
      "upstreamInferenceCost": 0.020153,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 562,
        "completion_tokens": 6624,
        "total_tokens": 7186,
        "cost": 0.020153,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.020153,
          "upstream_inference_prompt_cost": 0.000281,
          "upstream_inference_completions_cost": 0.019872
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T03:05:06.642Z",
        "durationMs": 8347,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.81,
            "value": 81
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.69,
            "value": 69
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "2.0 s",
            "numericValue": 1958.8512,
            "score": 0.31
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "2.0 s",
            "numericValue": 1958.8512,
            "score": 0.64
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "2.0 s",
            "numericValue": 1958.8512,
            "score": 0.64
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:63505/previews/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/",
          "finalUrl": "http://127.0.0.1:63505/previews/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/",
          "fetchTime": "2026-05-04T03:05:01.743Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "button-name",
            "title": "Buttons do not have an accessible name",
            "score": 0,
            "displayValue": null,
            "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "target-size",
            "title": "Touch targets do not have sufficient size or spacing.",
            "score": 0,
            "displayValue": null,
            "description": "Touch targets with sufficient size and spacing help users who may have difficulty targeting small controls to activate the targets. [Learn more about touch targets](https://dequeuniversity.com/rules/axe/4.11/target-size)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T03:05:08.124Z",
        "durationMs": 1477,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 3,
          "passCount": 26,
          "incompleteCount": 0,
          "inapplicableCount": 63,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 2,
            "serious": 0,
            "moderate": 0,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "button-name",
            "impact": "critical",
            "help": "Buttons must have discernible text",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright",
            "description": "Ensure buttons have discernible text",
            "nodeCount": 40,
            "targets": [
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(1) > .text-right > .inline-block.relative > .hover\\:bg-slate-200.hover\\:text-slate-600.p-1",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(2) > .text-right > .inline-block.relative > .hover\\:bg-slate-200.hover\\:text-slate-600.p-1",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(3) > .text-right > .inline-block.relative > .hover\\:bg-slate-200.hover\\:text-slate-600.p-1",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(4) > .text-right > .inline-block.relative > .hover\\:bg-slate-200.hover\\:text-slate-600.p-1"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              ".w-10"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 41,
            "targets": [
              ".w-10 > .border-slate-300.focus\\:ring-blue-500[type=\"checkbox\"]",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(1) > td:nth-child(1) > .border-slate-300.focus\\:ring-blue-500[type=\"checkbox\"]",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(2) > td:nth-child(1) > .border-slate-300.focus\\:ring-blue-500[type=\"checkbox\"]",
              ".hover\\:bg-slate-50\\/80.transition-colors.group:nth-child(3) > td:nth-child(1) > .border-slate-300.focus\\:ring-blue-500[type=\"checkbox\"]"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/App.jsx",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.js",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-flash-preview__2026-05-04T03-04-04-338Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777863748-0zIwO6KlgVrQJddwPUqp",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T03:02:46.692Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T03:02:46.692Z",
      "durationMs": 18747,
      "modelStartedAt": "2026-05-04T03:02:27.953Z",
      "modelCompletedAt": "2026-05-04T03:02:34.904Z",
      "modelDurationMs": 6951,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 564,
      "completionTokens": 2234,
      "totalTokens": 2798,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.003492,
      "upstreamInferenceCost": 0.003492,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 564,
        "completion_tokens": 2234,
        "total_tokens": 2798,
        "cost": 0.003492,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.003492,
          "upstream_inference_prompt_cost": 0.000141,
          "upstream_inference_completions_cost": 0.003351
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T03:03:02.410Z",
        "durationMs": 8038,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.86,
            "value": 86
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.77,
            "value": 77
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1657.096,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1657.096,
            "score": 0.75
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1657.096,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:63007/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:63007/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T03:02:57.819Z",
          "accessibilityIssueCount": 4
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T03:03:03.537Z",
        "durationMs": 1124,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 5,
          "passCount": 23,
          "incompleteCount": 0,
          "inapplicableCount": 65,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 1,
            "serious": 1,
            "moderate": 2,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 5,
            "targets": [
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(5) > td:nth-child(7) > .bg-gray-200.text-gray-500",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(10) > td:nth-child(7) > .bg-gray-200.text-gray-500",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(15) > td:nth-child(7) > .bg-gray-200.text-gray-500",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(20) > td:nth-child(7) > .bg-gray-200.text-gray-500"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 2,
            "targets": [
              "th:nth-child(1)",
              "th:nth-child(8)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 26,
            "targets": [
              "th:nth-child(1) > input[type=\"checkbox\"]",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(1) > td:nth-child(1) > input[type=\"checkbox\"]",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(2) > td:nth-child(1) > input[type=\"checkbox\"]",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(3) > td:nth-child(1) > input[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 177,
            "targets": [
              ".pl-8",
              "thead",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(1) > td:nth-child(1)",
              ".hover\\:bg-slate-50.cursor-pointer:nth-child(1) > .font-medium"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.js",
        "src/App.jsx",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "grok-4-3__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "grok-4-3",
    "modelDisplayName": "Grok 4.3",
    "family": "xAI",
    "gateway": "openrouter",
    "gatewayModel": "x-ai/grok-4.3",
    "gatewayGenerationId": "gen-1777863401-bqRIQ0if1g5VqALIdyNp",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:59:37.973Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:59:37.973Z",
      "durationMs": 176195,
      "modelStartedAt": "2026-05-04T02:56:41.777Z",
      "modelCompletedAt": "2026-05-04T02:59:26.035Z",
      "modelDurationMs": 164258,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 652,
      "completionTokens": 16035,
      "totalTokens": 16687,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 8102,
      "cachedPromptTokens": 64,
      "cacheDiscount": null,
      "totalCost": 0.0408353,
      "upstreamInferenceCost": 0.0408353,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 652,
        "completion_tokens": 16035,
        "total_tokens": 16687,
        "cost": 0.0408353,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 64,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.0408353,
          "upstream_inference_prompt_cost": 0.0007478,
          "upstream_inference_completions_cost": 0.0400875
        },
        "completion_tokens_details": {
          "reasoning_tokens": 8102,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T03:02:26.747Z",
        "durationMs": 8232,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.85,
            "value": 85
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.77,
            "value": 77
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1661.296,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1811.296,
            "score": 0.69
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1661.296,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0.5,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:62844/previews/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:62844/previews/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T03:02:22.045Z",
          "accessibilityIssueCount": 4
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T03:02:27.952Z",
        "durationMs": 1201,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 5,
          "passCount": 20,
          "incompleteCount": 1,
          "inapplicableCount": 68,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 1,
            "serious": 1,
            "moderate": 2,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 6,
            "targets": [
              "tr:nth-child(5) > td:nth-child(8) > .ml-1.text-orange-600.text-\\[10px\\]",
              "tr:nth-child(12) > td:nth-child(8) > .ml-1.text-orange-600.text-\\[10px\\]",
              "tr:nth-child(15) > td:nth-child(8) > .ml-1.text-orange-600.text-\\[10px\\]",
              "tr:nth-child(19) > td:nth-child(8) > .ml-1.text-orange-600.text-\\[10px\\]"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 2,
            "targets": [
              ".w-8",
              ".w-10"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 29,
            "targets": [
              ".w-8 > input[type=\"checkbox\"]",
              "tr:nth-child(1) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(2) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(3) > td:nth-child(1) > input[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 228,
            "targets": [
              ".mb-4:nth-child(1)",
              ".grid",
              ".flex-1",
              "thead"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [
      {
        "attempt": 1,
        "gatewayGenerationId": "gen-1777863583-27uZeOV0ClYWjrvtQkQv",
        "finishReason": "stop",
        "buildError": "$ npm run build\n\nstdout:\n\n> api-key-admin-table@0.1.0 build\n> vite build --base=./\n\nvite v5.4.21 building for production...\ntransforming...\n✓ 4 modules transformed.\n\n\nstderr:\n\nwarn - The `content` option in your Tailwind CSS configuration is missing or empty.\nwarn - Configure your content sources or your generated CSS will be missing styles.\nwarn - https://tailwindcss.com/docs/content-configuration\nx Build failed in 184ms\nerror during build:\nCould not resolve \"./App.jsx\" from \"src/main.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/src/main.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n\n\nerror:\nCommand failed: npm run build\n\nwarn - The `content` option in your Tailwind CSS configuration is missing or empty.\nwarn - Configure your content sources or your generated CSS will be missing styles.\nwarn - https://tailwindcss.com/docs/content-configuration\nx Build failed in 184ms\nerror during build:\nCould not resolve \"./App.jsx\" from \"src/main.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/src/main.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n",
        "modelStartedAt": "2026-05-04T02:59:43.177Z",
        "modelCompletedAt": "2026-05-04T03:01:59.388Z",
        "modelDurationMs": 136211
      }
    ],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.js",
        "src/App.jsx",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.js",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/grok-4-3__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-1-pro-preview",
    "modelDisplayName": "Gemini 3.1 Pro Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-pro-preview",
    "gatewayGenerationId": "gen-1777863212-rHbHseDX7kckDyfovoTB",
    "providerName": "Google",
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:55:02.415Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:55:02.415Z",
      "durationMs": 89607,
      "modelStartedAt": "2026-05-04T02:53:32.808Z",
      "modelCompletedAt": "2026-05-04T02:54:54.289Z",
      "modelDurationMs": 81481,
      "generationTimeMs": 81308,
      "latencyMs": 2561
    },
    "usage": {
      "source": "openrouter:generation",
      "promptTokens": 671,
      "completionTokens": 9230,
      "totalTokens": 12859,
      "nativePromptTokens": 562,
      "nativeCompletionTokens": 12297,
      "reasoningTokens": 3053,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.148688,
      "upstreamInferenceCost": 0.148688,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 562,
        "completion_tokens": 12297,
        "total_tokens": 12859,
        "cost": 0.148688,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.148688,
          "upstream_inference_prompt_cost": 0.001124,
          "upstream_inference_completions_cost": 0.147564
        },
        "completion_tokens_details": {
          "reasoning_tokens": 3053,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:55:20.175Z",
        "durationMs": 8210,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.76,
            "value": 76
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.69,
            "value": 69
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "2.3 s",
            "numericValue": 2261.1656000000003,
            "score": 0.2
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "2.3 s",
            "numericValue": 2261.1656000000003,
            "score": 0.54
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "2.3 s",
            "numericValue": 2261.1656000000003,
            "score": 0.51
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:61243/previews/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:61243/previews/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T02:55:15.344Z",
          "accessibilityIssueCount": 4
        },
        "issues": [
          {
            "id": "button-name",
            "title": "Buttons do not have an accessible name",
            "score": 0,
            "displayValue": null,
            "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name)."
          },
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:55:21.876Z",
        "durationMs": 1701,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 4,
          "passCount": 26,
          "incompleteCount": 0,
          "inapplicableCount": 63,
          "seriousOrCriticalCount": 3,
          "impactCounts": {
            "critical": 2,
            "serious": 1,
            "moderate": 0,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "button-name",
            "impact": "critical",
            "help": "Buttons must have discernible text",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright",
            "description": "Ensure buttons have discernible text",
            "nodeCount": 35,
            "targets": [
              ".hover\\:bg-gray-50\\/80:nth-child(1) > .text-right.relative > .p-1\\.5.text-gray-400.hover\\:text-gray-900",
              ".hover\\:bg-gray-50\\/80:nth-child(2) > .text-right.relative > .p-1\\.5.text-gray-400.hover\\:text-gray-900",
              ".hover\\:bg-gray-50\\/80:nth-child(3) > .text-right.relative > .p-1\\.5.text-gray-400.hover\\:text-gray-900",
              ".hover\\:bg-gray-50\\/80:nth-child(4) > .text-right.relative > .p-1\\.5.text-gray-400.hover\\:text-gray-900"
            ]
          },
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 1,
            "targets": [
              ".text-orange-600.font-medium.text-sm"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 2,
            "targets": [
              ".w-12:nth-child(1)",
              ".w-12:nth-child(9)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 36,
            "targets": [
              ".w-12:nth-child(1) > input[type=\"checkbox\"]",
              ".hover\\:bg-gray-50\\/80:nth-child(1) > .text-center > input[type=\"checkbox\"]",
              ".hover\\:bg-gray-50\\/80:nth-child(2) > .text-center > input[type=\"checkbox\"]",
              ".hover\\:bg-gray-50\\/80:nth-child(3) > .text-center > input[type=\"checkbox\"]"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.js",
        "src/App.jsx",
        "src/components/Drawer.jsx",
        "src/components/StatusPill.jsx",
        "src/index.css",
        "src/lib/utils.js",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.js",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-pro-preview__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-sonnet-4-5__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-sonnet-4-5",
    "modelDisplayName": "Claude Sonnet 4.5",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-sonnet-4.5",
    "gatewayGenerationId": "gen-1777863064-fgrfgz8X2N4U3aILKfXv",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:53:16.252Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:53:16.252Z",
      "durationMs": 132155,
      "modelStartedAt": "2026-05-04T02:51:04.097Z",
      "modelCompletedAt": "2026-05-04T02:53:04.032Z",
      "modelDurationMs": 119934,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 609,
      "completionTokens": 12903,
      "totalTokens": 13512,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.195372,
      "upstreamInferenceCost": 0.195372,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 609,
        "completion_tokens": 12903,
        "total_tokens": 13512,
        "cost": 0.195372,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.195372,
          "upstream_inference_prompt_cost": 0.001827,
          "upstream_inference_completions_cost": 0.193545
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:53:31.578Z",
        "durationMs": 8088,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.85,
            "value": 85
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.95,
            "value": 95
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1657.0632,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1807.0632,
            "score": 0.7
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1657.0632,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "10 ms",
            "numericValue": 7.5,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:60822/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:60822/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T02:53:26.905Z",
          "accessibilityIssueCount": 2
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:53:32.807Z",
        "durationMs": 1226,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 2,
          "passCount": 31,
          "incompleteCount": 0,
          "inapplicableCount": 58,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 0,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 10,
            "targets": [
              ".clickable-row:nth-child(1) > td:nth-child(4) > .scopes > .more.scope-badge",
              ".clickable-row:nth-child(2) > td:nth-child(4) > .scopes > .more.scope-badge",
              ".clickable-row:nth-child(4) > td:nth-child(4) > .scopes > .more.scope-badge",
              ".clickable-row:nth-child(5) > td:nth-child(4) > .scopes > .more.scope-badge"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              "th:nth-child(9)"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/App.css",
        "src/App.jsx",
        "src/index.css",
        "src/main.jsx",
        "src/mockData.js",
        "src/styles.css",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-opus-4-5__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-opus-4-5",
    "modelDisplayName": "Claude Opus 4.5",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-opus-4.5",
    "gatewayGenerationId": "gen-1777862552-GoltKHuZqi0vFpQfhS3G",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:45:12.298Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:45:12.298Z",
      "durationMs": 159596,
      "modelStartedAt": "2026-05-04T02:42:32.702Z",
      "modelCompletedAt": "2026-05-04T02:45:00.408Z",
      "modelDurationMs": 147706,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 609,
      "completionTokens": 16000,
      "totalTokens": 16609,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.403045,
      "upstreamInferenceCost": 0.403045,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 609,
        "completion_tokens": 16000,
        "total_tokens": 16609,
        "cost": 0.403045,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.403045,
          "upstream_inference_prompt_cost": 0.003045,
          "upstream_inference_completions_cost": 0.4
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:51:02.736Z",
        "durationMs": 8461,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.82,
            "value": 82
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.94,
            "value": 94
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1809.0247,
            "score": 0.38
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "2.0 s",
            "numericValue": 1959.0247,
            "score": 0.64
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.8 s",
            "numericValue": 1809.0247,
            "score": 0.7
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:60234/previews/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:60234/previews/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T02:50:57.719Z",
          "accessibilityIssueCount": 2
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:51:04.096Z",
        "durationMs": 1355,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 3,
          "passCount": 33,
          "incompleteCount": 1,
          "inapplicableCount": 55,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 2,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 46,
            "targets": [
              "tr:nth-child(1) > .col-name > .name-cell > .key-prefix",
              "tr:nth-child(2) > .col-name > .name-cell > .key-prefix",
              "tr:nth-child(2) > .col-scopes > .over-scoped.scope-badges > .scope-more.scope-badge[title=\"admin:deployments\"]",
              "tr:nth-child(3) > .col-name > .name-cell > .key-prefix"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 244,
            "targets": [
              ".summary-header",
              ".search-input",
              ".filter-segments",
              "thead"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [
      {
        "attempt": 1,
        "gatewayGenerationId": "gen-1777862718-2dvkzCOWChp9UCDSzi0O",
        "finishReason": "length",
        "buildError": "$ npm run build\n\nstdout:\n\n> api-keys-admin@1.0.0 build\n> vite build --base=./\n\nvite v5.4.21 building for production...\ntransforming...\n✓ 25 modules transformed.\n\n\nstderr:\nx Build failed in 106ms\nerror during build:\nCould not resolve \"./AuditDrawer.css\" from \"src/components/AuditDrawer.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/src/components/AuditDrawer.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n\n\nerror:\nCommand failed: npm run build\nx Build failed in 106ms\nerror during build:\nCould not resolve \"./AuditDrawer.css\" from \"src/components/AuditDrawer.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/src/components/AuditDrawer.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n",
        "modelStartedAt": "2026-05-04T02:45:18.329Z",
        "modelCompletedAt": "2026-05-04T02:47:48.887Z",
        "modelDurationMs": 150557
      },
      {
        "attempt": 2,
        "gatewayGenerationId": "gen-1777862886-hAsTLcVM5rSVDUrHwQTm",
        "finishReason": "stop",
        "buildError": "$ npm run build\n\nstdout:\n\n> api-keys-admin@1.0.0 build\n> vite build --base=./ --base=./\n\nvite v5.4.21 building for production...\ntransforming...\n✓ 10 modules transformed.\n\n\nstderr:\nx Build failed in 43ms\nerror during build:\nCould not resolve \"./data/mockKeys\" from \"src/App.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/src/App.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n\n\nerror:\nCommand failed: npm run build\nx Build failed in 43ms\nerror during build:\nCould not resolve \"./data/mockKeys\" from \"src/App.jsx\"\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/src/App.jsx\n    at getRollupError (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:406:41)\n    at error (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/parseAst.js:402:42)\n    at ModuleLoader.handleInvalidResolvedId (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22120:24)\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source/node_modules/rollup/dist/es/shared/node-entry.js:22080:26\n",
        "modelStartedAt": "2026-05-04T02:48:06.827Z",
        "modelCompletedAt": "2026-05-04T02:50:34.226Z",
        "modelDurationMs": 147398
      }
    ],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/App.css",
        "src/App.jsx",
        "src/components/AuditDrawer.css",
        "src/components/AuditDrawer.jsx",
        "src/components/BulkActionBar.css",
        "src/components/BulkActionBar.jsx",
        "src/components/FilterBar.css",
        "src/components/FilterBar.jsx",
        "src/components/KeysTable.css",
        "src/components/KeysTable.jsx",
        "src/components/ScopeBadges.css",
        "src/components/ScopeBadges.jsx",
        "src/components/StatusPill.css",
        "src/components/StatusPill.jsx",
        "src/components/SummaryHeader.css",
        "src/components/SummaryHeader.jsx",
        "src/data/mockKeys.js",
        "src/index.css",
        "src/main.jsx",
        "src/styles.css",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-opus-4-5__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-opus-4-6__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-opus-4-6",
    "modelDisplayName": "Claude Opus 4.6",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-opus-4.6",
    "gatewayGenerationId": "gen-1777862394-PJsIYy0jwGJqj25gfmDG",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:42:15.193Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:42:15.193Z",
      "durationMs": 140963,
      "modelStartedAt": "2026-05-04T02:39:54.230Z",
      "modelCompletedAt": "2026-05-04T02:42:03.333Z",
      "modelDurationMs": 129103,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 610,
      "completionTokens": 13350,
      "totalTokens": 13960,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.3368,
      "upstreamInferenceCost": 0.3368,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 610,
        "completion_tokens": 13350,
        "total_tokens": 13960,
        "cost": 0.3368,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.3368,
          "upstream_inference_prompt_cost": 0.00305,
          "upstream_inference_completions_cost": 0.33375
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:42:31.275Z",
        "durationMs": 8240,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.83,
            "value": 83
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.94,
            "value": 94
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1811.0486,
            "score": 0.38
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1811.0486,
            "score": 0.69
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.8 s",
            "numericValue": 1811.0486,
            "score": 0.7
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:58382/previews/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:58382/previews/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T02:42:26.528Z",
          "accessibilityIssueCount": 2
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:42:32.701Z",
        "durationMs": 1426,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 3,
          "passCount": 35,
          "incompleteCount": 1,
          "inapplicableCount": 53,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 2,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 45,
            "targets": [
              ".result-count",
              ".row-danger.table-row:nth-child(1) > .td-name > .name-cell > .key-prefix",
              ".row-danger.table-row:nth-child(2) > .td-name > .name-cell > .key-prefix",
              ".row-danger.table-row:nth-child(3) > .td-name > .name-cell > .key-prefix"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 242,
            "targets": [
              ".toolbar",
              "thead",
              ".row-danger.table-row:nth-child(1) > .td-check",
              ".row-danger.table-row:nth-child(1) > .td-name"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/App.jsx",
        "src/main.jsx",
        "src/mockData.js",
        "src/styles.css",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-opus-4-6__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gpt-5-5__2026-05-04T02-38-01-505Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gpt-5-5",
    "modelDisplayName": "GPT-5.5",
    "family": "OpenAI",
    "gateway": "openrouter",
    "gatewayModel": "openai/gpt-5.5",
    "gatewayGenerationId": "gen-1777862281-VWv2GapqAj3442L4iQF1",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:38:01.505Z",
    "completedAt": "2026-05-04T02:39:36.004Z",
    "execution": {
      "startedAt": "2026-05-04T02:38:01.505Z",
      "completedAt": "2026-05-04T02:39:36.004Z",
      "durationMs": 94497,
      "modelStartedAt": "2026-05-04T02:38:01.506Z",
      "modelCompletedAt": "2026-05-04T02:39:23.948Z",
      "modelDurationMs": 82442,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 539,
      "completionTokens": 8590,
      "totalTokens": 9129,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 157,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.260395,
      "upstreamInferenceCost": 0.260395,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 539,
        "completion_tokens": 8590,
        "total_tokens": 9129,
        "cost": 0.260395,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.260395,
          "upstream_inference_prompt_cost": 0.002695,
          "upstream_inference_completions_cost": 0.2577
        },
        "completion_tokens_details": {
          "reasoning_tokens": 157,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:39:52.779Z",
        "durationMs": 8535,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.81,
            "value": 81
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.82,
            "value": 82
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "2.0 s",
            "numericValue": 1959.9874,
            "score": 0.31
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "2.0 s",
            "numericValue": 1959.9874,
            "score": 0.64
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "2.0 s",
            "numericValue": 1959.9874,
            "score": 0.64
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 4.5,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:57773/previews/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/",
          "finalUrl": "http://127.0.0.1:57773/previews/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/",
          "fetchTime": "2026-05-04T02:39:47.948Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "aria-allowed-attr",
            "title": "`[aria-*]` attributes do not match their roles",
            "score": 0,
            "displayValue": null,
            "description": "Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn how to match ARIA attributes to their roles](https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr)."
          },
          {
            "id": "aria-valid-attr-value",
            "title": "`[aria-*]` attributes do not have valid values",
            "score": 0,
            "displayValue": null,
            "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more about valid values for ARIA attributes](https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value)."
          },
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:39:54.229Z",
        "durationMs": 1449,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 3,
          "passCount": 35,
          "incompleteCount": 1,
          "inapplicableCount": 54,
          "seriousOrCriticalCount": 3,
          "impactCounts": {
            "critical": 2,
            "serious": 1,
            "moderate": 0,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "aria-allowed-attr",
            "impact": "critical",
            "help": "Elements must only use supported ARIA attributes",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/aria-allowed-attr?application=playwright",
            "description": "Ensure an element's role supports its ARIA attributes",
            "nodeCount": 7,
            "targets": [
              "th:nth-child(2) > .sort[aria-sort=\"none\"]",
              "th:nth-child(3) > .sort[aria-sort=\"none\"]",
              "th:nth-child(4) > .sort[aria-sort=\"none\"]",
              "th:nth-child(5) > .sort[aria-sort=\"none\"]"
            ]
          },
          {
            "id": "aria-valid-attr-value",
            "impact": "critical",
            "help": "ARIA attributes must conform to valid values",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/aria-valid-attr-value?application=playwright",
            "description": "Ensure all ARIA attributes have valid values",
            "nodeCount": 1,
            "targets": [
              "button[aria-sort=\"asc\"]"
            ]
          },
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 1,
            "targets": [
              "p"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/",
      "source": "/sources/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/main.jsx",
        "src/styles.css"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gpt-5-5__2026-05-04T02-38-01-505Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777861382-EbhjeWf26aQnJvBIUtgr",
    "providerName": "Google AI Studio",
    "status": "complete",
    "createdAt": "2026-05-04T02:20:43.909Z",
    "completedAt": "2026-05-04T02:23:17.347Z",
    "execution": {
      "startedAt": "2026-05-04T02:20:43.909Z",
      "completedAt": "2026-05-04T02:23:17.347Z",
      "durationMs": 14915,
      "modelStartedAt": "2026-05-04T02:23:02.432Z",
      "modelCompletedAt": "2026-05-04T02:23:09.318Z",
      "modelDurationMs": 6886,
      "generationTimeMs": 6734,
      "latencyMs": 723
    },
    "usage": {
      "source": "openrouter:generation",
      "promptTokens": 671,
      "completionTokens": 1810,
      "totalTokens": 2795,
      "nativePromptTokens": 564,
      "nativeCompletionTokens": 2231,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.0034875,
      "upstreamInferenceCost": 0.0034875,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 564,
        "completion_tokens": 2231,
        "total_tokens": 2795,
        "cost": 0.0034875,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.0034875,
          "upstream_inference_prompt_cost": 0.000141,
          "upstream_inference_completions_cost": 0.0033465
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:24:14.335Z",
        "durationMs": 6995,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.85,
            "value": 85
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.92,
            "value": 92
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1657.0102,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1807.0102,
            "score": 0.7
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1657.0102,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:53975/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/",
          "finalUrl": "http://127.0.0.1:53975/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/",
          "fetchTime": "2026-05-04T02:24:10.077Z",
          "accessibilityIssueCount": 2
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:24:15.270Z",
        "durationMs": 932,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 2,
          "passCount": 26,
          "incompleteCount": 0,
          "inapplicableCount": 63,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 0,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 4,
            "targets": [
              ".bg-white.rounded-lg.shadow-sm:nth-child(1) > .tracking-widest.font-bold",
              ".bg-white.rounded-lg.shadow-sm:nth-child(2) > .tracking-widest.font-bold",
              ".bg-white.rounded-lg.shadow-sm:nth-child(3) > .tracking-widest.font-bold",
              ".bg-white.rounded-lg.shadow-sm:nth-child(4) > .tracking-widest.font-bold"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              "th:nth-child(5)"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [
      {
        "attempt": 1,
        "gatewayGenerationId": "gen-1777861402-5FDIqboVywaPYm21nGnU",
        "finishReason": "stop",
        "buildError": "$ npm run build\n\nstdout:\n\n> api-key-manager@1.0.0 build\n> vite build --base=./\n\nvite v5.4.21 building for production...\ntransforming...\n\n\nstderr:\nnode:internal/process/promises:394\n    triggerUncaughtException(err, true /* fromPromise */);\n    ^\n\n[Failed to load PostCSS config: Failed to load PostCSS config (searchPath: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source): [ReferenceError] module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:430:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:661:26)\n    at async importDefault (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:33759:18)\n    at async Object.search (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:25915:23)]\n\nNode.js v24.14.0\n\n\nerror:\nCommand failed: npm run build\nnode:internal/process/promises:394\n    triggerUncaughtException(err, true /* fromPromise */);\n    ^\n\n[Failed to load PostCSS config: Failed to load PostCSS config (searchPath: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source): [ReferenceError] module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:430:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:661:26)\n    at async importDefault (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:33759:18)\n    at async Object.search (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:25915:23)]\n\nNode.js v24.14.0\n",
        "modelStartedAt": "2026-05-04T02:23:22.903Z",
        "modelCompletedAt": "2026-05-04T02:23:29.713Z",
        "modelDurationMs": 6810
      },
      {
        "attempt": 2,
        "gatewayGenerationId": "gen-1777861423-gMIMTu0DOPYDr7GgFowd",
        "finishReason": "stop",
        "buildError": "$ npm run build\n\nstdout:\n\n> build\n> vite build --base=./\n\nvite v7.3.2 building client environment for production...\ntransforming...\n✓ 3 modules transformed.\n\n\nstderr:\n✗ Build failed in 34ms\nerror during build:\n[vite:css] Failed to load PostCSS config (searchPath: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source): [Error] Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'\nRequire stack:\n- /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js\n\n(@/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js)\nError: Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'\nRequire stack:\n- /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js\n\n(@/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js)\n    at load (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7660:10)\n    at async Promise.all (index 1)\n    at async plugins (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7682:11)\n    at async processResult (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7721:13)\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/src/styles.css\n\n\n\nerror:\nCommand failed: npm run build\n✗ Build failed in 34ms\nerror during build:\n[vite:css] Failed to load PostCSS config (searchPath: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source): [Error] Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'\nRequire stack:\n- /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js\n\n(@/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js)\nError: Loading PostCSS Plugin failed: Cannot find module 'autoprefixer'\nRequire stack:\n- /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js\n\n(@/Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/postcss.config.js)\n    at load (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7660:10)\n    at async Promise.all (index 1)\n    at async plugins (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7682:11)\n    at async processResult (file:///Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/node_modules/vite/dist/node/chunks/config.js:7721:13)\nfile: /Users/colinarms/src/personal/uiarena/arena/runs/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source/src/styles.css\n\n",
        "modelStartedAt": "2026-05-04T02:23:43.780Z",
        "modelCompletedAt": "2026-05-04T02:23:50.751Z",
        "modelDurationMs": 6971
      }
    ],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "postcss.config.js",
        "src/App.jsx",
        "src/main.jsx",
        "src/styles.css",
        "tailwind.config.js",
        "vite.config.js"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T02-20-43-909Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-sonnet-4-5__2026-05-04T02-20-43-909Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-sonnet-4-5",
    "modelDisplayName": "Claude Sonnet 4.5",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-sonnet-4.5",
    "gatewayGenerationId": "gen-1777861244-mAgQbuqpwY8nUTQUrPhh",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T02:20:43.909Z",
    "completedAt": "2026-05-04T02:22:44.254Z",
    "execution": {
      "startedAt": "2026-05-04T02:20:43.909Z",
      "completedAt": "2026-05-04T02:22:44.254Z",
      "durationMs": 120343,
      "modelStartedAt": "2026-05-04T02:20:43.910Z",
      "modelCompletedAt": "2026-05-04T02:22:32.266Z",
      "modelDurationMs": 108355,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 609,
      "completionTokens": 11946,
      "totalTokens": 12555,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.181017,
      "upstreamInferenceCost": 0.181017,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 609,
        "completion_tokens": 11946,
        "total_tokens": 12555,
        "cost": 0.181017,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.181017,
          "upstream_inference_prompt_cost": 0.001827,
          "upstream_inference_completions_cost": 0.17919
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T02:23:01.148Z",
        "durationMs": 8632,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.85,
            "value": 85
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.69,
            "value": 69
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1662.1631,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1812.1631,
            "score": 0.69
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1662.1631,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 3.5,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:53632/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/",
          "finalUrl": "http://127.0.0.1:53632/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/",
          "fetchTime": "2026-05-04T02:22:56.208Z",
          "accessibilityIssueCount": 4
        },
        "issues": [
          {
            "id": "button-name",
            "title": "Buttons do not have an accessible name",
            "score": 0,
            "displayValue": null,
            "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name)."
          },
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T02:23:02.431Z",
        "durationMs": 1280,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 4,
          "passCount": 27,
          "incompleteCount": 1,
          "inapplicableCount": 62,
          "seriousOrCriticalCount": 3,
          "impactCounts": {
            "critical": 2,
            "serious": 1,
            "moderate": 0,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "button-name",
            "impact": "critical",
            "help": "Buttons must have discernible text",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright",
            "description": "Ensure buttons have discernible text",
            "nodeCount": 25,
            "targets": [
              "tr:nth-child(1) > .td-actions > .actions-wrapper > .actions-btn",
              "tr:nth-child(2) > .td-actions > .actions-wrapper > .actions-btn",
              "tr:nth-child(3) > .td-actions > .actions-wrapper > .actions-btn",
              "tr:nth-child(4) > .td-actions > .actions-wrapper > .actions-btn"
            ]
          },
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 73,
            "targets": [
              ".stat-warning",
              ".active",
              "tr:nth-child(1) > .td-name > .key-id",
              "tr:nth-child(1) > td:nth-child(8) > .status-pill"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 2,
            "targets": [
              ".th-checkbox",
              ".th-actions"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 26,
            "targets": [
              ".th-checkbox > input[type=\"checkbox\"]",
              "tr:nth-child(1) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(2) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(3) > td:nth-child(1) > input[type=\"checkbox\"]"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": [],
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/",
      "source": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/source.txt",
      "sourceJson": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z/files.json",
      "sourceFormat": "react-project",
      "sourceFiles": [
        "index.html",
        "package.json",
        "src/App.css",
        "src/App.jsx",
        "src/index.css",
        "src/main.jsx",
        "src/mockData.js",
        "src/styles.css"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T02-20-43-909Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z",
    "interfaceId": "pricing-ai-coding-assistant",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777859802-3su708oGRNqLGoMh8Fc1",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T01:56:42.537Z",
    "completedAt": "2026-05-04T01:56:59.098Z",
    "execution": {
      "startedAt": "2026-05-04T01:56:42.537Z",
      "completedAt": "2026-05-04T01:56:59.098Z",
      "durationMs": 16559,
      "modelStartedAt": "2026-05-04T01:56:42.540Z",
      "modelCompletedAt": "2026-05-04T01:56:47.324Z",
      "modelDurationMs": 4784,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 665,
      "completionTokens": 1590,
      "totalTokens": 2255,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.00255125,
      "upstreamInferenceCost": 0.00255125,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 665,
        "completion_tokens": 1590,
        "total_tokens": 2255,
        "cost": 0.00255125,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.00255125,
          "upstream_inference_prompt_cost": 0.00016625,
          "upstream_inference_completions_cost": 0.002385
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T01:57:08.553Z",
        "durationMs": 7131,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.86,
            "value": 86
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.85,
            "value": 85
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1662.3934,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1662.3934,
            "score": 0.75
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1662.3934,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:63722/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/",
          "finalUrl": "http://127.0.0.1:63722/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/",
          "fetchTime": "2026-05-04T01:57:04.251Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "heading-order",
            "title": "Heading elements are not in a sequentially-descending order",
            "score": 0,
            "displayValue": null,
            "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/lighthouse/report.html",
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T01:57:09.463Z",
        "durationMs": 909,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 4,
          "passCount": 19,
          "incompleteCount": 0,
          "inapplicableCount": 69,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 3,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 5,
            "targets": [
              ".card:nth-child(1) > .price > span",
              ".badge",
              ".featured > .price > span",
              ".primary"
            ]
          },
          {
            "id": "heading-order",
            "impact": "moderate",
            "help": "Heading levels should only increase by one",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",
            "description": "Ensure the order of headings is semantically correct",
            "nodeCount": 1,
            "targets": [
              ".card:nth-child(1) > h3"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 15,
            "targets": [
              ".card:nth-child(1) > h3",
              ".card:nth-child(1) > .price",
              ".card:nth-child(1) > p",
              ".card:nth-child(1) > ul"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/",
      "source": "/sources/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z/source.txt",
      "sourceJson": null,
      "sourceFormat": "react-vite",
      "sourceFiles": [
        "src/App.jsx",
        "src/styles.css",
        "index.html",
        "src/main.jsx"
      ],
      "desktopScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z__desktop.png",
      "mobileScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-04T01-56-42-537Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777859513-60Shx9c3ppDwMdyy3zzV",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T01:49:39.367Z",
    "completedAt": "2026-05-04T01:52:10.881Z",
    "execution": {
      "startedAt": "2026-05-04T01:49:39.367Z",
      "completedAt": "2026-05-04T01:52:10.881Z",
      "durationMs": 17190,
      "modelStartedAt": "2026-05-04T01:51:53.691Z",
      "modelCompletedAt": "2026-05-04T01:51:58.883Z",
      "modelDurationMs": 5192,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 711,
      "completionTokens": 1773,
      "totalTokens": 2484,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.00283725,
      "upstreamInferenceCost": 0.00283725,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 711,
        "completion_tokens": 1773,
        "total_tokens": 2484,
        "cost": 0.00283725,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.00283725,
          "upstream_inference_prompt_cost": 0.00017775,
          "upstream_inference_completions_cost": 0.0026595
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T01:52:19.891Z",
        "durationMs": 7379,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.86,
            "value": 86
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.85,
            "value": 85
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1652.9528,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1652.9528,
            "score": 0.75
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1652.9528,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:62408/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/",
          "finalUrl": "http://127.0.0.1:62408/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/",
          "fetchTime": "2026-05-04T01:52:15.393Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          },
          {
            "id": "td-has-header",
            "title": "`<td>` elements in a large `<table>` do not have table headers.",
            "score": 0,
            "displayValue": null,
            "description": "Screen readers have features to make navigating tables easier. Ensuring that `<td>` elements in a large table (3 or more cells in width and height) have an associated table header may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.11/td-has-header)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T01:52:20.972Z",
        "durationMs": 1078,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 5,
          "passCount": 20,
          "incompleteCount": 1,
          "inapplicableCount": 67,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 1,
            "serious": 0,
            "moderate": 3,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 2,
            "targets": [
              "th:nth-child(1)",
              "th:nth-child(8)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 26,
            "targets": [
              "th:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(1) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(2) > td:nth-child(1) > input[type=\"checkbox\"]",
              "tr:nth-child(3) > td:nth-child(1) > input[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "page-has-heading-one",
            "impact": "moderate",
            "help": "Page should contain a level-one heading",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/page-has-heading-one?application=playwright",
            "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 177,
            "targets": [
              "input[type=\"search\"]",
              "thead",
              "tr:nth-child(1) > td:nth-child(1)",
              "tr:nth-child(1) > td:nth-child(2)"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z/source.txt",
      "sourceJson": null,
      "sourceFormat": "react-vite",
      "sourceFiles": [
        "src/App.jsx",
        "src/styles.css",
        "index.html",
        "src/main.jsx"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-49-39-367Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-sonnet-4-5__2026-05-04T01-49-39-367Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-sonnet-4-5",
    "modelDisplayName": "Claude Sonnet 4.5",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-sonnet-4.5",
    "gatewayGenerationId": "gen-1777859379-xxmXfE6J4BrcjRwL1itD",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T01:49:39.367Z",
    "completedAt": "2026-05-04T01:51:40.853Z",
    "execution": {
      "startedAt": "2026-05-04T01:49:39.367Z",
      "completedAt": "2026-05-04T01:51:40.853Z",
      "durationMs": 121476,
      "modelStartedAt": "2026-05-04T01:49:39.369Z",
      "modelCompletedAt": "2026-05-04T01:51:28.796Z",
      "modelDurationMs": 109418,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 769,
      "completionTokens": 12647,
      "totalTokens": 13416,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.192012,
      "upstreamInferenceCost": 0.192012,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 769,
        "completion_tokens": 12647,
        "total_tokens": 13416,
        "cost": 0.192012,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.192012,
          "upstream_inference_prompt_cost": 0.002307,
          "upstream_inference_completions_cost": 0.189705
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T01:51:52.370Z",
        "durationMs": 8772,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.85,
            "value": 85
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.77,
            "value": 77
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "1.7 s",
            "numericValue": 1661.0835,
            "score": 0.46
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "1.8 s",
            "numericValue": 1811.0835,
            "score": 0.69
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "1.7 s",
            "numericValue": 1661.0835,
            "score": 0.77
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 1.5,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:62270/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/",
          "finalUrl": "http://127.0.0.1:62270/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/",
          "fetchTime": "2026-05-04T01:51:47.572Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T01:51:53.690Z",
        "durationMs": 1318,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 5,
          "passCount": 24,
          "incompleteCount": 1,
          "inapplicableCount": 64,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 1,
            "serious": 1,
            "moderate": 2,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 24,
            "targets": [
              ".active",
              "tr:nth-child(1) > .status-cell > .status-pill",
              "tr:nth-child(2) > .status-cell > .status-pill",
              "tr:nth-child(3) > .status-cell > .status-pill"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              "th:nth-child(1)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 27,
            "targets": [
              "th:nth-child(1) > input[type=\"checkbox\"]",
              "tbody > tr:nth-child(1) > .checkbox-col > input[type=\"checkbox\"]",
              "tr:nth-child(2) > .checkbox-col > input[type=\"checkbox\"]",
              "tr:nth-child(3) > .checkbox-col > input[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 211,
            "targets": [
              ".stats-bar",
              ".search-input",
              "thead",
              "tbody > tr:nth-child(1) > .checkbox-col"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/",
      "source": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z/source.txt",
      "sourceJson": null,
      "sourceFormat": "react-vite",
      "sourceFiles": [
        "src/App.jsx",
        "src/styles.css",
        "index.html",
        "src/main.jsx"
      ],
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-49-39-367Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777857882-k7A7KMXsyXUS2Og9TCRX",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T01:22:01.002Z",
    "completedAt": "2026-05-04T01:25:00.568Z",
    "execution": {
      "startedAt": "2026-05-04T01:22:01.002Z",
      "completedAt": "2026-05-04T01:25:00.568Z",
      "durationMs": 17743,
      "modelStartedAt": "2026-05-04T01:24:42.825Z",
      "modelCompletedAt": "2026-05-04T01:24:48.694Z",
      "modelDurationMs": 5868,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 625,
      "completionTokens": 1994,
      "totalTokens": 2619,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.00314725,
      "upstreamInferenceCost": 0.00314725,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 625,
        "completion_tokens": 1994,
        "total_tokens": 2619,
        "cost": 0.00314725,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.00314725,
          "upstream_inference_prompt_cost": 0.00015625,
          "upstream_inference_completions_cost": 0.002991
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T01:33:02.844Z",
        "durationMs": 9699,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.56,
            "value": 56
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.85,
            "value": 85
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "6.1 s",
            "numericValue": 6144.7158,
            "score": 0
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "6.1 s",
            "numericValue": 6144.7158,
            "score": 0.04
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "6.1 s",
            "numericValue": 6144.7158,
            "score": 0.01
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:57986/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/",
          "finalUrl": "http://127.0.0.1:57986/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/",
          "fetchTime": "2026-05-04T01:32:56.015Z",
          "accessibilityIssueCount": 2
        },
        "issues": [
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T01:33:04.811Z",
        "durationMs": 1965,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 4,
          "passCount": 23,
          "incompleteCount": 0,
          "inapplicableCount": 65,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 1,
            "serious": 0,
            "moderate": 2,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              "th:nth-child(1)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 26,
            "targets": [
              "th:nth-child(1) > input[type=\"checkbox\"]",
              ".border-t.border-slate-100.hover\\:bg-slate-50:nth-child(1) > td:nth-child(1) > input[type=\"checkbox\"]",
              ".border-t.border-slate-100.hover\\:bg-slate-50:nth-child(2) > td:nth-child(1) > input[type=\"checkbox\"]",
              ".border-t.border-slate-100.hover\\:bg-slate-50:nth-child(3) > td:nth-child(1) > input[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 2,
            "targets": [
              ".py-1\\.5",
              ".overflow-x-auto"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/",
      "source": "/sources/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z/index.html.txt",
      "sourceJson": null,
      "sourceFormat": null,
      "sourceFiles": null,
      "desktopScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/gemini-3-1-flash-lite-preview__2026-05-04T01-22-01-002Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "claude-sonnet-4-5__2026-05-04T01-22-01-002Z",
    "interfaceId": "api-keys-admin-table",
    "modelId": "claude-sonnet-4-5",
    "modelDisplayName": "Claude Sonnet 4.5",
    "family": "Anthropic",
    "gateway": "openrouter",
    "gatewayModel": "anthropic/claude-sonnet-4.5",
    "gatewayGenerationId": "gen-1777857721-RTLCeOwRZE3RJR5x0yUD",
    "providerName": null,
    "status": "complete",
    "createdAt": "2026-05-04T01:22:01.002Z",
    "completedAt": "2026-05-04T01:24:02.761Z",
    "execution": {
      "startedAt": "2026-05-04T01:22:01.002Z",
      "completedAt": "2026-05-04T01:24:02.761Z",
      "durationMs": 121756,
      "modelStartedAt": "2026-05-04T01:22:01.005Z",
      "modelCompletedAt": "2026-05-04T01:23:50.922Z",
      "modelDurationMs": 109916,
      "generationTimeMs": null,
      "latencyMs": null
    },
    "usage": {
      "source": "openrouter:response",
      "promptTokens": 671,
      "completionTokens": 12170,
      "totalTokens": 12841,
      "nativePromptTokens": null,
      "nativeCompletionTokens": null,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.184563,
      "upstreamInferenceCost": 0.184563,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 671,
        "completion_tokens": 12170,
        "total_tokens": 12841,
        "cost": 0.184563,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.184563,
          "upstream_inference_prompt_cost": 0.002013,
          "upstream_inference_completions_cost": 0.18255
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-04T01:33:13.696Z",
        "durationMs": 8884,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 0.56,
            "value": 56
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.77,
            "value": 77
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "5.7 s",
            "numericValue": 5739.334999999999,
            "score": 0
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "5.7 s",
            "numericValue": 5739.334999999999,
            "score": 0.05
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "5.7 s",
            "numericValue": 5739.334999999999,
            "score": 0.01
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:57986/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/",
          "finalUrl": "http://127.0.0.1:57986/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/",
          "fetchTime": "2026-05-04T01:33:07.233Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "label",
            "title": "Form elements do not have associated labels",
            "score": 0,
            "displayValue": null,
            "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more about form element labels](https://dequeuniversity.com/rules/axe/4.11/label)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/lighthouse/report.html",
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-04T01:33:15.588Z",
        "durationMs": 1891,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 5,
          "passCount": 21,
          "incompleteCount": 1,
          "inapplicableCount": 67,
          "seriousOrCriticalCount": 2,
          "impactCounts": {
            "critical": 1,
            "serious": 1,
            "moderate": 2,
            "minor": 1,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 100,
            "targets": [
              ".summary-card:nth-child(1) > .summary-label",
              ".summary-card:nth-child(2) > .summary-label",
              ".summary-card:nth-child(3) > .summary-label",
              ".summary-card:nth-child(4) > .summary-label"
            ]
          },
          {
            "id": "empty-table-header",
            "impact": "minor",
            "help": "Table header text should not be empty",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright",
            "description": "Ensure table headers have discernible text",
            "nodeCount": 1,
            "targets": [
              "th:nth-child(1)"
            ]
          },
          {
            "id": "label",
            "impact": "critical",
            "help": "Form elements must have labels",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/label?application=playwright",
            "description": "Ensure every form element has a label",
            "nodeCount": 29,
            "targets": [
              "th:nth-child(1) > .checkbox[type=\"checkbox\"]",
              "tr:nth-child(1) > td:nth-child(1) > .checkbox[type=\"checkbox\"]",
              "tr:nth-child(2) > td:nth-child(1) > .checkbox[type=\"checkbox\"]",
              "tr:nth-child(3) > td:nth-child(1) > .checkbox[type=\"checkbox\"]"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 228,
            "targets": [
              ".header",
              ".summary-strip",
              ".search-box",
              "thead"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/",
      "source": "/sources/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z/index.html.txt",
      "sourceJson": null,
      "sourceFormat": null,
      "sourceFiles": null,
      "desktopScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z__desktop.png",
      "mobileScreenshot": "/screenshots/api-keys-admin-table/claude-sonnet-4-5__2026-05-04T01-22-01-002Z__mobile.png"
    },
    "error": null
  },
  {
    "schemaVersion": 1,
    "runId": "gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z",
    "interfaceId": "pricing-ai-coding-assistant",
    "modelId": "gemini-3-1-flash-lite-preview",
    "modelDisplayName": "Gemini 3.1 Flash Lite Preview",
    "family": "Google",
    "gateway": "openrouter",
    "gatewayModel": "google/gemini-3.1-flash-lite-preview",
    "gatewayGenerationId": "gen-1777833001-VnLQReUFc8RyLtVViNoB",
    "providerName": "Google AI Studio",
    "status": "complete",
    "createdAt": "2026-05-03T18:30:01.594Z",
    "completedAt": "2026-05-03T18:30:15.737Z",
    "execution": {
      "startedAt": "2026-05-03T18:30:01.594Z",
      "completedAt": "2026-05-03T18:30:15.737Z",
      "durationMs": 14141,
      "modelStartedAt": "2026-05-03T18:30:01.596Z",
      "modelCompletedAt": "2026-05-03T18:30:07.034Z",
      "modelDurationMs": 5438,
      "generationTimeMs": 5221,
      "latencyMs": 430
    },
    "usage": {
      "source": "openrouter:generation",
      "promptTokens": 545,
      "completionTokens": 1698,
      "totalTokens": 2243,
      "nativePromptTokens": 426,
      "nativeCompletionTokens": 1806,
      "reasoningTokens": 0,
      "cachedPromptTokens": 0,
      "cacheDiscount": null,
      "totalCost": 0.0028155,
      "upstreamInferenceCost": 0.0028155,
      "currency": "USD",
      "rawResponseUsage": {
        "prompt_tokens": 426,
        "completion_tokens": 1806,
        "total_tokens": 2232,
        "cost": 0.0028155,
        "is_byok": false,
        "prompt_tokens_details": {
          "cached_tokens": 0,
          "cache_write_tokens": 0,
          "audio_tokens": 0,
          "video_tokens": 0
        },
        "cost_details": {
          "upstream_inference_cost": 0.0028155,
          "upstream_inference_prompt_cost": 0.0001065,
          "upstream_inference_completions_cost": 0.002709
        },
        "completion_tokens_details": {
          "reasoning_tokens": 0,
          "image_tokens": 0,
          "audio_tokens": 0
        }
      }
    },
    "evaluations": {
      "lighthouse": {
        "id": "lighthouse",
        "displayName": "Lighthouse",
        "status": "complete",
        "version": "13.2.0",
        "completedAt": "2026-05-03T18:59:00.828Z",
        "durationMs": 6551,
        "scores": {
          "performance": {
            "title": "Performance",
            "score": 1,
            "value": 100
          },
          "accessibility": {
            "title": "Accessibility",
            "score": 0.85,
            "value": 85
          }
        },
        "metrics": {
          "firstContentfulPaint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "displayValue": "0.6 s",
            "numericValue": 623.01715,
            "score": 0.99
          },
          "largestContentfulPaint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "displayValue": "0.6 s",
            "numericValue": 623.01715,
            "score": 0.99
          },
          "speedIndex": {
            "id": "speed-index",
            "title": "Speed Index",
            "displayValue": "0.6 s",
            "numericValue": 623.01715,
            "score": 1
          },
          "totalBlockingTime": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "displayValue": "0 ms",
            "numericValue": 0,
            "score": 1
          },
          "cumulativeLayoutShift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "displayValue": "0",
            "numericValue": 0,
            "score": 1
          }
        },
        "summary": {
          "requestedUrl": "http://127.0.0.1:53674/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/",
          "finalUrl": "http://127.0.0.1:53674/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/",
          "fetchTime": "2026-05-03T18:58:56.668Z",
          "accessibilityIssueCount": 3
        },
        "issues": [
          {
            "id": "color-contrast",
            "title": "Background and foreground colors do not have a sufficient contrast ratio.",
            "score": 0,
            "displayValue": null,
            "description": "Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast)."
          },
          {
            "id": "heading-order",
            "title": "Heading elements are not in a sequentially-descending order",
            "score": 0,
            "displayValue": null,
            "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order)."
          },
          {
            "id": "landmark-one-main",
            "title": "Document does not have a main landmark.",
            "score": 0,
            "displayValue": null,
            "description": "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main)."
          }
        ],
        "artifacts": {
          "report": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/lighthouse/report.html",
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/lighthouse/lhr.json"
        },
        "error": null
      },
      "axe": {
        "id": "axe",
        "displayName": "Axe",
        "status": "complete",
        "version": "4.11.4",
        "completedAt": "2026-05-03T18:59:01.748Z",
        "durationMs": 918,
        "scores": null,
        "metrics": null,
        "summary": {
          "violationCount": 4,
          "passCount": 19,
          "incompleteCount": 0,
          "inapplicableCount": 69,
          "seriousOrCriticalCount": 1,
          "impactCounts": {
            "critical": 0,
            "serious": 1,
            "moderate": 3,
            "minor": 0,
            "unknown": 0
          }
        },
        "issues": [
          {
            "id": "color-contrast",
            "impact": "serious",
            "help": "Elements must meet minimum color contrast ratio thresholds",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
            "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
            "nodeCount": 2,
            "targets": [
              ".badge",
              ".btn-primary"
            ]
          },
          {
            "id": "heading-order",
            "impact": "moderate",
            "help": "Heading levels should only increase by one",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",
            "description": "Ensure the order of headings is semantically correct",
            "nodeCount": 1,
            "targets": [
              ".card:nth-child(1) > h3"
            ]
          },
          {
            "id": "landmark-one-main",
            "impact": "moderate",
            "help": "Document should have one main landmark",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright",
            "description": "Ensure the document has a main landmark",
            "nodeCount": 1,
            "targets": [
              "html"
            ]
          },
          {
            "id": "region",
            "impact": "moderate",
            "help": "All page content should be contained by landmarks",
            "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
            "description": "Ensure all page content is contained by landmarks",
            "nodeCount": 12,
            "targets": [
              ".card:nth-child(1) > h3",
              ".card:nth-child(1) > .price",
              ".card:nth-child(1) > ul",
              ".badge"
            ]
          }
        ],
        "artifacts": {
          "json": "/evaluations/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/axe/axe.json"
        },
        "error": null
      }
    },
    "repairs": null,
    "artifacts": {
      "preview": "/previews/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/",
      "source": "/sources/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z/index.html.txt",
      "sourceJson": null,
      "sourceFormat": null,
      "sourceFiles": null,
      "desktopScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z__desktop.png",
      "mobileScreenshot": "/screenshots/pricing-ai-coding-assistant/gemini-3-1-flash-lite-preview__2026-05-03T18-30-01-594Z__mobile.png"
    },
    "error": null
  }
];
