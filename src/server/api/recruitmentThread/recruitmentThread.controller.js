var RecruitmentThread = require('./recruitmentThread.model');


/**
 * @api {get} /recruiting/threads Get Recruitment Status.
 * @apiName all
 * @apiGroup Recruitment
 *
 * @apiSuccess {String} threadUrl The location of the post
 * @apiSuccess {String} websiteName The name of the website where posted
 * @apiSuccess {String} notes any notes applicable to the resource
 * @apiSuccess {Date} updatedOn the last time this was updated
 */
exports.allThreads = function(req, res) {
  RecruitmentThread.find()
    .exec((err, recruitmentthreads) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(recruitmentthreads);
    });
};

/**
 * @api {post} /recruiting/threads Post Recruitment Needs
 * @apiName create
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiSuccess {String} threadUrl The location of the post
 * @apiSuccess {String} websiteName The name of the website where posted
 * @apiSuccess {String} notes any notes applicable to the resource
 * @apiSuccess {Date} updatedOn the last time this was updated
 */
exports.createThread = function(req, res) {
  RecruitmentThread.create(req.body, (err, recruitmentthread) => {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(recruitmentthread);
  });
};

/**
 * @api {put} /recruiting/threads/:id Update Recruitment Needs
 * @apiName updateRecruitment
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiParam {String} classType The class needed.
 * @apiParam {String} classSpec The specialization of the class.
 * @apiParam {String} priority How badly the guild needs the applicant.
 * @apiParam {Boolean} currentlyRecruiting Whether or not recruitment is necessary.
 * @apiParam {Date} updatedOn The last time this data was changed
 */
exports.updateThread = function(req, res) {
  RecruitmentThread.findById(req.params.id, (err, recruitmentthread)  => {
    if (err) {
      return handleError(res, err);
    }
    if (!recruitmentthread) {
      return res.sendStatus(404);
    }

    // set the new user information if it exists in the request
    if (req.body.threadUrl) recruitmentthread.threadUrl =
      req.body.threadUrl;
    if (req.body.websiteName) recruitmentthread.websiteName =
      req.body.websiteName;
    if (req.body.threadNotes) recruitmentthread.threadNotes =
      req.body.threadNotes;
    if (req.body.updatedOn) recruitmentthread.updatedOn =
      req.body.updatedOn;

    recruitmentthread.save((err) => {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).json(recruitmentthread);
    });
  });
};

/**
 * @api {get} /recruitment-threads/:id Get thread By Id
 * @apiName show
 * @apiGroup Recruitment
 *
 * @apiParam {Number} id Applications unique ID.
 *
 * @apiSuccess {String} classType The class needed.
 * @apiSuccess {String} classSpec The specialization of the class.
 * @apiSuccess {String} priority How badly the guild needs the applicant.
 * @apiSuccess {String} status Whether or not recruitment is necessary.
 */
exports.show = function(req, res) {
  RecruitmentThread.findById(req.params.id, (err, recruitmentthread) => {
    if (err) {
      return handleError(res, err);
    }
    if (!recruitmentthread) {
      return res.sendStatus(404);
    }
    return res.json(recruitmentthread);
  });
};

/**
 * @api {delete} /recruiting/:id Delete The Recruitment Need
 * @apiName destroy
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
exports.destroy = function(req, res) {
  RecruitmentThread.findById(req.params.id, (err, recruitmentthread)  => {
    if (err) {
      return handleError(res, err);
    }
    if (!recruitmentthread) {
      return res.sendStatus(404);
    }
    recruitmentthread.remove((err) => {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
