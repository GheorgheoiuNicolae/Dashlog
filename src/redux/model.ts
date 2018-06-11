interface Challange {
  id: string;
  name: string;
  description: string;
  benefits: Benefit[];
  category: string; // category id
  rating: number;
  difficulty: string;
  participants: string[];
  author: string; // user id
  milestones?: Milestone[];
}

interface Benefit {

}

interface Milestone {
  id: string;
  name: string;
  description: string;
}

const someChallange: Challange = {
  id: 'dmasfbi123zxcnuw',
  name: 'Wake up early for 15 days',
  description: 'Wake up early for 15 daysWake up early for 15 daysWake up early for 15 days',
  benefits: [
    'Get more organised',
    'More control over your day'
  ],
  category: 'dmasfbi123zxcnuw',
  rating: 4,
  difficulty: 'Easy',
  participants: ['maksddmasfbi123zxcnuw', 'd932dmasfbi123zxcnuw'],
  author: 'dmasfbi123zxcnuw',
  milestones: [{
    id: '9d2nusdfasdgasw',
    name: 'Week 1',
    description: 'wake up at 06:30AM'
  },{
    id: '9d2nusdfasdgasw',
    name: 'Week 2',
    description: 'wake up at 5:30AM'
  }]
};

console.log(someChallange);