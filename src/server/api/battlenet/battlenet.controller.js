let bnet = require('battlenet-api')('5m653qcbnr4h6rue7e4e4k7ryvcnpa9p');
import reportError from '../../lib/errors/reporter';
import Character from '../user/character.model';

//import config from '../../config/environment';

let BnetController = {};

BnetController.grabUsersCharacters = (req, res) => {
  let userId = req.user._id;
  Character.find()
    .find({
      player: userId
    })
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
  }, {
    apikey: '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p'
  }, (err, charResp) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }

    let newCharacter = charResp;
    newCharacter.player = req.user._id;

    Character.create(newCharacter, function(character) {
      if (err) {
        return err;
      }

      return res.status(201).json(character);
    });
  });
};

export default BnetController;
