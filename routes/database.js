router.get('/', async (req, res)=>{
    const todolist = await todoCollection.find({}).toArray();
   res.render('todo',{
       todo
    })
});

module.exports = router;