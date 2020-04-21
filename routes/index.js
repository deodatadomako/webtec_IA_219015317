const router = require('express').Router();
const { MongoClient } = require('mongodb');MongoClient;

const todo = require('./todolist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true});

let employeedb;
let todoCollection;

//this function connects to the mongo db
const mainConnect = async () => {  
    await client.connect(); 
    employeedb = client.db('employeedb');
    todoCollection = employeedb.collection('todo');

};
mainConnect();

const createMany = async (data) => {
    try{
        const result = await todoCollection.insertMany(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally {}
}

const createTodo = async (data) => {
    try{
        const result = await todoCollection.insertOne(data);
        return result;
    }catch (error) {
        console.log(error)
    }
    finally{}
}

const getAll = async () => {
    try {
        const result = await todoCollection.find({}).toArray();
        return result;
    } catch (error) {
        console.log(error)
    }
    finally{}
}

const employees = [
    {
        name: "Deodat Adomako",
        ID: "ESCOL011001",
        position: "C.E.O",
        image: "/images/Deodat.jpg"
    },
    {
        name: "Selina Bonsu",
        ID: "ESCOL011002",
        position: "C.O.O",
        image: "/images/bey.jpg"
    },
    {
        name: "Efia Odo Worlasi",
        ID: "ESCOL011003",
        position: "Human Resource Manager",
        image: "/images/efiaodo.jpg"
    },
    {
        name: "Nana-Addo Zonanga",
        ID: "ESCOL011004",
        position: "H.O.D Legal Affairs",
        image: "/images/nana.jpg"
    },
    {
        name: "Vincent Asomasi Diesel",
        ID: "ESCOL011005",
        position: "Computer Engineer",
        image: "/images/vindiesel.jpg"
    },
    {
        name: "Jason Nii Ayi Statham",
        ID: "ESCOL011006",
        position: "Head of Security",
        image: "/images/jasonstatham.jpg"
    },
    {
        name: "Tutulapato Obinim",
        ID: "ESCOL011007",
        position: "IT Specialist",
        image: "/images/kevinhart.jpg"
    },
    {
        name: "Bill Awotwe Gates",
        ID: "ESCOL011008",
        position: "Financial Advisor",
        image: "/images/billgates.jpg"
    },
]

router.get('/', (req, res)=>{
    res.render('home', {
        title:'Home',
    })
});

router.get('/employeelist',  (req, res)=>{
    res.render('employee', {
        title:'Employees',
        employees
    })
    
});

router.get('/todolist', async (req, res)=>{
   const todolist = await getAll();
    res.render('todo',{
       todolist
   })
   
});
     
router.get('/createMany', async (req, res)=>{
    const todolist = await createMany(todo)
    res.redirect('/todolist')
 });
      
module.exports = router;