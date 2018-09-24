const express = require('express')
const path    = require('path')
let app = express()


app.get('/me', (req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.user)
        res.render('../public/views/me', {info: req.user})
    }else{
        res.redirect('/')
    }

})

module.exports = app