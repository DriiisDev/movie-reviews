import express from 'express'

const router = express.Router() // get access to express router
router.route('/').get((req, res)=>{
    return(res.send("hello world"))
})

export default router