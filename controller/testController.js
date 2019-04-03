import testQuestions from '../model/test';


exports.result = async (req, res, next) => {
  testQuestions.aggregate([{
    $match: {
      test: req.body.testName
    }
  }, {
    $project: {
      test: 1,
      NoOfQuestions: {
        $size: "$Answers" 
      },
      result: { $size: {
        $setIntersection: [ "$Answers", req.body.testAnswer ] }
      },
      _id: 0 
    }
  }])
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.send(err.message);
  });
}