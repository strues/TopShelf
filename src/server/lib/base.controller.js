var BaseController = (mod, n) => {
  this.model = mod;
  console.log('BASECONTROLLER ::: ' + n);
};

BaseController.prototype = {

  /**
   *  POST - create a new Record
   *
   */
  create: (req, res) => {
    var data = req.body || {};
    var user = new this.model(data);
    user.save((err) => {
      if (err) return res.status(400).json(err);
      res.json(user);
    });
  },

  /**
   *  GET - list records
   *  @param {Object} req.query Should describe query parameters for filtering
   */
  list: (req, res) => {
    this.model.find(req.query).sort({
        'createdAt': -1
      })
      .exec((err, records) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.json(records);
      });
  },

  /**
   *  GET - find one Record
   *  @param {id} req.prams.id The ID of the record is required in url
   */
  getOne: (req, res) => {
    this.model.findOne({
        _id: req.params.id
      })
      .exec((err, records) => {
        if (err) {
          res.status(400).json(err);
        }
        res.json(records);
      });
  },

  /**
   *  PUT - update one record
   *  @param {Object} req.params.id The ID of the record to update is required in url
   *  Mongoose won't allow non-schema items to be saved, and handles validation
   */
  update: (req, res) => {
    var data = req.body || {};
    var id = req.params.id;
    this.model.findById(id, (err, doc) => {
      if (err) { return res.status(400).json(err); }
      if (doc) {
        for (var attr in data) {
          if (data.hasOwnProperty(attr)) {
            doc[attr] = data[attr];
          }
        }
        doc.save((err) => {
          if (err) {
            res.status(400).json(err);
          }
          else {
            res.json(doc);
          }
        });
      }
    });
  },

  /**
   *  DELETE -
   *  Delete one record by _id
   *
   */
  delete: (req, res, next) => {
    this.model.findOne({
      _id: req.params.id
    }, (err, doc) => {
      if (err) {
        res.status(400).json(err);
      }
      doc.remove(() => {
        res.json(doc);
      });
    });
  },

  /**
   * DELETE - Delete Multipe Records
   */
  deleteSome: (req, res, next) => {
    var toDel = req.body.ids || [];
    this.model.remove({
      '_id': {
        '$in': toDel
      }
    }, (err, del) => {
      if (err) {
        res.status(400).json(err);
      }
      else {
        res.json(del);
      }
    });
  }

};

module.exports = BaseController;
