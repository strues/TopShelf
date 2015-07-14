import Recruitment from './recruitment.model';
import DAO from '../../lib/dao';
let collection = new DAO(Recruitment);
let RecruitmentController = {};

/**
 * @api {get} /recruitment Get Recruitment Status.
 * @apiName all
 * @apiGroup Recruitment
 *
 * @apiSuccess {String} classType The class needed.
 * @apiSuccess {String} classSpec The specialization of the class.
 * @apiSuccess {String} priority How badly the guild needs the applicant.
 * @apiSuccess {String} status Whether or not recruitment is necessary.
 */
RecruitmentController.all = (req, res) => {
  collection.findAll(req, res);
};

/**
 * @api {get} /recruiting/:id Get Recruitment By Id
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
RecruitmentController.show = (req, res) => {
  collection.findById(req, res);
};

/**
 * @api {post} /recruiting Post Recruitment Needs
 * @apiName create
 * @apiGroup Recruitment
 *
 * @apiPermission admin
 *
 * @apiParam {String} classType The class needed.
 * @apiParam {String} classSpec The specialization of the class.
 * @apiParam {String} priority How badly the guild needs the applicant.
 * @apiParam {String} status Whether or not recruitment is necessary.
 */
RecruitmentController.create = (req, res) => {
  collection.create(req, res);
};

/**
 * @api {put} /recruiting/:id Update Recruitment Needs
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
RecruitmentController.update = (req, res) => {
  collection.update(req, res);
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
RecruitmentController.destroy = (req, res) => {
  collection.deleteById(req, res);
};

export default RecruitmentController;
