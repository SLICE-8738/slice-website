/*
*  Advertisement banners for campaigns. Set enabled to false to disable a campaign. 
*  Change the id when starting a new campaign so visitors who dismissed the previous campaign can see the new one.
*  Only run campains when pushing for a goal like a fundraiser.
*  Set enabled to false to have no campain shown. false should be what it stays on most of the time, we don't want to annoy users with too many campaigns.
*/


//Enable each placement independently. Change its id when starting a new campaign
// so visitors who dismissed the previous campaign can see the new one.
export type CampaignButton =
  | { type: "none" }
  | { type: "paypal" }
  | { type: "link"; label: string; href: string };

interface CampaignSettings {
  banner: {
    enabled: boolean;
    id: string;
    heading: string;
    message: string;
    button: CampaignButton;
  };
  popup: {
    enabled: boolean;
    id: string;
    eyebrow: string;
    heading: string;
    message: string;
    buttons: [CampaignButton, CampaignButton];
    delayMs: number;
    dismissalDays: number;
  };
}

export const campaigns: CampaignSettings = {
  banner: {
    enabled: true,
    id: "fatcat-ice-cream-december-9",
    heading: "Support SLICE Robotics",
    message: "Come out to Fat Cat Ice Cream on December 9th anytime between 1:00 PM and 9:00 PM to support the team and enjoy some ice cream! Watch the ice cream eating context at 7:00 PM!",
    button: { type: "link", label: "Learn More", href: "https://fatcathomemadeicecream.com/" },
  },
  popup: {
    enabled: true,
    id: "fatcat-ice-cream-december-9-popup-1",
    eyebrow: "Support the team",
    heading: "Fat Cat Ice Cream Fundraiser!",
    message: "Come out to Fat Cat Ice Cream on December 9th anytime between 1:00 PM and 9:00 PM to support the team and enjoy some ice cream! Watch the ice cream eating context at 7:00 PM!",
    buttons: [{ type: "paypal" }, { type: "link", label: "Learn More", href: "https://fatcathomemadeicecream.com/" }],
    // Delay before opening, in milliseconds.
    delayMs: 10_000,
    dismissalDays: 1,
  },
};
