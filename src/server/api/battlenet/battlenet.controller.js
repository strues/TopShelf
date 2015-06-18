var bnet = require('battlenet-api')('5m653qcbnr4h6rue7e4e4k7ryvcnpa9p');
import Character from '../user/character.model';
import reportError from '../../lib/errors/reporter';

//import config from '../../config/environment';

let BnetController = {};

BnetController.index = (req, res) => {
	Character.find()
	.populate('player', 'username')
	.exec(function(err, characters) {
      if (err) {
        return reportError(err);
      }
      return res.status(200).json(characters);
    });
};

/**
 * Takes the User's character name and sends
 * a request to battle.net to pull the information from
 * the armory and stores it in the database
 * @param  {String} req the character name to look up on armory
 * @param  {String} res charResp is the data returned from battlenet
 * @return {String}     character is the data along with the user's data
 */
BnetController.grabCharacter = (req, res) => {
	bnet.wow.character.guild({
		origin: 'us',
		realm: 'sargeras',
		name: req.body.characterName
	}, {apikey: '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p'}, (err, charResp) => {
		if (err) {return res.status(500).json(reportError(err)); }

	Character.create(charResp, function(err, character) {
		if (err) {
			return err;
		}
		character.player = req.user._id;
		return res.status(201).json(character);
	});
});
};

export default BnetController;
