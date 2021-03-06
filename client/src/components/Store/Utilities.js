export const priceRadioButtonData = [      
    {
        id:'0',  
        value: 'default',     
        label: 'all prices',
        name: 'price',
        isDefault: true
    },
    {
        id:'1',  
        value: 'price[lte]=30',    
        label: 'under $30',
        name: 'price',
        isDefault: false
    },
    {
        id:'2',  
        value: 'price[gte]=30&price[lte]=60',    
        label: '$30 - $60',
        name: 'price',
        isDefault: false
    },
    {
        id:'3',  
        value: 'price[gte]=60&price[lte]=100',    
        label: '$60 - $100',
        name: 'price',
        isDefault: false
    },
    {
        id:'4',  
        value: 'price[gte]=100&price[lte]=200',    
        label: '$100 - $200',
        name: 'price',
        isDefault: false
    },
    {
        id:'5',  
        value: 'price[gte]=200&price[lte]=300',    
        label: '$200 - $300',
        name: 'price',
        isDefault: false
    },
    {
        id:'6',  
        value: 'price[gte]=300&price[lte]=400',    
        label: '$300 - $400',
        name: 'price',
        isDefault: false
    },
    {
        id:'7',  
        value: 'price[gte]=400',    
        label: 'over $400',
        name: 'price',
        isDefault: false
    }
  
];

export const TitleStore = {
    allProducts: {name:'All Products', image: require("../../assets/allproducts.jpg"), objectPosition: '50% 50%'},
    entertainment: {name:'Entertainment', image: require("../../assets/Entertainment.jpg"), objectPosition: '50% 35%'},
    fitness: {name:'Fitness', image: require("../../assets/fitness.jpg"), objectPosition: '50% 30%'},
    lifestyle: {name:'Lifestyle', image: require("../../assets/Lifestyle.jpg"), objectPosition: '50% 50%'},
    gaming: {name:'Gaming', image: require("../../assets/gaming.jpg"), objectPosition: '50% 75%'},
    industrial: {name:'Industrial', image: require("../../assets/industrial.jpg"), objectPosition: '50% 50%'},
    medical: {name:'Medical', image: require("../../assets/Medical.jpg"), objectPosition: '50% 50%'},
    petsandanimals: {name:'Pets And Animals', image: require("../../assets/petsandanimals.jpg"), objectPosition: '50% 30%'}
};