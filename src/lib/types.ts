export type JobItemType = {
    badgeLetters: string;
    title: string;
    company: string;
    date: string;
    id: number;
    relevanceScore: number;
    daysAgo: number;
  };

  export type JobItemDetailsType = JobItemType & {
    description: string;
    qualifications: string[];
    reviews:string[];
    applyUrl: string;
    location: string;
    type: string;
    howToApply: string;
    companyUrl: string;
    duration: string;
    salary: string;
    coverImgURL: string;
  };