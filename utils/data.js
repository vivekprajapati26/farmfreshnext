import bcrypt from 'bcryptjs';

const data ={ 



    users:[

        {
            name: 'Jhon',
            email:'admin@vp.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,


        },

        
        {
            name: 'Jane',
            email:'notadmin@vp.com',
            password: bcrypt.hashSync('123456789'),
            isAdmin: false,


        },
    ],
    products:[
        
        {

            name:'potatowww',
            subname:'allo',
            slug:'potataao',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomat.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },

        {

            name:'potato',
            slug:'potato',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/logo1.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },


        
        
        {

            name:'potatokkjjkjlk;j',
            slug:'potatokljk',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomathyb.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },
        {

            name:'potatoafsdz',
            slug:'zczvzdvadv',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomathyb.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },
        {

            name:'afsadzx',
            slug:'potatoxzvzvar',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomathyb.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },
        {

            name:'potatosdfafda',
            slug:'potatowerqwexsaewf',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomathyb.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:10000,

        },
        {

            name:'potatoada',
            slug:'potatoafadsfad',
            category:'Vegetables',
            subcategory:'Seasonal',
            image:'/tomathyb.jpg',
            priceperunit: 20,
            price: 100,
            dqty: '5kg',
            description:'frecch fries',
            countInStock:1000,

        },

         
      
    ],
};


export default data