import RecruitmentThread from './recruitmentThread.model';

import DAO from '../../lib/dao';
let collection = new DAO(RecruitmentThread);

let rThreadController = {};
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
rThreadController.allThreads = function(req, res) {
  collection.findAll(req, res);
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
rThreadController.createThread = function(req, res) {
  collection.create(req, res);
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
rThreadController.updateThread = function(req, res) {
  collection.update(req, res);
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
rThreadController.show = function(req, res) {
  collection.findById(req, res);
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
rThreadController.destroy = function(req, res) {
  collection.deleteById(req, res);
};

export default rThreadController;
