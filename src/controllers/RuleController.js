'use strict';
const fs = require('fs');
const database = "src/database/rules.json";
const moment = require("moment");
const helper = require("../helpers/getAvailableIntervals")

module.exports = {

    create(req, res) {
        var rule = {};
        rule = req.body;

        fs.readFile(database, (err, data) => {
            if (err) throw err;
            let rules = JSON.parse(data);
            
            const newRuleId = Object.keys(rules).length + 1;
            
            rules[newRuleId] = rule;
             
            let ruleJson = JSON.stringify(rules, null, 2);

            fs.writeFile(database, ruleJson, (err) => {
                if (err) throw err;

                return res.sendStatus(200);
            });
    
        });   
    },

    delete(req, res){
        const id = req.body.id;

        fs.readFile(database, (err, data) => {
            if (err) throw err;
            let rules = JSON.parse(data);
            delete rules[id];
            let ruleJson = JSON.stringify(rules, null, 2);

            fs.writeFile(database, ruleJson, (err) => {
                if (err) throw err;

                return res.sendStatus(200);
            });
    
        });   
    },

    index(req, res){
        fs.readFile(database, (err, data) => {
            if (err) throw err;

            const rules = JSON.parse(data);
            
            return res.send(rules);

        });   
    },

    async available(req, res){
        try{
            const startDay = req.body.days[0],
                finalDay = req.body.days[1];

            const dates = helper.getDaysByInterval(startDay, finalDay);
            const datesWithIntervals =  await helper.getIntervalsByDate(dates);
            
            console.log(datesWithIntervals);

            fs.readFile(database, (err, data) => {
                if (err) throw err;


                return res.sendStatus(200);
            });
        } catch{
            return res.sendStatus(500);
        }   
    },
};