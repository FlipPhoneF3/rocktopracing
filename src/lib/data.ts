export type RaceEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  terrain: string;
  description: string;
  imageUrl: string;
  mapUrl: string;
};

export const upcomingEvents: RaceEvent[] = [
  {
    id: 'granite-grinder-2024',
    name: 'Waxhaw Trail Fest',
    date: 'October 26, 2024',
    location: 'Stone Mountain, NC',
    distance: '15k & 30k',
    difficulty: 'Difficult',
    terrain: 'Rocky, high-elevation trails',
    description: 'Prepare for a relentless climb and breathtaking views at The Granite Grinder. This race will test your grit with its technical single-track and steep ascents. The reward? Unparalleled vistas from the summit and an unforgettable sense of accomplishment.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    mapUrl: 'https://picsum.photos/800/600?random=10',
  },
  {
    id: 'ridge-runner-ramble-2024',
    name: 'Inferno',
    date: 'November 9, 2024',
    location: 'Asheville, NC',
    distance: '10k & Half Marathon',
    difficulty: 'Moderate',
    terrain: 'Rolling hills, forest paths',
    description: 'Experience the beauty of autumn in the Blue Ridge Mountains. The Ridge Runner Ramble offers a course with rolling hills, scenic overlooks, and vibrant fall foliage. Perfect for both seasoned trail runners and those new to the sport.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    mapUrl: 'https://picsum.photos/800/600?random=11',
  },
  {
    id: 'creekside-crawl-2025',
    name: 'Terror Trails',
    date: 'April 12, 2025',
    location: 'Pisgah National Forest, NC',
    distance: '5k Fun Run & 10k',
    difficulty: 'Easy',
    terrain: 'Flat, riverside gravel paths',
    description: 'Join us for a fun and family-friendly race along the beautiful Davidson River. The Creekside Crawl is a flat and fast course, ideal for setting a new personal record or enjoying a scenic run with friends. All paces are welcome!',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    mapUrl: 'https://picsum.photos/800/600?random=12',
  },
];

export type RaceResult = {
  rank: number;
  name: string;
  time: string;
};

export type PastRace = {
  id: string;
  name: string;
  date: string;
  results: RaceResult[];
};

export const pastRaces: PastRace[] = [
  {
    id: 'granite-grinder-2023',
    name: 'The Granite Grinder 2023',
    date: 'October 28, 2023',
    results: [
      { rank: 1, name: 'Alex Johnson', time: '2:15:45' },
      { rank: 2, name: 'Maria Garcia', time: '2:18:22' },
      { rank: 3, name: 'David Smith', time: '2:20:01' },
      { rank: 4, name: 'Sarah Wilson', time: '2:25:30' },
      { rank: 5, name: 'Kenji Tanaka', time: '2:28:11' },
    ],
  },
  {
    id: 'ridge-runner-ramble-2023',
    name: 'Ridge Runner Ramble 2023',
    date: 'November 11, 2023',
    results: [
      { rank: 1, name: 'Emily White', time: '1:45:10' },
      { rank: 2, name: 'Chris Lee', time: '1:47:33' },
      { rank: 3, name: 'Jessica Brown', time: '1:49:05' },
      { rank: 4, name: 'Michael Clark', time: '1:52:18' },
      { rank: 5, name: 'Linda Green', time: '1:55:02' },
    ],
  },
  {
    id: 'creekside-crawl-2024',
    name: 'Creekside Crawl 2024',
    date: 'April 13, 2024',
    results: [
      { rank: 1, name: 'Ben Carter', time: '0:34:12' },
      { rank: 2, name: 'Olivia Martinez', time: '0:35:50' },
      { rank: 3, name: 'William Davis', time: '0:36:15' },
      { rank: 4, name: 'Sophia Rodriguez', time: '0:37:01' },
      { rank: 5, name: 'James Taylor', time: '0:38:22' },
    ],
  },
];
