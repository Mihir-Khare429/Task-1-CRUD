const status = require('http-status');
const TestCase = require('../model/testCase');
const asyncForEach = require('../asyncForEach');

const getTestCase = async(req,res) => {
    if(!req.query.requestId){
        return res.status(status.BAD_REQUEST).send({
            message : "Request ID is a required Parametre"
        })
    }
    const requestId = req.query.requestId
    const testCase = await TestCase.findById(requestId).lean()
    if(!testCase){
        return res.status(status.NOT_FOUND).send({
            message : "Test Case not found"
        })
    }
    delete testCase.__v
    testCase['requestId'] = testCase['_id']
    delete testCase._id
    return res.status(status.OK).send({
        success : true,
        testCase
    })
}

const addTestCase = async(req,res) => {
    const {
        testId,
        packets,
        releasesAttachmentKey
    } = req.body
    const testCase = new TestCase({
        tests : [
            {
                testId,
                packets,
                releasesAttachmentKey
            }
        ]
    })
    await testCase.save()
    return res.status(status.OK).send({
        success : true,
        testCase
    })
}

const updateTestCase = async(req,res) => {
    if(!req.body.requestId){
        return res.status(status.BAD_REQUEST).send({
            message : "Request ID is a required Parametre"
        })
    }
    const {
        requestId,
        testId,
        packets,
        releasesAttachmentKey
    } = req.body
    const testCase = await TestCase.findByIdAndUpdate({_id:requestId},{$addToSet : {
        tests : {
            testId,
            packets,
            releasesAttachmentKey
        }
    }},{new:true})
    if(!testCase){
        return res.status(status.NOT_FOUND).send({
            message : "Test Case not found"
        })
    }
    
    return res.status(status.OK).send({
        success : true,
        testCase
    })
}

const getAllTestCase = async(req,res) => {
    const testCases = await TestCase.find().lean()
    await asyncForEach(testCases,(testCase) => {
        delete testCase.__v
        testCase['requestId'] = testCase['_id']
        delete testCase._id
    })
    return res.status(status.OK).send({
        success : true,
        testCases
    })
}

const deleteTestCase = async(req,res) => {
    if(!req.query.requestId){
        return res.status(status.BAD_REQUEST).send({
            message : "Request ID is a required Parametre"
        })
    }
    const requestId = req.query.requestId
    const testCase = await TestCase.findByIdAndDelete(requestId).lean()
    return res.status(status.OK).send({
        success : true,
        message : 'Test Case deleted'
    })
}

module.exports = {
    getTestCase,
    getAllTestCase,
    updateTestCase,
    deleteTestCase,
    addTestCase
}