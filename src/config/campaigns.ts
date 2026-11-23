/*
*  Advertisement banners for campaigns. Set enabled to false to disable a campaign. 
*  Change the id when starting a new campaign so visitors who dismissed the previous campaign can see the new one.
*  Only run campains when pushing for a goal like a fundraiser.
*  Set enabled to false to have no campain shown. false should be what it stays on most of the time, we don't want to annoy users with too many campaigns.
*/


//Enable each placement independently. Change its id when starting a new campaign
// so visitors who dismissed the previous campaign can see the new one.
export const campaigns = {
  banner: {
    enabled: true,
    id: "fatcat-ice-cream-december-3",
    heading: "Support SLICE Robotics",
    message: "Come out to FatCat Ice Cream on December 3rd to support the team and enjoy some ice cream!",
    linkText: "Donate",
    href: "https://example.com/donate",
  },
  popup: {
    enabled: true,
    id: "fatcat-ice-cream-december-3",
    eyebrow: "Support the team",
    heading: "Donate to SLICE Robotics",
    message: "Come out to FatCat Ice Cream on December 3rd to support the team and enjoy some ice cream!",
    linkText: "Donate",
    href: "https://example.com/donate",
    // Delay before opening, in milliseconds.
    delayMs: 10_000,
    dismissalDays: 3,
  },
};
