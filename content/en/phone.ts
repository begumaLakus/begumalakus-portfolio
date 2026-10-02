// English mirror of content/tr/phone.ts — keep both in sync (same shape, same keys).

export const phone = {
  ownway: {
    testLabel: "Aptitude Test · Question 14/42",
    title: "Campus Intelligence",
    question: "“I enjoy breaking a new problem down into logical steps.”",
    scaleLow: "Disagree",
    scaleHigh: "Agree",
    cities: { a: "Istanbul", b: "Ankara", c: "Izmir", d: "Zonguldak" },
  },
  pixel: {
    shots: ["Pixel Challenge home screen: today's theme", "Pixel drawing editor", "Past challenge champions"] as [string, string, string],
  },
  cini: {
    status: "Detected · 3 motifs · 41 ms",
    tulip: "tulip",
    carnation: "carnation",
    cintemani: "çintemani",
    detTulip: "Tulip",
    detCintemani: "Çintemani",
    detCarnation: "Carnation",
  },
  colorvision: {
    title: "Color separation",
    subtitle: "K = 6 clusters · deuteranopia",
    original: "Original", originalSub: "RGB",
    simulated: "Deuteranope view", simulatedSub: "simulation",
    separated: "Separated", separatedSub: "result",
    caption: "confused cluster pair:",
  },
} as const;
