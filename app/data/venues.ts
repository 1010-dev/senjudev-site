export type VenueData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  photos: string[];
  capacity: number;
  tags: string[];
  events: string[];
  facilities: string[];
  access: string;
  url?: string;
};

export const venues: VenueData[] = [
  {
    id: "tokyo-arts-center",
    name: "東京芸術センター",
    lat: 35.746983,
    lng: 139.800496,
    address: "東京都足立区千住1-4-1",
    description:
      "多目的ホールや会議室を備えた文化施設。千住devの第一回から会場として利用されている。",
    photos: ["/tokyo-arts-center.png"],
    capacity: 15,
    tags: ["会議室"],
    events: ["千住.dev"],
    facilities: ["エアコン", "ホワイトボード"],
    access: "JR北千住駅から徒歩10分",
    url: "https://www.art-center.jp/tokyo/",
  },
];
