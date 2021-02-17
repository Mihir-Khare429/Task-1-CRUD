const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    testId : {
        type : String,
        required : true,
        unique : true
    },
    packets : [
        {
            type : Number
        }
    ],
    releasesAttachmentKey : {
        type : Number,
        required : true,
        unique : true
    }
})

const TestCase = mongoose.Schema({
    tests : [
        testSchema
    ]
})

module.exports = mongoose.model('testCase',TestCase)