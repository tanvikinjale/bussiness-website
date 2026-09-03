// Card copy from slide 3; detail copy from the dedicated slide noted on each entry.
export const services = [
  {
    slug: 'steam-bath',
    title: 'Steam Bath Installation',
    short:
      'Premium steam generators, control panels, and waterproof interiors for luxury steam rooms.',
    // slide 4
    detailTitle: 'Luxury Steam Bath Systems',
    body: 'We provide complete steam room installation solutions with premium steam generators, control panels, safety systems, waterproof interiors, and after-sales support.',
    image: '/images/service-steam.webp',
    tags: ['Hotels & Resorts', 'Gyms & Wellness', 'Villas & Homes'],
    groups: [],
  },
  {
    slug: 'sauna-room',
    title: 'Sauna Room Installation',
    short:
      'Traditional and modern sauna rooms with wooden interiors and digital temperature controls.',
    // slide 5
    detailTitle: 'Premium Sauna Rooms',
    body: 'Traditional and modern sauna installations crafted with precision and luxury finishes.',
    image: '/images/service-sauna.webp',
    tags: [],
    groups: [
      {
        title: null,
        items: [
          'Wooden interiors with premium timber',
          'High-performance sauna heaters',
          'Digital control panels',
          'Temperature monitoring systems',
          'Custom luxury finishes',
        ],
      },
    ],
  },
  {
    slug: 'jacuzzi',
    title: 'Jacuzzi Installation',
    short: 'Premium jacuzzi and hydrotherapy systems designed for comfort and relaxation.',
    // slide 6
    detailTitle: 'Jacuzzi & Hydrotherapy Systems',
    body: 'We install premium jacuzzi systems designed for comfort, relaxation, and hydrotherapy engineered for the most demanding luxury environments.',
    image: '/images/service-jacuzzi.webp',
    tags: ['Luxury Villas', 'Hotels & Resorts', 'Spa Centers', 'Rooftop Leisure'],
    groups: [],
  },
  {
    slug: 'swimming-pool',
    title: 'Swimming Pool Equipment',
    short: 'Filtration, pumps, lighting, automation, and maintenance for pools of any scale.',
    // slide 7 (copy) + slide 2's rooftop pool photograph
    detailTitle: 'Complete Swimming Pool Systems',
    body: 'End-to-end pool solutions from filtration to automation, ensuring pristine water quality and effortless operation.',
    image: '/images/service-swimming-pool.webp',
    tags: ['Filtration & Pumps', 'Pool Lighting', 'Automation', 'Maintenance', 'Accessories'],
    groups: [],
  },
  {
    slug: 'chilled-shower-ice-bath',
    title: 'Chilled Shower & Ice Bath',
    short: 'Cold plunge and chilled shower systems for sports recovery and wellness applications.',
    // slide 8
    detailTitle: 'Chilled Shower and Ice Bath Solutions',
    body: 'Professional chilled shower and ice bath solutions designed for wellness, sports recovery, and luxury spa experiences.',
    image: '/images/service-chilled.webp',
    tags: [],
    groups: [
      {
        title: 'Applications',
        items: ['Fitness Centers', 'Wellness Clinics', 'Sports Facilities', 'Luxury Homes'],
      },
    ],
  },
  {
    slug: 'annual-maintenance',
    title: 'Annual Maintenance & Repairs',
    short: 'Comprehensive after-sales support and maintenance contracts for all installed systems.',
    // slide 3 only — no dedicated slide; photo is a detail crop of slide 9
    detailTitle: 'Annual Maintenance & Repairs',
    body: 'Comprehensive after-sales support and maintenance contracts for all installed systems.',
    image: '/images/service-annual-maintenance.webp',
    tags: [],
    groups: [
      {
        title: 'Systems covered',
        items: [
          'Steam rooms and generators',
          'Sauna rooms and heaters',
          'Jacuzzi and hydrotherapy systems',
          'Swimming pool filtration and automation',
          'Chilled shower and ice bath systems',
          'Electrical panels and installations',
        ],
      },
    ],
  },
  {
    slug: 'electrical-works',
    title: 'Complete Electrical Works',
    short:
      'Full-spectrum electrical contracting for residential, commercial, and industrial projects.',
    // slide 9
    detailTitle: 'Electrical Solutions',
    body: 'Full-spectrum electrical contracting for residential, commercial, and industrial projects, delivered with safety and professionalism at the core.',
    image: '/images/service-electrical.webp',
    tags: [],
    groups: [
      {
        title: 'Core Capabilities',
        items: [
          'Residential Electrical Works',
          'Commercial Electrical Projects',
          'Industrial Electrical Installations',
          'Power Distribution Systems',
        ],
      },
      {
        title: 'Specialized Services',
        items: [
          'Advanced Lighting Solutions',
          'Panel Installation & Upgrades',
          'Electrical Maintenance Programs',
          'Wiring & Safety Solutions',
        ],
      },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
