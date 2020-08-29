"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Site = _interopRequireDefault(require("../schemas/Site"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SitesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Site.default, 'default');
  }

  async create(data) {
    const site = this.ormRepository.create(data);
    await this.ormRepository.save(site);
    return site;
  }

  async save(site) {
    return this.ormRepository.save(site);
  }

  async delete(site) {
    await this.ormRepository.deleteOne({
      _id: site.id
    });
  }

  async findByName(name) {
    const siteFinded = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return siteFinded;
  }

  async findById(id) {
    const siteFinded = await this.ormRepository.findOne(id);
    return siteFinded;
  }

  async findAll() {
    const sites = await this.ormRepository.find();
    return sites;
  }

  async updateStatus(id, status) {
    const site = await this.ormRepository.findOne(id);

    if (!site) {
      throw new _AppError.default('Site not found');
    }

    site.status = status;
    await this.save(site);
  }

}

exports.default = SitesRepository;