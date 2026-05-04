export const translations = {
  en: {
    // Navigation
    home: 'Home',
    reportLost: 'Report Lost',
    reportFound: 'Report Found',
    browse: 'Browse Items',
    map: 'Map View',
    chat: 'Messages',
    admin: 'Admin',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    
    // Hero
    heroTitle: 'Lost Something?',
    heroSubtitle: "We'll Help You Find It",
    heroDescription: 'AI-powered lost and found platform connecting people with their belongings across railway stations, airports, malls, and universities.',
    searchPlaceholder: 'Search for lost items...',
    
    // Actions
    iLostSomething: 'I Lost Something',
    iFoundSomething: 'I Found Something',
    viewAll: 'View All',
    submitReport: 'Submit Report',
    claimItem: 'Claim Item',
    contactFinder: 'Contact Finder',
    
    // Form Labels
    title: 'Title',
    category: 'Category',
    description: 'Description',
    location: 'Location',
    date: 'Date',
    uploadImages: 'Upload Images',
    
    // Categories
    electronics: 'Electronics',
    documents: 'Documents',
    accessories: 'Accessories',
    bags: 'Bags & Luggage',
    clothing: 'Clothing',
    keys: 'Keys',
    wallet: 'Wallet',
    other: 'Other',
    
    // Status
    lost: 'Lost',
    found: 'Found',
    matched: 'Matched',
    claimed: 'Claimed',
    returned: 'Returned',
    
    // Stats
    itemsReported: 'Items Reported',
    itemsReturned: 'Items Returned',
    happyUsers: 'Happy Users',
    recoveryRate: 'Recovery Rate',
    
    // Messages
    noItemsFound: 'No items found',
    matchFound: 'Possible match found!',
    claimSuccess: 'Claim submitted successfully',
    reportSuccess: 'Report submitted successfully',
    
    // Gamification
    yourPoints: 'Your Points',
    badges: 'Badges',
    leaderboard: 'Leaderboard',
    honestFinder: 'Honest Finder',
    superHelper: 'Super Helper',
    communityHero: 'Community Hero',
  },
  hi: {
    // Navigation
    home: 'होम',
    reportLost: 'खोया रिपोर्ट करें',
    reportFound: 'पाया रिपोर्ट करें',
    browse: 'आइटम देखें',
    map: 'मैप व्यू',
    chat: 'संदेश',
    admin: 'एडमिन',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    
    // Hero
    heroTitle: 'कुछ खो गया?',
    heroSubtitle: 'हम आपको ढूंढने में मदद करेंगे',
    heroDescription: 'AI-संचालित खोया और पाया प्लेटफॉर्म जो रेलवे स्टेशनों, हवाई अड्डों, मॉल और विश्वविद्यालयों में लोगों को उनके सामान से जोड़ता है।',
    searchPlaceholder: 'खोई हुई वस्तुओं की खोज करें...',
    
    // Actions
    iLostSomething: 'मैंने कुछ खोया',
    iFoundSomething: 'मुझे कुछ मिला',
    viewAll: 'सभी देखें',
    submitReport: 'रिपोर्ट जमा करें',
    claimItem: 'दावा करें',
    contactFinder: 'खोजकर्ता से संपर्क करें',
    
    // Form Labels
    title: 'शीर्षक',
    category: 'श्रेणी',
    description: 'विवरण',
    location: 'स्थान',
    date: 'तारीख',
    uploadImages: 'छवियां अपलोड करें',
    
    // Categories
    electronics: 'इलेक्ट्रॉनिक्स',
    documents: 'दस्तावेज़',
    accessories: 'सहायक उपकरण',
    bags: 'बैग और सामान',
    clothing: 'कपड़े',
    keys: 'चाबियां',
    wallet: 'बटुआ',
    other: 'अन्य',
    
    // Status
    lost: 'खोया',
    found: 'पाया',
    matched: 'मिलान',
    claimed: 'दावा किया',
    returned: 'वापस',
    
    // Stats
    itemsReported: 'रिपोर्ट किए गए आइटम',
    itemsReturned: 'वापस किए गए आइटम',
    happyUsers: 'खुश उपयोगकर्ता',
    recoveryRate: 'पुनर्प्राप्ति दर',
    
    // Messages
    noItemsFound: 'कोई आइटम नहीं मिला',
    matchFound: 'संभावित मिलान मिला!',
    claimSuccess: 'दावा सफलतापूर्वक जमा किया गया',
    reportSuccess: 'रिपोर्ट सफलतापूर्वक जमा की गई',
    
    // Gamification
    yourPoints: 'आपके अंक',
    badges: 'बैज',
    leaderboard: 'लीडरबोर्ड',
    honestFinder: 'ईमानदार खोजकर्ता',
    superHelper: 'सुपर हेल्पर',
    communityHero: 'समुदाय हीरो',
  },
};

export type TranslationKey = keyof typeof translations.en;
