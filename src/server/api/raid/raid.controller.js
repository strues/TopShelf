import Raid from './raid.model';
import _ from 'lodash';
import reportError from '../../lib/errors/reporter';
import User from '../user/user.model';

let RaidController = {};

let validationError = (res, err) => {
	return res.status(422).json(reportError(err));
};

Raid.on('error', err => reportError(err));

/**
 * Get Raids list
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
RaidController.index = (req, res) => { // don't ever give out the password or salt
	Raid.find({}, (err, raids) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(200).json(raids);
	});
};

/**
 * Creates a new user
 */
RaidController.create = (req, res, next) => {
	let newRaid = new Raid(req.body);
	newRaid.raidName = req.body.raidName;
  newRaid.raidZone = req.body.raidZone;
	newRaid.nOfPlayers = req.body.nOfPlayers;
  newRaid.lastModified = Date.now();
	newRaid.description = req.body.description;
	newRaid.startDate = req.body.startDate;
	newRaid.endDate = req.body.endDate;
	newRaid.startHour = req.body.startHour;
	newRaid.organizer = req.user._id;

	newRaid.save((err, user) => {
		if (err) {
			return res.status(500).json(reportError(err));
		}
		if (!user) {
			return res.status(500).json(reportError(err));
		}
		res.status(201).json({
			newRaid: newRaid
		});
	});
};


export default RaidController;
