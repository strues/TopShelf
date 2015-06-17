var bnet = require('battlenet-api')('5m653qcbnr4h6rue7e4e4k7ryvcnpa9p');
import _ from 'lodash';
import Character from '../user/character.model';

//import config from '../../config/environment';

let BnetController = {};
//bnet.wow.character.profile({origin: 'us', realm: 'amanthul', name: 'charni'}, callback);

BnetController.grabCharacter = (req, res) => {
	bnet.wow.character.guild({
		origin: 'us',
		realm: 'sargeras',
		name: req.body.characterName
	}, {
		apikey: '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p'
	}, function(err, charResp) {
		if (err) {return err; }

	Character.create(charResp, function(err, character) {
		if (err) {
			return err;
		}
		return res.status(201).json(character);
	});
});
};

export default BnetController;
